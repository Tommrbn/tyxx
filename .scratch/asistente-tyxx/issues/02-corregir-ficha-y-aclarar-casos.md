# 02: Corregir la ficha y aclarar casos sin inventar soluciones

**What to build:** Una persona puede volver sobre lo que contó, editar todos los campos de su Ficha de proceso y seguir conversando sin perder las correcciones. Ante un caso ambiguo, la simulación conserva sus palabras, pide una aclaración concreta y reconoce cuándo una mejora necesita evaluación de Tomás.

**Blocked by:** 01 — Describir un proceso y ver la Ficha de proceso.

**Status:** ready-for-agent

**State:** closed

**Resultado:** Implementado y verificado localmente el 2026-09-12.

## Criterios de aceptación

- [x] Se puede corregir una respuesta anterior y editar directamente todos los campos de la ficha sin reiniciar el caso.
- [x] La corrección explícita más reciente prevalece sobre información anterior y sugerencias. Continuar la conversación no restaura valores antiguos ni sobrescribe una edición manual sin una nueva corrección explícita.
- [x] Conversación, ficha, preguntas siguientes y pendientes reflejan las correcciones sin mantener versiones divergentes del caso.
- [x] Si cambia el proceso o su dificultad, se revisa o retira la Mejora propuesta incompatible. Las ediciones de la persona se respetan y cualquier necesidad de revisión queda visible.
- [x] Se conservan texto, acentos, saltos y caracteres aportados, sin ejecutar marcado ni reinterpretar entradas como instrucciones del sistema.
- [x] Un caso que no encaja en los ejemplos se puede completar mediante preguntas relevantes o edición de la ficha. Si no se identifica suficiente contexto, se pide una aclaración concreta y se permite mantener información pendiente.
- [x] Toda Mejora propuesta se identifica como condicional y se basa en información aportada. Puede sugerir evaluar una alternativa sin IA; no promete conectores disponibles, ahorros, precios, plazos o contrataciones.
- [x] Cuando no exista fundamento para proponer una mejora, se muestra «Pendiente de evaluar con Tomás». No se crea una solución genérica presentada como conclusión.
- [x] La ficha se identifica como incompleta cuando falta proceso o dificultad. Herramientas y frecuencia pueden seguir pendientes sin descalificar una consulta inicial; se muestran los aspectos que habría que aclarar.
- [x] Los controles de corrección, campos, errores y avisos funcionan con teclado y en móvil; los cambios no desplazan el foco de forma imprevisible ni releen toda la conversación.
- [x] Las pruebas recorren un caso con varios datos iniciales, una corrección posterior, una edición directa, un cambio que invalida una sugerencia y un caso abierto. Se comprueba fidelidad y ausencia de invenciones desde la interfaz local.
- [x] La documentación explica el límite de comprensión de la simulación y la vía manual, junto con la distinción entre una Mejora propuesta y una Propuesta comercial.

## Alcance y verificación

Cobertura principal: historias 28–36; criterios A05, A08 y A09. A04, A06, A10 y A17–A23 se aplican al recorrido extendido. Exportar la ficha se incorpora en 04, sin duplicar aquí ese trabajo; desde esta entrega, la ficha actual queda preparada para que conservación y exportación utilicen las mismas correcciones.

## Límites de ejecución

Primera versión simulada y local, con la estrategia sustituible introducida en 01. No activar proveedores, incorporar datos ajenos, alterar Taller Norte, publicar, comprar, enviar mensajes reales, hacer commits o push. No crear un motor general de agentes ni un historial permanente.

## Comments

2026-09-12: El usuario solicitó implementar los tickets 01 y 02 en conjunto. Trabajo local en curso; los límites de ejecución siguen vigentes.


2026-09-12: Implementación finalizada. Suite conjunta: 20 pruebas aprobadas; comprobaciones estáticas y revisión de ambos ejes completas. Hallazgos corregidos. Evidencias: `docs/verification-asistente-01-02.md`; revisión: `docs/review-asistente-01-02.md`; funcionamiento y límites: `docs/asistente-tyxx.md`. No publicación, commit ni push. Los tickets posteriores siguen pendientes.
