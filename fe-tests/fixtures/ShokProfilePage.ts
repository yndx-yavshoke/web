import { Page, Locator } from '@playwright/test';

export class ShokProfilePage {
    public status: Locator;
    public emailInput: Locator;
    public posts: Locator;
    public subscribers: Locator;
    public likes: Locator;
   
    constructor(public readonly page: Page) {
        this.status = this.page.locator('//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div[2]');
        this.emailInput = this.page.getByTestId('main-email-input');
        this.posts = this.page.locator('//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[2]/div[1]/div[1]');
        this.subscribers = this.page.locator('//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[2]/div[2]');
        this.likes = this.page.locator('//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[2]/div[3]');
    }

    public async open() {
        await this.page.goto('/');
    }
}