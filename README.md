# TYXX — Web de la agencia

Web comercial de TYXX: Strand explora cómo aplicar IA para atender consultas, seguir oportunidades y reducir tareas repetitivas; muestra Novartech y Vision Latina como clientes, y una demo local flotante de agentes. Vision Latina acredita un proyecto digital, no uno de IA. Portfolite conserva el asistente guiado de procesos y contacto directo con TYXX. Strand es la entrada local actual: seis bloques desde problemas de trabajo hasta una consulta con supervisión humana. Portfolite conserva su oferta anterior de automatizaciones, sistemas de IA e infraestructura; las webs son una interfaz cuando el proceso lo necesita. Conserva los tickets 01 y 02 del asistente implementados.

## Dos versiones para comparar

- Strand actual: `http://127.0.0.1:4180/` o `http://127.0.0.1:4180/strand.html`.
- Portfolite anterior: `http://127.0.0.1:4180/index.html`.

Strand conserva su portada lateral y recreación propia del efecto de hilos y partículas. «Ver un ejemplo» lleva a un flujo hipotético independiente del asistente: consulta, organización de información, revisión humana y próximo paso. Sus tres escenas (01: consulta y organización; 02: revisión humana; 03: próximo paso) cambian con el scroll en escritorio y con los botones 01/02/03 en móvil. No hay sistemas conectados ni envíos o reservas en este ejemplo. El control «Pausar animación» detiene el movimiento y se respeta la preferencia de movimiento reducido. Ambas entregas permanecen locales; la versión pública no se actualizó.

Strand tiene una única navegación: Problemas, Ejemplo, Cómo trabajamos, Demos y Contacto. Sin JavaScript o con `strand-motion.js` bloqueado, sus enlaces permanecen visibles y se acomodan en varias líneas, con cabecera no fija. Hasta 760 px, la mejora muestra un botón Abrir/Cerrar menú: Enter/Espacio alternan, Tab recorre sin atrapar el foco y Escape cierra con retorno al botón. Los enlaces conservan hash/scroll nativos y enfocan su destino; click exterior y cambios de ancho no dejan foco en elementos ocultos. Esta navegación se inicializa antes e independientemente de Canvas.

La composición compacta responde a pantalla ≤760 px y contenedor ≤52rem: texto del ejemplo antes del dibujo, hero decorativo280 px, gráfica300 px y rótulo/selector en flujo normal. A texto200% el bloque crece sin reducir tipografía. Verificación local actual: `docs/verification-renovacion-tyxx.md` (Strand44/44, suite65/65); revisión humana con lector de pantalla y diagnóstico causal del timeout histórico siguen pendientes.

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
- `dist/strand.html`, `dist/strand.css` y `dist/strand-motion.js`: Strand, navegación progresiva local y animación original en Canvas, sin dependencias nuevas.
- `dist/agent-demo.js`, `dist/agent-demo.css`, `docs/agent-demo.md`: simulación local independiente en Strand, uso y límites.
- `dist/styles.css`: identidad visual, diseño adaptable y movimiento reducido.
- `dist/app.js`: enlaces de contacto, menú móvil de Portfolite y apertura del asistente desde enlaces internos.
- `dist/config.js`: correo comercial, asunto/cuerpo del borrador y enlace a la demo.
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

## Cambiar el correo comercial

El contacto vigente es `tyxxsolve@gmail.com`. Editar `contactEmail`, `contactSubject` y `contactBody` en `dist/config.js`; `app.js` codifica asunto y cuerpo por separado en enlaces `mailto:`. Sincronizar también los enlaces estáticos `mailto:` y la dirección visible de `dist/strand.html` y `dist/index.html`: funcionan aunque JavaScript, configuración o asistente no carguen. En Strand, «Conversemos sobre tu negocio» y «Contacto» siguen siendo anclas internas; «Escribir por correo» abre la aplicación de correo elegida por el visitante. No envía mensajes, no confirma recepción/reserva y no adjunta la ficha. Sin una aplicación configurada, se puede copiar la dirección visible.

## Verificación

```powershell
npm run check
```

Comprueba ambos HTML, todos los módulos JavaScript, configuración, recursos de las hojas de estilo enlazadas, importaciones locales, destinos internos, IDs y atributos principales de imágenes.

Para las pruebas de interacción, instalar las dependencias propias de TYXX con `npm ci` y ejecutar `npm test`. Usan Playwright y una instalación local de Google Chrome. El servidor de pruebas se inicia automáticamente si no está abierto. Para un recorrido puntual: `npm test -- tests/assistant.spec.js`. Las evidencias de comportamiento están en `docs/verification-asistente-01-02.md`; la verificación de los dos diseños está en `docs/verification-portfolite.md` y `docs/verification-strand.md`. Para las pruebas específicas de Strand: `npm test -- tests/strand.spec.js`.

## Demo local en Strand

El botón inferior derecho «Probá un agente» abre un panel cerrado inicialmente, sin tarjeta integrada en la sección de clientes. Sin JavaScript o con el módulo bloqueado, permanecen el correo visible y el enlace de contacto estático. Preguntá cómo podría ayudar la IA a tu negocio, o sobre servicios, proyectos, presupuestos, plazos y cómo empezar con TYXX mediante sugerencias o texto libre. Las respuestas no prometen crecimiento, ventas ni ahorro. La conversación se limita a ocho turnos en memoria, se conserva al cerrar y se borra al reiniciar o recargar. No usa IA real ni envía datos, reservas o mensajes. Ver `docs/agent-demo.md` para probarla y conocer los límites. Portfolite conserva su asistente anterior y ficha de proceso, sin cambios.

Esta entrega no conserva la ficha al recargar (ticket 03), ni incluye copia o exportación de la ficha por correo (04). El rediseño solicitado adelanta parte de 05; sus criterios pendientes de configuración/indisponibilidad de la demo todavía requieren implementación y reconciliación. Si JavaScript o el módulo del asistente fallan, su aviso ofrece «contactar a TYXX» y el contenido esencial sigue disponible; el enlace estático de correo permite continuar sin el asistente. No se publicó esta entrega.

## Publicación

Configurado como sitio estático de Sites, con `dist` como directorio público. Por pedido del usuario, cualquier persona con la URL puede visitar la versión de revisión sin iniciar sesión. Se conserva `noindex, nofollow`; este metadato solicita no indexar y no es un control de acceso. Antes del lanzamiento comercial, confirmar alcance y contacto definitivos y revisar la configuración de indexación.

La demo de Strand y el asistente legado de Portfolite procesan texto solo en memoria del navegador. La aplicación de correo se abre por elección del visitante, sin adjuntar el chat; este decide si envía el mensaje. Strand presenta Novartech y Vision Latina como clientes; enlaza el sitio MYOPIALATAM desarrollado para Vision Latina. Las referencias anteriores a Taller Norte describen la versión histórica, no el estado actual.
