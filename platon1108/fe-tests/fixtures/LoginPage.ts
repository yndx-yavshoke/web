import { Page, Locator } from "@playwright/test"

export class LoginPage {
    public header: Locator;
    public emailInput: Locator;
    public passwordInput: Locator;
    public loginButton: Locator;
    public backButton: Locator;
    public toRegisterButton: Locator;
    public authErrorText: Locator;
    public emptyEmailErrorText: Locator;
    public emptyPasswordErrorText: Locator;


    constructor(public readonly page: Page){
        this.header = this.page.getByText('Войти в ШОК', {exact: true});
        this.emailInput = this.page.getByTestId('login-email-input');
        this.passwordInput = this.page.getByTestId('login-password-input');
        this.loginButton = this.page.getByTestId('login-submit-button');
        this.backButton = this.page.getByTestId('login-back-button');
        this.toRegisterButton = this.page.getByTestId('login-register-button');
        this.authErrorText = this.page.getByText('Неправильный логин или пароль', {exact: true});
        this.emptyEmailErrorText = this.page.getByText('Введите email', {exact: true});
        this.emptyPasswordErrorText = this.page.getByText('Введите пароль', {exact: true});
    }

    public async open() {
        await this.page.goto('/login');
    }

    public async login(email: string, password: string){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}