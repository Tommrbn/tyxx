# Asistente de TYXX: conversación y ficha

Entrega local de los tickets 01 y 02. La simulación se identifica antes de escribir; no hay proveedor, modelo, claves, backend ni peticiones de interpretación a la red. La ficha y sus correcciones funcionan realmente.

## Recorrido disponible

Desde la portada o la navegación se llega al asistente integrado. En escritorio, conversación y ficha aparecen en dos columnas; hasta 900 px se apilan. Los ejemplos son «Copio pedidos a una planilla», «Me llegan consultas incompletas» y «Pierdo tiempo buscando información». También se puede escribir un caso abierto.

La demostración hace una pregunta por vez sobre proceso, dificultad, herramientas o frecuencia. Se pueden omitir datos con «Dejar este dato pendiente» o una respuesta breve como «No sé». Proceso y dificultad dan una base para conversar; sin alguno de ellos la ficha se identifica como incompleta. No se requiere identidad, contacto, cuenta ni presupuesto.

Las reglas reconocen algunos verbos de tarea, expresiones explícitas de dificultad, herramientas y frecuencias comunes. Admiten también etiquetas como `Proceso:`, `Dificultad:`, `Herramientas:` y `Frecuencia:`, separadas por saltos o punto y coma. No comprenden todo el lenguaje natural: ante texto ambiguo conservan las palabras y piden una tarea concreta. Un campo puede completarse directamente para describir cualquier caso. No deducen una solución por haber visto una palabra aislada.

Los bloques etiquetados conservan las líneas y puntuación hasta la siguiente etiqueta. En los casos reconocidos se separan herramientas y frecuencia de la tarea para que no queden duplicados obsoletos al corregirlos. El mensaje original permanece íntegro en la conversación. Si una descripción escrita explícitamente todavía menciona un dato anterior después de editar herramientas o frecuencia, se muestra un pendiente de revisión y se retira la sugerencia automática. Editar esa descripción permite resolver el aviso conservando el control sobre sus palabras.

Las sugerencias condicionales cubren traslado repetitivo de pedidos/datos, consultas incompletas y búsqueda de información cuando proceso y dificultad aportan fundamento. Admiten alternativas sin IA; no prometen ahorros, conectores, precios, plazos o contrataciones. Otros casos quedan como «Pendiente de evaluar con TYXX». La Mejora propuesta es orientativa y no es una Propuesta comercial.

## Correcciones y fuente vigente

Se puede corregir cada respuesta anterior o editar los seis campos. La ficha muestra los datos vigentes; la conversación es un registro explícitamente identificado, con las respuestas corregidas y las ediciones manuales. Una corrección es una acción nueva: sus datos explícitos prevalecen. Los datos que pertenecían exclusivamente a la respuesta reemplazada se retiran; los campos modificados después por la persona se conservan cuando la corrección no aporta un reemplazo explícito.

Una respuesta normal completa campos pendientes y no sustituye una edición manual, incluso cuando se dejó vacía. Cambiar proceso o dificultad vuelve a evaluar la sugerencia automática. Una mejora editada por la persona se conserva y recibe un aviso de revisión cuando cambia su fundamento; una mejora borrada manualmente sigue pendiente. Editar la mejora confirma su revisión. Los pendientes obligatorios y este aviso permanecen visibles aunque se editen las dudas adicionales.

Se preservan acentos, saltos y marcado como texto mediante `textContent` y valores de textarea. Cada entrada o campo admite hasta 12.000 caracteres; el rechazo conserva el texto para ajustarlo. Los envíos vacíos o duplicados no agregan turnos. No se introducen pausas artificiales.

## Responsabilidades y contrato de interpretación

- `assistant-model.js` expone `createAssistant({ interpret })` con `snapshot()`, `answer(message)`, `correct(index, message)` y `edit(field, value)`. Coordina la ficha, procedencia de datos, pendientes, preguntas y correcciones. Los snapshots son copias; la presentación no mantiene otra ficha.
- `assistant-view.js` consume el coordinador, ofrece editores con foco predecible y anuncia solo cambios recientes en una región de estado. El historial completo no es una región viva.
- `assistant-simulator.js` implementa `simulateTurn(input)`, la estrategia síncrona predeterminada. Se puede sustituir en el punto real de construcción del coordinador, sin sustituir los controles de la ficha.
- `assistant-loader.js` carga los módulos de forma independiente. Si no hay JavaScript o un módulo falla, se mantiene la explicación de indisponibilidad y el correo tyxxsolve@gmail.com legible con enlace mailto estático.

Entrada de la estrategia: `{ message, target, values }`. `target` es `process`, `difficulty`, `tools`, `frequency` o `null`; `values` contiene la ficha vigente. Con `message: ''` se revisa una sugerencia después de modificar su fundamento. Se entrega una copia para evitar que la estrategia mute el estado.

Salida: `{ facts, unknowns, suggestion }`. `facts` solo admite las cuatro claves de hechos con valores de texto; `unknowns` es una lista de esas mismas claves. `suggestion` es `null` o `{ text, basis: { process, difficulty } }`. El coordinador valida tipos, claves y longitudes antes de aceptar los hechos. Una sugerencia se utiliza solo si su fundamento coincide con los valores vigentes. La estrategia no controla etiquetas, modo, HTML, configuración, exportación ni efectos externos.

Las operaciones de conversación se validan antes de cambiar el estado: una salida inválida no deja una ficha parcialmente modificada y conserva la entrada para reintentar. La edición manual permanece disponible incluso si la estrategia falla; en ese caso no genera una mejora automática.

## Integración futura de IA, todavía sin implementar

Para un modo real harían falta proveedor, modelo y credenciales propios de TYXX expresamente configurados y autorizados. La llamada se haría desde un servidor; el navegador jamás recibe claves ni usa credenciales de otra aplicación. El modo debe indicarse explícitamente y comunicar el tratamiento de datos antes de escribir.

El contrato es una separación existente, no una conexión a un proveedor. Una futura estrategia de servidor necesitará una operación asíncrona con tiempo límite, estado pendiente, protección contra respuestas tardías y cancelación o reintento sin pérdida de texto. La aplicación seguirá validando la respuesta como datos no confiables, comprobará el fundamento de la sugerencia y conservará autoridad sobre las ediciones, la ficha y su futura exportación. Un modo real mal configurado debe mostrar un error, nunca cambiar silenciosamente a simulación.

No se implementaron ni verificaron estas llamadas de servidor. Las pruebas de fallo sustituyen la estrategia en su límite de carga del navegador con una respuesta inválida; no consumen una API de IA.

## Límites de esta entrega

Los datos viven en memoria de la pestaña. Se puede navegar por secciones sin perderlos, pero se pierden al recargar. La persistencia y borrado son el ticket 03; la copia y exportación de la ficha por correo siguen pendientes en 04 (el canal telefónico original está retirado); el reposicionamiento completo y las tarjetas de demostraciones son 05. No hay controles inactivos que aparenten ofrecerlos. No se cambió ni inició Taller Norte y no se publicó TYXX.
