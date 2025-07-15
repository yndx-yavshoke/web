export const getBaseUrl = (): string | undefined => {
    return process.env.BASE_URL;
};

export const getUserEmail = (): string | undefined => {
    return process.env.USER_EMAIL;
};

export const getUserPassword = (): string | undefined => {
    return process.env.USER_PASSWORD;
};