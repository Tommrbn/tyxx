# Desglose del Asistente de TYXX y la página comercial

> Nota de privacidad (2026-09-23): identidad personal anonimizada; contacto anterior retirado. El contacto vigente es tyxxsolve@gmail.com. Las menciones del canal anterior describen decisiones o pruebas de su fecha, no una verificación del correo actual.

Fecha: 2026-09-12.
Estado: 01 y 02 autorizados mediante `implement`, registrados en `issues/`, implementados y cerrados el 2026-09-12. 03 y 04 siguen pendientes. Un pedido directo posterior adelantó parte visual/comercial de 05 con Portfolite, sin cerrar ese ticket; ver `docs/verification-portfolite.md`.

## Propuesta

| Número | Entrega | Bloqueada por | Resultado demostrable |
| --- | --- | --- | --- |
| 01 | Describir un proceso y ver la Ficha de proceso | Ninguna | Entrar al asistente, empezar con un ejemplo o caso propio y obtener una ficha visible mediante preguntas guiadas. |
| 02 | Corregir la ficha y aclarar casos sin inventar soluciones | 01 | Editar y corregir el caso sin perder cambios, con propuestas condicionadas o evaluación pendiente. |
| 03 | Recuperar y borrar el borrador de la conversación | 02 | Recargar conservando las correcciones, borrar el caso y recuperarse de fallos de almacenamiento. |
| 04 | Copiar la ficha y preparar el contacto con TYXX | 02 | Copiar lo corregido o preparar WhatsApp, incluso con información parcial y alternativas si falla la copia. |
| 05 | Presentar la oferta y las demostraciones de TYXX | 01 | Recorrer una página comercial coherente, con acceso al asistente y una demo descrita según el enlace disponible. |

## Dependencias reales

- 01 fue la entrada inicial y ya está resuelta junto con 02.
- Después de 01 quedan disponibles 02 y 05.
- Después de 02 quedan disponibles 03 y 04, sin dependencia entre ellas.
- 03 y 04 dependen de 02 porque su resultado incluye recuperar o exportar ediciones y correcciones comprobables, no solo valores iniciales.
- 05 depende del asistente funcional de 01; no necesita esperar persistencia o exportación para mostrar la oferta y habilitar sus destinos. Compartir estilos o archivos no constituye por sí solo una dependencia funcional.
- El orden de disponibilidad no autoriza trabajo simultáneo, nuevos agentes ni cambios en otro proyecto. Durante la implementación se coordinará el trabajo sobre el mismo sitio.

## Tamaño y preparación

Cada tarea recorre comportamiento, interfaz, estado/configuración y pruebas pertinentes. No hay tareas aisladas de «crear el backend», «hacer el diseño» o «escribir los tests». No se requiere backend para esta simulación.

No se detectó un refactor previo obligatorio: el módulo nuevo puede incorporarse sin rehacer la página estática. La separación pequeña de simulación y presentación se crea con el recorrido de 01 y se verifica a través de él, en lugar de generar una tarea de arquitectura sin resultado visible.

Los borradores originales se conservan en `ticket-drafts/`. Los registros vigentes de 01 y 02 están en `issues/`, con triage `ready-for-agent` y estado de ejecución cerrado. 03 y 04 siguen pendientes; 05 tiene trabajo adelantado por el pedido de rediseño y requiere reconciliar sus criterios restantes. No se modificó ni cerró la especificación padre. La recomendación de trabajo agrupado es 01 + 02 (completo) y luego 03 + 04 + 05 (los tickets todavía no se solicitaron como bloque; el rediseño posterior adelantó parte de 05).

## Cobertura de la especificación

| Criterios | Responsabilidad principal |
| --- | --- |
| A01 | 01 habilita el acceso inicial; 05 completa portada y navegación comercial. |
| A02 | 05: contenido y proceso comercial. |
| A03, A04, A06 | 01: conversación inicial y campos relevantes; 02 extiende corrección y casos abiertos. |
| A05, A08, A09 | 02: casos ambiguos, edición y vigencia de las sugerencias. |
| A07 | 04: exportar información parcial identificada. |
| A10 | 01 y 02: fidelidad de datos; 04: fidelidad al copiar. |
| A11, A12 | 04: copia, recuperación y preparación voluntaria de contacto. |
| A13 | 04: contacto ausente; 05: destino de demo ausente. |
| A14, A15, A16 | 03: sesión, borrado y recuperación. |
| A17 | 01: envíos vacíos/duplicados; 02, 03 y 04: recuperación de sus operaciones. |
| A18 | 01 establece modo y privacidad; 02–04 mantienen el límite al editar, conservar y exportar. |
| A19, A20, A21 | Cada tarea verifica los controles y estados que incorpora; 05 verifica la composición de página. |
| A22 | 05: correspondencia de la demo y el destino verificable. |
| A23 | Cada tarea conserva comprobaciones y documentación; el cierre global integra la evidencia de las cinco. |

Las 52 historias quedan asignadas en los borradores; algunas son transversales y se verifican en más de una tarea. No se abren nuevos requisitos ni se reentrevistan las decisiones aceptadas.

## Cierre de implementación futura

Cada ticket incluye pruebas y documentación de su propio recorrido. La persona o agente que complete el último ticket pendiente ejecutará además el recorrido global de la especificación, registrará los 23 criterios y actualizará la continuidad con qué funciona, qué está simulado y qué queda pendiente para publicar. No es una tarea adicional de QA ni una excusa para posponer las pruebas de las entregas anteriores.

El enfoque de pruebas desde la interfaz local, incluyendo móvil y teclado, ya está confirmado por el usuario. La revisión de este desglose solamente comprueba tamaño, agrupación y dependencias.

La entrega permanece local. No se autoriza implementación por preparar los borradores, ni publicación, compras, mensajes reales, commits o push por aprobar el desglose.
