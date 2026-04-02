const { test, expect } = require('@playwright/test');

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/admin.html');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('loads and shows login overlay when not authenticated', async ({ page }) => {
    await page.goto('/admin.html');
    // The login overlay should be visible when not logged in
    await expect(page.locator('#login-overlay')).toBeVisible();
  });

  test('login overlay has admin select dropdown', async ({ page }) => {
    await page.goto('/admin.html');
    await expect(page.locator('#login-admin-select')).toBeVisible();
  });

  test('login overlay has password field', async ({ page }) => {
    await page.goto('/admin.html');
    await expect(page.locator('#login-password')).toBeVisible();
    await expect(page.locator('#login-password')).toHaveAttribute('type', 'password');
  });

  test('login overlay has login button', async ({ page }) => {
    await page.goto('/admin.html');
    await expect(page.locator('button:has-text("Login")')).toBeVisible();
  });

  test('shows error when no admin selected', async ({ page }) => {
    await page.goto('/admin.html');
    await page.click('button:has-text("Login")');
    await expect(page.locator('#login-error')).toBeVisible();
  });

  test('can login with default admin credentials', async ({ page }) => {
    await page.goto('/admin.html');

    // Select the default admin
    await page.selectOption('#login-admin-select', { index: 1 });
    await page.fill('#login-password', 'admin123');
    await page.click('button:has-text("Login")');

    // Dashboard should be visible after login
    await expect(page.locator('#admin-wrapper')).toBeVisible();
  });

  test('dashboard shows stats cards after login', async ({ page }) => {
    await page.goto('/admin.html');
    await page.selectOption('#login-admin-select', { index: 1 });
    await page.fill('#login-password', 'admin123');
    await page.click('button:has-text("Login")');

    await expect(page.locator('.stat-card')).toHaveCount(4);
  });

  test('dashboard shows navigation sidebar', async ({ page }) => {
    await page.goto('/admin.html');
    await page.selectOption('#login-admin-select', { index: 1 });
    await page.fill('#login-password', 'admin123');
    await page.click('button:has-text("Login")');

    await expect(page.locator('.admin-sidebar')).toBeVisible();
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('text=Products')).toBeVisible();
    await expect(page.locator('text=Orders')).toBeVisible();
    await expect(page.locator('text=Customers')).toBeVisible();
  });

  test('can logout', async ({ page }) => {
    await page.goto('/admin.html');
    await page.selectOption('#login-admin-select', { index: 1 });
    await page.fill('#login-password', 'admin123');
    await page.click('button:has-text("Login")');

    await expect(page.locator('#admin-wrapper')).toBeVisible();

    // Click logout
    await page.click('text=Logout');

    // After logout, page should reload and show login
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#login-overlay')).toBeVisible();
  });

  test('theme toggle switches between light and dark', async ({ page }) => {
    await page.goto('/admin.html');
    await page.selectOption('#login-admin-select', { index: 1 });
    await page.fill('#login-password', 'admin123');
    await page.click('button:has-text("Login")');

    // Theme toggle should be visible
    const themeToggle = page.locator('.theme-toggle');
    await expect(themeToggle).toBeVisible();

    // Default should be light
    await expect(page.locator('#theme-text')).toContainText('Dark');

    // Toggle to dark
    await themeToggle.click();
    await expect(page.locator('#theme-text')).toContainText('Light');

    // Toggle back to light
    await themeToggle.click();
    await expect(page.locator('#theme-text')).toContainText('Dark');
  });

  test('shows product section when clicking Products nav', async ({ page }) => {
    await page.goto('/admin.html');
    await page.selectOption('#login-admin-select', { index: 1 });
    await page.fill('#login-password', 'admin123');
    await page.click('button:has-text("Login")');

    await page.click('text=Products');
    await expect(page.locator('#products-section')).toBeVisible();
  });

  test('shows add product modal', async ({ page }) => {
    await page.goto('/admin.html');
    await page.selectOption('#login-admin-select', { index: 1 });
    await page.fill('#login-password', 'admin123');
    await page.click('button:has-text("Login")');

    await page.click('text=Products');
    await page.click('text=Add Product');
    await expect(page.locator('#add-product-modal')).toBeVisible();
  });

  test('add product modal has all form fields', async ({ page }) => {
    await page.goto('/admin.html');
    await page.selectOption('#login-admin-select', { index: 1 });
    await page.fill('#login-password', 'admin123');
    await page.click('button:has-text("Login")');

    await page.click('text=Products');
    await page.click('text=Add Product');

    await expect(page.locator('#product-name')).toBeVisible();
    await expect(page.locator('#product-price')).toBeVisible();
    await expect(page.locator('#product-category')).toBeVisible();
    await expect(page.locator('#product-image')).toBeVisible();
    await expect(page.locator('#product-description')).toBeVisible();
    await expect(page.locator('#product-stock')).toBeVisible();
  });

  test('can close add product modal', async ({ page }) => {
    await page.goto('/admin.html');
    await page.selectOption('#login-admin-select', { index: 1 });
    await page.fill('#login-password', 'admin123');
    await page.click('button:has-text("Login")');

    await page.click('text=Products');
    await page.click('text=Add Product');
    await expect(page.locator('#add-product-modal')).toBeVisible();

    await page.click('text=Cancel');
    await expect(page.locator('#add-product-modal')).toBeHidden();
  });
});
