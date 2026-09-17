# Landing comercial Specification

## Purpose
Definir el recorrido comercial de Strand desde procesos hacia una consulta inicial con Tomás, distinguiendo oferta, ejemplo ilustrativo y demostraciones reales.

## Requirements

## ADDED Requirements

### Requirement: Posicionamiento desde procesos y seis bloques
Strand MUST presentar a TYXX como quien diseña, implementa y mantiene sistemas con software, automatización, IA y supervisión humana según el proceso y alcance acordados. MUST usar español rioplatense con voseo para pymes de servicios de Argentina, con metadatos coherentes y sin presuponer necesidad de IA. MUST conservar seis bloques en orden: hero, problemas reconocibles, flujo ilustrativo, forma de trabajo, demos y FAQ/contacto.

#### Scenario: Lectura de la propuesta comercial
- GIVEN una persona sin conocimientos técnicos que visita Strand.
- WHEN recorre la página en orden de lectura.
- THEN reconoce los seis bloques y situaciones posibles de trabajo, no diagnósticos del visitante ni hallazgos atribuidos a clientes; las webs aparecen como interfaz cuando el proceso las requiere.
- THEN no encuentra un catálogo ampliado, clientes, testimonios, integraciones, garantías ni métricas comerciales inventados.

### Requirement: Evaluación humana y alcance de la propuesta
La forma de trabajo MUST distinguir relevamiento, acuerdo de alcance, implementación y mantenimiento según acuerdo. FAQ/contacto MUST aclarar consulta inicial sin cargo con Tomás, presupuesto a medida, costos de herramientas externas, plazos según alcance, mantenimiento opcional y evaluación de la necesidad de IA, sin SLA ni acompañamiento ilimitado. Toda mejora propuesta MUST quedar sujeta a evaluación humana; la ficha de proceso MUST NOT presentarse como presupuesto, contratación o confirmación de viabilidad.

#### Scenario: Comprensión de condiciones y sugerencias
- GIVEN una persona interesada en una solución o que consulta una mejora propuesta.
- WHEN lee la forma de trabajo, FAQ y límites de la ficha.
- THEN distingue orientación de propuesta comercial y reconoce qué debe evaluar Tomás, qué se acuerda y qué costos o mantenimiento son separados y opcionales.

### Requirement: Consulta inicial mediante contacto interno y salida explícita
El CTA principal «Conversemos sobre tu negocio» MUST llevar a contacto dentro de la página mediante un ancla interna, con y sin JavaScript. La salida de ese recorrido MUST requerir la acción explícita «Abrir WhatsApp», dirigida al número autorizado 5492304514378. El sitio MUST NOT afirmar que abrir WhatsApp envió o entregó un mensaje ni reservó un turno.

#### Scenario: Recorrido principal con y sin JavaScript
- GIVEN Strand con JavaScript habilitado o deshabilitado.
- WHEN la persona activa «Conversemos sobre tu negocio».
- THEN llega a FAQ/contacto sin abrir un destino externo y encuentra la consulta inicial sin cargo con Tomás.
- WHEN activa «Abrir WhatsApp».
- THEN el enlace ofrece la salida externa al número autorizado, sin confirmación ficticia de envío, recepción o reserva.

### Requirement: Ejemplo ilustrativo independiente de funciones conectadas
El CTA secundario «Ver un ejemplo» MUST llevar al flujo ilustrativo, sin exigir el asistente. El flujo MUST mostrar consulta → organización de información → revisión humana → próximo paso, rotulado como hipotético y sin sistemas conectados. MUST distinguirse de capacidades implementadas y MUST NOT simular envíos o reservas exitosos.

#### Scenario: Consulta del ejemplo sin ejecutar una integración
- GIVEN el hero de Strand, con o sin JavaScript.
- WHEN la persona activa «Ver un ejemplo».
- THEN llega a una secuencia legible con los cuatro pasos, revisión humana explícita y carácter ilustrativo, sin abrir obligatoriamente el asistente ni acreditar conexiones o acciones reales.

