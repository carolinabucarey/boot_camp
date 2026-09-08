/*
 * Los secretos viven cifrados en Parameter Store y se leen en tiempo de
 * ejecución, nunca en una variable de entorno de la función ni en el
 * repositorio (§10). Fuera de Lambda se toman del entorno, para poder
 * ejercitar el chat desde la terminal.
 *
 * El import del SDK de AWS es dinámico a propósito: así este módulo se puede
 * importar desde la terminal sin tener instalado @aws-sdk/client-ssm.
 */
const PREFIJO = "/maile/asistente";
let cache = null;

export async function leerSecretos({ prefijo = PREFIJO, region } = {}) {
  if (cache) return cache;

  if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    cache = {
      apiKey: process.env.ANTHROPIC_API_KEY,
      codigos: process.env.CODIGOS_COHORTE,
      tokenSecreto: process.env.TOKEN_SECRETO,
      adminClave: process.env.ASISTENTE_ADMIN_CLAVE
    };
    return cache;
  }

  const { SSMClient, GetParametersCommand } = await import("@aws-sdk/client-ssm");
  const ssm = new SSMClient({ region: region ?? process.env.AWS_REGION });
  const nombres = ["anthropic-api-key", "codigos", "token-secreto", "admin-clave"];

  const respuesta = await ssm.send(
    new GetParametersCommand({
      Names: nombres.map((n) => `${prefijo}/${n}`),
      WithDecryption: true
    })
  );

  const porNombre = Object.fromEntries(
    (respuesta.Parameters ?? []).map((p) => [p.Name.split("/").pop(), p.Value])
  );

  if (respuesta.InvalidParameters?.length) {
    console.warn("Parámetros ausentes:", respuesta.InvalidParameters.join(", "));
  }

  cache = {
    apiKey: porNombre["anthropic-api-key"],
    codigos: porNombre["codigos"],
    tokenSecreto: porNombre["token-secreto"],
    adminClave: porNombre["admin-clave"]
  };
  return cache;
}

export function limpiarCache() {
  cache = null;
}
