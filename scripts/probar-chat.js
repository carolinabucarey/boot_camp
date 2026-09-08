#!/usr/bin/env node
/*
 * El asistente desde la terminal, sin interfaz. Paso 3 del orden de trabajo:
 * sirve para ajustar la voz y comprobar que acompaña en vez de resolver, antes
 * de invertir una línea en el widget.
 *
 *   ANTHROPIC_API_KEY=... node scripts/probar-chat.js
 *
 * Comandos: /salir, /nuevo (empieza otra conversación), /uso (tokens y costo).
 */
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { responder, crearProveedor } from "../lib/asistente/chat.js";
import { armarContexto, estimarTokens } from "../lib/asistente/contexto.js";

/* Tarifas de Haiku 4.5 por millón de tokens. Verificar en
 * https://docs.claude.com/en/docs/about-claude/pricing antes de presupuestar. */
const TARIFA = { entrada: 1, salida: 5, cacheLectura: 0.1, cacheEscritura: 1.25 };

function costo(uso) {
  if (!uso) return 0;
  return (
    ((uso.input_tokens ?? 0) * TARIFA.entrada +
      (uso.output_tokens ?? 0) * TARIFA.salida +
      (uso.cache_read_input_tokens ?? 0) * TARIFA.cacheLectura +
      (uso.cache_creation_input_tokens ?? 0) * TARIFA.cacheEscritura) / 1e6
  );
}

const proveedor = crearProveedor();
const rl = createInterface({ input: stdin, output: stdout });

let mensajes = [];
const acumulado = { costo: 0, turnos: 0, lecturasDeCache: 0 };

console.log(`Asistente de Maile · ${proveedor.modelo} vía ${proveedor.nombre}`);
console.log(`Material: ~${estimarTokens(armarContexto())} tokens en el bloque de sistema.`);
console.log("Escribe /salir para terminar, /nuevo para empezar otra conversación.\n");

while (true) {
  const entrada = (await rl.question("\x1b[35mtú ›\x1b[0m ")).trim();
  if (!entrada) continue;

  if (entrada === "/salir") break;
  if (entrada === "/nuevo") {
    mensajes = [];
    console.log("— conversación nueva —\n");
    continue;
  }
  if (entrada === "/uso") {
    console.log(
      `\n${acumulado.turnos} turnos · USD ${acumulado.costo.toFixed(4)} · ` +
        `${acumulado.lecturasDeCache} turnos servidos desde caché\n`
    );
    continue;
  }

  mensajes.push({ role: "user", content: entrada });
  stdout.write("\x1b[36masistente ›\x1b[0m ");

  let respuesta = "";
  try {
    for await (const evento of responder({ mensajes, proveedor })) {
      if (evento.tipo === "texto") {
        respuesta += evento.texto;
        stdout.write(evento.texto);
      } else if (evento.tipo === "fin") {
        acumulado.turnos += 1;
        acumulado.costo += costo(evento.uso);
        if ((evento.uso?.cache_read_input_tokens ?? 0) > 0) acumulado.lecturasDeCache += 1;

        const marcas = [];
        if (evento.sinRespuesta) marcas.push("SIN RESPUESTA");
        if (evento.temas.length) marcas.push(`temas: ${evento.temas.join(", ")}`);
        marcas.push(`USD ${costo(evento.uso).toFixed(4)}`);
        console.log(`\n\x1b[90m[${marcas.join(" · ")}]\x1b[0m\n`);
      }
    }
    mensajes.push({ role: "assistant", content: respuesta });
  } catch (error) {
    console.log(`\n\x1b[31mError: ${error.message}\x1b[0m\n`);
    mensajes.pop();
  }
}

rl.close();
console.log(`\n${acumulado.turnos} turnos · USD ${acumulado.costo.toFixed(4)} en total.`);
