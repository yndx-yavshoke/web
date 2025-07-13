export class RegisterPage {
    constructor(private readonly browser: any) { }

    get emailInput() {
        return this.browser.$('[data-testid="register-email-input"]');
    }
    get passwordInput() {
        return this.browser.$('[data-testid="register-password-input"]');
    }
    get ageInput() {
        return this.browser.$('[data-testid="register-age-input"]');
    }
    get registerButton() {
        return this.browser.$('[data-testid="register-submit-button"]');
    }
    get toLoginButton() {
        return this.browser.$('[data-testid="register-back-button"]');
    }

    async open() {
        await this.browser.openAndWait('/register');
    }

    async register(email: string, password: string, age: string) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.ageInput.setValue(age);
        await this.registerButton.click();
    }
}