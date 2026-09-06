"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { getCapacityInfo, hasCheckoutAvailable, remainingLabel } from "@/lib/program-helpers";

function normalizedCode(value) {
  return String(value || "")
    .trim()
    .toLocaleUpperCase("es-CL");
}

function safeCheckoutUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch (error) {
    return "";
  }
}

export default function PagoClient({ program, initialCode }) {
  const payment = program.payment || {};
  const discounts = Array.isArray(payment.discounts) ? payment.discounts : [];
  const { total, remaining, hasCapacity, hasRemaining, soldOut } = getCapacityInfo(program.capacity);
  const canCheckout = hasCheckoutAvailable(program);

  const [code, setCode] = useState(initialCode || "");
  const [priceText, setPriceText] = useState(program.price?.general || "");
  const [codeStatus, setCodeStatus] = useState({ message: "", type: "" });
  const [codeInvalid, setCodeInvalid] = useState(false);
  const [selectedCheckoutUrl, setSelectedCheckoutUrl] = useState(payment.checkoutUrl?.trim() || "");
  const [submitting, setSubmitting] = useState(false);

  function applyCode(showEmptyMessage, rawValue) {
    const value = normalizedCode(rawValue ?? code);
    setCode(value);
    setCodeInvalid(false);

    if (!value) {
      setSelectedCheckoutUrl(payment.checkoutUrl?.trim() || "");
      setPriceText(program.price?.general || "");
      setCodeStatus({
        message: showEmptyMessage ? "Escribe el código que recibiste para aplicarlo." : "",
        type: ""
      });
      return Boolean(payment.checkoutUrl?.trim());
    }

    const discount = discounts.find((item) => normalizedCode(item.code) === value);
    if (!discount || !safeCheckoutUrl(discount.checkoutUrl)) {
      setSelectedCheckoutUrl("");
      setPriceText(program.price?.general || "");
      setCodeInvalid(true);
      setCodeStatus({ message: "No encontramos ese código. Revísalo o continúa sin descuento.", type: "error" });
      return false;
    }

    setSelectedCheckoutUrl(discount.checkoutUrl.trim());
    setPriceText(discount.price || program.price?.general || "");
    setCodeStatus({
      message: discount.partner ? `Código aplicado · beneficio de ${discount.partner}.` : "Código aplicado correctamente.",
      type: "success"
    });
    track("apply_discount_code", { programa: program.slug, colaborador: discount.partner || "" });
    return true;
  }

  // Si llega un código en la URL (?codigo=), se aplica una sola vez al cargar.
  useEffect(() => {
    if (initialCode && discounts.length) applyCode(false, initialCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (code && !applyCode(true)) return;
    const checkoutUrl = safeCheckoutUrl(selectedCheckoutUrl || payment.checkoutUrl);
    if (!checkoutUrl) {
      setCodeStatus({ message: "No pudimos abrir el pago. Escríbenos por WhatsApp para ayudarte.", type: "error" });
      return;
    }
    setSubmitting(true);
    track("begin_checkout", { programa: program.slug });
    window.location.assign(checkoutUrl);
  }

  if (!canCheckout) {
    return (
      <div className="payment-unavailable" id="payment-unavailable">
        {soldOut ? (
          <>
            <h3>Los cupos están completos</h3>
            <p>Puedes escribirnos para sumarte a la lista de espera o conocer la próxima edición.</p>
            <a
              className="btn btn-primary btn-block"
              href="https://wa.me/56990195787?text=Hola%20MAILE%2C%20quiero%20reservar%20mi%20cupo%20en%20el%20bootcamp%20online."
              target="_blank"
              rel="noopener noreferrer"
            >
              Sumarme a la lista de espera
            </a>
          </>
        ) : (
          <>
            <h3>Estamos habilitando el pago en línea</h3>
            <p>Mientras terminamos la configuración, escríbenos y te ayudaremos a reservar tu cupo.</p>
            <a
              className="btn btn-primary btn-block"
              href="https://wa.me/56990195787?text=Hola%20MAILE%2C%20quiero%20reservar%20mi%20cupo%20en%20el%20bootcamp%20online."
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </a>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <dl className="order-details">
        <div>
          <dt>Fechas</dt>
          <dd>{program.eventDate || program.nextDate}</dd>
        </div>
        <div>
          <dt>Horario</dt>
          <dd>{program.eventTime}</dd>
        </div>
        <div>
          <dt>Modalidad</dt>
          <dd>{program.modality}</dd>
        </div>
        {hasCapacity && (
          <div>
            <dt>Disponibilidad</dt>
            <dd>{hasRemaining ? remainingLabel(total, remaining) : `${total} cupos en total`}</dd>
          </div>
        )}
      </dl>

      <div className="order-total">
        <span>Total</span>
        <strong>{priceText}</strong>
      </div>

      <form id="payment-form" noValidate onSubmit={handleSubmit}>
        {discounts.length > 0 && (
          <div className="discount-panel">
            <label htmlFor="discount-code">
              Código de descuento{" "}
              <span>{!payment.checkoutUrl?.trim() ? "(requerido)" : "(opcional)"}</span>
            </label>
            <div className="discount-controls">
              <input
                id="discount-code"
                name="discount_code"
                type="text"
                inputMode="text"
                autoComplete="off"
                maxLength={40}
                placeholder="Ej. REDMUJERES10"
                aria-describedby="discount-help discount-status"
                aria-invalid={codeInvalid ? "true" : undefined}
                required={!payment.checkoutUrl?.trim()}
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setCodeInvalid(false);
                  setCodeStatus({ message: "", type: "" });
                }}
              />
              <button className="btn btn-secondary" type="button" onClick={() => applyCode(true)}>
                Aplicar
              </button>
            </div>
            <p className="discount-help" id="discount-help">
              {!payment.checkoutUrl?.trim()
                ? "Escribe el código que recibiste para acceder al enlace de pago de tu red colaboradora."
                : "Si una red colaboradora te compartió un código, escríbelo tal como lo recibiste."}
            </p>
            <p className={`discount-status${codeStatus.type ? ` ${codeStatus.type}` : ""}`} id="discount-status" aria-live="polite">
              {codeStatus.message}
            </p>
          </div>
        )}

        <button className="btn btn-primary btn-block checkout-button" id="checkout-button" type="submit" disabled={submitting}>
          {submitting ? "Abriendo pago seguro…" : (
            <>
              Continuar al pago seguro <span aria-hidden="true">→</span>
            </>
          )}
        </button>
        <p className="checkout-provider">
          El cobro se completa en <span>{payment.providerName || "la plataforma de pago"}</span>. MAILE no recibe ni almacena los
          datos de tu tarjeta.
        </p>
        <p className="checkout-legal">
          Al continuar, declaras haber revisado los <a href="/terminos">términos</a> y la <a href="/privacidad">política de privacidad</a>.
        </p>
      </form>
    </>
  );
}
