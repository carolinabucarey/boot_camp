"use client";

import { useState } from "react";
import Link from "next/link";

/*
 * Sin código no se llama al modelo (criterio de aceptación 2). El panel
 * muestra un estado de invitación: qué es el asistente, quién accede y un
 * enlace a los programas.
 */
export default function AccesoCodigo({ onEntrar, enviando, error }) {
  const [codigo, setCodigo] = useState("");

  return (
    <div className="asistente-acceso">
      <p className="asistente-acceso-intro">
        Este asistente acompaña a quienes participaron en un taller de Maile.
        Tiene el material del taller y está para las dudas que aparecen cuando
        trabajas sola.
      </p>
      <p className="asistente-acceso-intro">
        Si estuviste en uno, tu código llegó al cerrar el taller.
      </p>

      <form
        className="asistente-acceso-forma"
        onSubmit={(evento) => {
          evento.preventDefault();
          if (codigo.trim()) onEntrar(codigo.trim());
        }}
      >
        <label className="asistente-acceso-etiqueta" htmlFor="asistente-codigo">
          Código del taller
        </label>
        <input
          id="asistente-codigo"
          className="asistente-acceso-campo"
          value={codigo}
          onChange={(evento) => setCodigo(evento.target.value)}
          placeholder="MAILE-XX00"
          autoComplete="off"
          spellCheck="false"
          disabled={enviando}
        />
        <button type="submit" className="asistente-acceso-boton" disabled={enviando || !codigo.trim()}>
          {enviando ? "Comprobando…" : "Entrar"}
        </button>
      </form>

      {error && (
        <p className="asistente-error" role="alert">
          {error}
        </p>
      )}

      <p className="asistente-acceso-pie">
        ¿Todavía no participaste? <Link href="/#programas">Mira los programas</Link>.
      </p>
    </div>
  );
}
