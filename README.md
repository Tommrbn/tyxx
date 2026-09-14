# TYXX — Web de la agencia

Web comercial de TYXX con un asistente guiado para describir procesos y revisar una ficha editable, el proyecto demostrativo Taller Norte y contacto directo con Tomás. La página usa Portfolite como referencia visual, con textos breves y tres servicios: automatizaciones, sistemas de IA e infraestructura. Las webs son un complemento. Conserva los tickets 01 y 02 del asistente implementados.

## Dos versiones para comparar

- Strand actual: `http://127.0.0.1:4180/` o `http://127.0.0.1:4180/strand.html`.
- Portfolite anterior: `http://127.0.0.1:4180/index.html`.

La segunda versión conserva la oferta y el asistente, con una portada lateral y una recreación propia del efecto de hilos y partículas. Las escenas de servicios cambian con el scroll en escritorio y con los botones 01/02/03 en móvil. El control «Pausar animación» detiene el movimiento y se respeta la preferencia de movimiento reducido. Ambas entregas permanecen locales; la versión pública no se actualizó.

## Vista local

Requiere Node.js. La página funciona sin dependencias de producción ni compilación. Las dependencias de desarrollo se usan únicamente para las pruebas de navegador.

En Windows, hacer doble clic en **Abrir TYXX.cmd** en la carpeta del proyecto. Inicia la vista local en segundo plano si estaba apagada, comprueba que responda TYXX y abre directamente Strand en el navegador. Si ya está funcionando, reutiliza el mismo proceso. Después de reiniciar Windows, volver a abrir ese acceso. No instala un servicio ni se inicia automáticamente al encender el equipo.

Para iniciar la vista desde una terminal:

```powershell
npm run dev
```

Abrir `http://127.0.0.1:4180/`. El servidor sirve Strand como entrada local, conserva Portfolite en `/index.html` y solo expone `dist/` en esta computadora. Las respuestas usan `no-store`. Este enlace no funciona desde otro equipo o celular; la URL pública de Sites sigue en su versión publicada anterior.

Los registros del acceso de Windows quedan en `.sites-runtime/preview.log` y `.sites-runtime/preview-error.log`, fuera del control de versiones. El identificador del proceso iniciado queda en `.sites-runtime/preview.pid`.

## Archivos

- `dist/index.html`: versión Portfolite conservada.
- `dist/strand.html`, `dist/strand.css` y `dist/strand-motion.js`: segunda versión y animación original en Canvas, sin dependencias nuevas.
- `dist/styles.css`: identidad visual, diseño adaptable y movimiento reducido.
- `dist/app.js`: enlaces de contacto, menú móvil y apertura del asistente desde enlaces internos.
- `dist/config.js`: número de WhatsApp, mensaje general y enlace a la demo.
- `dist/assistant-loader.js`: carga independiente y alternativa si el asistente no inicia.
- `dist/assistant-model.js`: conversación, correcciones, ficha vigente y validación.
- `dist/assistant-simulator.js`: interpretación limitada mediante reglas; no consume IA.
- `dist/assistant-view.js` y `dist/assistant.css`: interacción y presentación del asistente.
- `docs/asistente-tyxx.md`: comportamiento, contrato de interpretación y futura integración.
- `dist/assets/`: logos aportados por el usuario, imagen abstracta de portada, fuentes con licencia y captura real de la demo. Procedencia y usos en `docs/assets.md`.
- `.agents/product-marketing.md`: contexto comercial acordado.
- `.scratch/web-agencia/discovery.md`: decisiones y cambios durante la entrevista.
- `.scratch/web-agencia/spec.md`: alcance de este MVP.

Los archivos de `dist/` son los originales editables y se guardan en Git; este sitio estático no requiere compilación.

## Cambiar el número comercial

Editar `whatsappNumber` en `dist/config.js`. Usar formato internacional solo con dígitos. El número actual está autorizado temporalmente para este MVP. Los mensajes y los enlaces de todos los botones se generan desde esa configuración.

## Verificación

```powershell
npm run check
```

Comprueba ambos HTML, todos los módulos JavaScript, configuración, recursos de las hojas de estilo enlazadas, importaciones locales, destinos internos, IDs y atributos principales de imágenes.

Para las pruebas de interacción, instalar las dependencias propias de TYXX con `npm ci` y ejecutar `npm test`. Usan Playwright y una instalación local de Google Chrome. El servidor de pruebas se inicia automáticamente si no está abierto. Para un recorrido puntual: `npm test -- tests/assistant.spec.js`. Las evidencias de comportamiento están en `docs/verification-asistente-01-02.md`; la verificación de los dos diseños está en `docs/verification-portfolite.md` y `docs/verification-strand.md`. Para las pruebas específicas de Strand: `npm test -- tests/strand.spec.js`.

## Asistente local

En la portada el asistente comienza plegado. Se abre con su CTA, tarjeta de demostración, navegación o enlace directo `http://127.0.0.1:4180/#asistente`. Cerrar y volver a abrir el bloque conserva la conversación en memoria. La indicación «Demostración guiada: funciona con reglas, no con IA real» identifica el modo. Se puede elegir uno de los tres ejemplos, escribir un caso, dejar datos pendientes, corregir una respuesta y editar los seis campos de la ficha. Los casos que las reglas no pueden orientar quedan pendientes de evaluar con Tomás; la vía manual sigue disponible.

Esta entrega no conserva la ficha al recargar (ticket 03), ni incluye copia o preparación de WhatsApp con la ficha (04). El rediseño solicitado adelanta parte de 05; sus criterios pendientes de configuración/indisponibilidad de la demo todavía requieren implementación y reconciliación. El contacto directo anterior sigue disponible. No se publicó esta entrega.

## Publicación

Configurado como sitio estático de Sites, con `dist` como directorio público. Por pedido del usuario, cualquier persona con la URL puede visitar la versión de revisión sin iniciar sesión. Se conserva `noindex, nofollow`; este metadato solicita no indexar y no es un control de acceso. Antes del lanzamiento comercial, confirmar alcance y contacto definitivos y revisar la configuración de indexación.

El asistente procesa el texto en memoria del navegador, sin enviarlo ni conservarlo tras recarga. WhatsApp se abre por elección del visitante y este decide si envía el mensaje. Taller Norte es una marca ficticia y se presenta como proyecto demostrativo, no como cliente.
