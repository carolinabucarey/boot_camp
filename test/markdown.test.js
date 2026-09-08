import { test } from "node:test";
import assert from "node:assert/strict";

import { analizar, analizarLinea } from "../components/asistente/analizarMarkdown.js";

test("los párrafos se separan por línea en blanco", () => {
  const bloques = analizar("Primero.\n\nSegundo.");
  assert.equal(bloques.length, 2);
  assert.equal(bloques[0].segmentos[0].valor, "Primero.");
});

test("las negritas dejan de verse como asteriscos", () => {
  const [{ segmentos }] = analizar("Revisa la rama **main** antes de nada.");
  assert.deepEqual(segmentos.map((s) => s.tipo), ["texto", "fuerte", "texto"]);
  assert.equal(segmentos[1].valor, "main");
  assert.ok(!segmentos.some((s) => s.valor.includes("*")), "no debe quedar ningún asterisco");
});

test("reconoce listas de pasos numeradas", () => {
  const [bloque] = analizar("1. Pide.\n2. Mira.\n3. Corrige.");
  assert.equal(bloque.tipo, "numerada");
  assert.equal(bloque.items.length, 3);
  assert.equal(bloque.items[0][0].valor, "Pide.");
});

test("reconoce viñetas con guion y con asterisco", () => {
  assert.equal(analizar("- uno\n- dos")[0].tipo, "lista");
  assert.equal(analizar("* uno\n* dos")[0].tipo, "lista");
});

test("una línea que empieza con número dentro de un párrafo no lo vuelve lista", () => {
  const [bloque] = analizar("Tienes 3 opciones y ninguna es obvia.");
  assert.equal(bloque.tipo, "parrafo");
});

test("los encabezados se degradan a negrita, no a <h2>", () => {
  const [bloque] = analizar("## Lo primero");
  assert.equal(bloque.tipo, "parrafo");
  assert.deepEqual(bloque.segmentos, [{ tipo: "fuerte", valor: "Lo primero" }]);
});

test("los enlaces se detectan sin arrastrar la puntuación final", () => {
  const segmentos = analizarLinea("Escríbeles a https://wa.me/56990195787, ahí responden.");
  const enlace = segmentos.find((s) => s.tipo === "enlace");
  assert.equal(enlace.valor, "https://wa.me/56990195787");
});

test("el texto que parece HTML se muestra como texto, no se interpreta", () => {
  const [{ segmentos }] = analizar("Escribe <script>alert(1)</script> en el campo.");
  assert.equal(segmentos.length, 1);
  assert.equal(segmentos[0].tipo, "texto");
  assert.ok(segmentos[0].valor.includes("<script>"), "queda como literal");
});

test("el código en línea se marca aparte", () => {
  const [{ segmentos }] = analizar("Abre `next.config.mjs` y mira.");
  assert.equal(segmentos[1].tipo, "codigo");
  assert.equal(segmentos[1].valor, "next.config.mjs");
});

test("texto vacío no revienta", () => {
  assert.deepEqual(analizar(""), []);
  assert.deepEqual(analizar(undefined), []);
});
