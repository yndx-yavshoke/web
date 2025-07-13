import { config } from './data-env';
import { User } from '../types';

/**
 * Пользователь по умолчанию из переменных окружения
 */
export const defaultUser: User = {
    email: config.email,
    password: config.password
};

/**
 * Проверка валидности данных пользователя по умолчанию
 */
export const isDefaultUserValid = (): boolean => {
    return !!(defaultUser.email && defaultUser.password);
};

/**
 * Получение пользователя по умолчанию с проверкой
 */
export const getDefaultUser = (): User => {
    if (!isDefaultUserValid()) {
        throw new Error('Default user credentials are not configured. Please set USER_EMAIL and USER_PASSWORD environment variables.');
    }
    return defaultUser;
};