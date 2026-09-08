"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lanzador from "./Lanzador";
import Panel from "./Panel";
import { CLAVE_TOKEN, URL_ASISTENTE } from "./constantes";

const BASE = URL_ASISTENTE.replace(/\/+$/, "");

/*
 * El token viaja en la cabecera Authorization, no en una cookie httpOnly como
 * pide el §6: con la función en *.lambda-url.on.aws y el sitio en maile.cl la
 * cookie es de tercera parte y los navegadores la bloquean. Vuelve a ser
 * cookie cuando pongamos asistente.maile.cl delante.
 */
function leerToken() {
  try {
    return window.localStorage.getItem(CLAVE_TOKEN) ?? "";
  } catch {
    return "";
  }
}

export default function Asistente() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [token, setToken] = useState("");
  const [conversacionId, setConversacionId] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [entrada, setEntrada] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setToken(leerToken());
    /* Un identificador por sesión de navegador. No dice quién es: solo permite
     * agrupar los turnos de una misma conversación y colgarles el feedback. */
    setConversacionId(crypto.randomUUID());
  }, []);

  /* Esc cierra, esté donde esté el foco dentro del panel. */
  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (evento) => {
      if (evento.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  }, [abierto]);

  const entrar = useCallback(async (codigo) => {
    setEnviando(true);
    setError("");
    try {
      const respuesta = await fetch(`${BASE}/acceso`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ codigo })
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.mensaje ?? "Ese código no es válido o ya venció.");
        return;
      }

      try {
        window.localStorage.setItem(CLAVE_TOKEN, datos.token);
      } catch {
        /* Navegación privada: la sesión dura lo que dure la pestaña. */
      }
      setToken(datos.token);
    } catch {
      setError("No pude conectarme. Vuelve a intentar en un momento.");
    } finally {
      setEnviando(false);
    }
  }, []);

  /*
   * Canje por URL: el link que llega por WhatsApp trae el código de la
   * cohorte. Se canjea solo, se abre el panel y el parámetro se borra de la
   * barra de direcciones — para que no viaje en capturas, en el historial ni
   * en la cabecera Referer hacia terceros.
   */
  useEffect(() => {
    if (typeof window === "undefined" || leerToken()) return;

    const parametros = new URLSearchParams(window.location.search);
    const codigo = parametros.get("asistente");
    if (!codigo) return;

    parametros.delete("asistente");
    const consulta = parametros.toString();
    window.history.replaceState(
      {},
      "",
      window.location.pathname + (consulta ? `?${consulta}` : "") + window.location.hash
    );

    setAbierto(true);
    entrar(codigo);
  }, [entrar]);

  const enviar = useCallback(async () => {
    const texto = entrada.trim();
    if (!texto || enviando) return;

    const conMensaje = [...mensajes, { role: "user", content: texto }];
    setMensajes(conMensaje);
    setEntrada("");
    setEnviando(true);
    setError("");

    try {
      const respuesta = await fetch(`${BASE}/chat`, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ mensajes: conMensaje, conversacionId })
      });

      /* Límite alcanzado: el servidor manda el texto exacto, con cuándo se
       * puede volver. No lo reescribimos acá. */
      if (respuesta.status === 429) {
        const datos = await respuesta.json().catch(() => ({}));
        setError(datos.mensaje ?? "Llegaste al máximo de consultas por ahora.");
        return;
      }

      if (respuesta.status === 401) {
        try {
          window.localStorage.removeItem(CLAVE_TOKEN);
        } catch {}
        setToken("");
        setError("Tu acceso venció. Vuelve a ingresar el código del taller.");
        return;
      }

      if (!respuesta.ok || !respuesta.body) {
        throw new Error("respuesta sin cuerpo");
      }

      /* Se va pintando a medida que llega: la alumna ve el texto aparecer. */
      const lector = respuesta.body.getReader();
      const decodificador = new TextDecoder();
      let acumulado = "";

      setMensajes([...conMensaje, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await lector.read();
        if (done) break;
        acumulado += decodificador.decode(value, { stream: true });
        setMensajes([...conMensaje, { role: "assistant", content: acumulado }]);
      }
    } catch {
      setMensajes(conMensaje);
      setError("No pude conectarme. Vuelve a intentar en un momento.");
    } finally {
      setEnviando(false);
    }
  }, [entrada, enviando, mensajes, token, conversacionId]);

  /* El feedback viaja aparte y en silencio: si falla, la alumna no tiene por
   * qué enterarse ni por qué reintentar. */
  const enviarFeedback = useCallback(
    ({ turno, util, comentario }) => {
      if (!conversacionId) return;
      fetch(`${BASE}/feedback`, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ conversacionId, turno, util, comentario })
      }).catch(() => {});
    },
    [conversacionId, token]
  );

  /* Sin dirección configurada el widget no se monta: mejor que un botón que
   * no lleva a ninguna parte. Y en /admin tampoco: ahí se mira el uso del
   * asistente, no se conversa con él. */
  if (!BASE || ruta?.startsWith("/admin")) return null;

  return (
    <>
      {!abierto && <Lanzador onAbrir={() => setAbierto(true)} />}
      {abierto && (
        <Panel
          mensajes={mensajes}
          entrada={entrada}
          onCambiarEntrada={setEntrada}
          onEnviar={enviar}
          onCerrar={() => setAbierto(false)}
          onEntrar={entrar}
          onFeedback={enviarFeedback}
          conAcceso={Boolean(token)}
          enviando={enviando}
          error={error}
        />
      )}
    </>
  );
}
