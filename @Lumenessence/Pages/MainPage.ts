import { Page, Locator, expect } from '@playwright/test';

export class MainPage {
    public title: Locator;
    public input: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;
    public toInputPlaceholder: Locator;
    public happyCatImg: Locator;
    public InShockText: Locator;
    public notInShockText: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', {exact: true});
        this.input = this.page.getByTestId('main-email-input');
        this.checkButton = this.page.getByTestId('main-check-button');
        this.checkButton = this.page.getByText('Я в шоке?', { exact: true });
        this.toLoginButton = this.page.getByTestId('main-login-button');
        this.toLoginButton = this.page.getByText('В шок', { exact: true });
        this.toInputPlaceholder = this.page.getByPlaceholder('Введите email');
        this.happyCatImg = this.page.locator('img[src*="happyCat"]');
        this.InShockText = this.page.getByText('Ты уже в ШОКе', { exact: true });
        this.notInShockText = this.page.getByText('Ты еще не в ШОКе', { exact: true });
    }
    public async open() {
        await this.page.goto('/');
    }
    public async toLoginButtonClick() {
        await this.toLoginButton.click();
    }

    public async checkEmail(email: string, valid: boolean) {
        await this.input.fill(email);
        await this.checkButton.click();
        if (valid) {
            await expect(this.happyCatImg).toBeVisible();
        } else {
            await expect(this.notInShockText).toBeVisible();
        }
    }
}

