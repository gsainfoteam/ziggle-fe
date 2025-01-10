import { expect, Page, test } from '@playwright/test';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('User-only actions', () => {
  test('write a notice', async ({ page }, testInfo) => {
    await page.goto('localhost:3000/en');

    await page.getByText('Write Notice').click();

    await expect(page).toHaveURL(/localhost:3000\/en\/write/);

    await page.getByTestId('write-has-english-version-toggle').check();

    await page.getByTestId('write-type-general').click();

    await page
      .getByTestId('write-title-input')
      .fill('Test Notice Korean Title: ' + testInfo.project.name);

    await page.getByTitle('Rich Text Area').click();

    await page.keyboard.type('Test Notice Korean Content');

    await page.getByTestId('write-english-version-toggle').click();

    await page
      .getByTestId('write-title-input')
      .fill('Test Notice English Title');

    await page.getByTitle('Rich Text Area').click();

    await page.keyboard.type('Test Notice English Content');

    await page.getByTestId('write-tag-input').click();

    await page.keyboard.type('test_tag_1');
    await page.keyboard.press('Space');

    await page.keyboard.type('test_tag_2');
    await page.keyboard.press('Enter');

    await page.getByTestId('write-submit-button').click();

    await page.getByText('Confirm').click();

    // await 3 seconds for the notice to be written
    await page.waitForTimeout(3000);

    await expect(page).toHaveURL(/localhost:3000\/en\/notice/);
  });
});
