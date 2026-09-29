import { test, expect } from '@playwright/test';

const url = '/strand.html';
const panel = (page) => page.getByRole('region', { name: 'Asistente de TYXX' });
const transcript = (page) => page.getByRole('list', { name: 'Conversación simulada' });
const ask = async (page, question) => {
  await panel(page).getByLabel('Tu pregunta (sin datos personales)').fill(question);
  await panel(page).getByRole('button', { name: 'Preguntar' }).click();
};
const completedAsk = async (page, question) => { await ask(page, question); await page.clock.runFor(3000); };

test.beforeEach(async ({ page }, testInfo) => {
  if (!testInfo.title.includes('real-time')) {
    await page.clock.install();
    await page.clock.pauseAt(new Date('2035-01-01T00:00:00Z'));
  }
});

test('accepted question waits through 2999ms and replies at 3000ms', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  await ask(page, '¿Qué servicios ofrece TYXX?');
  await expect(transcript(page)).toContainText('Vos: ¿Qué servicios ofrece TYXX?');
  expect(await transcript(page).textContent()).not.toContain('Demo:');
  await page.clock.runFor(2999);
  expect(await transcript(page).textContent()).not.toContain('Demo:');
  await page.clock.runFor(1);
  await expect(transcript(page)).toContainText('automatizaciones e integraciones');
});

test('suggested question stays pending at 2999ms and rejects suggested and typed duplicates', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  const widget = panel(page);
  await widget.getByRole('button', { name: '¿Qué servicios ofrece TYXX?' }).click();
  await expect(widget.getByRole('status', { name: 'Estado de la respuesta' })).toBeVisible();
  await widget.getByRole('button', { name: '¿Cómo empezamos?' }).dispatchEvent('click');
  await widget.locator('#agent-form').dispatchEvent('submit');
  await expect(transcript(page).locator('li')).toHaveCount(1);
  await page.clock.runFor(2999);
  await expect(widget.getByRole('status', { name: 'Estado de la respuesta' })).toBeVisible();
  await expect(transcript(page)).toContainText('Vos: ¿Qué servicios ofrece TYXX?');
  expect(await transcript(page).textContent()).not.toContain('Demo:');
  await page.clock.runFor(1);
  await expect(transcript(page)).toContainText('automatizaciones e integraciones');
  await expect(transcript(page).locator('li')).toHaveCount(1);
  await page.clock.runFor(3000);
  await expect(transcript(page).locator('li')).toHaveCount(1);
});

test('invalid blank and 501-character questions reject immediately without scheduling replies', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  const widget = panel(page);
  for (const [question, message] of [['   ', 'Escribí una pregunta'], ['a'.repeat(501), '500 caracteres']]) {
    await ask(page, question);
    await expect(widget.getByRole('status')).toContainText(message);
    await expect(widget.locator('#agent-form')).not.toHaveAttribute('aria-busy', 'true');
    await expect(widget.getByRole('button', { name: 'Preguntar' })).not.toHaveAttribute('aria-disabled', 'true');
    await expect(widget.getByLabel('Tu pregunta (sin datos personales)')).not.toHaveAttribute('readonly');
    await expect(transcript(page).locator('li')).toHaveCount(0);
    await page.clock.runFor(3001);
    await expect(transcript(page).locator('li')).toHaveCount(0);
    await expect(widget.getByRole('status', { name: 'Estado de la respuesta' })).toBeHidden();
  }
});

test('reset halfway through A cancels its deadline without shortening B wait', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  const widget = panel(page);
  await ask(page, '¿Qué servicios ofrece TYXX?');
  await page.clock.runFor(1500);
  await widget.getByRole('button', { name: 'Reiniciar demo' }).click();
  await expect(transcript(page).locator('li')).toHaveCount(0);
  await expect(widget.locator('#agent-form')).toHaveAttribute('aria-busy', 'false');
  await expect(widget.getByLabel('Tu pregunta (sin datos personales)')).not.toHaveAttribute('aria-invalid');
  await expect(widget.getByLabel('Tu pregunta (sin datos personales)')).not.toHaveAttribute('readonly');
  await expect(widget.getByRole('status', { name: 'Estado de la respuesta' })).toBeHidden();
  await ask(page, '¿Cuánto cuesta una web?');
  await page.clock.runFor(1500);
  await expect(widget.getByRole('status', { name: 'Estado de la respuesta' })).toBeVisible();
  await expect(transcript(page).locator('li')).toHaveCount(1);
  await expect(transcript(page)).toContainText('Vos: ¿Cuánto cuesta una web?');
  expect(await transcript(page).textContent()).not.toContain('Demo:');
  await page.clock.runFor(1499);
  await expect(widget.getByRole('status', { name: 'Estado de la respuesta' })).toBeVisible();
  expect(await transcript(page).textContent()).not.toContain('Demo:');
  await page.clock.runFor(1);
  await expect(transcript(page)).toContainText('presupuesto se prepara a medida');
  await expect(transcript(page)).not.toContainText('automatizaciones e integraciones');
  await expect(transcript(page).locator('li')).toHaveCount(1);
});

