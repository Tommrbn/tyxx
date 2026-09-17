# Diseño — renovación TYXX: sistemas e IA

## Estado, autoridad y evidencia
- Diseño únicamente; implementación y verificaciones no ejecutadas. Backend `openspec`, proyecto `tyxx`, alcance exclusivo de este repositorio.
- Entradas leídas directamente: `proposal.md`, `specs/landing-comercial/spec.md`, `exploration.md`, `openspec/config.yaml`, `CONTINUAR.md`, `CONTEXT.md` y `.agents/product-marketing.md`.
- Contrastados HTML/CSS/movimiento de Strand, `app.js`, configuración, loader/selectores del asistente, pruebas Strand/rutas, runner, comprobador, servidor y README. No existen ADRs relevantes bajo `docs/adr/`.
- `skill_resolution: paths-injected`: leídas las cuatro skills indicadas; aplicado el contrato de diseño del ejecutor, sin búsqueda adicional de skill de fase ni delegación.
- Preflight vigente: `auto`, `openspec`, `ask-on-risk`, 400 líneas cambiadas; `chain_strategy` diferida, ninguna excepción inferida. Auto no elimina los gates humanos.
- Solo se escribe este archivo. Sin fuentes, tareas, config, fixture de preservación, instalaciones, servidor, tests, commits, push, publicación ni acceso a repositorios externos.

## Decisión arquitectónica
Conservar HTML/CSS/JS nativos: `dist/` contiene fuentes editables sin compilación. El flujo es contenido editorial, no un nuevo módulo de negocio.
Las seams existentes son enlaces/nombres accesibles, atributos de escenas y DOM del asistente. Mantener su interface evita propagar complejidad a Portfolite; no crear adaptadores, motor de flujos ni runtime adicional.
`app.js` seguirá resolviendo contacto/configuración, demo y apertura del asistente; la navegación Strand tendrá una mejora progresiva local, independiente del controlador compartido.
Se justifica un cambio acotado en `strand-motion.js`: inicializar esa navegación en una IIFE separada, antes de la IIFE de Canvas, sin modificar el motor ni compartir su estado.
Alternativas descartadas: cambiar `app.js` amplía la superficie de regresión; duplicar navegación con un fallback permanente duplica landmarks; sumar un archivo runtime no aporta una seam necesaria.

## Composición y copy propuesto
Seis `section` hijas directas de `main#contenido`, en este orden; cada una usa `aria-labelledby` al título indicado. Las subsecciones del asistente no cuentan como bloques editoriales adicionales.
| Ancla | Nombre accesible / título | Contenido breve propuesto |
| --- | --- | --- |
| `#inicio` | `hero-title`: «Organizá tus consultas, desde el primer mensaje hasta el seguimiento.» (único H1 aprobado) | «Diseñamos, implementamos y mantenemos sistemas con software, automatización e IA, según tu proceso y con supervisión humana.» |
| `#problemas` | `problems-title`: «¿Te resulta familiar?» | «Copiar los mismos datos. Buscar información dispersa. Recibir consultas incompletas.» Introducción: «Son situaciones posibles: primero vemos cómo trabajás.» |
| `#ejemplo` | `example-title`: «Una consulta, paso a paso.» | «Ejemplo hipotético · sin sistemas conectados». Secuencia completa descrita debajo. |
| `#proceso` | `process-title`: «Primero entendemos. Después construimos.» | Relevamos el proceso; acordamos alcance; implementamos y probamos; documentamos y mantenemos según acuerdo. |
| `#proyectos` | `portfolio-title`: «Demostraciones, no promesas.» | Asistente de TYXX y proyecto ficticio Taller Norte, con límites junto a cada presentación. |
| `#contacto` | `contact-title`: «Conversemos sobre tu negocio» | «Consulta inicial sin cargo con Tomás. Contame qué querés mejorar; evaluamos juntos el próximo paso.» FAQ y salida explícita. |

