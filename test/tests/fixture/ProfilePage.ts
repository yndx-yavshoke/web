import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";
import { editData } from "./edit/EditProfileData";

export class ProfilePage {
    public name: String;
    public status: Locator;
    public logoutButton: Locator;
    public editButton: Locator;
    public postImg: Locator;
    public avatar: Locator;
    public statistic: Locator;

    constructor(public readonly page: Page) {
        this.name = editData.name;
        this.status = this.page.getByText('Ты молоденький котик');
        this.logoutButton = this.page.getByTestId('user-logout-button');
        this.editButton = this.page.getByTestId('user-edit-profile-button');
        this.avatar = this.page.locator('//*[@id="root"]/div/div/div[7]/div/div/div/div/div[1]/div[1]/div[1]/div[1]/div/img');
        this.postImg = this.page.locator('//*[@id="root"]/div/div/div[7]/div/div/div/div/div[2]/div/div/div[1]/div/div[2]/div/div/img');
        this.statistic = this.page.locator('//*[@id="root"]/div/div/div[7]/div/div/div/div/div[1]/div[1]/div[2]');
    }
}