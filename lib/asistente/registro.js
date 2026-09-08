/*
 * Registro de conversaciones y feedback.
 *
 * El §9 del requerimiento guardaba solo metadatos. Ahora se guarda también el
 * texto de la pregunta y de la respuesta, para poder mejorar el material con lo
 * que realmente se pregunta. Eso tiene una consecuencia: aunque no se pidan
 * nombre, correo ni teléfono, una alumna puede escribir datos de su proyecto o
 * de sus clientas en el mensaje. Por eso hay TTL y el aviso de privacidad del
 * sitio debe mencionarlo.
 *
 * Como el resto de lib/asistente, no importa nada de Next. El SDK de AWS se
 * carga de forma diferida para poder ejecutar el módulo desde la terminal.
 */
const DIAS_RETENCION = Number(process.env.DIAS_RETENCION_CONVERSACION ?? 180);

let clientePromesa = null;

async function cliente() {
  if (!clientePromesa) {
    clientePromesa = (async () => {
      const { DynamoDBClient } = await import("@aws-sdk/client-dynamodb");
      const { DynamoDBDocumentClient } = await import("@aws-sdk/lib-dynamodb");
      return DynamoDBDocumentClient.from(
        new DynamoDBClient({ region: process.env.AWS_REGION ?? "us-east-1" })
      );
    })();
  }
  return clientePromesa;
}

function tabla() {
  return process.env.TABLA_REGISTRO ?? "";
}

/* Clave determinista: el widget la puede reconstruir para mandar el feedback
 * sin que el servidor tenga que devolvérsela en medio del streaming. */
export function claveTurno({ codigoCohorte, conversacionId, turno }) {
  return {
    pk: `cohorte#${codigoCohorte}`,
    sk: `${conversacionId}#${String(turno).padStart(4, "0")}`
  };
}

function vencimiento(dias = DIAS_RETENCION) {
  return Math.floor(Date.now() / 1000) + dias * 24 * 60 * 60;
}

export async function guardarTurno({
  codigoCohorte,
  conversacionId,
  turno,
  pregunta,
  respuesta,
  temas = [],
  sinRespuesta = false,
  uso = null
}) {
  if (!tabla()) return { guardado: false, motivo: "sin-tabla" };

  const { PutCommand } = await import("@aws-sdk/lib-dynamodb");
  const doc = await cliente();

  await doc.send(
    new PutCommand({
      TableName: tabla(),
      Item: {
        ...claveTurno({ codigoCohorte, conversacionId, turno }),
        creado: new Date().toISOString(),
        pregunta,
        respuesta,
        temas,
        sinRespuesta,
        tokensEntrada: uso?.input_tokens ?? null,
        tokensSalida: uso?.output_tokens ?? null,
        expira: vencimiento()
      }
    })
  );

  return { guardado: true };
}

/* El feedback llega después, sobre un turno que ya existe. */
export async function guardarFeedback({
  codigoCohorte,
  conversacionId,
  turno,
  util,
  comentario = ""
}) {
  if (!tabla()) return { guardado: false, motivo: "sin-tabla" };

  const { UpdateCommand } = await import("@aws-sdk/lib-dynamodb");
  const doc = await cliente();

  await doc.send(
    new UpdateCommand({
      TableName: tabla(),
      Key: claveTurno({ codigoCohorte, conversacionId, turno }),
      /* Solo actualiza si el turno existe: evita crear filas huérfanas desde
       * un feedback con identificadores inventados. */
      ConditionExpression: "attribute_exists(pk)",
      UpdateExpression: "SET util = :util, comentario = :comentario, feedbackEn = :ahora",
      ExpressionAttributeValues: {
        ":util": Boolean(util),
        ":comentario": String(comentario).slice(0, 1000),
        ":ahora": new Date().toISOString()
      }
    })
  );

  return { guardado: true };
}

/*
 * Contadores de uso. Se incrementan de forma atómica y se leen en el mismo
 * viaje: si dos peticiones llegan juntas, ninguna se pisa. Viven en la misma
 * tabla que el registro y se borran solos por TTL.
 */
async function incrementar(pk, sk, diasDeVida) {
  const { UpdateCommand } = await import("@aws-sdk/lib-dynamodb");
  const doc = await cliente();

  const respuesta = await doc.send(
    new UpdateCommand({
      TableName: tabla(),
      Key: { pk, sk },
      UpdateExpression: "ADD #cuenta :uno SET expira = if_not_exists(expira, :expira)",
      ExpressionAttributeNames: { "#cuenta": "cuenta" },
      ExpressionAttributeValues: { ":uno": 1, ":expira": vencimiento(diasDeVida) },
      ReturnValues: "UPDATED_NEW"
    })
  );

  return Number(respuesta.Attributes?.cuenta ?? 0);
}

export async function contarUso({ codigoCohorte, conversacionId, huellaIp, dia, hora }) {
  /* Sin tabla no hay límites: en desarrollo no queremos frenar nada. */
  if (!tabla()) return { sesion: 0, codigoDia: 0, ipHora: 0, contado: false };

  const [codigoDia, sesion, ipHora] = await Promise.all([
    incrementar(`limite#codigo#${codigoCohorte}`, dia, 2),
    conversacionId ? incrementar(`limite#sesion#${conversacionId}`, "total", 1) : 0,
    huellaIp ? incrementar(`limite#ip#${huellaIp}`, hora, 1) : 0
  ]);

  return { sesion, codigoDia, ipHora, contado: true };
}

/* Para /admin: todo lo de una cohorte, más reciente primero. */
export async function leerCohorte({ codigoCohorte, limite = 200 }) {
  if (!tabla()) return [];

  const { QueryCommand } = await import("@aws-sdk/lib-dynamodb");
  const doc = await cliente();

  const respuesta = await doc.send(
    new QueryCommand({
      TableName: tabla(),
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": `cohorte#${codigoCohorte}` },
      Limit: limite
    })
  );

  return (respuesta.Items ?? []).sort((a, b) => (a.creado < b.creado ? 1 : -1));
}
