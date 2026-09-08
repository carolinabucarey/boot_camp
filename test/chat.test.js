import { test } from "node:test";
import assert from "node:assert/strict";

import {
  MODELO_API,
  MODELO_BEDROCK,
  MAX_TURNOS_HISTORIAL,
  recortarHistorial,
  detectarTemas,
  marcarSinRespuesta
} from "../lib/asistente/chat.js";

test("usa el identificador vigente de Haiku 4.5, sin sufijo de fecha", () => {
  assert.equal(MODELO_API, "claude-haiku-4-5");
});

test("en Bedrock se invoca por perfil de inferencia us., con versión completa", () => {
  assert.equal(MODELO_BEDROCK, "us.anthropic.claude-haiku-4-5-20251001-v1:0");
});

test("recorta el historial a 20 turnos conservando los últimos", () => {
  const largo = Array.from({ length: 25 }, (_, i) => ({ role: "user", content: `m${i}` }));
  const recortado = recortarHistorial(largo);
  assert.equal(recortado.length, MAX_TURNOS_HISTORIAL);
  assert.equal(recortado.at(-1).content, "m24");
  assert.equal(recortado[0].content, "m5");
});

test("una conversación corta pasa entera", () => {
  const corto = [{ role: "user", content: "hola" }];
  assert.equal(recortarHistorial(corto), corto);
});

test("detecta temas desde las etiquetas del material", () => {
  const temas = detectarTemas([{ role: "user", content: "no me publica en Vercel y GitHub tira error" }]);
  assert.ok(temas.includes("vercel"));
  assert.ok(temas.includes("github"));
});

test("solo mira lo que escribió la alumna, no lo que respondió el asistente", () => {
  const temas = detectarTemas([{ role: "assistant", content: "revisa vercel y github" }]);
  assert.deepEqual(temas, []);
});

test("marca sin respuesta cuando deriva o dice que no tiene el dato", () => {
  assert.equal(marcarSinRespuesta("Eso no lo tengo en el material del taller."), true);
  assert.equal(marcarSinRespuesta("Escríbele a Maile por WhatsApp."), true);
  assert.equal(marcarSinRespuesta("Revisa en qué rama estás y qué falta por subir."), false);
});
