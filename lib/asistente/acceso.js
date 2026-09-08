/*
 * Códigos de cohorte y tokens de sesión.
 *
 * Sin base de datos: los códigos viven en una variable de entorno (en Lambda,
 * poblada desde Parameter Store cifrado). Como contexto.js, este módulo no
 * importa nada de Next ni del handler.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

/* {"MAILE-AG26": "2026-11-07"} — código a fecha de expiración. */
export function leerCodigos(crudo = process.env.CODIGOS_COHORTE) {
  if (!crudo) return {};
  try {
    const codigos = JSON.parse(crudo);
    return Object.fromEntries(
      Object.entries(codigos).map(([codigo, expira]) => [normalizar(codigo), expira])
    );
  } catch {
    return {};
  }
}

function normalizar(codigo) {
  return String(codigo ?? "").trim().toUpperCase();
}

export function validarCodigo(codigo, { codigos = leerCodigos(), ahora = new Date() } = {}) {
  const clave = normalizar(codigo);
  const expira = codigos[clave];

  if (!expira) return { valido: false, motivo: "desconocido" };
  /* La fecha se interpreta como el final de ese día, para que un código que
   * expira "el 7" siga sirviendo durante todo el 7. */
  const limite = new Date(`${expira}T23:59:59Z`);
  if (Number.isNaN(limite.getTime())) return { valido: false, motivo: "desconocido" };
  if (ahora > limite) return { valido: false, motivo: "vencido", expira };

  return { valido: true, codigo: clave, expira };
}

function firmar(cuerpo, secreto) {
  return createHmac("sha256", secreto).update(cuerpo).digest("base64url");
}

export function emitirToken({ codigo, expira, secreto = process.env.TOKEN_SECRETO }) {
  if (!secreto) throw new Error("Falta TOKEN_SECRETO");
  const cuerpo = Buffer.from(JSON.stringify({ codigo: normalizar(codigo), expira })).toString("base64url");
  return `${cuerpo}.${firmar(cuerpo, secreto)}`;
}

export function verificarToken(token, { secreto = process.env.TOKEN_SECRETO, ahora = new Date() } = {}) {
  if (!secreto || typeof token !== "string") return { valido: false, motivo: "ausente" };

  const [cuerpo, firma] = token.split(".");
  if (!cuerpo || !firma) return { valido: false, motivo: "malformado" };

  const esperada = Buffer.from(firmar(cuerpo, secreto));
  const recibida = Buffer.from(firma);
  if (esperada.length !== recibida.length || !timingSafeEqual(esperada, recibida)) {
    return { valido: false, motivo: "firma" };
  }

  let datos;
  try {
    datos = JSON.parse(Buffer.from(cuerpo, "base64url").toString("utf8"));
  } catch {
    return { valido: false, motivo: "malformado" };
  }

  if (ahora > new Date(`${datos.expira}T23:59:59Z`)) return { valido: false, motivo: "vencido" };

  return { valido: true, codigo: datos.codigo, expira: datos.expira };
}
