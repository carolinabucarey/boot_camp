// Conjuntos de enlaces de navegación compartidos entre páginas.

export const HOME_NAV_ITEMS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Programas", href: "#programas" },
  { label: "Cómo aprendemos", href: "#como-aprendemos" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "Nosotras", href: "#nosotras" },
  { label: "Para organizaciones", href: "/organizaciones" }
];

// Usado desde páginas distintas de la portada: las anclas apuntan de vuelta a "/".
export const CROSS_PAGE_NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Programas", href: "/#programas" },
  { label: "Cómo aprendemos", href: "/#como-aprendemos" },
  { label: "Comunidad", href: "/#comunidad" },
  { label: "Nosotras", href: "/#nosotras" },
  { label: "Para organizaciones", href: "/organizaciones" }
];

export const EXPLORA_FOOTER_LINKS_HOME = [
  { label: "Inicio", href: "#inicio" },
  { label: "Programas", href: "#programas" },
  { label: "Cómo aprendemos", href: "#como-aprendemos" },
  { label: "Impacto", href: "#impacto" },
  { label: "Comunidad", href: "#comunidad" }
];

export const EXPLORA_FOOTER_LINKS_CROSS = [
  { label: "Inicio", href: "/" },
  { label: "Programas", href: "/#programas" },
  { label: "Cómo aprendemos", href: "/#como-aprendemos" },
  { label: "Comunidad", href: "/#comunidad" },
  { label: "Nosotras", href: "/#nosotras" }
];

export function infoFooterLinks(brand) {
  return [
    { label: "Política de privacidad", href: brand.links.privacy },
    { label: "Términos", href: brand.links.terms },
    { social: true }
  ];
}

// Pie de página compartido por las tres páginas de detalle de programa.
export function programFooterColumns(brand) {
  return [
    { title: "Explora", links: EXPLORA_FOOTER_LINKS_CROSS },
    {
      title: "Participa",
      links: [
        { label: "Próximos programas", href: "/#contacto" },
        { label: "Para organizaciones", href: "/organizaciones" },
        { label: "WhatsApp", href: brand.links.whatsapp, external: true }
      ]
    },
    { title: "Información", links: infoFooterLinks(brand) }
  ];
}
