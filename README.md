# Maile · Mujeres creando futuro con tecnología

Sitio institucional para una iniciativa de acceso a tecnología dirigida a mujeres,
construido con [Next.js](https://nextjs.org) (App Router) y React, en JavaScript.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start        # sirve el build de producción
```

## Contenido editable

Todo el contenido que cambiará con frecuencia vive en `lib/site-content.js`:

- `brand`: nombre, realce del logotipo (`nameHighlight`), isotipo (`logo`),
  descriptor, correo, URL pública y enlaces principales. Ojo: el nombre también
  está repetido en los metadatos de cada página (ver «Marca»);
- `forms.endpoint`: URL donde se envían los formularios (ver más abajo);
- `programs`: programas, requisitos, estados, fechas, valores y contenido del detalle.
  Los programas con `statusKey: "open"` o `"soon"` se ofrecen en el selector
  «Programa de interés» del formulario;
- `events`: encuentros (si la lista está vacía, se muestra el aviso de `eventsFallback`);
- `testimonials`: comentarios de participantes. La sección solo aparece cuando hay
  comentarios reales: con la lista vacía no se muestra nada;
- `eventsFallback`: texto y botón que aparecen en «Próximos encuentros» mientras no haya fechas publicadas;
- `people`: profesoras y mentoras;
- `impactIndicators`: indicadores de impacto. Se muestran solo cuando hay cifras reales: con la lista vacía, la sección de impacto no despliega la grilla.

`lib/program-helpers.js` concentra la lógica derivada de esos datos (cupos
disponibles, si corresponde ofrecer el pago o la lista de espera, etc.), para
que las páginas de programa no la repitan.

## Páginas y estructura

- `/` (`app/page.js`): página institucional completa;
- `/programas/crea-tu-primer-agente-con-ia`: detalle del taller «Crea tu primer agente con IA»;
- `/programas/crea-tu-primer-agente-con-ia-online`: detalle de la edición online del programa de agentes;
- `/programas/crea-tu-primera-web-con-ia`: detalle del programa de páginas web;
- `/organizaciones`: recorrido institucional (propuesta, modalidades y formulario);
- `/pago`: resumen de inscripción, códigos de colaboradoras y salida al cobro alojado;
- `/gracias-por-tu-compra`: retorno posterior al pago y acceso al grupo de WhatsApp;
- `/privacidad` y `/terminos`: bases legales que deben revisarse al formalizar la iniciativa;
- `app/globals.css`: sistema visual responsive (compartido por toda la app);
- `components/`: piezas de UI reutilizables (encabezado, pie de página, formularios, tarjetas de programa, etc.);
- `public/assets/images`: fotografías optimizadas;
- `public/assets/brand`: archivos originales de la marca.

Las URLs anteriores en `.html` (`index.html`, `programa-agente-ia.html`, etc.)
redirigen de forma permanente a las rutas nuevas — ver `next.config.js`.

## SEO e indexación

- `public/robots.txt` permite el rastreo y declara la ubicación de `public/sitemap.xml`;
- `public/sitemap.xml` incluye únicamente las páginas públicas que deben aparecer en buscadores;
- las páginas legales y de pago llevan metadata `robots: noindex` y por eso no aparecen en el sitemap;
- cada página define sus propios metadatos (`export const metadata`) y, cuando corresponde,
  datos estructurados JSON-LD a través del componente `<StructuredData>`;
- la portada declara `Organization` y `WebSite`; las páginas de programa declaran
  `BreadcrumbList`, `Course` y `FAQPage` (la edición online además declara `Event`).

Cuando cambie una fecha, lugar o estado de convocatoria, actualiza tanto
`lib/site-content.js` como los datos estructurados de la página de detalle
correspondiente (`app/programas/<slug>/page.js`). Después de publicar cambios
importantes, actualiza `lastmod` en `public/sitemap.xml` y solicita una nueva
indexación desde Google Search Console.

## Páginas de detalle de un programa

Cada programa tiene su propia página en `app/programas/<slug>/page.js`. La
prosa de cada sección está escrita directamente en JSX (varía bastante entre
programas), mientras que los datos que cambian con frecuencia —nombre, precio,
cupos, fechas, requisitos, preguntas frecuentes— se leen desde
`lib/site-content.js` mediante `getProgramBySlug()`.

Para publicar una fecha del taller, edita `nextDate`, `status` y
`eventsFallback` en `lib/site-content.js`, agrega el encuentro a la lista
`events` y actualiza el bloque JSON-LD `Event`/`Course` en la página de
detalle correspondiente. El bloque `price` (`earlyBird`, `general`, `note`)
alimenta el recuadro de valores del panel lateral; si un programa no lo trae,
ese recuadro no se muestra.

El sitio comunica el resultado y el valor de cada programa, no su diseño
interno: la estructura por bloques, los marcos de trabajo y la metodología
detallada se mantienen fuera del contenido público (todo lo que vive en
`lib/site-content.js` se sirve al navegador y es visible para cualquiera).

## Retorno de pago y grupo de WhatsApp

Configura `brand.links.whatsappGroup` en `lib/site-content.js` con la
invitación completa del grupo. Mientras ese valor esté vacío,
`/gracias-por-tu-compra` permite escribir al WhatsApp oficial con un mensaje
prellenado para solicitar el acceso.

## Pago, códigos de descuento y cupos

Cada programa puede declarar bloques `payment` y `capacity` en
`lib/site-content.js`. El sitio no procesa tarjetas ni calcula cargos:
`payment.checkoutUrl` debe ser un enlace de cobro alojado por el proveedor y
con el precio general ya definido allí.

Para activar la venta de un programa:

1. Crea en el proveedor un enlace de cobro con el precio general y pega su URL HTTPS
   en `payment.checkoutUrl`.
2. Configura en el proveedor la cantidad máxima de ventas. Ese límite es el que evita
   una sobreventa si dos personas pagan al mismo tiempo.
3. Completa `capacity.total` y `capacity.remaining` en `lib/site-content.js`. Estos valores
   son informativos y deben actualizarse cuando cambie la disponibilidad. Con
   `remaining: 0`, el sitio reemplaza el pago por la lista de espera.
4. Configura el retorno exitoso del proveedor a
   `https://www.maile.cl/gracias-por-tu-compra?programa=SLUG-DEL-PROGRAMA`.

Para una red colaboradora, crea otro enlace de cobro en el proveedor con el monto
rebajado y agrégalo a `payment.discounts`:

    { code: "REDMUJERES10", partner: "Nombre de la red", price: "$63.000 CLP", checkoutUrl: "https://enlace-de-cobro" }

El código se compara sin distinguir mayúsculas de minúsculas. Al aplicarlo, el sitio
muestra el valor promocional y abre el enlace correspondiente. Como
`lib/site-content.js` es público, los códigos no deben considerarse secretos; el
proveedor debe mantener el monto final, los límites de uso y la vigencia. También
puedes compartir un enlace que traiga el código escrito de antemano:

    https://www.maile.cl/pago?programa=SLUG-DEL-PROGRAMA&codigo=REDMUJERES10

Nunca guardes credenciales, tokens o llaves privadas del proveedor en `lib/site-content.js`.

## Dos recorridos separados

El sitio mantiene separados el recorrido de las participantes y el institucional:
`/` y las páginas de programa hablan solo a las mujeres que quieren
participar (un CTA, un formulario), y todo lo dirigido a fundaciones, empresas,
municipios e instituciones vive en `/organizaciones`, enlazada de forma
discreta desde el menú, el pie y la sección de contacto.

## Formularios → Google Sheets

Los formularios (`components/ParticipantsForm.js` y
`components/OrganizationsForm.js`) envían sus datos a una planilla mediante una
aplicación web de Google Apps Script. Mientras `forms.endpoint` esté vacío en
`lib/site-content.js`, los formularios validan y agradecen, pero **no guardan
nada**.

Para conectarlos, una sola vez:

1. Abre la planilla de destino → **Extensiones → Apps Script**.
2. Pega el contenido de `integraciones/google-sheets.gs`, reemplazando lo que haya.
3. **Implementar → Nueva implementación → Aplicación web**, con
   *Ejecutar como: yo* y *Quién tiene acceso: cualquier persona*.
4. Copia la URL que termina en `/exec` y pégala en `forms.endpoint` en `lib/site-content.js`.

Cada formulario escribe en su propia hoja (`Participantes` y `Organizaciones`),
que se crea sola la primera vez, igual que sus columnas: si mañana un formulario
suma un campo, aparece una columna nueva sin tocar el script.

Cada envío lleva un `id` propio y el script ignora un `id` ya registrado. Esto
importa porque el navegador puede mandar el mismo formulario dos veces: primero
con una petición normal —que permite confirmar la recepción— y, si el navegador
bloquea leer la respuesta, otra vez en modo opaco. Sin el `id`, cada inscripción
aparecería duplicada en la planilla.

**La implementación debe tener acceso «cualquier persona».** Si queda restringida
al dominio, el sitio no puede escribir y el envío falla en silencio: el formulario
agradece igual, porque el reintento en modo opaco no permite leer la respuesta.

La propia URL delata cuál de las dos es. Una implementación restringida al dominio
lleva el dominio en la ruta:

    https://script.google.com/a/macros/tripsy-app.com/s/AKfy…/exec

y una pública, no:

    https://script.google.com/macros/s/AKfy…/exec

Si en `forms.endpoint` aparece `/a/macros/`, hay que volver a implementar con acceso
«cualquier persona». Para confirmarlo, abre la URL `/exec` en una ventana de
incógnito: debe responder `{"ok":true,"mensaje":"Endpoint activo."}` y no una
pantalla de inicio de sesión de Google.

Al cambiar el script hay que volver a implementar (**Implementar → Gestionar
implementaciones → editar → Nueva versión**); guardar no basta.

## Marca

El nombre está escrito en los metadatos de cada página (`title`, `openGraph`,
`twitter`) —porque los rastreadores de Google y de las redes sociales leen el
HTML servido sin depender de que React se hidrate— y también en `brand.name`
de `lib/site-content.js`, de donde salen el logotipo (`components/Wordmark.js`),
el descriptor y el correo de consultas.

**Si cambia el nombre o el dominio, hay que cambiarlo en los dos lados**: en los
metadatos de cada página (`app/**/page.js`) y en `lib/site-content.js`.

El nombre se escribe MAILE, en versales, siempre: en el logotipo, en los títulos, en
los metadatos y en el texto corrido.

El logotipo además parte el nombre en dos colores, M**AI**LE, porque el nombre lleva
"AI" adentro. Ese realce sale de `brand.nameHighlight` en `lib/site-content.js`:
`lib/brand.js` (`splitWordmark`) separa esa parte del nombre y `Wordmark.js` la
envuelve en un `<span class="ai">`; `app/globals.css` le da color, pero solo
dentro de `.wordmark` —en el texto corrido del pie el nombre va de una sola
pieza—. Dejar `nameHighlight` vacío devuelve el nombre entero de un color.

El logotipo del encabezado y el pie es de palo seco, muy espaciado, siguiendo el logo
horizontal de la marca; la serif del sitio queda para los títulos.

En `public/assets/brand` viven los archivos originales de la marca, y son dos dibujos
distintos con oficios distintos:

- `maile-avatar.png`: el logo. Una mujer frente a un notebook, de línea fina, dentro
  de un círculo ciruela con aro degradado lila → rosa → dorado. Lo usan el encabezado
  y el pie del sitio (`brand.logo` en `lib/site-content.js`) y la tarjeta social;
- `favicon.svg` más `favicon-16/32/48/180/512.png`: la misma figura, pero en silueta
  llena sobre un cuadrado de esquinas redondeadas. Es lo que se ve en la pestaña del
  navegador y en la pantalla de inicio del teléfono (configurado en `app/layout.js`).
  No es el logo achicado: a 16 píxeles la línea fina se empasta y el aro desaparece,
  así que el favicon resuelve la figura en masas sólidas, que sí sobreviven a ese tamaño.

`public/favicon.ico` (con 16, 32 y 48 píxeles) se arma desde esos PNG: es el
archivo que los navegadores piden solos, aunque nadie lo enlace. Si el favicon
cambia, hay que rehacerlo.

`public/assets/og-social.png` (1200×630) es la tarjeta que se ve al compartir el sitio en
redes: logo, nombre y descriptor sobre las formas y los colores de la marca. También
es un mapa de bits y hay que regenerarla si cambia el logo.

## Fotos del taller

`public/assets/images/experiencia-*.jpg` son fotos del primer bootcamp y alimentan la
sección «Así se vivió nuestro primer taller». Se eligieron las que muestran el
ambiente y se descartaron las que dejaban legible el contenido de las
diapositivas: el sitio comunica la experiencia, no el paso a paso del taller.
