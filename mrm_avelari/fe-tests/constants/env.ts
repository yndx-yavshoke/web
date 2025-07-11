if (!process.env.API_BASE_URL) {
  throw new Error('API_BASE_URL is not set in .env file');
}

if (!process.env.TEST_USER_EMAIL) {
  throw new Error('TEST_USER_EMAIL is not set in .env file');
}
if (!process.env.TEST_USER_PASSWORD) {
  throw new Error('TEST_USER_PASSWORD is not set in .env file');
}

if (!process.env.TEST_UNREGISTERED_EMAIL) {
  throw new Error('TEST_UNREGISTERED_EMAIL is not set in .env file');
}

if (!process.env.TEST_RANDOM_PASSWORD) {
  throw new Error('TEST_RANDOM_PASSWORD is not set in .env file');
}

export const API_BASE_URL = process.env.API_BASE_URL!;
export const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL!;
export const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD!;
export const TEST_UNREGISTERED_EMAIL = process.env.TEST_UNREGISTERED_EMAIL!;
export const TEST_RANDOM_PASSWORD = process.env.TEST_RANDOM_PASSWORD!;
