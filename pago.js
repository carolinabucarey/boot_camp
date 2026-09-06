(function () {
  "use strict";

  const content = window.SITE_CONTENT;
  const params = new URLSearchParams(location.search);
  const program = content?.programs.find((item) => item.slug === params.get("programa"));
  const form = document.querySelector("#payment-form");
  if (!program || !form) {
    location.replace("index.html#programas");
    return;
  }

  const payment = program.payment || {};
  const discounts = Array.isArray(payment.discounts) ? payment.discounts : [];
  const codeInput = document.querySelector("#discount-code");
  const codeStatus = document.querySelector("#discount-status");
  const checkoutButton = document.querySelector("#checkout-button");
  const unavailable = document.querySelector("#payment-unavailable");
  const discountPanel = document.querySelector("[data-discount-panel]");
  const totalCapacity = Number(program.capacity?.total);
  const remainingCapacity = Number(program.capacity?.remaining);
  const hasCapacity = Number.isInteger(totalCapacity) && totalCapacity > 0;
  const hasRemaining = hasCapacity && Number.isInteger(remainingCapacity) && remainingCapacity >= 0;
  const soldOut = hasRemaining && remainingCapacity === 0;
  const hasCheckout = !soldOut && Boolean(payment.checkoutUrl?.trim() || discounts.some((item) => item.checkoutUrl?.trim()));
  let selectedCheckoutUrl = payment.checkoutUrl?.trim() || "";

  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value || "";
    });
  };

  function normalizedCode(value) {
    return String(value || "").trim().toLocaleUpperCase("es-CL");
  }

  function safeCheckoutUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "https:" ? url.href : "";
    } catch (error) {
      return "";
    }
  }

  function applyCode(showEmptyMessage) {
    const code = normalizedCode(codeInput.value);
    codeInput.value = code;
    codeInput.removeAttribute("aria-invalid");

    if (!code) {
      selectedCheckoutUrl = payment.checkoutUrl?.trim() || "";
      setText("[data-payment-price]", program.price?.general);
      codeStatus.textContent = showEmptyMessage ? "Escribe el código que recibiste para aplicarlo." : "";
      codeStatus.className = "discount-status";
      return Boolean(selectedCheckoutUrl);
    }

    const discount = discounts.find((item) => normalizedCode(item.code) === code);
    if (!discount || !safeCheckoutUrl(discount.checkoutUrl)) {
      selectedCheckoutUrl = "";
      setText("[data-payment-price]", program.price?.general);
      codeInput.setAttribute("aria-invalid", "true");
      codeStatus.textContent = "No encontramos ese código. Revísalo o continúa sin descuento.";
      codeStatus.className = "discount-status error";
      return false;
    }

    selectedCheckoutUrl = discount.checkoutUrl.trim();
    setText("[data-payment-price]", discount.price || program.price?.general);
    codeStatus.textContent = discount.partner
      ? `Código aplicado · beneficio de ${discount.partner}.`
      : "Código aplicado correctamente.";
    codeStatus.className = "discount-status success";
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "apply_discount_code", programa: program.slug, colaborador: discount.partner || "" });
    return true;
  }

  setText("[data-payment-program]", program.name);
  setText("[data-payment-date]", program.eventDate || program.nextDate);
  setText("[data-payment-time]", program.eventTime);
  setText("[data-payment-modality]", program.modality);
  setText("[data-payment-price]", program.price?.general);
  setText("[data-payment-provider]", payment.providerName || "la plataforma de pago");
  document.querySelector("[data-program-back]").href = program.href;

  if (hasCapacity) {
    setText("[data-capacity-remaining]", hasRemaining
      ? (remainingCapacity === 1 ? "1 cupo disponible" : `${remainingCapacity} cupos disponibles`)
      : `${totalCapacity} cupos en total`);
  } else {
    document.querySelectorAll("[data-capacity-row]").forEach((element) => element.remove());
  }

  if (!discounts.length) discountPanel?.remove();

  if (!payment.checkoutUrl?.trim() && discounts.length && codeInput) {
    codeInput.required = true;
    const optionalLabel = discountPanel?.querySelector("label span");
    if (optionalLabel) optionalLabel.textContent = "(requerido)";
    document.querySelector("#discount-help").textContent = "Escribe el código que recibiste para acceder al enlace de pago de tu red colaboradora.";
  }

  if (!hasCheckout) {
    form.hidden = true;
    unavailable.hidden = false;
    if (soldOut) {
      unavailable.querySelector("h3").textContent = "Los cupos están completos";
      unavailable.querySelector("p").textContent = "Puedes escribirnos para sumarte a la lista de espera o conocer la próxima edición.";
      unavailable.querySelector("a").textContent = "Sumarme a la lista de espera";
    }
  } else {
    const sharedCode = params.get("codigo");
    if (sharedCode && codeInput && discounts.length) {
      codeInput.value = sharedCode;
      applyCode(false);
    }

    document.querySelector("#apply-discount")?.addEventListener("click", () => applyCode(true));
    codeInput?.addEventListener("input", () => {
      codeInput.removeAttribute("aria-invalid");
      codeStatus.textContent = "";
      codeStatus.className = "discount-status";
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (codeInput?.value && !applyCode(true)) {
        codeInput.focus();
        return;
      }
      const checkoutUrl = safeCheckoutUrl(selectedCheckoutUrl || payment.checkoutUrl);
      if (!checkoutUrl) {
        codeStatus.textContent = "No pudimos abrir el pago. Escríbenos por WhatsApp para ayudarte.";
        codeStatus.className = "discount-status error";
        return;
      }
      checkoutButton.disabled = true;
      checkoutButton.textContent = "Abriendo pago seguro…";
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "begin_checkout", programa: program.slug });
      location.assign(checkoutUrl);
    });
  }
})();
