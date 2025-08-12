import { test, expect, Page } from '../../lib/base';

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

	test('As web agency owner I can enter my agency details and see these displayed (using basic fixtures)', async ({
		page,
		agency,
	}) => {
		await givenIAmOnTheSignUpPage(page);

		await test.step('When I enter my agency details', async () => {
			await page.getByRole('textbox', { name: 'Your first name *' }).fill(agency.firstName);
			await page.getByRole('textbox', { name: 'Last name *' }).fill(agency.lastName);
			await page.getByRole('textbox', { name: 'Agency name *' }).fill(agency.agencyName);
			await page.getByRole('textbox', { name: 'Business URL *' }).fill(agency.businessUrl);
			await page.getByRole('combobox', { name: 'Country code' }).selectOption(agency.countryCode);
			await page.getByRole('textbox', { name: 'Phone number' }).fill(agency.phoneNumber);
		});

		await test.step('Then I can see my agency details as I entered them', async () => {
			await expect(page.getByRole('textbox', { name: 'Your first name *' })).toHaveValue(
				agency.firstName
			);
			await expect(page.getByRole('textbox', { name: 'Last name *' })).toHaveValue(agency.lastName);
			await expect(page.getByRole('textbox', { name: 'Agency name *' })).toHaveValue(
				agency.agencyName
			);
			await expect(page.getByRole('textbox', { name: 'Business URL *' })).toHaveValue(
				agency.businessUrl
			);
			await expect(page.getByRole('combobox', { name: 'Country code' })).toHaveValue(
				agency.countryCode
			);
			await expect(page.getByRole('textbox', { name: 'Phone number' })).toHaveValue(
				agency.phoneNumber
			);
		});
	});

	test('As web agency owner I can enter my agency details and see these displayed (using advanced fixtures)', async ({
		page,
		advancedAgency,
	}) => {
		await givenIAmOnTheSignUpPage(page);

		await test.step('When I enter my agency details', async () => {
			for (const field of advancedAgency.fieldValues) {
				const element = page.getByRole(field.role, { name: field.label });
				field.role === 'combobox'
					? await element.selectOption(field.value)
					: await element.fill(field.value);
			}
		});

		await test.step('Then I can see my agency details as I entered them', async () => {
			for (const field of advancedAgency.fieldValues) {
				await expect(page.getByRole(field.role, { name: field.label })).toHaveValue(field.value);
			}
		});
	});
});