- Conservar hero lateral, logos, fuentes THICCCBOI, paleta y partículas propias, no el titular anterior. Permitir el salto natural del H1 aprobado sin reducir tipografía ni recortarlo. El anuncio puede decir «Software · Automatización · IA»; no implica integraciones ya realizadas.
- Hero: enlace primario «Conversemos sobre tu negocio» → `#contacto`; secundario «Ver un ejemplo» → `#ejemplo`. Iconos decorativos `aria-hidden`, sin reemplazar esos nombres.
- Cabecera: «Contacto» → `#contacto`, sin salida externa; navegación «Problemas», «Ejemplo», «Cómo trabajamos», «Demos», «Contacto» a las cinco anclas posteriores al hero.
- Integrar la tira de compromisos dentro del hero y retirar sus tres promesas genéricas de servicios, evitando un séptimo bloque y texto redundante.
- Forma de trabajo, cuatro pasos: «Relevamos: vemos cómo trabajás»; «Acordamos: alcance, etapas e inversión»; «Implementamos: desarrollamos y probamos con vos»; «Entregamos: documentación y mantenimiento opcional según acuerdo».
- Conservar aquí la nota «La web acompaña cuando tu proceso necesita una interfaz». No añadir catálogo ni promesas de ahorro.
- FAQ: tres `details` nativos, bajo un H3 «Antes de empezar», dentro de contacto; sin otro landmark con nombre duplicado.
- Respuestas: IA no siempre necesaria; presupuesto a medida y plazos según alcance; implementación, herramientas externas y mantenimiento opcional separados; conexiones actuales sujetas a evaluación.
- Cierre: «Abrir WhatsApp» y «Vos decidís si enviás el mensaje. Abrir WhatsApp no envía una consulta ni reserva un turno». Mantener teléfono alternativo.
- Título de documento: «TYXX — Organizá tus consultas y su seguimiento»; descripción: «Evaluamos tu proceso de consultas, desde el primer mensaje hasta el seguimiento, y acordamos una solución con supervisión humana.» Sin claims adicionales. Conservar `noindex, nofollow` literalmente; no equivale a privacidad.

## Flujo ilustrativo y tres escenas existentes
Mantener los índices contiguos `0/1/2` de `data-story-step`, `data-story-visual` y `data-scene-choice`: el motor limita las formas a tres y usa el índice para localizar pasos.
El contenido accesible del ejemplo tendrá cuatro pasos repartidos en tres artículos `.story-step`: el primero contiene `ol` con pasos 1–2, el segundo `ol start="3"`, el tercero `ol start="4"`. No insertar wrappers inválidos dentro de listas.
Un resumen textual previo explicita «Consulta → organización de información → revisión humana → próximo paso»; no depender de que el lector infiera continuidad entre listas.
| Índice | Texto accesible fuera de Canvas | Ilustración / control |
| --- | --- | --- |
| 0 | «Consulta: llega una pregunta» → «Organización de información: se reúne lo necesario para revisarla» | Tarjetas de consulta e información; botón «Ver consulta y organización». |
| 1 | «Revisión humana: una persona revisa la información y decide qué falta» | Tarjeta «Revisión humana»; botón «Ver revisión humana». |
| 2 | «Próximo paso: se acuerda cómo continuar, si corresponde» | Tarjeta «Próximo paso por acordar»; botón «Ver próximo paso». |

- Grupo de botones: «Escenas del ejemplo»; conservar `aria-pressed`, elección móvil, seguimiento por scroll cuando `.story-art` es sticky y pausa existente.
- Las ilustraciones siguen `aria-hidden="true"` y sin controles simulados, estados «enviado», «reservado» o indicadores de conexión activa. El rótulo hipotético es texto visible y accesible fuera de ellas.
- El motor reescribe `.scan-query` con una frase fija: retirar esa clase del nuevo texto de revisión y usar una clase editorial con el mismo estilo estático. Su selector tolera ausencia; no necesita cambiar la frase en JS ni el motor.
- Sin JS, los cuatro pasos permanecen visibles; los controles de escenas y pausa siguen ocultos hasta inicializarse. Ninguna selección oculta el texto del proceso.

