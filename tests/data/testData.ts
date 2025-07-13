// Тестовые данные для E2E тестов

export const TEST_USERS = {
  VALID: {
    email: 'test@mail.ru',
    password: 'password123',
    confirmPassword: 'password123'
  },
  NEW: {
    email: 'newuser@mail.ru',
    password: 'newpassword123',
    confirmPassword: 'newpassword123'
  },
  INVALID: {
    email: 'invalid-email',
    password: 'short',
    confirmPassword: 'different'
  }
} as const;

export const TEST_AGES = {
  UWU: 0,
  YOUNG: 20,
  OLD: 40
} as const;

export const TEST_URLS = {
  BASE: 'https://yavshok.ru',
  LOGIN: 'https://yavshok.ru/login',
  REGISTER: 'https://yavshok.ru/register',
  PROFILE: 'https://yavshok.ru/profile',
  MAIN: 'https://yavshok.ru/'
} as const;

export const TEST_MESSAGES = {
  SUCCESS: {
    LOGIN: 'Успешная авторизация',
    REGISTER: 'Успешная регистрация'
  },
  ERROR: {
    INVALID_EMAIL: 'Неверный формат email',
    INVALID_PASSWORD: 'Неверный пароль',
    EMAIL_EXISTS: 'Email уже существует',
    PASSWORDS_MISMATCH: 'Пароли не совпадают'
  }
} as const; 