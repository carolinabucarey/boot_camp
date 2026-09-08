#!/usr/bin/env bash
# Despliega el asistente. Idempotente: se puede volver a correr.
#
# Todo lo que toca se llama maile-asistente-*. No referencia ningún otro
# recurso de la cuenta.
set -euo pipefail

PERFIL="${PERFIL:-maile}"
REGION="${REGION:-us-east-1}"
PILA="maile-asistente"
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

aws_() { aws --profile "$PERFIL" --region "$REGION" "$@"; }

CUENTA="$(aws_ sts get-caller-identity --query Account --output text)"
BUCKET="maile-asistente-artefactos-${CUENTA}"

echo "Cuenta ${CUENTA}, región ${REGION}, perfil ${PERFIL}"

if ! aws_ s3api head-bucket --bucket "$BUCKET" 2>/dev/null; then
  echo "Creando bucket de artefactos ${BUCKET}"
  aws_ s3api create-bucket --bucket "$BUCKET"
  aws_ s3api put-public-access-block --bucket "$BUCKET" \
    --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
  aws_ s3api put-bucket-tagging --bucket "$BUCKET" \
    --tagging 'TagSet=[{Key=Project,Value=maile},{Key=Component,Value=asistente}]'
fi

# El paquete lleva /content adentro: la función lo lee con fs desde /var/task.
TRABAJO="$(mktemp -d)"
trap 'rm -rf "$TRABAJO"' EXIT

mkdir -p "$TRABAJO/lib/asistente"
cp "$RAIZ/lambda/asistente/index.js" "$TRABAJO/index.js"
cp -R "$RAIZ/content" "$TRABAJO/content"
cp "$RAIZ"/lib/asistente/*.js "$TRABAJO/lib/asistente/"
cp "$RAIZ/lib/site-content.js" "$TRABAJO/lib/"
# Las dependencias se instalan dentro del paquete, con las mismas versiones que
# el repositorio, para no depender de qué traiga el runtime de Lambda.
node -e "const d=require('$RAIZ/package.json').dependencies; const r=Object.fromEntries(Object.entries(d).filter(([k])=>k.startsWith('@anthropic-ai/')||k.startsWith('@aws-sdk/'))); require('fs').writeFileSync('$TRABAJO/package.json', JSON.stringify({name:'maile-asistente',type:'module',private:true,dependencies:r},null,2)); console.log('Dependencias empaquetadas: '+Object.keys(r).join(', '))"

( cd "$TRABAJO" && npm install --omit=dev --no-audit --no-fund --silent )

( cd "$TRABAJO" && zip -qr asistente.zip . )
echo "Paquete: $(du -h "$TRABAJO/asistente.zip" | cut -f1)"

aws_ s3 cp "$TRABAJO/asistente.zip" "s3://${BUCKET}/asistente.zip" --only-show-errors

aws_ cloudformation deploy \
  --stack-name "$PILA" \
  --template-file "$RAIZ/infra/aws/plantilla.yaml" \
  --capabilities CAPABILITY_NAMED_IAM \
  --tags Project=maile Component=asistente \
  --no-fail-on-empty-changeset

# CloudFormation no reemplaza el código cuando la clave de S3 no cambió.
aws_ lambda update-function-code \
  --function-name maile-asistente \
  --s3-bucket "$BUCKET" --s3-key asistente.zip \
  --publish --no-cli-pager --query 'LastModified' --output text

aws_ lambda wait function-updated --function-name maile-asistente

# Desde octubre de 2025 una URL de función con AuthType NONE exige DOS permisos:
# lambda:InvokeFunctionUrl y lambda:InvokeFunction. Sin el segundo, todo devuelve
# 403 sin dejar rastro en los logs. La condición del segundo
# (lambda:InvokedViaFunctionUrl) lo restringe a llamadas que entran por la URL,
# así que la función no queda invocable por la API directa desde otras cuentas.
# No están en la plantilla porque AWS::Lambda::Permission no sabe expresar esa
# condición. Idempotente: se borra y se vuelve a crear en cada despliegue.
for sid in UrlPolicyInvokeUrl UrlPolicyInvokeFunction publica publica-invoke; do
  aws_ lambda remove-permission --function-name maile-asistente --statement-id "$sid" 2>/dev/null || true
done

aws_ lambda add-permission --function-name maile-asistente \
  --statement-id UrlPolicyInvokeUrl --action lambda:InvokeFunctionUrl \
  --principal '*' --function-url-auth-type NONE --output text --query 'Statement' > /dev/null

aws_ lambda add-permission --function-name maile-asistente \
  --statement-id UrlPolicyInvokeFunction --action lambda:InvokeFunction \
  --principal '*' --invoked-via-function-url --output text --query 'Statement' > /dev/null

echo "Permisos de la URL de función asegurados"

URL="$(aws_ cloudformation describe-stacks --stack-name "$PILA" \
  --query 'Stacks[0].Outputs[?OutputKey==`UrlDelAsistente`].OutputValue' --output text)"

echo
echo "Asistente desplegado en: ${URL}"
echo "Verificación:  curl -s ${URL}salud"
