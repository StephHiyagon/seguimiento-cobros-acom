# ACOM · Prueba del aplicativo de cobros

[**Abrir aplicativo de prueba en GitHub Pages**](https://stephhiyagon.github.io/seguimiento-cobros-acom/)

Esta prueba se ejecuta completamente en el navegador desde GitHub Pages. No utiliza Sites ni requiere iniciar sesión con Google o ChatGPT.

1. Elige “CTC de prueba 1” y entra.
2. Escanea el QR desde una foto o la cámara, o completa la factura manualmente.
3. Registra un pago ficticio y su comprobante.
4. Usa “Cambiar perfil” para entrar como Cobranzas, confirmar el pago y consultar su historial.
5. Descarga el Excel de prueba desde “Registro de cobros”.

**Solo para pruebas con información ficticia.** Los registros y comprobantes se guardan en IndexedDB de ese navegador y dispositivo. No se comparten entre equipos ni se envían a Drive. El selector de perfiles simula los roles y no verifica identidad. Puedes borrar los datos desde “Borrar prueba local”. Al limpiar los datos del navegador también se pierde la prueba local.

La conexión con `seguimiento_cobros.xlsx` de Drive y el acceso por correos corporativos quedan para la siguiente etapa. No se han habilitado en esta publicación.

## Publicación actual

`docs/index.html` es la aplicación completa: incluye formulario, historial, exportación XLSX y lector QR/WASM. No necesita otros archivos para ejecutarse. GitHub Pages usa `main` y `/docs`.

El QR SIAT completa número de factura, NIT emisor y CUF. Cliente, fecha y total deben ingresarse manualmente. Se admiten pagos parciales y se comprueban recibos duplicados y acumulados. Los estados y confirmaciones son simulaciones locales; no autorizan créditos ni representan recepción real de dinero.

La compilación TypeScript y 17 pruebas de IndexedDB simulado verificaron guardado, comprobantes, reintentos, pagos parciales, sobrepagos, perfiles, confirmación, auditoría y transacciones concurrentes. La pantalla de acceso y el formulario se comprobaron en navegador. La comprobación automatizada de foto no se completó; la cámara debe validarse en el teléfono por HTTPS.

Las otras carpetas conservan el código de la primera implementación con servidor. No son necesarias para ejecutar esta prueba estática; la configuración de Sites que contienen no participa en GitHub Pages.
