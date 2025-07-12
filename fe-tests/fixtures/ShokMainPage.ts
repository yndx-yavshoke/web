import { Page, Locator, expect } from '@playwright/test';

export class ShokMainPage {
    public title: Locator;
    public input: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;
    public falseLogin: Locator;
    public trueLogin: Locator;
    public trueLoginCat: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', { exact: true });
        this.input = this.page.getByTestId('main-email-input');
        this.checkButton = this.page.getByTestId('main-check-button');
        this.toLoginButton = this.page.getByTestId('main-login-button');
        this.falseLogin = this.page.getByText('Ты еще не в ШОКе', { exact: true });
        this.trueLogin = this.page.getByText('Ты уже в ШОКе', { exact: true });
        this.trueLoginCat = this.page.locator('img[src*="happyCat"]');
    }

    public async open() {
        await this.page.goto('/');
    }

    public async toLoginButtonClick() {
        await this.toLoginButton.click();
    }

    public async checkEmail(email: string, valid: boolean = true) {
        await this.input.fill(email);
        await this.checkButton.click();

        if (valid) {
            await expect(this.trueLoginCat).toBeVisible();
            await expect(this.trueLogin).toBeVisible();
        } else {
            await expect(this.falseLogin).toBeVisible();
            await expect(this.trueLoginCat).not.toBeVisible();
        }
    }
}