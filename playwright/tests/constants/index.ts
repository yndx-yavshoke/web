/**
 * Константы для тестов
 */

// URL endpoints
export const ENDPOINTS = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile'
} as const;

// Test IDs
export const TEST_IDS = {
    // Главная страница
    MAIN_EMAIL_INPUT: 'main-email-input',
    MAIN_CHECK_BUTTON: 'main-check-button',
    MAIN_LOGIN_BUTTON: 'main-login-button',
    
    // Страница авторизации
    LOGIN_EMAIL_INPUT: 'login-email-input',
    LOGIN_PASSWORD_INPUT: 'login-password-input',
    LOGIN_SUBMIT_BUTTON: 'login-submit-button',
    LOGIN_REGISTER_BUTTON: 'login-register-button',
    LOGIN_BACK_BUTTON: 'login-back-button',
    
    // Страница регистрации
    REGISTER_NAME_INPUT: 'register-name-input',
    REGISTER_EMAIL_INPUT: 'register-email-input',
    REGISTER_PASSWORD_INPUT: 'register-password-input',
    REGISTER_AGE_INPUT: 'register-age-input',
    REGISTER_SUBMIT_BUTTON: 'register-submit-button',
    
    // Страница профиля
    USER_LOGOUT_BUTTON: 'user-logout-button',
    USER_INFO: 'user-info'
} as const;

// Тексты сообщений
export const MESSAGES = {
    // Главная страница
    HOME_TITLE: 'Я в ШОКе',
    SHOCK_STATUS_IN: 'Ты уже в ШОКе',
    SHOCK_STATUS_OUT: 'Ты еще не в ШОКе',
    
    // Страница авторизации
    LOGIN_TITLE: 'Войти в ШОК',
    AUTH_ERROR: 'Неправильный логин или пароль',
    EMPTY_EMAIL_ERROR: 'Введите email',
    EMPTY_PASSWORD_ERROR: 'Введите пароль',
    
    // Страница регистрации
    EMAIL_REQUIRED: 'Введите email',
    PASSWORD_REQUIRED: 'Введите пароль',
    AGE_REQUIRED: 'Введите возраст',
    WRONG_EMAIL: 'Неправильный email-адрес',
    TOO_SHORT_PASSWORD: 'Пароль должен содержать минимум 6 символов',
    NOT_NUMERIC_AGE: 'Возраст должен быть числом',
    EXISTING_USER: 'Пользователь с таким email уже существует',
    
    // Страница профиля
    PROFILE_TITLE: 'Профиль'
} as const;

// Валидационные данные
export const VALIDATION_DATA = {
    // Невалидные email
    INVALID_EMAILS: [
        'invalid-email',
        'test@',
        '@example.com',
        'test..test@example.com'
    ],
    
    // Короткие пароли
    SHORT_PASSWORDS: [
        '123',
        'abc',
        'pass'
    ],
    
    // Невалидные возрасты
    INVALID_AGES: [
        'abc',
        '12.5',
        '-5',
        '150'
    ]
} as const;

// Таймауты
export const TIMEOUTS = {
    DEFAULT: 5000,
    NAVIGATION: 30000,
    ACTION: 10000
} as const;

// Возрастные ограничения
export const AGE_LIMITS = {
    MIN: 18,
    MAX: 99
} as const;

// Парольные требования
export const PASSWORD_REQUIREMENTS = {
    MIN_LENGTH: 6,
    DEFAULT_LENGTH: 10
} as const; 