test('real-time accepted reply takes at least 3000ms', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  const started = await page.evaluate(() => performance.now());
  await ask(page, '¿Qué servicios ofrece TYXX?');
  await expect(transcript(page)).toContainText('automatizaciones e integraciones');
  const elapsed = await page.evaluate((start) => performance.now() - start, started);
  console.log(`Real-time accepted-to-reply observed: ${elapsed.toFixed(1)}ms`);
  expect(elapsed).toBeGreaterThanOrEqual(3000);
});

test('pending question blocks duplicates and reset cancels stale reply', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  await ask(page, '¿Qué servicios ofrece TYXX?');
  await expect(panel(page).getByRole('status', { name: 'Estado de la respuesta' })).toBeVisible();
  await expect(panel(page).locator('#agent-form')).toHaveAttribute('aria-busy', 'true');
  await expect(panel(page).getByRole('button', { name: 'Preguntar' })).toHaveAttribute('aria-disabled', 'true');
  await panel(page).locator('#agent-form').dispatchEvent('submit');
  await panel(page).getByRole('button', { name: '¿Cómo empezamos?' }).dispatchEvent('click');
  await expect(transcript(page).locator('li')).toHaveCount(1);
  await panel(page).getByRole('button', { name: 'Reiniciar demo' }).click();
  await ask(page, '¿Cuánto cuesta una web?');
  await page.clock.runFor(2999);
  expect(await transcript(page).textContent()).not.toContain('Demo:');
  await page.clock.runFor(1);
  await expect(transcript(page)).toContainText('presupuesto se prepara a medida');
  await expect(transcript(page)).not.toContainText('automatizaciones e integraciones');
});

test('hidden completion never reopens or steals focus; mobile status remains visible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto(url);
  const launch = page.getByRole('button', { name: 'Probá un agente' });
  await launch.click();
  await ask(page, '¿Cómo empezamos?');
  await expect(panel(page).getByRole('status', { name: 'Estado de la respuesta' })).toBeInViewport();
  await page.screenshot({ path: 'test-results/agent-demo-mobile-preparing.png' });
  await panel(page).getByRole('button', { name: 'Cerrar demo' }).click();
  await page.clock.runFor(3000);
  await expect(panel(page)).toBeHidden();
  await expect(launch).toBeFocused();
  await launch.click();
  await expect(transcript(page)).toContainText('propuesta por proyecto');
  await ask(page, '¿Cuánto cuesta una web?');
  await panel(page).getByRole('link', { name: 'Conversar con TYXX' }).click();
  await page.clock.runFor(3000);
  await expect(panel(page)).toBeHidden();
  await expect(page).toHaveURL(/#contacto$/);
  await launch.click();
  await expect(transcript(page)).toContainText('presupuesto se prepara a medida');
});

 test('TYXX questions cover services, process, cost, timing, combined intent and client experience', async ({ page }) => {
  await page.goto(url);
  await expect(panel(page)).toBeHidden();
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  await expect(panel(page)).toContainText('Simulación local con respuestas orientativas, sin IA real');
  await expect(page.locator('#agent-business')).toHaveCount(0);
  await panel(page).getByRole('button', { name: '¿Qué servicios ofrece TYXX?' }).click();
  await page.clock.runFor(3000);
  await expect(transcript(page).locator('li').last()).toContainText('automatizaciones e integraciones');
  await completedAsk(page, '¿Cómo empezamos a trabajar juntos?');
  await expect(transcript(page).locator('li').last()).toContainText('propuesta por proyecto');
  await completedAsk(page, '¿Cuánto cuesta una web?');
  await expect(transcript(page).locator('li').last()).toContainText('presupuesto se prepara a medida');
  await expect(transcript(page).locator('li').last()).not.toContainText('TYXX trabaja en sitios web');
  await completedAsk(page, '¿Cuánto tarda un agente?');
  await expect(transcript(page).locator('li').last()).toContainText('plazo depende del alcance');
  await completedAsk(page, '¿Cuánto cuesta y cuánto tarda una página web?');
  await expect(transcript(page).locator('li').last()).toContainText('presupuesto se prepara a medida');
  await expect(transcript(page).locator('li').last()).toContainText('plazo depende del alcance');
  await completedAsk(page, '¿Qué proyectos hicieron con Novartech?');
  await expect(transcript(page).locator('li').last()).toContainText('visión por computadora');
  await expect(transcript(page).locator('li').last()).toContainText('no atribuye a TYXX la autoría de todo el sitio');
  await completedAsk(page, '¿Ofrecen mantenimiento?');
  await expect(transcript(page).locator('li').last()).toContainText('opcional');
  await completedAsk(page, '¿Cómo los contacto?');
  await expect(transcript(page).locator('li').last()).toContainText('tyxxsolve@gmail.com');
  for (const question of ['¿Cómo puede ayudar la IA a mi negocio?', '¿Cómo seguir oportunidades con IA?']) {
    await completedAsk(page, question);
    await expect(transcript(page).locator('li').last()).toContainText('dar seguimiento a oportunidades');
    await expect(transcript(page).locator('li').last()).toContainText('no se garantizan ventas ni ahorros');
  }
  await completedAsk(page, '¿La IA garantiza más ventas?');
  await expect(transcript(page).locator('li').last()).toContainText('No se pueden garantizar ventas');
});

