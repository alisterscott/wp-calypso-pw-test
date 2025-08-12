import { getRandomFirstName, getRandomLastName } from '../testdata/names';

export class Agency {
	firstName: string;
	lastName: string;
	agencyName: string;
	businessUrl: string;
	countryCode: string;
	phoneNumber: string;

	constructor() {
		this.firstName = getRandomFirstName();
		this.lastName = getRandomLastName();
		this.agencyName = 'El Tigre Web Design';
		this.businessUrl = 'https://eltigrewebdesign.com';
		this.countryCode = 'AU';
		this.phoneNumber = '0488888888';
	}
}

interface FieldValue {
	label: string;
	value: string;
	role: 'textbox' | 'combobox';
}

export class AdvancedAgency {
	fieldValues: Array<FieldValue>;

	constructor() {
		this.fieldValues = [
			{ label: 'Your first name *', value: getRandomFirstName(), role: 'textbox' },
			{ label: 'Last name *', value: getRandomLastName(), role: 'textbox' },
			{ label: 'Agency name *', value: 'El Tigre Web Design', role: 'textbox' },
			{ label: 'Business URL *', value: 'https://eltigrewebdesign.com', role: 'textbox' },
			{ label: 'Country code', value: 'AU', role: 'combobox' },
			{ label: 'Phone number', value: '0488888888', role: 'textbox' },
		];
	}
}
