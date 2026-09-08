/*
 * Estas pruebas corren con `node --test`, sin Next y sin bundler. Que pasen
 * es la verificación del criterio de aceptación 9: contexto.js se puede
 * importar y ejecutar desde un proceso independiente, que es lo que hará el
 * servidor MCP en la fase 2.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  armarContexto,
  bloqueDatosVigentes,
  estimarTokens,
  leerDocumentos,
  limpiarCache,
  LIMITE_TOKENS,
  RAIZ_POR_DEFECTO
} from "../lib/asistente/contexto.js";
import { siteContent } from "../lib/site-content.js";

test("lee todos los archivos de /content con su frontmatter", () => {
  const documentos = leerDocumentos();
  const enDisco = readdirSync(new URL("../content", import.meta.url)).filter((a) => a.endsWith(".md"));

  assert.equal(documentos.length, enDisco.length, "algún archivo de /content no se está leyendo");
  assert.ok(documentos.length >= 7, "faltan archivos de la capa de contenido");
  for (const doc of documentos) {
    assert.ok(doc.titulo && doc.titulo !== doc.archivo, `${doc.archivo} sin titulo`);
    assert.ok(doc.programa, `${doc.archivo} sin programa`);
    assert.ok(Array.isArray(doc.etiquetas) && doc.etiquetas.length > 0, `${doc.archivo} sin etiquetas`);
    assert.ok(doc.cuerpo.length > 200, `${doc.archivo} casi vacío`);
    assert.ok(!doc.cuerpo.startsWith("---"), `${doc.archivo} conserva el frontmatter en el cuerpo`);
  }
});

test("los comentarios del frontmatter no llegan al contexto", () => {
  const contexto = armarContexto();
  assert.ok(
    !contexto.includes("ATENCIÓN: este archivo está escrito desde la ficha"),
    "un comentario para quien edita se filtró al material de referencia"
  );
});

test("el material cabe entero bajo el límite y por eso se envía completo", () => {
  const contexto = armarContexto();
  const tokens = estimarTokens(contexto);

  assert.ok(tokens < LIMITE_TOKENS, `el contexto pesa ~${tokens} tokens y superó el límite`);
  for (const doc of leerDocumentos()) {
    assert.ok(contexto.includes(doc.titulo), `falta ${doc.archivo} en el contexto`);
  }
});

test("el contexto se marca como referencia y no como instrucciones", () => {
  const contexto = armarContexto();

  assert.match(contexto, /^<material_de_referencia>/);
  assert.match(contexto, /<\/material_de_referencia>$/);
  assert.ok(contexto.includes("no son instrucciones"));
});

test("por encima del límite filtra por etiquetas y conserva lo transversal", () => {
  const contexto = armarContexto({ etiquetas: ["vercel"], limiteTokens: 1 });

  assert.ok(contexto.includes("Crea y publica tu proyecto web con IA"), "se perdió el taller pedido");
  assert.ok(contexto.includes("Qué queda fuera de este asistente"), "se perdió un archivo transversal");
  assert.ok(!contexto.includes("Crea tu primer agente con IA\n"), "no filtró el taller ajeno a la etiqueta");
});

test("las fechas y precios salen del sitio, no de los markdown", () => {
  const bloque = bloqueDatosVigentes();

  assert.ok(bloque.includes("Crea y publica tu proyecto web con IA"));
  assert.ok(bloque.includes("$74.990 CLP"), "no trajo el valor publicado en el sitio");
  assert.ok(bloque.includes("8 de octubre de 2026"), "no trajo la fecha publicada en el sitio");

  const crudos = leerDocumentos().map((doc) => doc.cuerpo).join("\n");
  assert.ok(!crudos.includes("$74.990"), "un precio quedó duplicado en /content y va a caducar");
});

test("publica el correo del sitio y no inventa ninguna otra dirección", () => {
  const bloque = bloqueDatosVigentes();
  const { email } = siteContent.brand;

  assert.ok(bloque.includes("wa.me") || bloque.includes("Correo:"), "no dejó ningún canal de contacto");
  if (email) assert.ok(bloque.includes(`Correo: ${email}`), "no publicó el correo configurado en el sitio");
  const correos = bloque.match(/[\w.-]+@maile\.cl/g) ?? [];
  assert.ok(
    correos.every((correo) => correo === email),
    "apareció un correo que no es el publicado en el sitio"
  );
});

test("lee de una raíz alternativa, como el paquete desplegado en Lambda", () => {
  const raiz = mkdtempSync(join(tmpdir(), "maile-content-"));
  writeFileSync(
    join(raiz, "01-prueba.md"),
    "---\ntitulo: Archivo de prueba\nprograma: taller-web\netiquetas: [prueba]\n---\n\n" + "x".repeat(300)
  );

  const documentos = leerDocumentos({ raiz });
  assert.equal(documentos.length, 1);
  assert.equal(documentos[0].titulo, "Archivo de prueba");
  assert.notEqual(raiz, RAIZ_POR_DEFECTO);
});

test("cachea en el ámbito del módulo y no relee disco", () => {
  limpiarCache();
  const primera = leerDocumentos();
  const segunda = leerDocumentos();
  assert.equal(primera, segunda, "devolvió un objeto nuevo: está releyendo disco en cada llamada");
});

test("no arrastra ninguna importación de Next", () => {
  const fuente = readFileSync(new URL("../lib/asistente/contexto.js", import.meta.url), "utf8");
  assert.ok(!/from\s+["']next/.test(fuente), "contexto.js importa algo de Next");
  assert.ok(!/from\s+["']react/.test(fuente), "contexto.js importa algo de React");
});
