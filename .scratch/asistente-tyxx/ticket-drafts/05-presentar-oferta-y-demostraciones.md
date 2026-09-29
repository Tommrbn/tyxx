# 05: Presentar la oferta y las demostraciones de TYXX

> Nota de privacidad (2026-09-23): identidad personal anonimizada; contacto anterior retirado. El contacto vigente es tyxxsolve@gmail.com. Las menciones del canal anterior describen decisiones o pruebas de su fecha, no una verificación del correo actual.

**What to build:** Una persona entiende la oferta de automatización e IA de TYXX, reconoce procesos que podría mejorar, conoce a TYXX y su forma de trabajo, y accede al asistente o a una demostración descrita con precisión. El diseño mantiene la identidad propia y funciona en escritorio, móvil y con teclado.

**Blocked by:** 01 — Describir un proceso y ver la Ficha de proceso.

**Estado del borrador:** Pendiente de aprobación del desglose. No registrado todavía como ticket ejecutable.

## Criterios de aceptación

- [ ] La portada presenta automatización e inteligencia artificial aplicada a la empresa, con una explicación de analizar el proceso, reducir tareas manuales, organizar información y conectar herramientas, sin resultados garantizados.
- [ ] «Contame qué proceso querés mejorar» conduce al asistente funcional y «Ver demostraciones» a los ejemplos. La navegación por secciones y el regreso al inicio funcionan sin reiniciar la conversación activa.
- [ ] La oferta se relaciona con cuatro situaciones a evaluar: consultas completas, traslado repetitivo de datos, búsqueda y preparación de respuestas en documentos, y registro de solicitudes que necesitan atención.
- [ ] Se explica el papel de automatización, IA/asistentes e integraciones/infraestructura. Las webs aparecen como posibles interfaces de soluciones, sin mantenerlas como actividad central.
- [ ] Se muestran dos demostraciones diferenciadas: Taller Norte y el Asistente de TYXX, con su carácter ficticio o simulado explícito y sin presentarlas como clientes o resultados comerciales.
- [ ] La tarjeta de Taller Norte explica el problema y los papeles del conductor y del responsable, y describe lo accesible en el destino configurado. En la URL pública actual, el recorrido es vehículo/daño, validación y vista previa simulada editable, sin envío al taller; no se anuncia allí la bandeja que existe solo localmente.
- [ ] Dirección y descripción de la demo quedan configurables y coherentes. Si no existe un destino válido o está declarado no disponible, se explica y se evita un botón hacia un destino inexistente.
- [ ] Se presenta a TYXX como responsable, sin inventar equipo, trayectoria, certificaciones, clientes, cifras, testimonios ni precios.
- [ ] Se explican las cuatro etapas acordadas, la posibilidad de comenzar por un proceso acotado, la consulta inicial sin cargo y la diferencia entre implementación, costos externos y mantenimiento opcional.
- [ ] Las preguntas frecuentes existentes se adaptan al nuevo enfoque y siguen respondiendo sobre conocimientos técnicos, presupuesto por alcance, herramientas, plazos, mantenimiento y necesidad real de IA. El contacto directo existente continúa disponible.
- [ ] Se conservan los logos aportados, negro, blanco y naranja, títulos expresivos y animaciones discretas; la portada deja espacio para entender la oferta y acceder al asistente. Se mantiene la indicación de no indexar.
- [ ] Se verifica navegación, menú, lectura de textos extensos, regiones y controles a 360, 390, 768 y 1440 px, con teclado, ampliación de texto y movimiento reducido. Conversación y ficha se apilan en móvil y no hay desbordamiento horizontal involuntario.
- [ ] Se comprueba que el contenido comercial y contacto legibles no dependen del éxito de inicialización del asistente. Los enlaces de la demo y sus afirmaciones se contrastan sin alterar, ejecutar mutaciones o publicar Taller Norte.
- [ ] Pasan las comprobaciones apropiadas al sitio estático y se documenta la evidencia realmente obtenida. Las instrucciones permiten ejecutar la página, configurar contacto y demo y distinguir la simulación de una integración futura.

## Alcance y verificación

Cobertura principal: historias 1–16, 45–48, 50 y 52; criterios A01, A02 y A22, más A13 para demo. A19–A23 se verifican sobre la página y las capacidades que ya estén implementadas.

Solo bloquea 01, porque el CTA principal necesita una demostración utilizable. No hace falta esperar recuperación de borradores o exportación para completar la página y probar sus destinos. La navegación y los textos no deben prometer funciones pendientes; cuando estén integrados los demás tickets, el cierre global verificará el recorrido completo.

## Límites de ejecución

No añadir páginas, campañas, precios, carga de archivos, conectores, agenda o servicios externos. No rehacer el taller ni copiar su identidad visual. No iniciar Taller Norte por abrir TYXX ni presentar su implementación local como pública. No publicar, comprar, enviar mensajes reales, hacer commits o push.

## Comments

2026-09-12 — Pedido directo posterior: el usuario confirmó Portfolite como referencia y pidió menos texto, con automatizaciones, sistemas de IA e infraestructura como oferta principal y web complementaria. La adaptación local adelanta portada, oferta, demostraciones, proceso breve, FAQs y presentación del asistente. Se verificó con las 20 pruebas existentes y revisión visual. Ver `docs/verification-portfolite.md` y `.agents/product-marketing.md` v7. Este pedido reemplaza la dirección Xpovio y la extensión editorial anterior; no se marca el ticket completo. Al retomarlo, reconciliar los detalles de contenido con la brevedad solicitada y resolver configuración/descripción/estado no disponible de la demo. No volver a rehacer el diseño ya entregado.
