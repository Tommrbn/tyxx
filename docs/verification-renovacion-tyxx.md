# Verificación local — renovación TYXX

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
