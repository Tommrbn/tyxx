# Continuar el sitio de TYXX

Actualizado: 23 de septiembre de 2026.

## Contacto vigente — 23 de septiembre de 2026

La identidad pública de contacto es TYXX, sin nombre personal. La única mención personal nueva está en la evidencia profesional de Novartech: Tomás Desia · Developer, enlazada a la sección oficial #team. Strand y Portfolite usan tyxxsolve@gmail.com mediante «Escribir por correo», con dirección visible y fallback mailto aunque JavaScript/configuración/asistente no estén disponibles. El asunto y cuerpo configurados se codifican por separado; no se envían mensajes ni se exporta la ficha. El contacto telefónico anterior está retirado. Las referencias a ese canal en la historia describen su fecha, no el comportamiento vigente ni pruebas actuales de correo.

La verificación nueva se registra en `../../odd/tasks/brand-email-contact.md`; no reemplaza los límites históricos de lector de pantalla ni del diagnóstico del puntero. Sin publicación ni operaciones Git de entrega.
## Estado actual — renovación local de Strand

Actualización de posicionamiento local: Strand ahora abre con «Hacé crecer tu negocio con IA.» y propone evaluar atención de consultas, seguimiento de oportunidades y tareas repetitivas. No ofrece desarrollo web como servicio visible ni promete ventas o ahorros. Novartech conserva evidencia de agentes y visión por computadora; Vision Latina sigue como proyecto digital MYOPIALATAM, sin atribuirle IA. La demo flotante acompaña esta orientación y conserva su simulación local, límites y contacto. Portfolite y los registros históricos permanecen intactos. Validación de esta actualización: pendiente de registrar; los resultados más abajo son históricos.

### Estado anterior de esta sección (histórico)

Actualización local de la tarjeta comercial: Strand ahora presenta sitios web y agentes de IA primero, junto con sistemas de IA a medida. La tarjeta ficticia de Taller Norte fue reemplazada por Novartech, cliente con el que el usuario informa trabajar hace varios años en sitios web, agentes de IA y visión por computadora para detectar armazones y lentes y obtener medidas para laboratorio. La sección oficial #team acredita el vínculo profesional, no la autoría de todo el sitio o los productos ni métricas de precisión. Vision Latina es el segundo cliente mostrado: el usuario informa que desarrolló su sitio MYOPIALATAM (Congreso Latinoamericano de Miopía), enlazado directamente a https://www.myopialatam.com/. No se atribuyen métricas ni resultados al proyecto. El enlace directo no usa `data-demo`, que la configuración compartida sobreescribiría. Portfolite sigue intacta. Strand reemplazó el asistente integrado por una demo flotante local que ahora responde consultas sobre servicios, proyectos y forma de trabajo de TYXX, sin selector de rubro. Es una simulación determinista: no hay modelo, API, reservas ni envíos; la charla solo vive en memoria hasta recargar. La tarjeta del asistente ya no aparece en Demos: solo el botón flotante «Probá un agente» abre la simulación. Sin JavaScript o con el módulo bloqueado quedan los enlaces de contacto y correo estáticos. Se retiró la frase explicativa bajo «Escribir por correo», sin cambiar el destino mailto. Ver `docs/agent-demo.md`. Las comprobaciones históricas de abajo corresponden al estado anterior. Las comprobaciones históricas de abajo corresponden al estado anterior, no a esta tarjeta.

`/` y `/strand.html` muestran la renovación desde procesos: seis bloques, contacto interno antes de «Escribir por correo», ejemplo hipotético y asistente secundario en Demos. `/index.html` conserva Portfolite. No se publicó, no hubo commits/PRs ni cambios de backend, IA real, persistencia o exportación.

Unidades comerciales y navegación completadas. Composición compacta verificada a 360/390/768/1440 px, texto real 100/200% y contenedor600: hero decorativo280 px, gráfica300 px y escenas395 px al100%; texto ampliado puede crecer. Se corrigieron targets44 px, contraste hover y fondos de controles sobre Canvas, sin cambiar el motor ni sus drivers.

