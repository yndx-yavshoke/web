export class LoginPage {
    constructor(private readonly browser: any) { }

    get loginInput() {
        return this.browser.$('[data-testid="login-email-input"]');
    }
    get passwordInput() {
        return this.browser.$('[data-testid="login-password-input"]');
    }
    get loginButton() {
        return this.browser.$('[data-testid="login-submit-button"]');
    }
    get toRegisterButton() {
        return this.browser.$('[data-testid="login-register-button"]');
    }
    get loginBackButton() {
        return this.browser.$('[data-testid="login-back-button"]');
    }

    async open() {
        await this.browser.openAndWait('/login');
    }

    async login(email: string, password: string) {
        await this.loginInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}