import { expect, test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

import dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

setup('authenticate', async ({ page }) => {
  await page.goto('http://localhost:3000/en');

  await page.click('text=Login');

  await page.getByPlaceholder('Email').fill('test@gm.gist.ac.kr');
  await page
    .getByPlaceholder('Password')
    .fill(process.env.TEST_IDP_PASSWORD || 'test');

  await page.getByText('Login').click();

  await page.getByText('Agree').click();

  await page.waitForURL(/localhost:3000/);

  await page.context().storageState({ path: authFile });
});
