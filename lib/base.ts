import { test as base, expect, Page } from '@playwright/test';
import { AdvancedAgency, Agency } from './fixtures/agency';

export const test = base.extend<{
	agency: Agency;
	advancedAgency: AdvancedAgency;
}>({
	agency: async ({}, use) => {
		const agency = new Agency();
		await use(agency);
	},
	advancedAgency: async ({}, use) => {
		const advancedAgency = new AdvancedAgency();
		await use(advancedAgency);
	},
});

export { expect, Page };
