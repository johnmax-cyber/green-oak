const { test, expect } = require('@playwright/test');

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads successfully and displays title', async ({ page }) => {
    await expect(page).toHaveTitle(/GreenOak Technologies/);
  });

  test('displays logo with correct text', async ({ page }) => {
    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('GreenOak');
    await expect(logo).toContainText('Technologies');
  });

  test('has all navigation links', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav.locator('a[href="index.html"]')).toBeVisible();
    await expect(nav.locator('a[href="laptops.html"]')).toBeVisible();
    await expect(nav.locator('a[href="services.html"]')).toBeVisible();
    await expect(nav.locator('a[href="sales.html"]')).toBeVisible();
    await expect(nav.locator('a[href="contact.html"]')).toBeVisible();
    await expect(nav.locator('a[href="admin.html"]')).toBeVisible();
  });

  test('Home link has active class', async ({ page }) => {
    await expect(page.locator('nav a[href="index.html"]')).toHaveClass(/active/);
  });

  test('displays hero section with tagline', async ({ page }) => {
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
    await expect(hero.locator('h1')).toContainText('Professional IT Services');
  });

  test('displays hero subtitle', async ({ page }) => {
    const hero = page.locator('.hero');
    await expect(hero.locator('p')).toContainText('Expert Laptop Repair');
  });

  test('CTA button links to services page', async ({ page }) => {
    const ctaButton = page.locator('.cta-button');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('href', 'services.html');
    await expect(ctaButton).toContainText('Get Started');
  });

  test('displays feature items', async ({ page }) => {
    const features = page.locator('.feature-item');
    await expect(features).toHaveCount(3);
    await expect(features.nth(0)).toContainText('Fast Service');
    await expect(features.nth(1)).toContainText('Affordable Pricing');
    await expect(features.nth(2)).toContainText('Expert Technicians');
  });

  test('navigating to Laptops page works', async ({ page }) => {
    await page.click('nav a[href="laptops.html"]');
    await expect(page).toHaveURL(/laptops\.html/);
    await expect(page.locator('h1')).toContainText('Laptop Store');
  });

  test('navigating to Services page works', async ({ page }) => {
    await page.click('nav a[href="services.html"]');
    await expect(page).toHaveURL(/services\.html/);
    await expect(page.locator('h1')).toContainText('Our Comprehensive Services');
  });

  test('navigating to Contact page works', async ({ page }) => {
    await page.click('nav a[href="contact.html"]');
    await expect(page).toHaveURL(/contact\.html/);
    await expect(page.locator('h1')).toContainText('Contact Us');
  });
});
