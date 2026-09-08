/*
 * Agregación para /admin/asistente.
 *
 * Función pura sobre las filas del registro: no toca DynamoDB ni Next, así que
 * se prueba sin infraestructura. Quien lea de la base es quien la llama.
 */

/* Semana ISO, para agrupar sin depender de la zona horaria de quien mira. */
export function semanaDe(iso) {
  const fecha = new Date(iso);
  const jueves = new Date(Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate()));
  jueves.setUTCDate(jueves.getUTCDate() + 3 - ((jueves.getUTCDay() + 6) % 7));
  const primero = new Date(Date.UTC(jueves.getUTCFullYear(), 0, 4));
  const semana = 1 + Math.round(((jueves - primero) / 86400000 - 3 + ((primero.getUTCDay() + 6) % 7)) / 7);
  return `${jueves.getUTCFullYear()}-S${String(semana).padStart(2, "0")}`;
}

export function armarInforme(filas = []) {
  const turnos = filas.filter((f) => f?.creado);

  const porSemana = new Map();
  const conversacionesPorSemana = new Map();
  const temas = new Map();

  for (const turno of turnos) {
    const semana = semanaDe(turno.creado);
    porSemana.set(semana, (porSemana.get(semana) ?? 0) + 1);

    if (!conversacionesPorSemana.has(semana)) conversacionesPorSemana.set(semana, new Set());
    conversacionesPorSemana.get(semana).add(turno.sk?.split("#")[0] ?? "");

    for (const tema of turno.temas ?? []) {
      temas.set(tema, (temas.get(tema) ?? 0) + 1);
    }
  }

  const conFeedback = turnos.filter((t) => typeof t.util === "boolean");
  const utiles = conFeedback.filter((t) => t.util).length;

  return {
    resumen: {
      turnos: turnos.length,
      /* No hay cuentas individuales: el código es de toda la cohorte. Esto
       * cuenta conversaciones distintas, no personas distintas. */
      conversaciones: new Set(turnos.map((t) => t.sk?.split("#")[0])).size,
      conFeedback: conFeedback.length,
      utiles,
      porcentajeUtil: conFeedback.length ? Math.round((utiles / conFeedback.length) * 100) : null,
      sinRespuesta: turnos.filter((t) => t.sinRespuesta).length
    },

    semanas: [...porSemana.entries()]
      .map(([semana, turnos]) => ({
        semana,
        turnos,
        conversaciones: conversacionesPorSemana.get(semana).size
      }))
      .sort((a, b) => (a.semana < b.semana ? 1 : -1)),

    temas: [...temas.entries()]
      .map(([tema, veces]) => ({ tema, veces }))
      .sort((a, b) => b.veces - a.veces),

    /* Las dos listas que alimentan 04-errores-frecuentes.md. */
    sinRespuesta: turnos
      .filter((t) => t.sinRespuesta)
      .map((t) => ({ creado: t.creado, pregunta: t.pregunta, respuesta: t.respuesta }))
      .sort((a, b) => (a.creado < b.creado ? 1 : -1)),

    noUtiles: turnos
      .filter((t) => t.util === false)
      .map((t) => ({
        creado: t.creado,
        pregunta: t.pregunta,
        respuesta: t.respuesta,
        comentario: t.comentario ?? ""
      }))
      .sort((a, b) => (a.creado < b.creado ? 1 : -1))
  };
}
