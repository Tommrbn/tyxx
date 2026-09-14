import { test, expect } from "@playwright/test";

test("la entrada local sirve Strand y conserva Portfolite en su enlace propio", async ({ request }) => {
  const current = await request.get("/");
  expect(current.ok()).toBe(true);
  expect(current.headers()["cache-control"]).toBe("no-store");
  expect(current.headers()["x-tyxx-preview"]).toBe("strand");
  expect(await current.text()).toBe(await (await request.get("/strand.html")).text());
  expect(await current.text()).toContain('src="strand-motion.js"');
  const previous = await request.get("/index.html");
  expect(previous.ok()).toBe(true);
  expect(await previous.text()).toContain("Menos tareas repetitivas.");
});
