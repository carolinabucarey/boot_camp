(function () {
  "use strict";

  const content = window.SITE_CONTENT;
  if (!content) return;

  const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;"
  })[character]);

  /*
   * El nombre y la URL también están escritos en el HTML, no solo aquí: los
   * rastreadores de Google y de las redes leen el HTML sin ejecutar JavaScript,
   * así que un nombre puesto desde acá no llega ni al buscador ni a la tarjeta
   * que se ve al compartir el sitio. Si cambia el nombre, hay que cambiarlo en
   * los dos lados.
   */
  function applyBrand() {
    const { brand } = content;
    const canonical = document.querySelector('link[rel="canonical"]');
    // La URL canónica declarada en el HTML es la fuente de verdad. Así, por
    // ejemplo, /index.html y la portada con parámetros siguen apuntando a /.
    const canonicalUrl = canonical?.href || `${brand.siteUrl}${location.pathname === "/" ? "/" : location.pathname}`;
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = canonicalUrl;
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.content = `${brand.siteUrl}/assets/og-social.png`;
    // El logotipo destaca "AI" dentro del nombre: M-AI-LE. En el texto corrido,
    // en cambio, el nombre va de una sola pieza.
    const nombre = escapeHTML(brand.name);
    const realce = escapeHTML(brand.nameHighlight || "");
    const logotipo = realce && nombre.includes(realce)
      ? nombre.replace(realce, `<span class="ai">${realce}</span>`)
      : nombre;
    document.querySelectorAll("[data-brand]").forEach((element) => {
      element.innerHTML = element.closest(".wordmark") ? logotipo : nombre;
    });
    if (brand.logo) {
      document.querySelectorAll("[data-brand-mark]").forEach((element) => { element.src = brand.logo; });
    }
    document.querySelectorAll("[data-descriptor]").forEach((element) => { element.textContent = brand.descriptor; });
    document.querySelectorAll("[data-email]").forEach((element) => {
      element.textContent = brand.email;
      element.href = `mailto:${brand.email}`;
    });
    document.querySelectorAll("[data-privacy]").forEach((element) => { element.href = brand.links.privacy; });
    document.querySelectorAll("[data-terms]").forEach((element) => { element.href = brand.links.terms; });
    document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = new Date().getFullYear(); });

    const socialContainer = document.querySelector("[data-socials]");
    if (socialContainer) {
      const socials = [
        ["Instagram", brand.links.instagram],
        ["LinkedIn", brand.links.linkedin]
      ].filter(([, href]) => href);
      if (socials.length) {
        socialContainer.innerHTML = socials.map(([label, href]) => `<a href="${escapeHTML(href)}" rel="noopener noreferrer">${label}</a>`).join(" · ");
      }
    }
  }

  function renderPrograms() {
    const list = document.querySelector("#program-list");
    if (!list) return;
    list.innerHTML = content.programs.map((program) => `
      <article class="program-card">
        <div class="program-image">
          <img src="${escapeHTML(program.image)}" alt="${escapeHTML(program.imageAlt)}" width="800" height="600" loading="lazy">
          <span class="status">${escapeHTML(program.status)}</span>
        </div>
        <div class="program-body">
          <div class="meta-row"><span class="meta">${escapeHTML(program.modality)}</span><span class="meta">Nivel ${escapeHTML(program.level)}</span>${program.duration !== "Por definir" ? `<span class="meta">${escapeHTML(program.duration)}</span>` : ""}</div>
          <h3>${escapeHTML(program.name)}${program.tagline ? `<span class="program-tagline">${escapeHTML(program.tagline)}</span>` : ""}</h3>
          <p>${escapeHTML(program.description)}</p>
          <div class="result"><small>Resultado</small><strong>${escapeHTML(program.result)}</strong></div>
          <a class="btn btn-secondary btn-arrow" href="${escapeHTML(program.href)}">${program.hasDetailPage ? "Ver programa" : escapeHTML(program.action)}</a>
        </div>
      </article>`).join("");

    const programSelect = document.querySelector("#p-programa");
    if (programSelect) {
      // El formulario solo permite inscribirse en programas con convocatoria abierta.
      const offered = content.programs.filter((program) => program.statusKey === "open");
      programSelect.insertAdjacentHTML("beforeend", offered.map((program) => `<option value="${escapeHTML(program.slug)}">${escapeHTML(program.name)}</option>`).join(""));
    }
  }

  function setupProgramInterest() {
    const programSelect = document.querySelector("#p-programa");
    if (!programSelect) return;

    const programSlug = new URLSearchParams(location.search).get("programa");
    const program = content.programs.find((item) => item.slug === programSlug);
    const option = Array.from(programSelect.options).find((item) => item.value === programSlug);
    if (!program || !option) return;

    option.selected = true;
    option.defaultSelected = true;

    if (program.statusKey === "open") {
      const submitButton = document.querySelector('#form-participantes button[type="submit"]');
      if (submitButton) submitButton.textContent = "Inscribirme";
    }
  }

  function renderEvents() {
    const list = document.querySelector("#event-list");
    if (!list) return;
    if (!content.events.length) {
      const fallback = content.eventsFallback || {
        title: "Estamos preparando nuevas experiencias presenciales.",
        description: "Déjanos tus datos y te avisaremos cuando abramos la próxima convocatoria.",
        action: "Quiero recibir las próximas fechas",
        href: "index.html#contacto"
      };
      list.innerHTML = `
        <div class="empty-state">
          <div><h3>${escapeHTML(fallback.title)}</h3><p>${escapeHTML(fallback.description)}</p></div>
          <a class="btn btn-primary" href="${escapeHTML(fallback.href)}">${escapeHTML(fallback.action)}</a>
        </div>`;
      return;
    }
    list.className = "event-list";
    list.innerHTML = content.events.map((event) => `
      <article class="event-card">
        <div><strong>${escapeHTML(event.date)}</strong><br><span>${escapeHTML(event.time)}</span></div>
        <div><p class="eyebrow">${escapeHTML(event.topic)}</p><h3>${escapeHTML(event.title)}</h3><p>${escapeHTML(event.city)} · ${escapeHTML(event.host)}</p>${event.facilitators?.length || event.capacity || event.cost || event.registrationStatus ? `<p>${[
          event.facilitators?.length ? event.facilitators.join(", ") : "",
          event.capacity ? `${event.capacity} cupos` : "",
          event.cost,
          event.registrationStatus
        ].filter(Boolean).map(escapeHTML).join(" · ")}</p>` : ""}</div>
        <a class="btn btn-primary" href="${escapeHTML(event.href)}">${escapeHTML(event.action)}</a>
      </article>`).join("");
  }

  function renderTestimonials() {
    const section = document.querySelector("#testimonios");
    if (!section) return;
    const list = section.querySelector("#testimonial-list");
    const testimonials = content.testimonials || [];
    // Sin comentarios reales, la sección no se muestra.
    if (!testimonials.length) {
      section.remove();
      return;
    }
    list.innerHTML = testimonials.map((testimonial) => `
      <figure class="testimonial">
        <blockquote>${escapeHTML(testimonial.quote)}</blockquote>
        <figcaption>
          <strong>${escapeHTML(testimonial.author)}</strong>
          ${testimonial.role ? `<span>${escapeHTML(testimonial.role)}</span>` : ""}
          ${testimonial.program ? `<span class="testimonial-program">${escapeHTML(testimonial.program)}</span>` : ""}
        </figcaption>
      </figure>`).join("");
  }

  function renderImpact() {
    const list = document.querySelector("#impact-list");
    if (!list) return;
    if (!content.impactIndicators.length) {
      list.remove();
      return;
    }
    list.innerHTML = content.impactIndicators.map((indicator) => `
      <article class="impact-card"><span class="impact-value">${escapeHTML(indicator.value)}</span><span class="impact-label">${escapeHTML(indicator.label)}</span></article>`).join("");
  }

  function renderPeople() {
    const list = document.querySelector("#people-list");
    if (!list) return;
    list.innerHTML = content.people.map((person) => `
      <article class="person-card">
        <div class="person-body">
          <div class="person-header">
            <div class="person-visual">${person.image ? `<img src="${escapeHTML(person.image)}" alt="${escapeHTML(person.imageAlt)}" loading="lazy">` : `<span aria-label="Perfil de ${escapeHTML(person.name)}">${escapeHTML(person.initials)}</span>`}</div>
            <div>
              <h3>${escapeHTML(person.name)}</h3>
              <p class="person-role">${escapeHTML(person.role)}</p>
            </div>
          </div>
          ${person.specialty ? `<p class="person-specialty">${escapeHTML(person.specialty)}</p>` : ""}
          ${person.bio ? `<p class="person-bio">${escapeHTML(person.bio)}</p>` : ""}
          <p class="person-programs"><strong>Programas:</strong> ${person.programs.map(escapeHTML).join(", ")}</p>
          ${person.links.length ? `<p class="person-links">${person.links.map((link) => `<a href="${escapeHTML(link.href)}">${escapeHTML(link.label)}</a>`).join(" · ")}</p>` : ""}
        </div>
      </article>`).join("");
  }

  function setupMenu() {
    const button = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".mobile-nav");
    if (!button || !menu) return;
    const closeMenu = () => {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Abrir menú");
      menu.classList.remove("open");
      document.body.classList.remove("menu-open");
    };
    button.addEventListener("click", () => {
      const opening = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(opening));
      button.setAttribute("aria-label", opening ? "Cerrar menú" : "Abrir menú");
      menu.classList.toggle("open", opening);
      document.body.classList.toggle("menu-open", opening);
      if (opening) menu.querySelector("a")?.focus();
    });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("open")) {
        closeMenu();
        button.focus();
      }
    });
  }

  function validateForm(form) {
    form.querySelectorAll(".error-text").forEach((error) => error.remove());
    form.querySelectorAll("[aria-invalid]").forEach((field) => field.removeAttribute("aria-invalid"));
    const invalidFields = [];
    form.querySelectorAll("input, select, textarea").forEach((field) => {
      const value = field.value.trim();
      let message = "";
      if (field.required && !value) message = "Este campo es obligatorio.";
      else if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Ingresa un correo válido.";
      else if (field.type === "number" && value && Number(value) < Number(field.min || 0)) message = "Ingresa un número válido.";
      if (message) {
        field.setAttribute("aria-invalid", "true");
        field.insertAdjacentHTML("afterend", `<span class="error-text">${message}</span>`);
        invalidFields.push(field);
      }
    });
    return invalidFields;
  }

  // Los desplegables viajan con su texto visible: la planilla se lee sin traducir slugs.
  function readFields(form) {
    const campos = Object.fromEntries(new FormData(form).entries());
    form.querySelectorAll("select").forEach((select) => {
      const option = select.selectedOptions[0];
      if (option && option.value) campos[select.name] = option.textContent.trim();
    });
    return campos;
  }

  function nuevoId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  /*
   * Primero se intenta un envío normal, que permite leer la respuesta y
   * confirmar que el servidor recibió los datos. Si el navegador bloquea esa
   * lectura por CORS, se reintenta en modo opaco: la petición igual llega,
   * aunque no podamos leer la respuesta.
   */
  async function send(endpoint, payload) {
    const options = { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: payload };
    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) throw new Error(`Respuesta ${response.status}`);
    } catch (error) {
      await fetch(endpoint, { ...options, mode: "no-cors" });
    }
  }

  const GRACIAS = "Gracias. Registramos tus datos y te contactaremos cuando tengamos novedades.";

  function setupForms() {
    const endpoint = content.forms?.endpoint;
    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const status = form.querySelector(".form-status");
        const invalidFields = validateForm(form);
        if (invalidFields.length) {
          status.textContent = "Revisa los campos marcados antes de enviar.";
          status.className = "form-status error";
          invalidFields[0].focus();
          return;
        }

        // Sin endpoint configurado no hay dónde guardar: se agradece y no se promete más.
        if (!endpoint) {
          status.textContent = GRACIAS;
          status.className = "form-status success";
          form.reset();
          return;
        }

        const button = form.querySelector('button[type="submit"]');
        const buttonLabel = button?.textContent;
        if (button) {
          button.disabled = true;
          button.textContent = "Enviando…";
        }
        status.textContent = "";
        status.className = "form-status";

        const payload = JSON.stringify({
          // Identifica el envío: los dos intentos comparten id y la planilla guarda uno solo.
          id: nuevoId(),
          formulario: form.dataset.formulario || "otros",
          campos: readFields(form),
          origen: location.pathname
        });

        try {
          await send(endpoint, payload);
          status.textContent = GRACIAS;
          status.className = "form-status success";
          form.reset();
        } catch (error) {
          status.textContent = `No pudimos enviar tus datos. Vuelve a intentarlo o escríbenos a ${content.brand.email}.`;
          status.className = "form-status error";
        } finally {
          if (button) {
            button.disabled = false;
            button.textContent = buttonLabel;
          }
        }
      });
    });
  }

  applyBrand();
  renderPrograms();
  setupProgramInterest();
  renderEvents();
  renderTestimonials();
  renderImpact();
  renderPeople();
  setupMenu();
  setupForms();
  if (location.hash) {
    window.addEventListener("load", () => {
      requestAnimationFrame(() => {
        const target = document.querySelector(location.hash);
        if (!target) return;
        const previousBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 78);
        document.documentElement.style.scrollBehavior = previousBehavior;
      });
    }, { once: true });
  }
})();
