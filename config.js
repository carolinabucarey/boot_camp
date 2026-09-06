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
      // Pega aquí la invitación completa del grupo, por ejemplo:
      // https://chat.whatsapp.com/XXXXXXXX. Mientras esté vacío, la página de
      // confirmación permite solicitar el acceso por el WhatsApp oficial.
      whatsappGroup: "https://chat.whatsapp.com/IdHkG0A9t2QCiKcOYs9ta7?mode=gi_t",
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
      slug: "crea-tu-primer-agente-con-ia-online",
      name: "Crea tu primer agente con IA — Edición online",
      tagline: "Dos sesiones en vivo para crear una solución propia",
      need: "Aplicar IA a una necesidad concreta de tu trabajo, proyecto o negocio.",
      description: "Convierte un objetivo real en una primera versión de tu propio agente de IA, creada y probada por ti en dos sesiones online en vivo.",
      image: "assets/images/experiencia-trabajando.jpg",
      imageAlt: "Mujeres trabajando en sus proyectos con computadores durante una experiencia práctica",
      modality: "Online, en vivo",
      level: "Inicial",
      duration: "4 horas, distribuidas en 2 sesiones",
      result: "Una primera versión de tu propio agente de IA",
      requirements: [
        "Computador con conexión estable a internet.",
        "Traer una tarea, necesidad u objetivo que te gustaría resolver.",
        "No necesitas saber programar ni tener experiencia técnica previa."
      ],
      nextDate: "Jueves 1 y viernes 2 de octubre de 2026 · 19:00 a 21:00 horas",
      eventDate: "1 y 2 de octubre de 2026",
      eventTime: "19:00 a 21:00 horas, horario de Chile",
      eventLocation: "Online, en vivo",
      eventAccess: "Recibirás la información de conexión antes del inicio del programa.",
      status: "Inscripciones abiertas",
      statusKey: "open",
      // Completa ambos valores al abrir la venta. Usa 0 en `remaining` para cerrar el pago.
      capacity: {
        total: null,
        remaining: null
      },
      action: "Conocer el programa",
      href: "programa-agente-ia-online.html",
      hasDetailPage: true,
      price: {
        general: "$70.000 CLP",
        note: "Las primeras inscritas reciben 500 créditos en ChatGPT y una semana de Claude Cowork."
      },
      /*
       * El cobro ocurre siempre en una página alojada por el proveedor de pago.
       * Pega el enlace general en `checkoutUrl`. Para cada red colaboradora,
       * crea un enlace con el valor rebajado y agrégalo a `discounts`.
       * Nunca pongas credenciales ni llaves privadas en este archivo público.
       */
      payment: {
        providerName: "plataforma de pago",
        checkoutUrl: "",
        discounts: [
          // { code: "REDMUJERES10", partner: "Nombre de la red", price: "$63.000 CLP", checkoutUrl: "https://..." }
        ]
      },
      audience: "Mujeres que quieren aplicar la inteligencia artificial a una necesidad profesional, laboral, personal, de un proyecto o de un negocio. No necesitas tener un negocio ni experiencia técnica previa.",
      promise: "Convierte un objetivo real de tu trabajo, proyecto o negocio en un agente de IA creado por ti.",
      learn: [
        "Definirás una necesidad concreta y el objetivo de tu agente.",
        "Identificarás quién lo utilizará y qué información necesita.",
        "Crearás sus instrucciones y su forma de responder.",
        "Construirás y probarás una primera versión con situaciones reales.",
        "Detectarás mejoras y aprenderás a seguir desarrollándolo."
      ],
      methodology: "Trabajarás sobre una necesidad propia mediante una secuencia práctica: definir, crear, probar y continuar. Las explicaciones serán simples, sin tecnicismos innecesarios, y contarás con acompañamiento durante la construcción.",
      teachers: [],
      faqs: [
        { question: "¿Necesito saber programar?", answer: "No. El programa está diseñado para mujeres sin experiencia técnica previa." },
        { question: "¿Tengo que tener un negocio?", answer: "No. Puedes trabajar sobre una necesidad de tu trabajo, un proyecto, una idea, un negocio o un objetivo personal." },
        { question: "¿Tengo que llegar con una idea definida?", answer: "No necesita estar completamente desarrollada. Es recomendable que llegues con una tarea, necesidad u objetivo que te gustaría resolver; durante la primera sesión te ayudaremos a acotarlo." },
        { question: "¿Saldré con un agente terminado?", answer: "Saldrás con una primera versión creada y probada. Podrás continuar ajustándola y ampliándola después del curso." },
        { question: "¿Qué incluye el valor?", answer: "Incluye las dos sesiones online en vivo, los materiales de trabajo y el acompañamiento durante la creación. Además, las primeras inscritas reciben 500 créditos en ChatGPT y una semana de Claude Cowork." }
      ]
    },
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
      name: "Crea y publica tu proyecto web con IA",
      tagline: "Convierte una idea clara en una primera solución web creada y publicada por ti",
      need: "Convertir una idea, proyecto o necesidad propia en una solución web concreta.",
      description: "Define, construye, revisa y publica una primera solución web utilizando ChatGPT y Claude, sin necesidad de saber programar.",
      image: "assets/images/mujeres-colaborando.jpg",
      imageAlt: "Mujeres colaborando alrededor de un computador durante una sesión práctica",
      modality: "100% online en vivo",
      level: "Intermedio",
      duration: "4 horas, divididas en dos jornadas",
      result: "Una primera solución web funcional, versionada y publicada",
      capacity: {
        total: 10,
        remaining: 10
      },
      requirements: [
        "Computador con conexión estable a internet y navegador actualizado.",
        "Experiencia previa utilizando ChatGPT y Claude.",
        "Suscripción activa a un plan pagado de ChatGPT y a Claude Pro o superior.",
        "Cuentas personales de GitHub y Vercel.",
        "Una idea o proyecto claramente definido.",
        "Textos, imágenes, colores o referencias disponibles, si ya los tienes."
      ],
      nextDate: "Miércoles 7 y jueves 8 de octubre de 2026 · Horario por confirmar",
      eventDate: "7 y 8 de octubre de 2026",
      eventTime: "Horario por confirmar",
      eventLocation: "Online, en vivo",
      eventAccess: "Recibirás la información de conexión antes del inicio del programa.",
      status: "Inscripciones abiertas",
      statusKey: "open",
      action: "Inscribirme",
      href: "programa-web-ia.html",
      hasDetailPage: true,
      price: {
        general: "$74.990 CLP",
        note: "Incluye dos sesiones online en vivo, construcción guiada, publicación inicial, configuración técnica y un dominio .cl por 12 meses. Las suscripciones de ChatGPT y Claude no están incluidas."
      },
      payment: {
        providerName: "Mercado Pago",
        checkoutUrl: "https://mpago.la/2ZrMcvC",
        discounts: []
      },
      audience: "Mujeres que ya utilizan ChatGPT y Claude, quieren avanzar más allá de los usos básicos y tienen una idea, proyecto o necesidad que desean convertir en una solución web. No necesitas saber programar, pero sí llegar con claridad sobre lo que quieres desarrollar.",
      promise: "Convierte una idea clara en una primera solución web creada y publicada por ti.",
      learn: [
        "Definir qué quieres crear, para quién y qué necesidad debe resolver.",
        "Acotar el proyecto para construir una primera versión posible.",
        "Convertir tu idea en instrucciones claras para la inteligencia artificial.",
        "Definir contenidos, secciones y funciones principales.",
        "Trabajar con un repositorio individual en GitHub.",
        "Utilizar Claude Code desde el navegador para generar y modificar el proyecto.",
        "Probar la web, revisar cambios y trabajar con versiones.",
        "Publicar en Vercel y comprender cómo conectar un dominio .cl."
      ],
      methodology: "Trabajarás directamente sobre tu propia idea o necesidad. Cada explicación estará conectada con una acción concreta: definir, crear, probar o publicar. No enseñaremos programación tradicional; aprenderás a dirigir a la inteligencia artificial, tomar decisiones sobre lo que construye y comprobar que el resultado responda a tu objetivo.",
      teachers: [],
      faqs: [
        { question: "¿Necesito saber programar?", answer: "No. Trabajaremos con instrucciones en lenguaje natural. Sin embargo, debes tener experiencia previa utilizando ChatGPT y Claude." },
        { question: "¿Puedo participar si solamente tengo una idea general?", answer: "Necesitas tener cierta claridad sobre qué quieres crear, para quién y qué debería permitir hacer. Antes del programa te pediremos una descripción breve para ayudarte a acotar el proyecto." },
        { question: "¿Necesito instalar algún programa?", answer: "No será necesario instalar Visual Studio Code. Trabajaremos principalmente desde el navegador con ChatGPT, Claude Code, GitHub y Vercel." },
        { question: "¿Las suscripciones están incluidas?", answer: "No. Cada participante debe contar con suscripciones activas a un plan pagado de ChatGPT y a Claude Pro o superior. Estas suscripciones son independientes del valor del programa." },
        { question: "¿Terminaré con una aplicación completa?", answer: "Terminarás con una primera versión web funcional y acotada. El alcance dependerá de la complejidad del proyecto y del punto de partida de cada participante." },
        { question: "¿Podré modificar mi proyecto después?", answer: "Sí. Aprenderás el proceso para solicitar cambios con inteligencia artificial, revisar las versiones en GitHub y volver a publicar." },
        { question: "¿El dominio quedará a mi nombre?", answer: "Sí. MAILE realizará la compra y configuración inicial. Después deberás crear una cuenta en NIC Chile para que podamos transferirte la titularidad y administración del dominio." },
        { question: "¿Qué ocurre después de los primeros 12 meses?", answer: "Podrás renovar el dominio directamente desde tu cuenta de NIC Chile. El costo de renovación no está incluido." },
        { question: "¿Incluye alojamiento por 12 meses?", answer: "El programa incluye la publicación inicial en Vercel y la conexión del dominio. La continuidad del alojamiento dependerá de la cuenta y del plan de Vercel de cada participante." },
        { question: "¿Incluye mantenimiento o soporte posterior?", answer: "No incluye mantenimiento, modificaciones posteriores ni soporte técnico individual después de las sesiones. Sí incluye acceso a la comunidad MAILE, de acuerdo con las actividades y recursos disponibles." }
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
  events: [
    {
      title: "Crea tu primer agente con IA — Edición online",
      topic: "Agentes con IA · Nivel inicial",
      date: "1 y 2 de octubre de 2026",
      time: "19:00 a 21:00 horas",
      city: "Online",
      host: "En vivo",
      facilitators: [],
      cost: "$70.000 CLP",
      registrationStatus: "Inscripciones abiertas",
      action: "Inscribirme",
      href: "pago.html?programa=crea-tu-primer-agente-con-ia-online"
    },
    {
      title: "Crea y publica tu proyecto web con IA",
      topic: "Proyectos web con IA · Nivel intermedio",
      date: "7 y 8 de octubre de 2026",
      time: "Horario por confirmar",
      city: "Online",
      host: "En vivo",
      facilitators: [],
      capacity: 10,
      cost: "$74.990 CLP",
      registrationStatus: "Inscripciones abiertas",
      action: "Inscribirme",
      href: "pago.html?programa=crea-tu-primera-web-con-ia"
    }
  ],

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
      programs: ["Crea tu primer agente con IA", "Crea y publica tu proyecto web con IA"],
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
