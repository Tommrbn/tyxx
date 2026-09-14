# Recursos del sitio TYXX

- `dist/assets/taller-norte-desktop.png`: captura de 1440 × 1000 de la compilación local de Taller Norte, realizada el 10 de septiembre de 2026. Presenta el proyecto demostrativo real. La procedencia de las imágenes de esa demo está documentada en `C:\agencia\webs\chapas\tyxx-chapas\docs\assets.md`.
- `dist/assets/thicccboi-*.woff2`: familia THICCCBOI, pesos 400, 700 y 900, reutilizada desde los recursos del proyecto vecino. Se distribuye con `dist/assets/OFL.txt`.
- `dist/assets/tyxx-orange.png`: copia idéntica del PNG sin extensión `C:\Users\tomde\Downloads\TYXX\tyxx_naranja_blanco` (1455 × 1081). Logo blanco sobre naranja, aportado por el usuario. Se conserva como icono del sitio; la imagen circular correspondía al diseño Xpovio anterior.
- `dist/assets/tyxx-monochrome.png`: copia idéntica del PNG sin extensión `C:\Users\tomde\Downloads\TYXX\tyxx_blanco_negro` (1455 × 1081). Logo negro sobre blanco. En navegación y pie se muestra con recorte e inversión de colores mediante CSS para adaptarlo al fondo negro.
- `dist/assets/tyxx-on-white.png`: copia idéntica del PNG sin extensión `C:\Users\tomde\Downloads\TYXX\tyxx_blanco_naranja` (1455 × 1081). Logo naranja sobre blanco. Se conserva como recurso propio; ya no aparece como bloque de presentación en el diseño Portfolite.

Los originales del usuario se conservan sin cambios. Las otras dos imágenes de la carpeta son variantes de la misma identidad, no fotografías de proyectos. No se agregan como trabajos de clientes.

La identidad vigente usa negro, blanco y naranja. El usuario indicó como referencia visual Xpovio: https://ex-coders.com/php-template/xpovio/index.php?storefront=envato-elements. Se estudiaron su tipografía, composición, líneas, filas y botones; la implementación es propia. No se copiaron recursos, código, testimonios ni métricas de esa plantilla. El anterior diagrama y símbolo de asterisco del MVP se reemplazaron por la identidad aportada.

## Rediseño Portfolite — 2026-09-12

El usuario confirmó https://portfolite.framer.website/ como referencia visual vigente: fondo oscuro, título centrado de peso regular, tarjetas redondeadas, espacio libre y menor cantidad de texto. Reemplaza Xpovio. Se tomó su composición, sin copiar código ni recursos gráficos del sitio.

- `dist/assets/tyxx-hero-ribbons.png`: imagen original creada con imagegen para esta entrega (1672 × 941 px, 1.210.854 bytes). Cintas abstractas de metal/satén en negro y plata, con un borde cobre/naranja tenue y centro despejado para el texto. Sin texto, logos, personas ni interfaz ficticia. Copia íntegra del resultado, sin edición posterior; se adapta al contenedor mediante CSS. Procedencia temporal: `C:\Users\tomde\AppData\Local\Temp\tyxx-portfolite-assets\tyxx-hero-ribbons-original.png`.
- Los diagramas de las tres áreas se construyen con HTML y CSS y representan relaciones funcionales (consulta/registro/seguimiento, fuentes/IA/equipo y capas de infraestructura). No representan integraciones conectadas ni sistemas activos.
- La tarjeta del Asistente de TYXX es una composición de ejemplo identificada como demo guiada por reglas. No representa una conversación con un cliente.

## Alternativa Strand — 2026-09-12

Referencia pedida: https://strand.framer.website/. Se observaron su portada lateral, tipografía de peso fuerte, marcos finos y animación de puntos e hilos con escenas durante el scroll. Tras la aclaración del usuario («Falta el efecto de la página original»), se reemplazó la superficie retorcida inicial por filamentos independientes sobre una silueta plegada dibujada para TYXX. Incluye ondas continuas, pulsos de luz, puntas con matices ámbar/azul, aparición escalonada y repulsión local del puntero con retorno elástico. Las escenas de servicios usan el mismo efecto.

Se inspeccionaron la página y los módulos públicos `HeroThreeJSV2` y de la portada para entender su comportamiento. La implementación de Canvas y las curvas de TYXX son propias: no se integraron los módulos, las coordenadas, las texturas ni el código del template en el sitio. Es una recreación visual; no se promete identidad exacta de geometría, ruido o tiempos.

Esta versión reutiliza el logo monocromo, las fuentes locales con licencia y la captura existente de Taller Norte. No incluye la imagen de cintas de Portfolite; ese recurso y esa página permanecen intactos. Las visualizaciones de consultas, IA e infraestructura son ejemplos ilustrativos identificados, sin proveedores conectados ni métricas ficticias.