Comprobaciones actuales: `npm run check` PASS; Strand44/44 (1,3 min); suite65/65 (1,6 min). Inspección visual del modelo sobre PNG y árbol AX/teclado disponibles; **no equivalen a revisión humana ni lector de pantalla real**. Registro: `docs/verification-renovacion-tyxx.md` y `openspec/changes/renovacion-tyxx-sistemas-ia/apply-progress.md`.

Pendientes: tarea8 conserva revisión humana NVDA/Narrator no ejecutada;10/11 conservan timeout histórico del puntero sin reparación causal, reservado a diagnóstico separado. Los pases actuales no cierran esos pendientes ni los tickets históricos03–05 del asistente. No declarar aceptación global ni publicar. Retomar desde el estado nativo SDD fresco, no desde los próximos pasos históricos de abajo. Los servidores temporales propios se cerraron; iniciar la vista con `Abrir TYXX.cmd` o `npm run dev`.

## Historia conservada — registros anteriores al 21 de septiembre

Los apartados siguientes preservan decisiones, resultados y próximos pasos de sus fechas; no sustituyen el estado actual anterior.

## 14 de septiembre de 2026 — acceso local recuperado y consulta sobre GitHub

El usuario indicó que la página no cargaba o mostraba el diseño anterior. Se reprodujo el rechazo de conexión en `127.0.0.1:4180`: el servidor estaba apagado. Además, el servidor local dirigía `/` a Portfolite. Ahora `/` sirve Strand, igual que `/strand.html`, y Portfolite permanece intacta en `/index.html`. No se cambió el contenido de ninguno de los diseños para esta corrección.

Se añadió `Abrir TYXX.cmd`, que usa `scripts/open-preview.ps1` para iniciar el servidor oculto si hace falta y abrir la URL actual. La ejecución repetida comprueba la respuesta y reutiliza el proceso. Los logs y el PID se guardan en `.sites-runtime/`, ignorado por Git. El servidor se dejó funcionando con este acceso, independiente de una terminal retenida; después de reiniciar Windows hay que volver a abrirlo. No es un servicio de inicio automático ni permite acceso desde otros dispositivos.

La vista actual se abrió y reconoció en el navegador integrado. La URL pública conserva la versión publicada anterior; no se publicó ni se guardó una versión nueva en Sites. El usuario todavía no respondió desde qué dispositivo/enlace estaba intentando verla, por lo que no se atribuye su intento concreto a un enlace determinado.

Validación del 14 de septiembre: inicio con el acceso de Windows correcto; segunda ejecución reutilizó el mismo PID; HTTP 200, ausencia de caché y `/` idéntica a `/strand.html`; los nueve archivos originales siguen intactos. Pasaron las comprobaciones estáticas y 29 de 30 pruebas en la primera ejecución. La comparación exacta de píxeles entre dos animaciones independientes era inestable por el avance de las ondas; se ajustó esa prueba para esperar las fuentes y comparar el aumento de luz cerca del puntero, con luz exterior estable. Pasó su ejecución dirigida (18,8 s), sin cambios en la animación de producción. No se repitió el resto de la suite después de ese ajuste de prueba.

El usuario preguntó si la página tenía repositorio en GitHub. Se comprobó `git remote -v`: existe únicamente `origin` en `git.chatgpt-team.site`, correspondiente a Sites. No hay un remoto GitHub configurado. Los últimos cambios permanecen locales; no se creó repositorio ni se hizo push.

## Pedido activo completado: segunda versión inspirada en Strand

El 2026-09-12 el usuario pidió otra versión como https://strand.framer.website/, incluyendo su animación. Se implementó como página independiente en `dist/strand.html`, con `dist/strand.css` y `dist/strand-motion.js`. La versión de Portfolite sigue intacta en `dist/index.html`; no se reemplazó ni se editó su código. Ambas comparten la configuración de contacto y los módulos originales del asistente.

