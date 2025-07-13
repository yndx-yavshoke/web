import { faker } from '@faker-js/faker';

export const generateRandomName = (): string => {
    return faker.person.fullName();
};

export const generateRandomEmail = (): string => {
    return faker.internet.email();
};

export const generateRandomPassword = (): string => {
    return faker.internet.password();
};

export const generateRandomAge = (): string => {
    return String(faker.number.int({ min: 0, max: 99 }));
};