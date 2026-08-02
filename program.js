(function () {
  "use strict";
  const program = window.SITE_CONTENT?.programs.find((item) => item.slug === "crea-tu-primera-web-con-ia");
  if (!program) return;
  const setText = (selector, value) => document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });
  const renderList = (selector, values) => {
    const list = document.querySelector(selector);
    if (list) list.innerHTML = values.map((value) => `<li>${value}</li>`).join("");
  };
  setText("[data-program-name]", program.name);
  setText("[data-modality]", program.modality);
  setText("[data-level]", program.level);
  setText("[data-duration]", program.duration);
  setText("[data-result]", program.result);
  setText("[data-audience]", program.audience);
  setText("[data-methodology]", program.methodology);
  setText("[data-next-date]", program.nextDate);
  renderList("#learn-list", program.learn);
  renderList("#teacher-list", program.teachers);
  renderList("#requirement-list", program.requirements);
  const faqList = document.querySelector("#faq-list");
  if (faqList) faqList.innerHTML = program.faqs.map((faq) => `<details class="faq"><summary>${faq.question}</summary><p>${faq.answer}</p></details>`).join("");
})();