## Contacto, datos y dependencias
1. HTML ofrece `href="#contacto"` en cada CTA interno, sin `data-contact`, `data-service`, `target` ni manejador de salida.
2. Solo «Abrir WhatsApp» en contacto conserva `data-contact` y `href="https://wa.me/5492304514378"`, `target="_blank"`, `rel="noopener noreferrer"` como fallback útil sin JS.
3. Con JS, `config.js` → `app.js` sustituye ese href por número y mensaje general codificado; no adjunta ficha ni agrega envío desde TYXX. `data-phone` permanece intacto.
4. No cambiar `dist/config.js`: número autorizado y mensaje continúan siendo la fuente runtime. Documentar que el href estático también debe actualizarse si cambia el número para mantener el fallback.
5. Ejemplo y FAQ son locales; el asistente mantiene datos solo en memoria del navegador. No añadir fetch, almacenamiento, telemetría, exportación, agenda ni IA real.

## Navegación Strand por mejora progresiva
- Reemplazar las dos nav actuales por una sola `nav#strand-navigation`, nombre «Navegación principal», con los cinco enlaces indicados. No usar `#mobile-nav` ni `.menu-toggle` en Strand: así `app.js` no monta su controlador, sin alterar Portfolite.
- Nuevo botón HTML `.strand-menu-toggle`, inicialmente `hidden`, nombre «Abrir menú», `aria-controls="strand-navigation"`, `aria-expanded="false"`. El estado no se muestra hasta que existan handlers.
- Sin JS o con script bloqueado: nav visible en flujo normal y enlaces con wrap; botón oculto. Cabecera no sticky en la variante sin mejora para no ocupar la pantalla al crecer.
- IIFE local: obtener botón/nav; si faltan, salir; enlazar eventos y media query de 760 px; recién después habilitar clase `.strand-nav-ready` y sincronizar visibilidad.
- En móvil mejorado: nav inicialmente `hidden`, botón visible; Enter/Space nativos alternan nav y `aria-expanded`/nombre «Abrir/Cerrar menú». El siguiente Tab entra al primer enlace. No usar roles menu/menuitem ni atrapar foco.
- Escape dentro de nav abierta: cerrar y devolver foco al botón. Click fuera cierra; si todavía queda foco dentro de contenido que se ocultará, devolverlo al botón sin robar foco a otro control ya activado.
- Activar ancla: cerrar y enfocar el destino con `tabindex="-1"`, `focus({preventScroll:true})`, dejando la navegación hash nativa y su scroll. Ningún enlace oculto retiene foco.
- Al pasar a escritorio: nav visible, botón oculto, estado colapsado reiniciado; si el botón tenía foco, transferirlo al primer enlace. Al volver a móvil, cerrar y devolver foco al botón si estaba dentro de nav.
- Desktop nav es wrap, no duplicado oculto. A 200% permitir crecer cabecera y evitar foco tapado; pasar a cabecera no sticky en layouts estrechos. CSS `[hidden]` conserva prioridad.
- Inicialización independiente de Canvas/ResizeObserver: un fallo posterior de animación no deshabilita nav, contacto ni asistente; bloqueo total del archivo conserva la navegación HTML.

## Asistente y demo externa
- Mover íntegro el bloque `#asistente` dentro de `#proyectos`, conservando nombre de región único «Asistente de TYXX», IDs, clases usadas, `details#assistant-disclosure` y su summary «Describir mi proceso».
- Mantener todos los `assistant-*`, `sheet-fields`, `sheet-completeness`, starters, formulario, labels, status y fallback. Ajustar solo nivel del título introductorio a H3 si hace falta; no duplicar «Asistente de TYXX» como nombre de otra región.
- Tarjeta secundaria con enlace de nombre «Probar el asistente de TYXX» → `#asistente`; mantener aviso previo por reglas/sin IA real, pérdida al recargar y mejora pendiente de evaluación humana.
- `app.js` conserva apertura por enlaces y hash; `assistant-loader.js` conserva import diferido y catch; `assistant-view.js` conserva montaje/edición. Cerrar no desmonta ni borra la ficha. No modificar esos archivos.
- Taller Norte: conservar asset local con dimensiones/lazy loading, identificado como captura ilustrativa histórica de un proyecto ficticio, no evidencia del estado presente.
- Copy mínimo: «Taller Norte · Proyecto demostrativo ficticio. Disponibilidad del destino externo no verificada». Retirar «Vista previa sin envío» y cualquier funcionalidad atribuida al destino actual.
- Puede conservarse `data-demo` y href configurado, con nombre «Abrir enlace externo de Taller Norte (nueva pestaña)» y advertencia visible junto al enlace. No prometer demo operativa ni realizar comprobaciones externas en este cambio.

