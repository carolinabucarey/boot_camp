/*
 * El rostro es el de Carolina. Por eso el primer mensaje del hilo lleva
 * obligatoriamente la etiqueta «Asistente de Maile»: sin ella, una alumna
 * razonablemente asume que le escribe ella y espera una respuesta personal.
 *
 * En el hilo va la versión sin aro: a 32 px el aro Aura se convierte en un
 * halo difuso. Cada archivo se sirve al doble de su tamaño de uso, para que
 * se vea nítido en pantallas de alta densidad.
 */
export const AVATARES = {
  lanzador: "/assets/asistente/maile-avatar-carolina-224.png",
  encabezado: "/assets/asistente/maile-avatar-carolina-128.png",
  mensaje: "/assets/asistente/maile-avatar-carolina-sinaro-64.png"
};

export const BIENVENIDA =
  "Soy el asistente de Maile. Tengo el material del taller y estoy para " +
  "acompañarte cuando algo se trabe. ¿En qué estás trabajando?";

/* La línea de estado del encabezado. Cuando haya más de una cohorte activa,
 * esto sale del código de acceso en vez de ser una constante. */
export const TALLER = "Crea tu primer agente con IA";

export const URL_ASISTENTE = process.env.NEXT_PUBLIC_ASISTENTE_URL ?? "";

export const CLAVE_TOKEN = "maile-asistente-token";
