import type { Page, Locator} from "@playwright/test";
import { login, password} from "./data.spec"

export class NameChangingPage {
    public title: Locator;
    public name: Locator;
    public save: Locator;
    public cancel: Locator;

    constructor(public readonly page: Page) {
        this.title = page.getByText("Edit profile");
        this.name = page.getByTestId("edit-name-input");
        this.save = page.getByText("Save Changes");
        this.cancel = page.getByTestId("edit-cancel-button");
    }

    public async changeName(name: string | null): Promise<void> {
        if (name){
            this.name.fill(name);
        }
        await this.save.click();
    }

    public async open() {
            await this.page.goto("/login");
            await this.page.getByTestId("login-email-input").fill(login);
            await this.page.getByTestId("login-password-input").fill(password);
            await this.page.getByTestId("login-submit-button").click();
            await this.page.getByTestId("user-edit-profile-button").click();
        }

}