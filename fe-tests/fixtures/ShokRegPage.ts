import {Page, Locator} from '@playwright/test'

export class ShokRegPage{
    public title: Locator;
    public inputEmail: Locator;
    public inputPassword: Locator;
    public inputAge: Locator;
    public regButton: Locator;
    public backButton: Locator;


    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Регистрация в ШОКе', {exact:true});
        this.inputEmail = this.page.getByTestId('register-email-input');
        this.inputPassword = this.page.getByTestId('register-password-input');
        this.inputAge = this.page.getByTestId('register-age-input');
        this.regButton = this.page.getByTestId('register-submit-button');
        this.backButton = this.page.getByTestId('register-back-button');

    }

     public async open(){
        await this.page.goto('/register');
    }



}