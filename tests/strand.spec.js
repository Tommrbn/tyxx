import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";

const url = "/strand.html";
const digest = (buffer) => createHash("sha256").update(buffer).digest("hex");
const assistant = (page) =>
  page.getByRole("region", { name: "Asistente de TYXX", exact: true });

for (const width of [360, 390, 768, 1440]) {
  test(`Strand: página y ficha utilizables a ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(url);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /Tu empresa,\s*mejor conectada\./,
      { useInnerText: false },
    );
    await page
      .getByRole("link", {
        name: "Contame qué proceso querés mejorar",
        exact: true,
      })
      .click();
    await assistant(page)
      .getByRole("button", {
        name: "Me llegan consultas incompletas",
        exact: true,
      })
      .click();
    await expect(
      page.getByRole("region", { name: "Ficha de proceso", exact: true }),
    ).toContainText("Base para conversar");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByText("Describir mi proceso", { exact: true }).click();
    await page
      .getByRole("link", { name: "Volver arriba", exact: true })
      .click();
    await page
      .getByRole("link", {
        name: "Contame qué proceso querés mejorar",
        exact: true,
      })
      .click();
    await expect(
      page.getByRole("region", { name: "Ficha de proceso", exact: true }),
    ).toContainText("Base para conversar");
  });
}

test("Strand: las partículas se mueven y la pausa conserva una imagen estable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(url);
  const canvas = page.locator(".hero-sculpture canvas");
  // Read the canvas bitmap so hovering the overlaid pause button does not
  // change the assertion's pixels independently of the animation itself.
  const frame = async () =>
    digest(await canvas.evaluate((element) => element.toDataURL()));
  const first = await frame();
  await expect.poll(frame).not.toBe(first);
  await page
    .getByRole("button", { name: "Pausar animación", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Reanudar animación", exact: true }),
  ).toBeVisible();
  const paused = await frame();
  const bounds = await canvas.boundingBox();
  await page.mouse.move(
    bounds.x + bounds.width * 0.65,
    bounds.y + bounds.height * 0.45,
  );
  expect(await frame()).toBe(paused);
  await page
    .getByRole("button", { name: "Reanudar animación", exact: true })
    .click();
  await expect.poll(frame).not.toBe(paused);
});

test("Strand: el puntero ilumina las fibras cercanas sin iluminar toda la figura", async ({
  browser,
}) => {
  const render = async (pointer) => {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "no-preference",
      deviceScaleFactor: 1,
    });
    try {
      await page.clock.install({ time: new Date("2026-09-12T12:00:00Z") });
      await page.clock.pauseAt(new Date("2026-09-12T12:00:01Z"));
      await page.goto("http://127.0.0.1:4180/strand.html");
      await page.evaluate(() => document.fonts.ready);
      const canvas = page.locator(".hero-sculpture canvas");
      await page.clock.runFor(2500);
      const bounds = await canvas.boundingBox();
      if (pointer)
        await page.mouse.move(bounds.x + pointer.x, bounds.y + pointer.y);
      await page.clock.runFor(600);
      return await canvas.evaluate((element) => {
        const { width, height } = element;
        const pixels = Array.from(
          element.getContext("2d").getImageData(0, 0, width, height).data,
        );
        let strongest = 0;
        let tip = { x: width / 2, y: height / 2 };
        for (let y = Math.floor(height * 0.3); y < height * 0.6; y++) {
          for (let x = Math.floor(width * 0.2); x < width * 0.8; x++) {
            const alpha = pixels[(y * width + x) * 4 + 3];
            if (alpha > strongest) {
              strongest = alpha;
              tip = { x, y };
            }
          }
        }
        return { pixels, width, tip };
      });
    } finally {
      await page.close();
    }
  };
  const baseline = await render();
  const hovered = await render(baseline.tip);
  const light = { nearBefore: 0, nearAfter: 0, farBefore: 0, farAfter: 0 };
  for (let i = 3; i < baseline.pixels.length; i += 4) {
    const pixel = (i - 3) / 4;
    const distance = Math.hypot(
      (pixel % baseline.width) - baseline.tip.x,
      Math.floor(pixel / baseline.width) - baseline.tip.y,
    );
    if (distance < 110) {
      light.nearBefore += baseline.pixels[i];
      light.nearAfter += hovered.pixels[i];
    } else {
      light.farBefore += baseline.pixels[i];
      light.farAfter += hovered.pixels[i];
    }
  }
  // Waves keep moving between page instances. Compare regional light, not
  // exact pixel positions, to isolate the pointer's proximity highlight.
  expect(light.nearBefore).toBeGreaterThan(0);
  expect(light.nearAfter).toBeGreaterThan(light.nearBefore * 1.1);
  expect(Math.abs(light.farAfter - light.farBefore) / light.farBefore).toBeLessThan(0.05);
});

test("Strand: movimiento reducido, texto al 200% y navegación por teclado", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1000 });
  await page.goto(url);
  await expect(
    page.getByRole("button", { name: "Reanudar animación", exact: true }),
  ).toBeVisible();
  await page.addStyleTag({ content: "html {font-size:200%}" });
  const overflow = await page.evaluate(() =>
    [...document.querySelectorAll("body *")]
      .filter((node) => {
        const r = node.getBoundingClientRect();
        return r.width > 0 && r.right > innerWidth + 1;
      })
      .map((node) => `${node.tagName}.${node.className}`),
  );
  expect(overflow).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 390, height: 900 });
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
    assistant(page).getByLabel("Tu respuesta", { exact: true }),
  ).toBeVisible();
});

test("Strand: las escenas acompañan el scroll y se pueden elegir en móvil", async ({
  page,
}) => {
  await page.goto(url);
  await page.locator('[data-story-step="1"]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-story-visual="1"]')).toHaveClass(
    /is-active/,
  );
  await page.locator('[data-story-step="2"]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-story-visual="2"]')).toHaveClass(
    /is-active/,
  );
  await page.setViewportSize({ width: 390, height: 900 });
  await page
    .getByRole("button", { name: "Ver automatizaciones", exact: true })
    .click();
  await expect(page.locator('[data-story-visual="0"]')).toHaveClass(
    /is-active/,
  );
  await page
    .getByRole("button", { name: "Ver sistemas de IA", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Ver sistemas de IA", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('[data-story-visual="1"]')).toHaveClass(
    /is-active/,
  );
});

test("Strand: mantiene contacto y versión anterior sin JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4180/strand.html#asistente");
  await expect(page.locator("#assistant-fallback")).toBeVisible();
  await expect(
    page.getByRole("link", { name: /\+54\s?9\s?230\s?451\s?4378/ }),
  ).toHaveAttribute("href", "tel:+5492304514378");
  await page
    .getByRole("link", { name: "Ver versión Portfolite", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Menos tareas repetitivas.",
  );
  await context.close();
});
