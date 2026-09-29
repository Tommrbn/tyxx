# Verificación del MVP de TYXX

> Nota de privacidad (2026-09-23): identidad personal anonimizada; contacto anterior retirado. El contacto vigente es tyxxsolve@gmail.com. Las menciones del canal anterior describen decisiones o pruebas de su fecha, no una verificación del correo actual.

Fecha: 10 de septiembre de 2026.

## Comprobaciones realizadas

- `npm run check`: sintaxis de JavaScript, configuración de WhatsApp, URL de demo, 14 IDs únicos, destinos internos, 8 referencias a recursos locales, encabezado principal y atributos de la imagen. Aprobado.
- `node --check scripts/serve.mjs`: sintaxis del servidor local. Aprobado.
- Formato de HTML, CSS y JavaScript comprobado con Prettier instalado en el proyecto vecino. Aprobado. El SVG se formateó explícitamente con el parser de HTML.
- Página local disponible en `http://127.0.0.1:4180/` con HTTP 200.
- Los 10 archivos públicos de `dist/` respondieron HTTP 200 y coincidieron byte a byte mediante SHA-256 con los archivos locales.
- Captura de Taller Norte inspeccionada como recurso del portfolio; muestra la demo real y su rótulo de demostración.

## Contacto

Configuración temporal autorizada: `[contacto personal retirado]`. El código prepara enlaces `wa.me` con mensajes editables y contexto específico para los cinco servicios. No se enviaron mensajes ni se comprobó actividad de la cuenta remota.

## Límites

No se ejecutaron pruebas interactivas de navegador ni revisión visual en distintos tamaños para esta entrega. El diseño contiene reglas adaptables, estados de foco, menú accesible y soporte de movimiento reducido; esas implementaciones no constituyen por sí solas una auditoría de accesibilidad o compatibilidad.

El sitio es estático, no procesa formularios, no guarda información de visitantes y no incorpora analítica. La revisión conserva `noindex, nofollow`. Se entregó inicialmente con acceso privado y luego se habilitó el acceso por enlace por pedido del usuario, como se registra abajo.

## Entrega privada confirmada

- URL: https://tyxx-agencia.novartech.chatgpt.site
- Versión guardada: 1.
- Fuente: `630c40925eb3144934f7e2b0cc97557cdc036005`, enviada al repositorio de Sites antes de guardar la versión.
- Archivo de entrega: 11 archivos, incluidos los 10 recursos públicos y los metadatos de alojamiento. Los recursos coincidieron con la fuente enviada.
- El envoltorio Bash de empaquetado no encontró Node en su entorno de Windows. Se utilizó el preparador oficial `prepare-site-build.cjs` con una carpeta temporal nueva validada y `tar` nativo; se comprobó el contenido antes de guardar la versión.
- Sites confirmó estado `succeeded` el 2026-09-10 a las 17:47 UTC mediante la operación de publicación privada, que exige acceso exclusivo del propietario.
- El acceso no se amplió al público ni se enviaron mensajes de WhatsApp.

## Cambio posterior a acceso por enlace

El 2026-09-10 a las 17:52 UTC, a pedido explícito del usuario, se actualizó el acceso de Sites de `custom` a `public` (revisión 2). Este modo permite visitar el sitio a cualquier persona con la URL. Se conservaron los permisos de edición y no se agregaron invitados.

Se verificaron la política mediante `get_site` y una petición HTTP sin credenciales: estado 200, URL final de TYXX sin redirección a inicio de sesión, contenido de la página y metadato `noindex, nofollow` presentes. No hizo falta cambiar archivos públicos ni desplegar otra versión.

## Adaptación visual a Xpovio

El 10 de septiembre de 2026 se implementó la dirección visual solicitada por el usuario y se integraron tres variantes de su logo. Se conservaron las cinco líneas de servicio, Taller Norte, proceso, FAQs, contacto temporal y `noindex, nofollow`. `dist/config.js` y `dist/app.js` no cambiaron.

- `npm run check`: aprobado, con 15 IDs únicos, enlaces internos válidos y 10 recursos referenciados disponibles.
- Los 12 archivos públicos respondieron HTTP 200 y coincidieron byte a byte con la fuente local.
- Los tres logos copiados coinciden byte a byte con los originales aportados. Los recortes y la adaptación de contraste son estilos de presentación.
- HTML y CSS formateados con Prettier; `git diff --check` sin errores.
- Referencia Xpovio revisada visualmente. La página de TYXX se abrió como vista previa local; no se ejecutaron pruebas visuales ni interactivas del producto en navegador.
- Acceso de Sites verificado: `public`, conserva la URL existente. La adaptación requiere una publicación posterior; la URL pública sigue mostrando la versión anterior hasta confirmar esa publicación.
