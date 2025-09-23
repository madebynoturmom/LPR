import { chromium } from 'playwright';

const url = process.env.URL || 'http://localhost:5173/admin/dashboard';
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  console.log('Opening', url);
  await page.goto(url, { waitUntil: 'networkidle' });
  // Wait for the theme toggle button to appear
  const toggle = await page.waitForSelector('.theme-toggle-btn', { timeout: 5000 }).catch(() => null);
  if (!toggle) {
    console.error('Theme toggle button not found');
    await browser.close();
    process.exit(2);
  }
  const initial = await page.evaluate(() => document.documentElement.dataset.theme || 'unset');
  console.log('Initial data-theme:', initial);
  // Click the toggle
  await toggle.click();
  // Give the UI a moment
  await page.waitForTimeout(300);
  const after = await page.evaluate(() => document.documentElement.dataset.theme || 'unset');
  console.log('After click data-theme:', after);
  const success = initial !== after;
  console.log('Toggle changed theme:', success);
  await browser.close();
  process.exit(success ? 0 : 3);
})();
