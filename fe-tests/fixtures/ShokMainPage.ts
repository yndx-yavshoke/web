import type {Page, Locator} from '@playwright/test';

export class ShokMainPage{
    public title: Locator;
    public input: Locator;
    public CheckButton: Locator;
    public toLogin  : Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', {exact: true});
        this.input = this.page.getByTestId('main-email-input');
        this.CheckButton = this.page.getByTestId('main-check-button');
        this.toLogin = this.page.getByTestId('main-login-button');
    
    }

    public async open(){
        await this.page.goto('/');
    }

    public async checkEmail(email: string){
        await this.input.fill(email);
        await this.CheckButton.click()
    }
}