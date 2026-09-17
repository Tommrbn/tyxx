# Propuesta — renovación TYXX: sistemas e IA

## Estado y fuentes
- Formaliza decisiones de producto ya aprobadas; no abre otra entrevista ni autoriza implementación.
- Autoridad: `../../config.yaml` y [exploración](exploration.md), que detalla evidencia, superficies y seams posibles sin duplicarlos aquí.
- Leídos `AGENTS.md`, `CONTINUAR.md`, `docs/agents/domain.md`, `CONTEXT.md` y `.agents/product-marketing.md` (v8), sin modificarlos; `docs/adr/` no existe.
- Contraste actual: `dist/strand.html`, `dist/app.js`, `dist/config.js` y `scripts/serve.mjs` conservan el CTA al asistente, la transformación de `[data-contact]` a WhatsApp y las rutas documentadas. El recorrido propuesto aún no está implementado.
- El alcance aprobado prevalece sobre la prioridad histórica del asistente y las direcciones visuales anteriores del contexto comercial.
- `skill_resolution: paths-injected`: leídas product-marketing, landing-page-design y ui-ux-expert; se aplica el contrato del ejecutor sin buscar otra skill de fase.

## Intención y resultado esperado
Evolucionar Strand para que dueños de pymes de servicios de Argentina, sin conocimientos técnicos, entiendan qué puede evaluar TYXX y cómo iniciar una consulta. El sitio actual prioriza categorías técnicas y una demostración; la renovación organiza la conversación desde problemas de trabajo y distingue oferta, ejemplo y capacidad implementada.

Posicionamiento: **TYXX diseña, implementa y mantiene sistemas con software, automatización, IA y supervisión humana, según el proceso y el alcance acordados.** No presupone que todo negocio necesite IA ni acredita integraciones ya realizadas. Las webs son una interfaz cuando el proceso la requiere, no un catálogo adicional.

Usar español rioplatense con voseo, mensajes breves y trato directo con Tomás. Presentar tareas repetitivas, información dispersa y consultas incompletas como situaciones posibles, no como hallazgos de clientes entrevistados. El resultado buscado es un recorrido comprensible hacia una consulta inicial; no se promete una mejora numérica de conversión, ahorro o ventas.

## Alcance editorial: seis secciones, en este orden
| Sección | Función y límites |
| --- | --- |
| 1. Hero | Explicar valor desde procesos. CTA principal «Conversemos sobre tu negocio» y secundario «Ver un ejemplo», con jerarquía inequívoca. |
| 2. Problemas reconocibles | Mostrar dificultades cotidianas sin elegir un nuevo nicho, inventar citas o diagnosticar al visitante. |
| 3. Flujo ilustrativo | Consulta → organización de información → revisión humana → próximo paso. Rotular como ejemplo hipotético, sin sistemas conectados ni envío o reserva simulados como exitosos. |
| 4. Forma de trabajo | Relevar, acordar alcance, implementar y mantener según acuerdo. Distinguir implementación, herramientas externas y mantenimiento opcional, sin SLA ni acompañamiento ilimitado. |
| 5. Demos | Asistente de TYXX secundario, guiado por reglas y sin IA real. Chapas/Taller Norte como proyecto demostrativo ficticio, nunca cliente o caso de éxito; disponibilidad externa actual no verificada. |
| 6. FAQ/contacto | Aclarar evaluación, presupuesto a medida, herramientas, plazos según alcance, mantenimiento y necesidad de IA. Consulta inicial sin cargo con Tomás y salida explícita «Abrir WhatsApp». |

## Recorridos y reglas de producto
- Principal: «Conversemos sobre tu negocio» lleva a contacto dentro de la página; solo «Abrir WhatsApp» inicia la salida externa al contacto autorizado. Abrir la aplicación no acredita mensaje enviado, recibido ni turno reservado.
- Secundario: «Ver un ejemplo» lleva al flujo ilustrativo, no obliga a usar el asistente ni sustituye la consulta inicial.
- La revisión humana es un paso visible del ejemplo y una condición de evaluación de las sugerencias; la ficha no es presupuesto, contratación ni confirmación de viabilidad.
- El asistente conserva conversación, ficha editable, correcciones, apertura por `#asistente`, conservación al cerrar/reabrir y aviso de pérdida al recargar. No agrega persistencia ni exportación.
- Mantener los avisos de simulación y alternativa ante fallo de carga. El contenido esencial y el contacto no dependen del asistente, Canvas ni JavaScript.
- La demo externa no justifica anunciar bandeja, registro, persistencia o capacidades de una copia local ajena. Mientras falte validación, describirla con prudencia y sin certificar disponibilidad.

## Superficies afectadas y enfoque
| Superficie prevista para fases posteriores | Tratamiento |
| --- | --- |
| `dist/strand.html` | Textos, metadatos coherentes, seis bloques, anclas, contacto, ubicación de demos y navegación móvil progresiva. |
| `dist/strand.css` | Jerarquía y compactación decorativa móvil, contemplando media queries y container queries. |
| `dist/strand-motion.js` | Conservar motor y controles; ajustar correspondencias de escenas únicamente si el HTML lo exige. |
| `tests/strand.spec.js` | Expectativas de los nuevos recorridos y navegación sin JS; conservar regresiones útiles. |
| `dist/app.js`, `dist/config.js`, `dist/assistant*.js`, `dist/assistant.css` | Contratos compartidos a preservar; evitar cambios. Separar anclas internas de `[data-contact]` para no alterar Portfolite. |
| `dist/index.html`, `dist/styles.css`, pruebas del asistente y `tests/preview.spec.js` | Portfolite y regresiones: preservar contenido, rutas y comportamiento; no extenderles el rediseño. |
| `CONTINUAR.md`, `.agents/product-marketing.md`, `README.md`; nuevo `docs/verification-renovacion-tyxx.md` | Después de implementar, actualizar solo información desactualizada en los tres primeros y crear un registro focalizado de verificación con resultados realmente ejecutados y pendientes explícitos. Sin duplicar dominio ni borrar historia; no crear ni editar estos archivos en esta fase. |

