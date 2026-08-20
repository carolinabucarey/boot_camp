# Maile · Mujeres creando futuro con tecnología

Sitio institucional estático para una iniciativa de acceso a tecnología dirigida a mujeres.

## Contenido editable

Todo el contenido que cambiará con frecuencia vive en `config.js`:

- `brand`: nombre, isotipo (`logo`), descriptor, correo, URL pública y enlaces principales;
- `forms.endpoint`: URL donde se envían los formularios (ver más abajo);
- `programs`: programas, requisitos, estados, fechas, valores y contenido del detalle.
  Un programa con `statusKey: "preparing"` sigue apareciendo en la grilla, pero no
  se ofrece en el selector «Programa de interés» del formulario;
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

## Páginas de detalle de un programa

`program.js` sirve a todas las páginas de detalle. Cada página declara qué programa
muestra con `<body data-program="slug-del-programa">` y rellena los contenedores por
atributo (`data-audience`, `data-methodology`, `#learn-list`, `#requirement-list`,
`#faq-list`, etc.) con los datos de ese programa en `config.js`.
Para publicar una fecha del taller, basta editar `nextDate`, `status` y `eventsFallback`
en `config.js`, o agregar el encuentro a la lista `events`. El bloque `price`
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
al dominio, el sitio no puede escribir y el envío falla en silencio. Para
comprobarlo, abre la URL `/exec` en una ventana de incógnito: debe responder
`{"ok":true,"mensaje":"Endpoint activo."}` y no una pantalla de inicio de sesión
de Google.

Al cambiar el script hay que volver a implementar (**Implementar → Gestionar
implementaciones → editar → Nueva versión**); guardar no basta.

## Marca

El nombre vive en un solo lugar: `brand.name` en `config.js`. Las páginas traen el
marcador `[NOMBRE]` en títulos, metadatos y `aria-label`, y `script.js` lo reemplaza
al cargar; los elementos con `data-brand` reciben el nombre completo. Para cambiar el
nombre no hay que tocar el HTML.

`assets/brand/maile-avatar.png` es el logo original: una mujer frente a un notebook
dentro de un círculo ciruela, con un aro degradado lila → rosa → dorado. Es el archivo
maestro y lo usan el encabezado y el pie del sitio (`brand.logo` en `config.js`).

De él salen dos piezas que son mapas de bits y no se actualizan solas: si el logo
cambia, hay que regenerarlas.

- Los favicon (`favicon.ico` con 16/32/48, y `assets/favicon-16.png`, `-32`, `-180`
  y `-512`). No son el original tal cual: a 16 y 32 píxeles el aro se pierde y los
  trazos finos de la figura se empastan, así que la figura va acercada y el aro
  llega al borde del círculo. Es el mismo dibujo, ajustado para que sobreviva al
  tamaño de una pestaña.
- `assets/og-social.png` (1200×630), la tarjeta que se ve al compartir el sitio en
  redes: logo, nombre y descriptor sobre las formas y los colores de la marca.

## Fotos del taller

`assets/images/experiencia-*.jpg` son fotos del primer bootcamp y alimentan la
sección «Así se vivió nuestro primer taller». Se eligieron las que muestran el
ambiente y se descartaron las que dejaban legible el contenido de las
diapositivas: el sitio comunica la experiencia, no el paso a paso del taller.
