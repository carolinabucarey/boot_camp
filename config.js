/*
 * Contenido editable del sitio.
 * Cambia aquí la marca, el correo, los enlaces, programas, encuentros,
 * profesoras/mentoras e indicadores. Las páginas leen este único archivo.
 */
window.SITE_CONTENT = {
  brand: {
    name: "MAILE",
    // "AI" del logotipo va en otro color; vacío deja el nombre de una sola pieza.
    nameHighlight: "AI",
    logo: "assets/brand/maile-avatar.png",
    descriptor: "Mujeres creando futuro con tecnología.",
    // Pendiente de confirmación. Mientras esté vacío, el sitio prioriza los
    // canales sociales vigentes y no publica un correo de marcador.
    email: "",
    siteUrl: "https://www.maile.cl",
    links: {
      home: "index.html",
      participate: "index.html#contacto",
      organizations: "organizaciones.html",
      instagram: "https://www.instagram.com/maile_edtech/",
      whatsapp: "https://wa.me/56990195787",
      linkedin: "https://www.linkedin.com/company/maile-chile",
      privacy: "privacidad.html",
      terms: "terminos.html"
    }
  },

  /*
   * Destino de los formularios. Pega aquí la URL /exec de la aplicación web
   * de Apps Script (ver integraciones/google-sheets.gs). Mientras esté vacía,
   * los formularios validan y agradecen, pero no guardan los datos en ninguna parte.
   */
  forms: {
    endpoint: "https://script.google.com/macros/s/AKfycbx16HnPVHA0wQAR-JxJXy24ahLxbKV-GVODJJpa5yn9lfoiYEsKQpoh7Am84tTJ6udCnQ/exec"
  },

  programs: [
    {
      slug: "crea-tu-primer-agente-con-ia",
      name: "Crea tu primer agente con IA",
      tagline: "De un objetivo real a una primera solución propia",
      need: "Aplicar IA a una necesidad concreta de tu trabajo, proyecto o negocio.",
      description: "Convierte un objetivo de tu trabajo, proyecto o negocio en un agente de IA que puedas probar, utilizar y seguir mejorando.",
      image: "assets/images/mentoria-en-equipo.jpg",
      imageAlt: "Dos mujeres trabajando juntas con computadores durante un taller práctico",
      modality: "Presencial",
      level: "Inicial",
      duration: "Por confirmar",
      result: "Una primera versión de tu agente, creada, probada e iterable",
      requirements: [
        "Traer un computador personal y su cargador.",
        "Traer un objetivo o una tarea que te gustaría resolver.",
        "No necesitas experiencia previa en tecnología ni programación."
      ],
      city: "Santiago",
      nextDate: "Nueva fecha por confirmar",
      eventDate: "Por confirmar",
      eventTime: "Por confirmar",
      eventLocation: "Por confirmar",
      eventAccess: "Te avisaremos cuando confirmemos la próxima edición.",
      status: "Nueva fecha por confirmar",
      statusKey: "soon",
      action: "Quiero conocer la próxima fecha",
      href: "programa-agente-ia.html",
      hasDetailPage: true,
      audience: "No necesitas ser emprendedora ni tener conocimientos técnicos. Puedes trabajar sobre una necesidad de tu trabajo, proyecto, negocio o desarrollo profesional; solo necesitas traer un objetivo que quieras trabajar.",
      promise: "Parte de un objetivo real de tu trabajo, proyecto o negocio y construye un agente de IA que puedas probar, utilizar y seguir mejorando.",
      learn: [
        "Elegirás un objetivo concreto.",
        "Definirás a quién debe ayudar tu agente.",
        "Organizarás la información que necesita.",
        "Crearás sus instrucciones y forma de responder.",
        "Construirás una primera versión.",
        "La probarás con situaciones reales.",
        "Identificarás mejoras y próximos pasos."
      ],
      methodology: "Una experiencia presencial, práctica y acompañada. Trabajarás sobre tu propio objetivo, avanzarás paso a paso y podrás resolver dudas mientras construyes y pruebas.",
      teachers: ["Carolina Bucarey · Fundadora y facilitadora", "Jackeline Advincula · Fundadora y facilitadora"],
      faqs: [
        { question: "¿Necesito saber programar?", answer: "No. El programa está diseñado para mujeres sin experiencia técnica previa." },
        { question: "¿Tengo que tener un negocio?", answer: "No. Puedes trabajar sobre una necesidad de tu trabajo, proyecto, negocio o desarrollo profesional." },
        { question: "¿Tengo que llegar con una idea definida?", answer: "No tiene que estar completamente definida, pero sí debes traer un objetivo o una tarea que te gustaría resolver. Durante el encuentro te ayudaremos a acotarla." },
        { question: "¿Saldré con un agente terminado?", answer: "Saldrás con una primera versión creada y probada. Podrás continuar ajustándola después del encuentro." },
        { question: "¿Qué debo llevar?", answer: "Un computador personal. Los demás requisitos se informarán al confirmar la próxima fecha." },
        { question: "¿Incluye acompañamiento posterior?", answer: "Estamos definiendo las actividades de continuidad para la próxima edición. Informaremos su alcance antes de abrir la convocatoria." }
      ]
    },
    {
      slug: "crea-tu-primera-web-con-ia",
      name: "Crea tu primera página web con IA",
      need: "Dar forma y presencia digital a una idea o proyecto.",
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
      status: "Nueva fecha por confirmar",
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
      need: "Comunicar un proyecto con claridad y consistencia.",
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
    title: "Estamos preparando los próximos encuentros.",
    description: "Déjanos tus datos y te avisaremos cuando confirmemos una nueva fecha.",
    action: "Quiero conocer las próximas fechas",
    href: "index.html#contacto"
  },

  /*
   * Comentarios de quienes participaron. La sección solo aparece cuando hay
   * comentarios reales: con la lista vacía no se muestra nada.
   * Cada comentario admite: { quote, author, role, program }.
   */
  testimonials: [],

  people: [
    {
      name: "Carolina Bucarey",
      initials: "C",
      image: "assets/images/carolina-bucarey.jpg",
      imageAlt: "Retrato de Carolina Bucarey",
      role: "Fundadora y facilitadora",
      specialty: "Estrategia, productos digitales e inteligencia artificial aplicada",
      bio: "Ingeniera civil industrial de la Universidad de Santiago y MBA del IE Business School, con quince años liderando estrategia, operaciones y productos digitales en América Latina. Fundadora y CEO de Savia y cofundadora de Tripsy, empresa chilena respaldada por Start-Up Chile que ha ganado fondos públicos. Su trayectoria pasa por McKinsey, DiDi y Groupon. En los talleres acompaña a las participantes a convertir una idea en un resultado propio. Impulsa esta iniciativa para abrir más espacio a las mujeres que quieran construir y liderar en tecnología.",
      programs: ["Crea tu primer agente con IA", "Crea tu primera página web con IA"],
      links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/carolinabucarey/" }]
    },
    {
      name: "Jackeline Advincula",
      initials: "JA",
      image: "assets/images/jackeline-advincula.jpg",
      imageAlt: "Retrato de Jackeline Advincula",
      role: "Fundadora y facilitadora",
      specialty: "Inteligencia artificial aplicada, innovación y desarrollo de negocios",
      bio: "Ingeniera química de la Universidad Nacional de Ingeniería, con diplomatura en gestión de proyectos en la PUCP y un MBA en curso en ESAN. Fundadora y CEO de KUIDDA, empresa peruana respaldada por Start-Up Chile que desarrolla agentes de inteligencia artificial y ha ganado fondos públicos. Enseña en aulas universitarias y técnicas. En los talleres acompaña a las participantes con la experiencia de quien construye agentes todos los días. Desde 2019 lidera un proyecto de empoderamiento con alumnas de secundaria en Huachipa.",
      programs: ["Crea tu primer agente con IA"],
      links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/jackelineadvincula/" }]
    },
    {
      name: "Nuevas profesoras y mentoras",
      initials: "+",
      image: "",
      imageAlt: "",
      role: "Red en formación",
      specialty: "Tecnología, negocios, comunicación y desarrollo profesional",
      bio: "Estamos construyendo una red diversa de mujeres que quiera enseñar desde la experiencia y acompañar nuevos aprendizajes.",
      programs: ["Próximos programas"],
      links: [{ label: "Quiero sumarme", href: "index.html#contacto" }]
    }
  ],

  /*
   * Indicadores de impacto. Se muestran solo cuando hay cifras reales:
   * con la lista vacía, la sección de impacto no despliega la grilla.
   * Cada indicador admite: { label, value }.
   */
  impactIndicators: []
};
