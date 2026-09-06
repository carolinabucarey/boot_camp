import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StructuredData from "@/components/StructuredData";
import FaqList from "@/components/FaqList";
import CourseContact from "@/components/CourseContact";
import { siteContent, getProgramBySlug } from "@/lib/site-content";
import { getCapacityInfo, getPaymentCta, remainingLabel } from "@/lib/program-helpers";
import { CROSS_PAGE_NAV_ITEMS, programFooterColumns } from "@/lib/nav";

const program = getProgramBySlug("crea-tu-primer-agente-con-ia-online");

export const metadata = {
  title: "Crea tu primer agente con IA — Edición online | MAILE",
  description: "Crea una primera versión de tu propio agente de IA en dos sesiones online en vivo, el 1 y 2 de octubre de 2026. Nivel inicial, sin programación.",
  robots: "index,follow,max-image-preview:large",
  alternates: { canonical: "/programas/crea-tu-primer-agente-con-ia-online" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "MAILE",
    title: "Crea tu primer agente con IA — Edición online | MAILE",
    description: "Dos sesiones online en vivo para convertir un objetivo real en un agente de IA creado por ti.",
    url: "https://www.maile.cl/programas/crea-tu-primer-agente-con-ia-online",
    images: [
      { url: "https://www.maile.cl/assets/og-social.png", width: 1200, height: 630, alt: "Programa Crea tu primer agente con IA — Edición online de MAILE" }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Crea tu primer agente con IA — Edición online | MAILE",
    description: "1 y 2 de octubre de 2026 · Online en vivo · Nivel inicial · $70.000 CLP.",
    images: [{ url: "https://www.maile.cl/assets/og-social.png", alt: "Programa Crea tu primer agente con IA — Edición online de MAILE" }]
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
        {
          "@type": "ListItem",
          position: 3,
          name: "Crea tu primer agente con IA — Edición online",
          item: "https://www.maile.cl/programas/crea-tu-primer-agente-con-ia-online"
        }
      ]
    },
    {
      "@type": "Course",
      name: "Crea tu primer agente con IA — Edición online",
      description: "Programa práctico de nivel inicial para convertir un objetivo real en una primera versión de un agente de IA creada y probada por cada participante.",
      provider: { "@type": "Organization", name: "MAILE", sameAs: "https://www.maile.cl/" },
      coursePrerequisites: "No se requiere experiencia técnica ni conocimientos de programación.",
      educationalLevel: "Inicial",
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        startDate: "2026-10-01T19:00:00-03:00",
        endDate: "2026-10-02T21:00:00-03:00",
        offers: {
          "@type": "Offer",
          price: "70000",
          priceCurrency: "CLP",
          availability: "https://schema.org/InStock",
          url: "https://www.maile.cl/programas/crea-tu-primer-agente-con-ia-online"
        }
      }
    },
    {
      "@type": "Event",
      name: "Crea tu primer agente con IA — Edición online",
      description: "Dos sesiones online en vivo para crear y probar una primera versión de un agente de IA propio.",
      startDate: "2026-10-01T19:00:00-03:00",
      endDate: "2026-10-02T21:00:00-03:00",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: { "@type": "VirtualLocation", url: "https://www.maile.cl/programas/crea-tu-primer-agente-con-ia-online" },
      organizer: { "@type": "Organization", name: "MAILE", url: "https://www.maile.cl/" },
      offers: {
        "@type": "Offer",
        price: "70000",
        priceCurrency: "CLP",
        availability: "https://schema.org/InStock",
        url: "https://www.maile.cl/programas/crea-tu-primer-agente-con-ia-online"
      }
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "¿Necesito saber programar?", acceptedAnswer: { "@type": "Answer", text: "No. El programa está diseñado para mujeres sin experiencia técnica previa." } },
        { "@type": "Question", name: "¿Tengo que tener un negocio?", acceptedAnswer: { "@type": "Answer", text: "No. Puedes trabajar sobre una necesidad de tu trabajo, un proyecto, una idea, un negocio o un objetivo personal." } },
        { "@type": "Question", name: "¿Saldré con un agente terminado?", acceptedAnswer: { "@type": "Answer", text: "Saldrás con una primera versión creada y probada que podrás continuar ajustando." } },
        {
          "@type": "Question",
          name: "¿Qué incluye el valor?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Incluye las dos sesiones online en vivo, los materiales y el acompañamiento durante la creación. Además, las primeras inscritas reciben 500 créditos en ChatGPT y una semana de Claude Cowork."
          }
        }
      ]
    }
  ]
};

