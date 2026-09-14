import { test, expect } from "@playwright/test";

const assistant = (page) =>
  page.getByRole("region", { name: "Asistente de TYXX", exact: true });
const sheet = (page) =>
  page.getByRole("region", { name: "Ficha de proceso", exact: true });
const answer = (page) => page.getByLabel("Tu respuesta", { exact: true });

test("rechaza vacío, doble envío y exceso de texto conservando el borrador del campo", async ({
  page,
}) => {
  await page.goto("/#asistente");
  const turns = page
    .getByRole("list", { name: "Respuestas de la conversación" })
    .getByRole("listitem");
  await page
    .getByRole("button", { name: "Agregar respuesta", exact: true })
    .click();
  await expect(turns).toHaveCount(0);
  await expect(answer(page)).toHaveAttribute("aria-invalid", "true");
  await answer(page).fill("Copio pedidos a una planilla");
  await page
    .getByRole("button", { name: "Agregar respuesta", exact: true })
    .dblclick();
  await expect(turns).toHaveCount(1);
  const longText = "á".repeat(12001);
  await answer(page).fill(longText);
  await page
    .getByRole("button", { name: "Agregar respuesta", exact: true })
    .click();
  await expect(answer(page)).toHaveValue(longText);
  await expect(turns).toHaveCount(1);
  await answer(page).fill("Cometo errores al copiar.");
  await page
    .getByRole("button", { name: "Agregar respuesta", exact: true })
    .click();
  await expect(sheet(page)).toContainText("Base para conversar");
});

test("la conversación y las ediciones no envían datos a la red", async ({
  page,
}) => {
  const outgoing = [];
  page.on("request", (request) =>
    outgoing.push({
      url: request.url(),
      method: request.method(),
      data: request.postData(),
    }),
  );
  await page.goto("/#asistente");
  await expect(
    assistant(page).getByRole("button", {
      name: "Copio pedidos a una planilla",
      exact: true,
    }),
  ).toBeVisible();
  await answer(page).fill(
    "Proceso: Organizo entregas; Dificultad: Se superponen horarios; Herramientas: Papel; Frecuencia: Cada semana",
  );
  await page
    .getByRole("button", { name: "Agregar respuesta", exact: true })
    .click();
  await sheet(page)
    .getByRole("button", { name: "Editar Proceso actual", exact: true })
    .click();
  await sheet(page)
    .getByLabel("Proceso actual", { exact: true })
    .fill(
      'Caso ficticio PRIVADO-TYXX-123 <img src="https://example.com/dato">',
    );
  await sheet(page)
    .getByRole("button", { name: "Guardar Proceso actual", exact: true })
    .click();
  await page.getByText("Describir mi proceso", { exact: true }).click();
  await expect(sheet(page)).toBeHidden();
  await page.getByRole("link", { name: "Volver arriba" }).click();
  await page
    .getByRole("link", { name: "Contame qué proceso querés mejorar" })
    .click();
  await expect(sheet(page)).toContainText("PRIVADO-TYXX-123");
  expect(
    outgoing.every(
      (request) =>
        new URL(request.url).origin === "http://127.0.0.1:4180" &&
        request.method === "GET" &&
        request.data === null,
    ),
  ).toBe(true);
  expect(
    outgoing.some((request) => /PRIVADO|Organizo|superponen/.test(request.url)),
  ).toBe(false);
});

for (const unavailable of ["sin JavaScript", "módulo no disponible"]) {
  test(
    "contenido y contacto disponibles " + unavailable,
    async ({ browser }) => {
      const context = await browser.newContext({
        javaScriptEnabled: unavailable !== "sin JavaScript",
      });
      const page = await context.newPage();
      if (unavailable === "módulo no disponible")
        await page.route("**/assistant-view.js", (route) => route.abort());
      await page.goto("http://127.0.0.1:4180/#asistente");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(
        assistant(page)
          .getByRole("status")
          .filter({ hasText: /asistente/ }),
      ).toBeVisible();
      await expect(
        assistant(page).getByRole("button", {
          name: "Copio pedidos a una planilla",
          exact: true,
        }),
      ).toBeHidden();
      await expect(
        page.getByRole("link", { name: /\+54\s?9\s?230\s?451\s?4378/ }),
      ).toHaveAttribute("href", "tel:+5492304514378");
      await context.close();
    },
  );
}

for (const width of [360, 390, 768, 1440]) {
  test(
    "conversación y ficha utilizables a " + width + " px",
    async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/#asistente");
      await assistant(page)
        .getByRole("button", {
          name: "Me llegan consultas incompletas",
          exact: true,
        })
        .click();
      await expect(sheet(page)).toContainText("Base para conversar");
      const conversationBounds = await page
        .getByRole("region", { name: "Conversación", exact: true })
        .boundingBox();
      const sheetBounds = await sheet(page).boundingBox();
      expect(
        width < 901
          ? sheetBounds.y > conversationBounds.y
          : sheetBounds.x > conversationBounds.x,
      ).toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await assistant(page).screenshot({
        path: ".scratch/asistente-tyxx/evidence/assistant-" + width + ".png",
      });
      await sheet(page)
        .getByRole("button", { name: "Editar Proceso actual", exact: true })
        .click();
      await sheet(page)
        .getByLabel("Proceso actual", { exact: true })
        .fill("Árbol & gestión\n" + "textoextenso".repeat(90));
      await sheet(page)
        .getByRole("button", { name: "Guardar Proceso actual", exact: true })
        .click();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    },
  );
}

test("menú, conversación y correcciones se operan con teclado y foco visible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menú", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation", { name: "Navegación móvil" })
      .getByRole("link", { name: "Asistente", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "Navegación móvil" }),
  ).toBeHidden();
  await assistant(page)
    .getByRole("button", {
      name: "Me llegan consultas incompletas",
      exact: true,
    })
    .focus();
  await page.keyboard.press("Enter");
  await expect(answer(page)).toBeFocused();
  expect(
    await answer(page).evaluate((node) => getComputedStyle(node).outlineStyle),
  ).toBe("solid");
  await page.keyboard.type("Correo interno");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(answer(page)).toBeFocused();
  await page
    .getByRole("button", { name: "Corregir respuesta 1", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByLabel("Corregir respuesta 1", { exact: true }),
  ).toBeFocused();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.type("Me llegan consultas de soporte.");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Corregir respuesta 1", exact: true }),
  ).toBeFocused();
  await expect(sheet(page)).toContainText("Me llegan consultas de soporte.");
});

test("texto al 200% y movimiento reducido conservan controles y orden", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1000 });
  await page.goto("/#asistente");
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  await assistant(page)
    .getByRole("button", {
      name: "Me llegan consultas incompletas",
      exact: true,
    })
    .click();
  await sheet(page)
    .getByRole("button", { name: "Editar Dificultad descrita", exact: true })
    .click();
  await sheet(page)
    .getByLabel("Dificultad descrita", { exact: true })
    .fill("Faltan datos.");
  await sheet(page)
    .getByRole("button", { name: "Guardar Dificultad descrita", exact: true })
    .click();
  const overflowingElements = await page.evaluate(() =>
    [...document.querySelectorAll("body *")]
      .filter((node) => {
        const rect = node.getBoundingClientRect();
        return rect.width > 0 && rect.right > window.innerWidth + 1;
      })
      .map((node) => `${node.tagName}.${node.className}`),
  );
  expect(overflowingElements).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await assistant(page).screenshot({
    path: ".scratch/asistente-tyxx/evidence/assistant-text-200.png",
  });
});
