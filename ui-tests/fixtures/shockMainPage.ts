import { Page, Locator } from "@playwright/test";

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

    public async checkEmail(email: string) {
        await this.input.fill(email);
        await this.checkButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}