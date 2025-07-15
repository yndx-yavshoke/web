import { Page, Locator, expect } from '@playwright/test';

export class UserLoginPage {
    private readonly title : Locator;
    private readonly inputEmail : Locator;
    private readonly passwordEmail : Locator;
    private readonly loginButton : Locator;
    private readonly backButton : Locator;
    private readonly registerButton : Locator;
    private readonly textEmailIsEmpty : Locator;
    private readonly textPasswordIsEmpty : Locator;
    private readonly textError : Locator;
    private readonly textInvalidEmailOrPassword : Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Войти в ШОК', { exact: true });
        this.inputEmail = this.page.getByTestId('login-email-input');
        this.passwordEmail = this.page.getByTestId('login-password-input');
        this.loginButton = this.page.getByTestId('login-submit-button');
        this.backButton = this.page.getByTestId('login-back-button');
        this.registerButton = this.page.getByTestId('login-register-button');
        this.textEmailIsEmpty = this.page.getByText('Введите email', { exact: true });
        this.textPasswordIsEmpty = this.page.getByText('Введите пароль', { exact: true });
        this.textError = this.page.getByText('Произошла ошибка', { exact: true });
        this.textInvalidEmailOrPassword = this.page.getByText('Неправильный логин или пароль', { exact: true });
    }

    public async Open() {
        await this.page.goto('/login');
        await expect(this.page).toHaveURL('/login');
    }

    public async Login(email: string, password: string, isRegistered : boolean) {
        await this.inputEmail.fill(email);
        await this.passwordEmail.fill(password);
        await this.loginButton.click();
        if (!isRegistered) {
            await expect(this.textError).toBeVisible();
        }
    }

    public async Back() {
        await this.backButton.click();
        await expect(this.page).toHaveURL('/');
    }

    public async Register() {
        await this.registerButton.click();
        await expect(this.page).toHaveURL('/register');
    }

    public async CheckTitle() {
        await expect(this.title).toBeVisible();
    }

    public async CheckInputEmail() {
        await expect(this.inputEmail).toBeVisible();
        await expect(this.inputEmail).toBeEnabled();
    }

    public async CheckInputPassword() {
        await expect(this.passwordEmail).toBeVisible();
        await expect(this.passwordEmail).toBeEnabled();
    }

    public async CheckBackButton() {
        await expect(this.backButton).toBeVisible();
        await expect(this.backButton).toBeEnabled();
    }

    public async CheckRegisterButton() {
        await expect(this.registerButton).toBeVisible();
        await expect(this.registerButton).toBeEnabled();
    }

    public async LoginWithEmptyData() {
        await this.loginButton.click();
        await expect(this.textEmailIsEmpty).toBeVisible();
        await expect(this.textPasswordIsEmpty).toBeVisible();
    }

    public async LoginWithInvalidEmailOrPassword(email: string, password: string) {
        await this.inputEmail.fill(email);
        await this.passwordEmail.fill(password);
        await this.loginButton.click();
        await expect(this.textInvalidEmailOrPassword).toBeVisible();
    }
}