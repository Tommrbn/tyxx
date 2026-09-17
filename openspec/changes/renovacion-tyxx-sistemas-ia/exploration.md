# Exploración — renovación TYXX: sistemas e IA

## Estado y autoridad
- Cambio nuevo iniciado por instrucción explícita del usuario; no continuación automática de tickets históricos.
- Único entregable de esta fase: esta exploración. No se implementó ni se crearon propuesta, especificaciones, diseño, tareas o marcador nativo.
- Preflight recibido: ejecución `auto`, artefactos `openspec`, entrega `ask-on-risk`, presupuesto de revisión de 400 líneas; estrategia de cadena diferida y sin excepción autorizada.
- `strict_tdd: null` sigue significando desconocido. Resolver su aplicabilidad antes de apply, no como condición para explorar.

## Hechos contrastados
- Leídos `AGENTS.md`, `CONTINUAR.md`, `docs/agents/domain.md`, `CONTEXT.md`, `.agents/product-marketing.md` y `openspec/config.yaml`; no se encontraron ADRs bajo `docs/adr/`.
- Se contrastaron `dist/strand.html`, `dist/strand.css`, `dist/app.js`, `dist/config.js`, selectores de `dist/strand-motion.js`, `tests/strand.spec.js`, `tests/preview.spec.js`, `package.json` y `playwright.config.js`.
- Stack estático HTML/CSS/JavaScript, sin compilación. `dist/` contiene las fuentes editables; no hace falta incorporar framework ni dependencias.
- Strand presenta hoy tres áreas de servicio; el CTA principal abre el asistente y el secundario lleva a demos. El recorrido aprobado todavía no está implementado.
- `app.js` transforma todos los enlaces `[data-contact]` en enlaces externos a WhatsApp, incluido el actual enlace de cabecera cuyo HTML apunta a `#contacto`.
- El menú móvil depende de JavaScript: `#mobile-nav` nace con `hidden` y la navegación de escritorio desaparece hasta 760 px. La prueba sin JavaScript existente comprueba contacto y Portfolite, no ese menú móvil.
- La decoración móvil reserva 390 px para `.hero-sculpture` y 470 px para `.story-art`; las container queries repiten esas alturas. Reducir solo una media query no cubre ambas reglas.
- La animación acopla pasos, ilustraciones y controles mediante `data-story-step`, `data-story-visual` y `data-scene-choice`; dispone de pausa y movimiento reducido.
- El asistente existente declara reglas, ausencia de IA real y pérdida de ficha al recargar. Su comportamiento compartido debe preservarse.
- `dist/config.js` configura WhatsApp y `https://tyxx-chapas.pages.dev/`. El HTML identifica Taller Norte como marca ficticia y vista previa sin envío; esto no verifica el destino externo actual.
- La documentación comercial histórica prioriza el asistente y conserva decisiones visuales anteriores. Para este cambio prevalece el alcance actual aprobado; no se reactivan pendientes históricos.
- No se accedió a `.scratch/`, proyectos vecinos ni investigación externa. No se alteraron tickets históricos.

## Alcance aprobado
- Mantener Strand como base, identidad negro/blanco/naranja y controles de movimiento; compactar espacio decorativo móvil y corregir navegación móvil sin JavaScript.
- Hablar en español rioplatense para pymes de servicios no técnicas, sin elegir nicho. TYXX diseña, implementa y mantiene sistemas con software, automatización, IA y supervisión humana.
- Recorrido principal: «Conversemos sobre tu negocio» → sección de contacto → «Abrir WhatsApp». Consulta inicial sin cargo con Tomás; abrir WhatsApp no confirma envío, recepción ni reserva.
- Recorrido secundario: «Ver un ejemplo» → flujo ilustrativo de una consulta, con revisión humana explícita y sin sistemas conectados.
- Seis bloques editoriales, en orden: hero; problemas reconocibles; flujo ilustrativo; forma de trabajo; demos; FAQ/contacto.
- Forma de trabajo: relevar, acordar alcance, implementar y mantener según acuerdo; sin SLA ni acompañamiento ilimitado implícitos.
- Demos: asistente TYXX secundario, guiado por reglas; Chapas/Taller Norte ficticio, con estado externo pendiente de validación. Ninguna demo constituye un cliente o caso de éxito.
- Preservar Portfolite y el comportamiento compartido del asistente. Sin backend, IA real, CRM, agenda conectada, automatización de WhatsApp, persistencia/exportación, catálogo de siete servicios, pruebas comerciales inventadas ni analytics nuevos.
- Sin instalaciones, commits, pushes, despliegues ni edición de fuentes externas o proyectos hermanos. Las cifras de investigación no son decisiones ni promesas del usuario.

