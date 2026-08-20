/*
 * Contenido editable del sitio.
 * Cambia aquí la marca, el correo, los enlaces, programas, encuentros,
 * profesoras/mentoras e indicadores. Las páginas leen este único archivo.
 */
window.SITE_CONTENT = {
  brand: {
    name: "[NOMBRE]",
    descriptor: "Mujeres creando futuro con tecnología.",
    email: "contacto@nombre.cl",
    siteUrl: "https://bootcamp-female-club.vercel.app",
    links: {
      home: "index.html",
      participate: "index.html#contacto",
      organizations: "index.html#form-organizaciones",
      instagram: "",
      linkedin: "",
      privacy: "privacidad.html",
      terms: "terminos.html"
    }
  },

  programs: [
    {
      slug: "crea-tu-primer-agente-con-ia",
      name: "Crea tu primer agente con IA",
      tagline: "El mejor aliado para tu negocio",
      description: "Descubre qué necesita hoy tu negocio y crea un agente de inteligencia artificial que te acompañe a ordenarlo, comunicarlo y vender.",
      image: "assets/images/mentoria-en-equipo.jpg",
      imageAlt: "Dos mujeres trabajando juntas con computadores durante un taller práctico",
      modality: "Presencial",
      level: "Inicial",
      duration: "5 horas",
      result: "Tu primer agente de IA, listo e iterable",
      requirements: [
        "Traer un computador portátil y su cargador.",
        "Contar con un correo electrónico al que puedas acceder.",
        "Llegar con tu negocio, emprendimiento o idea en mente: es el material de trabajo del taller.",
        "No necesitas experiencia previa en tecnología ni en programación."
      ],
      nextDate: "Convocatoria abierta · próxima fecha por confirmar",
      status: "Convocatoria abierta",
      statusKey: "open",
      action: "Quiero participar en el taller",
      href: "programa-agente-ia.html",
      hasDetailPage: true,
      audience: "Mujeres emprendedoras con un negocio en marcha, una idea que quieren poner de pie o un proyecto propio que necesita crecer. Cada participante trabaja sobre su propio negocio: no hay un ejercicio genérico ni se necesita experiencia técnica previa.",
      promise: "Primero descubres qué necesita tu negocio. Después construyes el agente que responde a esa necesidad.",
      learn: [
        "Claridad sobre qué necesita hoy tu negocio para crecer.",
        "Tu marca, tu producto y tu cliente ordenados y por escrito.",
        "Tu primer agente de inteligencia artificial, creado y funcionando.",
        "La capacidad de seguir ajustándolo tú misma cuando tu negocio cambie.",
        "Ideas concretas de cómo usarlo para vender."
      ],
      methodology: "Grupos pequeños, acompañamiento cercano y trabajo sobre tu propio negocio de principio a fin. Se avanza haciendo: preguntas todo lo que necesites, el error es parte del proceso y nadie se queda atrás.",
      teachers: ["Carolina · Fundadora y facilitadora"],
      faqs: [
        { question: "¿Qué es exactamente un agente de IA?", answer: "Un asistente de inteligencia artificial que configuras con la información de tu negocio: quién eres, qué vendes, a quién le hablas y cómo te comunicas. Una vez creado, puedes pedirle que redacte publicaciones, responda consultas de clientes, prepare propuestas o te ayude a ordenar tus ideas, siempre con el tono y el criterio de tu marca." },
        { question: "¿Necesito saber programar?", answer: "No. El taller está diseñado para comenzar desde cero. Todo el trabajo se hace con lenguaje común, escribiendo lo que ya sabes de tu negocio." },
        { question: "¿Debo tener un negocio funcionando?", answer: "No es indispensable. Puedes llegar con un emprendimiento en marcha, un proyecto en pausa o una idea que quieres explorar: el taller empieza justamente por descubrir qué necesitas." },
        { question: "¿Con qué me voy del taller?", answer: "Con tu primer agente creado, probado y funcionando, y con tu negocio ordenado por escrito para que puedas seguir trabajándolo por tu cuenta." },
        { question: "¿El taller es presencial?", answer: "Sí. La experiencia prioriza el trabajo práctico, el acompañamiento cercano y el intercambio entre participantes." },
        { question: "¿Tiene costo?", answer: "Las condiciones de participación, cupos y costo se informan de forma clara al abrir cada convocatoria. Déjanos tus datos y te escribimos con toda la información antes de la próxima fecha." }
      ]
    },
    {
      slug: "crea-tu-primera-web-con-ia",
      name: "Crea tu primera página web con IA",
      description: "Aprende a transformar una idea en una página web funcional utilizando herramientas de inteligencia artificial y acompañamiento paso a paso.",
      image: "assets/images/mujeres-colaborando.jpg",
      imageAlt: "Mujeres colaborando alrededor de un computador durante una sesión práctica",
      modality: "Presencial",
      level: "Inicial",
      duration: "Una jornada",
      result: "Sitio web publicado",
      requirements: [
        "Traer un computador portátil y su cargador.",
        "Contar con un correo electrónico al que puedas acceder.",
        "No necesitas experiencia previa en programación."
      ],
      nextDate: "Estamos preparando el próximo encuentro.",
      status: "Próximamente",
      statusKey: "soon",
      action: "Quiero recibir la próxima fecha",
      href: "programa-web-ia.html",
      hasDetailPage: true,
      audience: "Mujeres que quieren llevar una idea a internet, presentar un proyecto, fortalecer un emprendimiento o simplemente descubrir lo que pueden crear con inteligencia artificial. No se necesita experiencia técnica previa.",
      learn: [
        "Convertir una idea en una estructura clara para una página web.",
        "Usar herramientas de inteligencia artificial para crear contenido y prototipos.",
        "Tomar decisiones básicas de diseño, navegación y accesibilidad.",
        "Revisar, mejorar y publicar una primera versión funcional."
      ],
      methodology: "Una experiencia guiada y práctica: avanzamos en pequeños pasos, aplicamos cada concepto al proyecto de cada participante y resolvemos dudas en conjunto.",
      teachers: ["Carolina · Fundadora y facilitadora"],
      faqs: [
        { question: "¿Necesito saber programar?", answer: "No. El programa está diseñado para comenzar desde cero y avanzar con acompañamiento paso a paso." },
        { question: "¿Debo llegar con una idea definida?", answer: "No es indispensable. Puedes llegar con una idea inicial, un proyecto en marcha o descubrir durante la jornada qué te gustaría crear." },
        { question: "¿El programa es presencial?", answer: "Sí. La experiencia prioriza el aprendizaje práctico, el acompañamiento cercano y el intercambio entre participantes." },
        { question: "¿La publicación del sitio tiene costo?", answer: "Durante el programa revisaremos alternativas para publicar una primera versión. Cualquier requisito o costo particular se informará de forma clara antes de cada convocatoria." }
      ]
    },
    {
      slug: "comunica-tu-proyecto-con-ia",
      name: "Comunica tu proyecto con IA",
      description: "Define un mensaje claro y crea piezas de comunicación consistentes para presentar tu proyecto a las personas correctas.",
      image: "assets/images/aprendizaje-en-comunidad.jpg",
      imageAlt: "Mujeres planificando un proyecto en una mesa de trabajo",
      modality: "Presencial",
      level: "Inicial",
      duration: "Por definir",
      result: "Mensaje y piezas de comunicación",
      requirements: ["Traer un proyecto, iniciativa o idea que quieras comunicar."],
      nextDate: "Fecha por anunciar",
      status: "En preparación",
      statusKey: "preparing",
      action: "Sumarme a la lista de interés",
      href: "index.html#contacto"
    }
  ],

  /*
   * Deja esta lista vacía para mostrar el estado sin encuentros:
   * en ese caso se muestra el aviso de `eventsFallback`.
   * Cada encuentro admite: title, topic, date, time, city, host,
   * facilitators (lista), capacity, cost, registrationStatus, action y href.
   */
  events: [],

  /* Aviso que se muestra en "Próximos encuentros" cuando no hay fechas publicadas. */
  eventsFallback: {
    title: "La convocatoria de «Crea tu primer agente con IA» está abierta.",
    description: "Estamos cerrando la fecha, la ciudad y el lugar de nuestro primer taller. Déjanos tus datos y serás de las primeras en saberlo cuando abramos los cupos.",
    action: "Quiero recibir la fecha del taller",
    href: "index.html#contacto"
  },

  people: [
    {
      name: "Carolina",
      initials: "C",
      image: "",
      imageAlt: "",
      role: "Fundadora y facilitadora",
      specialty: "Tecnología aplicada, productos digitales e inteligencia artificial",
      bio: "Impulsa esta iniciativa y facilita experiencias para que más mujeres puedan convertir la tecnología en proyectos y resultados propios.",
      programs: ["Crea tu primer agente con IA", "Crea tu primera página web con IA"],
      links: []
    },
    {
      name: "Nuevas profesoras y mentoras",
      initials: "+",
      image: "",
      imageAlt: "",
      role: "Convocatoria abierta",
      specialty: "Tecnología, negocios, comunicación y desarrollo profesional",
      bio: "Estamos construyendo una red diversa de mujeres que quiera enseñar desde la experiencia y acompañar nuevos aprendizajes.",
      programs: ["Próximos programas"],
      links: [{ label: "Quiero sumarme", href: "index.html#contacto" }]
    }
  ],

  impactIndicators: [
    { label: "Mujeres participantes", value: "Próximamente" },
    { label: "Encuentros realizados", value: "Próximamente" },
    { label: "Proyectos creados", value: "Próximamente" },
    { label: "Porcentaje de finalización", value: "En medición" },
    { label: "Confianza antes y después", value: "En medición" },
    { label: "Testimonios", value: "Próximamente" },
    { label: "Organizaciones colaboradoras", value: "Próximamente" },
    { label: "Presencia territorial", value: "Próximamente" }
  ]
};
