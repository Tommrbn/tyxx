# Verificación local — renovación TYXX

> Nota de privacidad (2026-09-23): identidad personal anonimizada; contacto anterior retirado. El contacto vigente es tyxxsolve@gmail.com. Las menciones del canal anterior describen decisiones o pruebas de su fecha, no una verificación del correo actual.

## 2026-09-16 — prerrequisito 10 y base 2 (parcial)

Autorización actual: una sola optimización de transferencia de medición del test del puntero; ninguna fuente de producción ni tarea 3–9. `size:exception` aceptada; sin cadena, commits, publicación, instalaciones ni visitas externas. La aclaración posterior del padre permite únicamente las capturas generadas existentes `.scratch/asistente-tyxx/evidence/*.png` y `test-results/**`, no documentos históricos de `.scratch`.

### Evidencia histórica recibida del padre, no ejecutada por este hijo

- Hijo anterior mu4fa1fc-a-a73g cancelado tras relay q1 no disponible; outputs recuperados: Node 24.12 / npm 11.19; `npm ci` autorizado instaló tres paquetes; check estático pasó; Strand original 8/9 en 58,6 s, timeout del puntero en segundo render.
- Verificador independiente posterior: puntero falló en 32,6 s; suite 29/30 en 2,7 min; diagnóstico sin trace también agotó 30,6 s antes de aserciones.
- No se habían persistido documentos. Esto no prueba fallo funcional de la animación ni constituye RED de contacto/ejemplo/nav.

### Base observada directamente en esta ejecución

Leídos configuración, propuesta, spec, diseño, tareas, package/lock, runner, scripts de check/servidor y las cuatro suites. Node `v24.12.0`, npm `11.19.0`, lock Playwright `1.63.0`, requisito Node >=20. Dependencias y Chrome disponibles según ejecuciones reales. No se reinstaló nada ni se cambió caché/config global.

Git inicial: `.gitignore` +2/-0, `.pi/` y `openspec/` no seguidos; tests, producción y lock sin diff. Después: solo `tests/strand.spec.js` añade diff versionado propio (+23/-21). Hashes tomados antes y después de editar coinciden en fuentes dist de primer nivel, lock, `.gitignore` y marcador `.pi`; tabla debajo. Son evidencia de esta ejecución posterior a la instalación, no prueba de bytes preinstalación. Sin diff de assets/scripts/runner/pruebas compartidas.

Alturas móviles basales contrastadas en CSS sin editar: hero 390 px (líneas 622–623, 1478–1479), escenas 470 px (1423, 1495), variantes media/container. No se realizó una medición visual nueva ni auditoría de lector/contraste.

### Única optimización aplicada

El buffer RGBA permanece en el navegador como typed array. La selección del máximo alfa conserva límites, recorrido y comparación estricta originales. Ambos renders suman cerca/lejos alrededor del tip basal con `Math.hypot` y radio 110. Solo se devuelven `near`, `far`, `width`, `height`, `tip`. Se conservan viewport/DPR, relojes, fuentes, movimiento de puntero, cierre de página y las tres aserciones originales sin cambios: `nearBefore > 0`, `nearAfter > nearBefore * 1.1`, `abs(farAfter-farBefore)/farBefore < 0.05`. No hubo segunda optimización, retries, ampliación de timeout, desactivación de trace ni logging de métricas.

### Comandos ejecutados una vez cada uno

| Comando/check | Resultado actual |
| --- | --- |
| TCP local 127.0.0.1:4180, timeout 2 s | Libre; Playwright pudo gestionar servidor. No se mató servidor alguno. |
| `npm run check` | PASS: index 29 IDs/14 recursos; Strand 32 IDs/15 recursos; sintaxis/config correctas. |
| `npm test -- tests/strand.spec.js -g "el puntero" --workers=1` | FAIL: 1/1, timeout 30,0 s; segundo render, `locator.evaluate` línea 104, llamada línea 138. |
| `npm test -- tests/strand.spec.js` | FAIL: 8 PASS, 1 timeout; 59,1 s total; puntero 30,0 s, segundo render en `boundingBox` línea 100. |
| `npm test` | FAIL: 29 PASS, 1 timeout; 1,8 min total; puntero 30,0 s. |

Todas las ejecuciones conservaron trace normal. La última dejó `test-results/strand-Strand-el-puntero-i-9ec93-sin-iluminar-toda-la-figura/trace.zip` y `error-context.md`; las ejecuciones posteriores pueden reemplazar outputs anteriores. No hay métricas de iluminación exitosas: ninguna ejecución del puntero alcanzó un resultado aprobado. Los demás checks pasan, pero la base completa no está aprobada.

### TDD Cycle Evidence

| Tarea | Safety net / RED | GREEN | TRIANGULATE | REFACTOR |
| --- | --- | --- | --- | --- |
| 10, infraestructura de test existente | Timeout reproducible previo aportado por padre; no nuevo RED funcional | No alcanzado: puntero sigue agotando 30 s | No nuevos casos: contrato existente near/far preservado | Una optimización acotada de transporte; producción intacta |
| 2, base | Regresiones existentes, no RED nuevo | Check estático PASS; suites parciales 8/9 y 29/30 | No aplica ciclo de funcionalidad nueva | Ninguno |
| Futuras 3/4/6 | RED de contacto/ejemplo/nav aún pendiente | No implementado | Pendiente | Pendiente |

**Conclusión:** tareas 10 y 2 permanecen sin marcar; tarea 1 conserva su estado completado; 3–9 intactas y pendientes. La reducción de datos transferidos no resolvió el timeout; no se afirma causa definitiva ni defecto de producción. Requiere nueva decisión del padre/usuario antes de ampliar diagnóstico o cambiar otras superficies.

### SHA-256 base y cierre (coincidentes)

