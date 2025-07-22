import { Page, Locator, expect } from '@playwright/test';

export class UserRegisterPage {
    private readonly title : Locator;
    private readonly inputEmail : Locator;
    private readonly inputPassword : Locator;
    private readonly inputAge: Locator;
    private readonly registerButton : Locator;
    private readonly backButton : Locator;
    private readonly textEmailIsEmpty : Locator;
    private readonly textPasswordIsEmpty : Locator;
    private readonly textAgeIsEmpty : Locator;
    private readonly invalidEmail : Locator;
    private readonly invalidPassword : Locator;
    private readonly invalidAge : Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Регистрация в ШОКе', { exact: true });
        this.inputEmail = this.page.getByTestId('register-email-input');
        this.inputPassword = this.page.getByTestId('register-password-input');
        this.inputAge = this.page.getByTestId('register-age-input');
        this.registerButton = this.page.getByTestId('register-submit-button');
        this.backButton = this.page.getByTestId('register-back-button');
        this.textEmailIsEmpty = this.page.getByText('Введите email', { exact: true });
        this.textPasswordIsEmpty = this.page.getByText('Введите пароль', { exact: true });
        this.textAgeIsEmpty = this.page.getByText('Введите возраст', { exact: true });
        this.invalidEmail = this.page.getByText('Неправильный email-адрес', { exact: true });
        this.invalidPassword = this.page.getByText('Пароль должен содержать минимум 6 символов', { exact: true });
        this.invalidAge = this.page.getByText('Возраст должен быть числом', { exact: true });
    }

    public async Open() {
        await this.page.goto('/register');
        await expect(this.page).toHaveURL('/register');
    }

    public async Register(email: string, password: string, age: string, isValid : boolean) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.inputAge.fill(age);
        await this.registerButton.click();
        if (isValid) {
            await expect(this.page).toHaveURL('/');
        }
        else {
            await expect(this.invalidEmail).toBeVisible();
            await expect(this.invalidPassword).toBeVisible();
            await expect(this.invalidAge).toBeVisible();
        }
    }

    public async RegisterWithEmptyData(email: string, password: string, age: string) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.inputAge.fill(age);
        await this.registerButton.click();
        await expect(this.textEmailIsEmpty).toBeVisible();
        await expect(this.textPasswordIsEmpty).toBeVisible();
        await expect(this.textAgeIsEmpty).toBeVisible();
    }

    public async Back() {
        await this.backButton.click();
        await expect(this.page).toHaveURL('/login');
    }

    public async CheckTitle() {
        await expect(this.title).toBeVisible();
    }

    public async CheckInputEmail() {
        await expect(this.inputEmail).toBeVisible();
        await expect(this.inputEmail).toBeEnabled();
    }

    public async CheckInputPassword() {
        await expect(this.inputPassword).toBeVisible();
        await expect(this.inputPassword).toBeEnabled();
    }

    public async CheckInputAge() {
        await expect(this.inputAge).toBeVisible();
        await expect(this.inputAge).toBeEnabled();
    }

    public async CheckRegisterButton() {
        await expect(this.registerButton).toBeVisible();
        await expect(this.registerButton).toBeEnabled();
    }

    public async CheckBackButton() {
        await expect(this.backButton).toBeVisible();
        await expect(this.backButton).toBeEnabled();
    }

}