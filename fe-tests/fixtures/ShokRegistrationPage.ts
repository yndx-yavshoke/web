import { Page, Locator, expect } from '@playwright/test';

export class ShokRegistrationPage {
    public title: Locator;
    public registerEmailInput: Locator;
    public registerPasswordInput: Locator;
    public registerAgeInput: Locator;
    public registerButton: Locator;
    public registerBackButton: Locator;
    public noEmail: Locator;
    public invalidEmail: Locator;
    public noPassword: Locator;
    public shortPassword: Locator;
    public noAge: Locator;
    public invalidAge: Locator;
    public emailAlreadyUsed: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText('Регистрация в ШОКе', {exact: true});
        this.registerEmailInput = this.page.getByTestId('register-email-input');
        this.registerPasswordInput = this.page.getByTestId('register-password-input');
        this.registerAgeInput = this.page.getByTestId('register-age-input');
        this.registerButton = this.page.getByTestId('register-submit-button');
        this.registerBackButton = this.page.getByTestId('register-back-button');
        this.noEmail = this.page.getByText('Введите email');
        this.invalidEmail = this.page.getByText('Неправильный email-адрес');
        this.noPassword = this.page.getByText('Введите пароль');
        this.shortPassword = this.page.getByText('Пароль должен содержать минимум 6 символов');
        this.noAge = this.page.getByText('Введите возраст');
        this.invalidAge = this.page.getByText('Возраст должен быть числом');
        this.emailAlreadyUsed = this.page.getByText('Пользователь с таким email уже существует');
    }
    public async open() {
        await this.page.goto('/register');
    }
    public async registerBackButtonClick() {
        await this.registerBackButton.click();
        await expect(this.page).toHaveURL('/login');
        }
    async submitForm() {
            await this.registerButton.click();
        }
    async fillForm(email: string, password: string, age: string) {
            await this.registerEmailInput.fill(email);
            await this.registerPasswordInput.fill(password);
            await this.registerAgeInput.fill(age);
        }
    async successfulRegistration(email: string, password: string, age: string) {
            await this.fillForm(email, password, age);
            await this.submitForm();
            await expect(this.page).toHaveURL('/');
        }
    async verifyEmptyFieldsValidation() {
            await this.submitForm();
            await expect(this.noEmail).toBeVisible();
            await expect(this.noPassword).toBeVisible();
            await expect(this.noAge).toBeVisible();
        }
        async verifyInvalidEmail(email: string) {
            await this.registerEmailInput.fill(email);
            await this.registerButton.click();
            await expect(this.invalidEmail).toBeVisible();
        }

        async verifyShortPassword(password: string) {
            await this.registerPasswordInput.fill(password);
            await this.registerButton.click();
            await expect(this.shortPassword).toBeVisible();
        }

        async verifyInvalidAge(age: string) {
            await this.registerAgeInput.fill(age);
            await this.registerButton.click();
            await expect(this.invalidAge).toBeVisible();
        }

        async verifyEmailAlreadyUsed(email: string, password: string, age: string) {
            await this.fillForm(email, password, age);
            await this.submitForm();
            await expect(this.emailAlreadyUsed).toBeVisible();
        }

    }
