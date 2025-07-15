import {Page, Locator} from '@playwright/test';

export class LoginPage {
    public title: Locator;
    public emailInput: Locator;
    public passwordInput: Locator;
    public submitButton: Locator;
    public backButton: Locator;
    public registrationButton: Locator;
    public textInputPassword: Locator;
    public textInputEmail: Locator;
    public textWrongCredits: Locator;
    public textRegister: Locator;
    public textMain: Locator;


    constructor (public readonly page: Page) {
        this.title = this.page.getByText('Войти в ШОК', {exact: true});
        this.emailInput = this.page.getByTestId('login-email-input');
        this.passwordInput = this.page.getByTestId('login-password-input');
        this.submitButton = this.page.getByTestId('login-submit-button');
        this.backButton = this.page.getByTestId('login-back-button');
        this.registrationButton = this.page.getByTestId('login-register-button');
        this.textInputPassword = this.page.getByText('Введите пароль', {exact: true});
        this.textInputEmail = this.page.getByText('Введите email', {exact: true});
        this.textWrongCredits = this.page.getByText('Неправильный логин или пароль', {exact: true});
        this.textRegister = this.page.getByText('Регистрация в ШОКе', {exact: true});
        this.textMain = this.page.getByText('Я в ШОКе', {exact: true});
      
    }

    public async open() {
        await this.page.goto('/login');

        
    }

    public async login(email: string, password: string, valid: boolean) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        await this.submitButton.click();

     
    }

    public async clickRegistration() {
        await this.registrationButton.click();

        
    }

    public async clickBackToMain() {
        await this.backButton.click();

        
    }
}