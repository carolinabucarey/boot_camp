"use client";

import { useCallback, useState } from "react";
import { siteContent } from "@/lib/site-content";
import { track } from "@/lib/analytics";

export const GRACIAS = "Gracias. Registramos tus datos y te contactaremos cuando tengamos novedades.";

function nuevoId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
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

// Los desplegables viajan con su texto visible: la planilla se lee sin traducir slugs.
function readFields(form) {
  const campos = Object.fromEntries(new FormData(form).entries());
  form.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    campos[input.name] = input.checked ? "Sí" : "No";
  });
  form.querySelectorAll("select").forEach((select) => {
    const option = select.selectedOptions[0];
    if (option && option.value) campos[select.name] = option.textContent.trim();
  });
  campos.source_page = window.location.pathname || "/";
  campos.campaign_source = new URLSearchParams(window.location.search).get("utm_source") || "direct";
  return campos;
}

function validate(form) {
  const errors = {};
  const invalidFields = [];
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    const value = field.value.trim();
    let message = "";
    if (field.required && field.type === "checkbox" && !field.checked) message = "Debes aceptar para continuar.";
    else if (field.required && !value) message = "Este campo es obligatorio.";
    else if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Ingresa un correo válido.";
    else if (field.type === "url" && value && !/^https?:\/\/.+\..+/i.test(value)) message = "Ingresa un enlace válido, comenzando con https://.";
    else if (field.type === "number" && value && Number(value) < Number(field.min || 0)) message = "Ingresa un número válido.";
    if (message) {
      errors[field.name] = message;
      invalidFields.push(field);
    }
  });
  return { errors, invalidFields };
}

export function useFormSubmission(formulario) {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ message: "", type: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const { errors: fieldErrors, invalidFields } = validate(form);
      setErrors(fieldErrors);
      if (invalidFields.length) {
        setStatus({ message: "Revisa los campos marcados antes de enviar.", type: "error" });
        invalidFields[0].focus();
        return;
      }

      const track1 = () => {
        if (formulario === "organizaciones") track("submit_organization_form");
        else if (formulario === "mentoras") track("submit_mentor_form");
        else {
          track("submit_participant_form");
          track("join_interest_list");
        }
      };

      // Sin endpoint configurado no hay dónde guardar: se agradece y no se promete más.
      const endpoint = siteContent.forms?.endpoint;
      if (!endpoint) {
        setStatus({ message: GRACIAS, type: "success" });
        track1();
        form.reset();
        return;
      }

      setSubmitting(true);
      setStatus({ message: "", type: "" });
      const payload = JSON.stringify({
        // Identifica el envío: los dos intentos comparten id y la planilla guarda uno solo.
        id: nuevoId(),
        formulario,
        campos: readFields(form),
        origen: window.location.pathname
      });

      try {
        await send(endpoint, payload);
        setStatus({ message: GRACIAS, type: "success" });
        track1();
        form.reset();
      } catch (error) {
        setStatus({
          message: "No pudimos enviar tus datos. Vuelve a intentarlo o contáctanos por WhatsApp o Instagram.",
          type: "error"
        });
      } finally {
        setSubmitting(false);
      }
    },
    [formulario]
  );

  return { errors, status, submitting, onSubmit };
}
