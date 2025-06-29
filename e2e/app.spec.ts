import { test, expect } from '@playwright/test';

test.describe('DummyShop E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should redirect to login when not authenticated', async ({ page }) => {
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toContainText('Login to DummyShop');
  });

  test('should login and navigate to products', async ({ page }) => {
    await expect(page).toHaveURL('/login');

    await page.fill('input[formControlName="username"]', 'emilys');
    await page.fill('input[formControlName="password"]', 'emilyspass');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/products');
    await expect(page.locator('main h1')).toContainText('Our Products');
  });

  test('should display product list after login', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[formControlName="username"]', 'emilys');
    await page.fill('input[formControlName="password"]', 'emilyspass');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/products');
    
    await page.waitForSelector('text=Loading products...', { state: 'detached', timeout: 15000 });
    
    await page.waitForSelector('.grid.grid-cols-1', { timeout: 10000 });

    const productCards = page.locator('.bg-white.rounded-lg.shadow-md');
    await expect(productCards.first()).toBeVisible();
    
    await expect(productCards.first().locator('h3')).toBeVisible();
    await expect(productCards.first().locator('img')).toBeVisible();
    await expect(productCards.first().locator('span:has-text("$")')).toBeVisible();
    await expect(productCards.first().locator('button').first()).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[formControlName="username"]', 'emilys');
    await page.fill('input[formControlName="password"]', 'emilyspass');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/products');

    await page.click('header button:has(svg)');
    
    await page.waitForSelector('button:has-text("Logout")', { timeout: 5000 });
    await page.click('button:has-text("Logout")');

    await expect(page).toHaveURL('/login');
  });
}); 