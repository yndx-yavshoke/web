import { type Page, type Locator, expect } from "@playwright/test";

export class ShockLoginPage {
    public title: Locator;
    public toLoginButton: Locator;
    public backButton: Locator;
    public inputLogin: Locator;
    public inputPassword: Locator;
    public registrationButton: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Войти в ШОК', { exact: true });
        this.inputLogin = this.page.getByTestId('login-email-input');
        this.inputPassword = this.page.getByTestId('login-password-input');
        this.backButton = this.page.getByTestId('login-back-button');
        this.toLoginButton = this.page.getByTestId('login-submit-button');
        this.registrationButton = this.page.getByTestId('login-register-button');
    }

    public async open() {
        await this.page.goto('/login');
    }

    public async login() {
        await this.inputLogin.fill(process.env.LOGIN);
        await this.inputPassword.fill(process.env.PASSWORD);
        await this.toLoginButton.click();

        await expect(this.page.getByTestId('user-logout-button')).toBeVisible();

        await this.page.context().storageState({ path: './tests/setup/.auth/user.json' });
    }
}
