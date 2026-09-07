import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StructuredData from "@/components/StructuredData";
import FaqList from "@/components/FaqList";
import CourseContact from "@/components/CourseContact";
import { siteContent, getProgramBySlug } from "@/lib/site-content";
import { getPaymentCta, capacityLabel } from "@/lib/program-helpers";
import { CROSS_PAGE_NAV_ITEMS, programFooterColumns } from "@/lib/nav";

const program = getProgramBySlug("crea-tu-primera-web-con-ia");

export const metadata = {
  title: "Crea y publica tu proyecto web con IA | MAILE",
  description: "Programa online en vivo el 7 y 8 de octubre de 2026 para crear una solución web con ChatGPT y Claude, guardarla en GitHub y publicarla en Vercel.",
  robots: "index,follow,max-image-preview:large",
  alternates: { canonical: "/programas/crea-tu-primera-web-con-ia" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "MAILE",
    title: "Crea y publica tu proyecto web con IA | MAILE",
    description: "7 y 8 de octubre de 2026 · Dos jornadas online en vivo · 10 cupos · Resultado: una primera solución web publicada.",
    url: "https://www.maile.cl/programas/crea-tu-primera-web-con-ia",
    images: [{ url: "https://www.maile.cl/assets/og-social.png", width: 1200, height: 630, alt: "Crea y publica tu proyecto web con IA, programa de MAILE" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Crea y publica tu proyecto web con IA | MAILE",
    description: "Convierte una idea clara en una primera solución web creada y publicada por ti.",
    images: [{ url: "https://www.maile.cl/assets/og-social.png", alt: "Crea y publica tu proyecto web con IA, programa de MAILE" }]
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
        { "@type": "ListItem", position: 3, name: "Crea y publica tu proyecto web con IA", item: "https://www.maile.cl/programas/crea-tu-primera-web-con-ia" }
      ]
    },
    {
      "@type": "Course",
      name: "Crea y publica tu proyecto web con IA",
      description: "Programa online en vivo para convertir una idea clara en una primera solución web utilizando ChatGPT y Claude, guardarla en GitHub y publicarla en Vercel.",
      provider: { "@type": "Organization", name: "MAILE", sameAs: "https://www.maile.cl/" },
      offers: {
        "@type": "Offer",
        price: "74990",
        priceCurrency: "CLP",
        availability: "https://schema.org/InStock",
        url: "https://www.maile.cl/programas/crea-tu-primera-web-con-ia"
      }
    },
    {
      "@type": "Event",
      name: "Crea y publica tu proyecto web con IA",
      description: "Dos jornadas online en vivo para convertir una idea clara en una primera solución web creada y publicada por cada participante.",
      startDate: "2026-10-07",
      endDate: "2026-10-08",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: { "@type": "VirtualLocation", url: "https://www.maile.cl/programas/crea-tu-primera-web-con-ia" },
      organizer: { "@type": "Organization", name: "MAILE", url: "https://www.maile.cl/" },
      maximumAttendeeCapacity: 10,
      offers: {
        "@type": "Offer",
        price: "74990",
        priceCurrency: "CLP",
        availability: "https://schema.org/InStock",
        url: "https://www.maile.cl/programas/crea-tu-primera-web-con-ia"
      }
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "¿Necesito saber programar?", acceptedAnswer: { "@type": "Answer", text: "No. Trabajaremos con instrucciones en lenguaje natural. Sí debes tener experiencia previa utilizando ChatGPT y Claude." } },
        {
          "@type": "Question",
          name: "¿Puedo participar si solamente tengo una idea general?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Necesitas tener cierta claridad sobre qué quieres crear, para quién y qué debería permitir hacer. Antes del programa te pediremos una descripción breve para ayudarte a acotar el proyecto."
          }
        },
        {
          "@type": "Question",
          name: "¿Necesito instalar algún programa?",
          acceptedAnswer: { "@type": "Answer", text: "Te guiaremos paso a paso en la preparación de las herramientas al inicio de la segunda jornada. Trabajaremos con ChatGPT, Claude Code, GitHub y Vercel." }
        },
        {
          "@type": "Question",
          name: "¿Las suscripciones están incluidas?",
          acceptedAnswer: { "@type": "Answer", text: "No. Cada participante debe contar con una suscripción activa a Claude Code o a ChatGPT, en su plan más económico." }
        },
        {
          "@type": "Question",
          name: "¿Terminaré con una aplicación completa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Terminarás con una primera versión web funcional y acotada. El alcance dependerá de la complejidad del proyecto y del punto de partida de cada participante."
          }
        },
        {
          "@type": "Question",
          name: "¿El dominio quedará a mi nombre?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. MAILE realizará la compra y configuración inicial. Después deberás crear una cuenta en NIC Chile para transferir la titularidad y administración del dominio."
          }
        }
      ]
    }
  ]
};

