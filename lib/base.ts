import { test as base, expect, Page } from '@playwright/test';
import { AdvancedAgency, Agency } from './fixtures/agency';
import path from 'path';
import fs from 'fs';

const maxAgeMs = 48 * 60 * 60 * 1000; // 48 hours
const secretsFile = path.join(__dirname, '../secrets/decrypted-secrets.json');

export const test = base.extend<{
	agency: Agency;
	advancedAgency: AdvancedAgency;
	pageDefaultUser: Page;
}>({
	agency: async ({}, use) => {
		const agency = new Agency();
		await use(agency);
	},

	advancedAgency: async ({}, use) => {
		const advancedAgency = new AdvancedAgency();
		await use(advancedAgency);
	},

	pageDefaultUser: async ({ page }, use) => {
		const authFile = path.join(__dirname, '../secrets/storagestate/default-user.json');
		// Load credentials from secrets file
		if (!fs.existsSync(secretsFile)) {
			throw new Error(
				`Secrets file not found at '${secretsFile}'. Please make sure you run "npm run decrypt-secrets" first.`
			);
		}
		const secrets = JSON.parse(fs.readFileSync(secretsFile, 'utf-8'));
		const { username, password } = secrets.testAccounts.defaultUser;

		let needsLogin = true;

		// If file exists and is fresh, load cookies into current context
		if (fs.existsSync(authFile)) {
			const stats = fs.statSync(authFile);
			const ageMs = Date.now() - stats.mtime.getTime();
			if (ageMs < maxAgeMs) {
				const state = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
				if (state.cookies?.length) {
					await page.context().addCookies(state.cookies);
					needsLogin = false;
				}
			}
		}

		if (needsLogin) {
			// Perform login
			await page.goto('https://wordpress.com/log-in');
			await page.getByRole('textbox', { name: 'Email address or username' }).fill(username);
			await page.getByRole('button', { name: 'Continue', exact: true }).click();
			await page.getByRole('textbox', { name: 'Password' }).fill(password);
			await page.getByRole('button', { name: 'Log In', exact: true }).click();
			await page.getByRole('heading', { name: 'My Home' }).waitFor({ state: 'visible' });

			// Save storage state for future runs
			await page.context().storageState({ path: authFile });
		}
		await use(page);
	},
});

export { expect, Page };