- Nueva versión: `http://127.0.0.1:4180/strand.html`.
- Portfolite anterior: `http://127.0.0.1:4180/index.html` (también enlazada desde el pie de Strand). Desde el 14 de septiembre, `/` abre Strand.
- Estilo Strand: portada a la izquierda, bordes verticales finos, negro cálido, títulos grandes de peso fuerte, hilos/partículas a la derecha y escenas que acompañan los tres servicios al desplazarse.
- La animación es una recreación propia en Canvas del efecto observado, no el componente original del template. Tiene movimiento continuo, respuesta suave al puntero, cambios de forma entre escenas y pausa. Respeta movimiento reducido. En móvil, las escenas se pueden elegir con 01/02/03.
- Corrección posterior del mismo día: el usuario aclaró que faltaba el efecto original. Se reemplazó la superficie genérica por una silueta plegada con filamentos independientes, estelas curvas, pulsos y puntas luminosas con matices ámbar/azul. La interacción ahora empuja e ilumina las fibras cercanas con retorno elástico. Se inspeccionó el comportamiento público de Strand; el código, las curvas y el dibujo de TYXX siguen siendo propios.
- Se conservan tres servicios principales, web complementaria, demostraciones identificadas, asistente plegable, contacto de TYXX y FAQs. Sigue siendo una simulación guiada por reglas, sin persistencia ni exportación nueva.
- La entrega sigue local. No se publicó, no se hicieron commits ni push, no se guardaron versiones en Sites y no se modificó ni inició Taller Norte. La solicitud de panel de vista previa respondió `queued`; la revisión visual se realizó en una pestaña de Chrome.

La corrección de movimiento pasó las 28 pruebas existentes (18,6 s). Tras el ajuste visual final, pasaron las nueve pruebas específicas de Strand (26,0 s), incluida una prueba nueva de deformación localizada; el total de pruebas disponibles ahora es 29. La verificación estática recorre ambos HTML y sus recursos. El registro de comprobaciones y límites está en `docs/verification-strand.md`. Se volvió a contrastar la preservación de los nueve archivos originales por SHA-256 contra `docs/strand-preserved-files.json`, sin cambios. Los tickets 03/04 y los criterios restantes de 05 continúan pendientes; este pedido es una alternativa visual, no una elección definitiva entre los diseños.

## Versión Portfolite conservada

El usuario pidió menos texto, automatizaciones, sistemas de IA e infraestructura como oferta principal y webs como complemento. Confirmó explícitamente que la referencia es Portfolite, la página que abre https://portfolite.framer.website/, no Optirise. Este pedido posterior reemplaza la dirección Xpovio en los puntos visuales y de densidad de texto.

La adaptación está implementada localmente: portada centrada con imagen abstracta propia, tres tarjetas de servicios, dos demostraciones, proceso breve, tres preguntas frecuentes plegadas y contacto. Se conservaron los logos propios y la paleta negro/blanco/naranja. El asistente se muestra al abrir «Describir mi proceso», cualquiera de sus enlaces o `#asistente`. Cerrarlo no borra la ficha; recargar todavía sí. El modo simulado y sus límites se muestran antes de escribir.

Pasaron las comprobaciones estáticas y las 20 pruebas de navegador. Se revisaron portada, servicios y demos en escritorio y portada/apertura del asistente a 390 px. La suite comprueba también 360, 768 y 1440 px, teclado, texto al 200%, movimiento reducido y fallos de JavaScript. Se corrigió un desborde de la cabecera con texto ampliado. Evidencia y alcance en `docs/verification-portfolite.md`.

Entrega local en `http://127.0.0.1:4180/`, con el servidor abierto. El primer intento de mostrar la vista previa mediante el panel respondió `queued`; la revisión posterior sí abrió y observó una pestaña local mediante el navegador integrado. No se publicó, no se hicieron commits ni push y no se modificó ni inició Taller Norte. El teléfono autorizado sigue en `dist/config.js`.

