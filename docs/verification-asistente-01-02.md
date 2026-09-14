# Verificación local: tickets 01 y 02

Fecha: 2026-09-12. Alcance: acceso, conversación simulada, ficha, correcciones y edición directa. La especificación completa incluye tickets posteriores que esta entrega no implementa.

## Pruebas ejecutadas durante la implementación

Se añadieron pruebas integradas en la interfaz pública local con Playwright 1.63.0 y Google Chrome 152.0.7977.84 en Windows, usando sesiones aisladas y datos ficticios. Se siguió TDD en el acceso inicial, reconocimiento de varios datos, correcciones, alternativa manual ante fallo y conservación de una mejora borrada manualmente: se observaron los fallos antes de completar esos comportamientos.

La ejecución final conjunta de `npm test` pasó: **20 pruebas, 0 fallos**, en 12,5 segundos. `npm run check` pasó con 30 IDs únicos y 15 recursos locales, además de todos los módulos JavaScript. `git diff --check` también pasó. La revisión independiente de código y alcance está cerrada, con sus hallazgos corregidos; ver `review-asistente-01-02.md`.

- Tres ejemplos, caso libre y cuatro datos iniciales, sin preguntas repetidas.
- Omisión desde la primera pregunta, continuaciones de bloques etiquetados y corrección de datos compartidos entre campos sin versiones obsoletas silenciosas.
- Campos opcionales desconocidos, estado incompleto y pendientes.
- Corrección de una respuesta, remoción de sus datos obsoletos, edición de todos los campos y continuidad sin restaurar valores anteriores.
- Revisión de sugerencia automática, conservación y aviso de mejora manual, mejora vacía respetada.
- Caso ambiguo, texto literal con acentos, saltos y marcado, sin ejecución de HTML.
- Salida inválida en el límite de interpretación: no hay cambios parciales y sigue funcionando la edición manual.
- Vacío, doble envío, exceso de 12.000 caracteres y recuperación con el texto conservado.
- Sin JavaScript y módulo no disponible: contenido, explicación y teléfono accesibles.
- Registro de red durante conversación, edición y navegación: solamente recursos locales GET, sin datos del caso ni destinos externos.
- Teclado, retorno de foco, corrección y menú móvil; regiones etiquetadas y avisos recientes sin releer todo el historial.
- 360, 390, 768 y 1440 px, texto al 200% y movimiento reducido. Se comprobó ausencia de desplazamiento horizontal y se generaron capturas de la sección.

Las comprobaciones estáticas verifican todos los módulos, sus importaciones, configuración, recursos, anclas e imágenes. El sitio conserva la arquitectura estática: no tiene una compilación ni un verificador TypeScript ficticio.

## Revisión visual y límites

Se inspeccionaron las capturas de 360, 390, 768 y 1440 px, además de texto al 200%: paleta y títulos coherentes con la base, ficha legible junto a la conversación en escritorio y debajo en móvil, botones y foco visibles. Se corrigió el desbordamiento de navegación y etapas al ampliar texto. Se comprobó además una captura de la ventana a 200% para distinguir los elementos fijos de los artefactos de una captura larga. Las capturas se guardan localmente en `.scratch/asistente-tyxx/evidence/` y se regeneran con los tests.

No se consumió IA, no se enviaron mensajes ni llamadas, no se utilizaron datos reales, no se inició ni alteró Taller Norte y no se hizo publicación, commit o push. El contacto se verificó por sus enlaces sin abrir servicios externos. No se prueba aún persistencia, portapapeles ni WhatsApp con ficha, que corresponden a 03 y 04. No se realizó una auditoría con lector de pantalla ni se probaron otros motores de navegador o un teléfono físico.

Vista local servida en `http://127.0.0.1:4180/#asistente`. Se pidió reutilizar la pestaña de vista previa de esta tarea; la aplicación respondió `queued`, por lo que no se afirma que el panel se haya mostrado efectivamente.
