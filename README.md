# [NOMBRE] · Mujeres creando futuro con tecnología

Sitio institucional estático para una iniciativa de acceso a tecnología dirigida a mujeres.

## Contenido editable

Todo el contenido que cambiará con frecuencia vive en `config.js`:

- `brand`: nombre temporal, descriptor, correo, URL pública y enlaces principales;
- `programs`: programas, requisitos, estados, fechas, valores y contenido del detalle;
- `events`: encuentros (si la lista está vacía, se muestra el aviso de `eventsFallback`);
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
- `assets/images`: fotografías optimizadas y previsualización social.

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
