#!/usr/bin/env node
/*
 * Imitación del endpoint del asistente, para trabajar la interfaz sin gastar
 * llamadas al modelo ni depender del despliegue.
 *
 *   node scripts/mock-asistente.js
 *   NEXT_PUBLIC_ASISTENTE_URL=http://localhost:3100 npm run dev
 *
 * Acepta cualquier código que empiece con MAILE-.
 */
import { createServer } from "node:http";

const PUERTO = Number(process.env.PUERTO_MOCK ?? 3100);

/* Con markdown a propósito: es lo que devuelve el modelo de verdad. */
const RESPUESTA = `Revisa en **este orden**:

1. ¿El cambio llegó a la rama de producción? Publicar no es guardar el archivo: es que el cambio llegue a \`main\`.
2. ¿Estás mirando la dirección correcta? Cada rama recibe su propia dirección temporal.
3. ¿Terminó el despliegue?

Si nada de eso calza, escríbeles por https://wa.me/56990195787 y te ayudamos.

¿En cuál de las tres te quedaste?`;

createServer(async (peticion, respuesta) => {
  const cabeceras = {
    "access-control-allow-origin": peticion.headers.origin ?? "*",
    "access-control-allow-headers": "content-type, authorization",
    "access-control-allow-methods": "POST, GET, OPTIONS",
    "access-control-allow-credentials": "true"
  };

  if (peticion.method === "OPTIONS") {
    respuesta.writeHead(204, cabeceras).end();
    return;
  }

  const cuerpo = await new Promise((listo) => {
    let crudo = "";
    peticion.on("data", (trozo) => (crudo += trozo));
    peticion.on("end", () => {
      try {
        listo(JSON.parse(crudo || "{}"));
      } catch {
        listo({});
      }
    });
  });

  if (peticion.url === "/acceso") {
    const valido = String(cuerpo.codigo ?? "").toUpperCase().startsWith("MAILE-");
    respuesta.writeHead(valido ? 200 : 403, { ...cabeceras, "content-type": "application/json" });
    respuesta.end(
      JSON.stringify(
        valido
          ? { token: "prueba.local", expira: "2026-12-31" }
          : { error: "codigo-invalido", mensaje: "Ese código no es válido o ya venció." }
      )
    );
    return;
  }

  if (peticion.url === "/chat" && process.env.MOCK_LIMITE === "1") {
    /* Para ejercitar el mensaje de límite sin esperar a gastar la cuota. */
    respuesta.writeHead(429, { ...cabeceras, "content-type": "application/json" });
    respuesta.end(
      JSON.stringify({
        error: "limite",
        motivo: "codigo-dia",
        mensaje:
          "El asistente llegó al máximo de consultas del día para tu taller. " +
          "Vuelve mañana y sigue donde quedaste. Si necesitas algo antes, escríbele a Maile por WhatsApp."
      })
    );
    return;
  }

  if (peticion.url === "/chat") {
    respuesta.writeHead(200, { ...cabeceras, "content-type": "text/plain; charset=utf-8" });
    /* Palabra por palabra, para ver el streaming como lo verá la alumna. */
    for (const palabra of RESPUESTA.split(" ")) {
      respuesta.write(palabra + " ");
      await new Promise((r) => setTimeout(r, 25));
    }
    respuesta.end();
    return;
  }

  if (peticion.url.startsWith("/admin")) {
    const { armarInforme } = await import("../lib/asistente/informe.js");
    const filas = [
      { sk: "conv-a#0001", creado: "2026-09-07T10:00:00Z", pregunta: "Hice un cambio y la página no cambió, ¿qué reviso?", respuesta: "Revisa la rama.", temas: ["vercel", "github"], sinRespuesta: false, util: true },
      { sk: "conv-a#0002", creado: "2026-09-07T10:06:00Z", pregunta: "¿Cuándo es la próxima cohorte?", respuesta: "Eso no lo tengo en el material del taller.", temas: [], sinRespuesta: true },
      { sk: "conv-b#0001", creado: "2026-09-06T18:00:00Z", pregunta: "¿Cómo conecto el dominio .cl?", respuesta: "Necesitas una cuenta en NIC Chile.", temas: ["dominio"], sinRespuesta: false, util: false, comentario: "Me faltó el paso de la transferencia" },
      { sk: "conv-c#0001", creado: "2026-08-31T09:00:00Z", pregunta: "¿Qué es un agente?", respuesta: "Razona, planifica y ejecuta.", temas: ["agente", "vercel"], sinRespuesta: false, util: true }
    ];
    respuesta.writeHead(200, { ...cabeceras, "content-type": "application/json" });
    respuesta.end(JSON.stringify({ cohorte: "MAILE-AG26", ...armarInforme(filas) }));
    return;
  }

  if (peticion.url === "/feedback") {
    console.log("feedback recibido:", JSON.stringify(cuerpo));
    respuesta.writeHead(200, { ...cabeceras, "content-type": "application/json" });
    respuesta.end(JSON.stringify({ gracias: true }));
    return;
  }

  respuesta.writeHead(404, cabeceras).end();
}).listen(PUERTO, () => console.log(`Asistente de prueba en http://localhost:${PUERTO}`));