Mantener HTML/CSS/JavaScript estáticos, fuentes editables en `dist/`, logos propios, negro/blanco/naranja, tipografía e identidad Strand. Reutilizar animación, pausa, movimiento reducido y FAQ nativa; no introducir framework, motor de flujos ni dependencias.

## Fuera de alcance
- Nuevo nicho, catálogo de siete servicios, clientes, testimonios, métricas, garantías o integraciones inventados.
- Backend, IA real, CRM, agenda conectada, automatización de WhatsApp, nuevas integraciones, almacenamiento, exportación o analytics.
- Reactivar tickets históricos pendientes o editar `.scratch/`, fuentes externas y proyectos hermanos.
- Instalaciones, commits, pushes, despliegues o cambios de acceso/publicación. Conservar `noindex, nofollow` sin presentarlo como control de acceso.
- En esta fase: solo `proposal.md`; no crear specs, diseño o tareas ni editar fuentes, configuración, marcador nativo o documentación de dominio/comercial.

## Criterios de aceptación de la renovación
1. Se reconocen las seis secciones en el orden acordado, con lenguaje de negocio y sin catálogo ampliado ni pruebas comerciales no respaldadas.
2. Con y sin JavaScript, el CTA principal llega a contacto sin abrir un destino externo; «Abrir WhatsApp» apunta al número autorizado y no muestra confirmación de envío, recepción o reserva.
3. «Ver un ejemplo» llega a una secuencia legible rotulada como ilustrativa, con revisión humana explícita y sin afirmar conexiones activas.
4. El asistente sigue siendo secundario, accesible desde demos y `#asistente`, conserva edición y cierre/reapertura sin pérdida, y explica reglas, ausencia de IA real y pérdida al recargar; el fallo de carga mantiene una alternativa útil.
5. A 360/390 px, la navegación ofrece enlaces utilizables sin JS; con JS conserva teclado, Escape, retorno de foco y estado expandido correcto.
6. A 360/390/768/1440 px y con texto al 200%, no hay desborde horizontal ni contenido/control esencial recortado. La decoración móvil ocupa menos altura que la base registrada, sin reducir legibilidad ni identidad.
7. Se mantienen orden de lectura, nombres accesibles, foco visible, pausa y movimiento reducido; el texto esencial existe fuera de Canvas. Comprobar contraste de texto normal ≥4,5:1 y texto grande/controles ≥3:1 en las superficies modificadas.
8. `/` y `/strand.html` conservan Strand; `/index.html` conserva Portfolite, su contacto y asistente compartidos. No se cambia el teléfono ni se añade envío de datos o almacenamiento.
9. Toda mención de Chapas/Taller Norte identifica su carácter ficticio y no promete disponibilidad o funcionalidad externa sin evidencia actual del destino enlazado.

## Riesgos y mitigaciones
- **Salida prematura a WhatsApp:** `[data-contact]` reescribe enlaces; conservar el CTA intermedio como ancla interna independiente.
- **Regresión compartida:** aislar cambios en Strand y verificar contacto/asistente en ambas páginas; no refactorizar compartidos por conveniencia.
- **Contenido y movimiento desalineados:** conservar contratos DOM y revisar correspondencias de escenas; nunca dejar información solo en la animación.
- **Expectativas comerciales excesivas:** separar propuesta de servicio, ejemplo y demo real; revisión humana y mantenimiento delimitado explícitos.
- **Demo externa incierta:** no trasladar evidencia histórica a disponibilidad presente ni capacidades locales al destino público.

## Verificación, avance y reversión
- Evidencia actual de ejecución: **no ejecutada**. No se corrieron tests, comprobación estática, servidor ni inspección de navegador en esta fase; los resultados históricos no certifican esta renovación.
- Tras autorizar implementación, verificar con las herramientas existentes (`npm run check`, `npm test -- tests/strand.spec.js`, `npm test`) y revisión visual/teclado de los criterios anteriores. Chrome local y entorno instalado siguen sin comprobarse.
- `strict_tdd: null` permanece sin resolver: antes de apply, el usuario debe seleccionar dónde corresponde TDD y confirmar los seams nuevos bajo prueba. Esta propuesta no activa ni desactiva TDD ni reabre decisiones de producto confirmadas.
- Avance limitado a preparación y futura validación local, sin publicación ni entrega externa automática. El único artefacto producido ahora es esta propuesta.
- Preflight: modo `auto`, backend `openspec`, entrega `ask-on-risk`, presupuesto de 400 líneas. Si aparece riesgo de superarlo, consultar al usuario; no inferir cadena ni `size:exception`.
- Rollback: revertir mediante edición acotada únicamente los cambios atribuibles a esta renovación, contrastando la base previa. En esta fase, limitar la reversión a esta propuesta; en una implementación autorizada, a sus hunks de fuentes/pruebas/documentación. Preservar cambios ajenos, `.gitignore` preexistente y archivos `.pi/` sin seguimiento; no usar comandos Git destructivos ni restauraciones globales.
