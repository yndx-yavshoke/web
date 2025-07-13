import { faker } from '@faker-js/faker';
import { User, RegistrationData } from '../types';

/**
 * Генерация случайного имени пользователя
 */
export const generateUserName = (): string => {
    return faker.person.fullName();
};

/**
 * Генерация случайного email
 */
export const generateUserEmail = (): string => {
    return faker.internet.email();
};

/**
 * Генерация случайного пароля
 */
export const generateUserPassword = (): string => {
    return faker.internet.password({ 
        length: 10,
        pattern: /[A-Za-z0-9!@#$%^&*]/
    });
};

/**
 * Генерация случайного возраста
 */
export const generateUserAge = (): string => {
    return String(faker.number.int({ min: 18, max: 99 }));
};

/**
 * Генерация случайного пользователя
 */
export const generateRandomUser = (): User => {
    return {
        email: generateUserEmail(),
        password: generateUserPassword(),
        name: generateUserName(),
        age: faker.number.int({ min: 18, max: 99 })
    };
};

/**
 * Генерация данных для регистрации
 */
export const generateRegistrationData = (): RegistrationData => {
    return {
        email: generateUserEmail(),
        password: generateUserPassword(),
        age: generateUserAge(),
        name: generateUserName()
    };
};

// Обратная совместимость с существующим кодом
export const dataUserName = generateUserName;
export const dataUserEmail = generateUserEmail;
export const dataUserPassword = generateUserPassword;
export const dataUserAge = generateUserAge;