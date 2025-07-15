import { Page, Locator } from '@playwright/test'
// позже -- дописать сообщения об остальных возможных ошибках

export class ShockLoginPage {
    public title: Locator;
    public mailInput: Locator;
    public passwordInput: Locator;
    public loginButton: Locator;
    public regNavigateButton: Locator;
    public backButton: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Войти в ШОК', { exact: true });
        this.regNavigateButton = this.page.getByTestId('login-register-button');
        this.backButton = this.page.getByTestId('login-back-button');
        this.loginButton = this.page.getByTestId('login-submit-button');
        this.mailInput = this.page.getByTestId('login-email-input');
        this.passwordInput = this.page.getByTestId('login-password-input');
    }

    public async open() {
        await this.page.goto('/login');
    }

    public async loginToShok(email: string, password: string) {
        await this.mailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}