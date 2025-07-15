import { Page, Locator } from '@playwright/test';

export class LoginPage {
    public title: Locator;
    public inputEmail: Locator;
    public inputPassword: Locator;
    public toLoginButton: Locator;
    public toRegisterButton: Locator;
    public toBackButton: Locator;
    public errorMessageNotExist: Locator;
    public errorMessageNotPassword: Locator;
    public errorMessageNotEmail: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Войти в ШОК', { exact: true });
        this.inputEmail = this.page.getByTestId('login-email-input');
        this.inputPassword = this.page.getByTestId('login-password-input');
        this.toLoginButton = this.page.getByTestId('login-submit-button');
        this.toRegisterButton = this.page.getByTestId('login-register-button');
        this.toBackButton = this.page.getByTestId('login-back-button');
        this.errorMessageNotExist = this.page.getByText('Неправильный логин или пароль', { exact: true });
        this.errorMessageNotPassword = this.page.getByText('Введите пароль', { exact: true });
        this.errorMessageNotEmail = this.page.getByText('Введите email', { exact: true });
    }

    public async open(url: string = '/login') {
        await this.page.goto(url);
    }

    public async login(email: string, password: string) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.toLoginButton.click();
    }

    public async goToRegister() {
        await this.toRegisterButton.click();
    }

    public async goToBack() {
        await this.toBackButton.click();
    }
}