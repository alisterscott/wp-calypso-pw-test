import { test, expect, Page } from '../../lib/base';

const A4A_URL = 'https://agencies.automattic.com';

test.describe('Automattic For Agencies Sign Up Page', () => {
	async function givenIAmOnTheSignUpPage(page: Page) {
		await test.step('Given I am on the Automattic For Agencies Sign Up Page', async () => {
			await page.goto(`${A4A_URL}/signup`);
		});
	}

	test('As web agency owner I see the correct page title', async ({ pageDefaultUser }) => {
		await givenIAmOnTheSignUpPage(pageDefaultUser);
		await test.step('Then I can see the correct page title to give me confidence I am on the correct site', async () => {
			await expect(pageDefaultUser).toHaveTitle('Automattic For Agencies');
		});
	});

	test('As web agency owner I can enter my agency details and see these displayed (no fixtures)', async ({
		pageDefaultUser,
	}) => {
		await givenIAmOnTheSignUpPage(pageDefaultUser);

		await test.step('When I enter my agency details', async () => {
			await pageDefaultUser
				.getByRole('textbox', { name: 'Your first name *' })
				.fill('Ricardo “Cactus”');
			await pageDefaultUser.getByRole('textbox', { name: 'Last name *' }).fill('Mendoza');
			await pageDefaultUser
				.getByRole('textbox', { name: 'Agency name *' })
				.fill('El Tigre Web Design');
			await pageDefaultUser
				.getByRole('textbox', { name: 'Business URL *' })
				.fill('https://eltigrewebdesign.com');
			await pageDefaultUser.getByLabel('Country code').selectOption('AU');
			await pageDefaultUser.getByRole('textbox', { name: 'Phone number' }).fill('0488888888');
		});

		await test.step('Then I can see my agency details as I entered them', async () => {
			await expect(pageDefaultUser.getByRole('textbox', { name: 'Your first name *' })).toHaveValue(
				'Ricardo “Cactus”'
			);
			await expect(pageDefaultUser.getByRole('textbox', { name: 'Last name *' })).toHaveValue(
				'Mendoza'
			);
			await expect(pageDefaultUser.getByRole('textbox', { name: 'Agency name *' })).toHaveValue(
				'El Tigre Web Design'
			);
			await expect(pageDefaultUser.getByRole('textbox', { name: 'Business URL *' })).toHaveValue(
				'https://eltigrewebdesign.com'
			);
			await expect(pageDefaultUser.getByLabel('Country code')).toHaveValue('AU');
			await expect(pageDefaultUser.getByRole('textbox', { name: 'Phone number' })).toHaveValue(
				'0488888888'
			);
		});
	});

	test('As web agency owner I can enter my agency details and see these displayed (using basic fixtures)', async ({
		pageDefaultUser,
		agency,
	}) => {
		await givenIAmOnTheSignUpPage(pageDefaultUser);

		await test.step('When I enter my agency details', async () => {
			await pageDefaultUser
				.getByRole('textbox', { name: 'Your first name *' })
				.fill(agency.firstName);
			await pageDefaultUser.getByRole('textbox', { name: 'Last name *' }).fill(agency.lastName);
			await pageDefaultUser.getByRole('textbox', { name: 'Agency name *' }).fill(agency.agencyName);
			await pageDefaultUser
				.getByRole('textbox', { name: 'Business URL *' })
				.fill(agency.businessUrl);
			await pageDefaultUser
				.getByRole('combobox', { name: 'Country code' })
				.selectOption(agency.countryCode);
			await pageDefaultUser.getByRole('textbox', { name: 'Phone number' }).fill(agency.phoneNumber);
		});

		await test.step('Then I can see my agency details as I entered them', async () => {
			await expect(pageDefaultUser.getByRole('textbox', { name: 'Your first name *' })).toHaveValue(
				agency.firstName
			);
			await expect(pageDefaultUser.getByRole('textbox', { name: 'Last name *' })).toHaveValue(
				agency.lastName
			);
			await expect(pageDefaultUser.getByRole('textbox', { name: 'Agency name *' })).toHaveValue(
				agency.agencyName
			);
			await expect(pageDefaultUser.getByRole('textbox', { name: 'Business URL *' })).toHaveValue(
				agency.businessUrl
			);
			await expect(pageDefaultUser.getByRole('combobox', { name: 'Country code' })).toHaveValue(
				agency.countryCode
			);
			await expect(pageDefaultUser.getByRole('textbox', { name: 'Phone number' })).toHaveValue(
				agency.phoneNumber
			);
		});
	});

	test('As web agency owner I can enter my agency details and see these displayed (using advanced fixtures)', async ({
		pageDefaultUser,
		advancedAgency,
	}) => {
		await givenIAmOnTheSignUpPage(pageDefaultUser);

		await test.step('When I enter my agency details', async () => {
			for (const field of advancedAgency.fieldValues) {
				const element = pageDefaultUser.getByRole(field.role, { name: field.label });
				field.role === 'combobox'
					? await element.selectOption(field.value)
					: await element.fill(field.value);
			}
		});

		await test.step('Then I can see my agency details as I entered them', async () => {
			for (const field of advancedAgency.fieldValues) {
				await expect(pageDefaultUser.getByRole(field.role, { name: field.label })).toHaveValue(
					field.value
				);
			}
		});
	});
});
