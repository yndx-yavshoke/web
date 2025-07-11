import { Page, Locator } from "@playwright/test";

export class RegisterPage {
    public title: Locator;
    public emailInput: Locator;
    public passwordInput: Locator;
    public ageInput: Locator;
    public registerButton: Locator;
    public toLoginButton: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Регистрация в ШОКе', { exact: true });
        this.emailInput = this.page.getByTestId('register-email-input');
        this.passwordInput = this.page.getByTestId('register-password-input');
        this.ageInput = this.page.getByTestId('register-age-input');
        this.registerButton = this.page.getByTestId('register-submit-button');
        this.toLoginButton = this.page.getByTestId('register-back-button');
    }

    public async open() {
        await this.page.goto('/register');
    }

    public async register(email: string, password: string, age: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.ageInput.fill(age);
        await this.registerButton.click();
    }
}
