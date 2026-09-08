import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProgramGrid from "@/components/ProgramGrid";
import EventList from "@/components/EventList";
import TestimonialSection from "@/components/TestimonialSection";
import ImpactGrid from "@/components/ImpactGrid";
import PeopleGrid from "@/components/PeopleGrid";
import ParticipantsForm from "@/components/ParticipantsForm";
import MentorsForm from "@/components/MentorsForm";
import StructuredData from "@/components/StructuredData";
import { siteContent } from "@/lib/site-content";
import { HOME_NAV_ITEMS, EXPLORA_FOOTER_LINKS_HOME, infoFooterLinks } from "@/lib/nav";

export const metadata = {
  title: "Programas de inteligencia artificial para mujeres | Maile",
  description:
    "Experiencias prácticas y presenciales para que mujeres sin experiencia técnica conviertan objetivos reales en soluciones creadas con inteligencia artificial.",
  robots: "index,follow,max-image-preview:large",
  alternates: { canonical: "https://www.maile.cl/" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Maile",
    title: "Programas de inteligencia artificial para mujeres | Maile",
    description: "Experiencias prácticas para convertir objetivos reales en soluciones creadas con inteligencia artificial.",
    url: "https://www.maile.cl/",
    images: [
      { url: "https://www.maile.cl/assets/og-social.png", width: 1200, height: 630, alt: "Maile, mujeres creando futuro con tecnología" }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Programas de inteligencia artificial para mujeres | Maile",
    description: "Experiencias prácticas para convertir objetivos reales en soluciones creadas con inteligencia artificial.",
    images: [{ url: "https://www.maile.cl/assets/og-social.png", alt: "Maile, mujeres creando futuro con tecnología" }]
  }
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.maile.cl/#organization",
      name: "Maile",
      url: "https://www.maile.cl/",
      telephone: "+56990195787",
      logo: { "@type": "ImageObject", url: "https://www.maile.cl/assets/brand/favicon-512.png", width: 512, height: 512 },
      description: "Iniciativa que ayuda a mujeres a convertir necesidades reales en soluciones propias con tecnología e inteligencia artificial.",
      sameAs: ["https://www.instagram.com/maile_edtech/", "https://www.linkedin.com/company/maile-chile"],
      founder: [
        { "@type": "Person", name: "Carolina Bucarey", sameAs: "https://www.linkedin.com/in/carolinabucarey/" },
        { "@type": "Person", name: "Jackeline Advincula", sameAs: "https://www.linkedin.com/in/jackelineadvincula/" }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.maile.cl/#website",
      url: "https://www.maile.cl/",
      name: "Maile",
      description: "Programas de inteligencia artificial para que mujeres conviertan objetivos reales en soluciones propias.",
      publisher: { "@id": "https://www.maile.cl/#organization" },
      inLanguage: "es-CL"
    }
  ]
};

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const { brand, programs, events, eventsFallback, testimonials, people, impactIndicators } = siteContent;

  return (
    <>
      <link rel="preload" as="image" href="/assets/images/mujeres-colaborando.jpg" fetchPriority="high" />
      <StructuredData data={STRUCTURED_DATA} />
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <SiteHeader navItems={HOME_NAV_ITEMS} current={null} ctaLabel="Próximos programas" ctaHref="#programas" />

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="eyebrow">De una necesidad real a una solución propia</p>
                <h1>
                  Mujeres creando futuro con <em>tecnología</em>
                </h1>
                <p className="lead">
                  Ayudamos a mujeres a convertir necesidades reales de su trabajo, proyecto o negocio en soluciones creadas con
                  tecnología, mediante experiencias prácticas, presenciales y acompañadas.
                </p>
                <div className="button-row">
                  <a className="btn btn-primary btn-arrow" href="#programas">
                    Conoce los próximos programas
                  </a>
                  <a className="btn btn-secondary" href={brand.links.organizations}>
                    Quiero llevar Maile a mi organización
                  </a>
                </div>
                <p className="hero-note">No necesitas experiencia técnica previa.</p>
              </div>
              <div className="hero-visual" aria-label="Mujeres aprendiendo y colaborando en un encuentro presencial">
                <img
                  className="hero-main-image"
                  src="/assets/images/mujeres-colaborando.jpg"
                  alt="Tres mujeres colaborando frente a un computador en una sesión de trabajo"
                  width={1600}
                  height={1067}
                  fetchPriority="high"
                />
                <img
                  className="hero-small-image"
                  src="/assets/images/aprendizaje-en-comunidad.jpg"
                  alt="Dos mujeres conversando mientras desarrollan una idea"
                  width={800}
                  height={1199}
                />
                <div className="hero-stamp" aria-hidden="true">
                  Define.
                  <br />
                  Crea.
                  <br />
                  Prueba.
                </div>
              </div>
            </div>
            <div className="attributes" aria-label="Atributos de nuestros programas">
              <div className="attribute">
                <span className="attribute-num">01</span> Un objetivo propio
              </div>
              <div className="attribute">
                <span className="attribute-num">02</span> Una solución creada
              </div>
              <div className="attribute">
                <span className="attribute-num">03</span> Autonomía para continuar
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="proposito">
          <div className="container purpose-grid">
            <div className="purpose-intro">
              <p className="eyebrow">La experiencia Maile</p>
              <h2>Llegas con un objetivo. Sales con algo creado por ti.</h2>
              <p className="lead">
                En cada experiencia Maile partes desde algo que quieres resolver. Aprendes utilizando la tecnología en tu propio caso,
                construyes una primera solución y recibes acompañamiento para probarla y seguir desarrollándola.
              </p>
            </div>
            <div className="pillar-list">
              <article className="pillar">
                <span className="pillar-number">01</span>
                <h3>Un desafío propio</h3>
                <p>Trabajas sobre una necesidad que sea importante para ti.</p>
              </article>
              <article className="pillar">
                <span className="pillar-number">02</span>
                <h3>Creación acompañada</h3>
                <p>Avanzas paso a paso y puedes resolver tus dudas mientras construyes.</p>
              </article>
              <article className="pillar">
                <span className="pillar-number">03</span>
                <h3>Un resultado concreto</h3>
                <p>Terminas con una solución inicial que puedes probar y utilizar.</p>
              </article>
              <article className="pillar">
                <span className="pillar-number">04</span>
                <h3>Autonomía para continuar</h3>
                <p>Comprendes cómo modificar lo creado y cuáles son tus próximos pasos.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-plum" id="como-aprendemos" aria-labelledby="como-funciona">
          <div className="container">
            <div className="section-header center">
              <p className="eyebrow">Método Maile</p>
              <h2 id="como-funciona">De una necesidad a una solución propia</h2>
              <p className="lead">No enseñamos tecnología en abstracto. La utilizamos para avanzar sobre un objetivo real.</p>
            </div>
            <div className="journey">
              <article className="journey-step">
                <span>01 · Define</span>
                <h3>Identifica qué quieres resolver y para quién debe funcionar.</h3>
              </article>
              <article className="journey-step">
                <span>02 · Crea</span>
                <h3>Construye una primera solución utilizando tecnología e inteligencia artificial.</h3>
              </article>
              <article className="journey-step">
                <span>03 · Prueba</span>
                <h3>Revisa el resultado, detecta mejoras y comprueba que responda a tu necesidad.</h3>
              </article>
              <article className="journey-step">
                <span>04 · Continúa</span>
                <h3>Aprende a modificar lo creado y avanza acompañada por una comunidad.</h3>
              </article>
            </div>
            <p className="journey-quote">Trabaja sobre un objetivo real y crea una solución que puedas utilizar.</p>
          </div>
        </section>

        <section className="section" id="programas">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Programas</p>
              <h2>Programas para crear, aplicar y avanzar</h2>
              <p className="lead">
                Cada programa comienza con una necesidad concreta y termina con un resultado que puedes utilizar en tu trabajo,
                proyecto, negocio o desarrollo profesional.
              </p>
            </div>
            <ProgramGrid programs={programs} />
          </div>
        </section>

        <section className="section section-tint" id="encuentros">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Próximos encuentros</p>
              <h2>Próximas experiencias</h2>
              <p className="lead">Publicamos una fecha únicamente cuando su horario, lugar y condiciones están confirmados.</p>
            </div>
            <EventList events={events} eventsFallback={eventsFallback} programs={programs} />
          </div>
        </section>

        <section className="section" id="impacto">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Impacto</p>
              <h2>El aprendizaje se ve en lo que cada participante logra hacer</h2>
              <p className="lead">
                Queremos que la tecnología se convierta en una capacidad que cada mujer pueda utilizar más allá del encuentro. Por eso
                observamos la creación, la prueba y la continuidad de cada resultado.
              </p>
            </div>
            <div className="measure-grid" aria-label="Indicadores que Maile observará">
              <article>
                <span>01</span>
                <p>Participantes que terminan con una solución creada</p>
              </article>
              <article>
                <span>02</span>
                <p>Soluciones probadas durante el programa</p>
              </article>
              <article>
                <span>03</span>
                <p>Participantes que vuelven a utilizar su solución</p>
              </article>
              <article>
                <span>04</span>
                <p>Participantes que pueden modificarla sin ayuda</p>
              </article>
              <article>
                <span>05</span>
                <p>Proyectos, trabajos y objetivos abordados</p>
              </article>
              <article>
                <span>06</span>
                <p>Colaboraciones u oportunidades surgidas desde la comunidad</p>
              </article>
            </div>
            <ImpactGrid indicators={impactIndicators} />
            <article className="pilot">
              <div className="pilot-badge" aria-hidden="true">
                01
              </div>
              <div>
                <h3>Así se aprende en Maile</h3>
                <p>
                  En nuestro primer bootcamp, cada participante trabajó sobre su propio proyecto y creó una página web con
                  inteligencia artificial. La experiencia nos permitió probar una metodología cercana, práctica y centrada en avanzar
                  desde una idea hacia un resultado visible.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="section section-tint" id="comunidad">
          <div className="container community-grid">
            <div className="community-collage">
              <img
                src="/assets/images/aprendizaje-en-comunidad.jpg"
                alt="Dos mujeres planificando juntas en una mesa de trabajo"
                width={800}
                height={1199}
                loading="lazy"
              />
              <img
                src="/assets/images/mujeres-colaborando.jpg"
                alt="Grupo de mujeres compartiendo ideas frente a un computador"
                width={1000}
                height={667}
                loading="lazy"
              />
            </div>
            <div className="community-copy">
              <p className="eyebrow">Comunidad</p>
              <h2>El encuentro termina. El aprendizaje continúa.</h2>
              <p className="lead">
                La comunidad Maile es un espacio para seguir practicando, resolver nuevas dudas, compartir lo creado y acceder a
                experiencias, conocimientos y oportunidades de colaboración.
              </p>
              <p className="community-note">
                Estamos preparando las primeras actividades de continuidad para quienes participen en nuestros programas.
              </p>
              <div className="button-row">
                <a className="btn btn-primary btn-arrow" href="#contacto">
                  Quiero recibir novedades
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="experiencia">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Nuestra experiencia</p>
              <h2>Así se aprende en Maile</h2>
              <p className="lead">
                En nuestro primer bootcamp, cada participante trabajó sobre su propio proyecto y creó una página web con
                inteligencia artificial. La experiencia nos permitió probar una metodología cercana, práctica y centrada en avanzar
                desde una idea hacia un resultado visible.
              </p>
            </div>
            <div className="gallery-strip">
              <img
                src="/assets/images/experiencia-comunidad.jpg"
                alt="Participantes riendo mientras trabajan con sus computadores"
                width={428}
                height={760}
                loading="lazy"
              />
              <img
                src="/assets/images/experiencia-trabajando.jpg"
                alt="Mujeres trabajando en sus proyectos durante la jornada"
                width={428}
                height={760}
                loading="lazy"
              />
              <img
                src="/assets/images/experiencia-presentando.jpg"
                alt="Facilitadora presentando frente al grupo"
                width={428}
                height={760}
                loading="lazy"
              />
              <img
                src="/assets/images/experiencia-historia.jpg"
                alt="Facilitadora compartiendo su propia experiencia con las participantes"
                width={1013}
                height={760}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <TestimonialSection testimonials={testimonials} />

        <section className="section" id="nosotras">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Profesoras y mentoras</p>
              <h2>Una red de mujeres que enseña desde la experiencia</h2>
              <p className="lead">
                Reunimos conocimientos y trayectorias diversas para acompañar cada programa con cercanía, claridad y experiencia
                práctica. Las dos fundadoras de esta iniciativa lideran empresas respaldadas por <strong>Start-Up Chile</strong>, en la
                generación <strong>BIG 11</strong>.
              </p>
            </div>
            <PeopleGrid people={people} />
            <div className="network-cta">
              <p>¿Tienes experiencia que pueda abrir nuevas posibilidades para otras mujeres?</p>
              <a className="btn btn-light" href="#mentoras">
                Quiero sumarme como profesora o mentora
              </a>
            </div>
            <div className="mentor-form-layout" id="mentoras">
              <div className="mentor-form-intro">
                <p className="eyebrow">Súmate a la red</p>
                <h3>Queremos conocer tu experiencia</h3>
                <p>
                  Buscamos mujeres que quieran compartir lo que saben y acompañar a otras a crear nuevas posibilidades con
                  tecnología. Cuéntanos sobre tu trayectoria y cómo te gustaría aportar.
                </p>
                <p className="fine-print">
                  Enviar este formulario manifiesta tu interés; conversaremos contigo cuando exista una oportunidad que conecte con
                  tu experiencia y disponibilidad.
                </p>
              </div>
              <MentorsForm />
            </div>
          </div>
        </section>

        <section className="section section-lavender" id="contacto">
          <div className="container">
            <div className="contact-layout">
              <div className="contact-intro">
                <p className="eyebrow">Próximos programas</p>
                <h2>Descubre qué puedes crear con tecnología</h2>
                <p className="lead">Cuéntanos qué te gustaría resolver y te avisaremos cuando tengamos una experiencia que pueda ayudarte a avanzar.</p>
                <p className="fine-print">
                  ¿Vienes de una organización? El recorrido para fundaciones, empresas, municipios e instituciones está{" "}
                  <a href={brand.links.organizations}>en su propia página</a>.
                </p>
              </div>
              <div className="forms-grid single">
                <ParticipantsForm preselectedSlug={params?.programa} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter
        columns={[
          { title: "Explora", links: EXPLORA_FOOTER_LINKS_HOME },
          {
            title: "Participa",
            links: [
              { label: "Próximos programas", href: "#contacto" },
              { label: "Nosotras", href: "#nosotras" },
              { label: "Para organizaciones", href: brand.links.organizations },
              { label: "WhatsApp", href: brand.links.whatsapp, external: true }
            ]
          },
          { title: "Información", links: infoFooterLinks(brand) }
        ]}
      />
    </>
  );
}