### Requirement: Asistente secundario y continuidad de la ficha
El asistente de TYXX MUST seguir siendo una demostración secundaria accesible desde demos y desde `#asistente`. MUST conservar ejemplos, caso libre, conversación guiada, omisiones, correcciones y ficha editable de seis campos; cerrar y reabrir MUST conservar lo escrito. MUST explicar antes de escribir que funciona por reglas, sin IA real, y que recargar pierde la ficha, sin incorporar persistencia ni exportación.

#### Scenario: Uso y reapertura de la demostración
- GIVEN la apertura desde demos o mediante `#asistente`.
- WHEN la persona usa un ejemplo o caso libre, responde u omite preguntas, corrige respuestas y edita la ficha.
- THEN conserva las capacidades existentes y reconoce los límites de la simulación y de sus sugerencias.
- WHEN cierra y vuelve a abrir el asistente.
- THEN la conversación y la ficha editada siguen disponibles; el aviso distingue esta conservación de la pérdida al recargar.

#### Scenario: Fallo de carga del asistente
- GIVEN que el asistente no puede cargarse.
- WHEN la persona intenta acceder a la demostración.
- THEN encuentra una explicación y una alternativa útil para contactar a Tomás; el contenido esencial y el recorrido de contacto siguen disponibles sin depender del asistente, JavaScript ni Canvas.

### Requirement: Navegación móvil con mejora progresiva
A 360 y 390 px, la navegación MUST ofrecer enlaces utilizables sin JavaScript. Con JavaScript, el menú MUST poder operarse por teclado, comunicar correctamente su estado expandido y cerrarse con Escape devolviendo el foco al control de apertura.

#### Scenario: Acceso móvil sin JavaScript
- GIVEN Strand a 360 o 390 px y JavaScript deshabilitado.
- WHEN la persona recorre la navegación y activa sus enlaces.
- THEN puede llegar a las secciones y a contacto, sin depender de un control de menú inoperante.

#### Scenario: Apertura y cierre por teclado
- GIVEN Strand a 360 o 390 px con JavaScript habilitado y foco en el control del menú.
- WHEN abre el menú por teclado y recorre sus enlaces.
- THEN los enlaces son operables, el foco es visible y el estado expandido coincide con la visibilidad.
- WHEN pulsa Escape dentro del menú abierto.
- THEN el menú se cierra, comunica estado no expandido y devuelve el foco al control de apertura.

### Requirement: Composición compacta y legibilidad adaptable
Strand MUST conservar identidad, logos propios, tipografía y paleta negro/blanco/naranja. A 360/390/768/1440 px, con texto al 100% y al 200%, MUST NOT presentar desborde horizontal ni recortar contenido o controles esenciales. La decoración móvil MUST ocupar menos altura que la base registrada de 390 px para portada y 470 px para escenas, sin perjudicar legibilidad, tanto por tamaño de pantalla como de contenedor.

#### Scenario: Adaptación a tamaños de pantalla y contenedor
- GIVEN cada ancho indicado, texto al 100% o 200%, y contenedores amplios o estrechos que activen las variantes adaptables existentes.
- WHEN se recorren portada, escenas y demás bloques.
- THEN el contenido y los controles esenciales permanecen legibles y accesibles sin desborde horizontal; en móvil la decoración de portada y escenas queda por debajo de sus respectivas alturas base, sin perder identidad.

### Requirement: Accesibilidad del contenido y control del movimiento
Strand MUST conservar orden de lectura significativo, nombres accesibles y foco visible. El texto esencial MUST existir fuera de Canvas. Las superficies modificadas MUST alcanzar contraste de texto normal ≥4,5:1 y texto grande y controles ≥3:1. MUST conservar pausa y respeto de movimiento reducido sin ocultar información o acciones.

