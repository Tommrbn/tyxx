import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";

const url = "/strand.html";
const digest = (buffer) => createHash("sha256").update(buffer).digest("hex");
const demo = (page) => page.getByRole("region", { name: "Asistente de TYXX", exact: true });

test("Strand: AI business positioning is honest across the visible offer", async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveTitle("TYXX — Hacé crecer tu negocio con IA");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /atender consultas, seguir oportunidades/);
  await expect(page.locator('#inicio')).toContainText('liberar tiempo de tareas repetitivas');
  await expect(page.locator('#ejemplo')).toContainText('Ejemplo hipotético · sin sistemas conectados');
  await expect(page.locator('#proyectos')).toContainText('No es un caso de IA');
  await expect(page.locator('main')).not.toContainText(/hacemos (sitios|webs)|desarrollamos sitios web|sitio web ·/i);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(url);
    await page.locator('#inicio').screenshot({ path: `test-results/ai-growth-hero-${width}.png` });
    await page.locator('#proyectos').screenshot({ path: `test-results/ai-growth-clients-${width}.png` });
  }
});

test("Strand: floating launcher opens without an assistant card", async ({ page }) => {
  await page.goto(url);
  await expect(page.locator("#proyectos .assistant-demo, [data-agent-open]")).toHaveCount(0);
  await page.getByRole("button", { name: "Probá un agente" }).click();
  await expect(demo(page)).toBeVisible();
  await demo(page).getByRole("button", { name: "Cerrar demo" }).click();
  await expect(demo(page)).toBeHidden();
});
test("Strand: composer and latest reply remain visible inside compact popup", async ({ page }) => {
  for (const [width, height] of [[390, 700], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.goto(url);
    await page.getByRole("button", { name: "Probá un agente" }).click();
    const panel = page.getByRole("region", { name: "Asistente de TYXX" });
    const composer = panel.getByLabel("Tu pregunta (sin datos personales)");
    const visibleInPanel = async (locator) => {
      const box = await locator.boundingBox();
      const frame = await panel.boundingBox();
      expect(box.y).toBeGreaterThanOrEqual(frame.y);
      expect(box.y + box.height).toBeLessThanOrEqual(frame.y + frame.height);
    };
    await visibleInPanel(composer);
    await panel.getByRole("button", { name: "¿Qué servicios ofrece TYXX?" }).click();
    const reply = panel.getByText(/automatizaciones e integraciones/);
    await visibleInPanel(reply);
    const replyBox = await reply.boundingBox();
    const scrollBox = await panel.locator('.agent-transcript-body').boundingBox();
    expect(replyBox.y + replyBox.height).toBeLessThanOrEqual(scrollBox.y + scrollBox.height + 1);
    await visibleInPanel(composer);
    expect(await panel.evaluate((node) => node.scrollTop)).toBe(0);
  }
});

test("Strand: launcher does not obscure mobile footer navigation", async ({ page }) => {
  for (const width of [360, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(url);
    const back = page.getByRole("link", { name: "Volver arriba", exact: true });
    await back.scrollIntoViewIfNeeded();
    const center = await back.boundingBox();
    const hit = await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest('a')?.getAttribute('aria-label'), { x: center.x + center.width / 2, y: center.y + center.height / 2 });
    expect(hit).toBe('Volver arriba');
    await back.click();
    await expect(page).toHaveURL(/#inicio$/);
  }
});

for (const width of [360, 390, 768, 1440]) {
  test(`Strand: página y ficha utilizables a ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(url);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Hacé crecer tu negocio con IA.",
      { useInnerText: false },
    );
    await page.getByRole("button", { name: "Probá un agente" }).click();
    await demo(page).getByRole("button", { name: "¿Qué servicios ofrece TYXX?" }).click();
    await expect(page.getByRole("list", { name: "Conversación simulada" })).toContainText("automatizaciones e integraciones");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await demo(page).getByRole("button", { name: "Cerrar demo" }).click();
    await page
      .getByRole("link", { name: "Volver arriba", exact: true })
      .click();
    await page.getByRole("button", { name: "Probá un agente" }).click();
    await expect(page.getByRole("list", { name: "Conversación simulada" })).toContainText("automatizaciones e integraciones");
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
      return await canvas.evaluate((element, baselineTip) => {
        const { width, height } = element;
        const pixels = element.getContext("2d").getImageData(0, 0, width, height).data;
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
        // Both renders measure the same regions around the baseline tip.
        tip = baselineTip ?? tip;
        let near = 0;
        let far = 0;
        for (let i = 3; i < pixels.length; i += 4) {
          const pixel = (i - 3) / 4;
          const distance = Math.hypot(
            (pixel % width) - tip.x,
            Math.floor(pixel / width) - tip.y,
          );
          if (distance < 110) near += pixels[i];
          else far += pixels[i];
        }
        return { near, far, width, height, tip };
      }, pointer);
    } finally {
      await page.close();
    }
  };
  const baseline = await render();
  const hovered = await render(baseline.tip);
  const light = {
    nearBefore: baseline.near,
    nearAfter: hovered.near,
    farBefore: baseline.far,
    farAfter: hovered.far,
  };
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
      .getByRole("navigation", { name: "Navegación principal" })
      .getByRole("link", { name: "Problemas", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#problemas$/);
  await expect(page.locator("#problemas")).toBeFocused();
  await page.getByRole("button", { name: "Probá un agente" }).click();
  await expect(demo(page).getByLabel("Tu pregunta (sin datos personales)")).toBeVisible();
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
    .getByRole("button", { name: "Ver consulta y organización", exact: true })
    .click();
  await expect(page.locator('[data-story-visual="0"]')).toHaveClass(
    /is-active/,
  );
  await page
    .getByRole("button", { name: "Ver revisión humana", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Ver revisión humana", exact: true }),
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
  await page.goto("http://127.0.0.1:4180/strand.html");
  await expect(page.locator(".assistant-demo, [data-agent-open]")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Probá un agente" })).toBeHidden();
  await expect(
    page.getByRole("link", { name: "tyxxsolve@gmail.com", exact: true }),
  ).toHaveAttribute("href", "mailto:tyxxsolve@gmail.com");
  await page
    .getByRole("link", { name: "Ver versión Portfolite", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Menos tareas repetitivas.",
  );
  await context.close();
});


test("Strand: consulta interna antes de la salida explícita por correo", async ({ page, context }) => {
  await page.goto(url);
  const primary = page.getByRole("link", { name: "Conversemos sobre tu negocio", exact: true });
  await expect(primary).toHaveAttribute("href", "#contacto");
  await primary.click();
  await expect(page).toHaveURL(/#contacto$/);
  expect(context.pages()).toHaveLength(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hacé crecer tu negocio con IA.");
  const contact = page.getByRole("region", { name: "Conversemos sobre tu negocio", exact: true });
  await expect(contact).toContainText("Consulta inicial sin cargo con TYXX");
  const email = contact.getByRole("link", { name: "Escribir por correo", exact: true });
  const href = new URL(await email.getAttribute("href"));
  expect(href.protocol).toBe("mailto:");
  expect(href.pathname).toBe("tyxxsolve@gmail.com");
  expect(href.searchParams.get("subject")).toBe("Consulta sobre un proyecto para mi negocio");
  expect(href.searchParams.get("body")).toBe(
    "Hola, TYXX. Quiero consultar por un proyecto para mi negocio.\n\nMi negocio es: \nMe gustaría mejorar: ",
  );
  await expect(email).not.toHaveAttribute("target");
  await expect(page.locator("[data-contact]")).toHaveCount(1);
  await expect(contact.getByRole("link", { name: "tyxxsolve@gmail.com", exact: true })).toHaveAttribute("href", "mailto:tyxxsolve@gmail.com");
  await expect(page.locator('a[href^="tel:"], a[href*="wa.me"]')).toHaveCount(0);
  await expect(contact).not.toContainText("Vos decidís si enviás el mensaje. Abrir tu aplicación de correo no envía una consulta ni reserva un turno.");
  await expect(contact.locator("details")).toHaveCount(3);
  await contact.getByText("¿Cuánto cuesta y cuánto tarda?", { exact: false }).click();
  await expect(contact).toContainText("presupuesto a medida");
});

test("Strand: lectura comercial y contacto sin JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4180/strand.html");
  const sections = page.locator("main > section");
  expect(await sections.evaluateAll((nodes) => nodes.map((node) => node.id))).toEqual([
    "inicio", "problemas", "ejemplo", "proceso", "proyectos", "contacto",
  ]);
  const names = [
    "Hacé crecer tu negocio con IA.",
    "¿Te resulta familiar?", "Una consulta, paso a paso.",
    "Primero entendemos. Después construimos.", "Trabajo y demostraciones.",
    "Conversemos sobre tu negocio",
  ];
  for (const name of names) await expect(page.getByRole("region", { name, exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Conversemos sobre tu negocio", exact: true }).click();
  await expect(page).toHaveURL(/#contacto$/);
  expect(context.pages()).toHaveLength(1);
  await expect(page.getByRole("link", { name: "Escribir por correo", exact: true })).toHaveAttribute("href", "mailto:tyxxsolve@gmail.com");
  await expect(page.locator(".header-contact")).toHaveAttribute("href", "#contacto");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  await expect(page.locator("#inicio")).toContainText("Trato directo con TYXX");
  await expect(page.locator("#proceso")).toContainText("mantenimiento opcional según acuerdo");
  await page.getByText("¿Podemos usar las herramientas que ya tengo?", { exact: false }).click();
  await expect(page.locator("#contacto details[open]")).toContainText("Primero revisamos");
  await context.close();
});


test("Strand: ejemplo hipotético sin abrir la demostración", async ({ page }) => {
  await page.goto(url);
  await page.getByRole("link", { name: "Ver un ejemplo", exact: true }).click();
  await expect(page).toHaveURL(/#ejemplo$/);
  await expect(demo(page)).toBeHidden();
  await expect(page.locator("#assistant-disclosure")).toHaveCount(0);
  const example = page.getByRole("region", { name: "Una consulta, paso a paso.", exact: true });
  await expect(example.getByText("Ejemplo hipotético · sin sistemas conectados", { exact: true }).first()).toBeVisible();
  await expect(example).toContainText("Consulta → organización de información → revisión humana → próximo paso");
  await expect(example.locator(".story-step ol > li")).toHaveText([
    "Consulta: llega una pregunta.",
    "Organización de información: se reúne lo necesario para revisarla.",
    "Revisión humana: una persona revisa la información y decide qué falta.",
    "Próximo paso: se acuerda cómo continuar, si corresponde.",
  ]);
  await expect(example.locator(".story-step ol")).toHaveCount(3);
  await expect(example.locator(".story-step ol").nth(1)).toHaveAttribute("start", "3");
  await expect(example.locator(".story-step ol").nth(2)).toHaveAttribute("start", "4");
  const group = page.getByRole("group", { name: "Escenas del ejemplo", exact: true });
  await expect(group.getByRole("button")).toHaveCount(3);
  await expect(group.getByRole("button", { name: "Ver consulta y organización", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(group.getByRole("button", { name: "Ver revisión humana", exact: true })).toHaveAttribute("aria-pressed", "false");
  await expect(group.getByRole("button", { name: "Ver próximo paso", exact: true })).toHaveAttribute("aria-pressed", "false");
});


test("Strand: el ejemplo conserva sus cuatro pasos sin JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4180/strand.html");
  await page.getByRole("link", { name: "Ver un ejemplo", exact: true }).click();
  await expect(page).toHaveURL(/#ejemplo$/);
  await expect(page.locator("#assistant-disclosure")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Probá un agente" })).toBeHidden();
  const steps = page.locator("#ejemplo .story-step ol > li");
  await expect(steps).toHaveCount(4);
  for (const step of await steps.all()) await expect(step).toBeVisible();
  await expect(steps.nth(2)).toHaveText("Revisión humana: una persona revisa la información y decide qué falta.");
  await expect(page.locator("#ejemplo .story-intro")).toContainText("Ejemplo hipotético · sin sistemas conectados");
  await expect(page.getByRole("button", { name: "Ver revisión humana", exact: true })).toBeHidden();
  await context.close();
});


test("Strand: demostración secundaria conserva charla al reabrir, no al recargar", async ({ page }) => {
  await page.goto(url);
  const demos = page.getByRole("region", { name: "Trabajo y demostraciones.", exact: true });
  await expect(demos.locator(".assistant-demo, [data-agent-open]")).toHaveCount(0);
  await expect(page.locator("main > section")).toHaveCount(6);
  await expect(page.locator("#asistente, #assistant-disclosure")).toHaveCount(0);
  await page.getByRole("button", { name: "Probá un agente" }).click();
  await expect(demo(page)).toContainText("Simulación local con respuestas orientativas, sin IA real: no se envían mensajes ni se hacen reservas. No ingreses datos personales.");
  await demo(page).getByRole("button", { name: "¿Qué servicios ofrece TYXX?" }).click();
  await demo(page).getByRole("button", { name: "Cerrar demo" }).click();
  await expect(demo(page)).toBeHidden();
  await page.getByRole("button", { name: "Probá un agente" }).click();
  await expect(page.getByRole("list", { name: "Conversación simulada" })).toContainText("automatizaciones e integraciones");
  await page.reload();
  await expect(demo(page)).toBeHidden();
  await page.getByRole("button", { name: "Probá un agente" }).click();
  await expect(page.getByRole("list", { name: "Conversación simulada" }).locator("li")).toHaveCount(0);
  const client = demos.getByRole("link", { name: "Visitar Novartech (nueva pestaña)", exact: true });
  await expect(client).toHaveAttribute("href", "https://novar-tech.com/");
  await expect(client).not.toHaveAttribute("data-demo");
  await expect(client).toContainText("Novartech");
  await expect(client).toContainText("Hace varios años");
});


test("Strand: legacy hash does not expose an old process sheet", async ({ page }) => {
  await page.goto(url + "#asistente");
  await expect(page.locator("#asistente, #assistant-disclosure, #sheet-fields")).toHaveCount(0);
  await expect(demo(page)).toBeHidden();
  await page.getByRole("button", { name: "Probá un agente" }).click();
  await demo(page).getByLabel("Tu pregunta (sin datos personales)").fill("¿Qué servicios ofrece TYXX?");
  await demo(page).getByRole("button", { name: "Preguntar" }).click();
  await expect(page.getByRole("list", { name: "Conversación simulada" })).toContainText("automatizaciones e integraciones");
});

for (const unavailable of ["sin JavaScript", "archivo bloqueado"]) {
  test("Strand: contacto independiente de la demo " + unavailable, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: unavailable !== "sin JavaScript" });
    const page = await context.newPage();
    if (unavailable === "archivo bloqueado") await page.route("**/agent-demo.js", (route) => route.abort());
    await page.goto("http://127.0.0.1:4180/strand.html");
    await expect(page.locator(".assistant-demo, [data-agent-open]")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Probá un agente" })).toBeHidden();
    await page.getByRole("link", { name: "Contacto", exact: true }).first().click();
    await expect(page).toHaveURL(/#contacto$/);
    expect(context.pages()).toHaveLength(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hacé crecer tu negocio con IA.");
    await expect(page.getByRole("link", { name: "Escribir por correo", exact: true })).toHaveAttribute("href", /^mailto:tyxxsolve@gmail\.com(?:\?subject=|$)/);
    await context.close();
  });
}


for (const width of [360, 390]) {
  for (const mode of ["sin JavaScript", "archivo bloqueado"]) {
    test(`Strand nav: fallback ${mode} a ${width} px`, async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: mode !== "sin JavaScript", viewport: { width, height: 900 } });
      const page = await context.newPage();
      if (mode === "archivo bloqueado") await page.route("**/strand-motion.js", (route) => route.abort());
      await page.goto("http://127.0.0.1:4180/strand.html");
      const nav = page.getByRole("navigation", { name: "Navegación principal", exact: true });
      await expect(nav).toBeVisible();
      await expect(page.getByRole("navigation")).toHaveCount(1);
      await expect(nav.getByRole("link")).toHaveText(["Problemas", "Ejemplo", "Cómo trabajamos", "Demos", "Contacto"]);
      await expect(page.getByRole("button", { name: "Abrir menú", exact: true })).toBeHidden();
      expect(await page.locator(".header-wrap").evaluate((node) => getComputedStyle(node).position)).toBe("static");
      for (const link of await nav.getByRole("link").all()) {
        await expect(link).toBeVisible();
        const bounds = await link.boundingBox();
        expect(bounds.x).toBeGreaterThanOrEqual(0);
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
        await link.click();
        await expect(page).toHaveURL(new RegExp((await link.getAttribute("href")) + "$"));
      }
      await context.close();
    });
  }
}


for (const [width, key, canvasFailure] of [[360, "Enter", false], [390, "Space", true]]) {
  test(`Strand nav: apertura con ${key} y Escape a ${width} px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    if (canvasFailure) await page.addInitScript(() => {
      HTMLCanvasElement.prototype.getContext = () => { throw new Error("Canvas no disponible"); };
    });
    await page.setViewportSize({ width, height: 900 });
    await page.goto(url);
    const toggle = page.getByRole("button", { name: "Abrir menú", exact: true });
    const nav = page.getByRole("navigation", { name: "Navegación principal", exact: true });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-controls", "strand-navigation");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(nav).toBeHidden();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Saltar al contenido", exact: true })).toBeFocused();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(toggle).toBeFocused();
    await page.keyboard.press(key);
    const close = page.getByRole("button", { name: "Cerrar menú", exact: true });
    await expect(close).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("navigation")).toHaveCount(1);
    await page.keyboard.press("Tab");
    await expect(nav.getByRole("link", { name: "Problemas", exact: true })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(nav).toBeHidden();
    await expect(toggle).toBeFocused();
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press(key);
    await page.keyboard.press("Tab");
    for (let i = 0; i < 5; i++) await page.keyboard.press("Tab");
    const heroContact = page.getByRole("link", { name: "Conversemos sobre tu negocio", exact: true });
    await expect(heroContact).toBeFocused();
    await expect(heroContact).toBeVisible();
    await expect(nav).toBeVisible();
    if (canvasFailure) expect(errors).toContain("Canvas no disponible");
    else expect(errors).toEqual([]);
  });
}


