/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/organizaciones.html", destination: "/organizaciones", permanent: true },
      { source: "/pago.html", destination: "/pago", permanent: true },
      { source: "/gracias-por-tu-compra.html", destination: "/gracias-por-tu-compra", permanent: true },
      { source: "/privacidad.html", destination: "/privacidad", permanent: true },
      { source: "/terminos.html", destination: "/terminos", permanent: true },
      { source: "/programa-agente-ia.html", destination: "/programas/crea-tu-primer-agente-con-ia", permanent: true },
      { source: "/programa-agente-ia-online.html", destination: "/programas/crea-tu-primer-agente-con-ia-online", permanent: true },
      { source: "/programa-web-ia.html", destination: "/programas/crea-tu-primera-web-con-ia", permanent: true }
    ];
  }
};

export default nextConfig;
