import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

test('login with IdP', async ({ page }) => {
  await page.goto('localhost:3000/en');

  await page.click('text=Login');

  await page.getByPlaceholder('Email').fill('test@gm.gist.ac.kr');
  await page
    .getByPlaceholder('Password')
    .fill(process.env.TEST_IDP_PASSWORD || 'test');

  await page.getByText('Login').click();

  await page.getByText('Agree').click();

  await page.waitForURL(/localhost:3000/);

  await expect(page).toHaveURL(/localhost:3000/);
});