for (const [width, label, id] of [[360, "Ejemplo", "ejemplo"], [390, "Cómo trabajamos", "proceso"]]) {
  test(`Strand nav: enlace ${label} cierra y enfoca el destino nativo`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(url);
    await page.getByRole("button", { name: "Abrir menú", exact: true }).click();
    const nav = page.getByRole("navigation", { name: "Navegación principal", exact: true });
    await nav.getByRole("link", { name: label, exact: true }).focus();
    if (width === 360) await page.keyboard.press("Enter");
    else await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp("#" + id + "$"));
    const destination = page.locator("#" + id);
    await expect(destination).toBeFocused();
    await expect(destination).toBeVisible();
    await expect(nav).toBeHidden();
    await expect(page.getByRole("button", { name: "Abrir menú", exact: true })).toHaveAttribute("aria-expanded", "false");
    const bounds = await destination.boundingBox();
    expect(bounds.y).toBeGreaterThanOrEqual(0);
    expect(bounds.y).toBeLessThan(150);
    expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0);
  });
}


test("Strand nav: click exterior conserva el foco del control activado", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(url);
  await page.getByRole("button", { name: "Abrir menú", exact: true }).click();
  const nav = page.getByRole("navigation", { name: "Navegación principal", exact: true });
  await nav.getByRole("link", { name: "Problemas", exact: true }).focus();
  const outside = page.locator(".motion-toggle");
  await outside.click();
  await expect(nav).toBeHidden();
  await expect(outside).toBeFocused();
  await expect(outside).toBeVisible();
  await expect(outside).toHaveAttribute("aria-label", "Pausar animación");
  await expect(page.getByRole("button", { name: "Abrir menú", exact: true })).toHaveAttribute("aria-expanded", "false");
});