export default function ProgramaAgenteIaOnlinePage() {
  const { brand } = siteContent;
  const cta = getPaymentCta(program);
  const { hasRemaining, remaining } = getCapacityInfo(program.capacity);

  return (
    <>
      <StructuredData data={STRUCTURED_DATA} />
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader navItems={CROSS_PAGE_NAV_ITEMS} current={null} ctaLabel={cta.label || "Inscribirme"} ctaHref={cta.href} />

      <main id="contenido">
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumbs">
              <a href="/">Inicio</a> / <a href="/#programas">Programas</a> / <span>{program.name}</span>
            </p>
            <p className="eyebrow">Inscripciones abiertas · Edición online</p>
            <h1>{program.name}</h1>
            <p className="lead">{program.promise}</p>
            <p className="hero-support">Jueves 1 y viernes 2 de octubre de 2026 · 19:00 a 21:00 horas, horario de Chile · $70.000 CLP</p>
            <div className="button-row">
              <a className="btn btn-light btn-arrow" href={cta.href}>
                {cta.label || "Reservar mi cupo"}
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container program-layout">
            <div>
              <section className="prose-section">
                <p className="eyebrow">La experiencia</p>
                <h2>De una necesidad real a una primera solución propia</h2>
                <p>
                  Aprenderás qué es un agente de inteligencia artificial, cómo definir una aplicación útil y cómo construir una
                  primera versión para tu propio caso. En la primera sesión descubrirás las posibilidades y límites de esta
                  tecnología y diseñarás la estructura de tu agente. En la segunda, trabajarás paso a paso para crearlo, probarlo y
                  mejorarlo.
                </p>
                <p className="prose-note">No necesitas saber programar ni tener experiencia técnica previa.</p>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Qué podrás crear</p>
                <h2>Un agente configurado para ayudarte con un objetivo concreto</h2>
                <p>
                  Podrás crear, por ejemplo, un agente para organizar información, preparar contenidos, responder preguntas
                  frecuentes, apoyar la planificación de tareas, desarrollar una idea o facilitar una parte de tu trabajo.
                </p>
                <p className="prose-note">Cada participante trabajará sobre su propio objetivo.</p>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Programa</p>
                <h2>Dos sesiones para definir, crear y probar</h2>
                <div className="session-list">
                  <article className="session-card">
                    <header>
                      <div>
                        <p className="eyebrow">Día 1</p>
                        <h3>Descubrimiento y fundamentos</h3>
                      </div>
                      <span className="session-date">Jueves 1 · 19:00–21:00</span>
                    </header>
                    <p>De una necesidad real a una idea de solución.</p>
                    <ul className="check-list">
                      <li>Qué es un agente de IA y cómo funciona.</li>
                      <li>Diferencias entre usar un chat y crear un agente con un objetivo definido.</li>
                      <li>Posibilidades, límites y usos responsables de la inteligencia artificial.</li>
                      <li>Ejemplos aplicados al trabajo, los proyectos y los negocios.</li>
                      <li>Identificación de una necesidad concreta.</li>
                      <li>Definición del objetivo y de las personas que utilizarán el agente.</li>
                      <li>Organización de la información que necesitará.</li>
                      <li>Diseño de la primera propuesta del agente.</li>
                    </ul>
                    <p className="session-result">
                      <strong>Resultado:</strong> tendrás definido qué quieres crear, para quién y qué necesita saber tu agente.
                    </p>
                  </article>
                  <article className="session-card">
                    <header>
                      <div>
                        <p className="eyebrow">Día 2</p>
                        <h3>Manos a la obra</h3>
                      </div>
                      <span className="session-date">Viernes 2 · 19:00–21:00</span>
                    </header>
                    <p>De la idea a una primera versión creada por ti.</p>
                    <ul className="check-list">
                      <li>Construcción guiada del agente.</li>
                      <li>Creación de sus instrucciones y forma de responder.</li>
                      <li>Incorporación de información relevante.</li>
                      <li>Pruebas con preguntas y situaciones reales.</li>
                      <li>Revisión de respuestas y detección de mejoras.</li>
                      <li>Ajustes de la primera versión.</li>
                      <li>Recomendaciones para continuar utilizándolo y desarrollándolo.</li>
                    </ul>
                    <p className="session-result">
                      <strong>Resultado:</strong> terminarás con una primera versión de tu agente creada y probada durante el curso.
                    </p>
                  </article>
                </div>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Beneficio</p>
                <h2>Más herramientas para seguir creando</h2>
                <div className="included-benefit">
                  <span aria-hidden="true">+</span>
                  <div>
                    <h3>Beneficio para las primeras inscritas</h3>
                    <p>500 créditos en ChatGPT y una semana de Claude Cowork.</p>
                  </div>
                </div>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Para quién es</p>
                <h2>Para comenzar con intención y autonomía</h2>
                <ul className="check-list">
                  <li>Sabes que la IA podría ayudarte, pero todavía no encuentras una aplicación concreta.</li>
                  <li>Quieres facilitar una tarea de tu trabajo.</li>
                  <li>Tienes una idea o proyecto que quieres desarrollar.</li>
                  <li>Necesitas organizar o comunicar mejor determinada información.</li>
                  <li>Tienes un negocio y quieres mejorar una parte de su funcionamiento.</li>
                  <li>Has probado herramientas de IA y quieres utilizarlas con mayor intención.</li>
                </ul>
                <p className="prose-note">{program.audience}</p>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Metodología</p>
                <h2>Define, crea, prueba y continúa</h2>
                <p>{program.methodology}</p>
              </section>
              <section className="prose-section">
                <p className="eyebrow">Requisitos</p>
                <h2>Lo necesario para participar</h2>
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
              <p className="status-inline">Inscripciones abiertas</p>
              <h3>Información práctica</h3>
              <div className="info-list">
                <div className="info-item">
                  <span>Fechas</span>
                  <strong>{program.eventDate}</strong>
                </div>
                <div className="info-item">
                  <span>Horario</span>
                  <strong>{program.eventTime}</strong>
                </div>
                <div className="info-item">
                  <span>Modalidad</span>
                  <strong>{program.modality}</strong>
                </div>
                <div className="info-item">
                  <span>Duración</span>
                  <strong>{program.duration}</strong>
                </div>
                <div className="info-item">
                  <span>Nivel</span>
                  <strong>{program.level}</strong>
                </div>
                <div className="info-item">
                  <span>Valor</span>
                  <strong>{program.price?.general}</strong>
                </div>
                {hasRemaining && (
                  <div className="info-item">
                    <span>Cupos</span>
                    <strong>{remainingLabel(null, remaining)}</strong>
                  </div>
                )}
                <div className="info-item">
                  <span>Beneficio</span>
                  <strong>500 créditos en ChatGPT y una semana de Claude Cowork para las primeras inscritas</strong>
                </div>
                <div className="info-item">
                  <span>Requisito</span>
                  <strong>Computador e internet estable</strong>
                </div>
              </div>
              <a className="btn btn-primary btn-block" href={cta.href}>
                {cta.label || "Reservar mi cupo"}
              </a>
              <p className="fine-print" style={{ marginTop: "14px" }}>
                {program.eventAccess}
              </p>
              <CourseContact />
            </aside>
          </div>
        </section>

        <section className="section section-plum">
          <div className="container section-header center">
            <p className="eyebrow">Da el primer paso</p>
            <h2>Trabaja sobre un objetivo real y crea una solución que puedas utilizar</h2>
            <p className="lead">Dos sesiones online en vivo · 1 y 2 de octubre · $70.000 CLP</p>
            <div className="button-row center-buttons">
              <a className="btn btn-light btn-arrow" href={cta.href}>
                {cta.label || "Reservar mi cupo"}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter columns={programFooterColumns(brand)} />
    </>
  );
}
