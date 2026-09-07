"use client";

import { track } from "@/lib/analytics";
import { useFormSubmission } from "@/lib/useFormSubmission";

const ORGANIZATION_TYPES = [
  "Fundación u organización social",
  "Empresa",
  "Municipio u organismo territorial",
  "Institución educativa",
  "Comunidad o red",
  "Otra"
];

const PARTNERSHIP_TYPES = [
  "Capacitar a un equipo",
  "Financiar una cohorte para una comunidad",
  "Incorporar un módulo Maile a un programa",
  "Desarrollar una alianza",
  "Explorar una actividad conjunta"
];

export default function OrganizationsForm() {
  const { errors, status, submitting, onSubmit } = useFormSubmission("organizaciones");

  return (
    <form className="form-card" id="form-organizaciones" data-formulario="organizaciones" noValidate onSubmit={onSubmit}>
      <h3>Solicita una conversación</h3>
      <p className="form-intro">Los campos marcados con * son obligatorios.</p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="o-nombre">Nombre *</label>
          <input id="o-nombre" name="nombre" autoComplete="name" required aria-invalid={errors.nombre ? "true" : undefined} />
          {errors.nombre && <span className="error-text">{errors.nombre}</span>}
        </div>
        <div className="field">
          <label htmlFor="o-organizacion">Organización *</label>
          <input
            id="o-organizacion"
            name="organizacion"
            autoComplete="organization"
            required
            aria-invalid={errors.organizacion ? "true" : undefined}
          />
          {errors.organizacion && <span className="error-text">{errors.organizacion}</span>}
        </div>
        <div className="field">
          <label htmlFor="o-cargo">Cargo *</label>
          <input
            id="o-cargo"
            name="cargo"
            autoComplete="organization-title"
            required
            aria-invalid={errors.cargo ? "true" : undefined}
          />
          {errors.cargo && <span className="error-text">{errors.cargo}</span>}
        </div>
        <div className="field">
          <label htmlFor="o-correo">Correo institucional *</label>
          <input
            id="o-correo"
            name="correo_institucional"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.correo_institucional ? "true" : undefined}
          />
          {errors.correo_institucional && <span className="error-text">{errors.correo_institucional}</span>}
        </div>
        <div className="field">
          <label htmlFor="o-telefono">
            Teléfono <span className="fine-print">(opcional)</span>
          </label>
          <input id="o-telefono" name="telefono" type="tel" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="o-tipo">Tipo de organización *</label>
          <select id="o-tipo" name="organization_type" required aria-invalid={errors.organization_type ? "true" : undefined}>
            <option value="">Selecciona</option>
            {ORGANIZATION_TYPES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {errors.organization_type && <span className="error-text">{errors.organization_type}</span>}
        </div>
        <div className="field full">
          <label htmlFor="o-ciudad">Ciudad o territorio *</label>
          <input
            id="o-ciudad"
            name="city"
            autoComplete="address-level2"
            required
            aria-invalid={errors.city ? "true" : undefined}
          />
          {errors.city && <span className="error-text">{errors.city}</span>}
        </div>
        <div className="field full">
          <label htmlFor="o-busca">¿Qué buscas? *</label>
          <select
            id="o-busca"
            name="partnership_type"
            required
            aria-invalid={errors.partnership_type ? "true" : undefined}
            onChange={(event) => track("select_partnership_type", { tipo_colaboracion: event.target.value })}
          >
            <option value="">Selecciona</option>
            {PARTNERSHIP_TYPES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {errors.partnership_type && <span className="error-text">{errors.partnership_type}</span>}
        </div>
        <div className="field full">
          <label htmlFor="o-publico">Público al que espera llegar *</label>
          <textarea id="o-publico" name="publico_objetivo" required aria-invalid={errors.publico_objetivo ? "true" : undefined}></textarea>
          {errors.publico_objetivo && <span className="error-text">{errors.publico_objetivo}</span>}
        </div>
        <div className="field">
          <label htmlFor="o-participantes">N.º aproximado de participantes *</label>
          <input
            id="o-participantes"
            name="participantes"
            type="number"
            min="1"
            inputMode="numeric"
            required
            aria-invalid={errors.participantes ? "true" : undefined}
          />
          {errors.participantes && <span className="error-text">{errors.participantes}</span>}
        </div>
        <div className="field">
          <label htmlFor="o-fecha">
            Fecha tentativa <span className="fine-print">(opcional)</span>
          </label>
          <input id="o-fecha" name="fecha_tentativa" type="text" placeholder="Mes o período estimado" />
        </div>
        <div className="field full">
          <label htmlFor="o-desafio">Desafío u objetivo *</label>
          <textarea id="o-desafio" name="desafio_objetivo" required aria-invalid={errors.desafio_objetivo ? "true" : undefined}></textarea>
          {errors.desafio_objetivo && <span className="error-text">{errors.desafio_objetivo}</span>}
        </div>
        <div className="field full">
          <label htmlFor="o-presupuesto">
            Presupuesto o vía de financiamiento <span className="fine-print">(opcional)</span>
          </label>
          <input id="o-presupuesto" name="presupuesto_financiamiento" />
        </div>
      </div>
      <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
        {submitting ? "Enviando…" : "Solicitar una conversación"}
      </button>
      <p className={`form-status${status.type ? ` ${status.type}` : ""}`} role="status" aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
