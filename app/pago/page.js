import { redirect } from "next/navigation";
import SecureBadgeHeader from "@/components/SecureBadgeHeader";
import PagoClient from "@/components/PagoClient";
import { getProgramBySlug } from "@/lib/site-content";

export const metadata = {
  title: "Reserva tu cupo | MAILE",
  description: "Revisa tu inscripción, aplica un código de descuento y continúa al pago seguro de tu experiencia MAILE.",
  robots: "noindex,follow"
};

export default async function PagoPage({ searchParams }) {
  const params = await searchParams;
  const program = getProgramBySlug(params?.programa);
  if (!program) redirect("/#programas");

  return (
    <div className="payment-page">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <SecureBadgeHeader wrapperClassName="payment-header" label="Pago protegido" />

      <main className="payment-main" id="contenido">
        <div className="container payment-layout">
          <section className="payment-intro" aria-labelledby="payment-title">
            <a className="payment-back" href={program.href}>
              ← Volver al programa
            </a>
            <p className="eyebrow">Reserva tu lugar</p>
            <h1 id="payment-title">Estás a un paso de crear tu agente</h1>
            <p className="lead">Revisa la información de tu inscripción y continúa a una plataforma de pago segura para confirmar tu cupo.</p>

            <div className="payment-promise">
              <span aria-hidden="true">✓</span>
              <p>Tu cupo queda confirmado al completar el pago. Recibirás el comprobante en el correo que indiques durante el cobro.</p>
            </div>
          </section>

          <section className="checkout-card" aria-labelledby="order-title">
            <p className="checkout-kicker">Resumen de inscripción</p>
            <h2 id="order-title">{program.name}</h2>
            <PagoClient program={program} initialCode={params?.codigo || ""} />
          </section>
        </div>
      </main>

      <footer className="confirmation-footer">
        <span>© {new Date().getFullYear()} MAILE</span>
        <span>
          ¿Tienes dudas?{" "}
          <a href="https://wa.me/56990195787" target="_blank" rel="noopener noreferrer">
            Escríbenos
          </a>
        </span>
      </footer>
    </div>
  );
}