El pedido directo adelanta parte comercial/visual de 05, sin registrar ni cerrar ese ticket como completo: falta reconciliar sus criterios de configuración/indisponibilidad de demo y detalles de contenido con la nueva brevedad solicitada. 03 (recuperación/borrado) y 04 (copia/WhatsApp con ficha) siguen pendientes. No se implementó persistencia ni exportación.

## Entrega anterior: tickets 01 y 02

El usuario invocó `implement` para los tickets 01 y 02 el 2026-09-12. Ambos están registrados individualmente en `.scratch/asistente-tyxx/issues/`, implementados, revisados y cerrados. Funcionan tres ejemplos, caso libre, ficha de seis campos, preguntas guiadas, omisiones, corrección de respuestas, edición directa y revisión de sugerencias. El modo es una simulación explícita mediante reglas, sin IA real. Ver `docs/asistente-tyxx.md`.

Las dos revisiones independientes y las evidencias de esa entrega se conservan en `docs/review-asistente-01-02.md` y `docs/verification-asistente-01-02.md`. El rediseño posterior conserva su comportamiento y vuelve a pasar las 20 pruebas.

La adaptación anterior a Xpovio se guardó como versión 2 sin publicar. Esa versión histórica no contiene el asistente ni el nuevo diseño Portfolite: no publicarla como si fuera esta entrega. La URL pública continúa en su versión anterior.

## Acuerdos de la nueva entrevista

El 2026-09-12 el usuario aceptó las cuatro recomendaciones de la primera ronda: pymes de servicios de Argentina; logos y paleta de Xpovio con portada ajustada; ficha progresiva junto a la conversación y debajo en móvil; borrador durante la sesión de la pestaña que resiste recargas, con borrado y sin historial permanente.

También aceptó las dos decisiones finales: proceso y dificultad como base útil, con herramientas y frecuencia opcionales y posibilidad de copiar una ficha incompleta identificada; ante casos abiertos, conservar lo escrito, pedir una aclaración concreta y dejar la mejora «Pendiente de evaluar con TYXX» cuando no exista fundamento. No quedan preguntas abiertas de la entrevista. Ver `.scratch/asistente-tyxx/discovery.md`.

La investigación confirmó la ubicación actual de los proyectos y no encontró IA configurada en TYXX. El nuevo documento prevé una simulación identificada en ese caso. Taller Norte tiene dos estados distintos: su enlace público conserva la vista previa simulada anterior; su copia local actual ya incluye recepción, registro, bandeja y persistencia SQLite, también con asistente simulado. La implementación nueva del taller no se publicó. La descripción comercial debe corresponder al destino realmente enlazado.

## Base del MVP anterior (histórica)

- Público: dueños de pymes de servicios de Argentina.
- Oferta visible: webs, automatizaciones, agentes de IA, sistemas de IA e infraestructura; cada proyecto requiere evaluar el alcance.
- Consulta inicial sin cargo; presupuesto a medida; mantenimiento opcional.
- TYXX dirige TYXX y es el contacto directo.
- Taller Norte aparece como proyecto demostrativo, con captura real y enlace. No es un cliente ni acredita resultados de negocio.
- Usar temporalmente el celular actual configurado en `dist/config.js`. La línea empresarial propia queda para después.
- Dirección visual de esa entrega: Xpovio, con contornos, líneas verticales y enlaces circulares. Fue reemplazada por Portfolite en el pedido activo completado.
- Acceso vigente: cualquier persona con el enlace puede abrir el MVP sin iniciar sesión. El usuario pidió este cambio después de la primera entrega privada. Se conserva `noindex, nofollow`.

## Archivos para retomar

