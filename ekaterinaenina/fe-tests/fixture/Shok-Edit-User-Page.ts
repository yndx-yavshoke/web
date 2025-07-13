import { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class ShokEditUserPage {
    public editButton: Locator;
    public userAvatar: Locator;
    public title: Locator;
    public nameInput: Locator;
    public saveButton: Locator;
    public cancelButton: Locator;
    public emptyNameAlert: Locator;
   

    constructor(public readonly page: Page) {
        this.editButton = this.page.getByTestId("user-edit-profile-button");
        this.userAvatar = this.page.getByTestId("user-avatar");
        this.title = this.page.getByText('Edit Profile', {exact: true}).nth(1);
        this.nameInput = this.page.getByTestId("edit-name-input");
        this.saveButton = this.page.getByTestId("edit-save-button");
        this.cancelButton = this.page.getByTestId("edit-cancel-button");
        this.emptyNameAlert = this.page.getByText("Name is required", { exact: true });
    }

    public async openEditPage() {
        await this.page.goto('');
        await this.editButton.click();
    }
    
    public async fillName(name: string) {
        await this.nameInput.fill(name);
    }

     public async editName(name: string) {
        await this.nameInput.fill(name);
        await this.saveButton.click();
    }

    public async clickCancelButton() {
        await this.cancelButton.click();
    }
}