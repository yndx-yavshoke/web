export const URLS = {
    MAIN: "https://yavshok.ru/",
    LOGIN: "https://yavshok.ru/login",
    REGISTER: "https://yavshok.ru/register",
    PROFILE: "https://yavshok.ru/",
    EDIT_PROFILE: "https://yavshok.ru/edit"
};

export const TEST_DATA = {
    VALID_EMAIL: "123456789@mail.ru",
    INVALID_EMAIL: "invalid-email",
    VALID_PASSWORD: "123456",
    INVALID_PASSWORD: "123",
    AGE: "25"
};

export const SELECTORS = {
    LOGIN: {
        EMAIL_INPUT: '[data-testid="login-email-input"]',
        PASSWORD_INPUT: '[data-testid="login-password-input"]',
        SUBMIT_BUTTON: '[data-testid="login-submit-button"]',
        BACK_BUTTON: '[data-testid="login-back-button"]',
        REGISTER_BUTTON: '[data-testid="login-register-button"]',
        TITLE: 'div*=Войти в ШОК'
    },
    PROFILE: {
        LOGOUT_BUTTON: '[data-testid="user-logout-button"]',
        EDIT_PROFILE_BUTTON: '[data-testid="user-edit-profile-button"]',
        AVATAR: '[src="/assets/assets/images/profile.4c9412d0fd7b6d90111faab09c8f6c4a.gif"]',
        
    },
    EDIT_PROFILE: {
        NAME_INPUT: '[data-testid="edit-name-input"]',
        SAVE_BUTTON: '[data-testid="edit-save-button"]',
        CANCEL_BUTTON: '[data-testid="edit-cancel-button"]',
    }
};
