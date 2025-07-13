import { Page, Locator } from "@playwright/test";


export class ShokUserPage {
    public userAvatar: Locator;
    public editButton: Locator;
    public logoutButton: Locator;

    public shokEmail: Locator;
    public shokTitle: Locator;
    public editPageTitle: Locator;
    public youAreCat: Locator;


    constructor(public readonly page: Page) {
        this.userAvatar = this.page.getByTestId("user-avatar");
        this.editButton = this.page.getByTestId("user-edit-profile-button");
        this.logoutButton = this.page.getByTestId("user-logout-button");

        this.shokEmail = this.page.getByTestId("main-email-input");
        this.shokTitle = this.page.getByText("Я в ШОКе", {exact: true});
        this.editPageTitle = this.page.getByText('Edit Profile', {exact: true}).nth(1);

        this.youAreCat = this.page.getByText(/Ты (молоденький|взрослый|старый) котик/);
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