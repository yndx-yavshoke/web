import type { Page, Locator, expect } from '@playwright/test';

export class ShokLoginPage {
    public emailInput: Locator;
    public passwordInput: Locator;
    public loginButton: Locator;
    public backButton: Locator;
    public registButton: Locator;
    public pageTitle: Locator;

    constructor(public readonly page: Page) {
        this.pageTitle = this.page.getByText('Войти в ШОК', { exact: true });
        this.emailInput = this.page.getByTestId('login-email-input'); 
        this.passwordInput = this.page.getByTestId('login-password-input');
        this.loginButton = this.page.getByTestId('login-submit-button');
        this.backButton = this.page.getByTestId('login-back-button');
        this.registButton = this.page.getByTestId('login-register-button');
    }

    public async open() {
        await this.page.goto('/login'); 
    }

    public async login(email: string, password: string) {
        await this.open();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async goRegist() {
        await this.registButton.click();
    }

    public async goBack() {
        await this.backButton.click();
    }
}