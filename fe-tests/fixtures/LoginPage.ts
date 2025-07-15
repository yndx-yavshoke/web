import {Page, Locator, expect} from "@playwright/test";
export class LoginPage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;
    readonly authError: Locator;
    readonly registerButton: Locator;
    readonly passwordPlaceholder: Locator;
    readonly emailPlaceholder: Locator;

    constructor(public readonly page: Page) {
        this.emailInput = page.getByTestId('login-email-input');
        this.passwordInput = page.getByTestId('login-password-input');
        this.loginButton = page.getByTestId('login-submit-button');
        this.emailError = page.getByText('Введите email', {exact: true});
        this.passwordError = page.getByText('Введите пароль', {exact: true});
        this.authError = page.getByText('Неправильный логин или пароль', {exact: true});
        this.registerButton = page.getByTestId('login-register-button');
        this.passwordPlaceholder = this.page.getByPlaceholder('Пароль', {exact: true});
        this.emailPlaceholder = this.page.getByPlaceholder('Email', {exact: true});
    }

    async open() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectEmailEmptyMessage() {
        await expect(this.emailError).toBeVisible();
    }

    async expectPasswordEmptyMessage() {
        await expect(this.passwordError).toBeVisible();
    }

    async expectAuthErrorMessage() {
        await expect(this.authError).toBeVisible();
    }

    async expectEmailPlaceholderVisible() {
        await expect(this.emailPlaceholder).toBeVisible();
    }

    async expectPasswordPlaceholderVisible() {
        await expect(this.passwordPlaceholder).toBeVisible();
    }

    async changeAgeRoute(age) {
        await this.page.route('https://api.yavshok.ru/auth/login', (route) => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjExODcsImlhdCI6MTc1MjQxOTM5NywiZXhwIjoxNzUyNTA1Nzk3fQ.N0lLkp02A-Tv5-bUOhUpqW1gpyhcmWoyf3_dC2L8OhY",
                    user: {
                        id: 1187,
                        email: "123456789@mail.ru",
                        name: "Neko",
                        age: age,
                    },
                }),
            });
        });
    }



}