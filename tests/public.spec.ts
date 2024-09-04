import { expect, test } from '@playwright/test';

test('view notice', async ({ page }) => {
  await page.goto('localhost:3000/');

  await page.click('#zabo');

  await expect(page).toHaveURL(/localhost:3000\/..\/notice\/\d*/);

  await expect(page.locator('#notice-info')).toBeVisible();

  await expect(page.locator('#notice-title')).toBeVisible();

  await expect(page.locator('#notice-content')).toBeVisible();
});
