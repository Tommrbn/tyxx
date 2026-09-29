# Descubrimiento: enfoque en procesos y asistente de TYXX

> Nota de privacidad (2026-09-23): identidad personal anonimizada; contacto anterior retirado. El contacto vigente es tyxxsolve@gmail.com. Las menciones del canal anterior describen decisiones o pruebas de su fecha, no una verificación del correo actual.

Estado: entrevista cerrada; ambas rondas aceptadas y entendimiento confirmado. Actualizado: 2026-09-12. Especificación publicada en el tracker local como `spec.md`, con etiqueta `ready-for-agent`; implementación no iniciada.

## Fuentes y alcance de esta fase

- Documento aportado: `C:\Users\tomde\.codex\attachments\1213658a-f6d1-4d05-8678-111544b1e315\pasted-text.txt`.
- El usuario primero pidió leerlo sin ejecutar sus instrucciones, consultó `ask-matt` y después invocó `grill-with-docs` para resolver las decisiones pendientes.
- Esta fase autoriza entrevista, investigación de hechos y documentación. No autoriza implementar, publicar, contratar servicios, enviar mensajes reales, hacer commits ni push.
- Conservar la versión 2 previa como referencia; la entrevista no aprueba su publicación.

## Base del documento

- Actividad central: automatizaciones, sistemas de IA, asistentes conectados, integraciones e infraestructura. Las webs cumplen el papel de interfaz cuando la solución la necesita.
- Objetivo comercial: que un visitante describa el proceso que quiere mejorar.
- CTA principal hacia el asistente; demostraciones como acción secundaria; contacto comercial autorizado disponible.
- Dos demostraciones diferenciadas: Taller Norte, sujeto a comprobar su funcionamiento real, y el asistente de TYXX.
- El asistente hace una pregunta por vez, aprovecha datos ya aportados, permite corregir y genera una ficha editable que se puede copiar o preparar para enviar.
- La ficha contiene proceso, dificultad, herramientas, frecuencia informada, mejora propuesta e información pendiente.
- No inventar clientes, experiencia, métricas, cotizaciones, integraciones ni compromisos. Una mejora propuesta no es una propuesta comercial.
- Usar IA real solamente si existe proveedor configurado y autorizado para este proyecto; en caso contrario, simulación reproducible identificada con claridad.
- Mantener independencia de Taller Norte, sin modificar su proyecto.

## Hechos comprobados

- Investigación de solo lectura de `tyxx_discovery_facts` (2026-09-11): TYXX está en `C:\agencia\webs\tyxx`. La ruta `C:\emp\tyxx` no existe. La arquitectura es HTML, CSS y JavaScript estático editable en `dist`, sin dependencias ni backend.
- No se encontró integración ni variables de IA en el código/configuración de TYXX examinados. No hay evidencia de un proveedor configurado y autorizado en este proyecto. Por la regla del documento, la primera entrega será una simulación claramente identificada, con integración futura documentada; no se incorporan proveedores o credenciales de otras aplicaciones.
- Hallazgo inicial de Taller Norte, posteriormente actualizado: la revisión de `tyxx_discovery_facts` encontró en `C:\agencia\webs\chapas\tyxx-chapas` Vite y TypeScript, un recorrido de vehículo/daño y vista previa editable, con bloque comercial de WhatsApp. No había bandeja, persistencia ni IA en aquella revisión. No usar este hallazgo como descripción del código local actual; ver la actualización siguiente.
- Verificación independiente de `verify_taller_demo_url` (2026-09-12): una petición HTTP anónima a `https://tyxx-chapas.pages.dev/` respondió 200, sin redirección, título `Taller Norte — Chapa y Pintura`. El HTML declara sitio de demostración, marca ficticia y simulación que no se envía al taller. Esto verifica disponibilidad e identidad; no acredita funcionamiento interactivo.

### Actualización durante `to-spec`

La copia local de Taller Norte recibió una implementación posterior, documentada el 2026-09-12. La continuidad actual, las rutas de API, el almacén SQLite y las pruebas revisadas confirman recepción guiada, ficha corregible, registro y bandeja con seguimiento y persistencia. Su asistente sigue siendo una simulación; existe un adaptador futuro de IA que no se activó. No se utilizaron credenciales ni se ejecutaron pruebas o mutaciones del taller para esta especificación.

