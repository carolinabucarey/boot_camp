import Wordmark from "@/components/Wordmark";
import { siteContent } from "@/lib/site-content";

export const metadata = {
  title: "Política de privacidad | Maile",
  description: "Información sobre el tratamiento de datos personales en Maile.",
  robots: "noindex,follow"
};

export default function PrivacidadPage() {
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
          <h1>Política de privacidad</h1>
          <p>
            Esta es una versión inicial y deberá revisarse cuando se defina el nombre legal de la iniciativa, sus responsables y las
            herramientas que procesarán los formularios.
          </p>
          <h2>Datos que solicitamos</h2>
          <p>
            Los formularios pueden solicitar nombre, correo, teléfono, ciudad, intereses y, en postulaciones a la red de mentoras,
            antecedentes sobre experiencia, trayectoria y disponibilidad. En consultas institucionales también pueden solicitarse
            antecedentes de la organización. Solo pedimos información necesaria para responder solicitudes y comunicar próximas
            actividades.
          </p>
          <h2>Uso de la información</h2>
          <p>
            Utilizaremos los datos para responder consultas, gestionar listas de interés, evaluar incorporaciones a la red de
            mentoras, informar convocatorias y diseñar programas acordes a las necesidades expresadas. No venderemos datos
            personales.
          </p>
          <h2>El asistente del taller</h2>
          <p>
            Quienes participaron en un taller acceden, con un código de cohorte, a un asistente conversacional dentro del sitio.
            Ese asistente no solicita nombre, correo ni teléfono, y el acceso no identifica a cada participante: el código es de
            la cohorte completa.
          </p>
          <p>
            Guardamos las preguntas y las respuestas de esas conversaciones, junto con la valoración que cada persona deje sobre
            si la respuesta le sirvió. Lo hacemos para mejorar el material del taller con lo que realmente se pregunta. Como el
            texto lo escribe quien consulta, puede contener información de su proyecto: te pedimos no escribir ahí datos
            personales, de terceros ni información confidencial.
          </p>
          <p>
            Estos registros se conservan un máximo de 180 días y luego se eliminan automáticamente. Solo accede a ellos el equipo
            que prepara los talleres.
          </p>
          <h2>Dónde se guardan</h2>
          <p>
            Los datos enviados desde los formularios se almacenan en una planilla de Google Sheets administrada por el equipo de la
            iniciativa, a la que solo accede quien gestiona las convocatorias. El envío se realiza mediante Google Apps Script.
          </p>
          <p>
            Las conversaciones del asistente se almacenan en una base de datos de Amazon Web Services alojada en Estados Unidos, y
            las respuestas las genera Claude, de Anthropic, a través de Amazon Bedrock.
          </p>
          <h2>Conservación y derechos</h2>
          <p>
            La política definitiva indicará los plazos de conservación, proveedores involucrados y mecanismos para solicitar
            acceso, rectificación o eliminación de datos.
          </p>
          <h2>Contacto</h2>
          <p>
            {email ? (
              <>
                Para consultas sobre privacidad, escríbenos a <a href={`mailto:${email}`}>{email}</a> o contáctanos por{" "}
              </>
            ) : (
              "Para consultas sobre privacidad, contáctanos por "
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
            <a href="/terminos">Ver términos</a>
          </div>
        </div>
      </footer>
    </>
  );
}
