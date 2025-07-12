import { Page, Locator, expect } from '@playwright/test';

export class ShokLoginPage {
    public title: Locator;
    public inputEmail: Locator;
    public inputPassword: Locator;
    public loginSubmitButton: Locator;
    public loginBackButton: Locator;
    public loginRegisterButton: Locator;
    public noPassword: Locator;
    public error: Locator;
    public noEmail: Locator;
    public invalidEmail: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Войти в ШОК', {exact: true});
        this.inputEmail = this.page.getByPlaceholder('Email');
        this.inputPassword = this.page.getByPlaceholder('Пароль');
        this.loginSubmitButton = this.page.getByTestId('login-submit-button');
        this.loginBackButton = this.page.getByTestId('login-back-button');
        this.loginRegisterButton = this.page.getByTestId('login-register-button');
        this.noPassword = this.page.getByText('Введите пароль', {exact: true});
        this.error = this.page.getByText('Произошла ошибка', {exact: true});
        this.noEmail = this.page.getByText('Введите email', {exact: true});
        this.invalidEmail = this.page.getByText('Неправильный логин или пароль', {exact: true});
    }

    public async open() {
        await this.page.goto('/login');
    }

    public async loginRegisterButtonClick() {
        await this.loginRegisterButton.click(); //
    }

    public async loginBackButtonClick() {
        await this.loginBackButton.click(); //
    }

    async login(email: string, password: string) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.loginSubmitButton.click();
    }
}

