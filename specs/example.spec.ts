import { test, expect } from '@playwright/test';

test.describe('Automattic For Agencies', () => {
	test('has correct title', async ({ page }) => {
		await page.goto('https://agencies.automattic.com/signup');
		await expect(page).toHaveTitle('Automattic For Agencies');
	});
});
