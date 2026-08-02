(function () {
  "use strict";

  const content = window.SITE_CONTENT;
  if (!content) return;

  const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;"
  })[character]);

  function applyBrand() {
    const { brand } = content;
    document.title = document.title.replaceAll("[NOMBRE]", brand.name);
    document.querySelectorAll('meta[content*="[NOMBRE]"]').forEach((meta) => {
      meta.content = meta.content.replaceAll("[NOMBRE]", brand.name);
    });
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = `${brand.siteUrl}${location.pathname === "/" ? "/" : location.pathname}`;
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = `${brand.siteUrl}${location.pathname === "/" ? "/" : location.pathname}`;
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.content = `${brand.siteUrl}/assets/og-social.png`;
    document.querySelectorAll("[data-brand]").forEach((element) => {
      const dot = element.querySelector("span") ? "<span>.</span>" : "";
      element.innerHTML = `${escapeHTML(brand.name)}${dot}`;
    });
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
          <h3>${escapeHTML(program.name)}</h3>
          <p>${escapeHTML(program.description)}</p>
          <div class="result"><small>Resultado</small><strong>${escapeHTML(program.result)}</strong></div>
          <a class="btn btn-secondary btn-arrow" href="${escapeHTML(program.href)}">${program.slug === "crea-tu-primera-web-con-ia" ? "Ver programa" : escapeHTML(program.action)}</a>
        </div>
      </article>`).join("");

    const programSelect = document.querySelector("#p-programa");
    if (programSelect) {
      programSelect.insertAdjacentHTML("beforeend", content.programs.map((program) => `<option value="${escapeHTML(program.slug)}">${escapeHTML(program.name)}</option>`).join(""));
      programSelect.insertAdjacentHTML("beforeend", '<option value="mentora">Sumarme como profesora o mentora</option><option value="otro">Otro interés</option>');
    }
  }

  function renderEvents() {
    const list = document.querySelector("#event-list");
    if (!list) return;
    if (!content.events.length) {
      list.innerHTML = `
        <div class="empty-state">
          <div><h3>Estamos preparando nuevas experiencias presenciales.</h3><p>Déjanos tus datos y te avisaremos cuando abramos la próxima convocatoria.</p></div>
          <a class="btn btn-primary" href="#contacto">Quiero recibir las próximas fechas</a>
        </div>`;
      return;
    }
    list.className = "event-list";
    list.innerHTML = content.events.map((event) => `
      <article class="event-card">
        <div><strong>${escapeHTML(event.date)}</strong><br><span>${escapeHTML(event.time)}</span></div>
        <div><p class="eyebrow">${escapeHTML(event.topic)}</p><h3>${escapeHTML(event.title)}</h3><p>${escapeHTML(event.city)} · ${escapeHTML(event.host)}</p><p>${escapeHTML(event.facilitators.join(", "))} · ${escapeHTML(event.capacity)} cupos · ${escapeHTML(event.cost)} · ${escapeHTML(event.registrationStatus)}</p></div>
        <a class="btn btn-primary" href="${escapeHTML(event.href)}">${escapeHTML(event.action)}</a>
      </article>`).join("");
  }

  function renderImpact() {
    const list = document.querySelector("#impact-list");
    if (!list) return;
    list.innerHTML = content.impactIndicators.map((indicator) => `
      <article class="impact-card"><span class="impact-value">${escapeHTML(indicator.value)}</span><span class="impact-label">${escapeHTML(indicator.label)}</span></article>`).join("");
  }

  function renderPeople() {
    const list = document.querySelector("#people-list");
    if (!list) return;
    list.innerHTML = content.people.map((person) => `
      <article class="person-card">
        <div class="person-visual">${person.image ? `<img src="${escapeHTML(person.image)}" alt="${escapeHTML(person.imageAlt)}" loading="lazy">` : `<span aria-label="Perfil de ${escapeHTML(person.name)}">${escapeHTML(person.initials)}</span>`}</div>
        <div class="person-body">
          <h3>${escapeHTML(person.name)}</h3>
          <p class="person-role">${escapeHTML(person.role)}</p>
          <p class="person-specialty">${escapeHTML(person.specialty)}</p>
          <p class="person-bio">${escapeHTML(person.bio)}</p>
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

  function setupForms() {
    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = form.querySelector(".form-status");
        const invalidFields = validateForm(form);
        if (invalidFields.length) {
          status.textContent = "Revisa los campos marcados antes de enviar.";
          status.className = "form-status error";
          invalidFields[0].focus();
          return;
        }
        status.textContent = "Gracias. Registramos tus datos y te contactaremos cuando tengamos novedades.";
        status.className = "form-status success";
        form.reset();
      });
    });
  }

  applyBrand();
  renderPrograms();
  renderEvents();
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
