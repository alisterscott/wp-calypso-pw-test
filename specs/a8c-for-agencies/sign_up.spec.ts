import { test, expect, Page } from '@playwright/test';

const A4A_URL = 'https://agencies.automattic.com';

test.describe('Automattic For Agencies Sign Up Page', () => {
	async function givenIAmOnTheSignUpPage(page: Page) {
		await test.step('Given I am on the Automattic For Agencies Sign Up Page', async () => {
			await page.goto(`${A4A_URL}/signup`);
		});
	}

	test('As web agency owner I see the correct page title', async ({ page }) => {
		await givenIAmOnTheSignUpPage(page);
		await test.step('Then I can see the correct page title to give me confidence I am on the correct site', async () => {
			await expect(page).toHaveTitle('Automattic For Agencies');
		});
	});

	test('As web agency owner I can enter my agency details and see these displayed (no fixtures)', async ({
		page,
	}) => {
		await givenIAmOnTheSignUpPage(page);

		await test.step('When I enter my agency details', async () => {
			await page.getByRole('textbox', { name: 'Your first name *' }).fill('Ricardo “Cactus”');
			await page.getByRole('textbox', { name: 'Last name *' }).fill('Mendoza');
			await page.getByRole('textbox', { name: 'Agency name *' }).fill('El Tigre Web Design');
			await page
				.getByRole('textbox', { name: 'Business URL *' })
				.fill('https://eltigrewebdesign.com');
			await page.getByLabel('Country code').selectOption('AU');
			await page.getByRole('textbox', { name: 'Phone number' }).fill('0488888888');
		});

		await test.step('Then I can see my agency details as I entered them', async () => {
			await expect(page.getByRole('textbox', { name: 'Your first name *' })).toHaveValue(
				'Ricardo “Cactus”'
			);
			await expect(page.getByRole('textbox', { name: 'Last name *' })).toHaveValue('Mendoza');
			await expect(page.getByRole('textbox', { name: 'Agency name *' })).toHaveValue(
				'El Tigre Web Design'
			);
			await expect(page.getByRole('textbox', { name: 'Business URL *' })).toHaveValue(
				'https://eltigrewebdesign.com'
			);
			await expect(page.getByLabel('Country code')).toHaveValue('AU');
			await expect(page.getByRole('textbox', { name: 'Phone number' })).toHaveValue('0488888888');
		});
	});
});
