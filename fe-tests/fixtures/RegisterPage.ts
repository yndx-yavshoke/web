import {Page, Locator, expect} from "@playwright/test";
export class RegisterPage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly ageInput: Locator;
    readonly registerButton: Locator;
    readonly emailEmptyError: Locator;
    readonly passwordEmptyError: Locator;
    readonly ageEmptyError: Locator;
    readonly passwordPlaceholder: Locator;
    readonly emailPlaceholder: Locator;
    readonly agePlaceholder: Locator;
    readonly emailWrongError: Locator;
    readonly NonNumericAgeError: Locator;


    constructor(public readonly page: Page) {
        this.emailInput = page.getByTestId('register-email-input');
        this.passwordInput = page.getByTestId('register-password-input');
        this.ageInput = page.getByTestId('register-age-input');
        this.registerButton = page.getByTestId('register-submit-button');
        this.emailEmptyError = page.getByText('Введите email', {exact: true});
        this.passwordEmptyError = page.getByText('Введите пароль', {exact: true});
        this.emailWrongError = page.getByText('Неправильный email-адрес', {exact: true})
        this.ageEmptyError = page.getByText('Введите возраст', {exact: true});
        this.passwordPlaceholder = this.page.getByPlaceholder('Пароль', {exact: true});
        this.emailPlaceholder = this.page.getByPlaceholder('Email', {exact: true});
        this.agePlaceholder = this.page.getByPlaceholder('Возраст', {exact: true});
        this.NonNumericAgeError = this.page.getByText('Возраст должен быть числом', {exact: true});
    }

    public async open() {
        await this.page.goto('/register');
    }

    public async register(email: string, password: string, age: any) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.ageInput.fill(age);
        await this.registerButton.click();
    }

    async expectEmptyEmailMessage() {
        await expect(this.emailEmptyError).toBeVisible();
    }

    async expectEmptyPasswordMessage() {
        await expect(this.passwordEmptyError).toBeVisible();
    }

    async expectEmptyAgeMessage() {
        await expect(this.ageEmptyError).toBeVisible();
    }