| Archivo | SHA-256 |
| --- | --- |
| `dist/app.js` | `db1dc38dbfc5e21fae9fd6006d951ac3a31ea0018ea1eb0901118d098be5d57d` |
| `dist/assistant-loader.js` | `a7e6f9293a62f22c7842a8243bd2f7389f30b33eff99fc207be4ab3a1c62e167` |
| `dist/assistant-model.js` | `ee32f884c6117719414612b49d0fbf66c74c27ca965deb0d617781b5c306a695` |
| `dist/assistant-simulator.js` | `671e0ea9a6aa5dc0c70fd94380420adf61c4cd73f9687cd66ae77c2f1c411a43` |
| `dist/assistant-view.js` | `a916cfe62cb2b12a14870c9aedbd3f49527d87b875c96067804f1942d2c5d86a` |
| `dist/assistant.css` | `e1db685ddf93a3b20049a93c98f8ea80b81df09514fb58332f930aa7b627b500` |
| `dist/config.js` | `6ba2a62067f8e55fe2220384f23b438ff10a7fb3c54c3d93c2fb29dc65cf1b4e` |
| `dist/index.html` | `ee0333cc08b23e85a2010cb133554e280d27b7c1a91c4e36aad046ebc12b1dc1` |
| `dist/strand-motion.js` | `449e4f1bd43267437111c9d55ea54653deabc974da839caf327c0d5e9a1c8b4a` |
| `dist/strand.css` | `fe17ce3844bb6690e6e5ec87813a6616a93f97f3f85b6b4c28631a93e87f5ff0` |
| `dist/strand.html` | `8cd595bc069d698663230d958f512e897fa00c3a98e8046f7921192330db1ac0` |
| `dist/styles.css` | `8b29f12b3b8e18bc81836bc77a4e2b2dd0e325977ad59afd9523f3798f9f61e3` |
| `package-lock.json` | `70a672f5e1c195b7bb1031b7dbd204435f5d28b14cc96c5f570fdeabb3f66777` |
| `.gitignore` | `8b4503889cc435fd4a142ae5479a67d22036d389d32e389d0ed474983e99b295` |
| `.pi/gentle-ai/sdd-preflight.json` | `3ca01eae75bf14ecc01f6bce90a5334f544377daa033c19b17fe58cf7b1e174e` |


## 2026-09-18 — base actual GREEN sin reparación nueva

Pedido vigente: «Resuelve fallo de la base de pruebas y la implementacion de la renovacion de partes». Esta delegación solo admite diagnóstico/reparación test-only de base, no tareas 3–9. Se reconcilió autorización y añadió prerrequisito estable 11 antes de cualquier posible edición del driver; no se editó finalmente ningún test ni producción.

Base Git actual: main, HEAD 0a9869d, solo .pi/ sin seguimiento al inicio. Los cambios del intento anterior ya forman parte de ese commit, no son cambios de esta ejecución. Node v24.12.0, npm 11.19.0; dependencias Playwright 1.63.0 y Chrome disponibles por ejecución. Sin instalaciones. TCP4180 libre antes de cada invocación de navegador; Playwright inició su servidor, sin reutilizar ni matar procesos ajenos.

### Comandos y resultados propios (una ejecución por comando)

| Comando | Resultado | Tiempo informado por runner |
| --- | --- | --- |
| npm test -- tests/strand.spec.js -g "el puntero" --workers=1 | 1/1 PASS, sin modificación | test 23,4 s; total 26,9 s |
| npm run check | PASS, index 29 IDs/14 recursos, Strand 32 IDs/15 recursos, sintaxis/config | No medido individualmente |
| npm test -- tests/strand.spec.js | 9/9 PASS | total 35,6 s; puntero 23,8 s |
| npm test | 30/30 PASS | total 1,0 min; puntero 24,0 s |

El dirigido inicial ya fue GREEN: no se reprodujo RED actual. Las suites posteriores son regresiones requeridas tras ese pase, no intentos hasta lograr verde. No se justificó avanzar a hipótesis causal, profiling ni reparación especulativa sin bucle RED. La distribución de CPU y causa del timeout histórico siguen desconocidas. No se afirma que agregación, concurrencia, tracing ni carga externa expliquen el cambio de resultado.

