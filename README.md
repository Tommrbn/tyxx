# TYXX — Web de la agencia

MVP de una web comercial para presentar los cinco servicios de TYXX, recorrer el proyecto demostrativo Taller Norte y contactar a Tomás por WhatsApp.

## Vista local

Requiere Node.js. No tiene dependencias que instalar.

```powershell
npm run dev
```

Abrir `http://127.0.0.1:4180/`. El servidor publica únicamente `dist/` y permite recargar la página para ver cambios.

## Archivos

- `dist/index.html`: textos y estructura de la página.
- `dist/styles.css`: identidad visual, diseño adaptable y movimiento reducido.
- `dist/app.js`: enlaces de contacto, menú móvil y entradas al recorrer la página.
- `dist/config.js`: número de WhatsApp, mensaje general y enlace a la demo.
- `dist/assets/`: fuentes con licencia y captura real de la demo.
- `.agents/product-marketing.md`: contexto comercial acordado.
- `.scratch/web-agencia/discovery.md`: decisiones y cambios durante la entrevista.
- `.scratch/web-agencia/spec.md`: alcance de este MVP.

Los archivos de `dist/` son los originales editables y se guardan en Git; este sitio estático no requiere compilación.

## Cambiar el número comercial

Editar `whatsappNumber` en `dist/config.js`. Usar formato internacional solo con dígitos. El número actual está autorizado temporalmente para este MVP. Los mensajes y los enlaces de todos los botones se generan desde esa configuración.

## Verificación

```powershell
npm run check
```

Comprueba sintaxis de JavaScript, configuración, recursos, destinos internos, IDs y atributos principales de imágenes. Esta comprobación estática no equivale a una prueba visual o de interacción en navegador.

## Publicación

Configurado como sitio estático de Sites, con `dist` como directorio público. La versión de revisión conserva `noindex, nofollow`; el acceso privado de Sites es el control de acceso, y el metadato robots no lo sustituye. Antes del lanzamiento público, confirmar alcance y contacto definitivos y actualizar la configuración de indexación.

El sitio no recibe formularios ni guarda datos del visitante. WhatsApp se abre en otra pestaña y el visitante decide si envía el mensaje. Taller Norte es una marca ficticia y se presenta como proyecto demostrativo, no como cliente.
