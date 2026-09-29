import { test, expect } from "@playwright/test";

for (const javaScriptEnabled of [true, false]) {
  test(`Novartech showcase keeps its own destination with JavaScript ${javaScriptEnabled}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled });
    try {
      const page = await context.newPage();
      await page.goto("http://127.0.0.1:4180/strand.html");
      const card = page.getByRole("link", { name: "Visitar Novartech (nueva pestaña)" });
      await expect(card).toHaveAttribute("href", "https://novar-tech.com/");
      await expect(card).toHaveAttribute("target", "_blank");
      await expect(card).toHaveAttribute("rel", "noopener noreferrer");
      await expect(card).not.toHaveAttribute("data-demo");
      await expect(card).toContainText("Hace varios años");
      await expect(card).toContainText("armazones y lentes");
      const cards = page.locator('#proyectos .client-site');
      await expect(cards).toHaveCount(2);
      await expect(cards.nth(0)).toHaveAttribute('href', 'https://novar-tech.com/');
      const vision = page.getByRole('link', { name: 'Visitar Vision Latina (nueva pestaña)' });
      await expect(cards.nth(1)).toHaveAttribute('href', 'https://www.myopialatam.com/');
      await expect(vision).toHaveAttribute('target', '_blank');
      await expect(vision).toHaveAttribute('rel', 'noopener noreferrer');
      await expect(vision).not.toHaveAttribute('data-demo');
      await expect(vision).toContainText('Congreso Latinoamericano de Miopía');
      await expect(page.locator('#proyectos .assistant-demo, #proyectos [data-agent-open]')).toHaveCount(0);
      await expect(page.locator(".client-preview img")).toHaveCount(0);
      await expect(page.getByRole("link", { name: /Tomás Desia · Developer/ })).toHaveAttribute("href", "https://novar-tech.com/#team");
      await expect(page.locator("#proyectos")).not.toContainText("Taller Norte");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    } finally {
      await context.close();
    }
  });
}
