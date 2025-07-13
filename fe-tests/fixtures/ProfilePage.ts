import type { Page, Locator} from "@playwright/test";

export class ProfilePage{
    public edit: Locator;
    public logout: Locator;

    
    constructor(public readonly page: Page){
        this.edit = page.getByTestId("user-edit-profile-button")
        this.logout = page.getByTestId("user-logout-button")
    }

    public async open() {
        await this.page.goto("/");
    }
}