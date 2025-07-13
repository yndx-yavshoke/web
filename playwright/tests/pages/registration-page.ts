import { Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { RegistrationData } from '../types';

export class RegistrationPage extends BasePage {
    // Locators
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly ageInput: Locator;
    private readonly submitButton: Locator;
    private readonly emailRequiredMessage: Locator;
    private readonly passwordRequiredMessage: Locator;
    private readonly ageRequiredMessage: Locator;
    private readonly existUserMessage: Locator;
    private readonly wrongEmailMessage: Locator;
    private readonly tooShortPasswordMessage: Locator;
    private readonly notNumericAgeMessage: Locator;

    constructor(page: any) {
        super(page);
        this.nameInput = this.page.getByTestId('register-name-input');
        this.emailInput = this.page.getByTestId('register-email-input');
        this.passwordInput = this.page.getByTestId('register-password-input');
        this.ageInput = this.page.getByTestId('register-age-input');
        this.submitButton = this.page.getByTestId('register-submit-button');
        this.emailRequiredMessage = this.page.getByText("Введите email", { exact: true });
        this.passwordRequiredMessage = this.page.getByText("Введите пароль", { exact: true });
        this.ageRequiredMessage = this.page.getByText("Введите возраст", { exact: true });
        this.wrongEmailMessage = this.page.getByText("Неправильный email-адрес", { exact: true });
        this.tooShortPasswordMessage = this.page.getByText("Пароль должен содержать минимум 6 символов", { exact: true });
        this.notNumericAgeMessage = this.page.getByText("Возраст должен быть числом", { exact: true });
        this.existUserMessage = this.page.getByText("Пользователь с таким email уже существует", { exact: true });
    }

    /**
     * Открытие страницы регистрации
     */
    async open(): Promise<void> {
        await this.page.goto('/register');
        await this.waitForPageLoad();
    }

    /**
     * Регистрация с полными данными
     */
    async register(data: RegistrationData): Promise<void> {
        await this.registerWithCredentials(data.email, data.password, data.age, data.name);
    }

    /**
     * Регистрация с указанными данными
     */
    async registerWithCredentials(email: string, password: string, age: string, name?: string): Promise<void> {
        if (name) {
            await this.fillField(this.nameInput, name);
        }
        await this.fillField(this.emailInput, email);
        await this.fillField(this.passwordInput, password);
        await this.fillField(this.ageInput, age);
        await this.clickElement(this.submitButton);
        await this.waitForPageLoad();
    }

    /**
     * Проверка ошибки существующего пользователя
     */
    async expectExistingUserError(): Promise<void> {
        await this.expectElementVisible(this.existUserMessage);
    }

    /**
     * Проверка ошибки пустого email
     */
    async expectEmptyEmailError(): Promise<void> {
        await this.expectElementVisible(this.emailRequiredMessage);
    }

    /**
     * Проверка ошибки пустого пароля
     */
    async expectEmptyPasswordError(): Promise<void> {
        await this.expectElementVisible(this.passwordRequiredMessage);
    }

    /**
     * Проверка ошибки пустого возраста
     */
    async expectEmptyAgeError(): Promise<void> {
        await this.expectElementVisible(this.ageRequiredMessage);
    }

    /**
     * Проверка ошибки неправильного email
     */
    async expectWrongEmailError(): Promise<void> {
        await this.expectElementVisible(this.wrongEmailMessage);
    }

    /**
     * Проверка ошибки короткого пароля
     */
    async expectTooShortPasswordError(): Promise<void> {
        await this.expectElementVisible(this.tooShortPasswordMessage);
    }

    /**
     * Проверка ошибки нечислового возраста
     */
    async expectNotNumericAgeError(): Promise<void> {
        await this.expectElementVisible(this.notNumericAgeMessage);
    }

    /**
     * Проверка успешной регистрации
     */
    async expectSuccessfulRegistration(): Promise<void> {
        await this.page.waitForSelector('[data-testid="user-logout-button"]', { state: 'visible' });
    }

    /**
     * Заполнение поля email
     */
    async fillEmail(email: string): Promise<void> {
        await this.fillField(this.emailInput, email);
    }

    /**
     * Заполнение поля пароля
     */
    async fillPassword(password: string): Promise<void> {
        await this.fillField(this.passwordInput, password);
    }

    /**
     * Заполнение поля возраста
     */
    async fillAge(age: string): Promise<void> {
        await this.fillField(this.ageInput, age);
    }

    /**
     * Отправка формы
     */
    async submitForm(): Promise<void> {
        await this.clickElement(this.submitButton);
        await this.waitForPageLoad();
    }

    /**
     * Проверка URL страницы регистрации
     */
    async expectRegistrationUrl(): Promise<void> {
        await this.expectUrl(/register/);
    }
} 