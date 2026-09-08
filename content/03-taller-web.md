---
titulo: Crea y publica tu proyecto web con IA
programa: taller-web
etiquetas: [web, objetivo, contenido, marca, componentes, referencias, github, claude-code, react, nextjs, tailwind, vercel, publicacion, dominio, errores]
actualizado: 2026-09-06
fuentes:
  - Slides del taller, pasos 1 a 7
  - Ficha del programa en maile.cl
# Estas secciones NO se enseñaron en el taller. Son fundamento de conceptos que
# las slides sí nombran, traído de la documentación oficial de cada herramienta.
# Sirven para explicar algo que la alumna ya vio, no para ampliar el temario.
fundamento_externo:
  - Qué guarda un repositorio
  - Qué pasa cuando Vercel publica
  - Por qué la página se arma por piezas
  - Qué le agrega Next.js a React
  - Por qué los estilos van escritos en el marcado
fuentes_fundamento_externo:
  - https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories
  - https://vercel.com/docs/git
  - https://react.dev/learn/your-first-component
  - https://nextjs.org/docs/app/getting-started/layouts-and-pages
  - https://tailwindcss.com/docs/styling-with-utility-classes
---

# Crea y publica tu proyecto web con IA

Cuatro horas en dos jornadas online en vivo, nivel intermedio. Se llega con una
idea definida y se sale con una primera solución web funcional, versionada y
publicada. No se enseña programación tradicional: se aprende a dirigir a la
inteligencia artificial, decidir sobre lo que construye y comprobar que el
resultado responda al objetivo propio.

Cada participante trabaja sobre su propia idea. El material del taller es lo de
cada una, no un caso de ejemplo.

## El punto de partida

Toda página web son dos cosas.

**El front** es lo que se ve y se toca: colores, textos, botones, fotos. La
vitrina con la que interactúa la persona que llega.

**El back** es lo que pasa detrás: datos, pagos, contraseñas. La cocina que
nadie ve, pero que hace que las cosas pasen.

En este taller se publica una web real sin tocar el back. Eso es lo que hace
posible salir con algo funcionando en dos jornadas.

Sobre la pregunta de qué lenguaje usar —Python, React, Node— la respuesta del
taller es que no hay que elegir sola: se programa con IA, y el stack que se usa
es el que la asistente escribe mejor.

## Paso 1 · Qué queremos transmitir

El objetivo cambia todo el diseño. Antes de pensar en cómo se ve, hay que saber
qué tiene que lograr.

| Objetivo | Que la persona… | Ejemplo |
|---|---|---|
| Vender | compre | tienda de ropa o accesorios |
| Que te escriban | te contacte o reserve hora | nutricionista, taller, peluquería |
| Que te conozcan | sepa quién eres y qué haces | portafolio de fotógrafa o diseñadora |
| Inspirar | se emocione con una historia | marca con propósito o fundación |
| Enseñar | reciba contenido útil y vuelva | blog, medio, curso |
| Que se inscriban | deje su correo | una landing de convocatoria |

Ninguno es mejor que otro. Cada uno se ve distinto porque quiere lograr algo
distinto.

## Paso 2 · De qué se va a tratar

Cinco preguntas y el contenido ya está:

1. **¿Quién eres?** Tu nombre o tu marca, en una frase.
2. **¿Qué ofreces?** El producto o el servicio, sin tecnicismos.
3. **¿A quién le sirve?** La persona que quieres que llegue.
4. **¿Qué quieres que haga?** Comprar, escribir, agendar, suscribirse.
5. **¿Cómo te ubican?** Correo, WhatsApp, redes, dirección.

El ejemplo del taller: «Soy Ana, hago tortas por encargo en Ñuñoa. Quiero que me
escriban por WhatsApp con la fecha y el sabor. Mis fotos son mi mejor argumento.»

Si puedes decirlo en voz alta, ya tienes el contenido. No hace falta que sea
perfecto: hace falta que sea claro.

