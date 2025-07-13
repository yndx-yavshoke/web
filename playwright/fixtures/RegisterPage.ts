import { type Page, type Locator, expect } from "@playwright/test";

export class RegisterPage {
    public title: Locator;
    public loginInput: Locator;
    public passwordInput: Locator;
    public ageInput: Locator;
    public registerButton: Locator;
    public backButton: Locator;


    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Регистрация в ШОКе', { exact: true });
        this.loginInput = this.page.getByTestId('register-email-input');
        this.passwordInput = this.page.getByTestId('register-password-input');
        this.ageInput = this.page.getByTestId('register-age-input');
        this.registerButton = this.page.getByTestId('register-submit-button');
        this.backButton = this.page.getByTestId('register-back-button');

    }

    public async open() {
        await this.page.goto('/register');
    }

}