import { Page, Locator } from '@playwright/test'

export class ShokRegistrationPage{
    public title: Locator;
    public inputEmail: Locator;
    public inputPassword: Locator;
    public inputAge: Locator;
    public registerButon: Locator;
    public backButton: Locator;
    public lineEmail: Locator;
    public linePassword: Locator;
    public lineAge: Locator;
    public lineEmailAlreadyExists: Locator;
    public lineErrorLenPassword: Locator;
    public lineErrorAgeNumber: Locator;
    public lineErrorEmail: Locator;



    constructor(public readonly page: Page) {
        this.title = this.page.getByText("Регистрация в ШОКе", { exact : true});
        this.inputEmail = this.page.getByTestId("register-email-input");
        this.inputPassword = this.page.getByTestId("register-password-input");
        this.inputAge = this.page.getByTestId("register-age-input");
        this.registerButon = this.page.getByTestId("register-submit-button");
        this.backButton = this.page.getByTestId("register-back-button");
        this.lineEmail = this.page.getByText("Введите email", { exact : true});
        this.linePassword = this.page.getByText("Введите пароль", { exact : true});
        this.lineAge = this.page.getByText("Введите возраст", { exact : true});
        this.lineEmailAlreadyExists = this.page.getByText("Пользователь с таким email уже существует", { exact : true});
        this.lineErrorLenPassword = this.page.getByText("Пароль должен содержать минимум 6 символов", { exact: true});
        this.lineErrorAgeNumber = this.page.getByText("Возраст должен быть числом", { exact : true});
        this.lineErrorEmail = this.page.getByText("Неправильный email-адрес", { exact : true });
    }

    public async open() {
        await this.page.goto('/register');
    }

    public async registNewUser(email: string, password: string, age: string) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.inputAge.fill(age);
        await this.registerButon.click();
    }

}