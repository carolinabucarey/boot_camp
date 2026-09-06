import Wordmark from "@/components/Wordmark";

export const metadata = {
  title: "Política de privacidad | MAILE",
  description: "Información sobre el tratamiento de datos personales en MAILE.",
  robots: "noindex,follow"
};

export default function PrivacidadPage() {
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
          <h1>Política de privacidad</h1>
          <p>
            Esta es una versión inicial y deberá revisarse cuando se defina el nombre legal de la iniciativa, sus responsables y las
            herramientas que procesarán los formularios.
          </p>
          <h2>Datos que solicitamos</h2>
          <p>
            Los formularios pueden solicitar nombre, correo, teléfono, ciudad, intereses y, en consultas institucionales,
            antecedentes de la organización. Solo pedimos información necesaria para responder solicitudes y comunicar próximas
            actividades.
          </p>
          <h2>Uso de la información</h2>
          <p>
            Utilizaremos los datos para responder consultas, gestionar listas de interés, informar convocatorias y diseñar
            programas acordes a las necesidades expresadas. No venderemos datos personales.
          </p>
          <h2>Dónde se guardan</h2>
          <p>
            Los datos enviados desde los formularios se almacenan en una planilla de Google Sheets administrada por el equipo de la
            iniciativa, a la que solo accede quien gestiona las convocatorias. El envío se realiza mediante Google Apps Script.
          </p>
          <h2>Conservación y derechos</h2>
          <p>
            La política definitiva indicará los plazos de conservación, proveedores involucrados y mecanismos para solicitar
            acceso, rectificación o eliminación de datos.
          </p>
          <h2>Contacto</h2>
          <p>
            Para consultas sobre privacidad, contáctanos por{" "}
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
            <span>© {new Date().getFullYear()} MAILE.</span>
            <a href="/terminos">Ver términos</a>
          </div>
        </div>
      </footer>
    </>
  );
}
