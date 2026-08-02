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
      slug: "emprende-con-ia",
      name: "Emprende con IA",
      description: "Explora una oportunidad, ordénala y conviértela en una propuesta de negocio clara con apoyo de inteligencia artificial.",
      image: "assets/images/mentoria-en-equipo.jpg",
      imageAlt: "Dos mujeres conversando y trabajando juntas con computadores",
      modality: "Presencial",
      level: "Inicial",
      duration: "Por definir",
      result: "Propuesta de negocio desarrollada",
      requirements: ["Tener una idea, desafío u oportunidad que quieras explorar."],
      nextDate: "Fecha por anunciar",
      status: "En preparación",
      statusKey: "preparing",
      action: "Sumarme a la lista de interés",
      href: "index.html#contacto"
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
   * Deja esta lista vacía para mostrar el estado sin encuentros.
   * Cada encuentro admite: title, topic, date, time, city, host,
   * facilitators (lista), capacity, cost, registrationStatus, action y href.
   */
  events: [],

  people: [
    {
      name: "Carolina",
      initials: "C",
      image: "",
      imageAlt: "",
      role: "Fundadora y facilitadora",
      specialty: "Tecnología aplicada, productos digitales e inteligencia artificial",
      bio: "Impulsa esta iniciativa y facilita experiencias para que más mujeres puedan convertir la tecnología en proyectos y resultados propios.",
      programs: ["Crea tu primera página web con IA"],
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
