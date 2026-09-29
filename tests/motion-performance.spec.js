import { test, expect } from "@playwright/test";

async function recordCanvasWork(page) {
  await page.addInitScript(() => {
    const frames = new WeakMap();
    window.canvasWork = frames;
    const clear = CanvasRenderingContext2D.prototype.clearRect;
    const stroke = CanvasRenderingContext2D.prototype.stroke;
    CanvasRenderingContext2D.prototype.clearRect = function (...args) {
      const draws = (frames.get(this.canvas)?.draws ?? 0) + 1;
      frames.set(this.canvas, { strokes: 0, draws });
      return clear.apply(this, args);
    };
    CanvasRenderingContext2D.prototype.stroke = function (...args) {
      const frame = frames.get(this.canvas);
      if (frame) frame.strokes++;
      return stroke.apply(this, args);
    };
  });
}

// Count work at the browser's Canvas boundary, not elapsed time or private
// renderer state. A complete frame must remain below the same budget on CI.
test("Strand: cada figura conserva detalle con un presupuesto de trazos acotado", async ({
  page,
}) => {
  await recordCanvasWork(page);
  await page.goto("/strand.html");
  await page.evaluate(() => document.fonts.ready);
  for (const selector of [".hero-sculpture canvas", ".story-particles canvas"]) {
    const canvas = page.locator(selector);
    await expect.poll(() => canvas.evaluate(
      (element) => window.canvasWork.get(element)?.strokes ?? 0,
    )).toBeGreaterThan(0);
    const strokes = await canvas.evaluate(
      (element) => window.canvasWork.get(element).strokes,
    );
    console.log(JSON.stringify({ canvas: selector, strokesPerFrame: strokes }));
    expect(strokes, `${selector}: strokes per complete static frame`)
      .toBeLessThanOrEqual(64);
  }
});

for (const width of [1440, 390]) {
  test(`Strand: el robot conserva dos ojos, cabeza, torso y brazos a ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/strand.html");
    await page.evaluate(() => document.fonts.ready);
    const canvas = page.locator(".hero-sculpture canvas");
    const regions = await canvas.evaluate((element) => {
      const { width, height } = element;
      const pixels = element.getContext("2d")
        .getImageData(0, 0, width, height).data;
      // The figure's intended proportions, measured in its available box.
      // Return small regional aggregates, never transfer the full bitmap.
      const unit = Math.min(width * 0.83, height * 0.7);
      const meanAlpha = (x, y, halfWidth, halfHeight) => {
        const cx = width * 0.48 + x * unit;
        const cy = height * 0.47 + y * unit;
        let sum = 0;
        let count = 0;
        const top = Math.floor(cy - halfHeight * unit);
        const bottom = Math.floor(cy + halfHeight * unit);
        const left = Math.floor(cx - halfWidth * unit);
        const right = Math.floor(cx + halfWidth * unit);
        for (let py = top; py <= bottom; py++) {
          for (let px = left; px <= right; px++) {
            sum += pixels[(py * width + px) * 4 + 3];
            count++;
          }
        }
        return sum / count;
      };
      return {
        leftEye: meanAlpha(-0.1, -0.29, 0.013, 0.008),
        rightEye: meanAlpha(0.1, -0.29, 0.013, 0.008),
        eyeGap: meanAlpha(0, -0.29, 0.025, 0.015),
        head: meanAlpha(0, -0.44, 0.1, 0.025),
        torso: meanAlpha(-0.2, 0.17, 0.035, 0.08),
        leftArm: meanAlpha(-0.3, 0.1, 0.055, 0.16),
        rightArm: meanAlpha(0.3, 0.1, 0.055, 0.16),
      };
    });
    expect(regions.leftEye).toBeGreaterThan(100);
    expect(regions.rightEye).toBeGreaterThan(100);
    expect(regions.eyeGap).toBeLessThan(20);
    for (const part of ["head", "torso", "leftArm", "rightArm"]) {
      expect(regions[part], part).toBeGreaterThan(1);
    }
    await expect(canvas).toHaveAttribute("aria-hidden", "true");
  });
}

test("Strand: solo dibuja cuando el movimiento está permitido y la figura está visible", async ({
  page,
}) => {
  await recordCanvasWork(page);
  await page.clock.install();
  await page.goto("/strand.html");
  await page.evaluate(() => document.fonts.ready);
  const canvas = page.locator(".hero-sculpture canvas");
  const draws = () => canvas.evaluate(
    (element) => window.canvasWork.get(element)?.draws ?? 0,
  );
  const remainsStill = async () => {
    const before = await draws();
    await page.clock.runFor(200);
    expect(await draws()).toBe(before);
  };

  await page.clock.runFor(100);
  expect(await draws()).toBeGreaterThan(0);
  await remainsStill(); // Reduced motion is the harness default.
  await page.emulateMedia({ reducedMotion: "no-preference" });
  let before = await draws();
  await page.clock.runFor(200);
  expect(await draws()).toBeGreaterThan(before);
  const activeStrokes = await canvas.evaluate(
    (element) => window.canvasWork.get(element).strokes,
  );
  console.log(JSON.stringify({ activeHeroStrokes: activeStrokes }));
  expect(activeStrokes).toBeLessThanOrEqual(64);

  await page.getByRole("button", { name: "Pausar animación", exact: true }).click();
  await remainsStill();
  await page.getByRole("button", { name: "Reanudar animación", exact: true }).click();
  before = await draws();
  await page.clock.runFor(200);
  expect(await draws()).toBeGreaterThan(before);

  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
  });
  await page.clock.runFor(100);
  await remainsStill();
  await canvas.scrollIntoViewIfNeeded();
  before = await draws();
  await page.clock.runFor(200);
  expect(await draws()).toBeGreaterThan(before);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await remainsStill();
  await expect(page.getByRole("button", {
    name: "Reanudar animación",
    exact: true,
  })).toHaveAttribute("aria-pressed", "true");
});
