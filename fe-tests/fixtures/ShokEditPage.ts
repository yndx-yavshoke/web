import type { Page, Locator, expect } from '@playwright/test';

export class ShokEditPage {
    public title: Locator;
    public saveChangesButton: Locator;
    public cancelButton: Locator;
    public nameSpace: Locator;


    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Edit Profile');
        this.saveChangesButton = this.page.getByTestId('edit-save-button'); 
        this.cancelButton = this.page.getByTestId('edit-cancel-button');
        this.nameSpace = this.page.getByTestId('edit-name-input');
    }
    
    public async open() {
        await this.page.goto('/edit'); 
    }

    public async saveChanges(name: string) {
        await this.open()
        await this.nameSpace.fill(name)
        await this.saveChangesButton.click();
    }

    public async cancelChanges() {
        await this.open()
        await this.cancelButton.click();
    }
}