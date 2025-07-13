import {Page, Locator} from '@playwright/test'

export class ShokLoginPage{
    public title: Locator;
    public inputEmail: Locator;
    public inputPassword: Locator;
    public loginButton: Locator;
    public registerButton: Locator;
    public backButton: Locator;
    public warnMessage: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Войти в ШОК', {exact:true});
        this.inputEmail = this.page.getByTestId('login-email-input');
        this.inputPassword = this.page.getByTestId('login-password-input');
        this.loginButton = this.page.getByTestId('login-submit-button');
        this.registerButton = this.page.getByTestId('login-register-button');
        this.backButton = this.page.getByTestId('login-back-button');
        this.warnMessage = this.page.getByText('Неправильный логин или пароль');
    }

     public async open(){
        await this.page.goto('/login');
    }



}