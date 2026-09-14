import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createContext, runInContext, Script } from "node:vm";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const configSource = await readFile(resolve(root, "config.js"), "utf8");
const appSource = await readFile(resolve(root, "app.js"), "utf8");
const moduleReferences = [];
for (const name of (await readdir(root)).filter((name) =>
  name.endsWith(".js"),
)) {
  execFileSync(process.execPath, ["--check", resolve(root, name)]);
  const source = await readFile(resolve(root, name), "utf8");
  for (const match of source.matchAll(
    /(?:from\s+|import\()['"](\.\/?[^'"]+)['"]/g,
  ))
    moduleReferences.push(match[1]);
}
new Script(appSource, { filename: "app.js" });
new Script(configSource, { filename: "config.js" });
const context = createContext({ window: {} });
runInContext(configSource, context);
assert.match(context.window.TYXX_CONFIG.whatsappNumber, /^\d{8,15}$/);
assert.equal(new URL(context.window.TYXX_CONFIG.demoUrl).protocol, "https:");

for (const filename of (await readdir(root)).filter((name) =>
  name.endsWith(".html"),
)) {
  const html = await readFile(resolve(root, filename), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(
    new Set(ids).size,
    ids.length,
    `${filename}: hay IDs duplicados`,
  );
  const htmlReferences = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(
    (match) => match[1],
  );
  const cssReferences = [];
  for (const reference of htmlReferences.filter((ref) =>
    ref.endsWith(".css"),
  )) {
    const css = await readFile(resolve(root, reference), "utf8");
    cssReferences.push(
      ...[...css.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)].map(
        (match) => match[1],
      ),
    );
  }
  const assets = new Set();
  for (const reference of [
    ...htmlReferences,
    ...cssReferences,
    ...moduleReferences,
  ]) {
    if (reference.startsWith("#")) {
      assert(
        ids.includes(reference.slice(1)),
        `${filename}: destino interno inexistente: ${reference}`,
      );
      continue;
    }
    if (/^(https?:|data:|tel:|mailto:)/.test(reference)) continue;
    const path = resolve(root, reference.split(/[?#]/)[0]);
    assert(
      (await stat(path)).isFile(),
      `${filename}: archivo local inexistente: ${reference}`,
    );
    assets.add(reference);
  }
  assert.equal(
    (html.match(/<h1\b/g) ?? []).length,
    1,
    `${filename}: se espera un solo H1`,
  );
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    assert(
      /\balt="[^"]*"/.test(match[0]),
      `${filename}: imagen sin texto alternativo`,
    );
    assert(
      /\bwidth="\d+"/.test(match[0]) && /\bheight="\d+"/.test(match[0]),
      `${filename}: imagen sin dimensiones`,
    );
  }
  console.log(
    `OK ${filename}: ${ids.length} IDs únicos; ${assets.size} recursos locales; enlaces y atributos correctos.`,
  );
}
console.log(
  "OK: sintaxis de todos los módulos JavaScript y configuración de contacto.",
);