La evidencia histórica del padre incluye trace SHA-256 1d0f23089d280c6c44f703a268772509efb65e0b50ad8d68c8198e6d77a22d56: baseline runFor2500 8,219 s; runFor600 3,598 s; pixel evaluate 0,877 s; gap previo a close 1,801 s; hover runFor2500 8,739 s; mousemove 0,036 s; último runFor600 incompleto desde 27,724 s hasta AfterHooks30,141 s. Es historia suministrada, no medición propia. Los outputs normales test-results/** se regeneran con el runner y no constituyen un archivo inmutable de ese ZIP; se conserva aquí su evidencia recibida.

### Preservación y límites

Git diff contra HEAD vacío en dist/, tests/, package.json, package-lock.json, playwright.config.js, scripts/ y .gitignore. .pi/ continúa sin seguimiento y no fue editado. Capturas existentes generadas por suite autorizadas; no edición de Markdown .scratch. Alturas móviles base reconfirmadas por lectura de dist/strand.css: hero390 en líneas622–623 y1478–1479; escenas470 en1423 y1495. Es contraste CSS, no medición visual nueva. No se certifica contraste, lector de pantalla ni renovación de producto.

Se conservan literalmente driver, estados independientes, tip basal, geometría, radio110, clocks2500/600 y las tres aserciones. Sin hooks, fastForward, menos frames, skips, retries, aumento de timeout, trace desactivado ni cambios de movimiento. Los tres pases actuales no demuestran eliminación permanente de flakiness; puntero conserva solo unos6 segundos de margen en suite completa.

### TDD Cycle Evidence actual

| Tarea | RED / safety net | GREEN | TRIANGULATE | REFACTOR |
| --- | --- | --- | --- | --- |
| 11, reparación de infraestructura | RED actual no reproducido; dirigido existente PASS | No se atribuye reparación | Regresión dirigida, Strand y suite sin cambios | Ninguno; driver intacto |
| 2, base | Base actual comprobada, no nueva feature | Check, 1/1, 9/9, 30/30 | Contextos dirigido y suites existentes | Ninguno |

Tarea2 marcada completa por validación basal actual. Tarea10 conserva intento fallido; tarea11 queda pendiente de corrección causal, sin inventar éxito; tareas3–9 intactas. Cero tests nuevos, cero funciones nuevas, 30 regresiones existentes pasando. Esta entrega aporta base GREEN, no arreglo demostrado. El padre debe refrescar estado nativo y decidir continuación; no se ejecutó mantenimiento/revisión nativa ni se avanzó producto.


## 2026-09-18 — unidad 1, continuación comercial autorizada

Safety net propia antes de fuentes: `npm test -- tests/strand.spec.js` PASS9/9 (30,8s; puntero21,6s). Listener4180 ECONNREFUSED, runner inicia servidor. Conservados tres documentos preexistentes modificados; sin otras fuentes previas modificadas.

Tarea3, contacto: primer comando dirigido tuvo error de sintaxis en el test (string multilínea), corregido antes de fuentes; no se cuenta como RED. `npm test -- tests/strand.spec.js -g "consulta interna"`: RED por enlace principal inexistente; GREEN1/1 (6,5s) tras ancla interna, metadatos y FAQ/contacto. Triangulación sin JS y lectura: `npm test -- tests/strand.spec.js -g "lectura comercial"` RED por orden/anclas anteriores; luego `npm test -- tests/strand.spec.js -g "consulta interna|lectura comercial"` PASS2/2 (5,9s). WhatsApp se inspecciona, no se visita. Sin refactor adicional. El traslado del asistente se reserva a5: aún hay una séptima sección directa transitoria, por lo que3 no se marca completa todavía.

Tarea4: `npm test -- tests/strand.spec.js -g "ejemplo hipotético"` RED por enlace «Ver un ejemplo» inexistente (timeout de locator, distinto del puntero). Tras implementación `npm test -- tests/strand.spec.js -g "ejemplo hipotético|las escenas"` PASS2/2 (5,8s). Triangulación sin JS: `npm test -- tests/strand.spec.js -g "ejemplo|las escenas"` PASS3/3 (6,6s). `npm run check` PASS (33 IDs Strand). Cuatro pasos en tres listas válidas, revisión humana y resumen fuera de Canvas; scroll sticky y selector móvil comprobados. Motor intacto, texto editorial sin scan-query; no refactor necesario. Tarea4 marcada [x]; README corrige escenas/oferta.

Tarea5 parcial: `npm test -- tests/strand.spec.js -g "demostración secundaria"` RED por asistente fuera de demos (0 regiones anidadas). Tras traslado/nombre secundario/límites ficticios, `npm test -- tests/strand.spec.js -g "demostración secundaria|consulta interna|lectura comercial|página y ficha"` PASS7/7 (14,7s). Incluye edición, cierre/reapertura, memoria conservada, pérdida al recargar y hash de recarga; cuatro anchos existentes. Ahora hay seis secciones directas;3 marcada [x],4 ya [x]. Tarea5 sigue [ ]: faltan triangulación de entrada directa/fallo de import y documentación final de límites/fallback/teléfono.

**Detención por alcance:** lectura de `tests/assistant.spec.js` y `tests/assistant-quality.spec.js` detectó dos recorridos compartidos que buscan en `/` el CTA eliminado «Contame qué proceso querés mejorar». El primero es «describe un proceso desde la portada y completa una ficha sin exigir datos personales»; el segundo «la conversación y las ediciones no envían datos a la red». No se ejecutó suite completa renovada; incompatibilidad detectada por lectura, no fallo observado. No se editaron compartidos ni se añadió CTA obsoleto para esconderla. Consulta al padre agotó tiempo sin entregar payload; no concede permiso. Al recibir instrucción de detenerse ante conflicto real se dejó este handoff. Se había avanzado tarea5 mientras se esperaba respuesta; no hubo ampliación de superficies.

Pregunta exacta pendiente: ¿Autorizás adaptar SOLO los dos locators del CTA anterior en esas pruebas compartidas al acceso secundario «Probar el asistente de TYXX», mediante una delegación posterior/por el padre, manteniendo todas sus aserciones? Esta delegación no tiene permiso para editar esos archivos.

Último check estático ejecutado después de4 PASS; aún no repetido después del traslado5. Strand completa y suite completa posteriores a renovación NO ejecutadas por detención. El safety net9/9 inicial no certifica la renovación completa ni reparación del timeout. Sin nuevas comprobaciones externas, instalaciones, commits o publicación. No inspección visual/lector/contraste actual; tareas6–9 intactas y pendientes.


### Continuación posterior autorizada por el padre — cierre parcial de unidad1

El padre recibió q1 y ordenó terminar tarea5/checks dentro de las ocho superficies, sin editar compartidos; pedirá por separado autorización específica para esos dos locators. Esta instrucción reanudó lo permitido, no amplió alcance. Marketingv9 ahora explica memoria/reglas/fallback y límites actuales del destino externo conservando evidencia histórica; README corrige acceso secundario y sincronización del href/teléfono estáticos cuando cambie config.

Triangulación tarea5: `npm test -- tests/strand.spec.js -g "acceso directo|contacto independiente|demostración secundaria"` dio3PASS/1FAIL (11,1s) por selector incorrecto del test nuevo (`#sheet-fields > div`: los campos existentes son dt/dd). Se corrigió solo la prueba para contar los seis botones accesibles «Editar», sin tocar producción. No se atribuye ese fallo a comportamiento RED. Mismo comando PASS4/4 (9,4s): hash directo, memoria/recarga y fallback con JS desactivado/import abortado, contacto útil sin popup ni visita externa. Sin refactor productivo necesario.

| Comando final realmente ejecutado | Resultado |
| --- | --- |
| `npm run check` | PASS; index29 IDs/14 recursos; Strand33 IDs/15 recursos; sintaxis/config válidas |
| `npm test -- tests/strand.spec.js` | PASS17/17,32,4s; puntero24,3s |
| `npm test` | 36PASS/2FAIL,1,5min; punteroPASS24,0s |

Los dos fallos completos son exactamente los locators protegidos anticipados: tests/assistant-quality.spec.js:80 y tests/assistant.spec.js:290, timeout esperando «Contame qué proceso querés mejorar». Ningún otro fallo; no timeout del puntero recurrente. No se reintentó suite completa ni se modificaron tests compartidos. El test de ausencia de envío no alcanza sus aserciones finales al fallar su locator; NO certificarlo como aprobado. Las regresiones restantes pasan (omisiones, correcciones, casos ambiguos, ejemplos, edición, teclado, fallback y rutas); Portfolite preservada por diff y prueba de ruta, no nueva revisión interactiva integral de Portfolite.

`git diff` de fuentes protegidas, motor, pruebas compartidas, scripts/runner/package/lock/.gitignore vacío. Driver completo del puntero comparado textualmente con HEAD (normalizando CRLF): idéntico. .pi/ permanece sin seguimiento e intacta. Solo ocho superficies autorizadas modificadas; outputs normales del runner regenerados. No revisión visual/contraste/lector en esta unidad. La carga diferida preservada es la imagen con loading=lazy y el import del loader existente: no se cambió cuándo monta el módulo.

Tareas3/4 completas;5 implementada y checks focalizados verdes, pero aceptación final pendiente por las dos regresiones compartidas sin permiso de adaptar. Por prudencia5 continúa [ ];6–9,10/11 permanecen [ ]. Timeout basal no reparado; nuevos fallos de locator son distintos del riesgo histórico.


## Cierre de unidad1 — excepción explícita de dos selectores

Usuario: «Actualizar los dos selectores (Recomendado)». Registrado en tasks antes de editar. Cambio exclusivo de nombre de enlace en tests/assistant.spec.js:289 y tests/assistant-quality.spec.js:79: «Contame qué proceso querés mejorar» → «Probar el asistente de TYXX». Diff comprobado: una sustitución por archivo, todas las demás instrucciones/aserciones intactas. No se modificaron fuentes ni tests Strand en esta continuación. Listener4180 libre (ECONNREFUSED); sin matar procesos ni instalar.

| Comando actual | Resultado |
| --- | --- |
| `npm test -- tests/assistant.spec.js tests/assistant-quality.spec.js -g "describe un proceso desde la portada|la conversación y las ediciones no envían datos"` | PASS2/2;7,3s |
| `npm run check` | PASS; index29 IDs/14 recursos; Strand33 IDs/15 recursos |
| `npm test -- tests/strand.spec.js` | PASS17/17;31,2s;puntero22,1s |
| `npm test` | PASS38/38;56,2s;puntero24,8s |

RED atribuido: los dos fallos de locator de la suite anterior36/38, registrados arriba; no nuevo RED inventado. GREEN de ambas pruebas alcanza ahora sus aserciones finales, incluida conservación y ausencia de envío. Triangulación/regresión: Strand completa y suite completa, sin añadir tests ni alterar aserciones. Sin refactor. Tarea5 marcada[x] después de todos los checks: unidad1 tareas3–5 completa. Tareas6–11 pendientes; timeout histórico no reparado ni atribuido a estos selectores. No unidad2, publicación, commits, nuevas visitas externas ni certificación visual/lector/contraste. La revisión independiente corresponde al padre.

## 2026-09-18 — unidad 2: navegación implementada; aceptación bloqueada

Solo tarea6 y ocho superficies autorizadas. Safety net propia `npm test -- tests/strand.spec.js`:17/17 PASS,29,4s (puntero22,0s), antes de fuentes. Antes de cada ejecución se comprobó TCP4180 libre con Node/net (ECONNREFUSED); Playwright gestionó servidor. Sin instalaciones, visitas externas, kills ni cambios de runner.

### TDD Cycle Evidence — comandos y resultados reales

Todos los dirigidos usan `npm test -- tests/strand.spec.js -g` y el filtro literal indicado. Ciclos verticales, no tests masivos previos a código.

| Comportamiento / filtro | RED observado | GREEN | TRIANGULATE |
| --- | --- | --- | --- |
| `"Strand nav: fallback"` | 1FAIL: navegación principal no visible360 sinJS | 1/1,4,0s | 4/4,8,0s:360/390 sinJS y archivo bloqueado; cinco enlaces/hash, wrap sin desborde, botón oculto, cabecera static |
| `"Strand nav: apertura"` | 1FAIL: Abrir menú oculto | 1/1,3,4s | 2/2,4,8s:Enter360,Space390 con excepción Canvas observada; Tab entra/sale sin trampa, Escape/foco/ARIA |
| `"Strand nav: enlace"` | 1FAIL: #ejemplo no enfocado tras hash | 1/1,3,6s | 2/2,4,9s:Enter/Ejemplo360 y click/Cómo trabajamos390; destino visible enfocado, nav oculta, hash/scroll nativos |
| `"Strand nav: click exterior"` | 1FAIL: nav permanece visible | 1/1,3,6s | 1PASS/1FAIL: click sintético deja foco sin transferir; corrección mínima →2/2,4,6s |
| `"Strand nav: resize"` | 1FAIL: primer enlace no recibe foco | 1/1,3,5s | 2/2,5,4s:760/761 y360/390/1440, menú abierto/cerrado y foco externo preservado |

Una expectativa nueva del click exterior resultó incorrecta: Chrome retira foco del enlace de cabecera por navegación hash nativa. Ese run falló1/1 en foco, no cierre. Se sustituyó el estímulo por el control real de animación para comprobar activación/foco sin navegación; no se cambió producción para forzar foco contra el navegador. Se mantienen cierre, foco visible y efecto del control. El caso sintético triangula la rama sin transferencia de foco de puntero.

Refactor limitado a legibilidad de condiciones y sangría de nuevos tests. La regresión Strand de texto200% adapta su recorrido a Problemas y conserva acceso/verificación posterior del asistente secundario. `npm test -- tests/strand.spec.js -g "Strand nav:|movimiento reducido"`:13/13 PASS,15,5s tras refactor. Total12 tests E2E nuevos, cero funciones puras extraídas.

| Comando final | Resultado |
| --- | --- |
| `npm run check` | PASS: index29 IDs/14 recursos; Strand33 IDs/15 recursos; sintaxis/config correctas |
| `npm test -- tests/strand.spec.js` | PASS29/29,38,7s; puntero22,5s |
| `npm test` | 49PASS/1FAIL,1,0min; puntero22,9s |

**Bloqueo exacto:** `tests/assistant-quality.spec.js:174`, «menú, conversación y correcciones se operan con teclado y foco visible», visita `/` y busca «Navegación móvil» → «Asistente» (líneas184–189). El contrato aprobado ahora es navegación principal única de cinco enlaces sin Asistente. Falla en186 antes de las aserciones de conversación/corrección; NO certificarlas como PASS. Archivo protegido: los dos selectores autorizados en unidad1 no habilitan editar este recorrido. No se restauró UI obsoleta ni alteró ese test. Padre notificado; requiere autorización separada para adaptar solo recorrido nav manteniendo aserciones posteriores. No repetir suite hasta verde ni iniciar unidad3. Tarea6 permanece [ ];7–11 pendientes.

Preservación: Canvas es sufijo byte-for-byte del archivo previo, SHA256 `449e4f1bd43267437111c9d55ea54653deabc974da839caf327c0d5e9a1c8b4a`; solo57 líneas de IIFE previas. Driver puntero idéntico a HEAD normalizando CRLF: radio110, umbrales, estados/reloj intactos. SHA256 compartidos pre/post idénticos: assistant.spec `4ed7efe5f63508513502627d3d653d57a9dae3634122ece93bbfc1f301995e47`, assistant-quality.spec `f363a4b495e9744e9b94a457a304fa81470ef363046c689ca7244069c8270dde`. Diff vacío en fuentes Portfolite/compartidas, assets, scripts, config/lock/runner, preview.spec y .gitignore. Sin cambios .pi/ ni Markdown .scratch; outputs permitidos regenerados. `git diff --check` PASS. Sin reparación causal del timeout histórico, inspección humana de lector/contraste ni publicación. Composición7 y revisión final8/9 no implementadas.


## Cierre de unidad2 — recorrido compartido autorizado

Usuario «Adaptar ese recorrido (Recomendado)» registrado en tasks antes de editar. Solo cambió entrada del test compartido de teclado: primer foco Problemas, Tab por Ejemplo/Cómo trabajamos/Demos, Enter, nav oculta/ARIA/hash y destino enfocado visible, Tab al asistente secundario y Enter. Las instrucciones/aserciones originales de conversación/corrección posteriores permanecen intactas, al igual que los dos selectores previos. Sin producción ni otras pruebas modificadas.

| Comando actual | Resultado |
| --- | --- |
| `npm test -- tests/assistant-quality.spec.js -g "menú, conversación y correcciones"` | PASS1/1,5,9s; test2,3s |
| `npm run check` | PASS, index29 IDs/14 recursos, Strand33 IDs/15 recursos |
| `npm test -- tests/strand.spec.js` | PASS29/29,44,0s; puntero23,4s |
| `npm test` | PASS50/50,1,0min; puntero22,7s |

RED atribuido al fallo186 de suite anterior49/50, no nueva reproducción inventada. GREEN dirigido alcanza todas las aserciones de foco/conversación/correcciones. Triangulación regresiva: Strand/full sin cambios de driver, timeout, retries o trace; sin refactor ni tests nuevos. Listener4180 libre antes de cada run, runner gestiona servidor. `git diff --check` PASS; diff del test confirma únicamente entrada autorizada además del locator previo preservado. Tarea6 marcada[x] inmediatamente tras checks. Tareas7–11 pendientes; no unidad3, auditoría humana final, reparación causal del timeout, mantenimiento nativo, instalaciones ni publicación.

## 2026-09-21 — unidad3: composición completa y accesibilidad parcial

Fecha del sistema comprobada:2026-09-21T13:11:31-03:00; se conservan fechas históricas anteriores. Node24.12.0/npm11.19.0, Playwright1.63.0, Chrome153.0.8010.48. Tarea7 completa;8 pendiente de lector humano;9 registra integración sin declarar aceptación global. Sin instalaciones, visitas externas ni nuevas ediciones compartidas.

### Ejecución y TDD

Safety net antes de fuentes: `npm test -- tests/strand.spec.js`29/29,40,6s; puntero23,4s. Puerto4180 inicialmente libre; runner gestionó servidores. Para capturas/diagnósticos, Node en memoria inició procesos propios y cerró en finally; comprobó HTTP200, x-tyxx-preview strand y cuerpo idéntico a dist/strand.html. No se mataron procesos ajenos.

Filtros del comando `npm test -- tests/strand.spec.js -g "FILTRO"`:

| Filtro | RED observado | GREEN/triangulación |
| --- | --- | --- |
| `Strand compacta:` | Hero390, esperado280 | 1/1,3,5s; después matriz |
| `Strand matriz:` | 6/10: móvil200% desborda543/544 px y preview recorta texto | Wrap/grid/preview/dt corregidos; `Strand compacta:|Strand matriz:`11/11,15,9s |
| `Strand matriz: 360px` | 1/2 tras corregir medición del bitmap del logo | Confirma200% RED real antes de CSS |
| `Strand accesible:` | Targets19,19–42 px y botones38×38 | 2/2,5,9s a390/1440; mínimo44×44 y foco no tapado |
| `contraste medido` | Pausa: cota3,28; hover Agregar respuesta1,79 | Fondos opacos y color hover exclusivo:1/1,15,5s; normal/hover/focus y tres escenas pressed |
| `lectura AX` | Rótulo sobre Canvas sin cota segura:3,28 | Fondo sólido:1/1,17,9s; skip-link/landmarks/nombres/texto |

Dos correcciones de tests nuevos, no RED funcional: medir enlace visible del logo, no márgenes del bitmap intencionalmente recortado; activar modalidad teclado con Tab antes de comprobar focus-visible, no foco programático posterior a click. Ninguna aserción histórica debilitada. Sin refactor separado necesario; se retiraron overrides440/470 al implementar ambas variantes.15 tests E2E nuevos; cero funciones productivas nuevas.

| Comando final | Resultado |
| --- | --- |
| `npm run check` | PASS; index29 IDs/14 recursos; Strand33 IDs/15 recursos |
| `npm test -- tests/strand.spec.js` | PASS44/44,1,3min; puntero27,8s, margen estrecho |
| `npm test` (tail de salida y pipefail activo) | PASS65/65,1,6min; una sola suite completa posterior a GREEN |

### Geometría final y capturas

FAQ y asistente abiertos; tres selectores pulsados/pressed en cada caso, documento sin overflow y sin recorte esencial detectado. CSS px:

| Ancho / frame | Hero100/200% | Gráfica100/200% | Escena total100/200% |
| --- | --- | --- | --- |
| 360 | 280/280 | 300/300 | 395/756,59 |
| 390 | 280/280 | 300/300 | 395/639,95 |
| 768 | 280/280 | 300/300 | 395/445,73 |
| 1440 | 717,20/280 | 560/300 | 560/431,41 |
| 1440 frame600 | 280/280 | 300/300 | 395/481,73 |

Base propia100%: hero390/escena470/gráfica424 a360/390/frame600; desktop717,20/560/560. Texto antes del dibujo, rótulo/selector en flujo; no se impone420px al texto ampliado. La prueba duplica snapshot computado de font-size y line-height de cada nodo, incluidos px: H1 38,4→76,8 móvil;60,8→121,6 en768/frame600;73,44→146,88 desktop. Párrafo16→32 o17→34; pausa/rótulo12→24; textarea16→32. No equivale a zoom nativo ni dispositivo físico.

PNG bajo `.sites-runtime/renovacion-tyxx/`: `before-{360,390,1440,container600}-{hero,scene}.png` y pares `after-*`, altura viewport1000, reduced-motion, fuentes listas y mismo frame600. Adicionales `after-{360,390}-scene200.png` y `after-{360,390}-assistant200.png` (estos últimos viewport, no página completa).

Leídos con herramienta de imágenes: before360-scene, before390-hero, before1440-hero, beforecontainer600-scene y sus cuatro pares after; también after360-scene200 y after390-assistant200. Inspección del modelo: hero desktop conservado; móvil mantiene tipografía/jerarquía y acorta figura; tarjetas, rótulo y selector separados; frame600 legible. Al200% tarjetas/rótulo crecen sin cortar botones. Asistente200 continúa verticalmente fuera del viewport, no recortado por contenedor. No revisión humana ni comparación exacta de píxeles animados.

### Accesibilidad disponible, no certificación integral

`ariaSnapshot()` de body leído: banner → nav única → main/seis regiones → contentinfo; H1 único, H2 de bloques/H3 de pasos, cuatro pasos fuera de Canvas, nombres de escenas/pressed, textbox Tu respuesta, Conversación/Ficha/status. Skip-link Tab/Enter llega a contenido y siguiente Tab al CTA principal. Foco2px/hit-test visible a390/1440; nav/Escape/hash/resize y pausa/reduced-motion pasan regresiones. Enlaces/botones/summary visibles con asistente y menú abiertos alcanzan44×44. Canvas aria-hidden; HTML no requirió cambio.

Contraste: luminancia relativa sRGB WCAG, colores computados y composición alfa de ancestros. Gradiente oscuro: mínimo entre extremos compuestos y base. Canvas/imagen desconocidos: límites negro/blanco, nunca un color supuesto. Pausa, selector y rótulo pasan a fondo opaco; foco de pausa interior. No se certifican píxeles decorativos ni fotografía histórica.

| Superficie/estado | Ratio mínimo medido |
| --- | --- |
| Texto editorial muestreado | 5,83 rótulo; resto≥6,73; títulos16,78 |
| Contacto normal/hover | 15,86/10,93 |
| Nav normal/hover | 13,46/9,37 |
| Secundario normal/hover | 14,57/12,45 |
| Pausa normal/hover/anillo interior | 7,84/15,99/8,93 |
| Selector inactivo/pressed/borde pressed | 7,44/13,77/7,69 |
| Asistente primario normal/hover corregido | 9,37/16,78 |
| FAQ/teléfono (extremo cálido conservador) | 14,96/6,77 |
| Anillos focus muestreados | ≥8,35 |

Normal/hover/focus de11 familias y pressed de3 escenas ejercitados. Bordes decorativos no se atribuyen a indicadores de estado; nombre/icono visible contrasta, y borde pressed significativo sí se mide. **NVDA/Narrator humano no ejecutado**: no herramienta de lector real expuesta. AX no equivale a lector. Tarea8 sigue [ ]; no certificación WCAG integral ni otros navegadores.

### Integración/preservación

Node en memoria/Chromium, contextos nuevos para `/`, `/strand.html`, `/index.html`: headings Strand/Portfolite correctos; abrir summary, elegir consultas incompletas, editar/guardar Proceso actual y leer ficha PASS en tres rutas. WhatsApp inspeccionado[contacto personal retirado] sin visitar; localStorage/sessionStorage0; solo GET locales, ninguna solicitud inesperada. Preview de suite comprueba HTTP200/rutas/no-store/igualdad de cuerpos Strand.

Contra HEAD0a9869d: motor sufijo byte-for-byte, SHA256449e4f1bd43267437111c9d55ea54653deabc974da839caf327c0d5e9a1c8b4a y57 líneas conocidas de nav intactas; driver puntero idéntico normalizando CRLF. Diff vacío en Portfolite/fuentes compartidas/assets/scripts/package/lock/runner/.gitignore. Tests compartidos conservan solo excepciones previas. HTML Strand no cambió en unidad3. Sin envíos, almacenamiento, exportación, .pi/, .scratch Markdown, commits, PRs ni despliegue.

## 2026-09-21 — observación única del timeout, sin reparación

Autorización focalizada registrada en tasks antes de instrumentar. RED fresco/minimización omitidos expresamente: caracterización del bucle intermitente histórico autorizada, no reparación ni feature nueva. Safety net65/65 y puntero20,8s aportados por padre, no repetidos. Hipótesis previas: CPU Canvas (peso activo draw/tick), CPU del controlador (peso propio reloj), espera/no ejecución (pared mayor que hilo e idle; origen desconocido).

Una ejecución de `npm test -- tests/strand.spec.js -g "el puntero" --workers=1`: PASS1/1, test19,8s/total23,2s, exit0. Puerto4180 libre; runner gestiona servidor. Se preservaron dos páginas1440×1000/DPR1, install/pause/goto/fonts, runFor2500/bounds/pointer/runFor600/píxeles/cierre, radio110, tip basal y tres aserciones. Sin hooks, fastForward, timeout/retry/trace/config cambiados. Después de fonts.ready: CDP público, Performance.enable(threadTicks), Profiler.enable/default sampling; cuatro pares métricas/start/runFor/stop/métricas. hrtime.bigint Node para pared, sin usar reloj virtual; salida incremental confinada a testInfo.outputPath bajo test-results.

### Pared y deltas Performance

Duraciones en segundos. Intervalo de métricas más ancho que runFor porque incluye diagnóstico. No sumar TaskDuration/ThreadTime/ScriptDuration: son contabilidades solapadas.

| Span | runFor pared | TaskDuration | ThreadTime | ScriptDuration | DevToolsCommandDuration |
| --- | ---: | ---: | ---: | ---: | ---: |
| baseline2500 | 6,425306 | 1,872383 | 2,001899 | 0,001250 | 0,044953 |
| baseline600 | 1,876021 | 0,643159 | 0,677489 | 0,000332 | 0,113304 |
| hover2500 | 5,545240 | 1,443989 | 1,548577 | 0,001965 | 0,025388 |
| hover600 | 1,964791 | 0,639488 | 0,673036 | 0,000793 | 0,117660 |

Total runFor15,811358s, TaskDuration4,599019s, ThreadTime4,901001s. LayoutDuration/RecalcStyleDuration/LayoutCount/RecalcStyleCount: delta0 en cuatro spans. ScriptDuration pequeño NO significa ausencia de JS: el perfil sí captura draw; no representa toda ejecución JS bajo este reloj. Píxeles baseline/hover0,286292/0,247387s; close0,365679/0,366600s; bounds0,118086/0,093095s; puntero0,025560s. Otras etapas en stages.json.

### Pesos exclusivos de muestras, no CPU exacta

Cada timeDeltas[i] (µs CDP) se atribuye solo al leaf samples[i], convertido a ms; callFrames idénticos agregados. Sin sumar inclusivos/propios. Raw y analysis.json preservan scriptId/URL/línea/columna. Cero significa sin muestra, no ausencia garantizada de ejecución.

| Peso ms | baseline2500 | baseline600 | hover2500 | hover600 |
| --- | ---: | ---: | ---: | ---: |
| draw | 1479,576 | 408,389 | 1146,040 | 447,781 |
| tick | 3,327 | 0 | 1,559 | 0 |
| tipPosition | 24,632 | 5,913 | 11,792 | 7,332 |
| networkShape | 0 | 0 | 0 | 0 |
| Otro JS strand-motion | 50,231 | 15,836 | 49,253 | 21,683 |
| Controlador reloj | 18,296 | 1,195 | 12,530 | 1,637 |
| Nativos Canvas nombrados | 223,030 | 82,734 | 144,570 | 70,160 |
| GC | 139,140 | 67,619 | 129,164 | 67,397 |
| (idle) | 4430,387 | 1263,988 | 4016,016 | 1346,659 |
| (program), no atribuido | 103,963 | 130,675 | 61,623 | 81,053 |
| Otros | 1,727 | 0 | 3,218 | 1,480 |

Totales ponderados6474,309/1976,349/5575,765/2045,182ms; colas sin muestra0,596/1,015/0,379/0,467ms. Perfiles duran6474,905/1977,364/5576,144/2045,649ms, más que runFor. Idle11,057050s (~68,8% del peso); draw3,481786s domina muestras activas. Nativos: stroke/fill/fillRect/arc/lineTo/moveTo/beginPath/clearRect, no tiempo GPU. Reloj identificado por scriptId de _callFirstTimer/nombres concordantes con bundle local Playwright1.63.0, no URL vacía indiscriminada. Lectura del bundle confirma await embedder.setTimeout tras callbacks: yield existente, NO causa demostrada de todo idle ni permiso para eliminarlo.

Overhead explícito CDP458,279ms e I/O registrado91,912ms. Última escritura stages.json no incluye su propia duración; imports/directorio/perturbación interna del sampler no cuantificados. No restar esos costes para inventar tiempo sin profiler. Instrumentar puede cambiar resultado bajo30s; este PASS no reproduce ni explica definitivamente el timeout histórico.

**Sin fix:** no se estableció optimización test-only pequeña con equivalencia de frames/timestamps/estado. Pared/hilo e idle no separan timers/OS/GPU/nativo/otros procesos; faltan eventos de scheduling y causalidad bajo fallo. Quitar yields/reducir frames/reemplazar clock/tocar Canvas viola alcance o evolución sin equivalencia demostrada. Próxima decisión mínima: autorizar UNA observación adicional de scheduling/timers del mismo bucle, con plan y presupuesto explícitos y sin alterar reloj/frames/deadline. No ejecutada aquí ni repetición hasta GREEN.

Original capturado en memoria; retiro solo por reemplazo inverso del bloque propio con guard, nunca Git/archivo histórico. Buffer.equals PASS,40877bytes; SHA256 previo/posterior `eb4d52ad1ca289fed83256e5c32e9549ed9e71918521b66ca72999ebe7ebc138`. Renovación previa preservada; producción/compartidos intactos. `npm run check` y `git diff --check` PASS tras limpieza; avisos CRLF históricos, sin error. Sin segundo navegador ni suite adicional en rama nofix.

Raw: `test-results/strand-Strand-el-puntero-i-9ec93-sin-iluminar-toda-la-figura/pointer-profile/` (4 cpuprofile,8 JSON before/after,stages.json). `test-results/pointer-profile-metadata/`: restoration.json,runner.log,analysis.json. Outputs regenerables; sin trace retenido por PASS, sin perfiles parciales ni errores CDP. Warning Node DEP0190 del lanzador npm.cmd con argumentos constantes, no del test. Un intento de anexar este informe mediante Node falló por sintaxis antes de escribir; corregido con edición focalizada, no nueva prueba ni RED.

8/10/11 siguen [ ]; sin implementación completada nueva.8 requiere lector humano;10 conserva intento fallido;11 sigue sin reparación causal. CONTINUAR intacto: pendientes siguen ciertos. Native fresco read-only8/11,apply ready,nextapply,blockedReasons[], workspace/roots coincidentes. Engram save intentado una vez falló7437; sin repair ni persistencia alegada.

## 2026-09-21 — única observación scheduling/timers; timeout, sin fix

Autorización actual: una captura de baseline2500, sin CPU profiling, producción, cambios del reloj/deadline30s/trace ni repetición hasta GREEN. Puerto4180 libre (connect_ex10061); Playwright gestionó preview. Leídos artefactos/config/código/prerrequisitos, skills diagnosing-bugs/tdd y referencias/soporte global strict-TDD; override local ausente. No nuevo RED funcional: caracterización explícita del bucle histórico, sin modificar seams contacto/ejemplo/nav.

Se extrajo como texto en memoria clockSource de coreBundle Playwright1.63.0, sin ejecutar/evaluar ni parchear JavaScript. `_callFirstTimer` ejecuta callback virtual y luego `await new Promise((f) => this._embedder.setTimeout(f))`; embedder reenvía timeout omitido al setTimeout nativo guardado (líneas286/595 decodificadas). `getTimeToNextFrame` usa16ms; tick productivo dibuja si delta≥25ms. Tipos públicos protocol.d.ts declaran Tracing.start/end/tracingComplete, ReturnAsStream, TraceConfig e IO.read. Primer intento Node de extracción tuvo error de quoting antes de ejecutar/escribir; Python decodificó texto sin eval JavaScript.

### Captura y resultado único

`npm test -- tests/strand.spec.js -g "el puntero" --workers=1` UNA vez: **FAIL1/1, timeout30000ms, exit1**. Continuó por baseline600 y hover2500 hasta hover600; trace normal no tiene after del último runFor. Error final: locator.evaluate con página/contexto cerrado. Tres aserciones intactas pero **no ejecutadas**. Sin segundo navegador, retry, Strand/full ni intento de verde. Instrumentar añade coste; no atribuir automáticamente este fallo al test desinstrumentado.

CDP tras fonts.ready solo en baseline; Performance threadTicks sin Profiler. Tracing cubre primer runFor más márgenes getMetrics/start/end, no baseline600/hover. Categorías solicitadas: devtools.timeline, disabled-by-default-devtools.timeline, disabled-by-default-devtools.timeline.stack, toplevel, renderer.scheduler. Sin screenshots CDP, dumps, sampling, systrace ni comodines. Playwright retain-on-failure quedó activo y produjo trace.zip con su screencast normal.

ReturnAsStream JSON:4952086bytes,22593eventos, dataLossOccurred=false. Buffer16MiB, salida≤32MiB,≤128 lecturas256KiB y presupuesto diagnóstico2s de flush/lectura;20 IO.read, límites no alcanzados. Categorías efectivas, incluidas compuestas: toplevel; disabled-by-default-devtools.timeline; devtools.timeline,disabled-by-default-v8.gc; base,toplevel; devtools.timeline; toplevel,mojom; renderer.scheduler; blink,devtools.timeline; devtools.timeline,v8; __metadata; loading,rail,devtools.timeline; cc,disabled-by-default-devtools.timeline. No presumir eventos de otras categorías.

### Tiempos y atribución sin doble conteo

Node hrtime: baseline2500=**9,640874s**. Métricas Chromium delimitan9,647997s (margen7,123ms), ts446887895991–446897543988µs reales monotónicos, no reloj virtual. TaskDuration threadTicks=**2,441390s CPU**, ThreadTime=2,542669s; no sumarlos. Trace RunTask es pared, no CPU: unión8,445426s. ThreadControllerImpl::RunTask anidado2,745790s; no sumarlo a RunTask. Layout/style0.

Emparejamiento156/156 TimerInstall→TimerFire por pid19168/tid21104/frame8F7F6930F9BF453D67CDAD00996FDF02/timerId2–157; sin pares faltantes ni intervalos pendientes superpuestos. Todos llevan callsite script18 setTimeout598 → _callFirstTimer289 → _runTo120, concordante con clockSource (offset de envoltura3 líneas), no mera URL vacía. Petición timeout omitido, nominal0ms; Chromium registra6 timeout0 y150 timeout4ms, consistente con clamp de nesting, total nominal600ms.

| Delay install→fire real (ms; nearest-rank) | Todos156 | timeout0:6 | timeout4:150 |
| --- | ---: | ---: | ---: |
| Mínimo | 0,117 | 0,117 | 4,032 |
| Mediana | 7,2795 | 1,3185 | 8,054 |
| p90 | 18,137 | 3,784 | 18,137 |
| p95 | 130,538 | 3,784 | 130,538 |
| Máximo | 1115,153 | 3,784 | 1115,153 |
| Suma/unión serial | 7114,828 | 8,693 | 7106,135 |

Yields pendientes: **7,114828s**, con **0,195185s CPU** del renderer por diferencias tts install→fire; **6,919643s no CPU de ese hilo**, no reposo del sistema entero. Nominal600ms no explica6,514828s restantes de latencia. Se localiza gran parte del exceso pared/CPU en entrega tardía de yields, pero no se demuestra defecto del servicio de timers.

Partición exclusiva con uniones/intersecciones: pendiente-yield∩RunTask5,930851s; pendiente-yield fuera RunTask1,183977s; RunTask fuera pendiente-yield2,514575s; fuera ambos0,018594s. Total9,647997s. Solo0,231303s de yields pendientes solapan ThreadControllerImpl::RunTask; resto del solapamiento exterior no es ejecución JS atribuible.

Ocho colas >80ms desde fin ThreadControllerImpl::RunTask hasta fin RunTask exterior:89,915/129,770/610,268/675,536/941,380/983,683/1062,090/1113,967ms; **5,606609s pared y solo12,210ms CPU**, íntegramente dentro de yields pendientes. Mayor componente localizado de demora no CPU, no dibujo ni simple clamp4ms. Ningún evento nombra su causa: descheduling SO, bloqueo nativo u observers/diagnóstico no distinguidos. Minor/MajorGC aparecen, pero no explican esas ocho colas. Un análisis inicial accedió a tts ausente; corregido excluyendo campos ausentes, sin nueva captura.

TimerFire inclusivo2,516751s pared/2,357370sCPU incluye continuaciones/callbacks; **no es draw self time**. Esta captura no mide CPU exclusivo de draw. El perfil anterior halló draw dominante en actividad; no trasladar sus3,481786s de cuatro spans a este único span ni atribuir toda espera a Canvas.

156 yields corresponden a156 callbacks virtuales despachados en ese callsite, consistente con rAF16ms sobre2500ms. No son156 imágenes: cero RequestAnimationFrame/FireAnimationFrame nativos en captura y sin identificación independiente del tipo de cada callback. AnimationFrame del compositor tampoco equivale a rAF virtual. Screencast Playwright:27 imágenes durante primer runFor,38 en contexto basal completo; no igualdad con yields ni evidencia causal de las colas.

Trace Playwright: baseline2500=9,637757s (borde API distinto de hrtime); baseline600=3,252530s; hover2500=9,577410s; hover600 iniciado, sin final antes del deadline. No inventar duración del cuarto span ni pase de assertions.

### Overhead, restauración y gate

Overhead separado: attach9,949ms; Performance.enable5,381ms; Tracing.start89,352ms; métricas11,752ms; end4,149ms; flush1062,833ms; IO.read223,440ms; escritura trace15,108ms; IO.close1,882ms; detach5,359ms. Total medido**1429,205ms** fuera runFor. Import/setup, serialización, escritura final metadata y perturbación interna no cuantificados. No restar overhead para inventar PASS desinstrumentado.

Sin reparación test-only equivalente respaldada. Reducir yields, reemplazar clock, batching, menos frames o cambiar deadline/trace alteraría contrato/alcance; no aplicado. **Capacidad faltante:** evidencia correlacionada de stacks/espera nativa o descheduling SO del renderer durante colas post-ThreadController. CDP acotado no nombra ese motivo. Requeriría plan separado y autorización de nueva ejecución; ETW/OS además necesita permiso específico y capacidad no expuesta aquí. No nueva decisión comercial ni consulta humana para el diagnóstico ya autorizado. No se ejecuta otra observación ni se relaja equivalencia para obtener verde.

Retiro inverso de dos hunks propios en finally del lanzador: **40877bytes y SHA256 eb4d52ad1ca289fed83256e5c32e9549ed9e71918521b66ca72999ebe7ebc138 idénticos**. Renovación preservada, sin cambio neto en test ni producción/config/compartidos. `npm run check` PASS y `git diff --check` PASS tras cleanup (avisos CRLF históricos). Sin commits, PR, instalación, mantenimiento RDD ni entrega externa.

Regenerables: test-results/.../pointer-timers-{trace,stages}.json y trace.zip; test-results/pointer-timers-metadata/{analyze.py,analysis.json,restoration.json,runner.log}. Metadata CPU previa preservada antes del run como .sites-runtime/renovacion-tyxx/pointer-diagnostics/previous-cpu-{analysis,restoration}.json; copia acotada actual scheduling-{analysis,restoration}.json. No perfiles/rawtrace copiados fuera test-results. Engram falló una vez por identidad7437, sin retry/repair ni persistencia alegada. Un intento de anexo documental vía shell excedió el transporte y falló por sintaxis antes de escribir; anexos aplicados con edición focalizada.

Native fresco read-only v2:8/11,3pendientes,applyState ready,nextRecommended apply,blockedReasons[], mismo workspace/allowedEditRoots sin warnings.8/10/11 siguen [ ]; ningún checkbox completado ni Ready for archive. Historia íntegra.
