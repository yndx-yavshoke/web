import { Page, Locator } from "@playwright/test";


export class ShokUserPage {
    public userAvatar: Locator;
    public editButton: Locator;
    public logoutButton: Locator;

    public shokEmail: Locator;
    public shokTitle: Locator;
    public editPageTitle: Locator;
    public youngCat: Locator;
    public adultCat: Locator;
    public oldCat: Locator;


    constructor(public readonly page: Page) {
        this.userAvatar = this.page.getByTestId("user-avatar");
        this.editButton = this.page.getByTestId("user-edit-profile-button");
        this.logoutButton = this.page.getByTestId("user-logout-button");

        this.shokEmail = this.page.getByTestId("main-email-input");
        this.shokTitle = this.page.getByText("Я в ШОКе", {exact: true});
        this.editPageTitle = this.page.getByText('Edit Profile', {exact: true}).nth(1);

        this.youngCat = this.page.getByText("Ты молоденький котик", { exact: true });
        this.adultCat = this.page.getByText("Ты взрослый котик", { exact: true });
        this.oldCat = this.page.getByText("Ты старый котик", { exact: true });
    }

    public async open() {
        await this.page.goto('');
    }

    public async editUser() {
        await this.editButton.click();
    }

    public async logout() {
        await this.logoutButton.click();
    }
}