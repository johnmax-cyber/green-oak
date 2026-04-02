const { test, expect } = require('@playwright/test');

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact.html');
  });

  test('loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact Us/);
  });

  test('displays heading and subtitle', async ({ page }) => {
    await expect(page.locator('.contact-container h1')).toContainText('Contact Us');
    await expect(page.locator('.subtitle')).toContainText('professional IT solutions');
  });

  test('displays phone contact info', async ({ page }) => {
    const phoneLink = page.locator('.contact-info a');
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', 'tel:0701776778');
    await expect(phoneLink).toContainText('0701 776 778');
  });

  test('contact form has all required fields', async ({ page }) => {
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#phone')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.locator('.submit-btn')).toBeVisible();
  });

  test('name field is required', async ({ page }) => {
    await expect(page.locator('#name')).toHaveAttribute('required', '');
  });

  test('email field is required and has email type', async ({ page }) => {
    await expect(page.locator('#email')).toHaveAttribute('required', '');
    await expect(page.locator('#email')).toHaveAttribute('type', 'email');
  });

  test('message field is required', async ({ page }) => {
    await expect(page.locator('#message')).toHaveAttribute('required', '');
  });

  test('submit button has correct text', async ({ page }) => {
    await expect(page.locator('.submit-btn')).toContainText('Send Message');
  });

  test('can fill and submit contact form', async ({ page }) => {
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#phone', '0700123456');
    await page.fill('#message', 'This is a test message for the contact form.');

    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    await page.click('.submit-btn');

    // After submission, form should be reset
    await expect(page.locator('#name')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
    await expect(page.locator('#message')).toHaveValue('');
  });

  test('Active link highlights on nav', async ({ page }) => {
    await expect(page.locator('nav a[href="contact.html"]')).toHaveClass(/active/);
  });
});
