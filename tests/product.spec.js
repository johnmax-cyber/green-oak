const { test, expect } = require('@playwright/test');

test.describe('Product Page', () => {
  test('loads with no product ID shows error state', async ({ page }) => {
    await page.goto('/product.html');
    await expect(page.locator('#error-state')).toBeVisible({ timeout: 10000 });
  });

  test('error state shows back to sales link', async ({ page }) => {
    await page.goto('/product.html');
    await expect(page.locator('#error-state')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#error-state a')).toHaveAttribute('href', 'sales.html');
  });

  test('error state shows product not found message', async ({ page }) => {
    await page.goto('/product.html');
    await expect(page.locator('#error-state')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#error-state h3')).toContainText('Product Not Found');
  });

  test('has navigation with logo', async ({ page }) => {
    await page.goto('/product.html');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('nav a:has-text("GreenOak")')).toBeVisible();
  });

  test('has back to sales link', async ({ page }) => {
    await page.goto('/product.html');
    await expect(page.locator('a:has-text("Back to Sales")')).toHaveAttribute('href', 'sales.html');
  });

  test('displays footer', async ({ page }) => {
    await page.goto('/product.html');
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer')).toContainText('GreenOak Technologies');
  });
});
