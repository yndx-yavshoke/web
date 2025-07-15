export const getBaseUrl = (): string | undefined => {
    return process.env.BASE_URL;
};

export const getApiBaseUrl = (): string | undefined => {
    return process.env.API_BASE_URL;
};

export const getTestUserEmail = (): string | undefined => {
    return process.env.TEST_USER_EMAIL;
};

export const getTestUserPassword = (): string | undefined => {
    return process.env.TEST_USER_PASSWORD;
};