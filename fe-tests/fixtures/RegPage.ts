import { Page, Locator } from '@playwright/test'

export class ShockRegPage {
    public title: Locator;
    public mailInput: Locator;
    public passwordInput: Locator;
    public ageInput: Locator;
    public regButton: Locator;
    public backButton: Locator;
    public noEmailError: Locator;
    public noPasswordError: Locator;
    public noAgeError: Locator;
    public oldEmailError: Locator;
    //дописать остальные сообщения об ошибках

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Регистрация в ШОКе', { exact: true });
        this.regButton = this.page.getByTestId('register-submit-button');
        this.backButton = this.page.getByTestId('register-back-button');
        this.mailInput = this.page.getByTestId('register-email-input');
        this.passwordInput = this.page.getByTestId('register-password-input');
        this.ageInput = this.page.getByTestId('register-age-input');
        this.noEmailError = this.page.getByText('Введите email', { exact: true });
        this.noPasswordError = this.page.getByText('Введите пароль', { exact: true });
        this.noAgeError = this.page.getByText('Введите возраст', { exact: true });
        this.oldEmailError = this.page.getByText('Пользователь с таким email уже существует', { exact: true });       
    }

    public async open() {
        await this.page.goto('/register');
    }

    public async register(email: string, password: string, age: string) {
        await this.mailInput.fill(email);
        await this.mailInput.fill(password);
        await this.mailInput.fill(age);
        await this.regButton.click();
    }

}