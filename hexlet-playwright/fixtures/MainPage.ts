import {Page, Locator} from '@playwright/test';

export class MainPage {
    public title: Locator;
    public input: Locator;
    public checkButton: Locator;
    public toLoginButton: Locator;
    public textExist: Locator;
    public textNotExist: Locator;
    public textAuth: Locator;

    constructor (public readonly page: Page) {
        this.title = this.page.getByText('Я в ШОКе', {exact: true});
        this.input = this.page.getByTestId('main-email-input');
        this.checkButton = this.page.getByTestId('main-check-button');
        this.toLoginButton = this.page.getByTestId('main-login-button');
        this.textExist = this.page.getByText('Ты уже в ШОКе', {exact: true});
        this.textNotExist = this.page.getByText('Ты еще не в ШОКе', {exact: true});
        this.textAuth = this.page.getByText('Войти в ШОК', {exact: true});
        
      
    }

    public async open() {
        await this.page.goto('/');

        
    }

    public async checkEmail(email: string, valid: boolean) {
        await this.input.fill(email);
        await this.checkButton.click();

     
    }

    public async clickLogin() {

        await this.toLoginButton.click();

     
    }

}