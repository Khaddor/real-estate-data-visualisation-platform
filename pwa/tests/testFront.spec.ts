import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true
});

test('test barchart', async ({ page }) => {
  await page.goto('https://localhost/views');
  await page.getByRole('button', { name: 'Bar Chart' }).click();
  await page.locator('#intervalle').selectOption('mois');
});

test('test barchart date input', async ({ page }) => {
    await page.goto('https://localhost/views');
    await page.getByRole('button', { name: 'Bar Chart' }).click();
    await page.locator('#DateEnd').fill('2019-01-10');
  });