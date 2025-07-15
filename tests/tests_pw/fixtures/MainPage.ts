import { Page, Locator, expect } from '@playwright/test';

export class MainPage {
    public title: Locator;
    public input: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;
    public catGif: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', { exact: true });
        this.input = this.page.getByTestId('main-email-input');
        this.checkButton = this.page.getByTestId('main-check-button');
        this.toLoginButton = this.page.getByTestId('main-login-button');
        this.catGif = this.page.locator('img');
    }

    public async open(url: string = '/') {
        await this.page.goto(url);
    }

    public async inputEmailAndClick() {
        await this.input.fill('test input');
        await this.checkButton.click();
    }

    public async checkEmail(email: string, valid: boolean) {
        await this.input.fill(email);
        await this.checkButton.click();

        if (valid) {
            // проверяем, что отобразился котик с зеленой надписью
            const successMessage = this.page.getByText('Ты уже в ШОКе', { exact: true });
            const catGif = this.page.locator('img');

            await expect(successMessage).toBeVisible();
            await expect(successMessage).toHaveCSS('color', 'rgb(0, 128, 0)');
            await expect(catGif).toBeVisible();
        }
        else {
            // проверяем, что отобразился котик с красной надписью
            const failMessage = this.page.getByText('Ты еще не в ШОКе', { exact: true });

            await expect(failMessage).toBeVisible();
            await expect(failMessage).toHaveCSS('color', 'rgb(255, 0, 0)');
        }
    }

    public async goToLoginPage() {
        await this.toLoginButton.click();
    }
}