#### Scenario: Lectura y operación accesibles
- GIVEN las superficies modificadas, incluyendo estados interactivos.
- WHEN se revisan lectura asistida, navegación por teclado y contraste.
- THEN el orden y nombres permiten comprender y operar la página, el foco es visible, los contrastes alcanzan los mínimos y ninguna información esencial depende del dibujo animado.

#### Scenario: Pausa y preferencia de movimiento reducido
- GIVEN la animación activa o la preferencia de movimiento reducido habilitada.
- WHEN la persona pausa la animación, o carga la página con esa preferencia.
- THEN la pausa detiene el movimiento y la preferencia evita la animación continua no esencial; los textos, escenas y acciones siguen comprensibles y utilizables.

### Requirement: Preservación de Portfolite y límites de datos
`/` y `/strand.html` MUST conservar Strand; `/index.html` MUST conservar contenido y comportamiento de Portfolite sin trasladarle el rediseño. Contacto y asistente compartidos MUST conservar su comportamiento y número autorizado. La renovación MUST permanecer estática, conservar `noindex, nofollow` sin tratarlo como control de acceso y MUST NOT añadir backend, IA real, CRM, agenda conectada, automatización de WhatsApp, integraciones, telemetría, almacenamiento, exportación ni envío de datos desde el sitio.

#### Scenario: Regresión de rutas y módulos compartidos
- GIVEN una visita a cada una de las tres rutas.
- WHEN la persona consulta contenido, contacto y asistente, y edita una ficha.
- THEN encuentra la versión correspondiente, el contacto autorizado y el comportamiento compartido conservado; Portfolite no recibe el rediseño y la interacción no introduce envío de datos, almacenamiento ni exportación.

### Requirement: Descripción veraz del proyecto demostrativo externo
Toda mención de Chapas/Taller Norte MUST identificarlo como proyecto demostrativo ficticio, no cliente ni caso de éxito. MUST NOT acreditar disponibilidad o funciones externas sin evidencia actual del destino enlazado ni trasladar capacidades de una copia local ajena.

#### Scenario: Destino externo sin validación actual
- GIVEN que la disponibilidad y capacidades actuales del destino no están verificadas.
- WHEN la persona lee su presentación en demos.
- THEN encuentra una descripción prudente de su carácter ficticio, sin promesas de disponibilidad, recepción, bandeja, registro o persistencia no comprobadas.

### Requirement: Documentación focalizada posterior a la implementación
Tras implementar, `CONTINUAR.md`, `.agents/product-marketing.md` y `README.md` MUST actualizar únicamente información desactualizada por esta renovación, sin borrar historia ni duplicar dominio. `docs/verification-renovacion-tyxx.md` MUST registrar comprobaciones realmente ejecutadas, resultados, límites y pendientes, distinguiéndolos de evidencia histórica y sin afirmar publicación no realizada.

#### Scenario: Registro de una implementación local
- GIVEN la renovación implementada y las verificaciones efectivamente disponibles.
- WHEN se actualiza su documentación.
- THEN los tres documentos existentes reflejan solo los cambios pertinentes y el registro focalizado distingue resultados actuales, verificaciones no realizadas y entrega local, sin certificar pruebas o disponibilidad externa desconocidas.

## Pendientes de validación
- Dominio `landing-comercial` inferido de las superficies de la propuesta, que no contiene `Capabilities`; no se encontró especificación canónica, cambio concurrente del dominio ni spec plana heredada. Estos requisitos son íntegramente nuevos.
- Evidencia actual de ejecución: no disponible; esta fase no ejecutó servidor, pruebas ni comprobaciones. Los resultados históricos no certifican el cambio.
- `strict_tdd: null` continúa sin resolver. Antes de apply se debe confirmar dónde corresponde TDD y los seams nuevos, sin reabrir el alcance aprobado ni fijar aquí una política global.
- Seams públicos candidatos, solo para confirmación posterior: recorrido contacto/WhatsApp y ejemplo por enlaces accesibles; navegación móvil con/sin JS; asistente/fallback y ficha; rutas Strand/Portfolite y sus controles accesibles.
