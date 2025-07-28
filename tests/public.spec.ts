import { expect, test } from '@playwright/test';

test('view notice', async ({ page }) => {
  await page.goto('localhost:3000/');

  await page.getByTestId('zabo').first().click();

  await expect(page).toHaveURL(/localhost:3000\/..\/notice\/\d*/);

  await expect(page.getByTestId('notice-info')).toBeVisible();

  await expect(page.getByTestId('notice-title')).toBeVisible();

  await expect(page.getByTestId('notice-content')).toBeVisible();
});
