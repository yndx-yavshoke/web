import type { Page, Locator, expect } from '@playwright/test';

export class ShokRegistPage {
    public emailInput: Locator;
    public passwordInput: Locator;
    public ageInput: Locator;
    public backButton: Locator;
    public registButton: Locator;
    public pageTitle: Locator;

    constructor(public readonly page: Page) {
        this.pageTitle = this.page.getByText('Регистрация в ШОКе', { exact: true });
        this.emailInput = this.page.getByTestId('register-email-input'); 
        this.passwordInput = this.page.getByTestId('register-password-input');
        this.ageInput = this.page.getByTestId('register-age-input');
        this.backButton = this.page.getByTestId('register-back-button');
        this.registButton = this.page.getByTestId('register-submit-button');
    }

    public async open() {
        await this.page.goto('/register'); 
    }

    public async regist(email: string, password: string, age: number) {
        await this.open();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.ageInput.fill(age.toString());
        await this.registButton.click();
    }

    public async goBack() {
        await this.backButton.click();
    }
}