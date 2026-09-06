import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StructuredData from "@/components/StructuredData";
import FaqList from "@/components/FaqList";
import CourseContact from "@/components/CourseContact";
import { siteContent, getProgramBySlug } from "@/lib/site-content";
import { CROSS_PAGE_NAV_ITEMS, programFooterColumns } from "@/lib/nav";

const program = getProgramBySlug("crea-tu-primer-agente-con-ia");

export const metadata = {
  title: "Crea tu primer agente con IA | Maile",
  description: "Trabaja sobre un objetivo real y crea una primera versión de tu propio agente de IA en una experiencia práctica, presencial y acompañada.",
  robots: "index,follow,max-image-preview:large",
  alternates: { canonical: "/programas/crea-tu-primer-agente-con-ia" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "MAILE",
    title: "Crea tu primer agente con IA | Maile",
    description: "Parte de un objetivo real y crea una primera versión de tu agente de IA, probada e iterable.",
    url: "https://www.maile.cl/programas/crea-tu-primer-agente-con-ia",
    images: [{ url: "https://www.maile.cl/assets/og-social.png", width: 1200, height: 630, alt: "Programa Crea tu primer agente con IA de MAILE" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Crea tu primer agente con IA | Maile",
    description: "Una experiencia práctica, presencial y acompañada para crear una primera versión de tu agente de IA.",
    images: [{ url: "https://www.maile.cl/assets/og-social.png" }]
  }
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.maile.cl/" },
        { "@type": "ListItem", position: 2, name: "Programas", item: "https://www.maile.cl/#programas" },
        { "@type": "ListItem", position: 3, name: "Crea tu primer agente con IA", item: "https://www.maile.cl/programas/crea-tu-primer-agente-con-ia" }
      ]
    },
    {
      "@type": "Course",
      name: "Crea tu primer agente con IA",
      description: "Programa práctico para convertir un objetivo real en una primera versión de un agente de IA creada, probada e iterable.",
      provider: { "@type": "Organization", name: "MAILE", sameAs: "https://www.maile.cl/" },
      coursePrerequisites: "No se requiere experiencia técnica ni conocimientos de programación.",
      educationalLevel: "Inicial"
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "¿Necesito saber programar?", acceptedAnswer: { "@type": "Answer", text: "No. El programa está diseñado para mujeres sin experiencia técnica previa." } },
        { "@type": "Question", name: "¿Tengo que tener un negocio?", acceptedAnswer: { "@type": "Answer", text: "No. Puedes trabajar sobre una necesidad de tu trabajo, proyecto, negocio o desarrollo profesional." } },
        { "@type": "Question", name: "¿Saldré con un agente terminado?", acceptedAnswer: { "@type": "Answer", text: "Saldrás con una primera versión creada y probada que podrás continuar ajustando." } }
      ]
    }
  ]
};

