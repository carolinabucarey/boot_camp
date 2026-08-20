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
  setText("[data-audience]", program.audience);
  setText("[data-promise]", program.promise);
  setText("[data-methodology]", program.methodology);
  setText("[data-next-date]", program.nextDate);
  renderList("#learn-list", program.learn);
  renderList("#teacher-list", program.teachers);
  renderList("#requirement-list", program.requirements);

  const blockList = document.querySelector("#block-list");
  if (blockList && program.blocks) {
    blockList.innerHTML = program.blocks.map((block) => `
      <article class="block-card">
        <p class="block-label">${escapeHTML(block.label)} · ${escapeHTML(block.duration)}</p>
        <h3>${escapeHTML(block.title)}</h3>
        <p>${escapeHTML(block.description)}</p>
      </article>`).join("");
  }

  const identityList = document.querySelector("#identity-list");
  if (identityList && program.identityQuestions) {
    identityList.innerHTML = program.identityQuestions.map((item) => `
      <article class="identity-card">
        <span class="identity-side">${escapeHTML(item.side)}</span>
        <h3>${escapeHTML(item.question)}</h3>
        <p>${escapeHTML(item.answer)}</p>
      </article>`).join("");
  }

  const faqList = document.querySelector("#faq-list");
  if (faqList && program.faqs) {
    faqList.innerHTML = program.faqs.map((faq) => `<details class="faq"><summary>${escapeHTML(faq.question)}</summary><p>${escapeHTML(faq.answer)}</p></details>`).join("");
  }
})();
