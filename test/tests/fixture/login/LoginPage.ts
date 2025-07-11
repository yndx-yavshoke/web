import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class LoginPage {
    public inputEmail: Locator;
    public inputPassword: Locator;
    public loginButton: Locator;
    public title: Locator;
    public goBackButton: Locator;
    public registerButton: Locator;
    public URL: String;

    constructor(public readonly page: Page){
        this.inputEmail = this.page.getByTestId('login-email-input');
        this.inputPassword = this.page.getByTestId('login-password-input');
        this.loginButton = this.page.getByTestId('login-submit-button');
        this.title = this.page.getByText('Войти в ШОК', {exact: true});
        this.goBackButton = this.page.getByTestId('login-back-button');
        this.registerButton = this.page.getByTestId('login-register-button');
        this.URL = this.page.url();
    }
}