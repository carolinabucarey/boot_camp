/*
 * Analizador del subconjunto de markdown que el asistente realmente produce:
 * párrafos, negritas, listas de pasos, código en línea y algún enlace.
 *
 * Devuelve una estructura de datos, no HTML. Quien la pinta es Markdown.js,
 * construyendo elementos de React: el texto viene de un modelo influido por lo
 * que escribe la alumna, así que dangerouslySetInnerHTML sería una puerta de
 * entrada. Construyendo elementos, cualquier etiqueta que venga en el texto se
 * muestra como texto.
 *
 * Sin JSX a propósito, para poder probarlo con node --test.
 */

const NEGRITA = /\*\*([^*]+)\*\*/;
const CODIGO = /`([^`]+)`/;
const ENLACE = /(https?:\/\/[^\s)<>"]+[^\s.,;:)<>"])/;

/* Se corta por la primera marca que aparezca, y se sigue con el resto. */
export function analizarLinea(texto) {
  const segmentos = [];
  let resto = texto;

  while (resto) {
    const candidatos = [
      { tipo: "fuerte", m: resto.match(NEGRITA) },
      { tipo: "codigo", m: resto.match(CODIGO) },
      { tipo: "enlace", m: resto.match(ENLACE) }
    ].filter((c) => c.m);

    if (candidatos.length === 0) {
      segmentos.push({ tipo: "texto", valor: resto });
      break;
    }

    const primero = candidatos.reduce((a, b) => (a.m.index <= b.m.index ? a : b));
    const { index } = primero.m;

    if (index > 0) segmentos.push({ tipo: "texto", valor: resto.slice(0, index) });
    segmentos.push({ tipo: primero.tipo, valor: primero.m[1] ?? primero.m[0] });
    resto = resto.slice(index + primero.m[0].length);
  }

  return segmentos.filter((s) => s.valor !== "");
}

const VINETA = /^\s*[-*•]\s+(.*)$/;
const NUMERO = /^\s*\d+[.)]\s+(.*)$/;
const TITULO = /^\s*#{1,6}\s+(.*)$/;

export function analizar(texto = "") {
  const bloques = [];

  for (const crudo of String(texto).split(/\n\s*\n/)) {
    const lineas = crudo.split("\n").filter((l) => l.trim() !== "");
    if (lineas.length === 0) continue;

    const vinetas = lineas.every((l) => VINETA.test(l));
    const numeradas = lineas.every((l) => NUMERO.test(l));

    if (vinetas || numeradas) {
      bloques.push({
        tipo: numeradas ? "numerada" : "lista",
        items: lineas.map((l) => analizarLinea(l.match(numeradas ? NUMERO : VINETA)[1]))
      });
      continue;
    }

    /* Un encabezado suelto se degrada a párrafo en negrita: en una burbuja de
     * chat un <h2> desentona y rompe la escala tipográfica del panel. */
    const titulo = lineas.length === 1 && lineas[0].match(TITULO);
    if (titulo) {
      bloques.push({ tipo: "parrafo", segmentos: [{ tipo: "fuerte", valor: titulo[1] }] });
      continue;
    }

    bloques.push({ tipo: "parrafo", segmentos: analizarLinea(lineas.join(" ")) });
  }

  return bloques;
}
