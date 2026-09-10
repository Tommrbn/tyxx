import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createContext, runInContext, Script } from "node:vm";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const html = await readFile(resolve(root, "index.html"), "utf8");
const css = await readFile(resolve(root, "styles.css"), "utf8");
const configSource = await readFile(resolve(root, "config.js"), "utf8");
const appSource = await readFile(resolve(root, "app.js"), "utf8");
new Script(appSource, { filename: "app.js" });
new Script(configSource, { filename: "config.js" });
const context = createContext({ window: {} });
runInContext(configSource, context);
assert.match(context.window.TYXX_CONFIG.whatsappNumber, /^\d{8,15}$/);
assert.equal(new URL(context.window.TYXX_CONFIG.demoUrl).protocol, "https:");

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "Hay IDs duplicados");
const htmlReferences = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(
  (match) => match[1],
);
const cssReferences = [...css.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)].map(
  (match) => match[1],
);
const assets = new Set();
for (const reference of [...htmlReferences, ...cssReferences]) {
  if (reference.startsWith("#")) {
    assert(
      ids.includes(reference.slice(1)),
      `Destino interno inexistente: ${reference}`,
    );
    continue;
  }
  if (/^(https?:|data:|tel:|mailto:)/.test(reference)) continue;
  const path = resolve(root, reference.split("?")[0]);
  assert(
    (await stat(path)).isFile(),
    `Archivo local inexistente: ${reference}`,
  );
  assets.add(reference);
}
assert.equal(
  (html.match(/<h1\b/g) ?? []).length,
  1,
  "Se espera un solo encabezado principal",
);
for (const match of html.matchAll(/<img\b[^>]*>/g)) {
  assert(/\balt="[^"]*"/.test(match[0]), "Imagen sin texto alternativo");
  assert(
    /\bwidth="\d+"/.test(match[0]) && /\bheight="\d+"/.test(match[0]),
    "Imagen sin dimensiones",
  );
}
console.log(
  `OK: JavaScript válido; configuración de contacto; ${ids.length} IDs únicos; enlaces internos; ${assets.size} recursos locales; encabezado principal y atributos de imagen.`,
);
