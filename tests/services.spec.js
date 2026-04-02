const { test, expect } = require('@playwright/test');

test.describe('Services Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/services.html');
  });

  test('loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Our Services/);
  });

  test('displays hero section with heading', async ({ page }) => {
    await expect(page.locator('.hero-page h1')).toContainText('Our Comprehensive Services');
  });

  test('displays 5 service cards', async ({ page }) => {
    const cards = page.locator('.service-card');
    await expect(cards).toHaveCount(5);
  });

  test('displays all service titles', async ({ page }) => {
    const titles = page.locator('.service-card h3');
    await expect(titles.nth(0)).toContainText('Laptop Repair & Troubleshooting');
    await expect(titles.nth(1)).toContainText('Laptop Maintenance & Upgrades');
    await expect(titles.nth(2)).toContainText('Windows Installation');
    await expect(titles.nth(3)).toContainText('CCTV Security Systems');
    await expect(titles.nth(4)).toContainText('Wi-Fi & Network Solutions');
  });

  test('each service card has icon, description, and book button', async ({ page }) => {
    const cards = page.locator('.service-card');
    for (let i = 0; i < 5; i++) {
      const card = cards.nth(i);
      await expect(card.locator('.service-icon')).toBeVisible();
      await expect(card.locator('p')).toBeVisible();
      await expect(card.locator('.book-btn')).toBeVisible();
    }
  });

  test('book buttons link to contact page', async ({ page }) => {
    const bookButtons = page.locator('.book-btn');
    for (let i = 0; i < 5; i++) {
      await expect(bookButtons.nth(i)).toHaveAttribute('href', 'contact.html');
      await expect(bookButtons.nth(i)).toContainText('Book a Service');
    }
  });

  test('displays Why Choose Us section', async ({ page }) => {
    await expect(page.locator('.why-us h2')).toContainText('Why Choose Us');
  });

  test('displays 4 feature cards in Why Choose Us', async ({ page }) => {
    const features = page.locator('.feature-card');
    await expect(features).toHaveCount(4);
  });

  test('feature cards have correct content', async ({ page }) => {
    const features = page.locator('.feature-card');
    await expect(features.nth(0).locator('h3')).toContainText('Fast Service');
    await expect(features.nth(1).locator('h3')).toContainText('Affordable Pricing');
    await expect(features.nth(2).locator('h3')).toContainText('Expert Technicians');
    await expect(features.nth(3).locator('h3')).toContainText('Professional Support');
  });

  test('displays footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer')).toContainText('2026 GreenOak Technologies');
  });
});
