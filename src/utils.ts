import { faker } from '@faker-js/faker';

export const generateSwipeCardData = (numberOfCards = 3) => {
	const data = [];

	for (let i = 0; i < numberOfCards; i++) {
		const id = i + 1;

		data.push({
			id,
			body: faker.lorem.lines(1),
			header: faker.person.fullName(),
			imageUri: faker.image.url({ height: 500 }),
		});
	}

	return data;
};

export enum ROUTES {
	HOME = 'HOME',
	SWIPE = 'SWIPE',
}

export type RootStackParamList = {
	HOME: undefined;
	SWIPE: undefined;
};