test("Strand nav: click exterior sintético retira foco de enlaces ocultos", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto(url);
  await page.getByRole("button", { name: "Abrir menú", exact: true }).click();
  const nav = page.getByRole("navigation", { name: "Navegación principal", exact: true });
  await nav.getByRole("link", { name: "Problemas", exact: true }).focus();
  // An activation without pointer focus transfer must not strand focus in the nav.
  await page.getByRole("heading", { level: 1 }).dispatchEvent("click");
  await expect(nav).toBeHidden();
  const toggle = page.getByRole("button", { name: "Abrir menú", exact: true });
  await expect(toggle).toBeFocused();
  await expect(toggle).toBeVisible();
});


test("Strand nav: resize transfiere foco antes de ocultar controles", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(url);
  const toggle = page.getByRole("button", { name: "Abrir menú", exact: true });
  await toggle.focus();
  await page.setViewportSize({ width: 761, height: 900 });
  const nav = page.getByRole("navigation", { name: "Navegación principal", exact: true });
  const first = nav.getByRole("link", { name: "Problemas", exact: true });
  await expect(first).toBeFocused();
  await expect(first).toBeVisible();
  await expect(toggle).toBeHidden();
  await expect(page.getByRole("navigation")).toHaveCount(1);
  await page.setViewportSize({ width: 760, height: 900 });
  await expect(toggle).toBeFocused();
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(nav).toBeHidden();
});


