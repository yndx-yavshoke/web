import { Page, Locator } from "@playwright/test"

export class EditProfilePage {
    public header: Locator;
    public fieldName: Locator;
    public input: Locator;
    public saveButton: Locator;
    public cancelButton: Locator;
    public errorText: Locator;


    constructor(public readonly page: Page){
        this.header = this.page.getByText('Edit Profile', {exact: true}).last();
        this.fieldName = this.page.locator('div.css-175oi2r > div').first();
        this.input = this.page.getByTestId('edit-name-input');
        this.saveButton = this.page.getByTestId('edit-save-button');
        this.cancelButton = this.page.getByTestId('edit-cancel-button');
        this.errorText = this.page.getByText('Name is required', {exact: true});
    }

    public async open() {
        await this.page.goto('/edit');
    }

    public async renameUser(name: string){
        await this.input.fill(name);
        await this.saveButton.click();
        await this.page.waitForTimeout(3000); // Saving might took several seconds
    }
}