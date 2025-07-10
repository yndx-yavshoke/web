import { Page, Locator, expect } from "@playwright/test";
import { endpoints } from "../constants/testData"

export class ShokMainPage{
    public title: Locator;
    public input: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;
    public inShockGif: Locator;
    public youInShokText: Locator;
    public youNotInShokText: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', {exact : true});
        this.input = this.page.getByTestId("main-email-input");
        this.checkButton = this.page.getByText('Я в шоке?', {exact : true });
        this.toLoginButton = this.page.getByText('В шок', {exact : true});
        this.inShockGif = this.page.locator('img[src*=".gif"]');
        this.youInShokText = this.page.getByText('Ты уже в ШОКе', {exact : true});
        this.youNotInShokText = this.page.getByText("Ты еще не в ШОКе", {exact : true})
    }

    public async open() {
        await this.page.goto(endpoints.enpointMain);
    }

    public async checkEmail(email: string) {
        await this.input.fill(email);
        await this.checkButton.click();
    }

    public async checkEmailTrue(email: string) {
        this.checkEmail(email)
        await expect(this.inShockGif).toBeVisible();
        await expect(this.youInShokText).toBeVisible();
    }

    public async checkEmailFalse(email: string) {
        this.checkEmail(email)
        await expect(this.youNotInShokText).toBeVisible();
    }
}