test("Strand nav: resize preserva foco visible y reinicia menú abierto", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto(url);
  await page.getByRole("button", { name: "Abrir menú", exact: true }).click();
  const nav = page.getByRole("navigation", { name: "Navegación principal", exact: true });
  const demos = nav.getByRole("link", { name: "Demos", exact: true });
  await demos.focus();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(demos).toBeFocused();
  await expect(demos).toBeVisible();
  const toggle = page.locator(".strand-menu-toggle");
  await expect(toggle).toBeHidden();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await page.setViewportSize({ width: 390, height: 900 });
  await expect(toggle).toBeFocused();
  await expect(toggle).toBeVisible();
  await expect(nav).toBeHidden();
  const outside = page.locator(".header-contact");
  await outside.focus();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(nav).toBeVisible();
  await expect(outside).toBeFocused();
  await page.setViewportSize({ width: 360, height: 900 });
  await expect(nav).toBeHidden();
  await expect(outside).toBeFocused();
  await expect(outside).toBeVisible();
});


test("Strand compacta: decoración y lectura a 360 px", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 1000 });
  await page.goto(url);
  const hero = await page.locator(".hero-sculpture").boundingBox();
  expect(hero.height).toBe(280);
  const graphic = await page.locator(".story-particles").boundingBox();
  expect(graphic.height).toBe(300);
  const art = await page.locator(".story-art").boundingBox();
  expect(art.height).toBeLessThanOrEqual(420);
  const copy = await page.locator(".story-copy").boundingBox();
  expect(copy.y + copy.height).toBeLessThanOrEqual(art.y);
  const disclaimer = await page.locator(".art-disclaimer").boundingBox();
  const controls = await page.locator(".story-index").boundingBox();
  expect(disclaimer.y).toBeGreaterThanOrEqual(graphic.y + graphic.height);
  expect(controls.y).toBeGreaterThanOrEqual(disclaimer.y + disclaimer.height);
});


