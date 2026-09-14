import { test, expect } from "@playwright/test";

test("señala una descripción manual que todavía menciona una herramienta corregida y permite revisarla", async ({
  page,
}) => {
  await page.goto("/#asistente");
  await reply(
    page,
    "Proceso: Copio pedidos en Excel.\nHerramientas: Excel\nDificultad: Cometo errores.",
  );
  await editField(page, "Herramientas mencionadas", "Papel");
  await expect(sheet(page)).toContainText("Revisar proceso actual");
  await expect(sheet(page)).toContainText("Pendiente de evaluar con Tomás");
  await editField(page, "Proceso actual", "Copio los pedidos en papel.");
  await expect(sheet(page)).not.toContainText("Revisar proceso actual");
  await expect(sheet(page)).not.toContainText("Excel");
});

test("conserva las continuaciones de campos etiquetados con acentos, saltos y puntuación", async ({
  page,
}) => {
  await page.goto("/#asistente");
  await reply(
    page,
    'Proceso: registro pedidos.\nLos agrupo por cliente; reviso las cantidades.\nDificultad: pierdo tiempo\nBusco "códigos" & <referencias>.',
  );
  await sheet(page)
    .getByRole("button", { name: "Editar Proceso actual", exact: true })
    .click();
  await expect(
    sheet(page).getByLabel("Proceso actual", { exact: true }),
  ).toHaveValue(
    "registro pedidos.\nLos agrupo por cliente; reviso las cantidades.",
  );
  await sheet(page)
    .getByRole("button", { name: "Editar Dificultad descrita", exact: true })
    .click();
  await expect(
    sheet(page).getByLabel("Dificultad descrita", { exact: true }),
  ).toHaveValue('pierdo tiempo\nBusco "códigos" & <referencias>.');
});

test("al editar herramientas y frecuencia no deja esos datos anteriores dentro del proceso", async ({
  page,
}) => {
  await page.goto("/#asistente");
  await reply(page, "Copio pedidos de WhatsApp a Excel todos los días.");
  await reply(page, "Cometo errores al copiar.");
  await editField(page, "Herramientas mencionadas", "Papel y lápiz");
  await editField(page, "Frecuencia informada", "Cada mes");
  await expect(sheet(page)).not.toContainText("WhatsApp");
  await expect(sheet(page)).not.toContainText("Excel");
  await expect(sheet(page)).not.toContainText("todos los días");
  await expect(sheet(page)).toContainText("Copio pedidos");
});

