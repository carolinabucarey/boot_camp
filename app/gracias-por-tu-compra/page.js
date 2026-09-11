import SecureBadgeHeader from "@/components/SecureBadgeHeader";
import { siteContent } from "@/lib/site-content";

export const metadata = {
  title: "Gracias por tu compra | Maile",
  description: "Tu compra fue realizada. Únete al grupo de WhatsApp para recibir toda la información de tu experiencia Maile.",
  robots: "noindex,nofollow",
  alternates: { canonical: "/gracias-por-tu-compra" }
};

export default function GraciasPorTuCompraPage() {
  const { brand } = siteContent;
  const groupLink = brand.links.whatsappGroup?.trim();
  const hasGroupLink = /^https:\/\/chat\.whatsapp\.com\//i.test(groupLink || "");
  const whatsappHref = hasGroupLink
    ? groupLink
    : `${brand.links.whatsapp}?text=${encodeURIComponent("Hola Maile, realicé mi compra y quiero acceder al grupo de WhatsApp.")}`;
  const whatsappLabel = hasGroupLink ? "Unirme al grupo de WhatsApp" : "Escribir por WhatsApp";
  const whatsappDescription = hasGroupLink
    ? "Ahí compartiremos avisos, materiales, enlaces y todo lo que necesitas antes de comenzar."
    : "Escríbenos y te compartiremos el acceso al grupo de WhatsApp de tu experiencia Maile.";
  const whatsappNote = hasGroupLink ? "El enlace se abrirá en WhatsApp." : "Te responderemos por WhatsApp a la brevedad.";

  return (
    <div className="purchase-confirmation-page">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <SecureBadgeHeader wrapperClassName="confirmation-header" label="Compra confirmada" />

      <main className="confirmation-main" id="contenido">
        <section className="confirmation-card" aria-labelledby="confirmation-title">
          <div className="confirmation-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="m8.5 16.5 5 5 10-11" />
            </svg>
          </div>
          <p className="eyebrow">Todo listo</p>
          <h1 id="confirmation-title">¡Gracias por tu compra!</h1>
          <p className="confirmation-lead">Tu pago fue realizado correctamente. Nos alegra mucho que seas parte de esta experiencia.</p>

          <div className="whatsapp-access">
            <div className="whatsapp-access-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <path d="M27 15.7A10.8 10.8 0 0 1 11 25.2L5 27l1.8-5.8A10.8 10.8 0 1 1 27 15.7Z" />
                <path d="M11.5 10.2c.3-.7.6-.7 1-.7h.7c.2 0 .5.1.6.5l1.1 2.6c.1.3.1.6-.1.8l-.9 1.1c-.2.2-.3.4-.1.7.7 1.4 1.8 2.5 3.2 3.3.3.2.5.1.7-.1l1.1-1.3c.2-.3.5-.3.8-.2l2.5 1.2c.3.2.6.3.6.5.1.2.1 1.4-.3 2.2-.4.8-2 1.6-2.8 1.7-.8.1-1.8.2-4.7-1-3.9-1.6-6.4-5.6-6.6-5.9-.2-.3-1.6-2.1-1.5-4.1.1-2 1.1-3 1.5-3.4.4-.4.9-.5 1.2-.5Z" />
              </svg>
            </div>
            <div>
              <p className="whatsapp-access-kicker">Tu siguiente paso</p>
              <h2>Únete al grupo de WhatsApp</h2>
              <p>{whatsappDescription}</p>
            </div>
          </div>

          <a className="btn btn-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer" data-track="join_whatsapp_group">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 11.8a8.6 8.6 0 0 1-12.7 7.6L3 20.9l1.4-4.6a8.6 8.6 0 1 1 16.1-4.5Z" />
              <path d="M8 7.4c.3-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.8 2c.1.2.1.4-.1.6l-.7.8c-.1.2-.2.3-.1.6.6 1.1 1.4 2 2.5 2.6.3.1.4.1.6-.1l.9-1c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.4.1.2.1 1.1-.2 1.7-.3.6-1.6 1.3-2.2 1.3-.7.1-1.5.2-3.7-.8-3.1-1.3-5.1-4.4-5.3-4.7-.1-.2-1.3-1.7-1.2-3.2 0-1.6.8-2.4 1.1-2.7.3-.3.7-.4 1-.4Z" />
            </svg>
            <span>{whatsappLabel}</span>
            <span aria-hidden="true">→</span>
          </a>

          <p className="confirmation-note">{whatsappNote}</p>
        </section>

        <p className="confirmation-closing">Si ya te uniste al grupo, puedes cerrar esta página.</p>
      </main>

      <footer className="confirmation-footer">
        <span>© {new Date().getFullYear()} Maile</span>
        <a href="/">Volver al sitio</a>
      </footer>
    </div>
  );
}