for (const width of [360, 390, 768, 1440]) {
  for (const scale of [1, 2]) {
    test(`Strand matriz: ${width}px texto ${scale * 100}%`, async ({ page }) => {
      await inspectResponsiveLayout(page, width, scale);
    });
  }
}
for (const scale of [1, 2]) {
  test(`Strand matriz: contenedor600 texto ${scale * 100}%`, async ({ page }) => {
    await inspectResponsiveLayout(page, 1440, scale, true);
  });
}

async function inspectResponsiveLayout(page, width, scale, narrow = false) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  if (narrow) await page.addStyleTag({ content: ".page-frame { width: 600px; }" });
  await page.getByRole("button", { name: "Probá un agente" }).click();
  await expect(demo(page).getByLabel("Tu pregunta (sin datos personales)")).toBeVisible();
  await demo(page).getByRole("button", { name: "Cerrar demo" }).click();
  for (const summary of await page.locator(".faq-items summary").all()) await summary.click();
  const fontEvidence = await page.evaluate((factor) => {
    const nodes = [...document.querySelectorAll("html, body, body *")];
    const before = nodes.map((node) => {
      const style = getComputedStyle(node);
      return { node, font: parseFloat(style.fontSize), line: parseFloat(style.lineHeight) };
    });
    // Computed snapshots also enlarge px-based text; changing only rem would miss it.
    if (factor === 2) for (const { node, font, line } of before) {
      node.style.fontSize = `${font * 2}px`;
      if (Number.isFinite(line)) node.style.lineHeight = `${line * 2}px`;
    }
    return before.filter(({ node }) => node.matches("h1, .hero-copy > p, .art-disclaimer, .motion-label, #agent-question"))
      .map(({ node, font }) => ({ name: node.className || node.id, before: font, after: parseFloat(getComputedStyle(node).fontSize) }));
  }, scale);
  expect(fontEvidence).toHaveLength(5);
  for (const font of fontEvidence) expect(font.after).toBeCloseTo(font.before * scale, 1);
  const compact = width <= 768 || narrow || scale === 2;
  const hero = await page.locator(".hero-sculpture").boundingBox();
  const art = await page.locator(".story-art").boundingBox();
  const graphic = await page.locator(".story-particles").boundingBox();
  if (compact) {
    expect(hero.height).toBe(280);
    expect(graphic.height).toBe(300);
    if (scale === 1) expect(art.height).toBeLessThanOrEqual(420);
    const copy = await page.locator(".story-copy").boundingBox();
    expect(copy.y + copy.height).toBeLessThanOrEqual(art.y);
  } else {
    expect(hero.height).toBeGreaterThan(280);
    expect(art.height).toBe(560);
  }
  for (const button of await page.locator(".story-index button").all()) {
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    const bounds = await button.boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
  }
  const layout = await page.evaluate(() => {
    const issues = [];
    for (const node of document.querySelectorAll("body *")) {
      if (node.closest('[aria-hidden="true"]') || !node.checkVisibility()) continue;
      const rect = node.getBoundingClientRect();
      // The supplied logo image is intentionally cropped inside its named link.
      // Its visible bounds are that link, not the unused bitmap margins.
      const visibleRect = node.matches(".brand-logo img") ? node.parentElement.getBoundingClientRect() : rect;
      if (visibleRect.width && (visibleRect.left < -1 || visibleRect.right > innerWidth + 1)) issues.push(`${node.tagName}.${node.className}: horizontal`);
      if (!node.textContent.trim()) continue;
      if (["hidden", "clip"].includes(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight + 1)
        issues.push(`${node.tagName}.${node.className}: clipped text`);
    }
    return { width: document.documentElement.scrollWidth, issues };
  });
  console.log(JSON.stringify(layout));
  expect(layout.width).toBeLessThanOrEqual(width);
  expect(layout.issues).toEqual([]);
  console.log(JSON.stringify({ width, narrow, scale, hero: hero.height, graphic: graphic.height, scene: art.height, fontEvidence }));
}


