import type { Page, Locator, expect } from '@playwright/test';

export class ShokProfilePage {
    public name: Locator;
    public editButton: Locator;
    public logoutButton: Locator;
    public ageStatus: Locator;


    constructor(public readonly page: Page) {
        this.name = this.page.locator('css-146c3p1 r-vw2c0b r-15zivkp r-evnaw');
        this.editButton = this.page.getByTestId('user-edit-profile-button'); 
        this.logoutButton = this.page.getByTestId('user-logout-button');
        this.ageStatus = this.page.locator('css-146c3p1 r-1khnkhu r-15d164r r-ubezar');
    }

    public async open() {
        await this.page.goto('/'); 
    }

    public async goEdit() {
//        await this.open()
        await this.editButton.click();
    }

    public async goLogOut() {
//        await this.open()
        await this.logoutButton.click();
    }
}