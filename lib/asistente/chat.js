/*
 * El turno de conversación: arma la solicitud, transmite la respuesta y
 * devuelve lo que hace falta registrar. No sabe nada de HTTP ni de Lambda,
 * para poder ejercitarlo desde la terminal antes de que exista la interfaz.
 */
import Anthropic from "@anthropic-ai/sdk";
import { AnthropicBedrock } from "@anthropic-ai/bedrock-sdk";
import { construirSistema } from "./instruccion.js";
import { leerDocumentos } from "./contexto.js";

/* En Bedrock se invoca por perfil de inferencia —el prefijo us. reparte entre
 * regiones— y el identificador lleva versión completa. El endpoint Mantle, más
 * nuevo, no está habilitado en esta cuenta: devuelve "not available for this
 * account", así que usamos la ruta clásica de bedrock-runtime. */
export const MODELO_BEDROCK = "us.anthropic.claude-haiku-4-5-20251001-v1:0";
export const MODELO_API = "claude-haiku-4-5";
export const MAX_TURNOS_HISTORIAL = 20;
export const MAX_TOKENS_RESPUESTA = 1024;

/*
 * Bedrock por defecto: el gasto pasa por AWS y lo cubren los créditos de la
 * cuenta, y la Lambda se autentica con su rol IAM en vez de guardar una clave.
 * Si hay ANTHROPIC_API_KEY en el entorno se usa la API directa, que sirve para
 * comparar respuestas y costos sin tocar la infraestructura.
 */
export function crearProveedor({
  apiKey = process.env.ANTHROPIC_API_KEY,
  region = process.env.AWS_REGION ?? "us-east-1"
} = {}) {
  if (apiKey) {
    return { nombre: "api", modelo: MODELO_API, cliente: new Anthropic({ apiKey }) };
  }
  return {
    nombre: "bedrock",
    modelo: MODELO_BEDROCK,
    cliente: new AnthropicBedrock({ awsRegion: region })
  };
}

/* Más allá de 20 turnos se recorta por el principio. El §7 pide resumir; por
 * ahora recortamos, que es honesto y no cuesta una llamada extra. Cuando haya
 * conversaciones reales que lo justifiquen, acá va el resumen. */
export function recortarHistorial(mensajes, max = MAX_TURNOS_HISTORIAL) {
  return mensajes.length <= max ? mensajes : mensajes.slice(-max);
}

/* Las etiquetas del frontmatter que aparecen en lo que escribió la alumna.
 * Sirve para el informe de /admin y para filtrar el contexto si algún día el
 * material supera el límite de tokens. */
export function detectarTemas(mensajes, { raiz } = {}) {
  const texto = mensajes
    .filter((m) => m.role === "user")
    .map((m) => (typeof m.content === "string" ? m.content : ""))
    .join(" ")
    .toLowerCase();

  const etiquetas = new Set();
  for (const doc of leerDocumentos({ raiz })) {
    for (const etiqueta of doc.etiquetas) {
      if (texto.includes(etiqueta.toLowerCase())) etiquetas.add(etiqueta);
    }
  }
  return [...etiquetas];
}

/* Heurística, no certeza: marca el turno cuando el asistente dice que no tiene
 * el dato o deriva al contacto. Es el insumo del listado de preguntas sin
 * respuesta, que a su vez alimenta 04-errores-frecuentes.md. */
const SEÑALES_SIN_RESPUESTA = [
  "no lo tengo en el material",
  "no está en el material",
  "no tengo ese dato",
  "no figura en el material",
  "escríbele a maile",
  "escribile a maile",
  "escribirle a maile",
  "por whatsapp o instagram"
];

export function marcarSinRespuesta(texto) {
  const plano = texto.toLowerCase();
  return SEÑALES_SIN_RESPUESTA.some((señal) => plano.includes(señal));
}

/*
 * Transmite la respuesta. El mensaje de la alumna entra siempre como turno de
 * usuario, nunca concatenado a la instrucción de sistema (§10).
 *
 * Emite {tipo:"texto"} por cada fragmento y un único {tipo:"fin"} al final con
 * lo que hay que registrar.
 */
export async function* responder({ mensajes, proveedor = crearProveedor(), raiz, etiquetas } = {}) {
  if (!Array.isArray(mensajes) || mensajes.length === 0) {
    throw new Error("Hacen falta mensajes");
  }

  const stream = proveedor.cliente.messages.stream({
    model: proveedor.modelo,
    max_tokens: MAX_TOKENS_RESPUESTA,
    system: construirSistema({ raiz, etiquetas }),
    messages: recortarHistorial(mensajes)
  });

  let completo = "";
  for await (const evento of stream) {
    if (evento.type === "content_block_delta" && evento.delta.type === "text_delta") {
      completo += evento.delta.text;
      yield { tipo: "texto", texto: evento.delta.text };
    }
  }

  const final = await stream.finalMessage();
  yield {
    tipo: "fin",
    texto: completo,
    sinRespuesta: marcarSinRespuesta(completo),
    temas: detectarTemas(mensajes, { raiz }),
    uso: final.usage
  };
}
