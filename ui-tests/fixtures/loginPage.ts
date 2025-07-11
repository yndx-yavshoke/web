import { Page, Locator } from "@playwright/test";

export class LoginPage {
    public title: Locator;
    public loginInput: Locator;
    public passwordInput: Locator;
    public loginButton: Locator;
    public toRegisterButton: Locator;
    public loginBackButton: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Войти в ШОК', { exact: true });
        this.loginInput = this.page.getByTestId('login-email-input');
        this.passwordInput = this.page.getByTestId('login-password-input');
        this.loginButton = this.page.getByTestId('login-submit-button');
        this.toRegisterButton = this.page.getByTestId('login-register-button');
        this.loginBackButton = this.page.getByTestId('login-back-button');
    }

    public async open() {
        await this.page.goto('/login');
    }

    public async login(email: string, password: string) {
        await this.loginInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