test('every shipped suggestion gives its relevant TYXX answer', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  const suggestions = [
    ['¿Qué servicios ofrece TYXX?', 'automatizaciones e integraciones'],
    ['¿Cómo puede ayudar la IA a mi negocio?', 'dar seguimiento a oportunidades'],
    ['¿Cuánto cuesta un proyecto de IA?', 'presupuesto se prepara a medida'],
    ['¿Cómo empezamos?', 'propuesta por proyecto'],
    ['¿En qué proyectos trabajaron?', 'Novartech es cliente de TYXX'],
  ];
  await expect(panel(page).locator('#agent-suggestions button')).toHaveCount(suggestions.length);
  for (const [question, expected] of suggestions) {
    await panel(page).getByRole('button', { name: question, exact: true }).click();
    await page.clock.runFor(3000);
    await expect(transcript(page).locator('li').last()).toContainText(expected);
  }
});

test('Vision Latina and MYOPIALATAM queries report the supported website without optical roleplay', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  for (const question of ['¿Qué hicieron para Vision Latina?', '¿Qué es MYOPIALATAM?', '¿Qué proyectos hicieron?']) {
    await completedAsk(page, question);
    const reply = transcript(page).locator('li').last();
    await expect(reply).toContainText('Vision Latina también es cliente');
    await expect(reply).toContainText('https://www.myopialatam.com/');
    await expect(reply).toContainText('Congreso Latinoamericano de Miopía');
    await expect(reply).toContainText('no es un caso de IA');
    await expect(reply).not.toContainText('turnos de óptica');
  }
});

test('project experience wording does not turn a prospective project into a client case', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  for (const question of ['¿Qué proyectos hicieron?', '¿En qué proyectos trabajaron?']) {
    await completedAsk(page, question);
    await expect(transcript(page).locator('li').last()).toContainText('Novartech es cliente de TYXX');
  }
  await completedAsk(page, 'Quiero empezar un proyecto con TYXX');
  await expect(transcript(page).locator('li').last()).toContainText('propuesta por proyecto');
  await expect(transcript(page).locator('li').last()).not.toContainText('Novartech es cliente');
  await completedAsk(page, 'Tengo una duda sobre mi proyecto');
  await expect(transcript(page).locator('li').last()).toContainText('¿Qué necesidad concreta de tu negocio querés evaluar?');
  await expect(transcript(page).locator('li').last()).not.toContainText('Novartech es cliente');
});

test('unknown and unrelated words do not trigger artificial answers', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  for (const question of ['¿Qué pronóstico hay mañana?', '¿Cuál es la historia de Nigeria?']) {
    await completedAsk(page, question);
    await expect(transcript(page).locator('li').last()).toContainText('¿Qué necesidad concreta de tu negocio querés evaluar?');
    await expect(transcript(page).locator('li').last()).toContainText('Contacto');
  }
});

test('validation, XSS as text, memory cap, reset and reload', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  await panel(page).getByRole('button', { name: 'Preguntar' }).click();
  await expect(panel(page).getByRole('status')).toContainText('Escribí una pregunta');
  await completedAsk(page, 'a'.repeat(501));
  await expect(panel(page).getByRole('status')).toContainText('500 caracteres');
  const payload = '<img src=x onerror=alert(1)> pregunta';
  await completedAsk(page, payload);
  await expect(transcript(page)).toContainText(payload);
  await expect(transcript(page)).toContainText('No tengo información confirmada');
  await expect(transcript(page).locator('img')).toHaveCount(0);
  for (let i = 0; i < 10; i++) await completedAsk(page, `pregunta desconocida ${i}`);
  await expect(transcript(page).locator('li')).toHaveCount(8);
  await panel(page).getByRole('button', { name: 'Reiniciar demo' }).click();
  await expect(transcript(page).locator('li')).toHaveCount(0);
  await completedAsk(page, '¿Hay mantenimiento?');
  await page.reload();
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  await expect(transcript(page).locator('li')).toHaveCount(0);
});

