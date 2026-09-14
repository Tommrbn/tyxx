# TYXX — Página comercial y Asistente de TYXX

Status: ready-for-agent
Fecha: 2026-09-12
Versión: 1
Origen: documento del usuario y dos rondas aceptadas de `grill-with-docs`.
Enfoque de pruebas: confirmado por el usuario el 2026-09-12.
Entrega prevista: local. Esta especificación no autoriza implementación, publicación, compras, mensajes reales, commits ni push.

## Actualización posterior de dirección visual

El 2026-09-12 el usuario pidió una página con menos texto y confirmó Portfolite (https://portfolite.framer.website/) como referencia. Se implementó ese rediseño local con tres áreas principales y web complementaria; la dirección nueva prevalece sobre Xpovio y la extensión editorial anterior. El asistente comienza plegado y sus enlaces lo abren sin reiniciar la ficha. Ver `docs/verification-portfolite.md`. La especificación padre sigue abierta: 01 y 02 están completos, 03 y 04 pendientes y 05 parcialmente adelantado.

## Problem Statement

Tomás necesita presentar su trabajo de automatización de procesos, sistemas y asistentes de IA, integraciones e infraestructura a dueños y responsables de pymes de servicios de Argentina. El sitio existente organiza la oferta en cinco líneas, con las webs en primer plano, y conduce directamente a WhatsApp. No permite que un visitante describa su proceso y prepare información útil antes de conversar.

TYXX está comenzando y no tiene clientes, testimonios, experiencia profesional ni resultados comerciales acreditados que pueda utilizar como prueba. Necesita explicar aplicaciones concretas y mostrar demostraciones cuyo funcionamiento y límites se puedan comprobar. La persona interesada debe entender qué puede evaluar con Tomás y preparar una consulta incluso cuando todavía desconoce sus herramientas, frecuencia o solución técnica.

## Solution

Adaptar el sitio existente a una página comercial con navegación por secciones y un Asistente de TYXX integrado. La oferta se presenta desde los problemas del negocio; las webs aparecen como interfaz de una solución cuando corresponde. Se mantienen los logos propios, negro, blanco y naranja, con una portada más directa y espacio suficiente para la conversación y la Ficha de proceso.

El recorrido principal es: comprender la oferta → entrar al asistente → describir un proceso → aclarar información relevante → revisar y corregir la ficha → copiarla o preparar voluntariamente un mensaje para Tomás. El contacto directo continúa disponible para quien prefiera conversar sin completar la demostración.

La primera versión del asistente será una simulación reproducible, identificada como tal, porque no se acreditó un proveedor de IA configurado y autorizado en este proyecto. La ficha, sus correcciones, conservación durante la sesión y exportación funcionarán realmente. El resultado reconoce información pendiente y no promete integraciones, ahorros, cotizaciones ni contrataciones.

Taller Norte constituye la segunda demostración, con una descripción vinculada al destino que efectivamente se pueda abrir. La versión pública y la implementación local del taller son distintas; sus capacidades no se presentarán como intercambiables.

## User Stories

1. Como responsable de una pyme de servicios, quiero comprender que TYXX trabaja con automatización e IA, para evaluar si puede ayudarme con mis procesos.
2. Como visitante, quiero reconocer problemas de mi trabajo en ejemplos concretos, para explorar una mejora sin conocer términos técnicos.
3. Como visitante, quiero entender para qué sirven automatización, asistentes e infraestructura, para relacionar esas capacidades con mi necesidad.
4. Como visitante, quiero que las webs se expliquen como posibles interfaces de una solución, para comprender el enfoque de TYXX.
5. Como visitante, quiero acceder al asistente desde la portada y la navegación, para describir el proceso que quiero mejorar.
6. Como visitante, quiero acceder a las demostraciones desde una acción secundaria, para probar antes de iniciar una conversación.
7. Como visitante, quiero recorrer las secciones y volver al inicio sin perder mi borrador, para consultar el contenido mientras preparo mi caso.
8. Como visitante, quiero conocer a Tomás como responsable de TYXX, para saber con quién voy a hablar.
9. Como visitante, quiero entender las etapas de trabajo y la posibilidad de comenzar por algo acotado, para anticipar cómo se evaluaría un proyecto.
10. Como visitante, quiero distinguir la consulta inicial de una Propuesta comercial, para entender que la ficha no es un presupuesto ni una contratación.
11. Como visitante, quiero encontrar respuestas sobre conocimientos técnicos, costos, herramientas actuales, plazos y mantenimiento, para resolver dudas antes del contacto.
12. Como visitante, quiero ver las demostraciones identificadas como tales, para no confundirlas con clientes o resultados comerciales.
13. Como visitante de Taller Norte, quiero saber qué problema ilustra y qué recorrido permite el enlace, para decidir qué voy a probar.
14. Como visitante, quiero entender el papel del conductor y el del responsable del taller, para distinguir la recepción de una consulta de su atención real.
15. Como visitante, quiero que el destino público de Taller Norte describa exactamente la vista previa simulada disponible, para no esperar funciones que están únicamente en la versión local.
16. Como visitante, quiero recibir una explicación si la demo no tiene un destino válido, para evitar un enlace vacío o inexistente.
17. Como visitante del Asistente de TYXX, quiero conocer su objetivo, sus límites y su modo simulado antes de escribir, para decidir si quiero utilizarlo.
18. Como visitante, quiero empezar con «Copio pedidos a una planilla», para explorar una tarea repetitiva habitual.
19. Como visitante, quiero empezar con «Me llegan consultas incompletas», para explorar cómo describir un problema de recepción de información.
20. Como visitante, quiero empezar con «Pierdo tiempo buscando información», para explorar una dificultad vinculada a documentos.
21. Como visitante, quiero escribir un caso propio sin elegir un ejemplo, para describir mi situación con mis palabras.
22. Como visitante, quiero recibir una pregunta por vez, para responder sin enfrentar un interrogatorio extenso.
23. Como visitante, quiero que el asistente aproveche los datos que ya expresé claramente, para no repetir la misma información.
24. Como visitante, quiero que solo se pregunte por mi tarea, dificultad, herramientas y frecuencia relevantes, para concentrarme en el proceso.
25. Como visitante, quiero poder indicar que desconozco herramientas o frecuencia, para continuar sin inventar respuestas.
26. Como visitante, quiero ver la ficha completarse con mis respuestas, para comprobar qué entendió la demostración.
27. Como visitante, quiero identificar los campos no informados, para distinguir mis datos de suposiciones del asistente.
28. Como visitante, quiero corregir respuestas anteriores, para ajustar mi caso sin reiniciar la conversación.
29. Como visitante, quiero editar directamente todos los campos de la ficha, para tener control sobre lo que compartiría con Tomás.
30. Como visitante, quiero que mis correcciones se conserven al continuar, para evitar que reaparezca información que ya cambié.
31. Como visitante, quiero que se revise una mejora que dejó de corresponder después de una corrección, para no compartir una conclusión basada en datos anteriores.
32. Como visitante, quiero ver una Mejora propuesta separada de los hechos que conté, para comprender que requiere evaluación.
33. Como visitante, quiero ver qué falta conocer antes de implementar, para preparar una conversación útil y realista.
34. Como visitante con un caso ambiguo, quiero que se conserve mi texto y se pida una aclaración concreta, para que la simulación no invente mi situación.
35. Como visitante, quiero poder recibir «Pendiente de evaluar con Tomás», para avanzar aun cuando no haya fundamento para sugerir una mejora.
36. Como visitante, quiero que una solución sencilla pueda plantearse sin IA, para que la recomendación dependa de mi proceso.
37. Como visitante, quiero copiar una ficha parcial identificada como incompleta, para consultar con lo que sé hasta el momento.
38. Como visitante, quiero copiar la versión actual de la ficha, para conservar exactamente mis últimas correcciones.
39. Como visitante, quiero saber si la copia funcionó y tener una alternativa manual si falla, para no perder mi resultado.
40. Como visitante, quiero preparar un mensaje para Tomás con mi ficha, para revisar su contenido antes de decidir enviarlo.
41. Como visitante, quiero contactar directamente a Tomás con el medio autorizado, para conversar sin estar obligado a completar el asistente.
42. Como visitante, quiero conservar conversación y ficha al recargar esa pestaña, para continuar ante una recarga accidental.
43. Como visitante, quiero borrar la conversación y la ficha con una acción explícita, para comenzar un caso nuevo.
44. Como visitante, quiero recibir un aviso si el navegador no puede conservar el borrador y seguir trabajando, para poder copiarlo antes de salir.
45. Como visitante en celular, quiero conversar y revisar la ficha sin desbordamientos ni controles inaccesibles, para completar el recorrido cómodamente.
46. Como visitante que usa teclado, quiero operar navegación, conversación, edición, copia y borrado con foco visible y orden lógico, para utilizar todas las funciones.
47. Como visitante que usa tecnologías de asistencia, quiero etiquetas, regiones y avisos comprensibles, para reconocer preguntas, errores y cambios de estado.
48. Como visitante sensible al movimiento, quiero que las animaciones respeten mi preferencia, para leer y usar la página sin molestias.
49. Como visitante, quiero mensajes de error y reintentos que preserven mis datos, para recuperarme de fallos sin empezar otra vez.
50. Como Tomás, quiero cambiar el contacto, la URL de la demo y su descripción de capacidades desde una configuración clara, para mantenerlos coherentes.
51. Como responsable de mantenimiento, quiero una separación sencilla entre conversación, ficha y proveedor, para poder integrar IA desde servidor sin rehacer el recorrido.
52. Como Tomás, quiero recibir la página local, instrucciones y evidencia de verificación, para entender qué funciona, qué está simulado y qué falta antes de publicar.

## Implementation Decisions

1. **Continuidad del proyecto.** Extender el sitio estático existente de TYXX, conservando su identidad, recursos, scripts y alojamiento asociado. No crear otra copia por las rutas antiguas del documento ni alterar el proyecto del taller. La especificación nueva prevalece sobre la del MVP anterior en oferta, recorrido y demostraciones.

2. **Página y contenido.** Una página con portada, problemas y soluciones, demostraciones, asistente integrado, proceso de trabajo, presentación de Tomás, preguntas frecuentes y contacto. Conservar o adaptar las capacidades existentes que siguen siendo pertinentes; no añadir páginas, campañas ni formularios comerciales adicionales.

3. **Portada.** Usar como punto de partida «Automatización e inteligencia artificial aplicada a tu empresa» y la explicación en primera persona de analizar el trabajo y desarrollar soluciones para reducir tareas manuales, organizar información y conectar herramientas. CTA principal «Contame qué proceso querés mejorar», hacia el asistente; secundario «Ver demostraciones». La redacción final puede mejorar manteniendo el significado y el voseo.

4. **Aplicaciones y forma de trabajo.** Explicar las cuatro situaciones del documento como posibilidades a evaluar: consultas completas, traslado repetitivo de datos, búsqueda y preparación de respuestas en documentos, y registro de solicitudes que necesitan atención. Proceso: entender el trabajo, definir un alcance y cómo comprobar su utilidad, implementar y probar, acordar puesta en marcha y mantenimiento. Consulta inicial sin cargo, presupuesto por alcance y costos externos identificados; no inventar paquetes ni resultados.

5. **Composición y accesibilidad.** Mantener logos propios y paleta negra, blanca y naranja, con tipografía legible, espacios amplios y animaciones discretas. La portada debe dejar clara la oferta y el acceso al asistente. En escritorio, conversación y ficha en dos columnas; en móvil, ficha debajo. La ficha será una región accesible identificada, sin depender de un chat flotante pequeño. Reutilizar el menú móvil y las preferencias de movimiento existentes.

6. **Modo inicial.** Implementar una simulación determinista con reglas y ejemplos, sin llamadas a un proveedor. Mostrar una indicación visible equivalente a «Demostración guiada: funciona con reglas, no con IA real». Explicar que el contenido de la conversación y la ficha permanece en el navegador en este modo; preparar un enlace de contacto es una acción distinta y voluntaria.

7. **Responsabilidad del módulo del asistente.** Concentrar en una interfaz coherente el inicio, el avance de la conversación, la corrección, la ficha actual, los pendientes y el reinicio. La presentación consume ese estado; no mantiene una segunda ficha que pueda divergir. Aprovechar la configuración de contacto y los controles existentes, evitando un motor genérico de agentes o abstracciones innecesarias.

8. **Inicio y avance.** Ofrecer los tres ejemplos acordados y entrada libre. Hacer una pregunta relevante por turno. Reconocer solamente información que las reglas puedan identificar de forma inequívoca; ante ambigüedad, conservar lo escrito y pedir aclaración. No prometer comprensión general del lenguaje. Los campos editables constituyen una vía real para completar cualquier caso que la simulación no interprete.

9. **Datos mínimos y preguntas opcionales.** Proceso y dificultad son la base útil de la ficha. Herramientas y frecuencia pueden omitirse o marcarse como desconocidas. Un campo pendiente no se completa con una suposición. No exigir nombre, email, presupuesto o teléfono del visitante para probar o copiar la demostración. No bloquear indefinidamente a quien no pueda aclarar un campo: permitir conservar la ficha parcial y sus pendientes.

10. **Correcciones y fidelidad.** Permitir volver a una respuesta o editar la ficha. La corrección explícita más reciente prevalece sobre valores anteriores y sugerencias. Mantener acentos, saltos de línea y caracteres del usuario como texto. Si cambia la tarea o la dificultad, revisar o retirar una Mejora propuesta incompatible y actualizar los pendientes. Los valores introducidos manualmente no se sobrescriben al avanzar sin una nueva corrección explícita.

11. **Ficha de proceso.** Contiene proceso actual, dificultad descrita, herramientas mencionadas, frecuencia informada, Mejora propuesta y aspectos pendientes. Mostrar «Todavía no informado» donde corresponda. Los campos editables son la fuente de la exportación; «incompleta» identifica la falta de proceso o dificultad, mientras herramientas y frecuencia pueden seguir pendientes sin impedir una consulta inicial. El rótulo de la Mejora propuesta mantiene visible que requiere evaluación, aunque el visitante edite su texto.

12. **Límites de las sugerencias.** Asociar propuestas condicionales solo con hechos respaldados por el caso. Puede corresponder evaluar un formulario, una conexión basada en reglas o una mejor organización de información, sin IA. Ante falta de fundamento, usar «Pendiente de evaluar con Tomás». No prometer disponibilidad de conectores, precisión, ahorro, precio, plazo, contratación ni puesta en marcha.

13. **Exportación y contacto.** Copiar una representación de texto legible con títulos de campo, valores actuales, información pendiente y carácter propuesto de la mejora. Incluir contenido parcial cuando exista, sin exigir completar todos los campos. Preparar WhatsApp con esa misma ficha y el contacto ya autorizado; abrirlo únicamente por acción del visitante. No marcar una consulta como recibida ni un mensaje como enviado. Si el contacto está ausente o es inválido, mantener la copia y una indicación clara de contacto no configurado, sin enlaces rotos. Si preparar o abrir un mensaje falla, conservar la ficha y ofrecer copia.

14. **Borrador de sesión.** Guardar conversación, ficha, pendientes y progreso mediante almacenamiento de sesión de la pestaña. Restaurar tras recarga y no crear cuentas, historial permanente ni sincronización entre dispositivos. Usar una versión de formato para reconocer borradores incompatibles. «Borrar conversación» elimina el borrador propio del asistente y reinicia su estado; no borra datos de otras herramientas. Comunicar la duración como sesión del navegador, sin prometer eliminación irrecuperable ante funciones de restauración del navegador.

15. **Errores y recuperación.** Ignorar envíos vacíos mostrando orientación junto al control. Evitar dobles avances por envíos repetidos durante una operación. Si falla el almacenamiento, seguir en memoria y avisar que la recarga no conservará el trabajo. Si el borrador es ilegible o incompatible, explicar que no pudo recuperarse y permitir iniciar uno nuevo. Si falla el portapapeles, no mostrar éxito: ofrecer reintento y texto seleccionable. No añadir esperas artificiales ni animaciones de procesamiento que sugieran IA en la simulación.

16. **Preparación para IA futura.** Definir un contrato pequeño de entrada y salida entre el coordinador del asistente y la estrategia que interpreta el turno: estado y mensaje actuales como entrada; información reconocida, incertidumbres y sugerencia condicionada como salida validable. La validación, edición, conservación y exportación de la ficha siguen siendo responsabilidad de la aplicación. Entregar un punto de sustitución real para la simulación y documentar el futuro límite de servidor, configuración explícita de modo, proveedor y modelo, validación de respuestas, timeout y error recuperable. Esta entrega no necesita un backend ni SDK solo para anticipar esa integración. No presentar una integración documentada como IA conectada o comprobada.

17. **Condiciones para activar IA.** Una futura activación necesita proveedor y credenciales propios configurados y autorizados para TYXX. Las llamadas y secretos estarán en servidor; el navegador no llamará directamente al proveedor ni recibirá claves. La interfaz deberá indicar el cambio de tratamiento de los datos. Un modo real mal configurado no debe fingir funcionamiento ni cambiar silenciosamente a simulación. La activación y su validación real son posteriores a esta especificación local.

18. **Taller Norte y destino verificable.** Mantener configurable tanto la dirección como la descripción asociada al destino. Por defecto usar la dirección pública comprobada, explicando el recorrido disponible allí: vehículo y daño, validación y vista previa simulada editable, sin envío al taller. Explicar que el responsable evalúa cómo recibiría mejor información y dispone del recorrido comercial de esa versión; no anunciar una bandeja pública. La copia local más reciente sí incluye recepción, registro, bandeja y persistencia, pero no está desplegada. Si en una revisión se configura otro destino, comprobarlo antes de describir sus capacidades. No ejecutar ni publicar el taller como efecto de abrir TYXX.

19. **Configuración, compatibilidad y entrega.** Conservar un único lugar claro para contacto y destino de demo, admitiendo estados sin configuración. La simulación debe funcionar con la arquitectura estática existente. Usar módulos nativos y dependencias nuevas solo cuando una necesidad concreta de ejecución o pruebas lo justifique. Mantener contenido comercial y contacto legibles si el asistente no se inicializa, con una explicación de indisponibilidad. Conservar la indicación de no indexar del MVP.

20. **Sin efectos externos.** La conversación simulada no crea registros en TYXX, en Taller Norte ni en servicios de terceros. No usar credenciales, datos ni bases de otras aplicaciones. Todo texto del visitante se renderiza como texto, sin ejecutar marcado o instrucciones que pueda contener. Una clave escrita accidentalmente en la ficha no se convierte en configuración.

## Testing Decisions

### Punto de prueba y criterio

El punto principal es el recorrido completo desde la interfaz pública de la página local: entradas del visitante, contenido visible, foco, resultado copiado, destino preparado y comportamiento tras recarga. Un buen test expresa una necesidad y comprueba un resultado observable; no depende de nombres privados de funciones, estructura interna del estado, selectores decorativos o capturas de toda la implementación.

La cobertura se apoya en la verificación pedida explícitamente en el documento original. El usuario confirmó el 2026-09-12 el enfoque de recorrido completo desde la página local, incluyendo móvil, teclado, conversación, correcciones, ficha y copia. La respuesta fue «confirmo». Se elige este límite alto para verificar conjuntamente conversación, corrección y ficha, reduciendo pruebas duplicadas entre módulos. No queda pendiente otra confirmación de este enfoque para desglosar la especificación.

### Antecedentes y módulos cubiertos

- El proyecto TYXX ya tiene comprobaciones estáticas de sintaxis, configuración, recursos, anclas, identificadores y atributos de imágenes. Se conservarán y adaptarán para aceptar contacto o demo ausentes de forma intencional; no sustituyen pruebas de interacción.
- Taller Norte tiene antecedentes de pruebas de navegador con Playwright para conversación, ficha, correcciones, teclado y distintos anchos. Sirven como referencia de enfoque, sin importar su flujo de registro, modificar su proyecto ni depender de su base o servidor para verificar TYXX.
- La nueva cobertura integrada atraviesa navegación, Asistente de TYXX, Ficha de proceso, sesión y exportación. No requiere pruebas unitarias repetidas de cada función interna. Los fallos de portapapeles y almacenamiento se ejercitan en esos límites del navegador; la futura interfaz de proveedor puede recibir respuestas controladas sin consumir una API real.

### Criterios de aceptación comprobables

| ID | Escenario | Resultado esperado |
| --- | --- | --- |
| A01 | Abrir portada y usar ambas acciones principales | La oferta central es automatización e IA; el CTA principal lleva al asistente y el secundario a demostraciones. Navegación y menú móvil apuntan a destinos existentes. |
| A02 | Revisar contenido comercial y proceso | Tomás es el responsable; las aplicaciones son posibilidades a evaluar. No aparecen clientes, testimonios, métricas, experiencia, precios o compromisos inventados. Las cuatro etapas y consulta inicial están claras. |
| A03 | Abrir cada ejemplo de inicio | Los tres ejemplos inician un caso coherente, visible en la ficha. La demostración pregunta una sola cosa relevante por turno. |
| A04 | Escribir una tarea, herramientas y frecuencia claras en un mismo mensaje | Conserva los datos que reconoce inequívocamente y pregunta solo por lo que falta; no inventa dificultad ni repite preguntas ya resueltas. |
| A05 | Describir un caso fuera de los ejemplos o ambiguo | Preserva el texto, pide aclaración concreta y permite completar manualmente. Si no puede fundamentar una mejora, muestra «Pendiente de evaluar con Tomás». |
| A06 | No informar herramientas o frecuencia | La ficha muestra pendientes y permite continuar, editar y copiar. Con proceso y dificultad, la base para la consulta está disponible. |
| A07 | Copiar una ficha con solo parte del caso | Se exporta el contenido existente con rótulo de incompleta cuando falta proceso o dificultad y pendientes explícitos. No se inventan valores para completar. |
| A08 | Corregir una respuesta y luego editar la ficha directamente | La ficha y la exportación reflejan los valores más recientes. Continuar no restaura datos obsoletos. |
| A09 | Cambiar el proceso después de obtener una Mejora propuesta | Se retira o revisa la sugerencia incompatible; los campos editados manualmente no se sustituyen silenciosamente. La incertidumbre queda visible. |
| A10 | Introducir acentos, saltos, marcado y texto extenso | Se conservan como texto en ficha y copia, sin ejecución ni creación de elementos a partir de la entrada y sin desbordamiento horizontal. |
| A11 | Copiar con portapapeles disponible y con rechazo controlado | El éxito solo se anuncia tras una copia exitosa. El rechazo ofrece reintento y copia manual sin perder la ficha. |
| A12 | Preparar mensaje y revisar contacto directo | El destinatario es el configurado y el texto preparado corresponde a la ficha actual. No hay apertura automática, envío real ni confirmación de recepción. En pruebas se intercepta o inspecciona la salida sin contactar a Tomás. |
| A13 | Contacto o demo sin configurar, mal formados o declarados no disponibles | No hay enlaces ficticios ni acciones hacia destinos vacíos. Se explica el estado; la ficha y su copia siguen funcionando. |
| A14 | Recargar con un caso parcialmente completado y corregido | Se recuperan conversación, ficha, correcciones y progreso de esa sesión. No vuelve información anterior. |
| A15 | Borrar conversación y recargar | El asistente vuelve al inicio y su borrador anterior no reaparece. La acción no altera otros datos del navegador. |
| A16 | Denegar almacenamiento o presentar un borrador inválido | Aparece un aviso comprensible; se puede continuar o empezar un caso nuevo, sin bloqueo ni pérdida adicional durante la sesión activa. |
| A17 | Enviar vacío, repetir un envío o provocar un fallo recuperable | No se agregan pasos vacíos o duplicados; los errores preservan el trabajo y las acciones de recuperación funcionan. No hay procesamiento artificial presentado como IA. |
| A18 | Observar el modo simulado y las salidas de red al conversar | El modo es explícito antes de escribir. Ningún contenido del caso sale a proveedores, analítica o servicios externos por avanzar, editar o recargar. |
| A19 | Recorrer solo con teclado | Menú, ejemplos, entrada, corrección, ficha, copia y borrado se operan con foco visible y orden lógico, sin trampas. Los errores se asocian a sus controles. |
| A20 | Usar 360, 390, 768 y 1440 px, ampliación de texto y movimiento reducido | Conversación y ficha son legibles y utilizables; en móvil se apilan, no hay desplazamiento horizontal involuntario y el movimiento se reduce según preferencia. Se inspecciona también el diseño, además de comprobar dimensiones. |
| A21 | Revisar avisos accesibles y cambios de la conversación | Controles y campos tienen nombres comprensibles. Nuevas preguntas y errores se anuncian sin desplazar el foco de forma imprevisible ni releer toda la conversación. |
| A22 | Contrastar la tarjeta de Taller Norte con la URL configurada | Identifica marca ficticia y simulación. La descripción coincide con la versión de ese destino; la bandeja local no se anuncia como públicamente disponible. |
| A23 | Ejecutar comprobaciones y revisar la entrega local | Pasan las comprobaciones apropiadas a la arquitectura. En la base estática no se inventa una compilación; si se introduce una, se ejecuta. Los documentos explican ejecución, configuración, pruebas realizadas, límites y pendientes. |

### Ejecución y evidencia

Usar datos ficticios y sesiones aisladas. Las pruebas no envían mensajes, no consumen APIs de IA y no alteran Taller Norte. Revisar visualmente el producto y ejecutar interacciones de navegador está dentro de la verificación solicitada por el usuario; no implica autorización para publicar.

Registrar comandos, resultados y alcance real de las comprobaciones de implementación, sin presentar tests planificados como aprobados. Documentar los navegadores y tamaños efectivamente utilizados y cualquier caso no verificado. Si se prepara el contrato de IA futura con un doble de prueba, diferenciar esa comprobación de una integración real con proveedor.

## Out of Scope

- Implementar el producto durante la fase `to-spec`, generar tickets automáticamente o ejecutar el flujo de implementación sin la siguiente solicitud.
- Publicar TYXX o Taller Norte, actualizar el sitio público anterior, crear otro sitio, cambiar acceso o habilitar indexación.
- Hacer commits o push, comprar servicios, contratar números, enviar mensajes reales o crear cuentas.
- Activar o consumir IA real, seleccionar o contratar un proveedor por inferencia, reutilizar claves de otras aplicaciones o desplegar un backend preventivamente.
- Crear un CRM, bandeja de consultas de TYXX, almacenamiento permanente, autenticación, historial entre dispositivos, panel administrativo o seguimiento de ventas.
- Añadir carga de documentos, fotos, voz, búsqueda real en archivos, conectores operativos, ejecución de automatizaciones o acceso a herramientas del visitante.
- Modificar, iniciar, restablecer, migrar o publicar Taller Norte como dependencia de la página comercial.
- Inventar clientes, equipo, trayectoria, testimonios, cifras, precios, reservas, presupuestos o resultados de negocio.
- Añadir analítica, pagos, agenda, newsletter, campañas o páginas adicionales.
- Prometer comprensión abierta del lenguaje o equivalencia entre simulación e IA real.

## Further Notes

- La fuente de las decisiones es el documento original del usuario, seguido por las seis recomendaciones aceptadas de las dos rondas. Las preferencias ya aceptadas no deben volver a entrevistarse durante la especificación o implementación.
- La ubicación real del proyecto y el mapa de archivos están registrados en la continuidad del repositorio. Usar esa información actual, sin recrear las rutas antiguas incluidas en el texto original.
- La URL pública verificada de Taller Norte es https://tyxx-chapas.pages.dev/. Una petición anónima comprobó el 2026-09-12 estado 200, identidad y rótulos de simulación. La copia local fue actualizada posteriormente con registro, bandeja y SQLite: su código y continuidad ahora lo reflejan. Esa nueva implementación no fue publicada. Esta distinción actualiza el hallazgo inicial de la entrevista, que describía el estado anterior.
- La verificación de disponibilidad HTTP no sustituye probar interacciones. Antes de la entrega, volver a contrastar destino y descripción si la demo cambia; no ejecutar pruebas mutantes contra la demo pública.
- El contacto temporal autorizado de Tomás continúa centralizado en la configuración actual. Su reemplazo por una línea empresarial propia queda para una fase posterior.
- La etiqueta `ready-for-agent` indica que el alcance está documentado para desglosarlo o implementarlo cuando se solicite; no acredita implementación, tests aprobados ni autorización de efectos externos.
- La integración futura de IA debe conservar la creación y edición reales de la ficha. No basta con cambiar un rótulo de la simulación ni con introducir una clave en el navegador.
- No se requiere un ADR nuevo: la arquitectura propuesta conserva el sitio estático y establece una extensión reversible. Los compromisos de producto se conservan en la especificación y el descubrimiento; el glosario contiene únicamente términos del dominio.
