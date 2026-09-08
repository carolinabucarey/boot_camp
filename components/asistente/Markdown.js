/* Pinta lo que devuelve analizarMarkdown. Ver ahí por qué no usamos HTML. */
import { analizar } from "./analizarMarkdown";

function Segmentos({ segmentos }) {
  return segmentos.map((s, i) => {
    if (s.tipo === "fuerte") return <strong key={i}>{s.valor}</strong>;
    if (s.tipo === "codigo") return <code key={i}>{s.valor}</code>;
    if (s.tipo === "enlace") {
      return (
        <a key={i} href={s.valor} target="_blank" rel="noopener noreferrer nofollow">
          {s.valor}
        </a>
      );
    }
    return <span key={i}>{s.valor}</span>;
  });
}

export default function Markdown({ texto }) {
  return analizar(texto).map((bloque, i) => {
    if (bloque.tipo === "lista") {
      return (
        <ul key={i}>
          {bloque.items.map((item, j) => (
            <li key={j}><Segmentos segmentos={item} /></li>
          ))}
        </ul>
      );
    }
    if (bloque.tipo === "numerada") {
      return (
        <ol key={i}>
          {bloque.items.map((item, j) => (
            <li key={j}><Segmentos segmentos={item} /></li>
          ))}
        </ol>
      );
    }
    return <p key={i}><Segmentos segmentos={bloque.segmentos} /></p>;
  });
}
