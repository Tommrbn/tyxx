import { test, expect } from "@playwright/test";

const recipient = "tyxxsolve@gmail.com";

for (const path of ["/strand.html", "/index.html"]) {
  for (const mode of ["normal", "sin JavaScript", "configuración ausente"]) {
    test(`contacto de TYXX disponible en ${path} ${mode}`, async ({ browser }) => {
      const context = await browser.newContext({
        javaScriptEnabled: mode !== "sin JavaScript",
      });
      try {
        const page = await context.newPage();
        if (mode === "configuración ausente")
          await page.route("**/config.js", (route) => route.abort());
        await page.goto(`http://127.0.0.1:4180${path}`);
        const contact = page.locator("#contacto");
        const action = contact.getByRole("link", {
          name: "Escribir por correo",
          exact: true,
        });
        await expect(action).toBeVisible();
        const href = new URL(await action.getAttribute("href"));
        expect(href.protocol).toBe("mailto:");
        expect(href.pathname).toBe(recipient);
        if (mode !== "normal") expect(href.search).toBe("");
        await expect(
          contact.getByRole("link", { name: recipient, exact: true }),
        ).toHaveAttribute("href", `mailto:${recipient}`);
        await expect(page.locator('a[href^="tel:"], a[href*="wa.me"]')).toHaveCount(0);
        await expect(page.locator("#proceso")).toContainText("TYXX");
        expect(context.pages()).toHaveLength(1);
      } finally {
        await context.close();
      }
    });
  }
}

test("el borrador de correo conserva caracteres y no exporta la ficha", async ({ page, context }) => {
  const config = {
    contactEmail: recipient,
    contactSubject: "Consulta: automatización & soporte + métricas? 50%",
    contactBody: "Hola, TYXX.\nQuiero revisar A&B + C?\nInformación: áéíóú / 50%.",
    demoUrl: "https://tyxx-chapas.pages.dev/",
  };
  await page.route("**/config.js", (route) => route.fulfill({
    contentType: "text/javascript",
    body: `window.TYXX_CONFIG = Object.freeze(${JSON.stringify(config)});`,
  }));
  await page.goto("http://127.0.0.1:4180/index.html#asistente");
  await page.getByRole("button", { name: "Copio pedidos a una planilla", exact: true }).click();
  await expect(page.getByRole("region", { name: "Ficha de proceso", exact: true })).toBeVisible();
  const href = new URL(await page.locator("#contacto [data-contact]").getAttribute("href"));
  expect(href.pathname).toBe(recipient);
  expect([...href.searchParams.keys()]).toEqual(["subject", "body"]);
  expect(href.searchParams.get("subject")).toBe(config.contactSubject);
  expect(href.searchParams.get("body")).toBe(config.contactBody);
  expect(href.href).toBe(`mailto:${recipient}?subject=${encodeURIComponent(config.contactSubject)}&body=${encodeURIComponent(config.contactBody)}`);
  expect(context.pages()).toHaveLength(1);
});
