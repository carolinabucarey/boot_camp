import Wordmark from "@/components/Wordmark";
import { siteContent } from "@/lib/site-content";

export const metadata = {
  title: "Términos | Maile",
  description: "Términos generales de participación y uso del sitio de Maile.",
  robots: "noindex,follow"
};

export default function TerminosPage() {
  const { email } = siteContent.brand;

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="container nav-shell">
          <Wordmark />
          <div className="nav-actions">
            <a className="btn btn-secondary" href="/">
              Volver al inicio
            </a>
          </div>
        </div>
      </header>
      <main className="section" id="contenido">
        <article className="container legal-shell">
          <p className="eyebrow">Información legal</p>
          <h1>Términos generales</h1>
          <p>Este texto es una base informativa y deberá actualizarse cuando se defina formalmente la iniciativa y las condiciones de sus programas.</p>
          <h2>Información del sitio</h2>
          <p>
            Los programas, fechas, cupos, costos y requisitos publicados pueden actualizarse. Las condiciones definitivas se
            comunicarán de forma clara antes de confirmar una participación.
          </p>
          <h2>Inscripciones y listas de interés</h2>
          <p>
            Enviar un formulario no garantiza un cupo. Cuando exista una convocatoria, informaremos sus condiciones, proceso de
            inscripción y forma de confirmación.
          </p>
          <h2>Programas para organizaciones</h2>
          <p>
            Las propuestas institucionales se definen según el contexto, alcance y necesidades de cada organización. Cualquier
            compromiso se formalizará por separado.
          </p>
          <h2>Propiedad intelectual</h2>
          <p>
            Los contenidos y materiales de cada experiencia indicarán sus condiciones de uso. Las participantes conservan la
            autoría y responsabilidad sobre sus propios proyectos.
          </p>
          <h2>Contacto</h2>
          <p>
            {email ? (
              <>
                Para consultas, escríbenos a <a href={`mailto:${email}`}>{email}</a> o contáctanos por{" "}
              </>
            ) : (
              "Para consultas, contáctanos por "
            )}
            <a href="https://wa.me/56990195787" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{" "}
            o{" "}
            <a href="https://www.instagram.com/maile_edtech/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            .
          </p>
        </article>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-bottom" style={{ marginTop: 0 }}>
            <span>© {new Date().getFullYear()} Maile.</span>
            <a href="/privacidad">Ver política de privacidad</a>
          </div>
        </div>
      </footer>
    </>
  );
}
