"use client";

import { siteContent } from "@/lib/site-content";
import { track } from "@/lib/analytics";
import { useFormSubmission } from "@/lib/useFormSubmission";

const AUDIENCE_OPTIONS = [
  "Quiero aplicar tecnología a mi trabajo",
  "Tengo un proyecto o una idea",
  "Tengo un negocio",
  "Estoy buscando nuevas oportunidades profesionales",
  "Quiero aprender por interés personal"
];

// preselectedSlug se resuelve en el servidor (?programa= en app/page.js) para
// que el formulario se sirva completo en el HTML inicial, sin depender de
// useSearchParams ni de un límite de Suspense.
export default function ParticipantsForm({ preselectedSlug }) {
  const { errors, status, submitting, onSubmit } = useFormSubmission("participantes");

  // El formulario también permite manifestar interés antes de abrir una fecha.
  const offeredPrograms = siteContent.programs.filter((program) => program.statusKey === "open" || program.statusKey === "soon");
  const preselectedProgram = offeredPrograms.find((program) => program.slug === preselectedSlug);
  const submitLabel = preselectedProgram?.statusKey === "open" ? "Inscribirme" : "Quiero conocer los próximos programas";

  return (
    <form className="form-card" id="form-participantes" data-formulario="participantes" noValidate onSubmit={onSubmit}>
      <h3>Cuéntanos sobre tu objetivo</h3>
      <p className="form-intro">No necesitas experiencia técnica previa.</p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="p-nombre">Nombre *</label>
          <input id="p-nombre" name="nombre" autoComplete="name" required aria-invalid={errors.nombre ? "true" : undefined} />
          {errors.nombre && <span className="error-text">{errors.nombre}</span>}
        </div>
        <div className="field">
          <label htmlFor="p-correo">Correo *</label>
          <input
            id="p-correo"
            name="correo"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.correo ? "true" : undefined}
          />
          {errors.correo && <span className="error-text">{errors.correo}</span>}
        </div>
        <div className="field">
          <label htmlFor="p-telefono">WhatsApp *</label>
          <input
            id="p-telefono"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={errors.whatsapp ? "true" : undefined}
          />
          {errors.whatsapp && <span className="error-text">{errors.whatsapp}</span>}
        </div>
        <div className="field">
          <label htmlFor="p-ciudad">Ciudad *</label>
          <input
            id="p-ciudad"
            name="city"
            autoComplete="address-level2"
            required
            aria-invalid={errors.city ? "true" : undefined}
          />
          {errors.city && <span className="error-text">{errors.city}</span>}
        </div>
        <div className="field full">
          <label htmlFor="p-audience">¿Cuál de estas situaciones te representa mejor? *</label>
          <select id="p-audience" name="audience_type" required aria-invalid={errors.audience_type ? "true" : undefined}>
            <option value="">Selecciona una opción</option>
            {AUDIENCE_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {errors.audience_type && <span className="error-text">{errors.audience_type}</span>}
        </div>
        <div className="field full">
          <label htmlFor="p-programa">Programa de interés *</label>
          <select
            id="p-programa"
            name="program_interest"
            required
            defaultValue={preselectedProgram ? preselectedProgram.slug : ""}
            aria-invalid={errors.program_interest ? "true" : undefined}
            onChange={(event) => track("select_program", { programa: event.target.value })}
          >
            <option value="">Selecciona una opción</option>
            {offeredPrograms.map((program) => (
              <option key={program.slug} value={program.slug}>
                {program.name}
              </option>
            ))}
          </select>
          {errors.program_interest && <span className="error-text">{errors.program_interest}</span>}
        </div>
        <div className="field full">
          <label htmlFor="p-mensaje">¿Qué te gustaría crear o resolver? *</label>
          <textarea id="p-mensaje" name="use_case" required aria-invalid={errors.use_case ? "true" : undefined}></textarea>
          {errors.use_case && <span className="error-text">{errors.use_case}</span>}
        </div>
        <div className="field full">
          <label htmlFor="p-experiencia">
            Experiencia previa <span className="fine-print">(opcional)</span>
          </label>
          <input id="p-experiencia" name="experiencia_previa" placeholder="No necesitas experiencia para participar" />
        </div>
        <div className="field full consent-field">
          <label>
            <input name="consent" type="checkbox" value="Sí" required aria-invalid={errors.consent ? "true" : undefined} /> Acepto
            recibir información sobre programas y actividades de MAILE.
          </label>
          {errors.consent && <span className="error-text">{errors.consent}</span>}
        </div>
      </div>
      <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
        {submitting ? "Enviando…" : submitLabel}
      </button>
      <p className={`form-status${status.type ? ` ${status.type}` : ""}`} role="status" aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
