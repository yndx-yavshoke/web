import { Page, Locator } from '@playwright/test';

export class ShokProfilePage {
    public status: Locator;
    public emailInput: Locator;
    public posts: Locator;
    public subscribers: Locator;
    public likes: Locator;
    // public edit: Locator;
    // public editInput: Locator;
    // public saveChanges: Locator;
    // public cancel: Locator;
    // public name: Locator;

  

    constructor(public readonly page: Page) {
        this.status = this.page.locator('//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div[2]');
        this.emailInput = this.page.getByTestId('main-email-input');
        this.posts = this.page.locator('//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[2]/div[1]/div[1]');
        this.subscribers = this.page.locator('//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[2]/div[2]');
        this.likes = this.page.locator('//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[2]/div[3]');
        // this.edit = this.page.getByTestId('user-edit-profile-button');
        // this.editInput = this.page.getByTestId('edit-name-input');
        // this.saveChanges = this.page.getByTestId('edit-save-button');
        // this.cancel = this.page.getByTestId('edit-cancel-button');
        // this.name = this.page.locator('//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div[1]');

    }

    public async open() {
        await this.page.goto('/');
    }
    // public async editProfile() {
    //     await this.edit.click();
    //     await this.editInput.fill('Котик');
    // }
}