## CSS adaptable y accesibilidad
- Cambiar tanto `@media (max-width:760px)` como `@container (max-width:52rem)` y retirar overrides contradictorios: hoy fijan hero a 390 px y escenas a 470 px.
- Objetivos concretos en ambas variantes: hero decorativo 280 px (`height` y `min-height`); área puramente gráfica de escenas 300 px. No usar alturas fijas para textos o controles.
- En escenas compactas, overlays decorativos simplificados a tarjetas cortas; rótulo y selector en flujo normal debajo del área gráfica. A 100% buscar bloque total ≤420 px; a 200% permitir crecimiento del texto sin recorte, conservando la decoración de 300 px.
- Retirar posicionamiento absoluto del rótulo/selector en variantes compactas, no ocultar disclaimer para alcanzar altura. Orden DOM: texto del flujo antes de decoración; no invertirlo visualmente en móvil.
- Mantener los tamaños tipográficos existentes, sin reducirlos para encajar; quitar min-height de pasos móviles, usar gaps/padding menores y grids `minmax(0,1fr)`/wrap. No escalar todo el contenido ni aplicar overflow-hidden a controles.
- Asistente anidado: ajustar padding/ancho de `.portfolio .assistant.section-shell` para no sumar el frame del 88/94% y doble margen. Mantener estilos compartidos intactos.
- Interactivos modificados con objetivo táctil ≥44×44 CSS px, incluido selector y pausa; foco visible y no recortado. Medir contraste real normal ≥4,5:1 y texto grande/controles ≥3:1, también hover/foco.
- Conservar media query de movimiento reducido, `.motion-paused`, pausa y textos fuera de Canvas. Verificar a 200% antes de aceptar dimensiones; una decoración más baja nunca justifica ocultar contenido esencial.

## Superficies exactas previstas para apply
| Ruta | Cambio acotado |
| --- | --- |
| `dist/strand.html` | Seis bloques, copy/metadatos, anclas, nav única, reubicación intacta del asistente, semántica de escenas y contacto. |
| `dist/strand.css` | Estilos exclusivos: nav progresiva, compactación media/container, layout anidado, foco/contraste/targets. |
| `dist/strand-motion.js` | Solo IIFE de nav independiente previa; conservar algoritmo, formas, pausa y selección. No nuevo módulo runtime. |
| `tests/strand.spec.js` | Adaptar nombres/recorridos y añadir contratos UI, sin reemplazar regresiones de movimiento por snapshots masivos. |
| `docs/verification-renovacion-tyxx.md` | Registro nuevo de comandos/evidencia/limitaciones realmente observadas. |
| `CONTINUAR.md` | Estado local de renovación, pendientes y verificación; conservar historia. |
| `.agents/product-marketing.md` | Corregir prioridad comercial, seis bloques, límites de demo y deriva de rutas; conservar historial. |
| `README.md` | Solo detalles obsoletos: oferta Strand, escenas, apertura secundaria, nav y fallback de contacto. |

No editar Portfolite, archivos compartidos, assets, runner, scripts, dependencias, `.scratch/`, `.gitignore` preexistente ni `.pi/`. Si surge necesidad real fuera de esta lista, volver al gate de alcance.

