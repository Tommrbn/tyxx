# 01: Describir un proceso y ver la Ficha de proceso

> Nota de privacidad (2026-09-23): identidad personal anonimizada; contacto anterior retirado. El contacto vigente es tyxxsolve@gmail.com. Las menciones del canal anterior describen decisiones o pruebas de su fecha, no una verificación del correo actual.

**What to build:** Una persona entra al Asistente de TYXX desde la página existente, elige uno de los tres ejemplos o escribe su caso, responde una pregunta por vez y ve una Ficha de proceso que se completa con lo informado. La conversación es una simulación declarada y utilizable localmente; la ficha no confirma una contratación ni una recepción por TYXX.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

**State:** closed

**Resultado:** Implementado y verificado localmente el 2026-09-12.

## Criterios de aceptación

- [x] La portada y la navegación existentes permiten llegar a una sección de asistente funcional. El resto del sitio conserva su funcionamiento durante esta entrega.
- [x] Antes de escribir se explica el propósito y se identifica una demostración guiada que funciona con reglas, no con IA real; la conversación permanece en el navegador.
- [x] Funcionan los inicios «Copio pedidos a una planilla», «Me llegan consultas incompletas» y «Pierdo tiempo buscando información», además de la entrada libre.
- [x] Se pregunta una sola cosa relevante por turno sobre proceso, dificultad, herramientas o frecuencia. Un dato reconocido inequívocamente no se vuelve a solicitar; los datos dudosos no se inventan.
- [x] La ficha visible contiene proceso actual, dificultad, herramientas, frecuencia, Mejora propuesta y aspectos pendientes. Los valores ausentes aparecen como «Todavía no informado»; la mejora puede quedar «Pendiente de evaluar con TYXX».
- [x] El proceso y la dificultad constituyen la base útil. Herramientas y frecuencia pueden quedar pendientes y se permite indicar desconocimiento sin bloquear el avance.
- [x] No se exige nombre, contacto, presupuesto ni cuenta para probar el asistente. Los envíos vacíos y repetidos no crean turnos vacíos o duplicados.
- [x] La ficha y la conversación usan una representación coherente de los datos; se preservan acentos, saltos y caracteres como texto, sin ejecutar marcado aportado por el visitante.
- [x] La conversación y la ficha son utilizables en escritorio y móvil, con etiquetas, foco visible y avisos accesibles; no se añade un chat flotante reducido ni procesamiento artificial que aparente IA.
- [x] La simulación se conecta mediante un punto de sustitución pequeño, independiente de la presentación. Se documentan entradas, salidas, validación y el futuro límite de servidor, manteniendo ficha y exportación bajo control de la aplicación. No se añade un backend o proveedor real preventivamente.
- [x] Si la inicialización del asistente falla o falta JavaScript, el contenido comercial y el contacto siguen legibles y se explica la indisponibilidad.
- [x] Se verifica el recorrido desde la página local y la ausencia de salidas de datos al conversar. Las comprobaciones estáticas existentes siguen pasando y las instrucciones explican cómo ejecutar y reconocer este modo.

## Alcance y verificación

Este es un recorrido completo de descripción y ficha visible. La corrección avanzada y edición directa se agregan en 02, la recuperación tras recarga en 03 y la exportación en 04; no mostrar controles activos que todavía no funcionen.

Cobertura principal: historias 5, 17–27 y 51; criterios A03, A04, A06, A17 y A18. A01, A10 y A19–A23 se aplican a los controles y contenido incluidos en esta entrega. Los tests observan comportamiento público, no funciones privadas.

## Límites de ejecución

Trabajar únicamente en TYXX y reutilizar su base estática. No modificar ni iniciar Taller Norte, consumir IA, publicar, comprar, enviar mensajes reales, hacer commits o push. Implementación autorizada por el usuario el 2026-09-12 junto con el ticket 02. La documentación distingue funciones verificadas de las pendientes.

## Comments

2026-09-12: El usuario solicitó implementar los tickets 01 y 02 en conjunto. Trabajo local en curso; los límites de ejecución siguen vigentes.


2026-09-12: Implementación finalizada. Suite conjunta: 20 pruebas aprobadas; comprobaciones estáticas y revisión de ambos ejes completas. Hallazgos corregidos. Evidencias: `docs/verification-asistente-01-02.md`; revisión: `docs/review-asistente-01-02.md`; funcionamiento y límites: `docs/asistente-tyxx.md`. No publicación, commit ni push. Los tickets posteriores siguen pendientes.
