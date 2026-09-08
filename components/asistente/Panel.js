"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Mensaje from "./Mensaje";
import AccesoCodigo from "./AccesoCodigo";
import { AVATARES, BIENVENIDA, TALLER } from "./constantes";

export default function Panel({
  mensajes,
  entrada,
  onCambiarEntrada,
  onEnviar,
  onCerrar,
  onEntrar,
  onFeedback,
  conAcceso,
  enviando,
  error
}) {
  const hilo = useRef(null);
  const campo = useRef(null);

  /* Al abrir, el foco va al campo de texto: se puede escribir sin tocar nada. */
  useEffect(() => {
    if (conAcceso) campo.current?.focus();
  }, [conAcceso]);

  useEffect(() => {
    hilo.current?.scrollTo({ top: hilo.current.scrollHeight, behavior: "smooth" });
  }, [mensajes, enviando]);

  /* El turno debe coincidir con el que calcula el servidor: cuántos mensajes
   * de la alumna hubo hasta esa respuesta. */
  const turnoDe = (indice) =>
    mensajes.slice(0, indice + 1).filter((m) => m.role === "user").length;

  return (
    <section className="asistente-panel" role="dialog" aria-modal="false" aria-label="Asistente de Maile">
      <header className="asistente-encabezado">
        <Image
          className="asistente-avatar-encabezado"
          src={AVATARES.encabezado}
          alt=""
          width={40}
          height={40}
          aria-hidden="true"
        />
        <div>
          <p className="asistente-titulo">Asistente de Maile</p>
          <p className="asistente-estado">Material del taller {TALLER}</p>
        </div>
        <button type="button" className="asistente-cerrar" onClick={onCerrar} aria-label="Cerrar el asistente">
          <span aria-hidden="true">×</span>
        </button>
      </header>

      {!conAcceso ? (
        <div className="asistente-hilo">
          <AccesoCodigo onEntrar={onEntrar} enviando={enviando} error={error} />
        </div>
      ) : (
        <>
          <div className="asistente-hilo" ref={hilo} role="log" aria-live="polite" aria-label="Conversación">
            <Mensaje rol="assistant" texto={BIENVENIDA} primero />
            {mensajes.map((mensaje, i) => (
              <Mensaje
                key={i}
                rol={mensaje.role}
                texto={mensaje.content}
                turno={turnoDe(i)}
                onFeedback={
                  mensaje.role === "assistant" && !enviando ? onFeedback : undefined
                }
              />
            ))}
            {enviando && (
              <div className="asistente-turno">
                <span className="asistente-escribiendo" aria-label="Escribiendo">
                  <span />
                </span>
              </div>
            )}
            {error && (
              <p className="asistente-error" role="alert">
                {error}
              </p>
            )}
          </div>

          <form
            className="asistente-forma"
            onSubmit={(evento) => {
              evento.preventDefault();
              onEnviar();
            }}
          >
            <textarea
              ref={campo}
              className="asistente-campo"
              value={entrada}
              onChange={(evento) => onCambiarEntrada(evento.target.value)}
              onKeyDown={(evento) => {
                if (evento.key === "Enter" && !evento.shiftKey) {
                  evento.preventDefault();
                  onEnviar();
                }
              }}
              placeholder="¿En qué estás trabajando?"
              rows={1}
              aria-label="Tu mensaje"
            />
            <button
              type="submit"
              className="asistente-enviar"
              disabled={enviando || !entrada.trim()}
              aria-label="Enviar"
            >
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </>
      )}
    </section>
  );
}