for (const width of [390, 1440]) {
  test(`Strand accesible: targets y foco a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(url);
    await page.getByRole("button", { name: "Probá un agente" }).click();
    await expect(demo(page).getByLabel("Tu pregunta (sin datos personales)")).toBeVisible();
    if (width === 390) await page.getByRole("button", { name: "Abrir menú", exact: true }).click();
    const small = await page.locator("a, button, summary").evaluateAll((nodes) => nodes
      .filter((node) => node.checkVisibility())
      .map((node) => ({ name: node.getAttribute("aria-label") || node.textContent.trim(), rect: node.getBoundingClientRect() }))
      .filter(({ rect }) => rect.width < 44 || rect.height < 44)
      .map(({ name, rect }) => ({ name, width: rect.width, height: rect.height })));
    expect(small).toEqual([]);
    await page.keyboard.press("Tab");
    for (const selector of ["#agent-suggestions button", "#agent-close", "#agent-launch"]) {
      const target = page.locator(selector).first();
      await target.focus();
      await expect(target).toBeFocused();
      const focus = await target.evaluate((node) => getComputedStyle(node));
      expect(focus.outlineStyle).toBe("solid");
      expect(parseFloat(focus.outlineWidth)).toBeGreaterThanOrEqual(2);
    }
    await demo(page).getByRole("button", { name: "Cerrar demo" }).click();
    await page.keyboard.press("Tab");
    for (const selector of [".skip-link", ".header-contact", ".motion-toggle", ".story-index button", ".text-link", ".faq-items summary"]) {
      const target = page.locator(selector).first();
      await target.focus();
      await expect(target).toBeFocused();
      const focus = await target.evaluate((node) => {
        const r = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        const top = document.elementFromPoint(r.left + r.width / 2, r.top + Math.min(r.height / 2, 20));
        return { outline: style.outlineStyle, width: parseFloat(style.outlineWidth), visible: node.contains(top) };
      });
      expect(focus.outline).toBe("solid");
      expect(focus.width).toBeGreaterThanOrEqual(2);
      expect(focus.visible).toBe(true);
    }
  });
}


test("Strand accesible: contraste medido de controles y estados", async ({ page }) => {
  await page.goto(url);
  await page.getByRole("button", { name: "Probá un agente" }).click();
  const evidence = [];
  for (const selector of ["#agent-suggestions button", "#agent-form button", "#agent-close", "#agent-launch"]) {
    const control = page.locator(selector).first();
    for (const state of ["normal", "hover", "focus"]) {
      await page.mouse.move(0, 0);
      await control.evaluate((node) => node.blur());
      if (state === "hover") await control.hover();
      if (state === "focus") { await page.keyboard.press("Tab"); await control.focus(); }
      const contrast = await measuredContrast(control);
      evidence.push({ selector, state, ...contrast });
      expect(contrast.ratio, `${selector} ${state}: ${JSON.stringify(contrast)}`).toBeGreaterThanOrEqual(4.5);
      if (state === "focus") expect(contrast.focusRatio).toBeGreaterThanOrEqual(3);
    }
  }
  await demo(page).getByRole("button", { name: "Cerrar demo" }).click();
  for (const selector of [".header-contact", "#strand-navigation a", ".button-secondary", ".motion-toggle", ".story-index button", ".text-link", ".faq-items summary", ".email-link", ".version-link", ".client-credit a"]) {
    const control = page.locator(selector).first();
    for (const state of ["normal", "hover", "focus"]) {
      await page.mouse.move(0, 0);
      await control.evaluate((node) => node.blur());
      if (state === "hover") await control.hover();
      if (state === "focus") {
        await page.keyboard.press("Tab");
        await control.focus();
      }
      const contrast = await measuredContrast(control);
      evidence.push({ selector, state, ...contrast });
      expect(contrast.ratio, `${selector} ${state}: ${JSON.stringify(contrast)}`).toBeGreaterThanOrEqual(4.5);
      if (state === "focus") expect(contrast.focusRatio).toBeGreaterThanOrEqual(3);
    }
  }
  for (const control of await page.locator(".story-index button").all()) {
    await control.click();
    await expect(control).toHaveAttribute("aria-pressed", "true");
    const contrast = await measuredContrast(control);
    expect(contrast.ratio).toBeGreaterThanOrEqual(4.5);
    expect(contrast.borderRatio).toBeGreaterThanOrEqual(3);
    evidence.push({ selector: await control.getAttribute("aria-label"), state: "pressed", ...contrast });
  }
  console.log(JSON.stringify(evidence));
});

async function measuredContrast(locator) {
  return locator.evaluate((node) => {
    const rgb = (color) => color.match(/[\d.]+/g).map(Number);
    const composite = (front, back) => front.slice(0, 3).map((v, i) => v * (front[3] ?? 1) + back[i] * (1 - (front[3] ?? 1)));
    const luminance = (color) => color.slice(0, 3).map((v) => v / 255).map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
      .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
    const ratio = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);
    const backgrounds = (element) => {
      if (!element) return [[255, 255, 255]];
      const style = getComputedStyle(element);
      const color = rgb(style.backgroundColor);
      if ((color[3] ?? 1) === 1 && style.backgroundImage === "none") return [color];
      // Dynamic Canvas/image pixels cannot be claimed from CSS: use worst-case black/white bounds.
      const behind = element.querySelector(":scope > canvas, :scope > img, :scope > .story-particles")
        ? [[0, 0, 0], [255, 255, 255]] : backgrounds(element.parentElement);
      const base = behind.map((back) => composite(color, back));
      if (style.backgroundImage === "none") return base;
      if (!style.backgroundImage.includes("gradient")) return [[0, 0, 0], [255, 255, 255]];
      const stops = [...style.backgroundImage.matchAll(/rgba?\([^)]+\)/g)].map(([stop]) => rgb(stop));
      return base.flatMap((back) => [back, ...stops.map((stop) => composite(stop, back))]);
    };
    const style = getComputedStyle(node);
    const bg = backgrounds(node);
    const adjacent = backgrounds(node.parentElement);
    return {
      color: style.color, backgrounds: bg,
      ratio: Math.min(...bg.map((back) => ratio(composite(rgb(style.color), back), back))),
      focusRatio: Math.min(...(parseFloat(style.outlineOffset) < 0 ? bg : adjacent).map((back) => ratio(rgb(style.outlineColor), back))),
      borderRatio: Math.min(...bg.map((back) => ratio(rgb(style.borderTopColor), back))),
    };
  });
}


test("Strand accesible: lectura AX, skip-link y texto fuera de Canvas", async ({ page }) => {
  await page.goto(url);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Saltar al contenido", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contenido$/);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Conversemos sobre tu negocio", exact: true })).toBeFocused();
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.getByRole("banner")).toHaveCount(1);
  await expect(page.getByRole("contentinfo")).toHaveCount(1);
  await expect(page.getByRole("navigation")).toHaveCount(1);
  await expect(page.locator("canvas:not([aria-hidden='true'])")).toHaveCount(0);
  await page.getByRole("button", { name: "Probá un agente" }).click();
  await expect(demo(page).getByLabel("Tu pregunta (sin datos personales)")).toBeVisible();
  const snapshot = await page.locator("body").ariaSnapshot();
  for (const text of ["Hacé crecer tu negocio con IA", "Consulta: llega una pregunta", "Revisión humana: una persona", "Escenas del ejemplo", "Asistente de TYXX", "Tu pregunta (sin datos personales)", "Escribir por correo"]) expect(snapshot).toContain(text);
  console.log(snapshot);
  // Inventory visible editorial text independently from decorative, aria-hidden cards.
  const nodes = page.locator("h1, h2, h3, p, .eyebrow, .art-disclaimer, .principles-strip > span, .story-step li, .step-number");
  const results = [];
  for (const node of await nodes.all()) {
    if (!await node.evaluate((el) => el.checkVisibility() && !el.closest('[aria-hidden="true"]'))) continue;
    const result = await measuredContrast(node);
    const text = (await node.textContent()).trim().slice(0, 45);
    results.push({ text, ratio: result.ratio });
    expect(result.ratio, text).toBeGreaterThanOrEqual(4.5);
  }
  expect(results.length).toBeGreaterThan(40);
  console.log(JSON.stringify({ textContrast: results }));
});
