# Maile · Mujeres creando futuro con tecnología

Sitio institucional estático para una iniciativa de acceso a tecnología dirigida a mujeres.

## Contenido editable

Todo el contenido que cambiará con frecuencia vive en `config.js`:

- `brand`: nombre, realce del logotipo (`nameHighlight`), isotipo (`logo`),
  descriptor, correo, URL pública y enlaces principales. Ojo: el nombre y la URL
  también están en el HTML (ver «Marca»);
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

## Páginas y estilos

- `index.html`: página institucional completa;
- `programa-agente-ia.html`: detalle del taller «Crea tu primer agente con IA»;
- `programa-web-ia.html`: detalle del programa de páginas web;
- `organizaciones.html`: recorrido institucional (propuesta, modalidades y formulario);
- `privacidad.html` y `terminos.html`: bases legales que deben revisarse al formalizar la iniciativa;
- `styles.css`: sistema visual responsive;
- `script.js` y `program.js`: contenido dinámico, menú y validación de formularios;
- `assets/images`: fotografías optimizadas;
- `assets/brand`: archivos originales de la marca.

No hay proceso de compilación: basta abrir `index.html` o servir la carpeta con un servidor estático.

## SEO e indexación

- `robots.txt` permite el rastreo y declara la ubicación de `sitemap.xml`;
- `sitemap.xml` incluye únicamente las páginas públicas que deben aparecer en buscadores;
- las páginas legales llevan `noindex,follow` y por eso no aparecen en el sitemap;
- la portada declara los datos estructurados `Organization` y `WebSite`;
- las páginas interiores declaran breadcrumbs; el programa de agentes usa datos
  estructurados `Course` y `FAQPage`. Solo debe agregarse `Event` cuando una nueva
  edición tenga fecha y lugar confirmados.

Cuando cambie una fecha, lugar o estado de convocatoria, actualiza tanto `config.js`
como los datos estructurados de la página de detalle correspondiente. Después de
publicar cambios importantes, actualiza `lastmod` en `sitemap.xml` y solicita una
nueva indexación desde Google Search Console.

## Páginas de detalle de un programa

`program.js` sirve a todas las páginas de detalle. Cada página declara qué programa
muestra con `<body data-program="slug-del-programa">` y rellena los contenedores por
atributo (`data-audience`, `data-methodology`, `#learn-list`, `#requirement-list`,
`#faq-list`, etc.) con los datos de ese programa en `config.js`.
Para publicar una fecha del taller, edita `nextDate`, `status` y `eventsFallback`
en `config.js`, agrega el encuentro a la lista `events` y publica su `Event` en los
datos estructurados de la página. El bloque `price`
(`earlyBird`, `general`, `note`) alimenta el recuadro de valores del panel lateral;
si un programa no lo trae, ese recuadro no se muestra.

El sitio comunica el resultado y el valor de cada programa, no su diseño interno:
la estructura por bloques, los marcos de trabajo y la metodología detallada se
mantienen fuera del contenido público (todo lo que vive en `config.js` se sirve
al navegador y es visible para cualquiera).

## Dos recorridos separados

El sitio mantiene separados el recorrido de las participantes y el institucional:
`index.html` y las páginas de programa hablan solo a las mujeres que quieren
participar (un CTA, un formulario), y todo lo dirigido a fundaciones, empresas,
municipios e instituciones vive en `organizaciones.html`, enlazada de forma
discreta desde el menú, el pie y la sección de contacto.

## Formularios → Google Sheets

Los formularios envían sus datos a una planilla mediante una aplicación web de
Google Apps Script. Mientras `forms.endpoint` esté vacío en `config.js`, los
formularios validan y agradecen, pero **no guardan nada**.

Para conectarlos, una sola vez:

1. Abre la planilla de destino → **Extensiones → Apps Script**.
2. Pega el contenido de `integraciones/google-sheets.gs`, reemplazando lo que haya.
3. **Implementar → Nueva implementación → Aplicación web**, con
   *Ejecutar como: yo* y *Quién tiene acceso: cualquier persona*.
4. Copia la URL que termina en `/exec` y pégala en `forms.endpoint` en `config.js`.

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

El nombre está escrito en el HTML de cada página —en el `<title>`, en los metadatos
`og:`, en el `aria-label` del logo y en el encabezado y el pie— y también en
`brand.name` de `config.js`, de donde salen el logotipo, el descriptor y, cuando se
confirme, el correo al cargar la página.

Están en los dos lados a propósito. Antes las páginas traían el marcador `[NOMBRE]` y
`script.js` lo reemplazaba al cargar, pero los rastreadores de Google y de las redes
sociales leen el HTML sin ejecutar JavaScript: al compartir el sitio por WhatsApp, la
tarjeta mostraba literalmente "[NOMBRE] · Mujeres creando futuro con tecnología". Lo
mismo pasa con `brand.siteUrl`, que alimenta la URL canónica y la de `og:`.

**Si cambia el nombre o el dominio, hay que cambiarlo en los dos lados**: en el HTML
de las seis páginas y en `config.js`.

El nombre se escribe MAILE, en versales, siempre: en el logotipo, en los títulos, en
los metadatos y en el texto corrido.

El logotipo además parte el nombre en dos colores, M**AI**LE, porque el nombre lleva
"AI" adentro. Ese realce sale de `brand.nameHighlight` en `config.js`: `script.js`
envuelve esa parte del nombre en un `<span class="ai">` y `styles.css` le da color,
pero solo dentro de `.wordmark` —en el texto corrido del pie el nombre va de una sola
pieza—. Dejar `nameHighlight` vacío devuelve el nombre entero de un color.

El logotipo del encabezado y el pie es de palo seco, muy espaciado, siguiendo el logo
horizontal de la marca; la serif del sitio queda para los títulos.

En `assets/brand` viven los archivos originales de la marca, y son dos dibujos
distintos con oficios distintos:

- `maile-avatar.png`: el logo. Una mujer frente a un notebook, de línea fina, dentro
  de un círculo ciruela con aro degradado lila → rosa → dorado. Lo usan el encabezado
  y el pie del sitio (`brand.logo` en `config.js`) y la tarjeta social;
- `favicon.svg` más `favicon-16/32/48/180/512.png`: la misma figura, pero en silueta
  llena sobre un cuadrado de esquinas redondeadas. Es lo que se ve en la pestaña del
  navegador y en la pantalla de inicio del teléfono. No es el logo achicado: a 16
  píxeles la línea fina se empasta y el aro desaparece, así que el favicon resuelve
  la figura en masas sólidas, que sí sobreviven a ese tamaño.

`favicon.ico` (en la raíz, con 16, 32 y 48 píxeles) se arma desde esos PNG: es el
archivo que los navegadores piden solos, aunque nadie lo enlace. Si el favicon
cambia, hay que rehacerlo.

`assets/og-social.png` (1200×630) es la tarjeta que se ve al compartir el sitio en
redes: logo, nombre y descriptor sobre las formas y los colores de la marca. También
es un mapa de bits y hay que regenerarla si cambia el logo.

## Fotos del taller

`assets/images/experiencia-*.jpg` son fotos del primer bootcamp y alimentan la
sección «Así se vivió nuestro primer taller». Se eligieron las que muestran el
ambiente y se descartaron las que dejaban legible el contenido de las
diapositivas: el sitio comunica la experiencia, no el paso a paso del taller.
