# 03: Recuperar y borrar el borrador de la conversación

**What to build:** Una persona recarga la pestaña y continúa su conversación con la ficha y las correcciones que había dejado. Puede borrar el caso para comenzar otro y seguir trabajando aun cuando el navegador no permita conservar el borrador.

**Blocked by:** 02 — Corregir la ficha y aclarar casos sin inventar soluciones.

**Estado del borrador:** Pendiente de aprobación del desglose. No registrado todavía como ticket ejecutable.

## Criterios de aceptación

- [ ] Se conserva durante la sesión de la pestaña el progreso, la conversación, la ficha, los campos manualmente corregidos y los pendientes.
- [ ] Al recargar un caso parcial o corregido se recupera el estado vigente sin repetir preguntas resueltas ni restaurar una mejora invalidada.
- [ ] Recorrer otras secciones de la página no reinicia el caso ni pierde sus cambios.
- [ ] El guardado usa almacenamiento de sesión, sin cuentas, historial permanente, envío a servidor ni sincronización entre dispositivos. La interfaz explica su duración como sesión del navegador.
- [ ] «Borrar conversación» elimina solamente el borrador propio del asistente y devuelve la experiencia al inicio. Una recarga posterior no recupera el caso borrado.
- [ ] Un borrador inválido o de formato incompatible no bloquea la página. Se explica que no pudo recuperarse y se permite comenzar un caso nuevo sin ejecutar su contenido.
- [ ] Si el almacenamiento está denegado o falla, se conserva el trabajo en memoria mientras la página permanezca abierta y se avisa que la recarga puede perderlo. No se anuncia falsamente que el borrador está guardado.
- [ ] El aviso de fallo y las acciones de recuperación son utilizables con teclado y en móvil, sin perder foco o sobrescribir la ficha durante la interacción.
- [ ] Las pruebas verifican recarga después de editar, recarga después de borrar, almacenamiento denegado, borrador ilegible e incompatibilidad de formato, observando el resultado en la página.
- [ ] Se comprueba que guardar, recuperar y borrar no transmiten el contenido del caso ni alteran datos de otras herramientas.
- [ ] Las instrucciones de uso y continuidad explican qué se conserva, cómo se borra y qué ocurre si el navegador falla, sin prometer eliminación irrecuperable frente a funciones de restauración del navegador.

## Alcance y verificación

Cobertura principal: historias 7, 42–44 y 49; criterios A14, A15 y A16. A18–A23 se aplican a los estados y controles incorporados. La dependencia de 02 es necesaria para demostrar que se recuperan también sus correcciones, ediciones y pendientes; no depende de la exportación de 04 ni de la adaptación comercial de 05.

## Límites de ejecución

No incorporar base de datos, historial de clientes, autenticación ni sincronización. No cambiar almacenamiento de Taller Norte, publicar, comprar, enviar mensajes reales, hacer commits o push. La exportación y su alternativa de copia pertenecen a 04 y no deben duplicarse aquí.
