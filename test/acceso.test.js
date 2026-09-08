import { test } from "node:test";
import assert from "node:assert/strict";

import {
  leerCodigos,
  validarCodigo,
  emitirToken,
  verificarToken
} from "../lib/asistente/acceso.js";

const CODIGOS = { "MAILE-AG26": "2026-11-07" };
const SECRETO = "secreto-de-prueba";

test("acepta el código sin importar mayúsculas ni espacios", () => {
  assert.deepEqual(validarCodigo("  maile-ag26 ", { codigos: CODIGOS }), {
    valido: true,
    codigo: "MAILE-AG26",
    expira: "2026-11-07"
  });
});

test("rechaza un código desconocido sin filtrar cuáles existen", () => {
  const r = validarCodigo("MAILE-XX99", { codigos: CODIGOS });
  assert.equal(r.valido, false);
  assert.equal(r.motivo, "desconocido");
  assert.equal(r.expira, undefined, "no debe revelar fechas de otros códigos");
});

test("el código sirve todo el día de su vencimiento y no el siguiente", () => {
  assert.equal(validarCodigo("MAILE-AG26", { codigos: CODIGOS, ahora: new Date("2026-11-07T22:00:00Z") }).valido, true);
  assert.equal(validarCodigo("MAILE-AG26", { codigos: CODIGOS, ahora: new Date("2026-11-08T00:30:00Z") }).valido, false);
});

test("sin códigos configurados no valida nada", () => {
  assert.deepEqual(leerCodigos(undefined), {});
  assert.deepEqual(leerCodigos("esto no es json"), {});
  assert.equal(validarCodigo("MAILE-AG26", { codigos: leerCodigos(undefined) }).valido, false);
});

test("el token de sesión se emite y se verifica", () => {
  const token = emitirToken({ codigo: "MAILE-AG26", expira: "2026-11-07", secreto: SECRETO });
  const r = verificarToken(token, { secreto: SECRETO });
  assert.equal(r.valido, true);
  assert.equal(r.codigo, "MAILE-AG26");
});

test("un token firmado con otro secreto no pasa", () => {
  const token = emitirToken({ codigo: "MAILE-AG26", expira: "2026-11-07", secreto: SECRETO });
  assert.equal(verificarToken(token, { secreto: "otro" }).motivo, "firma");
});

test("no se puede alterar el contenido del token sin romper la firma", () => {
  const token = emitirToken({ codigo: "MAILE-AG26", expira: "2026-11-07", secreto: SECRETO });
  const [, firma] = token.split(".");
  const alterado = Buffer.from(JSON.stringify({ codigo: "MAILE-AG26", expira: "2099-01-01" })).toString("base64url");
  assert.equal(verificarToken(`${alterado}.${firma}`, { secreto: SECRETO }).motivo, "firma");
});

test("un token vencido se rechaza aunque la firma sea válida", () => {
  const token = emitirToken({ codigo: "MAILE-AG26", expira: "2026-11-07", secreto: SECRETO });
  assert.equal(verificarToken(token, { secreto: SECRETO, ahora: new Date("2027-01-01") }).motivo, "vencido");
});

test("un token ausente o malformado no revienta", () => {
  assert.equal(verificarToken(undefined, { secreto: SECRETO }).motivo, "ausente");
  assert.equal(verificarToken("cualquiercosa", { secreto: SECRETO }).motivo, "malformado");
});
