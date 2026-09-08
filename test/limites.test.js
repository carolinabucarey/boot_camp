import { test } from "node:test";
import assert from "node:assert/strict";

import {
  LIMITES,
  evaluarConteos,
  fechaLocal,
  horaLocal,
  huellaDeIp,
  mensajeDeLimite
} from "../lib/asistente/limites.js";

test("deja pasar mientras no se superen los topes", () => {
  assert.deepEqual(evaluarConteos({ sesion: 30, codigoDia: 100, ipHora: 40 }), { permitido: true });
});

test("el tope diario por código manda sobre los demás", () => {
  const r = evaluarConteos({ sesion: 1, codigoDia: 101, ipHora: 1 });
  assert.equal(r.permitido, false);
  assert.equal(r.motivo, "codigo-dia");
});

test("el tope por IP corta antes de agotar la cuota de la cohorte", () => {
  assert.equal(evaluarConteos({ ipHora: LIMITES.porIpPorHora + 1 }).motivo, "ip-hora");
});

test("el tope por sesión es el último en aplicarse", () => {
  assert.equal(evaluarConteos({ sesion: LIMITES.porSesion + 1 }).motivo, "sesion");
});

test("el día se corta en horario de Chile, no en UTC", () => {
  /* En septiembre Santiago está en UTC-3: las 02:59 UTC del día 8 son todavía
   * el 7 allá, y a las 03:00 ya cambió el día. */
  assert.equal(fechaLocal(new Date("2026-09-08T02:59:00Z")), "2026-09-07");
  assert.equal(fechaLocal(new Date("2026-09-08T03:00:00Z")), "2026-09-08");
  /* Y en pleno invierno austral el desfase es de cuatro horas. */
  assert.equal(fechaLocal(new Date("2026-06-08T03:59:00Z")), "2026-06-07");
});

test("la clave por hora incluye la fecha, para no mezclar días", () => {
  const clave = horaLocal(new Date("2026-09-08T14:30:00Z"));
  assert.match(clave, /^\d{4}-\d{2}-\d{2}T\d{2}$/);
  assert.ok(clave.startsWith("2026-09-08"));
});

test("la IP se guarda como huella, nunca en claro", () => {
  const huella = huellaDeIp("190.44.12.9", "secreto");
  assert.equal(huella.length, 32);
  assert.ok(!huella.includes("190"));
  assert.equal(huella, huellaDeIp("190.44.12.9", "secreto"), "debe ser estable");
  assert.notEqual(huella, huellaDeIp("190.44.12.10", "secreto"));
});

test("sin secreto no inventa una huella", () => {
  assert.equal(huellaDeIp("190.44.12.9", ""), "");
});

test("cada mensaje dice cuándo se puede volver", () => {
  assert.match(mensajeDeLimite("codigo-dia"), /mañana/);
  assert.match(mensajeDeLimite("ip-hora"), /en un rato/);
  assert.match(mensajeDeLimite("sesion"), /Recarga la página/);
});

test("el canal de contacto aparece solo si existe", () => {
  assert.match(mensajeDeLimite("codigo-dia", { contacto: "WhatsApp" }), /WhatsApp/);
  assert.ok(!mensajeDeLimite("codigo-dia").includes("escríbele"));
});
