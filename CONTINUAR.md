# Continuar el sitio de TYXX

Actualizado: 10 de septiembre de 2026.

## Pedido activo

El usuario pidió adaptar la web existente al template Xpovio (`https://ex-coders.com/php-template/xpovio/index.php?storefront=envato-elements`) e incorporar las imágenes de `C:\Users\tomde\Downloads\TYXX`. Indicó que la base comercial estaba bien. La adaptación está implementada, disponible en la vista local y guardada como versión 2. Falta autorización para actualizar el sitio con el acceso público por enlace existente.

## Decisiones vigentes

- Público: dueños de pymes de servicios de Argentina.
- Oferta visible: webs, automatizaciones, agentes de IA, sistemas de IA e infraestructura; cada proyecto requiere evaluar el alcance.
- Consulta inicial sin cargo; presupuesto a medida; mantenimiento opcional.
- Tomás dirige TYXX y es el contacto directo.
- Taller Norte aparece como proyecto demostrativo, con captura real y enlace. No es un cliente ni acredita resultados de negocio.
- Usar temporalmente el celular actual configurado en `dist/config.js`. La línea empresarial propia queda para después.
- Dirección visual actual: negro, blanco y naranja, títulos grandes con contornos, líneas verticales, enlaces circulares y logos aportados por el usuario. La referencia Xpovio reemplaza la estética marfil del primer MVP.
- Acceso vigente: cualquier persona con el enlace puede abrir el MVP sin iniciar sesión. El usuario pidió este cambio después de la primera entrega privada. Se conserva `noindex, nofollow`.

## Archivos para retomar

- `README.md`: ejecución, estructura y cambio de número.
- `.agents/product-marketing.md`: contexto comercial.
- `.scratch/web-agencia/discovery.md`: entrevista y cambios de decisión.
- `.scratch/web-agencia/spec.md`: alcance implementado.
- `docs/verification-mvp.md`: comprobaciones y límites de la entrega.
- `.openai/hosting.json`: sitio de Sites asociado; reutilizar su `project_id`.

## Próximo paso

Obtener autorización para publicar la versión 2 con el acceso existente por enlace. Reutilizar la versión guardada y el mismo sitio; no crear otro ni guardar de nuevo si no cambia el producto. La versión publicada sigue siendo la primera hasta que la nueva publicación se confirme. El servidor local de la revisión se inicia con `npm run dev` en el puerto 4180. Siguen pendientes el lanzamiento comercial con indexación y el futuro cambio a un número empresarial. No contactar prospectos desde herramientas sin autorización explícita.

## Versión 2 preparada para publicar

- Versión guardada: `appgprj_6aa2ea16da148191832000cf241f216c~appgver_d52e855decc08191aa9f0e7fe45dfc44`.
- Fuente validada y enviada: `19cd962315e3bb683b7848df6662288a38686d57`.
- Archivo validado: `C:\Users\tomde\AppData\Local\Temp\tyxx-xpovio-20260910-01.tar.gz`; 13 archivos, salida estática y manifiesto.
- Acceso confirmado antes del guardado: `public`. Publicar con `deploy_site_version` cuando el usuario autorice; no cambiar la política de acceso.
- Previsualización: `http://127.0.0.1:4180/`, servidor retenido para revisión. Pestaña de Sites: `f868fce3-a36d-46c3-856b-14169e349e02`.
- Las comprobaciones estáticas y HTTP pasaron. No se hicieron pruebas de interacción o revisión visual del producto en navegador.
- Tras la publicación: comprobar estado terminal, abrir la URL pública en la misma pestaña, registrar el resultado y detener el servidor local.

## Primera entrega privada

- URL de revisión: https://tyxx-agencia.novartech.chatgpt.site
- Sites confirmó la publicación privada de la versión 1 el 10 de septiembre de 2026, a las 17:47 UTC.
- Fuente de esa entrega: `630c40925eb3144934f7e2b0cc97557cdc036005`.
- Se abrió la URL en la pestaña de vista previa de esta tarea. Esta primera entrega fue privada; el acceso se amplió posteriormente por pedido del usuario.
- Las comprobaciones ejecutadas fueron estáticas y de recursos HTTP locales; no se realizaron pruebas interactivas o visuales de navegador.

## Acceso por enlace confirmado

El usuario pidió «Hazlo solo visible para aquellos que tengan el link». El 10 de septiembre de 2026 a las 17:52 UTC se cambió la política de Sites a `public`, que permite visitar el sitio a cualquier persona con su URL, sin modificar editores ni invitaciones. Una petición HTTP sin sesión recibió la página de TYXX con estado 200 y conservó `noindex, nofollow`. La indicación de no indexar no constituye una restricción de acceso: el enlace se puede reenviar.

Al retomar, comprobar el estado real de archivos y publicación antes de editar. Actualizar este documento si cambian decisiones, verificaciones o pendientes.
