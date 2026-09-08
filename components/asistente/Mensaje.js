"use client";

import { useState } from "react";
import Image from "next/image";
import Markdown from "./Markdown";
import { AVATARES } from "./constantes";

/*
 * El primer mensaje del hilo lleva la etiqueta «Asistente de Maile» junto al
 * avatar. Es obligatorio: el rostro es el de Carolina y sin la etiqueta una
 * alumna razonablemente asume que le escribe ella y espera una respuesta
 * personal.
 */
export default function Mensaje({ rol, texto, primero, turno, onFeedback }) {
  const [dado, setDado] = useState(null);
  const [comentario, setComentario] = useState("");
  const [pidiendoDetalle, setPidiendoDetalle] = useState(false);

  if (rol === "user") {
    return (
      <div className="asistente-turno asistente-turno--alumna">
        <p className="asistente-burbuja asistente-burbuja--alumna">{texto}</p>
      </div>
    );
  }

  const responder = (util) => {
    setDado(util);
    if (util) {
      onFeedback?.({ turno, util: true });
    } else {
      setPidiendoDetalle(true);
      onFeedback?.({ turno, util: false });
    }
  };

  return (
    <div className="asistente-turno">
      <Image
        className="asistente-avatar-mensaje"
        src={AVATARES.mensaje}
        alt=""
        width={32}
        height={32}
        aria-hidden="true"
      />
      <div className="asistente-columna">
        {primero && <p className="asistente-firma">Asistente de Maile</p>}
        <div className="asistente-burbuja asistente-burbuja--asistente">
          <Markdown texto={texto} />
        </div>

        {onFeedback && texto && (
          <div className="asistente-feedback">
            {dado === null ? (
              <>
                <span className="asistente-feedback-pregunta">¿Te sirvió?</span>
                <button type="button" onClick={() => responder(true)}>Sí</button>
                <button type="button" onClick={() => responder(false)}>No</button>
              </>
            ) : pidiendoDetalle ? (
              <form
                className="asistente-feedback-detalle"
                onSubmit={(evento) => {
                  evento.preventDefault();
                  onFeedback({ turno, util: false, comentario });
                  setPidiendoDetalle(false);
                }}
              >
                <input
                  value={comentario}
                  onChange={(evento) => setComentario(evento.target.value)}
                  placeholder="¿Qué te faltó? (opcional)"
                  aria-label="Qué te faltó"
                />
                <button type="submit">Enviar</button>
              </form>
            ) : (
              <span className="asistente-feedback-pregunta">Gracias, lo anoto.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
