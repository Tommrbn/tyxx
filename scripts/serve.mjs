import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const directory = fileURLToPath(new URL("../dist/", import.meta.url));
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};
const server = createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
  } catch {
    response.writeHead(400).end("Solicitud inválida");
    return;
  }
  // The local entry point follows the current design. The previous version
  // remains directly available at /index.html for comparison.
  if (pathname === "/") pathname = "/strand.html";
  const filename = resolve(directory, `.${pathname}`);
  if (!filename.startsWith(resolve(directory) + sep)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const content = await readFile(filename);
    response.writeHead(200, {
      "Content-Type":
        contentTypes[extname(filename)] ?? "application/octet-stream",
      "Cache-Control": "no-store",
      "X-TYXX-Preview": "strand",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch {
    response.writeHead(404).end("No encontrado");
  }
});
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(4180, "127.0.0.1", () =>
  console.log("TYXX actual: http://127.0.0.1:4180/strand.html"),
);
