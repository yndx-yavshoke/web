import { faker } from '@faker-js/faker';

export const generateName = (): string => {
    return faker.person.fullName();
};

export const generateEmail = (): string => {
    return faker.internet.email();
};

export const generatePassword = (): string => {
    return faker.internet.password();
};

export const generateAge = (): string => {
    return String(faker.number.int({ min: 0, max: 99 }));
};