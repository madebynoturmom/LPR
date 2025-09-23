import { test, expect } from '@playwright/test';

// A helper to compute the center of an element's bounding rect
async function centerOf(locator: import('@playwright/test').Locator) {
	const box = await locator.boundingBox();
	if (!box) throw new Error('element has no bounding box');
	return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

// Helper that asserts the element center is near the viewport center
async function expectCentered(page: import('@playwright/test').Page, selector: string, tolerancePercent = 8) {
	const card = page.locator(selector);
	await expect(card).toBeVisible();
	const viewport = page.viewportSize();
	if (!viewport) throw new Error('no viewport size available');
	const vpCenter = { x: viewport.width / 2, y: viewport.height / 2 };
	const elCenter = await centerOf(card);
	const dx = Math.abs(elCenter.x - vpCenter.x);
	const dy = Math.abs(elCenter.y - vpCenter.y);
	const maxDx = (tolerancePercent / 100) * viewport.width;
	const maxDy = (tolerancePercent / 100) * viewport.height;
	// Provide a helpful assertion message
	expect(dx, `card center x distance ${dx} should be <= ${maxDx}`).toBeLessThanOrEqual(maxDx);
	expect(dy, `card center y distance ${dy} should be <= ${maxDy}`).toBeLessThanOrEqual(maxDy);
}

// Test several viewport sizes (desktop, tablet, tall mobile)
test.describe('Login card visual centering', () => {
	test('is centered at common viewports', async ({ page }) => {
		const viewports = [
			{ width: 1280, height: 800 },
			{ width: 768, height: 1024 },
			{ width: 360, height: 740 } // Samsung Galaxy S8+ like
		];

		for (const vp of viewports) {
			await page.setViewportSize(vp);
			await page.goto('/login');
			// small wait for animations/HMR
			await page.waitForTimeout(250);
			await expectCentered(page, '.login-section', 9); // 9% tolerance
		}
	});
});
