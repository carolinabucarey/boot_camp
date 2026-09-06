// El logotipo destaca una parte del nombre ("AI" en M-AI-LE) en otro color;
// en el texto corrido, en cambio, el nombre va de una sola pieza.
export function splitWordmark(name, highlight) {
  if (!highlight) return { prefix: name, highlight: "", suffix: "" };
  const index = name.indexOf(highlight);
  if (index === -1) return { prefix: name, highlight: "", suffix: "" };
  return {
    prefix: name.slice(0, index),
    highlight,
    suffix: name.slice(index + highlight.length)
  };
}
