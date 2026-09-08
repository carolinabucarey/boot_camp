# El asistente en AWS

Solo el asistente vive acá. maile.cl se queda en Vercel y el widget llama a la
URL de la función.

## Qué se crea

| Recurso | Nombre | Para qué |
|---|---|---|
| Lambda | `maile-asistente` | Node 22, URL de función en modo `RESPONSE_STREAM` |
| DynamoDB | `maile-asistente-registro` | Conversaciones y contadores de uso, con TTL |
| IAM Role | `maile-asistente-ejecucion` | Permisos de la función, acotados a esos recursos |
| Log group | `/aws/lambda/maile-asistente` | 30 días de retención |
| S3 | `maile-asistente-artefactos-<cuenta>` | Solo el zip del despliegue, privado |

Todo lleva las etiquetas `Project=maile` y `Component=asistente`, y vive en una
pila de CloudFormation propia llamada `maile-asistente`. Nada referencia ni
modifica recursos existentes de la cuenta.

Para borrarlo entero: `aws cloudformation delete-stack --stack-name maile-asistente --profile maile`.

## Antes del primer despliegue

El modelo se consume por **Amazon Bedrock**: el gasto pasa por AWS —lo cubren
los créditos de la cuenta— y la función se autentica con su rol IAM. No hay
clave de API que guardar ni rotar.

Quedan dos secretos, en Parameter Store cifrados, nunca en el repositorio.
**Estos comandos los corres tú**: no pasan por la conversación.

El código de cohorte es el que reciben las alumnas, así que **no lo escribas en
la línea de comandos**: queda en el historial del shell. Este comando te lo pide
oculto:

```bash
# Códigos de cohorte y su vencimiento. El código se escribe oculto.
read -s -p "Código de la cohorte: " C && echo && read -p "Vence (AAAA-MM-DD): " V && \
aws ssm put-parameter --profile maile --region us-east-1 \
  --name /maile/asistente/codigos --type SecureString --overwrite \
  --value "{\"$C\":\"$V\"}"

# Secreto para firmar los tokens de sesión. Que lo genere el sistema:
aws ssm put-parameter --profile maile --region us-east-1 \
  --name /maile/asistente/token-secreto --type SecureString \
  --value "$(openssl rand -hex 32)"

# Clave de /admin/asistente. La misma va en Vercel como ASISTENTE_ADMIN_CLAVE.
aws ssm put-parameter --profile maile --region us-east-1 \
  --name /maile/asistente/admin-clave --type SecureString \
  --value "$(openssl rand -hex 24)"
```

## En Vercel

El sitio necesita tres variables de entorno:

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_ASISTENTE_URL` | La dirección que devuelve el despliegue |
| `ASISTENTE_ADMIN_CLAVE` | Protege `/admin/asistente` y autentica contra el endpoint. Debe coincidir con el parámetro del mismo nombre |
| `ASISTENTE_COHORTE_ACTUAL` | Qué cohorte muestra `/admin` por defecto. Tiene que coincidir **exactamente** con una clave del JSON de `codigos`; si no coincide, la página no da error, muestra el informe vacío |

`/admin/asistente` pide usuario `maile` y esa clave.

## Desplegar

```bash
./infra/aws/desplegar.sh
```

Empaqueta `/content`, `lib/asistente` y el handler, los sube y actualiza la
pila. Es idempotente: se puede volver a correr las veces que haga falta.

## Una decisión que se aparta del requerimiento

La sección 6 pide guardar el token de sesión en una cookie `httpOnly`. Con la
función en `*.lambda-url.on.aws` y el sitio en `maile.cl`, esa cookie es de
tercera parte y los navegadores la bloquean. Dos fases:

- **Ahora:** el token viaja en la cabecera `Authorization`. Funciona entre
  orígenes distintos y no depende de DNS.
- **Después:** CloudFront con certificado para `asistente.maile.cl` delante de
  la función. Ahí la cookie `httpOnly` vuelve a ser primera parte y se cumple el
  requerimiento tal como está escrito. Necesita poder crear un registro DNS en
  `maile.cl`.

## Cómo se le da acceso a una cohorte

El link se manda al grupo de WhatsApp que ya existe. Lleva el código de la
cohorte y el widget lo canjea solo:

```
https://www.maile.cl/?asistente=EL-CODIGO-DE-LA-COHORTE
```

Al abrirlo, el panel se despliega, el código se canjea por un token de sesión y
el parámetro **se borra de la barra de direcciones**, para que no viaje en
capturas de pantalla, en el historial ni en la cabecera `Referer` hacia terceros.
Los demás parámetros de la URL —`utm_source`, por ejemplo— se conservan.

Reglas para que no se convierta en un problema:

- **Un código por cohorte**, nunca reutilizar el anterior.
- **Vencimiento a 30 días** del cierre del taller, en el JSON de `codigos`.
- El link **es la credencial**: quien lo tenga, entra. Por eso los límites de
  abajo no son opcionales.

### Los límites que lo contienen

| Límite | Tope | Para qué |
|---|---|---|
| Por código y día | 100 consultas | Techo del gasto si el link se filtra |
| Por IP y hora | 40 consultas | Frena un script antes de agotar la cuota del día |
| Por sesión | 30 mensajes | Corta un bucle accidental |

Los contadores viven en la misma tabla, se borran solos por TTL y la IP se
guarda como huella con HMAC, nunca en claro. Si la tabla falla, se deja pasar:
preferimos una conversación de más a dejar a la cohorte sin asistente.

El día se corta en horario de Chile, no a medianoche UTC.

## Comprobar que el código cargado es el que estás repartiendo

Un código mal cargado no da ningún síntoma para quien ya entró: el token
guardado en el navegador sigue funcionando, así que quien lo configuró puede
entrar mientras nadie más puede. Antes de repartirlo, compruébalo contra el
endpoint real:

```bash
read -s -p "Pega el código que repartes: " C && echo && \
curl -s -o /dev/null -w "%{http_code}\n" -X POST \
  https://soskrfwyhr3jxink7yyjujo7ei0pqxhv.lambda-url.us-east-1.on.aws/acceso \
  -H 'content-type: application/json' -d "{\"codigo\":\"$C\"}" \
  | sed 's/200/SIRVE/; s/403/NO SIRVE/'
```

Y para ver por qué falla un intento concreto:

```bash
aws logs tail /aws/lambda/maile-asistente --since 15m --profile maile \
  --region us-east-1 --filter-pattern acceso
```

`motivo: desconocido` es un código que no está cargado; `motivo: vencido` es uno
que existe pero pasó su fecha. Si no aparece ninguna línea, la petición no llegó
y el problema está en el navegador de quien intenta, no en el asistente.

## Cambiar un código no corta las sesiones abiertas

El token se verifica por su firma y su vencimiento, no contra la lista de
códigos. Quien ya entró sigue dentro aunque su código se reemplace. Para cortar
acceso de verdad hay que rotar `/maile/asistente/token-secreto`, lo que invalida
todas las sesiones a la vez.
