import { type Page, type Locator, expect } from "@playwright/test";

export class ShockMainPage {
    public title: Locator;
    public input: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;


    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', { exact: true });
        this.input = this.page.getByTestId('main-email-input');
        this.checkButton = this.page.getByTestId('main-check-button');
        this.toLoginButton = this.page.getByTestId('main-login-button');
    }

    public async open() {
        await this.page.goto('/');
    }

    public async checkEmail(email: string, valid: boolean) {
        await this.input.fill(email);
        await this.checkButton.click();

        if (valid) {
            await expect(this.page.getByText('Ты уже в ШОКе', { exact: true })).toBeVisible();
            await expect(this.page.getByText('Ты уже в ШОКе', { exact: true })).toHaveCSS('color', 'rgb(0, 128, 0)');
            await expect(this.page.getByRole('img')).toBeVisible();
        }
        else {
            await expect(this.page.getByText('Ты еще не в ШОКе', { exact: true })).toBeVisible();
        }
    }
}
