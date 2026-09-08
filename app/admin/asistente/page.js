import { armarInforme } from "@/lib/asistente/informe";

export const metadata = {
  title: "Asistente · uso y preguntas",
  robots: { index: false, follow: false }
};

/* Siempre fresco: mirar métricas cacheadas no sirve de nada. */
export const dynamic = "force-dynamic";

const BASE = (process.env.NEXT_PUBLIC_ASISTENTE_URL ?? "").replace(/\/+$/, "");

async function traerInforme(cohorte) {
  if (!BASE || !process.env.ASISTENTE_ADMIN_CLAVE) {
    return { error: "Falta configurar NEXT_PUBLIC_ASISTENTE_URL o ASISTENTE_ADMIN_CLAVE." };
  }

  try {
    const respuesta = await fetch(`${BASE}/admin?cohorte=${encodeURIComponent(cohorte)}`, {
      headers: { authorization: `Bearer ${process.env.ASISTENTE_ADMIN_CLAVE}` },
      cache: "no-store"
    });

    if (!respuesta.ok) {
      return { error: `El asistente respondió ${respuesta.status}.` };
    }
    return await respuesta.json();
  } catch {
    return { error: "No pude conectarme con el asistente." };
  }
}

function Tarjeta({ etiqueta, valor, nota }) {
  return (
    <div className="admin-tarjeta">
      <p className="admin-tarjeta-valor">{valor}</p>
      <p className="admin-tarjeta-etiqueta">{etiqueta}</p>
      {nota && <p className="admin-tarjeta-nota">{nota}</p>}
    </div>
  );
}

export default async function AdminAsistente({ searchParams }) {
  const parametros = await searchParams;
  const cohorte = (parametros?.cohorte ?? process.env.ASISTENTE_COHORTE_ACTUAL ?? "").toUpperCase();

  if (!cohorte) {
    return (
      <main className="container admin">
        <h1>Asistente · uso y preguntas</h1>
        <p className="admin-aviso">
          Indica la cohorte en la dirección, por ejemplo <code>?cohorte=MAILE-AG26</code>, o define{" "}
          <code>ASISTENTE_COHORTE_ACTUAL</code>.
        </p>
      </main>
    );
  }

  const datos = await traerInforme(cohorte);

  if (datos.error) {
    return (
      <main className="container admin">
        <h1>Asistente · uso y preguntas</h1>
        <p className="admin-aviso">{datos.error}</p>
      </main>
    );
  }

  const { resumen, semanas, temas, sinRespuesta, noUtiles } = datos.resumen
    ? datos
    : { ...armarInforme([]), ...datos };

  return (
    <main className="container admin">
      <h1>Asistente · uso y preguntas</h1>
      <p className="admin-cohorte">Cohorte {cohorte}</p>

      <section className="admin-tarjetas">
        <Tarjeta etiqueta="Turnos" valor={resumen.turnos} />
        <Tarjeta
          etiqueta="Conversaciones"
          valor={resumen.conversaciones}
          nota="No son personas: el código es de toda la cohorte."
        />
        <Tarjeta
          etiqueta="Les sirvió"
          valor={resumen.porcentajeUtil === null ? "—" : `${resumen.porcentajeUtil}%`}
          nota={`Sobre ${resumen.conFeedback} respuestas valoradas`}
        />
        <Tarjeta etiqueta="Sin respuesta" valor={resumen.sinRespuesta} />
      </section>

      <section className="admin-seccion">
        <h2>Por semana</h2>
        {semanas.length === 0 ? (
          <p className="admin-vacio">Todavía no hay conversaciones.</p>
        ) : (
          <table className="admin-tabla">
            <thead>
              <tr><th>Semana</th><th>Conversaciones</th><th>Turnos</th></tr>
            </thead>
            <tbody>
              {semanas.map((s) => (
                <tr key={s.semana}>
                  <td>{s.semana}</td>
                  <td>{s.conversaciones}</td>
                  <td>{s.turnos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="admin-seccion">
        <h2>Temas más consultados</h2>
        {temas.length === 0 ? (
          <p className="admin-vacio">Sin temas detectados todavía.</p>
        ) : (
          <ul className="admin-temas">
            {temas.map((t) => (
              <li key={t.tema}>
                <span>{t.tema}</span>
                <span className="admin-temas-veces">{t.veces}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="admin-seccion">
        <h2>Preguntas sin respuesta</h2>
        <p className="admin-ayuda">
          Esto es lo que el asistente no supo contestar. Es el insumo directo para escribir{" "}
          <code>04-errores-frecuentes.md</code>.
        </p>
        {sinRespuesta.length === 0 ? (
          <p className="admin-vacio">Ninguna, por ahora.</p>
        ) : (
          <ul className="admin-preguntas">
            {sinRespuesta.map((p, i) => (
              <li key={i}>
                <p className="admin-pregunta">{p.pregunta}</p>
                <p className="admin-fecha">{p.creado.slice(0, 10)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="admin-seccion">
        <h2>Respuestas que no sirvieron</h2>
        <p className="admin-ayuda">
          Acá el asistente sí respondió, pero la alumna dijo que no le sirvió. Suele señalar material
          impreciso más que material faltante.
        </p>
        {noUtiles.length === 0 ? (
          <p className="admin-vacio">Ninguna, por ahora.</p>
        ) : (
          <ul className="admin-preguntas">
            {noUtiles.map((p, i) => (
              <li key={i}>
                <p className="admin-pregunta">{p.pregunta}</p>
                {p.comentario && <p className="admin-comentario">«{p.comentario}»</p>}
                <p className="admin-fecha">{p.creado.slice(0, 10)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
