const { test, expect } = require('@playwright/test');

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
  });

  test('loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Admin Login/);
  });

  test('displays GreenOak Admin logo', async ({ page }) => {
    await expect(page.locator('.login-logo .logo')).toContainText('GreenOak');
    await expect(page.locator('.login-logo .logo span')).toContainText('Admin');
  });

  test('displays subtitle', async ({ page }) => {
    await expect(page.locator('.login-logo p')).toContainText('Sign in to access your dashboard');
  });

  test('login form has email and password fields', async ({ page }) => {
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
  });

  test('email field has correct placeholder', async ({ page }) => {
    await expect(page.locator('#email')).toHaveAttribute('placeholder', 'admin@greenoak.com');
  });

  test('password field has correct type', async ({ page }) => {
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
  });

  test('toggle password visibility works', async ({ page }) => {
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
    await page.click('#toggle-password');
    await expect(page.locator('#password')).toHaveAttribute('type', 'text');
    await page.click('#toggle-password');
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
  });

  test('remember me checkbox is present', async ({ page }) => {
    await expect(page.locator('#remember-me')).toBeVisible();
  });

  test('displays Sign In button', async ({ page }) => {
    await expect(page.locator('.login-btn')).toBeVisible();
    await expect(page.locator('.login-btn')).toContainText('Sign In');
  });

  test('displays Google login button', async ({ page }) => {
    await expect(page.locator('#google-btn')).toBeVisible();
    await expect(page.locator('#google-btn')).toContainText('Continue with Google');
  });

  test('displays Setup Admin Account link', async ({ page }) => {
    await expect(page.locator('.forgot-password')).toContainText('Setup Admin Account');
  });

  test('clicking Setup Admin Account shows setup form', async ({ page }) => {
    await page.click('.forgot-password');
    await expect(page.locator('#setup-form')).toBeVisible();
    await expect(page.locator('#login-form')).toBeHidden();
  });

  test('setup form has email, password, and confirm fields', async ({ page }) => {
    await page.click('.forgot-password');
    await expect(page.locator('#setup-email')).toBeVisible();
    await expect(page.locator('#setup-password')).toBeVisible();
    await expect(page.locator('#setup-confirm')).toBeVisible();
  });

  test('can go back to login from setup form', async ({ page }) => {
    await page.click('.forgot-password');
    await expect(page.locator('#setup-form')).toBeVisible();
    await page.click('text=Back to Login');
    await expect(page.locator('#login-form')).toBeVisible();
    await expect(page.locator('#setup-form')).toBeHidden();
  });

  test('login shows error with invalid credentials', async ({ page }) => {
    await page.fill('#email', 'invalid@test.com');
    await page.fill('#password', 'wrongpassword');
    await page.click('.login-btn');

    // Wait for error message to appear
    await expect(page.locator('#error-msg')).toBeVisible();
  });

  test('Back to Website link navigates to home', async ({ page }) => {
    await page.click('text=Back to Website');
    await expect(page).toHaveURL(/index\.html/);
  });

  test('logo links to home page', async ({ page }) => {
    await page.click('.login-logo .logo');
    await expect(page).toHaveURL(/index\.html/);
  });
});
