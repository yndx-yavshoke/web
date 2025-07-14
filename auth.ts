export const AUTH_DATA = {
    // Известный зарегистрированный пользователь
    knownUser: {
        email: "vasilisa_28_05@mail.ru",
        password: "11111111",
        age: 25
    },

    // Фиксированный возраст для тестирования регистрации
    testAge: 25,

    selectors: {
        // Main page selectors
        emailInput: '[data-testid="main-email-input"]',
        checkButton: '[data-testid="main-check-button"]',
        loginButton: '[data-testid="main-login-button"]',

        // Login page selectors
        loginEmailInput: '[data-testid="login-email-input"]',
        loginPasswordInput: '[data-testid="login-password-input"]',
        loginSubmitButton: '[data-testid="login-submit-button"]',
        loginBackButton: '[data-testid="login-back-button"]',
        loginRegisterButton: '[data-testid="login-register-button"]',

        // Registration page selectors
        registerEmailInput: '[data-testid="register-email-input"]',
        registerPasswordInput: '[data-testid="register-password-input"]',
        registerAgeInput: '[data-testid="register-age-input"]',
        registerSubmitButton: '[data-testid="register-submit-button"]',
        registerBackButton: '[data-testid="register-back-button"]',

        // User profile selectors
        userAvatar: '[data-testid="user-avatar"]',
        userEditProfileButton: '[data-testid="user-edit-profile-button"]',
        userLogoutButton: '[data-testid="user-logout-button"]',

        // User profile blocks
        userProfileAvatarBlock: '[data-testid="user-profile-avatar-block"]',
        userProfileNameBlock: '[data-testid="user-profile-name-block"]',
        userProfileStatsBlock: '[data-testid="user-profile-stats-block"]',
        userProfileControlsBlock: '[data-testid="user-profile-controls-block"]',
        userProfileGalleryBlock: '[data-testid="user-profile-gallery-block"]',

        // Gallery selectors
        galleryItem: (index: number) => `[data-testid="gallery-item-${index}"]`,
        galleryImage: (index: number) => `[data-testid="gallery-image-${index}"]`,

        // Edit profile page selectors
        editProfileNameInput: '[data-testid="edit-name-input"]',
        editProfileSaveButton: '[data-testid="edit-save-button"]',
        editProfileCancelButton: '[data-testid="edit-cancel-button"]'
    },

    timeouts: {
        short: 1000,
        medium: 1500,
        long: 5000
    },

    ui: {
        pageZoom: 0.5,
        screenshotDelay: 500,
        tolerance: 20,
        antialiasingTolerance: 10
    }
}; 