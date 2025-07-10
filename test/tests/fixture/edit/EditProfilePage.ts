import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class EditProfilePage {
    public title: Locator;
    public nameInput: Locator;
    public saveChangesButton: Locator;
    public cancelButton: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Edit Profile');
        this.nameInput = this.page.getByTestId('edit-name-input');
        this.saveChangesButton = this.page.getByTestId('edit-save-button');
        this.cancelButton = this.page.getByTestId('edit-cancel-button');
    }
}