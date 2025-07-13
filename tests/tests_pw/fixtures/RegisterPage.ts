import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    public title: Locator;
    public inputEmail: Locator;
    public inputPassword: Locator;
    public inputAge: Locator;
    public toRegisterButton: Locator;
    public toBackButton: Locator;
    public errorMessageExistEmail: Locator;
    public errorMessageInvalidEmail: Locator;
    public errorMessageInvalidPassword: Locator;
    public errorMessageInvalidAge: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Регистрация в ШОКе', { exact: true });
        this.inputEmail = this.page.getByTestId('register-email-input');
        this.inputPassword = this.page.getByTestId('register-password-input');
        this.inputAge = this.page.getByTestId('register-age-input');
        this.toRegisterButton = this.page.getByTestId('register-submit-button');
        this.toBackButton = this.page.getByTestId('register-back-button');
        this.errorMessageExistEmail = this.page.getByText('Пользователь с таким email уже существует', { exact: true });
        this.errorMessageInvalidEmail = this.page.getByText('Неправильный email-адрес');
        this.errorMessageInvalidPassword = this.page.getByText('Пароль должен содержать минимум 6 символов');
        this.errorMessageInvalidAge = this.page.getByText('Возраст должен быть числом');
    }

    public async open(url: string = '/register') {
        await this.page.goto(url);
    }

    public async register(email: string, password: string, age: string) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.inputAge.fill(age);
        await this.toRegisterButton.click();
    }
    public async goToBack() {
        await this.toBackButton.click();
    }
}