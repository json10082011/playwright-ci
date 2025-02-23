import { test, expect } from '@playwright/test';

test('Check Playwright homepage', async ({ page }) => {
    await page.goto('https://facebook.com/');
    await expect(page).toHaveTitle(/Facebooks/);
});
