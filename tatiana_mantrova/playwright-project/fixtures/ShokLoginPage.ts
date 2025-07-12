import { Page, Locator } from '@playwright/test'

export class ShokLoginPage {
    public title: Locator;
    public loginEmailInput: Locator;
    public loginPasswordInput: Locator;
    public loginSubmitButton: Locator;
    public loginBackButton: Locator;
    public loginRegisterButton: Locator;
    public wrongLoginOrPasswordLabel: Locator; 

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Войти в ШОК', { exact: true });
        this.loginEmailInput = this.page.getByTestId('login-email-input');
        this.loginPasswordInput = this.page.getByTestId('login-password-input')
        this.loginSubmitButton = this.page.getByTestId('login-submit-button');
        this.loginBackButton = this.page.getByTestId('login-back-button');
        this.loginRegisterButton = this.page.getByTestId('login-register-button');
        this.wrongLoginOrPasswordLabel = this.page.getByText('Неправильный логин или пароль', { exact: true });
    }

    public async open() {
        await this.page.goto('/login');
    }

    public async loginAuthorizedUser() {
        await this.loginEmailInput.fill('tatiana.mantrova@gmail.com')
        await this.loginPasswordInput.fill('qwdqwdqw')
        await this.loginSubmitButton.click();
    }

    public async loginNotAuthorizedUser() {
        const randomEmail = this.generateEmail();
        await this.loginEmailInput.fill(randomEmail);
        await this.loginPasswordInput.fill('123456');
        await this.loginSubmitButton.click();
    }

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