- `README.md`: ejecución, estructura y cambio de número.
- `.agents/product-marketing.md`: contexto comercial.
- `.scratch/asistente-tyxx/spec.md`: especificación vigente completa; se implementaron únicamente 01 y 02.
- `.scratch/asistente-tyxx/desglose.md`: cinco entregas y dependencias; 01 y 02 cerradas, 03–05 pendientes.
- `.scratch/asistente-tyxx/ticket-drafts/`: borradores originales; 03–05 pendientes. Los registros vigentes de 01 y 02 están en `issues/`.
- `.scratch/asistente-tyxx/discovery.md`: entrevista cerrada del nuevo enfoque y asistente; prevalece sobre el alcance anterior en los puntos modificados.
- `.scratch/web-agencia/discovery.md`: entrevista y cambios de decisión.
- `.scratch/web-agencia/spec.md`: alcance implementado.
- `docs/verification-mvp.md`: comprobaciones y límites de la entrega.
- `.openai/hosting.json`: sitio de Sites asociado; reutilizar su `project_id`.

## Próximo paso

El bloque 01 + 02 y el rediseño Portfolite solicitado están completos. Cuando el usuario solicite los siguientes tickets, registrar e implementar 03 + 04 y reconciliar el alcance pendiente de 05 con el rediseño ya realizado, conservando sus registros individuales. 03 y 04 dependen de 02, ya resuelta; 05 depende de 01, ya resuelta. No volver a consultar el enfoque de pruebas ni las seis decisiones de producto aceptadas. No cambiar ni cerrar la especificación padre como si los cinco tickets estuvieran completos.

El servidor local se inicia con `npm run dev`; las pruebas con `npm test` usan dependencias de desarrollo propias de TYXX y Chrome. La página sigue siendo estática y no requiere compilación ni dependencias de producción. Si se solicita publicar en el futuro, preparar una nueva versión del estado final autorizado; la versión 2 guardada es anterior al asistente. El número empresarial sigue pendiente.

## Versión 2 preparada para publicar

- Versión guardada: `appgprj_6aa2ea16da148191832000cf241f216c~appgver_d52e855decc08191aa9f0e7fe45dfc44`.
- Fuente validada y enviada: `19cd962315e3bb683b7848df6662288a38686d57`.
- Archivo validado: `C:\Users\tomde\AppData\Local\Temp\tyxx-xpovio-20260910-01.tar.gz`; 13 archivos, salida estática y manifiesto.
- Acceso confirmado antes del guardado: `public`. Publicar con `deploy_site_version` cuando el usuario autorice; no cambiar la política de acceso.
- Previsualización: `http://127.0.0.1:4180/`, servidor retenido para revisión. Pestaña de Sites: `f868fce3-a36d-46c3-856b-14169e349e02`.
- Las comprobaciones estáticas y HTTP pasaron. No se hicieron pruebas de interacción o revisión visual del producto en navegador.
- Tras la publicación: comprobar estado terminal, abrir la URL pública en la misma pestaña, registrar el resultado y detener el servidor local.

## Primera entrega privada

- URL de revisión: https://tyxx-agencia.novartech.chatgpt.site
- Sites confirmó la publicación privada de la versión 1 el 10 de septiembre de 2026, a las 17:47 UTC.
- Fuente de esa entrega: `630c40925eb3144934f7e2b0cc97557cdc036005`.
- Se abrió la URL en la pestaña de vista previa de esta tarea. Esta primera entrega fue privada; el acceso se amplió posteriormente por pedido del usuario.
- Las comprobaciones ejecutadas fueron estáticas y de recursos HTTP locales; no se realizaron pruebas interactivas o visuales de navegador.

## Acceso por enlace confirmado

El usuario pidió «Hazlo solo visible para aquellos que tengan el link». El 10 de septiembre de 2026 a las 17:52 UTC se cambió la política de Sites a `public`, que permite visitar el sitio a cualquier persona con su URL, sin modificar editores ni invitaciones. Una petición HTTP sin sesión recibió la página de TYXX con estado 200 y conservó `noindex, nofollow`. La indicación de no indexar no constituye una restricción de acceso: el enlace se puede reenviar.

Al retomar, comprobar el estado real de archivos y publicación antes de editar. Actualizar este documento si cambian decisiones, verificaciones o pendientes.
