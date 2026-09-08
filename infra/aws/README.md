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

```bash
# Códigos de cohorte y su vencimiento, en JSON.
aws ssm put-parameter --profile maile --region us-east-1 \
  --name /maile/asistente/codigos --type SecureString \
  --value '{"MAILE-AG26":"2026-11-07"}'

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
| `ASISTENTE_COHORTE_ACTUAL` | Qué cohorte muestra `/admin` por defecto |

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
https://www.maile.cl/?asistente=MAILE-AG26
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