La continuidad del taller declara que esa entrega es solo local y que la URL pública conserva la web estática anterior. La tarjeta de TYXX debe describir lo accesible en el destino elegido: el enlace público actual permite probar la vista previa simulada; no anunciar allí la bandeja local. El nuevo hallazgo cambia la descripción del estado, sin ampliar el alcance de TYXX ni autorizar publicación del taller.

## Ronda 1 — Aceptada el 2026-09-12

Respuesta del usuario: «acepto las recomendaciones».

1. Público: pymes de servicios de Argentina. Ejemplos de consultas, documentos y tareas administrativas. Taller Norte es una demostración, sin limitar TYXX al sector automotor.
2. Diseño: conservar logos, negro, blanco y naranja; títulos expresivos y animaciones discretas. Ajustar la portada para que se comprendan enseguida la oferta y el acceso al asistente.
3. Ficha progresiva visible: conversación a la izquierda y ficha a la derecha en computadora; ficha debajo en celular. Campos pendientes identificados como «Todavía no informado». Corrección sin reiniciar.
4. Borrador limitado a la sesión de la pestaña, incluyendo recargas; botón «Borrar conversación». Sin cuenta ni historial permanente. Copiar la ficha o preparar el mensaje permite conservar el resultado fuera de esa sesión.

## Ronda 2 — Aceptada el 2026-09-12

Respuesta del usuario: «acepto las recomendaciones», después de presentar estas dos decisiones como las restantes para cerrar el comportamiento del asistente. Esta aceptación cierra el entendimiento de la entrevista.

5. Información mínima: el proceso que realiza la persona y la dificultad que encuentra constituyen la base útil para el primer contacto. Herramientas y frecuencia pueden quedar pendientes. Permitir copiar una ficha incompleta, identificándola como tal e indicando qué habría que aclarar.
6. Casos abiertos y límite de la simulación: conservar lo escrito por el visitante y pedir una aclaración concreta si falta contexto. Si no hay fundamento para proponer una mejora, indicar «Pendiente de evaluar con TYXX» y preparar la ficha para revisión. No inventar soluciones ni recomendar IA por defecto.

## Comportamientos ya exigidos por el documento

- Hacer una pregunta por vez y aprovechar la información aportada; no solicitar de nuevo un campo inequívocamente informado.
- Mantener las correcciones del visitante al continuar la conversación. Si cambian los datos base, revisar o retirar una mejora propuesta que ya no corresponda.
- Se puede editar la ficha, copiarla y preparar un mensaje; el usuario decide si lo envía. WhatsApp actual ya autorizado, configurable.
- Distinguir preparación de un mensaje, envío por el visitante y recepción efectiva. No afirmar que TYXX recibió una ficha por un clic.
- Exponer el modo simulado y el tratamiento local del borrador; no representar respuestas por reglas como IA real.
- Alcance local y pruebas de navegación, móvil, teclado, conversación, corrección, ficha, copia, fallos y reintentos según el documento.

## Cierre

Las seis decisiones de las dos rondas fueron aceptadas. La frontera de preguntas está vacía: no quedaron decisiones de producto pendientes para redactar una primera especificación. Las elecciones menores de implementación se resolverán con criterio dentro del alcance acordado, según el documento del usuario.

Se conserva la base del sitio existente y se reorienta el recorrido hacia describir un proceso, preparar una ficha y decidir si se contacta a TYXX. El primer asistente será simulado y declarado como tal; la creación, edición y copia de la ficha deberán funcionar realmente. Taller Norte se presentará con su recorrido comprobado y sus límites.

La fase `/to-spec` produjo la especificación local con 52 historias de usuario, decisiones de implementación y 23 criterios de aceptación. El 2026-09-12 el usuario respondió «confirmo» al enfoque de pruebas del recorrido integrado desde la página local, incluyendo móvil, teclado, correcciones y copia. La especificación y su enfoque de verificación están cerrados, con etiqueta `ready-for-agent`. Próxima fase recomendada: `/to-tickets`; la implementación y los efectos externos no se ejecutan por guardar o confirmar la especificación.
