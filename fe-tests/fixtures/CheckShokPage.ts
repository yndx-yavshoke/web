import { Page, Locator } from '@playwright/test';

export class CheckShokPage {
    public emailInput: Locator;
    public checkShokovost: Locator;
    public successShok: Locator;
    public failShok: Locator;
    public gifCat: Locator;
  

    constructor(public readonly page: Page) {
        this.emailInput = this.page.getByTestId('main-email-input');
        this.checkShokovost = this.page.getByTestId('main-check-button');
        this.successShok = this.page.getByText('Ты уже в ШОКе', { exact: true });
        this.failShok = this.page.getByText('Ты еще не в ШОКе', { exact: true });
        this.gifCat = this.page.locator('//*[@id="root"]/div/div/div/div/div/div/div/div[2]/div/img');

    }

    public async open() {
        await this.page.goto('/');
    }
    
    public async checkInShok(email: string) {
        await this.emailInput.fill(email);
        await this.checkShokovost.click()
    }
}