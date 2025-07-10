import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class RegisterPage {
    public title: Locator;
    public emailInput: Locator;
    public passwordInput: Locator;
    public ageInput: Locator;
    public registerButton: Locator;
    public backButton: Locator;

    constructor(public readonly page: Page) {
        this.title = page.getByText('Регистрация в ШОКе', { exact: true })
        this.emailInput = page.getByTestId('register-email-input')
        this.passwordInput = page.getByTestId('register-password-input')
        this.ageInput = page.getByTestId('register-age-input')
        this.registerButton = page.getByTestId('register-submit-button')
        this.backButton = page.getByTestId('register-back-button')
    }
}