test('close, Escape, focus and no outbound chat requests or storage', async ({ page }) => {
  const outgoing = [];
  page.on('request', request => outgoing.push([request.url(), request.method(), request.postData()]));
  await page.goto(url);
  const launch = page.getByRole('button', { name: 'Probá un agente' });
  await launch.focus();
  await page.keyboard.press('Enter');
  await completedAsk(page, 'SAMPLE-PRIVATE-123 ¿qué servicios ofrecen?');
  await page.keyboard.press('Escape');
  await expect(launch).toBeFocused();
  await expect(panel(page)).toBeHidden();
  await launch.click();
  await expect(transcript(page)).toContainText('SAMPLE-PRIVATE-123');
  await panel(page).getByRole('button', { name: 'Cerrar demo' }).click();
  await expect(launch).toBeFocused();
  expect(outgoing.every(([address, method, body]) => new URL(address).origin === 'http://127.0.0.1:4180' && method === 'GET' && body === null)).toBe(true);
  expect(outgoing.some(([address]) => address.includes('SAMPLE-PRIVATE'))).toBe(false);
  expect(await page.evaluate(() => Object.keys(localStorage).length + Object.keys(sessionStorage).length)).toBe(0);
});

for (const width of [360, 768]) {
  test(`panel fits ${width}px and doubled text`, async ({ page }) => {
    await page.setViewportSize({ width, height: 530 });
    await page.goto(url);
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    await page.getByRole('button', { name: 'Probá un agente' }).click();
    const bounds = await panel(page).boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    expect(bounds.y).toBeGreaterThanOrEqual(0);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(530);
    await expect(panel(page).getByRole('button', { name: 'Cerrar demo' })).toBeVisible();
  });
}

for (const failure of ['disabled', 'blocked']) {
  test(`static fallback with script ${failure}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: failure !== 'disabled' });
    const page = await context.newPage();
    if (failure === 'blocked') await page.route('**/agent-demo.js', route => route.abort());
    await page.goto('http://127.0.0.1:4180/strand.html');
    await expect(page.locator('.assistant-demo, [data-agent-open]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Probá un agente' })).toBeHidden();
    await expect(page.locator('.header-contact')).toHaveAttribute('href', '#contacto');
    await expect(page.getByRole('link', { name: 'tyxxsolve@gmail.com', exact: true })).toHaveAttribute('href', 'mailto:tyxxsolve@gmail.com');
    await context.close();
  });
}

test('suggestion keyboard focus persists across turns and screenshots document responsive popup', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 700 : 900 });
    await page.goto(url);
    await page.getByRole('button', { name: 'Probá un agente' }).click();
    const suggestion = panel(page).getByRole('button', { name: '¿Qué servicios ofrece TYXX?' });
    await suggestion.focus();
    await page.keyboard.press('Enter');
    await page.clock.runFor(3000);
    await expect(suggestion).toBeFocused();
    await expect(transcript(page)).toContainText('automatizaciones e integraciones');
    await page.screenshot({ path: `test-results/agent-demo-${width}.png` });
    if (width === 1440) {
      await panel(page).getByRole('button', { name: 'Cerrar demo' }).click();
      await page.locator('#proyectos').scrollIntoViewIfNeeded();
      await page.locator('#proyectos').screenshot({ path: 'test-results/agent-demo-two-clients.png' });
    }
  }
});

test('contact handoff closes popup before navigating without exporting conversation', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('button', { name: 'Probá un agente' }).click();
  await completedAsk(page, '¿Cuánto cuesta una web?');
  await panel(page).getByRole('link', { name: 'Conversar con TYXX' }).click();
  await expect(page).toHaveURL(/#contacto$/);
  await expect(panel(page)).toBeHidden();
  await expect(page.getByRole('button', { name: 'Probá un agente' })).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#contacto')).toBeInViewport();
  await expect(page.locator('#contacto [data-contact]')).not.toHaveAttribute('href', /presupuesto/i);
});

test('legacy process-sheet assistant is absent only on Strand', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('#asistente, #assistant-disclosure')).toHaveCount(0);
  await page.goto('/index.html#asistente');
  await expect(page.locator('#assistant-disclosure')).toHaveCount(1);
});
