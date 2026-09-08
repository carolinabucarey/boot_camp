/*
 * Punto de entrada del asistente en Lambda.
 *
 *   GET  /salud    estado de la capa de contenido
 *   POST /acceso   valida el código de cohorte y entrega el token de sesión
 *   POST /chat     turno de conversación, en streaming
 *   POST /feedback si la respuesta sirvió o no
 *   GET  /admin    informe de uso, con clave
 *
 * Sin token válido no se llama al modelo (criterio de aceptación 2).
 */
import { armarContexto, estimarTokens, leerDocumentos } from "./lib/asistente/contexto.js";
import { construirSistema } from "./lib/asistente/instruccion.js";
import { leerCodigos, validarCodigo, emitirToken, verificarToken } from "./lib/asistente/acceso.js";
import { crearProveedor, responder } from "./lib/asistente/chat.js";
import { leerSecretos } from "./lib/asistente/secretos.js";
import { guardarTurno, guardarFeedback, leerCohorte, contarUso } from "./lib/asistente/registro.js";
import {
  evaluarConteos,
  fechaLocal,
  horaLocal,
  huellaDeIp,
  mensajeDeLimite
} from "./lib/asistente/limites.js";
import { armarInforme } from "./lib/asistente/informe.js";
import { timingSafeEqual } from "node:crypto";

/*
 * Acá NO van cabeceras CORS. Las pone la configuración Cors de la URL de
 * función, y si además las escribe el handler el navegador recibe
 * access-control-allow-origin dos veces y rechaza la respuesta entera:
 * «contains multiple values, but only one is allowed». El origen permitido se
 * cambia en la plantilla, no en este archivo.
 */
const CABECERAS = { "cache-control": "no-store" };

function abrir(stream, estado, tipo) {
  return awslambda.HttpResponseStream.from(stream, {
    statusCode: estado,
    headers: { ...CABECERAS, "content-type": tipo }
  });
}

function json(stream, estado, cuerpo) {
  const salida = abrir(stream, estado, "application/json; charset=utf-8");
  salida.write(JSON.stringify(cuerpo));
  salida.end();
}

function leerCuerpo(evento) {
  if (!evento.body) return {};
  const crudo = evento.isBase64Encoded
    ? Buffer.from(evento.body, "base64").toString("utf8")
    : evento.body;
  try {
    return JSON.parse(crudo);
  } catch {
    return {};
  }
}

function leerToken(evento) {
  const cabeceras = evento.headers ?? {};
  const autorizacion = cabeceras.authorization ?? cabeceras.Authorization ?? "";
  return autorizacion.replace(/^Bearer\s+/i, "").trim();
}

/* El mensaje de la alumna entra siempre como turno de usuario. Nada de lo que
 * escriba puede llegar a la instrucción de sistema (§10). */
function sanearMensajes(mensajes) {
  if (!Array.isArray(mensajes)) return [];
  return mensajes
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .map((m) => ({ role: m.role, content: String(m.content ?? "").slice(0, 4000) }))
    .filter((m) => m.content.length > 0);
}

/* Comparación de tiempo constante: una clave de administración no se compara
 * con === , que se rinde en el primer carácter distinto. */
function claveCorrecta(recibida, esperada) {
  if (!esperada || !recibida) return false;
  const a = Buffer.from(String(recibida));
  const b = Buffer.from(String(esperada));
  return a.length === b.length && timingSafeEqual(a, b);
}