## Superficies de cambio previstas, no autorizadas todavía para editar
| Archivo | Papel y recomendación |
| --- | --- |
| `dist/strand.html` | Principal: textos, metadatos coherentes, jerarquía de seis bloques, anclas, contacto, ejemplo y navegación sin JS. Integrar el asistente en el bloque demos conservando IDs y estructura requeridos. |
| `dist/strand.css` | Exclusivo de Strand: compactación móvil, jerarquía y adaptación de bloques; mantener foco, contraste, texto ampliado y reducción de movimiento. |
| `dist/strand-motion.js` | Exclusivo de Strand: conservar motor y pausa; ajustar únicamente correspondencias de escenas si el nuevo HTML lo exige. |
| `tests/strand.spec.js` | Actualizar expectativas del recorrido y añadir navegación sin JS, contacto y ejemplo; conservar cobertura del asistente y movimiento. |
| `dist/app.js` | Compartido con Portfolite: evitar modificar. El CTA intermedio puede ser un enlace normal sin `data-contact`; revisar impacto en ambas páginas si fuera imprescindible tocar navegación. |
| `dist/config.js` | Compartido: reutilizar contacto autorizado y configuración de demo sin cambiar datos ni prometer disponibilidad. |
| `dist/assistant-loader.js`, `dist/assistant-view.js`, `dist/assistant-model.js`, `dist/assistant-simulator.js`, `dist/assistant.css` | Compartidos: conservar comportamiento y contratos DOM; no ampliar capacidades. |
| `dist/index.html`, `dist/styles.css` | Portfolite: preservar; no trasladar allí el rediseño. |
| `tests/assistant.spec.js`, `tests/assistant-quality.spec.js`, `tests/preview.spec.js`, `scripts/check.mjs` | Superficies de regresión existentes; sin necesidad demostrada de reestructurarlas. |

## Recomendación: arquitectura mínima
1. Evolucionar HTML semántico y CSS existentes. No crear motor de flujos, módulo de leads, adaptadores hipotéticos ni nuevas dependencias para una secuencia editorial.
2. Mostrar el ejemplo como secuencia legible de consulta, organización, revisión humana y próximo paso. Etiquetarlo como ilustrativo; no simular un envío o una reserva exitosa.
3. Separar anclas internas de salida externa: no usar `data-contact` en «Conversemos sobre tu negocio»; reservarlo para «Abrir WhatsApp» en contacto, conservando un href útil sin JS.
4. Resolver el menú por mejora progresiva local a Strand. Como alternativa mínima, ofrecer navegación HTML usable sin JS y conservar el menú mejorado actual; decidir el detalle en diseño sin introducir otro controlador por anticipado.
5. Reutilizar animación, logos, tipografía, FAQ nativa y módulo del asistente. No poner información esencial exclusivamente en Canvas o ilustraciones `aria-hidden`.
6. Preservar los IDs del asistente y sus enlaces `#asistente`; evitar regiones con nombres duplicados al agruparlo dentro de demos.

## Seams públicos y pruebas futuras
- **Contacto:** por nombre accesible, activar «Conversemos sobre tu negocio», comprobar llegada a contacto y enlace «Abrir WhatsApp» al número configurado; sin navegación externa prematura ni mensaje de éxito. Probar con y sin JS.
- **Ejemplo:** activar «Ver un ejemplo» y comprobar secuencia visible, revisión humana y rótulo ilustrativo; no depender de clases internas o píxeles animados para validar el contenido.
- **Navegación móvil:** a 360/390 px sin JS, acceder a enlaces útiles; con JS, probar teclado, Escape, retorno de foco y estado expandido.
- **Asistente secundario:** abrir desde demos y enlace directo, usar un ejemplo, editar ficha y cerrar/reabrir sin perderla; mantener aviso de reglas y fallback cuando falle la carga.
- **Accesibilidad y regresión:** conservar anchos 360/390/768/1440, texto al 200%, ausencia de desborde, foco visible, pausa y movimiento reducido; revisar contraste y orden de lectura visualmente.
- **Portfolite y rutas:** conservar `/index.html`, entrada `/` equivalente a `/strand.html` y contacto/asistente compartidos. Validar contenido y comportamiento, no solo existencia del enlace.
- Tests-first resulta concreto para navegación sin JS y nuevos recorridos observables; el ajuste estético requiere además inspección visual. Es una recomendación, no activación implícita de TDD estricto por una skill o por tener Playwright.
- Antes de apply, pedir al usuario confirmar dónde corresponde TDD y los seams bajo prueba, sin reabrir el alcance de producto aprobado ni decisiones históricas ya aceptadas.
- Comandos futuros existentes: `npm run check`, `npm test -- tests/strand.spec.js` y `npm test`; Playwright usa Chrome local. No se ejecutaron aquí ni se verificó el entorno instalado: resultado actual desconocido, sin trasladar aprobaciones históricas.

## Riesgos y pendientes
- **Contacto:** mantener `data-contact` en un CTA intermedio saltaría el recorrido aprobado.
- **Compartidos:** cambios innecesarios en `app.js`, configuración o asistente pueden alterar Portfolite; priorizar aislamiento en Strand.
- **Demo externa:** validar destino y capacidades realmente accesibles antes de describir funcionalidades concretas; mientras tanto, mantener descripción ficticia y prudente, sin certificar disponibilidad.
- **Contenido frente a animación:** reordenar escenas puede romper correspondencias o dejar información solo visual; preservar controles y texto accesible.
- **Presupuesto de revisión:** la reorganización puede superar 400 líneas, pero todavía no hay diff de implementación. Si surge ese riesgo, detenerse y consultar estrategia de entrega; no inferir encadenado ni `size:exception`.
- **Resolución de skills:** leídas las cuatro rutas inyectadas. La skill de fase `sdd-explore` no fue inyectada ni encontrada en fallback acotado bajo `.pi/agent`; se aplicó el contrato del ejecutor como operación degradada (`fallback-path`), sin cargar registro ni delegar.

## Próximo paso propuesto
Preparar la propuesta formal de `renovacion-tyxx-sistemas-ia` a partir de este alcance, con criterios observables y preservación explícita de compartidos. Esta fase no crea esa propuesta ni habilita implementación. La decisión TDD pendiente bloquea apply, no la planificación.
