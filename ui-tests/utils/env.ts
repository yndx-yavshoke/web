export const getBaseUrl = (): string => {
    return process.env.BASE_URL || 'http://yavshok.ru';
};

export const getApiBaseUrl = (): string => {
    return process.env.API_BASE_URL || 'https://api.yavshok.ru';
};

export const getTestUserEmail = (): string => {
    return process.env.TEST_USER_EMAIL || 'default-test-email@example.com';
};

export const getTestUserPassword = (): string => {
    return process.env.TEST_USER_PASSWORD || 'default-test-password';
};