test("permite omitir el proceso desde la primera pregunta sin repetirla", async ({
  page,
}) => {
  await page.goto("/#asistente");
  await page
    .getByRole("button", { name: "Dejar este dato pendiente", exact: true })
    .click();
  await expect(
    page.getByText("¿Qué dificultad encontrás al hacer esa tarea?", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(sheet(page)).toContainText("Proceso por conocer");
  await expect(sheet(page)).toContainText("Ficha incompleta");
});

async function reply(page, message) {
  await page.getByLabel("Tu respuesta", { exact: true }).fill(message);
  await page
    .getByRole("button", { name: "Agregar respuesta", exact: true })
    .click();
}

function sheet(page) {
  return page.getByRole("region", { name: "Ficha de proceso", exact: true });
}

test("reconoce cuatro datos afirmativos juntos sin volver a preguntarlos", async ({
  page,
}) => {
  await page.goto("/#asistente");
  await reply(
    page,
    "Copio pedidos de WhatsApp a Excel todos los días y cometo errores al copiar.",
  );
  await expect(sheet(page)).toContainText("Base para conversar");
  await expect(sheet(page)).toContainText("cometo errores al copiar.");
  await expect(sheet(page)).toContainText("WhatsApp, Excel");
  await expect(
    page.getByRole("button", { name: "Agregar respuesta", exact: true }),
  ).toBeHidden();
});

test("conserva un caso abierto como texto y admite la vía manual sin inventar una mejora", async ({
  page,
}) => {
  await page.goto("/#asistente");
  const original =
    "Quiero mejorar todo.\n<script>window.intrusion = true</script>\nÁrbol & gestión <equipo>";
  await reply(page, original);
  await expect(
    page.getByRole("list", { name: "Respuestas de la conversación" }),
  ).toContainText(original);
  await expect(
    page.getByText("¿Qué tarea concreta hacés hoy, paso a paso?", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(sheet(page)).toContainText("Ficha incompleta");
  await expect(sheet(page)).toContainText("Pendiente de evaluar con Tomás");
  await editField(
    page,
    "Proceso actual",
    'Organizo guardias.\n<equipo> & "turnos"',
  );
  await reply(page, "Se superponen los horarios.");
  await editField(page, "Herramientas mencionadas", "Papel y lápiz");
  await reply(page, "Uso Excel todos los días.");
  await expect(sheet(page)).toContainText("Papel y lápiz");
  await expect(sheet(page)).not.toContainText("Herramientas por conocer");
  await expect(sheet(page)).toContainText(
    'Organizo guardias.\n<equipo> & "turnos"',
  );
  await expect(sheet(page)).toContainText("Pendiente de evaluar con Tomás");
  expect(await page.evaluate(() => window.intrusion)).toBeUndefined();
  await expect(page.locator("equipo")).toHaveCount(0);
});

test("un fallo de interpretación conserva el texto y permite completar la ficha manualmente", async ({
  page,
}) => {
  await page.route("**/assistant-simulator.js", (route) =>
    route.fulfill({
      contentType: "text/javascript",
      body: 'export function simulateTurn() { return { facts: { invented: "no" }, unknowns: [], suggestion: null }; }',
    }),
  );
  await page.goto("/#asistente");
  await reply(page, "Copio pedidos a Excel.");
  await expect(page.getByLabel("Tu respuesta", { exact: true })).toHaveValue(
    "Copio pedidos a Excel.",
  );
  await expect(
    page
      .getByRole("list", { name: "Respuestas de la conversación" })
      .getByRole("listitem"),
  ).toHaveCount(0);
  await expect(
    page.getByLabel("Tu respuesta", { exact: true }),
  ).toHaveAttribute("aria-invalid", "true");
  await editField(page, "Proceso actual", "Copio pedidos a Excel.");
  await editField(page, "Dificultad descrita", "Cometo errores.");
  await expect(sheet(page)).toContainText("Base para conversar");
  await expect(sheet(page)).toContainText("Pendiente de evaluar con Tomás");
});

async function editField(page, label, value) {
  await sheet(page)
    .getByRole("button", { name: `Editar ${label}`, exact: true })
    .click();
  await sheet(page).getByLabel(label, { exact: true }).fill(value);
  await sheet(page)
    .getByRole("button", { name: `Guardar ${label}`, exact: true })
    .click();
}

test("corrige una respuesta, conserva ediciones y retira una mejora incompatible", async ({
  page,
}) => {
  await page.goto("/#asistente");
  await reply(page, "Copio pedidos de WhatsApp a Excel todos los días.");
  await reply(page, "Cometo errores al copiar.");
  await page
    .getByRole("button", { name: "Corregir respuesta 1", exact: true })
    .click();
  await page
    .getByLabel("Corregir respuesta 1", { exact: true })
    .fill("Copio pedidos a una planilla cada semana.");
  await page
    .getByRole("button", { name: "Guardar respuesta 1", exact: true })
    .click();
  await expect(sheet(page)).not.toContainText("Excel");
  await expect(sheet(page)).toContainText("cada semana");
  await editField(page, "Herramientas mencionadas", "Papel y lápiz");
  await editField(page, "Frecuencia informada", "");
  await editField(
    page,
    "Proceso actual",
    "Coordino las guardias de un equipo.",
  );
  await expect(sheet(page)).not.toContainText("pasar los pedidos");
  await expect(sheet(page)).toContainText("Pendiente de evaluar con Tomás");
  await editField(
    page,
    "Mejora propuesta",
    "Revisar juntos la distribución de las guardias.",
  );
  await editField(page, "Dificultad descrita", "Se superponen horarios.");
  await expect(sheet(page)).toContainText(
    "Revisar juntos la distribución de las guardias.",
  );
  await expect(sheet(page)).toContainText("Revisar la mejora editada");
  await editField(
    page,
    "Aspectos pendientes",
    "Conversar con quien organiza los turnos.",
  );
  await expect(sheet(page)).toContainText(
    "Conversar con quien organiza los turnos.",
  );
  await expect(sheet(page)).toContainText("Revisar la mejora editada");
  await page
    .getByRole("button", { name: "Corregir respuesta 2", exact: true })
    .click();
  await page
    .getByLabel("Corregir respuesta 2", { exact: true })
    .fill("Faltan personas los martes.");
  await page
    .getByRole("button", { name: "Guardar respuesta 2", exact: true })
    .click();
  await expect(sheet(page)).toContainText("Faltan personas los martes.");
  await expect(sheet(page)).toContainText("Papel y lápiz");
  await expect(sheet(page)).toContainText(
    "Coordino las guardias de un equipo.",
  );
  await editField(page, "Mejora propuesta", "");
  await editField(page, "Proceso actual", "Copio pedidos a una planilla.");
  await editField(page, "Dificultad descrita", "Cometo errores al copiar.");
  await expect(sheet(page)).toContainText("Pendiente de evaluar con Tomás");
});

test("aprovecha herramientas y frecuencia claras y permite dejarlas pendientes", async ({
  page,
}) => {
  await page.goto("/#asistente");
  await reply(page, "Copio pedidos de WhatsApp a Excel todos los días.");
  await expect(sheet(page)).toContainText("WhatsApp, Excel");
  await expect(sheet(page)).toContainText("todos los días");
  await expect(
    page.getByText("¿Qué dificultad encontrás al hacer esa tarea?", {
      exact: true,
    }),
  ).toBeVisible();
  await reply(page, "Cometo errores al copiar.");
  await expect(sheet(page)).toContainText("Podría evaluarse");
  await expect(
    page.getByText("¿Qué herramientas usás para esa tarea?", { exact: true }),
  ).toHaveCount(0);
  await page.reload();
  await page
    .getByRole("button", {
      name: "Me llegan consultas incompletas",
      exact: true,
    })
    .click();
  await expect(sheet(page)).toContainText("Base para conversar");
  await reply(page, "No lo sé");
  await expect(
    page.getByText("¿Con qué frecuencia hacés esa tarea?", { exact: true }),
  ).toBeVisible();
  await reply(page, "No sé");
  await expect(sheet(page)).toContainText("Herramientas por conocer");
  await expect(sheet(page)).toContainText("Frecuencia por conocer");
  await expect(
    page.getByRole("button", { name: "Agregar respuesta", exact: true }),
  ).toBeHidden();
  await page.reload();
  await page
    .getByRole("button", {
      name: "Pierdo tiempo buscando información",
      exact: true,
    })
    .click();
  await expect(sheet(page)).toContainText("Base para conversar");
  await expect(sheet(page)).toContainText("organizar");
});

test("describe un proceso desde la portada y completa una ficha sin exigir datos personales", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Contame qué proceso querés mejorar" })
    .click();
  const assistant = page.getByRole("region", {
    name: "Asistente de TYXX",
    exact: true,
  });
  await expect(assistant).toBeVisible();
  await expect(assistant).toContainText("funciona con reglas, no con IA real");
  await assistant
    .getByRole("button", { name: "Copio pedidos a una planilla", exact: true })
    .click();
  const sheet = page.getByRole("region", {
    name: "Ficha de proceso",
    exact: true,
  });
  await expect(sheet).toContainText("Copio pedidos");
  await expect(
    page.getByRole("list", { name: "Respuestas de la conversación" }),
  ).toContainText("Copio pedidos a una planilla");
  await expect(
    assistant.getByText("¿Qué dificultad encontrás al hacer esa tarea?", {
      exact: true,
    }),
  ).toBeVisible();
  await assistant
    .getByLabel("Tu respuesta", { exact: true })
    .fill("Cometo errores al copiar los pedidos.");
  await assistant
    .getByRole("button", { name: "Agregar respuesta", exact: true })
    .click();
  await expect(sheet).toContainText("Cometo errores al copiar los pedidos.");
  await expect(sheet).toContainText("Base para conversar");
  await expect(sheet).toContainText("Todavía no informado");
});
