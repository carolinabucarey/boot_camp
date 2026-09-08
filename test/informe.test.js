import { test } from "node:test";
import assert from "node:assert/strict";

import { armarInforme, semanaDe } from "../lib/asistente/informe.js";

const filas = [
  { sk: "conv-a#0001", creado: "2026-09-07T10:00:00Z", pregunta: "¿Por qué no publica?", respuesta: "Revisa la rama.", temas: ["vercel", "github"], sinRespuesta: false, util: true },
  { sk: "conv-a#0002", creado: "2026-09-07T10:05:00Z", pregunta: "¿Y el dominio?", respuesta: "No lo tengo en el material.", temas: ["dominio"], sinRespuesta: true },
  { sk: "conv-b#0001", creado: "2026-09-07T18:00:00Z", pregunta: "¿Cómo subo fotos?", respuesta: "Pídeselo así.", temas: ["vercel"], sinRespuesta: false, util: false, comentario: "Muy general" },
  { sk: "conv-c#0001", creado: "2026-08-31T09:00:00Z", pregunta: "¿Qué es un agente?", respuesta: "Razona, planifica y ejecuta.", temas: ["agente"], sinRespuesta: false }
];

test("cuenta turnos y conversaciones distintas", () => {
  const { resumen } = armarInforme(filas);
  assert.equal(resumen.turnos, 4);
  assert.equal(resumen.conversaciones, 3);
});

test("el porcentaje útil se calcula solo sobre los turnos con feedback", () => {
  const { resumen } = armarInforme(filas);
  assert.equal(resumen.conFeedback, 2);
  assert.equal(resumen.utiles, 1);
  assert.equal(resumen.porcentajeUtil, 50);
});

test("sin feedback todavía, el porcentaje es nulo y no cero", () => {
  const { resumen } = armarInforme([filas[3]]);
  assert.equal(resumen.porcentajeUtil, null, "cero diría que nada sirvió, y no es lo mismo que no saber");
});

test("agrupa por semana ISO, más reciente primero", () => {
  const { semanas } = armarInforme(filas);
  assert.equal(semanas.length, 2);
  assert.equal(semanas[0].turnos, 3);
  assert.equal(semanas[0].conversaciones, 2);
  assert.equal(semanas[1].turnos, 1);
});

test("ordena los temas por frecuencia", () => {
  const { temas } = armarInforme(filas);
  assert.deepEqual(temas[0], { tema: "vercel", veces: 2 });
});

test("lista las preguntas sin respuesta, que son el insumo del material", () => {
  const { sinRespuesta } = armarInforme(filas);
  assert.equal(sinRespuesta.length, 1);
  assert.equal(sinRespuesta[0].pregunta, "¿Y el dominio?");
});

test("lista lo marcado como no útil con su comentario", () => {
  const { noUtiles } = armarInforme(filas);
  assert.equal(noUtiles.length, 1);
  assert.equal(noUtiles[0].comentario, "Muy general");
});

test("un registro vacío no revienta", () => {
  const informe = armarInforme([]);
  assert.equal(informe.resumen.turnos, 0);
  assert.deepEqual(informe.temas, []);
  assert.equal(informe.resumen.porcentajeUtil, null);
});

test("la semana ISO cruza bien el fin de año", () => {
  assert.equal(semanaDe("2026-01-01T12:00:00Z"), "2026-S01");
  assert.equal(semanaDe("2026-12-31T12:00:00Z"), "2026-S53");
});