## Paso 3 · Tu marca, antes que el diseño

Se usa el skill de marca de Claude antes de construir nada.

- **Qué hace:** ordena la identidad —tono, colores, tipografías y mensajes.
- **Qué le das:** tu logo, tus fotos y cómo le hablas a tu público.
- **Qué recibes:** una guía que puedes pegar en cualquier conversación.

Así se lo pides: «Usa el skill de marca. Mi marca se llama ___, le habla a ___ y
quiero que se sienta ___.»

Hacerlo en este punto evita el clásico: quedó lindo, pero no parece mío.

## Paso 4 · Dibujar los componentes en papel

Dibujar primero, programar después. Los bloques que casi siempre aparecen:

- **Barra**: tu nombre y el menú, siempre arriba.
- **Portada**: una frase que dice qué haces y un botón.
- **Secciones**: servicios, productos, fotos, sobre ti.
- **Testimonios**: lo que dicen tus clientas de ti.
- **Cierre**: cómo contactarte y tus redes.

Dibujarlo primero ahorra la mitad de las vueltas después.

## Paso 5 · Referencias

Guardar dos páginas que gusten: esas referencias se le muestran a la asistente.

**Para transmitir tecnología** — se ve ordenado y confiable, poco color y mucha
nitidez: [Linear](https://linear.app) (fondo oscuro, textos cortos),
[Stripe](https://stripe.com) (degradados suaves, explicaciones directas).

**Para transmitir imagen y estética** — manda la foto, el texto es mínimo y el
espacio vacío es parte del lujo: [Aesop](https://aesop.com) (mucho aire, fotos
grandes), [Glossier](https://glossier.com) (cercano, el producto es la estrella).

**Para transmitir cercanía y confianza** — colores cálidos, ilustraciones, una
sola idea por pantalla: [Headspace](https://headspace.com),
[Calm](https://calm.com).

**Para una marca personal** — lo importante es que se note quién eres tú, no la
plantilla: [Jessica Hische](https://jessicahische.is) (su ilustración es la
página entera), [Brittany Chiang](https://brittanychiang.com) (limpia y ordenada
por proyectos).

## Paso 6 · Las herramientas y el stack

Las cuatro herramientas, en simple:

- **Navegador**: Chrome o el que uses. Ahí va a vivir todo.
- **Cuenta de Claude o ChatGPT**: tu asistente, quien escribe el código por ti.
  El programa pide suscripción activa a Claude Code o a ChatGPT en su plan más
  económico, y no está incluida en el valor.
- **GitHub**: la nube donde se guarda y se respalda tu trabajo. Cada
  participante trabaja con un repositorio individual.
- **Vercel**: el servicio que le da una dirección real a tu página.

El stack: **React** arma la página por piezas —un botón, una tarjeta, el menú—,
igual que el dibujo del paso 4. **Next.js** le pone estructura a React: páginas,
imágenes, velocidad y buen SEO. **Tailwind** deja los estilos escritos ahí mismo,
lo que hace rápido pedir cambios. Se publica en **Vercel**: conectas GitHub,
apruebas y la página queda en línea con dirección propia.

Cuatro razones por las que se usa React y Next.js:

1. **Es lo más usado.** La IA aprendió de millones de ejemplos escritos en React,
   y por eso lo escribe bien.
2. **Va por piezas.** Cada bloque del dibujo es un componente que se puede reusar
   y cambiar por separado.
3. **Te encuentran.** Next.js viene preparado para salir bien en buscadores.
4. **Se publica solo.** De tu computador a internet sin configurar un servidor.

WordPress o Wix también sirven, pero dejan el proyecto dentro de su caja. Acá la
página es tuya.

## Paso 7 · El ciclo: pedir, mirar, corregir, publicar

1. **Pide.** Explícale qué quieres en palabras simples.
2. **Mira.** Abre la página y revisa qué quedó.
3. **Corrige.** Dile qué cambiar. Las veces que sea.
4. **Publica.** Cuando te guste, la subes y ya existe.

Un ejemplo de pedido: «Hazme una página para mi marca de tortas: portada con foto
grande, sección de sabores y un botón de WhatsApp.»

Este es el procedimiento al que se vuelve cuando algo se traba. No es un paso
más: es la forma de trabajar del taller.

## Cuando algo se rompe

Si algo se rompe, copia el error y pégalo tal cual. No hay preguntas tontas.

El error no es una falla: es información que se puede corregir. Pegarlo completo
—sin resumirlo ni traducirlo— es lo que le permite a la asistente ubicar dónde
está el problema.

## Después del taller

El proyecto se puede seguir modificando: se piden los cambios con inteligencia
artificial, se revisan las versiones en GitHub y se vuelve a publicar. El
programa incluye la publicación inicial, la configuración técnica y un dominio
.cl por doce meses.

Lo que se termina es una primera versión funcional y acotada. El alcance depende
de la complejidad del proyecto y del punto de partida de cada una.

---

# Fundamento

Lo que sigue **no se enseñó en el taller**. Son los conceptos de arriba
explicados un paso más abajo, desde la documentación oficial de cada
herramienta, para responder un «¿pero qué es esto?» sin salirse del temario.

## Qué guarda un repositorio

Un repositorio en GitHub guarda el código, los archivos y el historial de
revisiones de cada archivo. Ese historial es lo que permite ver cómo fue
cambiando el proyecto y volver a una versión anterior si hace falta.

Un repositorio puede ser público —accesible para cualquiera en internet— o
privado, accesible solo para ti y para quien le des acceso explícitamente. En el
taller cada participante trabaja con el suyo.

## Qué pasa cuando Vercel publica

Al conectar el repositorio de GitHub, Vercel despliega automáticamente en cada
push. La rama de producción —normalmente `main`— es la que se sirve a quien
visita el sitio: cada vez que algo llega ahí, se crea un despliegue de
producción y la página en línea se actualiza.

Las demás ramas se despliegan como *preview*: cada una recibe su propia
dirección temporal, para mirar un cambio antes de que llegue a la página real.
Y como cada despliegue queda guardado, revertir un cambio en el dominio es
inmediato.

Por eso «publicar» no es subir archivos a mano: es hacer que el cambio llegue a
la rama de producción.

## Por qué la página se arma por piezas

Un componente de React es una función de JavaScript que devuelve marcado —la
parte visible— y que se puede reutilizar. En vez de tener el HTML, el CSS y el
JavaScript en archivos separados, cada pieza queda autocontenida.

Los componentes se componen anidándose: una galería contiene tres perfiles, y
cada perfil es el mismo componente usado tres veces. Eso es lo que hace que el
dibujo del paso 4 se traduzca tan directo: cada bloque del papel es un
componente, y se cambia uno sin tocar los demás.

## Qué le agrega Next.js a React

Next.js usa **enrutamiento por sistema de archivos**: las carpetas definen los
tramos de la dirección y los archivos definen qué se muestra en cada uno. Una
carpeta `blog` con un archivo de página adentro crea la dirección `/blog`.

Además distingue *página* de *layout*: la página es lo propio de cada dirección;
el layout es lo compartido entre varias —la barra de arriba, el pie— que se
mantiene al navegar en vez de volver a dibujarse.

## Por qué los estilos van escritos en el marcado

Una clase de utilidad de Tailwind aplica un solo estilo. En vez de escribir una
regla de CSS aparte y ponerle nombre, se aplican varias clases directamente
sobre el elemento: `bg-white`, `p-6`, `rounded-xl`.

Eso es lo que hace rápido pedir cambios: el estilo está en el mismo lugar que la
pieza, tocar una clase afecta solo a ese elemento, y los valores salen de un
tema predefinido, así que el conjunto se mantiene consistente.
