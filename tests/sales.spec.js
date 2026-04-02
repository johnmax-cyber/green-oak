const { test, expect } = require('@playwright/test');

test.describe('Sales Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sales.html');
  });

  test('loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Computer Sales/);
  });

  test('displays navigation with logo', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('nav a:has-text("GreenOak")')).toBeVisible();
  });

  test('displays page heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Premium');
    await expect(page.locator('h1')).toContainText('Computer Sales');
  });

  test('displays filter buttons', async ({ page }) => {
    await expect(page.locator('.filter-btn')).toHaveCount(6);
    await expect(page.locator('.filter-btn[data-filter="all"]')).toBeVisible();
    await expect(page.locator('.filter-btn[data-filter="Laptops"]')).toBeVisible();
    await expect(page.locator('.filter-btn[data-filter="Desktops"]')).toBeVisible();
    await expect(page.locator('.filter-btn[data-filter="Accessories"]')).toBeVisible();
    await expect(page.locator('.filter-btn[data-filter="New"]')).toBeVisible();
    await expect(page.locator('.filter-btn[data-filter="Refurbished"]')).toBeVisible();
  });

  test('All Products filter is active by default', async ({ page }) => {
    await expect(page.locator('.filter-btn[data-filter="all"]')).toHaveClass(/active/);
  });

  test('clicking filter button toggles active state', async ({ page }) => {
    await page.click('.filter-btn[data-filter="Laptops"]');
    await expect(page.locator('.filter-btn[data-filter="Laptops"]')).toHaveClass(/active/);
    await expect(page.locator('.filter-btn[data-filter="all"]')).not.toHaveClass(/active/);
  });

  test('displays footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer')).toContainText('GreenOak Technologies');
  });

  test('Admin link is visible in nav', async ({ page }) => {
    await expect(page.locator('nav a[href="login.html"]')).toBeVisible();
    await expect(page.locator('nav a[href="login.html"]')).toContainText('Admin');
  });
});
