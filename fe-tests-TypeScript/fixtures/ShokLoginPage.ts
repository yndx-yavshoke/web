import { Page, Locator } from '@playwright/test';

export class ShokLoginPage {
    public title: Locator;
    public inputEmail: Locator;
    public inputEmailPlaceholder: Locator;
    public inputPassword: Locator;
    public inputPasswordPlaceholder: Locator;
    public loginButton: Locator;
    public loginButtonText: Locator;
    public backToMainButton: Locator;
    public backToMainButtonText: Locator;
    public toRegisterButton: Locator;
    public toRegisterButtonText: Locator;
    public warningEmptyEmail: Locator;
    public warningEmptyPassword: Locator;
    public warningIncorrectCredentials: Locator;


    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Войти в ШОК', { exact: true });
        
        this.inputEmail = this.page.getByTestId('login-email-input');
        this.inputEmailPlaceholder = this.page.getByPlaceholder('Email', { exact: true });

        this.inputPassword = this.page.getByTestId('login-password-input');
        this.inputPasswordPlaceholder = this.page.getByPlaceholder('Пароль', { exact: true });

        this.loginButton = this.page.getByTestId('login-submit-button');
        this.loginButtonText = this.page.getByText('В шок', { exact: true });

        this.backToMainButton = this.page.getByTestId('login-back-button');
        this.backToMainButtonText = this.page.getByText('Назад', { exact: true });

        this.toRegisterButton = this.page.getByTestId('login-register-button');
        this.toRegisterButtonText = this.page.getByText('Регистрация', { exact: true });

        this.warningEmptyEmail = this.page.getByText('Введите email');
        this.warningEmptyPassword = this.page.getByText('Введите пароль');
        this.warningIncorrectCredentials = this.page.getByText('Неправильный логин или пароль');
    };
    
    
    public async open() {
        await this.page.goto('/login');
    };
    
    public async login(email: string, password: string) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);

        await this.loginButton.click();
    };

}