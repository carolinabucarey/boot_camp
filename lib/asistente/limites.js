/*
 * Límites de uso (§7 y §10).
 *
 * Tres frenos, con propósitos distintos:
 *
 *   - Por código y día: el que de verdad protege el gasto. Si el link se
 *     filtra, el techo del día ya está puesto.
 *   - Por IP y hora: frena un script antes de que agote la cuota del día
 *     entera y deje a la cohorte sin asistente.
 *   - Por sesión: una barandilla, no un control. Se reinicia si la alumna
 *     recarga la página, y está bien que así sea: existe para cortar un bucle
 *     accidental, no para contener a alguien que quiere pasarse.
 *
 * La decisión es una función pura y se prueba sin infraestructura. Los
 * contadores viven en la misma tabla del registro, con TTL.
 */
import { createHmac } from "node:crypto";

export const LIMITES = {
  porSesion: 30,
  porCodigoAlDia: 100,
  porIpPorHora: 40
};

/* Las alumnas están en Chile: el día se corta cuando allá cambia la fecha, no
 * a medianoche UTC. */
export function fechaLocal(ahora = new Date(), zona = "America/Santiago") {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: zona,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(ahora);
}

export function horaLocal(ahora = new Date(), zona = "America/Santiago") {
  const hora = new Intl.DateTimeFormat("en-CA", {
    timeZone: zona,
    hour: "2-digit",
    hour12: false
  }).format(ahora);
  return `${fechaLocal(ahora, zona)}T${hora}`;
}

/* Nunca guardamos la IP: solo un hash con el mismo secreto que firma los
 * tokens. Sirve para contar y no para identificar. */
export function huellaDeIp(ip, secreto) {
  if (!ip || !secreto) return "";
  return createHmac("sha256", secreto).update(String(ip)).digest("hex").slice(0, 32);
}

export function evaluarConteos({ sesion = 0, codigoDia = 0, ipHora = 0 }, limites = LIMITES) {
  if (codigoDia > limites.porCodigoAlDia) return { permitido: false, motivo: "codigo-dia" };
  if (ipHora > limites.porIpPorHora) return { permitido: false, motivo: "ip-hora" };
  if (sesion > limites.porSesion) return { permitido: false, motivo: "sesion" };
  return { permitido: true };
}

/*
 * El mensaje dice qué pasó y cuándo se puede volver, no una disculpa vaga.
 * El canal de contacto entra por parámetro para no acoplar esto al sitio.
 */
export function mensajeDeLimite(motivo, { contacto = "" } = {}) {
  const donde = contacto ? ` Si necesitas algo antes, escríbele a Maile por ${contacto}.` : "";

  if (motivo === "codigo-dia") {
    return (
      "El asistente llegó al máximo de consultas del día para tu taller. " +
      `Vuelve mañana y sigue donde quedaste.${donde}`
    );
  }
  if (motivo === "ip-hora") {
    return (
      "Llegaste al máximo de consultas por hora desde esta conexión. " +
      `Prueba de nuevo en un rato.${donde}`
    );
  }
  return (
    "Esta conversación llegó a los 30 mensajes. Recarga la página para empezar " +
    `una nueva y sigue trabajando.${donde}`
  );
}
