import { Page, Locator } from '@playwright/test';
import { urlToHttpOptions } from 'url';

export class ShokLoginPage {
    public loginEmail: Locator;
    public loginPassword: Locator;
    public loginSubmit: Locator;
    public emptyEmail: Locator;
    public emptyPassword: Locator;
    public logoutButton: Locator;
    public wrongEmailOrPassword: Locator;
    public loginRegisterButton: Locator;
    public registerEmail: Locator;
    public registerPassword: Locator;
    public registerAge: Locator;
    public registerSubmit: Locator;
    
    
  

    constructor(public readonly page: Page) {
        this.loginEmail = this.page.getByTestId('login-email-input');
        this.loginPassword = this.page.getByTestId('login-password-input');
        this.loginSubmit = this.page.getByTestId('login-submit-button');
        this.emptyEmail = this.page.getByText('Введите email');
        this.emptyPassword = this.page.getByText('Введите пароль');
        this.logoutButton = this.page.getByTestId('user-logout-button');
        this.wrongEmailOrPassword = this.page.getByText('Неправильный логин или пароль');
        this.loginRegisterButton = this.page.getByTestId('login-register-button');
        this.registerEmail = this.page.getByTestId('register-email-input');
        this.registerPassword = this.page.getByTestId('register-password-input');
        this.registerAge = this.page.getByTestId('register-age-input');
        this.registerSubmit = this.page.getByTestId('register-submit-button');
        
    }

    public async open() {
        await this.page.goto('/login');
    }

    public async submitLoginPassword(login: string, password: string) {
        await this.loginEmail.fill(login);
        await this.loginPassword.fill(password);
        await this.loginSubmit.click()
    }

    public async generateTestUser() {
        const timestamp = Date.now();
        return {
            email: `test${timestamp}@yandex.ru`,
            password: 'test123', // простой пароль для тестов
            age: Math.floor(Math.random() * 100).toString()
        };
    }

    
}