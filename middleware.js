import { NextResponse } from "next/server";

/*
 * /admin queda detrás de una clave y fuera de los buscadores. Sin clave
 * configurada la ruta se apaga: prefiero que no funcione a que quede abierta.
 */
export const config = { matcher: "/admin/:path*" };

const PEDIR_CLAVE = {
  status: 401,
  headers: {
    "WWW-Authenticate": 'Basic realm="Maile", charset="UTF-8"',
    "x-robots-tag": "noindex, nofollow"
  }
};

/* Comparación sin cortocircuito. En el runtime de middleware no hay
 * node:crypto, así que se hace a mano. */
function iguales(a, b) {
  if (a.length !== b.length) return false;
  let diferencia = 0;
  for (let i = 0; i < a.length; i += 1) diferencia |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diferencia === 0;
}

export function middleware(peticion) {
  const clave = process.env.ASISTENTE_ADMIN_CLAVE;
  if (!clave) {
    return new NextResponse("La vista de administración no está configurada.", {
      status: 503,
      headers: { "x-robots-tag": "noindex, nofollow" }
    });
  }

  const cabecera = peticion.headers.get("authorization") ?? "";
  if (!cabecera.startsWith("Basic ")) return new NextResponse(null, PEDIR_CLAVE);

  let usuario = "";
  let entregada = "";
  try {
    [usuario, entregada] = atob(cabecera.slice(6)).split(":");
  } catch {
    return new NextResponse(null, PEDIR_CLAVE);
  }

  if (usuario !== "maile" || !iguales(entregada ?? "", clave)) {
    return new NextResponse(null, PEDIR_CLAVE);
  }

  const respuesta = NextResponse.next();
  respuesta.headers.set("x-robots-tag", "noindex, nofollow");
  return respuesta;
}
