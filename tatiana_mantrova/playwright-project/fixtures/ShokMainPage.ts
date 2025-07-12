import { Page, Locator } from '@playwright/test'

export class ShokMainPage {
    public title: Locator;
    public emailInput: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;
    public youAreInShokLabel: Locator; 
    public youAreNotInShokLabel: Locator; 

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', { exact: true });
        this.emailInput = this.page.getByTestId('main-email-input');
        this.checkButton = this.page.getByTestId('main-check-button');
        this.toLoginButton = this.page.getByTestId('main-login-button');
        this.youAreInShokLabel = this.page.getByText('Ты уже в ШОКе', { exact: true });
        this.youAreNotInShokLabel = this.page.getByText('Ты еще не в ШОКе', { exact: true });
    }

    public async open() {
        await this.page.goto('/');
    }

    public async checkIsUserExist(email: string) {
        await this.emailInput.fill(email);
        await this.checkButton.click();
    }
}