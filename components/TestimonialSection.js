// Sin comentarios reales, la sección completa no se muestra (igual que en script.js).
export default function TestimonialSection({ testimonials }) {
  if (!testimonials.length) return null;
  return (
    <section className="section section-tint" id="testimonios">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Lo que dicen</p>
          <h2>Palabras de quienes ya pasaron por un taller</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <figure className="testimonial" key={index}>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                <strong>{testimonial.author}</strong>
                {testimonial.role && <span>{testimonial.role}</span>}
                {testimonial.program && <span className="testimonial-program">{testimonial.program}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
