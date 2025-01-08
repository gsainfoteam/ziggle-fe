import { expect, Page, test } from '@playwright/test';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('User-only actions', () => {
  test('write a notice', async ({ page }) => {
    // await login(page);

    await page.goto('localhost:3000/en');

    await page.getByText('Write Notice').click();

    await expect(page).toHaveURL(/localhost:3000\/en\/write/);

    await page.getByLabel('Write English Notice too').check();

    await page.getByText('General').click();

    await page
      .getByPlaceholder('Enter a title here')
      .fill('Test Notice Korean Title');

    await page.locator('#tinymce').fill('Test Notice Korean Content');

    await page.getByText('English').click();

    await page
      .getByPlaceholder('Enter a title here')
      .fill('Test Notice English Title');

    await page.locator('#tinymce').fill('Test Notice English Content');
    await page.getByPlaceholder('Enter tags').click();

    await page.keyboard.type('test_tag_1');
    await page.keyboard.press('Space');

    await page.keyboard.type('test_tag_2');
    await page.keyboard.press('Enter');

    await page.getByText('Submit Notice').click();

    await page.getByText('Confirm').click();
  });

  test('view user profile', async ({ page }) => {
    // await login(page);

    await page.goto('localhost:3000/en');

    await page.locator('#my-page').click();

    await expect(page).toHaveURL(/localhost:3000\/en\/mypage/);

    await expect(page.locator('text=Profile')).toBeVisible();
  });
});
