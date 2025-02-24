// playwright_basic_advanced.spec.ts
import { test, expect } from '@playwright/test';

// =========================
// Basic Test: OrangeHRM Login
// =========================
test('Login to OrangeHRM', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
});

// =========================
// Advanced Test: File Upload
// =========================
test('File upload on Herokuapp', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    const filePath = 'example.txt'; // Ensure this file is in your root folder
    await page.setInputFiles('input[type="file"]', filePath);
    await page.click('input[type="submit"]');
    await expect(page.getByText('File Uploaded!')).toBeVisible();
});

// =========================
// Advanced Test: Drag and Drop
// =========================
test('Drag and drop on Herokuapp', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    const source = await page.locator('#column-a');
    const target = await page.locator('#column-b');
    await source.dragTo(target);
    await expect(source).toHaveText('B');
});

// =========================
// Advanced Test: Handling Pop-ups
// =========================
test('Handle pop-up for jsAlert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('I am a JS Alert');
        await dialog.accept();
    });
    await page.click('button[onclick="jsAlert()"]');
    await expect(page.getByText('You successfully clicked an alert')).toBeVisible();
});

test('Handle pop-up jsConfirm', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('I am a JS Confirm');
        await dialog.accept();
    });
    await page.click('button[onclick="jsConfirm()"]');
    await expect(page.getByText('You clicked: Ok')).toBeVisible();
});

test('Handle pop-up jsPrompt', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('I am a JS prompt');
        await dialog.accept('Hello Playwright');
    });
    await page.click('button[onclick="jsPrompt()"]');
    await expect(page.getByText(/Hello Playwright/)).toBeVisible();
});


// =========================
// Advanced Test: Hidden Elements
// =========================
test('Interact with hidden elements', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    await page.click('#start button');
    await page.waitForSelector('#finish', { state: 'visible' });
    await expect(page.getByText('Hello World!')).toBeVisible();
});