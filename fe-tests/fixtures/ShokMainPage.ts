import {Page, Locator} from '@playwright/test'

export class ShokMainPage{
    public title: Locator;
    public input: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;
    public titleNotShok: Locator;
    public titleInShok: Locator;
    public happyCatGIF: Locator;


    constructor(public readonly page: Page){
        this.title = this.page.getByText('Я в ШОКе', {exact:true});
        this.input = this.page.getByTestId('main-email-input');
        this.checkButton = this.page.getByTestId('main-check-button');
        this.toLoginButton = this.page.getByTestId('main-login-button');
        this.titleNotShok = this.page.getByText('Ты еще не в ШОКе', {exact:true})
        this.titleInShok = this.page.getByText('Ты уже в ШОКе', {exact:true});
        this.happyCatGIF = this.page.locator('img[src*="/assets/assets/images/happyCat"]')
    }

    public async open(){
        await this.page.goto('/');
    }

    public async checkEmail(email: string){
        await this.input.fill(email);
        await this.checkButton.click();
    }
}