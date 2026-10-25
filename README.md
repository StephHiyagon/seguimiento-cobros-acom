# ACOM · Registro de cobros

Aplicación privada para registrar cobros, identificar facturas por QR SIAT y descargar un Excel actualizado.


## Aplicativo en funcionamiento

https://acom-registro-cobros.mv-hiyagon.chatgpt.site

El acceso es privado y requiere una cuenta autorizada. GitHub conserva el código fuente. Esta aplicación necesita servidor, base D1 y archivos R2; GitHub Pages por sí solo no ejecuta estas funciones.

## Archivo de seguimiento en Google Drive

Se creó `seguimiento_cobros.xlsx` como archivo de destino. La sincronización automática con Google Drive está pendiente de configurar. Los cobros se guardan en el registro central y el Excel actualizado puede descargarse desde el aplicativo.

## Operación

- El CTC inicia sesión con su cuenta autorizada, escanea el QR de factura o ingresa los datos, registra el importe y adjunta el recibo oficial.
- QR SIAT verificado con el documento de referencia: identifica número, NIT emisor y CUF. No contiene nombre del cliente, fecha o total. No se consulta automáticamente la web de Impuestos.
- Los cobros se conservan en la base central D1. El recibo se conserva en R2. No se guardan registros de cobranza en el almacenamiento local del navegador.
- El Excel se obtiene del registro central usando la plantilla revisada. Una descarga es una copia al momento de la consulta, no un Excel de OneDrive sincronizado. La integración con un archivo corporativo requeriría conectar ese archivo y su cuenta.
- Un pago digital informado permanece por verificar hasta su confirmación bancaria por Cobranzas.
- Una persona no puede confirmar su propio cobro. No hay eliminación ni edición destructiva de registros. Los cambios de estado se auditan.
- Las condiciones comerciales ingresadas son informativas. Esta versión no aprueba crédito, no controla cupos ni reemplaza el ERP o el recibo oficial.

## Accesos

El primer acceso privado del propietario inicializa Administración. Antes de ampliar la audiencia, el propietario debe entrar una vez y configurar los roles. Cada integrante necesita autorización privada de Sites además de su rol en la aplicación. Guardar un rol no envía invitaciones.

CTC: registra y ve sus cobros. Comercial: consulta y exporta todos. Cobranzas: consulta, observa y confirma. Administración: configura roles y consulta.

No se han cargado clientes, pagos ni nombres de usuarios reales en la base de producción. Las pruebas usan exclusivamente la base local de desarrollo.

## Desarrollo

Utiliza los scripts de Sites. Genera migraciones con `pnpm run db:generate`, aplica las migraciones pendientes a la D1 local y construye con el helper `build-site.mjs` de Sites. La publicación aplica las migraciones de producción. Conserva `.openai/hosting.json`, el historial de migraciones y la integración de autenticación.

El archivo `app/lib/template-data.ts` contiene la plantilla Excel creada con Artifact Tool. `app/lib/excel.ts` completa sus filas conservando las celdas numéricas, fechas, formatos, encabezados y tabla filtrable. No introduce fórmulas desde los textos del cliente.
