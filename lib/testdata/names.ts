const FIRST_NAMES = [
	'Jorge',
	'María',
	'Luis',
	'Carmen',
	'Pedro',
	'Ana',
	'Ricardo',
	'Rosa',
	'Carlos',
	'Teresa',
	'Alejandro',
	'Guadalupe',
	'Juan',
	'Isabel',
	'José',
	'Laura',
	'Miguel',
	'Patricia',
	'Fernando',
	'Silvia',
];

const LAST_NAMES = [
	'Hernández',
	'García',
	'Martínez',
	'López',
	'González',
	'Rodríguez',
	'Pérez',
	'Sánchez',
	'Ramírez',
	'Cruz',
	'Torres',
	'Flores',
	'Morales',
	'Rivera',
	'Ortiz',
	'Chávez',
	'Mendoza',
	'Castillo',
	'Romero',
	'Herrera',
];

export function getRandomFirstName() {
	return FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
}

export function getRandomLastName() {
	return LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
}
