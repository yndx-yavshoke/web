import { Page, Locator } from "@playwright/test";


export class ShokMainPage {
    public title: Locator;
    public input: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;
    public userInShock: Locator;
    public userNotInShock: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText("Я в ШОКе", {exact: true});
        this.input = this.page.getByTestId("main-email-input");
        this.checkButton = this.page.getByTestId("main-check-button");
        this.toLoginButton = this.page.getByTestId("main-login-button");
        this.userInShock = this.page.getByText("Ты уже в ШОКе", { exact: true });
        this.userNotInShock = this.page.getByText("Ты еще не в ШОКе", { exact: true });
    }


    public async open() {
        await this.page.goto('');
    }
    
    public async checkEmail(email: string) {
        await this.input.fill(email);
        await this.checkButton.click();
    }

    public async goToLoginPage() {
        await this.toLoginButton.click();
    }
}