export default function ProgramaWebIaPage() {
  const { brand } = siteContent;
  const cta = getPaymentCta(program);

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
            <p className="hero-support">7 y 8 de octubre de 2026 · 18:30 a 20:30 horas · 10 cupos · $74.990 CLP</p>
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
                <h2>De una idea clara a una web que puedas mostrar</h2>
                <p>
                  Trabajarás sobre una idea, proyecto o necesidad propia para convertirla en una primera solución web utilizando
                  ChatGPT y Claude. Aprenderás a definir qué quieres construir, darle instrucciones claras a la inteligencia
                  artificial, revisar lo que genera y publicar el resultado en internet.
                </p>
                <p className="prose-note">No necesitas saber programar.</p>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Qué podrás crear</p>
                <h2>Una primera solución web funcional y acotada</h2>
                <ul className="check-list">
                  <li>Una página para presentar un proyecto, servicio o iniciativa.</li>
                  <li>Una página de aterrizaje.</li>
                  <li>Un portafolio profesional.</li>
                  <li>Una web informativa.</li>
                  <li>Una página de inscripción o contacto.</li>
                  <li>Un prototipo sencillo para mostrar y probar una idea.</li>
                </ul>
                <p className="prose-note">El objetivo es que termines con una versión que puedas mostrar, utilizar y continuar mejorando.</p>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Para quién es</p>
                <h2>Para avanzar más allá de los usos básicos de la IA</h2>
                <p>{program.audience}</p>
                <ul className="check-list">
                  <li>Quieres comprender cómo se crea, modifica y publica una web.</li>
                  <li>No sabes programar, pero quieres aprender a dirigir herramientas que generan código.</li>
                  <li>Buscas mayor autonomía para desarrollar y probar tus ideas.</li>
                </ul>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Programa</p>
                <h2>Dos jornadas: primero defines, después construyes y publicas</h2>
                <div className="session-list">
                  <article className="session-card">
                    <header>
                      <div>
                        <p className="eyebrow">Día 1</p>
                        <h3>De la idea a un proyecto definido</h3>
                      </div>
                      <span className="session-date">Miércoles 7</span>
                    </header>
                    <p>Entenderás cómo funciona una web y dejarás tu proyecto definido antes de escribir una sola línea.</p>
                    <ul className="check-list">
                      <li>Entender cómo funciona una página web.</li>
                      <li>Definir el objetivo de tu página.</li>
                      <li>Escribir el contenido de tu proyecto.</li>
                      <li>Ordenar tu marca antes del diseño.</li>
                      <li>Elegir tus referencias visuales.</li>
                    </ul>
                    <p className="session-result">
                      <strong>Resultado:</strong> llegarás al día 2 con tu objetivo, tu contenido, tu guía de marca, el boceto de tu página y tus referencias.
                    </p>
                  </article>
                  <article className="session-card">
                    <header>
                      <div>
                        <p className="eyebrow">Día 2</p>
                        <h3>De la definición a tu web publicada</h3>
                      </div>
                      <span className="session-date">Jueves 8</span>
                    </header>
                    <p>Construirás tu página con inteligencia artificial y la dejarás publicada en internet.</p>
                    <ul className="check-list">
                      <li>Preparar tus herramientas de trabajo.</li>
                      <li>Conocer el stack que usaremos.</li>
                      <li>Trabajar con el ciclo pedir, mirar, corregir y publicar.</li>
                      <li>Construir tu página con inteligencia artificial.</li>
                      <li>Guardar versiones de tu trabajo en GitHub.</li>
                      <li>Publicar tu web y conectar tu dominio .cl.</li>
                    </ul>
                    <p className="session-result">
                      <strong>Resultado:</strong> terminarás con tu web publicada y un proceso que podrás repetir por tu cuenta.
                    </p>
                  </article>
                </div>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Con qué terminarás</p>
                <h2>Una solución propia y un proceso que podrás repetir</h2>
                <ul className="check-list">
                  {program.learn.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Metodología</p>
                <h2>Aprendizaje práctico sobre tu propio proyecto</h2>
                <p>{program.methodology}</p>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Qué incluye</p>
                <h2>Acompañamiento desde la definición hasta la publicación</h2>
                <ul className="check-list">
                  <li>Dos sesiones online en vivo.</li>
                  <li>Construcción guiada aplicada al proyecto de cada participante.</li>
                  <li>Repositorio individual preparado en GitHub.</li>
                  <li>Publicación inicial del proyecto en Vercel.</li>
                  <li>Dominio .cl por 12 meses, sujeto a disponibilidad.</li>
                  <li>Inscripción, configuración inicial y conexión del dominio realizada por MAILE.</li>
                  <li>Transferencia posterior del dominio a la participante.</li>
                  <li>Acceso a la comunidad MAILE para compartir avances, recursos y oportunidades.</li>
                </ul>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Alcance</p>
                <h2>Una primera versión, no un producto completo a gran escala</h2>
                <p>
                  Por la duración del programa, trabajaremos en una solución web acotada. No incluye el desarrollo completo de
                  tiendas en línea, sistemas de pago, plataformas con distintos tipos de usuarios, bases de datos complejas,
                  aplicaciones con información confidencial ni productos listos para operar a gran escala.
                </p>
                <p className="prose-note">Si tu idea requiere estas funciones, podremos construir una primera versión visual o demostrativa y definir los próximos pasos.</p>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Dominio y publicación</p>
                <h2>Tu proyecto quedará bajo tu control</h2>
                <p>
                  MAILE realizará la inscripción y configuración inicial del dominio `.cl`. Después de publicar el proyecto, deberás
                  crear una cuenta en NIC Chile para que podamos transferirte la titularidad y la administración. La renovación
                  posterior a los primeros 12 meses será tu responsabilidad.
                </p>
                <p>El proyecto se publicará inicialmente en tu cuenta de Vercel. Dependiendo del uso personal o comercial de la web, Vercel podría requerir posteriormente la contratación de un plan pagado.</p>
              </section>

              <section className="prose-section">
                <p className="eyebrow">Requisitos</p>
                <h2>Lo necesario para trabajar durante las dos jornadas</h2>
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
              <span className="status-inline">Inscripciones abiertas</span>
              <h3>Información práctica</h3>
              <div className="info-list">
                <div className="info-item">
                  <span>Modalidad</span>
                  <strong>{program.modality}</strong>
                </div>
                <div className="info-item">
                  <span>Nivel</span>
                  <strong>{program.level}</strong>
                </div>
                <div className="info-item">
                  <span>Duración</span>
                  <strong>{program.duration}</strong>
                </div>
                <div className="info-item">
                  <span>Cupos</span>
                  <strong>{capacityLabel(program.capacity)}</strong>
                </div>
                <div className="info-item">
                  <span>Fecha</span>
                  <strong>7 y 8 de octubre de 2026</strong>
                </div>
                <div className="info-item">
                  <span>Horario</span>
                  <strong>18:30 a 20:30 horas</strong>
                </div>
              </div>
              {program.price && (
                <div className="price-block">
                  <p className="price-label">Valor</p>
                  <p className="price-main">{program.price.general}</p>
                  <p className="fine-print">{program.price.note}</p>
                </div>
              )}
              <p className="date-note">{program.nextDate}</p>
              <a className="btn btn-primary btn-block" href={cta.href}>
                {cta.label || "Reservar mi cupo"}
              </a>
              <p className="fine-print" style={{ marginTop: "14px" }}>
                Antes del programa te pediremos una descripción breve de tu proyecto para comprobar que su alcance sea adecuado.
              </p>
              <CourseContact />
            </aside>
          </div>
        </section>

        <section className="section section-plum">
          <div className="container section-header center">
            <p className="eyebrow">Convierte tu idea en algo que puedas mostrar</p>
            <h2>Termina con una primera solución web creada, publicada y administrada por ti</h2>
            <p className="lead">Trabaja sobre un proyecto importante para ti y aprende un proceso que podrás seguir utilizando.</p>
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
