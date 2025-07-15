import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class UserNameUpdatePage {

    private readonly title : Locator;
    private readonly textName : Locator;
    private readonly inputName : Locator;
    private readonly saveChangesButton : Locator;
    private readonly cancelButton : Locator;
    private readonly textNameIsEmpty : Locator;
   


    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Edit Profile', { exact: true });
        this.textName = this.page.getByText('Name');
        this.inputName = this.page.getByTestId('edit-name-input');
        this.saveChangesButton = this.page.getByTestId('edit-save-button');
        this.cancelButton = this.page.getByTestId('edit-cancel-button');
        this.textNameIsEmpty = this.page.getByText('Name is required', { exact: true });
    }


    public async Open() {
        await this.page.goto('/edit');
        await expect(this.page).toHaveURL('/edit');
    }

    public async CheckTitle() {
        await expect(this.title).toBeVisible();
    }

    public async CheckTextName() {
        await expect(this.textName).toBeVisible();
    }

    public async CheckInputName() {
        await expect(this.inputName).toBeVisible();
        await expect(this.inputName).toBeEnabled();
    }

    public async CheckSaveChangesButton() {
        await expect(this.saveChangesButton).toBeVisible();
        await expect(this.saveChangesButton).toBeEnabled();
    }

    public async CheckCancelButton() {
        await expect(this.cancelButton).toBeVisible();
        await expect(this.cancelButton).toBeEnabled();
    }

    public async CheckNameIsEmpty() {
        await expect(this.textNameIsEmpty).toBeVisible();
    }

    public async UpdateName() {
        const name = faker.person.fullName();
        await this.inputName.fill(name);
        await this.saveChangesButton.click();
        await expect(this.saveChangesButton).toHaveText('Save Changes');
        await this.page.goto('/');
        await this.page.waitForURL('/');
        await expect(this.page).toHaveURL('/');
    }

    public async UpdateNameEmpty() {
        await this.saveChangesButton.click();
        await expect(this.saveChangesButton).toHaveText('Save Changes');
        await this.CheckNameIsEmpty();
        await this.cancelButton.click();


        await this.page.waitForURL('/');
        await expect(this.page).toHaveURL('/');
    }

}