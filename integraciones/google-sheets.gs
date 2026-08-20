/**
 * Recibe los formularios del sitio y los guarda en esta planilla.
 *
 * Cómo se instala (una sola vez):
 *  1. Abre la planilla → Extensiones → Apps Script.
 *  2. Pega este archivo completo, reemplazando lo que haya.
 *  3. Implementar → Nueva implementación → tipo "Aplicación web".
 *       Ejecutar como: yo   ·   Quién tiene acceso: cualquier persona
 *  4. Copia la URL que termina en /exec y pégala en config.js,
 *     en forms.endpoint.
 *
 * Cada formulario escribe en su propia hoja, que se crea sola la primera
 * vez. Las columnas también se crean solas a partir de los campos que
 * llegan: si mañana el formulario suma un campo, aparece una columna nueva
 * sin tocar este archivo.
 */

var HOJAS = {
  participantes: 'Participantes',
  organizaciones: 'Organizaciones'
};

function doPost(e) {
  try {
    var datos = JSON.parse(e.postData.contents);
    var nombreHoja = HOJAS[datos.formulario] || 'Otros';
    guardar(nombreHoja, datos.campos || {}, datos.id);
    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

function doGet() {
  return json({ ok: true, mensaje: 'Endpoint activo.' });
}

function guardar(nombreHoja, campos, id) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var libro = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = libro.getSheetByName(nombreHoja) || libro.insertSheet(nombreHoja);

    var encabezados = hoja.getLastRow()
      ? hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0]
      : [];

    if (!encabezados.length) {
      encabezados = ['fecha', 'id'];
      hoja.appendRow(encabezados);
      hoja.getRange(1, 1, 1, encabezados.length).setFontWeight('bold');
      hoja.setFrozenRows(1);
    }

    // El navegador puede reintentar el mismo envío: se guarda una sola vez.
    if (id && yaRegistrado(hoja, encabezados, id)) return;

    // Campos nuevos: se agregan como columnas al final.
    Object.keys(campos).forEach(function (campo) {
      if (encabezados.indexOf(campo) === -1) {
        encabezados.push(campo);
        hoja.getRange(1, encabezados.length).setValue(campo).setFontWeight('bold');
      }
    });

    var fila = encabezados.map(function (encabezado) {
      if (encabezado === 'fecha') return new Date();
      if (encabezado === 'id') return id || '';
      return campos[encabezado] || '';
    });
    hoja.appendRow(fila);
  } finally {
    lock.releaseLock();
  }
}

function yaRegistrado(hoja, encabezados, id) {
  var columna = encabezados.indexOf('id') + 1;
  if (!columna || hoja.getLastRow() < 2) return false;
  var registrados = hoja.getRange(2, columna, hoja.getLastRow() - 1, 1).getValues();
  return registrados.some(function (fila) { return String(fila[0]) === String(id); });
}

function json(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
