import { Page, Locator } from '@playwright/test'

export class ShokUserPage {
    public userEditPfofileButton: Locator;
    public userLogoutButton: Locator;

    constructor(public readonly page: Page) {
        this.userEditPfofileButton = this.page.getByTestId('user-edit-profile-button');
        this.userLogoutButton = this.page.getByTestId('user-logout-button');
    }

    public async open() {
        await this.page.goto('/');
    }
}