import { Locator, Page, expect } from '@playwright/test';

export class MainPage {
    readonly emailInput: Locator;
    readonly checkButton: Locator;
    readonly happyCatImage: Locator;
    readonly registeredUserText: Locator;
    readonly unregisteredUserText: Locator;
    readonly emailPlaceholder: Locator;
    readonly pageTitle: Locator;

    constructor(public readonly page: Page) {
        this.emailInput = page.getByTestId('main-email-input');
        this.checkButton = page.getByTestId('main-check-button');
        this.happyCatImage = page.locator('img[src="/assets/assets/images/happyCat.dc65bea1e04c6d8f94d14b1d6f3c687f.gif"]');
        this.registeredUserText = page.getByText('Ты уже в ШОКе', {exact: true});
        this.unregisteredUserText = page.getByText('Ты еще не в ШОКе', {exact: true});
        this.emailPlaceholder = page.getByPlaceholder('Введите email', {exact: true});
        this.pageTitle = page.getByText('Я в ШОКе', {exact: true});
    }

    async open() {
        await this.page.goto('/');
    }

    async checkEmail(email: string) {
        await this.emailInput.fill(email);
        await this.checkButton.click();
    }

    async expectHappyCatVisible() {
        await expect(this.happyCatImage).toBeVisible();
    }

    async expectRegisteredUserMessage() {
        await expect(this.registeredUserText).toBeVisible();
    }

    async expectUnregisteredUserMessage() {
        await expect(this.unregisteredUserText).toBeVisible();
    }

    async expectCheckButtonDisabled() {
        await expect(this.checkButton).toBeDisabled();
    }

    async expectEmailPlaceholderVisible() {
        await expect(this.emailPlaceholder).toBeVisible();
    }

    async expectPageTitleVisible() {
        await expect(this.pageTitle).toBeVisible();
    }
}

