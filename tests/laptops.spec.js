const { test, expect } = require('@playwright/test');

test.describe('Laptops Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/laptops.html');
  });

  test('loads successfully and displays title', async ({ page }) => {
    await expect(page).toHaveTitle(/Laptop Store/);
  });

  test('displays page header', async ({ page }) => {
    await expect(page.locator('.page-header h1')).toContainText('Laptop Store');
  });

  test('displays laptop grid with products', async ({ page }) => {
    const grid = page.locator('#laptop-grid');
    await expect(grid).toBeVisible();
    const cards = grid.locator('.laptop-card');
    await expect(cards).toHaveCount(6);
  });

  test('each laptop card has required elements', async ({ page }) => {
    const firstCard = page.locator('.laptop-card').first();
    await expect(firstCard.locator('.laptop-emoji')).toBeVisible();
    await expect(firstCard.locator('.laptop-name')).toBeVisible();
    await expect(firstCard.locator('.laptop-specs')).toBeVisible();
    await expect(firstCard.locator('.laptop-price')).toBeVisible();
    await expect(firstCard.locator('.order-btn')).toBeVisible();
  });

  test('displays all laptop names', async ({ page }) => {
    const names = page.locator('.laptop-name');
    await expect(names.nth(0)).toContainText('HP EliteBook 840 G9');
    await expect(names.nth(1)).toContainText('Dell XPS 15 9530');
    await expect(names.nth(2)).toContainText('Lenovo ThinkPad E15');
    await expect(names.nth(3)).toContainText('Apple MacBook Air M2');
    await expect(names.nth(4)).toContainText('Asus VivoBook 15');
    await expect(names.nth(5)).toContainText('Microsoft Surface Pro 9');
  });

  test('displays prices in KES format', async ({ page }) => {
    const prices = page.locator('.laptop-price');
    await expect(prices.first()).toContainText('KES');
  });

  test('opens order modal when clicking order button', async ({ page }) => {
    const modal = page.locator('#order-modal');
    await expect(modal).not.toHaveClass(/active/);

    await page.locator('.order-btn').first().click();
    await expect(modal).toHaveClass(/active/);
  });

  test('order modal shows laptop details', async ({ page }) => {
    await page.locator('.order-btn').first().click();

    const modal = page.locator('.modal-box');
    await expect(modal.locator('#modal-title')).toContainText('HP EliteBook 840 G9');
    await expect(modal.locator('#modal-price')).toBeVisible();
    await expect(modal.locator('#modal-delivery')).toBeVisible();
    await expect(modal.locator('#modal-warranty')).toBeVisible();
  });

  test('order modal has form fields', async ({ page }) => {
    await page.locator('.order-btn').first().click();

    await expect(page.locator('#order-name')).toBeVisible();
    await expect(page.locator('#order-email')).toBeVisible();
    await expect(page.locator('#order-phone')).toBeVisible();
    await expect(page.locator('#order-payment')).toBeVisible();
  });

  test('order modal shows validation error when submitting empty', async ({ page }) => {
    await page.locator('.order-btn').first().click();
    await page.locator('.submit-btn').click();

    await expect(page.locator('#error-msg')).toBeVisible();
  });

  test('can close order modal', async ({ page }) => {
    await page.locator('.order-btn').first().click();
    const modal = page.locator('#order-modal');
    await expect(modal).toHaveClass(/active/);

    await page.locator('.modal-close').click();
    await expect(modal).not.toHaveClass(/active/);
  });

  test('can close modal with Escape key', async ({ page }) => {
    await page.locator('.order-btn').first().click();
    const modal = page.locator('#order-modal');
    await expect(modal).toHaveClass(/active/);

    await page.keyboard.press('Escape');
    await expect(modal).not.toHaveClass(/active/);
  });

  test('can fill and submit order form', async ({ page }) => {
    await page.locator('.order-btn').first().click();

    await page.fill('#order-name', 'John Doe');
    await page.fill('#order-email', 'john@example.com');
    await page.fill('#order-phone', '0700123456');
    await page.selectOption('#order-payment', 'M-Pesa');

    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    await page.locator('.submit-btn').click();
    await expect(page.locator('#success-msg')).toBeVisible();
  });
});