export default function ProgramaAgenteIaPage() {
  const { brand } = siteContent;
  const registrationHref = "/#contacto";

  return (
    <>
      <StructuredData data={STRUCTURED_DATA} />
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader navItems={CROSS_PAGE_NAV_ITEMS} current={null} ctaLabel="Próximos programas" ctaHref={registrationHref} />

      <main id="contenido">
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumbs">
              <a href="/">Inicio</a> / <a href="/#programas">Programas</a> / <span>{program.name}</span>
            </p>
            <p className="eyebrow">Nueva fecha por confirmar</p>
            <h1>{program.name}</h1>
            <p className="lead">{program.promise}</p>
            <p className="hero-support">Una experiencia presencial, práctica y acompañada. No necesitas saber programar ni tener experiencia técnica previa.</p>
            <div className="button-row">
              <a className="btn btn-light btn-arrow" href={registrationHref}>
                Avísenme cuando haya una nueva fecha
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container program-layout">
            <div>
              <section className="prose-section">
                <p className="eyebrow">El problema</p>
                <h2>¿Sabes que la IA podría ayudarte, pero no cómo convertirla en algo útil?</h2>
                <p>
                  Puedes haber probado ChatGPT u otras herramientas y aun así no saber cómo aplicarlas a una necesidad concreta. En
                  este programa aprenderás a definir qué quieres resolver, ordenar la información que necesita tu agente y construir
                  una primera versión que responda a tu objetivo.
                </p>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Para quién es</p>
                <h2>Este programa puede ser para ti si…</h2>
                <ul className="check-list">
                  <li>Quieres organizar o mejorar una tarea de tu trabajo.</li>
                  <li>Tienes una idea o proyecto que quieres impulsar.</li>
                  <li>Necesitas responder consultas o entregar información de forma más clara.</li>
                  <li>Tienes un negocio y quieres facilitar una parte de la atención o comunicación.</li>
                  <li>Ya probaste herramientas de IA, pero todavía no logras aplicarlas bien.</li>
                  <li>Nunca has usado IA y quieres comenzar acompañada.</li>
                </ul>
                <p className="prose-note">{program.audience}</p>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Qué es un agente</p>
                <h2>Una herramienta configurada para tu objetivo</h2>
                <p>
                  Un agente de IA es una herramienta configurada para responder a un objetivo específico utilizando las instrucciones
                  y la información que tú defines. Durante el programa crearás una primera versión orientada a tu caso; no
                  desarrollarás software complejo ni una solución empresarial terminada.
                </p>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Qué harás</p>
                <h2>Aprenderás mientras construyes</h2>
                <ol className="number-list">
                  {program.learn.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Resultado</p>
                <h2>Terminarás con una primera solución creada por ti</h2>
                <p>
                  Al finalizar tendrás un agente de IA inicial, configurado para un objetivo propio, probado durante el encuentro y
                  acompañado por una guía para que puedas seguir ajustándolo.
                </p>
                <p className="prose-note">
                  El alcance final dependerá del objetivo y de la información disponible. El programa entrega una primera versión
                  funcional e iterable, no una implementación empresarial completa.
                </p>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Metodología</p>
                <h2>Práctica, cercana y acompañada</h2>
                <p>{program.methodology}</p>
              </section>

              <section className="prose-section" aria-labelledby="facilitadoras-title">
                <p className="eyebrow">Facilitadoras</p>
                <h2 id="facilitadoras-title">Acompañamiento desde la experiencia</h2>
                <div className="facilitator-list">
                  <article className="facilitator-profile">
                    <div className="facilitator-heading">
                      <h3>Carolina Bucarey</h3>
                      <a
                        className="linkedin-link"
                        href="https://www.linkedin.com/in/carolinabucarey/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Perfil de Carolina Bucarey en LinkedIn"
                      >
                        in
                      </a>
                    </div>
                    <p>
                      Ingeniera civil industrial y MBA, con experiencia en estrategia, operaciones y productos digitales. Acompaña a
                      convertir necesidades en soluciones concretas con tecnología e inteligencia artificial.
                    </p>
                  </article>
                  <article className="facilitator-profile">
                    <div className="facilitator-heading">
                      <h3>Jackeline Advincula</h3>
                      <a
                        className="linkedin-link"
                        href="https://www.linkedin.com/in/jackelineadvincula/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Perfil de Jackeline Advincula en LinkedIn"
                      >
                        in
                      </a>
                    </div>
                    <p>
                      Ingeniera química, gestora de proyectos y fundadora de una empresa que desarrolla soluciones con IA. Acompaña la
                      creación y prueba de agentes aplicados a objetivos reales.
                    </p>
                  </article>
                </div>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Requisitos</p>
                <h2>Lo necesario para esta experiencia</h2>
                <ul className="check-list">
                  {program.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Preguntas frecuentes</p>
                <h2>Antes de participar</h2>
                <FaqList faqs={program.faqs} />
              </section>
            </div>

            <aside className="info-panel" aria-label="Información del programa">
              <p className="status-inline">Nueva fecha por confirmar</p>
              <h3>Información práctica</h3>
              <div className="info-list">
                <div className="info-item">
                  <span>Estado</span>
                  <strong>Nueva fecha por confirmar</strong>
                </div>
                <div className="info-item">
                  <span>Modalidad</span>
                  <strong>{program.modality}</strong>
                </div>
                <div className="info-item">
                  <span>Nivel</span>
                  <strong>{program.level}</strong>
                </div>
                <div className="info-item">
                  <span>Ciudad</span>
                  <strong>{program.city}</strong>
                </div>
                <div className="info-item">
                  <span>Duración</span>
                  <strong>{program.duration}</strong>
                </div>
                <div className="info-item">
                  <span>Fecha y horario</span>
                  <strong>Por confirmar</strong>
                </div>
                <div className="info-item">
                  <span>Lugar</span>
                  <strong>Por confirmar</strong>
                </div>
                <div className="info-item">
                  <span>Valor</span>
                  <strong>Por confirmar</strong>
                </div>
                <div className="info-item">
                  <span>Requisito</span>
                  <strong>Computador personal</strong>
                </div>
              </div>
              <a className="btn btn-primary btn-block" href={registrationHref}>
                Quiero conocer la próxima fecha
              </a>
              <p className="fine-print" style={{ marginTop: "14px" }}>
                Te avisaremos cuando la próxima edición esté confirmada.
              </p>
              <CourseContact />
            </aside>
          </div>
        </section>

        <section className="section section-plum">
          <div className="container section-header center">
            <p className="eyebrow">Lista de interés</p>
            <h2>Convierte una necesidad en algo que puedas usar</h2>
            <p className="lead">Cuéntanos qué te gustaría resolver y te avisaremos cuando haya una nueva fecha.</p>
            <div className="button-row center-buttons">
              <a className="btn btn-light btn-arrow" href={registrationHref}>
                Quiero conocer la próxima fecha
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter columns={programFooterColumns(brand)} />
    </>
  );
}
