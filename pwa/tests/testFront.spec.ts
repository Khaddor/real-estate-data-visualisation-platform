import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true
});

test('test barchart', async ({ page }) => {
  await page.goto('https://localhost/views');
  await page.getByRole('button', { name: 'Bar Chart' }).click();
  await page.locator('#intervalle').selectOption('mois');
});