export const handler = awslambda.streamifyResponse(async (evento, stream) => {
  const ruta = evento.requestContext?.http?.path ?? "/";
  const metodo = evento.requestContext?.http?.method ?? "GET";

  /* El preflight lo responde la propia URL de función; nunca llega acá. */

  if (ruta === "/salud") {
    return json(stream, 200, {
      estado: "ok",
      documentos: leerDocumentos().map((d) => ({ archivo: d.archivo, titulo: d.titulo })),
      tokensEstimados: {
        instruccion: estimarTokens(construirSistema()[0].text),
        material: estimarTokens(armarContexto())
      }
    });
  }

  const secretos = await leerSecretos();

  if (ruta === "/acceso" && metodo === "POST") {
    const { codigo } = leerCuerpo(evento);
    const resultado = validarCodigo(codigo, { codigos: leerCodigos(secretos.codigos) });

    if (!resultado.valido) {
      /* Se registra el intento fallido para poder responder «no puedo entrar»
       * mirando los logs. No se guarda el código completo —es una credencial—
       * sino lo justo para distinguir un tipeo de un código que no existe. */
      const intento = String(codigo ?? "").trim().toUpperCase();
      console.log(
        JSON.stringify({
          acceso: "rechazado",
          motivo: resultado.motivo,
          largo: intento.length,
          prefijo: intento.slice(0, 6),
          codigosConfigurados: Object.keys(leerCodigos(secretos.codigos)).length
        })
      );

      /* Estado de invitación: se explica qué es el asistente y quién accede.
       * No se llama al modelo. */
      return json(stream, 403, {
        error: "codigo-invalido",
        mensaje:
          "Este asistente acompaña a quienes participaron en un taller de Maile. " +
          "Si estuviste en uno, tu código llegó al cerrar el taller.",
        programas: "https://www.maile.cl/#programas"
      });
    }

    console.log(JSON.stringify({ acceso: "concedido", codigo: resultado.codigo }));
    return json(stream, 200, {
      token: emitirToken({ ...resultado, secreto: secretos.tokenSecreto }),
      expira: resultado.expira
    });
  }

  if (ruta === "/chat" && metodo === "POST") {
    const sesion = verificarToken(leerToken(evento), { secreto: secretos.tokenSecreto });
    if (!sesion.valido) {
      return json(stream, 401, { error: "sesion-invalida", motivo: sesion.motivo });
    }

    const cuerpo = leerCuerpo(evento);
    const mensajes = sanearMensajes(cuerpo.mensajes);
    if (mensajes.length === 0) return json(stream, 400, { error: "sin-mensajes" });

    const conversacionId = String(cuerpo.conversacionId ?? "").slice(0, 64);
    const turno = mensajes.filter((m) => m.role === "user").length;
    const pregunta = mensajes.at(-1)?.content ?? "";

    /* Los límites se cobran antes de llamar al modelo: si el link se filtró,
     * el gasto se corta acá y no después. */
    const ahora = new Date();
    const conteos = await contarUso({
      codigoCohorte: sesion.codigo,
      conversacionId,
      huellaIp: huellaDeIp(evento.requestContext?.http?.sourceIp, secretos.tokenSecreto),
      dia: fechaLocal(ahora),
      hora: horaLocal(ahora)
    }).catch((error) => {
      /* Si el contador falla, se deja pasar: preferimos una conversación de
       * más a dejar a la cohorte sin asistente por un problema de la tabla. */
      console.error("No se pudo contar el uso:", error);
      return { sesion: 0, codigoDia: 0, ipHora: 0, contado: false };
    });

    const veredicto = evaluarConteos(conteos);
    if (!veredicto.permitido) {
      console.log(JSON.stringify({ limite: veredicto.motivo, codigo: sesion.codigo, conteos }));
      return json(stream, 429, {
        error: "limite",
        motivo: veredicto.motivo,
        mensaje: mensajeDeLimite(veredicto.motivo, { contacto: "WhatsApp" })
      });
    }

    const salida = abrir(stream, 200, "text/plain; charset=utf-8");
    try {
      for await (const parte of responder({
        mensajes,
        proveedor: crearProveedor({ apiKey: secretos.apiKey })
      })) {
        if (parte.tipo === "texto") salida.write(parte.texto);
        else if (parte.tipo === "fin" && conversacionId) {
          /* Se guarda la pregunta y la respuesta, no solo los metadatos: es el
           * insumo para mejorar /content con lo que de verdad se pregunta.
           * Que falle el registro no puede romper la conversación. */
          await guardarTurno({
            codigoCohorte: sesion.codigo,
            conversacionId,
            turno,
            pregunta,
            respuesta: parte.texto,
            temas: parte.temas,
            sinRespuesta: parte.sinRespuesta,
            uso: parte.uso
          }).catch((error) => console.error("No se pudo registrar el turno:", error));
        }
      }
    } catch (error) {
      console.error("Fallo al responder:", error);
      salida.write("\n\nNo pude conectarme. Vuelve a intentar en un momento.");
    }
    return salida.end();
  }

  if (ruta === "/feedback" && metodo === "POST") {
    const sesion = verificarToken(leerToken(evento), { secreto: secretos.tokenSecreto });
    if (!sesion.valido) return json(stream, 401, { error: "sesion-invalida" });

    const { conversacionId, turno, util, comentario } = leerCuerpo(evento);
    if (!conversacionId || !turno) return json(stream, 400, { error: "faltan-datos" });

    try {
      await guardarFeedback({
        codigoCohorte: sesion.codigo,
        conversacionId: String(conversacionId).slice(0, 64),
        turno: Number(turno),
        util,
        comentario
      });
      return json(stream, 200, { gracias: true });
    } catch (error) {
      /* Un turno que no existe cae acá por la condición de la escritura. */
      console.error("No se pudo registrar el feedback:", error.name);
      return json(stream, 200, { gracias: true });
    }
  }

  if (ruta === "/admin" && metodo === "GET") {
    if (!claveCorrecta(leerToken(evento), secretos.adminClave)) {
      return json(stream, 401, { error: "clave-invalida" });
    }

    const cohorte = String(evento.queryStringParameters?.cohorte ?? "").toUpperCase();
    if (!cohorte) return json(stream, 400, { error: "falta-cohorte" });

    const filas = await leerCohorte({ codigoCohorte: cohorte });
    return json(stream, 200, { cohorte, ...armarInforme(filas) });
  }

  return json(stream, 404, {
    error: "ruta-desconocida",
    disponibles: ["/salud", "/acceso", "/chat", "/feedback", "/admin"]
  });
});
