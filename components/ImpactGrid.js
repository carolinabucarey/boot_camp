// Sin cifras reales, la grilla no se muestra (igual que en script.js).
export default function ImpactGrid({ indicators }) {
  if (!indicators.length) return null;
  return (
    <div className="impact-grid">
      {indicators.map((indicator) => (
        <article className="impact-card" key={indicator.label}>
          <span className="impact-value">{indicator.value}</span>
          <span className="impact-label">{indicator.label}</span>
        </article>
      ))}
    </div>
  );
}
