import { Page, Locator } from "@playwright/test"

export class RegisterPage {
    public header: Locator;
    public emailInput: Locator;
    public passwordInput: Locator;
    public ageInput: Locator;
    public registerButton: Locator;
    public backButton: Locator;
    public emptyEmailErrorText: Locator;
    public incorrectEmailErrorText: Locator;
    public alreadyRegisteredEmailErrorText: Locator;
    public emptyPasswordErrorText: Locator;
    public tooShortPasswordErrorText: Locator;
    public tooLongPasswordErrorText: Locator;
    public emptyAgeErrorText: Locator;
    public NaNAgeErrorText: Locator;
    public outOfRangeAgeErrorText: Locator;


    constructor(public readonly page: Page){
        this.header = this.page.getByText('Регистрация в ШОКе', {exact: true});
        this.emailInput = this.page.getByTestId('register-email-input');
        this.passwordInput = this.page.getByTestId('register-password-input');
        this.ageInput = this.page.getByTestId('register-age-input');
        this.registerButton = this.page.getByTestId('register-submit-button');
        this.backButton = this.page.getByTestId('register-back-button');
        this.emptyEmailErrorText = this.page.getByText('Введите email', {exact: true});
        this.incorrectEmailErrorText = this.page.getByText('Неправильный email-адрес', {exact: true});
        this.alreadyRegisteredEmailErrorText = this.page.getByText('Пользователь с таким email уже существует', {exact: true});
        this.emptyPasswordErrorText = this.page.getByText('Введите пароль', {exact: true});
        this.tooShortPasswordErrorText = this.page.getByText('Пароль должен содержать минимум 6 символов', {exact: true});
        this.tooLongPasswordErrorText = this.page.getByText('Пароль должен содержать максимум 20 символов', {exact: true});
        this.emptyAgeErrorText = this.page.getByText('Введите возраст', {exact: true});
        this.NaNAgeErrorText = this.page.getByText('Возраст должен быть числом', {exact: true});
        this.outOfRangeAgeErrorText = this.page.getByText('Возраст должен быть от 0 до 99 лет', {exact: true});
    }

    public async open() {
        await this.page.goto('/register');
    }

    public async register(email: string, password: string, age: string){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.ageInput.fill(age);
        await this.registerButton.click();
    }
}