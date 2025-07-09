export const TEST_DATA = {
    emails: {
        default: "test@example.com",
        shocked: "anastasiagurtovykh@yandex.ru"
    },
    
    selectors: {
        emailInput: '[data-testid="main-email-input"]',
        checkButton: '[data-testid="main-check-button"]',
        loginButton: '[data-testid="main-login-button"]',
        loginEmailInput: '[data-testid="login-email-input"]'
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