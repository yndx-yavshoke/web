import { Page, Locator } from '@playwright/test';

export class HomeShokPage {
    readonly checkBtn: Locator;
    readonly loginNavBtn: Locator;
    readonly heading: Locator;
    readonly emailBox: Locator;

    constructor(private readonly page: Page) {
        this.checkBtn = page.getByTestId('main-check-button');
        this.loginNavBtn = page.getByTestId('main-login-button');
        this.heading = page.getByText('Я в ШОКе', { exact: true });
        this.emailBox = page.getByTestId('main-email-input');
    }

    async visit() {
        await this.page.goto('/');
    }
}
