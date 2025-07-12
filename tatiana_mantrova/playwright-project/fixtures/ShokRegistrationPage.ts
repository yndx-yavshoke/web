import { Page, Locator } from '@playwright/test'

export class ShokRegistrationPage {
    public title: Locator

    public emailInput: Locator
    public passwordInput: Locator
    public ageInput: Locator

    public submitButton: Locator
    public backButton: Locator

    public emailInputErrorLabel: Locator
    public passwordInputErrorLabel: Locator
    public ageInputErrorLabel: Locator

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Регистрация в ШОКе', { exact: true })

        this.emailInput = this.page.getByTestId('register-email-input')
        this.passwordInput = this.page.getByTestId('register-password-input')
        this.ageInput = this.page.getByTestId('register-age-input')

        this.submitButton = this.page.getByTestId('register-submit-button')
        this.backButton = this.page.getByTestId('register-back-button')

        this.emailInputErrorLabel = this.page.getByText('Введите email', { exact: true })
        this.passwordInputErrorLabel = this.page.getByText('Введите пароль', { exact: true })
        this.ageInputErrorLabel = this.page.getByText('Введите возраст', { exact: true })
    }

    public async open() {
        await this.page.goto('/register');
    }

    // public async loginAuthorizedUser() {
    //     await this.loginEmailInput.fill('tatiana.mantrova@gmail.com')
    //     await this.loginPasswordInput.fill('qwdqwdqw')
    //     await this.loginSubmitButton.click();
    // }

    public generateEmail(options: { prefix?: string; domain?: string } = {}): string {
        const {
            prefix = 'user',
            domain = 'example.com'
        } = options;
        
        const randomString = Math.random().toString(36).substring(2, 8); // 6 случайных символов
        const randomNumber = Math.floor(Math.random() * 1000); // 3 случайных цифры

        return `${prefix}${randomString}${randomNumber}@${domain}`;
    }
}