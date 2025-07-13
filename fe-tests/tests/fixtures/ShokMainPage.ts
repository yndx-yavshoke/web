import { Page, Locator, expect } from "@playwright/test";

export class ShokMainPage {
    private readonly title: Locator;
    private readonly inputEmail: Locator;
    private readonly checkButton: Locator;
    private readonly buttonLogin: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', { exact: true });
        this.inputEmail = this.page.getByTestId('main-email-input');
        this.checkButton = this.page.getByTestId('main-check-button');
        this.buttonLogin = this.page.getByTestId('main-login-button');
    }

    public async Open() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL('/');
    }

    public async CheckTitle() {
        await expect(this.title).toBeVisible();
    }

    public async CheckLoginButton() {
        await expect(this.buttonLogin).toBeVisible();
        await expect(this.buttonLogin).toBeEnabled();
    }

    public async CheckInputEmail() {
        await expect(this.inputEmail).toBeVisible();
        await expect(this.inputEmail).toBeEmpty();
        await expect(this.inputEmail).toBeEditable();
    }

    public async CheckCheckButton() {
        await expect(this.checkButton).toBeDisabled();
    }

}