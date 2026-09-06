(function () {
  "use strict";
  const slug = document.body.dataset.program;
  const program = window.SITE_CONTENT?.programs.find((item) => item.slug === slug);
  if (!program) return;
  const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;"
  })[character]);
  const setText = (selector, value) => {
    if (value === undefined) return;
    document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });
  };
  const renderList = (selector, values = []) => {
    const list = document.querySelector(selector);
    if (list) list.innerHTML = values.map((value) => `<li>${escapeHTML(value)}</li>`).join("");
  };
  setText("[data-program-name]", program.name);
  setText("[data-tagline]", program.tagline);
  setText("[data-modality]", program.modality);
  setText("[data-level]", program.level);
  setText("[data-duration]", program.duration);
  setText("[data-result]", program.result);
  setText("[data-city]", program.city);
  // Sin ciudad definida, la fila no se muestra.
  if (!program.city) document.querySelector("[data-city-row]")?.remove();
  setText("[data-event-date]", program.eventDate);
  setText("[data-event-time]", program.eventTime);
  setText("[data-event-location]", program.eventLocation);
  setText("[data-event-access]", program.eventAccess);
  setText("[data-audience]", program.audience);
  setText("[data-promise]", program.promise);
  setText("[data-methodology]", program.methodology);
  setText("[data-next-date]", program.nextDate);
  setText("[data-price-early]", program.price?.earlyBird);
  setText("[data-price-general]", program.price?.general);
  setText("[data-price-note]", program.price?.note);
  const totalCapacity = Number(program.capacity?.total);
  const remainingCapacity = Number(program.capacity?.remaining);
  const hasCapacity = Number.isInteger(totalCapacity) && totalCapacity > 0;
  const hasRemaining = hasCapacity && Number.isInteger(remainingCapacity) && remainingCapacity >= 0;
  if (hasCapacity) {
    setText("[data-capacity]", `${totalCapacity} cupos`);
    setText("[data-capacity-total]", `${totalCapacity} cupos`);
    setText("[data-capacity-remaining]", hasRemaining
      ? (remainingCapacity === 1 ? "1 cupo disponible" : `${remainingCapacity} cupos disponibles`)
      : `${totalCapacity} cupos`);
  } else {
    if (typeof program.capacity === "string" && program.capacity.trim()) {
      setText("[data-capacity]", program.capacity);
    } else {
      document.querySelectorAll("[data-capacity-row], [data-capacity-message]").forEach((element) => element.remove());
    }
  }
  // Sin precio publicado, el bloque de valores no se muestra.
  if (!program.price) document.querySelector("[data-price-block]")?.remove();
  renderList("#learn-list", program.learn);
  renderList("#teacher-list", program.teachers);
  renderList("#requirement-list", program.requirements);

  if (program.statusKey === "open") {
    const registrationHref = `index.html?programa=${encodeURIComponent(program.slug)}#contacto`;
    document.querySelectorAll('a[href="index.html#contacto"]').forEach((link) => {
      link.href = registrationHref;
    });

    const checkoutAvailable = (!hasRemaining || remainingCapacity !== 0) && Boolean(
      program.payment?.checkoutUrl?.trim() ||
      program.payment?.discounts?.some((discount) => discount.checkoutUrl?.trim())
    );
    if (checkoutAvailable) {
      const paymentHref = `pago.html?programa=${encodeURIComponent(program.slug)}`;
      document.querySelectorAll("[data-payment-link]").forEach((link) => {
        link.href = paymentHref;
      });
    } else if (hasRemaining && remainingCapacity === 0) {
      document.querySelectorAll("[data-payment-link]").forEach((link) => {
        link.href = "index.html#contacto";
        link.textContent = "Sumarme a la lista de espera";
      });
    }
  }

  const faqList = document.querySelector("#faq-list");
  if (faqList && program.faqs) {
    faqList.innerHTML = program.faqs.map((faq) => `<details class="faq"><summary>${escapeHTML(faq.question)}</summary><p>${escapeHTML(faq.answer)}</p></details>`).join("");
  }
})();
