import { Page, Locator } from "@playwright/test"

export class ShokMainPage {
    public header: Locator;
    public input: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;
    public happyCatGIF: Locator;
    public alreadyInShokHeader: Locator;
    public notInShokHeader: Locator;


    constructor(public readonly page: Page){
        this.header = this.page.getByText('Я в ШОКе', {exact: true});
        this.input = this.page.getByTestId('main-email-input');
        this.checkButton = this.page.getByTestId('main-check-button');
        this.toLoginButton = this.page.getByTestId('main-login-button');
        this.alreadyInShokHeader = this.page.getByText('Ты уже в ШОКе', {exact: true});
        this.notInShokHeader = this.page.getByText('Ты еще не в ШОКе', {exact: true});
        this.happyCatGIF = this.page.getByRole('img');
    }

    public async open() {
        await this.page.goto('/');
    }

    public async checkEmail(email: string){
        await this.input.fill(email);
        await this.checkButton.click();
    }

}