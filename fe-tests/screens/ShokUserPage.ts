import { Page, Locator } from "@playwright/test"

export class ShokUserPage{
    public userAvatar: Locator;
    public lineUserNickName: Locator;
    public lineUserStatus: Locator;
    public buttonEditProfile: Locator;
    public buttonLogOut: Locator;


    constructor (public readonly page: Page) {
        this.userAvatar = this.page.locator('img[src*=".gif"]');
        this.lineUserNickName = this.page.getByText("Neko", { exact : true });
        this.lineUserStatus = this.page.getByText("Ты молоденький котик", { exact : true});
        this.buttonEditProfile = this.page.getByTestId("user-edit-profile-button");
        this.buttonLogOut = this.page.getByTestId("user-logout-button")
    }

    public async logout(){
        await this.buttonLogOut.click();
    }
}
