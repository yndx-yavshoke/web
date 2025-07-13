import {Page, Locator} from '@playwright/test';

export class RenamePage {
    public title: Locator;
    public input: Locator;
    public saveButton: Locator;
    public cancelButton: Locator;
    public Name: Locator;

    constructor (public readonly page: Page) {
        this.title = this.page.getByText('Edit Profile', {exact: true});
        this.input = this.page.getByTestId('edit-name-input');
        this.saveButton = this.page.getByTestId('edit-save-button');
        this.cancelButton = this.page.getByTestId('edit-cancel-button');
        
    }

    public async open() {
        await this.page.goto('/edit');

        
    }

    public async enterName(name: string, valid: boolean) {
        await this.input.fill(name);
        await this.saveButton.click();


     
    }

    public async clickCancel() {

        await this.cancelButton.click();

     
    }
    public async enterNameButNotSave(name: string, valid: boolean) {
        await this.input.fill(name);

     
    }
}