// Lógica de cupos, pago y disponibilidad, portada de script.js/program.js.

export function getCapacityInfo(capacity) {
  const total = Number(capacity?.total);
  const remaining = Number(capacity?.remaining);
  const hasCapacity = Number.isInteger(total) && total > 0;
  const hasRemaining = hasCapacity && Number.isInteger(remaining) && remaining >= 0;
  const soldOut = hasRemaining && remaining === 0;
  return { total, remaining, hasCapacity, hasRemaining, soldOut };
}

export function capacityLabel(capacity) {
  const total = Number(capacity?.total);
  if (Number.isInteger(total) && total > 0) return `${total} cupos`;
  return typeof capacity === "string" ? capacity.trim() : "";
}

export function remainingLabel(total, remaining) {
  if (remaining === 1) return "1 cupo disponible";
  return `${remaining} cupos disponibles`;
}

export function hasCheckoutAvailable(program) {
  const { soldOut } = getCapacityInfo(program.capacity);
  if (soldOut) return false;
  const payment = program.payment || {};
  return Boolean(payment.checkoutUrl?.trim() || payment.discounts?.some((discount) => discount.checkoutUrl?.trim()));
}

export function registrationHref(program) {
  return `/?programa=${encodeURIComponent(program.slug)}#contacto`;
}

export function paymentHref(program) {
  return `/pago?programa=${encodeURIComponent(program.slug)}`;
}

/*
 * Reproduce la lógica de los enlaces [data-payment-link] en program.js:
 * si hay cupos y una forma de cobrar, apunta al pago; si los cupos están
 * completos, ofrece la lista de espera; si no, mantiene el enlace al
 * formulario de interés.
 */
export function getPaymentCta(program) {
  const { hasRemaining, remaining } = getCapacityInfo(program.capacity);
  if (program.statusKey !== "open") {
    return { href: registrationHref(program), label: null };
  }
  if (hasCheckoutAvailable(program)) {
    return { href: paymentHref(program), label: null };
  }
  if (hasRemaining && remaining === 0) {
    return { href: registrationHref(program), label: "Sumarme a la lista de espera" };
  }
  return { href: registrationHref(program), label: null };
}

/*
 * Reproduce renderEvents() de script.js: deriva href, texto del botón,
 * estado de inscripción y disponibilidad de cada encuentro a partir del
 * programa que referencia, sin duplicar esos datos en `events`.
 */
export function getEventDisplay(event, programs) {
  const programSlug = new URLSearchParams(event.href.split("?")[1] || "").get("programa");
  const program = programs.find((item) => item.slug === programSlug);
  const { hasRemaining, remaining } = getCapacityInfo(program?.capacity);
  const canPay = Boolean(program && (!hasRemaining || remaining > 0) && hasCheckoutAvailable(program));
  const soldOut = Boolean(program && hasRemaining && remaining === 0);
  const href = event.href.startsWith("/pago") && !canPay
    ? `/?programa=${encodeURIComponent(programSlug || "")}#contacto`
    : event.href;
  const action = soldOut ? "Sumarme a la lista de espera" : event.action;
  const registrationStatus = soldOut ? "Cupos completos" : event.registrationStatus;
  const eventCapacity = typeof event.capacity === "number" ? `${event.capacity} cupos` : event.capacity;
  const capacity = hasRemaining && remaining > 0 ? remainingLabel(null, remaining) : eventCapacity;
  return { href, action, registrationStatus, capacity };
}
