import { Page, Locator } from '@playwright/test';

export class ShokRegisterPage {
    public title: Locator;
    public inputEmail: Locator;
    public inputEmailPlaceholder: Locator;
    public inputPassword: Locator;
    public inputPasswordPlaceholder: Locator;
    public inputAge: Locator;
    public inputAgePlaceholder: Locator;
    public registerButton: Locator;
    public registerButtonText: Locator;
    public backToLoginButton: Locator;
    public backToLoginButtonText: Locator;
    public warningEmptyEmail: Locator;
    public warningEmptyPassword: Locator;
    public warningEmptyAge: Locator;
    public warningExistingUser: Locator;
    public warningIncorrectEmail: Locator;
    public warningPasswordTooShort: Locator;
    public warningAgeIsNotInteger: Locator;
    

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Регистрация в ШОКе', { exact: true });

        this.inputEmail = this.page.getByTestId('register-email-input');
        this.inputEmailPlaceholder = this.page.getByPlaceholder('Email', { exact: true });

        this.inputPassword = this.page.getByTestId('register-password-input');
        this.inputPasswordPlaceholder = this.page.getByPlaceholder('Пароль', { exact: true });

        this.inputAge = this.page.getByTestId('register-age-input');
        this.inputAgePlaceholder = this.page.getByPlaceholder('Возраст', { exact: true });

        this.registerButton = this.page.getByTestId('register-submit-button');
        this.registerButtonText = this.page.getByText('Зарегистрироваться', { exact: true });

        this.backToLoginButton = this.page.getByTestId('register-back-button');
        this.backToLoginButtonText = this.page.getByText('Назад', { exact: true });

        this.warningEmptyEmail = this.page.getByText('Введите email');
        this.warningEmptyPassword = this.page.getByText('Введите пароль');
        this.warningEmptyAge = this.page.getByText('Введите возраст');
        this.warningExistingUser = this.page.getByText('Пользователь с таким email уже существует');
        this.warningIncorrectEmail = this.page.getByText('Неправильный email-адрес');
        this.warningPasswordTooShort = this.page.getByText('Пароль должен содержать минимум 6 символов');
        this.warningAgeIsNotInteger = this.page.getByText('Возраст должен быть числом');
    };
    
    
    public async open() {
        await this.page.goto('/register');
    };

    public async register(email: string, password: string, age: string) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.inputAge.fill(age);

        await this.registerButton.click();
    };

}