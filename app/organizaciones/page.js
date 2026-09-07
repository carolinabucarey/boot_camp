import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import OrganizationsForm from "@/components/OrganizationsForm";
import StructuredData from "@/components/StructuredData";
import { siteContent } from "@/lib/site-content";
import { CROSS_PAGE_NAV_ITEMS, EXPLORA_FOOTER_LINKS_CROSS, infoFooterLinks } from "@/lib/nav";

export const metadata = {
  title: "Programas de IA para mujeres y organizaciones | Maile",
  description: "Cohortes y laboratorios de adopción tecnológica para empresas, fundaciones, municipios, instituciones y comunidades de mujeres.",
  robots: "index,follow,max-image-preview:large",
  alternates: { canonical: "/organizaciones" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Maile",
    title: "Programas de IA para mujeres y organizaciones | Maile",
    description: "Cohortes y laboratorios para convertir desafíos reales en soluciones creadas con tecnología e inteligencia artificial.",
    url: "https://www.maile.cl/organizaciones",
    images: [
      {
        url: "https://www.maile.cl/assets/og-social.png",
        width: 1200,
        height: 630,
        alt: "Maile, programas de adopción tecnológica para mujeres"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Programas de IA para mujeres y organizaciones | Maile",
    description: "Cohortes y laboratorios de adopción tecnológica para organizaciones y comunidades.",
    images: [{ url: "https://www.maile.cl/assets/og-social.png" }]
  }
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.maile.cl/" },
    { "@type": "ListItem", position: 2, name: "Para organizaciones", item: "https://www.maile.cl/organizaciones" }
  ]
};

export default function OrganizacionesPage() {
  const { brand } = siteContent;

  return (
    <>
      <StructuredData data={STRUCTURED_DATA} />
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader
        navItems={CROSS_PAGE_NAV_ITEMS}
        current="Para organizaciones"
        ctaLabel="Conversemos"
        ctaHref="#form-organizaciones"
      />

      <main id="contenido">
        <section className="page-hero org-hero">
          <div className="container">
            <p className="breadcrumbs">
              <a href="/">Inicio</a> / <span>Para organizaciones</span>
            </p>
            <p className="eyebrow">Empresas · Fundaciones · Municipios · Instituciones · Comunidades</p>
            <h1>Programas de adopción tecnológica para mujeres</h1>
            <p className="lead">
              Diseñamos experiencias prácticas para que mujeres de una organización o comunidad conviertan desafíos reales en
              soluciones creadas con tecnología e inteligencia artificial.
            </p>
            <div className="button-row">
              <a className="btn btn-light btn-arrow" href="#form-organizaciones">
                Conversemos sobre una cohorte
              </a>
              <a className="btn btn-outline-light" href="#colabora">
                Explorar una colaboración
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container split-intro">
            <div>
              <p className="eyebrow">El desafío</p>
              <h2>El acceso a una herramienta no garantiza que las personas puedan utilizarla</h2>
            </div>
            <p className="lead">
              Muchas mujeres enfrentan barreras de entrada, falta de tiempo, formación poco conectada con su realidad o escasas
              oportunidades para practicar. Maile transforma la capacitación en una experiencia aplicada: cada participante trabaja
              sobre un desafío propio y crea un resultado que puede probar.
            </p>
          </div>
        </section>

        <section className="section section-tint">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Públicos</p>
              <h2>Adaptamos la experiencia al contexto de cada grupo</h2>
            </div>
            <div className="audience-grid">
              <article>
                <span>01</span>
                <p>Colaboradoras que necesitan aplicar IA a su trabajo</p>
              </article>
              <article>
                <span>02</span>
                <p>Mujeres emprendedoras o trabajadoras independientes</p>
              </article>
              <article>
                <span>03</span>
                <p>Mujeres en transición o desarrollo profesional</p>
              </article>
              <article>
                <span>04</span>
                <p>Comunidades territoriales con barreras de acceso tecnológico</p>
              </article>
              <article>
                <span>05</span>
                <p>Educadoras, creadoras y profesionales de sectores específicos</p>
              </article>
              <article>
                <span>06</span>
                <p>Redes de mujeres que buscan pasar de la curiosidad a la aplicación</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-plum" id="propuesta">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Propuesta institucional</p>
              <h2>Una experiencia diseñada desde el desafío hasta el resultado</h2>
            </div>
            <div className="journey org-journey">
              <article className="journey-step">
                <span>01 · Diagnóstico</span>
                <h3>Comprendemos el perfil de las participantes y los desafíos que quieren abordar.</h3>
              </article>
              <article className="journey-step">
                <span>02 · Diseño</span>
                <h3>Adaptamos objetivos, ejemplos, materiales, modalidad y acompañamiento.</h3>
              </article>
              <article className="journey-step">
                <span>03 · Ejecución</span>
                <h3>Facilitamos una experiencia práctica donde cada participante crea y prueba.</h3>
              </article>
              <article className="journey-step">
                <span>04 · Seguimiento opcional</span>
                <h3>Evaluamos resultados, aprendizajes y capacidad de continuar cuando forma parte del alcance.</h3>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="formatos">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Formatos de colaboración</p>
              <h2>Distintas formas de crear una experiencia útil</h2>
            </div>
            <div className="format-grid">
              <article>
                <h3>Taller aplicado</h3>
                <p>Una experiencia breve para que cada participante transforme una necesidad específica en una primera solución.</p>
              </article>
              <article>
                <h3>Programa por cohortes</h3>
                <p>Un recorrido de varias sesiones con diagnóstico, creación, prueba y continuidad.</p>
              </article>
              <article>
                <h3>Laboratorio dentro de otro programa</h3>
                <p>Un módulo Maile para una iniciativa de empleabilidad, emprendimiento, innovación o desarrollo territorial.</p>
              </article>
              <article>
                <h3>Cohorte patrocinada</h3>
                <p>Una organización financia el acceso de mujeres de una comunidad o territorio definido.</p>
              </article>
              <article>
                <h3>Alianza de contenidos o comunidad</h3>
                <p>Combinamos facilitación, conocimientos, convocatoria o espacios de continuidad.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-lavender" id="medicion">
          <div className="container org-grid">
            <div className="org-copy">
              <p className="eyebrow">Resultados y medición</p>
              <h2>Medimos aplicación, no solamente asistencia</h2>
              <p className="lead">
                Según el alcance acordado, observamos desde el desafío definido hasta la capacidad de ajustar y volver a usar la
                solución.
              </p>
              <p className="deliverable">
                <strong>Entregable sugerido:</strong> resumen de participación, resultados creados, aprendizajes, oportunidades de
                continuidad y recomendaciones para una siguiente cohorte.
              </p>
            </div>
            <ul className="metric-list">
              <li>Asistencia y finalización</li>
              <li>Desafío definido</li>
              <li>Solución creada y probada</li>
              <li>Confianza y comprensión</li>
              <li>Intención y uso posterior</li>
              <li>Capacidad para ajustar la solución</li>
              <li>Satisfacción de participantes</li>
              <li>Aprendizajes para la organización</li>
            </ul>
          </div>
        </section>

        <section className="section section-plum" id="colabora">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Colabora con Maile</p>
              <h2>Construyamos más oportunidades de acceso y acción con tecnología</h2>
              <p className="lead">
                Colaboramos con organizaciones que aportan convocatoria, conocimiento, espacios, financiamiento o continuidad. Maile
                aporta diseño de experiencias, facilitación cercana y una metodología centrada en resultados propios.
              </p>
            </div>
            <div className="partner-grid">
              <article>
                <h3>Qué puede aportar un partner</h3>
                <ul className="check-list light-list">
                  <li>Acceso a una comunidad</li>
                  <li>Especialistas o mentoras</li>
                  <li>Espacios, herramientas o infraestructura</li>
                  <li>Financiamiento de participantes</li>
                  <li>Oportunidades profesionales o de colaboración</li>
                  <li>Continuidad para los proyectos creados</li>
                </ul>
              </article>
              <article>
                <h3>Qué aporta Maile</h3>
                <ul className="check-list light-list">
                  <li>Diseño de experiencias aplicadas</li>
                  <li>Metodología accesible para personas no técnicas</li>
                  <li>Facilitación presencial</li>
                  <li>Trabajo sobre desafíos reales</li>
                  <li>Resultados observables</li>
                  <li>Medición y aprendizajes para futuras cohortes</li>
                </ul>
              </article>
            </div>
            <div className="button-row">
              <a className="btn btn-light btn-arrow" href="#form-organizaciones">
                Quiero explorar una colaboración
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="form-organizaciones-seccion">
          <div className="container contact-layout">
            <div className="contact-intro">
              <p className="eyebrow">Conversemos</p>
              <h2>Conversemos sobre las necesidades de tu organización o comunidad</h2>
              <p className="lead">
                Cuéntanos a quién quieres llegar y qué desafío buscas abordar. Podemos diseñar, financiar o coproducir una cohorte o
                laboratorio.
              </p>
            </div>
            <OrganizationsForm />
          </div>
        </section>
      </main>

      <SiteFooter
        columns={[
          { title: "Explora", links: EXPLORA_FOOTER_LINKS_CROSS },
          {
            title: "Organizaciones",
            links: [
              { label: "Cómo trabajamos", href: "#propuesta" },
              { label: "Formatos", href: "#formatos" },
              { label: "Medición", href: "#medicion" },
              { label: "Colabora con Maile", href: "#colabora" },
              { label: "Conversemos", href: "#form-organizaciones" }
            ]
          },
          {
            title: "Información",
            links: [
              { label: "Política de privacidad", href: brand.links.privacy },
              { label: "Términos", href: brand.links.terms },
              { label: "WhatsApp", href: brand.links.whatsapp, external: true },
              { social: true }
            ]
          }
        ]}
      />
    </>
  );
}
