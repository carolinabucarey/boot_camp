"use client";

import { useFormSubmission } from "@/lib/useFormSubmission";

const CONTRIBUTION_OPTIONS = [
  "Facilitar un taller o una sesión",
  "Acompañar como mentora",
  "Compartir una charla o caso",
  "Diseñar contenidos o experiencias",
  "Conectar oportunidades o alianzas",
  "Otra forma de colaboración"
];

export default function MentorsForm() {
  const { errors, status, submitting, onSubmit } = useFormSubmission("mentoras");

  return (
    <form className="form-card" id="form-mentoras" data-formulario="mentoras" noValidate onSubmit={onSubmit}>
      <h3>Quiero sumarme a la red</h3>
      <p className="form-intro">Los campos marcados con * son obligatorios.</p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="m-nombre">Nombre *</label>
          <input id="m-nombre" name="nombre" autoComplete="name" required aria-invalid={errors.nombre ? "true" : undefined} />
          {errors.nombre && <span className="error-text">{errors.nombre}</span>}
        </div>
        <div className="field">
          <label htmlFor="m-correo">Correo *</label>
          <input
            id="m-correo"
            name="correo"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.correo ? "true" : undefined}
          />
          {errors.correo && <span className="error-text">{errors.correo}</span>}
        </div>
        <div className="field">
          <label htmlFor="m-whatsapp">
            WhatsApp <span className="fine-print">(opcional)</span>
          </label>
          <input id="m-whatsapp" name="whatsapp" type="tel" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="m-ubicacion">Ciudad y país *</label>
          <input
            id="m-ubicacion"
            name="ubicacion"
            autoComplete="address-level2"
            required
            aria-invalid={errors.ubicacion ? "true" : undefined}
          />
          {errors.ubicacion && <span className="error-text">{errors.ubicacion}</span>}
        </div>
        <div className="field full">
          <label htmlFor="m-perfil">
            LinkedIn, portafolio o sitio web <span className="fine-print">(opcional)</span>
          </label>
          <input id="m-perfil" name="perfil_profesional" type="url" autoComplete="url" placeholder="https://" />
        </div>
        <div className="field full">
          <label htmlFor="m-experiencia">¿En qué áreas tienes experiencia? *</label>
          <input
            id="m-experiencia"
            name="areas_experiencia"
            required
            placeholder="Tecnología, negocios, comunicación, desarrollo profesional…"
            aria-invalid={errors.areas_experiencia ? "true" : undefined}
          />
          {errors.areas_experiencia && <span className="error-text">{errors.areas_experiencia}</span>}
        </div>
        <div className="field full">
          <label htmlFor="m-trayectoria">Cuéntanos brevemente sobre tu trayectoria *</label>
          <textarea
            id="m-trayectoria"
            name="trayectoria"
            required
            aria-invalid={errors.trayectoria ? "true" : undefined}
          ></textarea>
          {errors.trayectoria && <span className="error-text">{errors.trayectoria}</span>}
        </div>
        <div className="field full">
          <label htmlFor="m-aporte">¿Cómo te gustaría aportar? *</label>
          <select id="m-aporte" name="forma_de_aporte" required aria-invalid={errors.forma_de_aporte ? "true" : undefined}>
            <option value="">Selecciona una opción</option>
            {CONTRIBUTION_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {errors.forma_de_aporte && <span className="error-text">{errors.forma_de_aporte}</span>}
        </div>
        <div className="field full">
          <label htmlFor="m-disponibilidad">
            Disponibilidad aproximada <span className="fine-print">(opcional)</span>
          </label>
          <input id="m-disponibilidad" name="disponibilidad" placeholder="Por ejemplo: dos horas al mes, tardes, fines de semana" />
        </div>
        <div className="field full">
          <label htmlFor="m-motivacion">¿Por qué te gustaría ser parte de Maile? *</label>
          <textarea
            id="m-motivacion"
            name="motivacion"
            required
            aria-invalid={errors.motivacion ? "true" : undefined}
          ></textarea>
          {errors.motivacion && <span className="error-text">{errors.motivacion}</span>}
        </div>
        <div className="field full consent-field">
          <label>
            <input name="consent" type="checkbox" value="Sí" required aria-invalid={errors.consent ? "true" : undefined} />
            Acepto que Maile use estos datos para evaluar mi incorporación a la red y contactarme.
          </label>
          {errors.consent && <span className="error-text">{errors.consent}</span>}
        </div>
      </div>
      <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
        {submitting ? "Enviando…" : "Enviar mi postulación"}
      </button>
      <p className={`form-status${status.type ? ` ${status.type}` : ""}`} role="status" aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
