# Verificación de la alternativa Strand

Fecha: 2026-09-12. Entrega únicamente local.

## Recuperación de la vista — 2026-09-14

Se reprodujo un rechazo de conexión en `/` y `/strand.html`: el servidor estaba apagado. El acceso `Abrir TYXX.cmd` ahora inicia el servidor oculto si falta, verifica su respuesta y abre Strand. La segunda ejecución reutilizó el mismo PID. La entrada local `/` sirve Strand y `/index.html` conserva Portfolite. Se verificaron HTTP 200, `no-store`, igualdad entre `/` y `/strand.html`, página anterior accesible y preservación de los nueve archivos originales. La página actual se abrió y observó en el navegador integrado. No se publicó.

La suite pasó 29 de 30 pruebas inicialmente. La prueba de interacción comparaba posiciones exactas de píxeles entre dos animaciones con ondas continuas y falló por diferencias temporales. Se hizo explícito su alcance: esperar fuentes y comprobar el aumento de luz en las fibras cercanas, con la luz exterior estable. Esa prueba pasó por separado (18,8 s). No cambió el código de animación y no se repitieron las otras 29 pruebas después del ajuste. Las comprobaciones estáticas y de espacios pasaron.

## Alcance

El usuario pidió una segunda versión como https://strand.framer.website/ incluyendo su animación. Se creó `dist/strand.html`, con estilos y animación independientes, conservando `dist/index.html` (Portfolite) y los módulos compartidos. Se mantienen el enfoque en automatizaciones/IA/infraestructura, la web complementaria, el contacto, las demos y el asistente ya implementado.

El efecto de hilos y partículas es una recreación propia, no el componente original de Framer ni una copia exacta de su geometría o sus tiempos. Después de la aclaración del usuario («Falta el efecto de la página original»), se sustituyó la superficie genérica inicial por 320 filamentos independientes, con silueta plegada, estelas curvas, puntas luminosas, pulsos y ondas. El puntero desplaza e ilumina las fibras cercanas; resortes amortiguados las devuelven a su lugar. Canvas 2D proyecta la profundidad de cada fibra; se dibuja la mitad de ellas en contenedores estrechos. Se suspenden los dibujos fuera de vista o con la pestaña oculta. La preferencia de movimiento reducido inicia el dibujo quieto. Las transiciones de servicios funcionan con scroll en escritorio y selección manual en disposición compacta.

Los nueve archivos originales registrados en `strand-preserved-files.json` se compararon mediante SHA-256 y están intactos. No se añadieron dependencias. Se extendió `scripts/check.mjs` para revisar todos los HTML y las hojas de estilo enlazadas.

## Comprobaciones

La primera revisión de esta corrección pasó `npm test` con las 28 pruebas existentes (18,6 s). Después del ajuste visual final y de añadir la comprobación de interacción localizada, las nueve pruebas de `tests/strand.spec.js` pasaron (26,0 s). Los módulos del asistente no cambiaron. `npm run check` pasó para ambas páginas y `git diff --check` no informó errores de espacios.

- HTTP local 200 en `/strand.html`.
- `npm run check`: ambas páginas correctas. Portfolite: 29 IDs/14 recursos; Strand: 32 IDs/15 recursos; JavaScript, configuración, imágenes y enlaces correctos.
- La suite incluye las 20 pruebas anteriores y nueve específicas de Strand: entrada al asistente y conservación al plegarlo a 360/390/768/1440 px; dibujo que cambia, pausa estable incluso al mover el puntero y reanudación; texto al 200%, teclado y movimiento reducido; cambios de escena con scroll y selección móvil; contacto y versión anterior sin JavaScript.
- La prueba nueva compara píxeles con tiempo controlado, con y sin puntero: el cambio se concentra cerca del cursor, en lugar de girar toda la figura. La prueba de pausa lee el bitmap del canvas para excluir cambios de hover del botón superpuesto.
- Revisión visual de la corrección en Chrome: comparación directa de la portada original con la nueva silueta, filamentos, destellos y reacción al puntero en escritorio. Consola sin errores observados. Los tamaños móviles se comprobaron en las pruebas; el control de tamaño de la pestaña de revisión no aplicó el cambio solicitado y no se afirma una nueva inspección visual móvil. La inspección móvil de la entrega inicial queda como antecedente.
- La revisión visual se hizo con el navegador; no se generó miniatura de despliegue ni se guardaron capturas nuevas como recursos del sitio.

## Límites

La nueva página y Portfolite están disponibles en el mismo servidor local. La URL pública conserva la versión anterior publicada. No hubo publicación, nueva versión de Sites, commit, push, mensajes reales ni cambios en Taller Norte.

La demo de IA del sitio sigue usando reglas locales; los dibujos de fuentes conectadas son ilustrativos y están identificados. No se añadieron persistencia, exportación ni proveedores de IA. Las pruebas no constituyen una auditoría completa de accesibilidad ni una medición de rendimiento en todos los dispositivos.