## Verificación posterior y decisión TDD pendiente
- `strict_tdd: null` permanece desconocido. Antes de apply confirmar con el usuario TDD en seams públicas: contacto/ejemplo por enlaces accesibles y nav móvil con/sin JS; asistente/fallback y rutas como regresiones. No exigir tests de una abstracción editorial nueva.
- Recomendación: red/green para nuevos recorridos y navegación; inspección visual para composición. No es política activada ni sustituye la decisión humana.
- `rules.apply` contiene «Init solo autoriza este archivo»: es alcance histórico de init, no veto perpetuo. Cuando el padre registre la decisión TDD autorizada debe acotar esa redacción a init y registrar el alcance aprobado de apply; no editar config en diseño.
- Automatización existente: `npm run check`, después `npm test -- tests/strand.spec.js`, después `npm test`; Chrome local/instalación aún no comprobados. Playwright puede iniciar/reutilizar servidor: ejecutar solo con autorización de verificación, sin instalar implícitamente.
- Matriz nueva: 360/390/768/1440 px × texto 100/200%, más contenedor estrecho con viewport ancho; medir overflow y alturas decorativas, no igualdad exacta de píxeles animados.
- Contacto con/sin JS: click primario cambia hash a contacto, sin popup; secundario lleva a ejemplo; verificar href externo/número y mensaje configurado sin visitar WhatsApp ni atribuir envío.
- Nav a 360/390 con/sin JS y script de movimiento bloqueado: una sola navegación accesible, fallback visible, botón ausente sin mejora; teclado, Escape/foco, cierre por enlace/fuera y resize. Inyectar fallo Canvas para comprobar independencia.
- Ejemplo: cuatro pasos/rótulo visibles, índices 0–2/nombres/pressed, scroll sticky y selección móvil; movimiento reducido/pausa/puntero conservan pruebas existentes.
- Asistente: acceso por demo y hash, caso libre/ejemplo, omisiones/correcciones, edición de campo, cierre/reapertura, pérdida al recargar declarada y fallo del import con alternativa útil. Reutilizar cobertura existente sin duplicarla indiscriminadamente.
- Full suite preserva `/`, `/strand.html`, `/index.html`, contacto y comportamiento compartido; revisar además diff de archivos preservados contra base local previa, sin sobrescribir cambios ajenos ni crear fixture ahora.
- Observación humana/browser: orden de landmarks/encabezados con lector de pantalla, foco/scroll sticky, contraste medido, zoom/texto 200%, targets, alturas y ausencia de recortes con FAQ/asistente abiertos. Automatización sola no certifica accesibilidad.
- Registrar en verificación comandos, fecha, entorno, resultados y omisiones. Ningún resultado histórico cuenta como ejecución actual; sin credenciales, consultas externas ni publicación.

## Volumen, unidades locales y rollout
Estimación bruta de adiciones + eliminaciones, contando movimientos como borrar/agregar: HTML 550–850, CSS 160–260, JS 65–100, tests 180–280, docs de entrega 100–180; total previsto **1055–1670 líneas**. No es diff medido ni promesa de quedar bajo 400.
Planificación aparte: exploración ~90, propuesta ~90, specs ~150 y diseño ~160 líneas nuevas (aprox. 490); contar también revisiones/eliminaciones efectivas al medir. No esconder artefactos para aparentar cumplimiento.
Unidades coherentes propuestas, no commits ni cadena acordada: (1) recorrido comercial/reordenamiento + tests contacto/ejemplo/asistente + copy/documentación; (2) nav progresiva + tests teclado/sin JS + evidencia; (3) compactación/escenas + tests adaptables/movimiento + registro final y estado.
La primera unidad puede superar sola 400 por reubicación del asistente. Medir diff bruto real; no fragmentar tests/docs de su comportamiento para maquillar tamaño.
**Gate de entrega:** riesgo confirmado por estimación; el padre debe pausar y pedir decisión `ask-on-risk` antes de continuar a implementación/entrega. Estrategia de cadena diferida; no inferir `size:exception`, crear PRs ni hacer commits.
Rollout exclusivamente local después de resolver TDD, alcance de apply y decisión de revisión; validar primero recorridos y luego observación visual. No desplegar ni modificar indexación/acceso.
Rollback mediante edición inversa de hunks atribuibles al cambio contra base previamente identificada, incluyendo tests/docs; sin reset/restauraciones globales, preservando trabajo ajeno. Diseño no activa flags ni migraciones.
