---
titulo: Errores frecuentes y cómo desatascarse
programa: transversal
etiquetas: [errores, vercel, github, claude-code, publicacion, dominio, suscripcion, ramas, preview]
actualizado: 2026-09-07
fuentes:
  - Slides del taller web, pasos 6 y 7
  - Ficha del programa en maile.cl
  - Documentación oficial de GitHub y Vercel
# ESTADO: archivo sembrado con lo que se deduce del material del taller y de la
# documentación de las herramientas. Le falta lo que Carolina vio trabarse en la
# sala, que es lo que más pesa en la utilidad del asistente y lo único que no se
# puede deducir del repositorio. Ver la sección "Por completar" al final.
pendiente: Casos observados en la sala
---

# Errores frecuentes y cómo desatascarse

Este archivo no trae soluciones para copiar. Trae **qué revisar y en qué orden**
ante cada síntoma, y qué pedirle a la asistente de IA para avanzar sola.

## Lo primero, siempre

**Copia el error y pégalo tal cual.** Completo, sin resumirlo, sin traducirlo,
sin quedarte solo con la última línea. El texto que parece ruido es justamente lo
que le permite a la asistente ubicar dónde está el problema.

Un error no es una falla: es información que se puede corregir. No hay preguntas
tontas.

Y si el error no aparece por ningún lado, entonces la primera pregunta es dónde
mirar: el mensaje en pantalla, la consola del navegador, o el registro del
despliegue en Vercel. Son tres lugares distintos y cuentan cosas distintas.

## «Hice el cambio y la página no cambió»

Es el más frecuente, y casi siempre es una de tres cosas. Revísalas en este
orden:

1. **¿El cambio llegó a la rama de producción?** Publicar no es guardar el
   archivo: es que el cambio llegue a `main`. Si sigue en tu computador o en
   otra rama, la página en línea no lo tiene.
2. **¿Estás mirando la dirección correcta?** Cada rama que no es la de producción
   recibe su propia dirección temporal de *preview*. Es fácil quedarse con una
   pestaña abierta en la dirección de preview de ayer.
3. **¿Terminó el despliegue?** En Vercel cada envío crea un despliegue nuevo, y
   demora. Si falló, ahí está el registro con el motivo.

Qué pedirle a la asistente: que te muestre en qué rama estás y si hay cambios sin
enviar. La pregunta útil es «¿en qué rama estoy y qué falta por subir?», no «no
funciona».

## «El despliegue falló en Vercel»

El registro del despliegue dice en qué línea y en qué archivo se cortó. Ábrelo y
copia ese bloque completo.

Antes de pedir ayuda, mira una cosa: **¿funcionaba en tu computador antes de
subirlo?** Si nunca lo probaste local, el error puede ser anterior al despliegue,
y eso cambia dónde buscar.

## «La página quedó en blanco»

Una página en blanco casi nunca es «no se subió»: es que algo se rompió al
dibujarla. La consola del navegador tiene el mensaje.

El orden de revisión: qué fue lo último que cambiaste, y quítalo. Si vuelve a
aparecer, el problema estaba ahí. Es la forma más rápida de acotar, y no necesita
saber nada de código.

## «Quedó lindo, pero no parece mío»

No es un error técnico: es que se construyó antes de definir la marca. Se
resuelve volviendo al paso 3 —el skill de marca— y volviendo a pedir con esa
guía pegada en la conversación.

## «Se me acabaron los mensajes de la asistente»

El programa pide suscripción activa a Claude Code o a ChatGPT en su plan más
económico, y esa suscripción no está incluida en el valor del taller. Los límites
son de cada plan y se reinician solos; la fecha aparece en la propia herramienta.

## «No sé si mi repositorio es público o privado»

Los dos sirven para el taller. La diferencia es quién puede verlo: público es
accesible para cualquiera en internet, privado solo para ti y para quien le des
acceso. Si tu proyecto tiene datos que no quieres publicar, esto importa; si no,
no te detengas en ello ahora.

## «¿Y mi dominio .cl?»

Maile hace la compra y la configuración inicial, y el dominio queda a tu nombre.
Para eso necesitas crear una cuenta en NIC Chile: sobre esa cuenta se transfiere
la titularidad y la administración. La renovación después de los primeros doce
meses corre por tu cuenta, desde ese mismo lugar.

Si el dominio todavía no muestra tu página, lo primero es si la transferencia y
la configuración ya se hicieron. Escribe por los canales de contacto: eso no se
resuelve desde tu computador.

## Cuando nada de lo anterior calza

Vuelve al ciclo del taller: **pedir, mirar, corregir, publicar.** Una cosa a la
vez, y probando después de cada cambio. La mayoría de los enredos largos vienen
de haber pedido cinco cambios juntos y no saber cuál rompió qué.

---

## Por completar

Esta sección la escribe Carolina con lo que se vio trabarse en la sala. Cada caso
observado vale más que cualquiera de los de arriba, porque estos están deducidos
de las herramientas y aquellos están medidos en personas reales.

Formato sugerido para cada caso, el mismo del resto del archivo:

- **El síntoma, en las palabras de la alumna.** No en las palabras correctas: en
  las que efectivamente usó al preguntar. Ese es el texto con el que este
  asistente va a tener que reconocer el caso.
- **Qué revisar, en qué orden.** Dos o tres cosas, no una lista larga.
- **Qué pedirle a la asistente de IA.** La pregunta que destraba, redactada.

Las preguntas marcadas como sin respuesta en /admin/asistente son el insumo
directo para seguir llenando esta sección.
