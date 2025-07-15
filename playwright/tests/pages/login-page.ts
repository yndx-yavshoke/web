import { Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { User } from '../types';

export class LoginPage extends BasePage {
    // Locators
    private readonly title: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;
    private readonly registerButton: Locator;
    private readonly backButton: Locator;
    private readonly errorMessage: Locator;
    private readonly emptyEmailError: Locator;
    private readonly emptyPasswordError: Locator;

    constructor(page: any) {
        super(page);
        this.title = this.page.getByText('Войти в ШОК', { exact: true });
        this.emailInput = this.page.getByTestId('login-email-input');
        this.passwordInput = this.page.getByTestId('login-password-input');
        this.submitButton = this.page.getByTestId('login-submit-button');
        this.registerButton = this.page.getByTestId('login-register-button');
        this.backButton = this.page.getByTestId('login-back-button');
        this.errorMessage = this.page.getByText('Неправильный логин или пароль', { exact: true });
        this.emptyEmailError = this.page.getByText('Введите email', { exact: true });
        this.emptyPasswordError = this.page.getByText('Введите пароль', { exact: true });
    }

    /**
     * Открытие страницы авторизации
     */
    async open(): Promise<void> {
        await this.page.goto('/login');
        await this.waitForPageLoad();
    }

    /**
     * Авторизация пользователя
     */
    async login(user: User): Promise<void> {
        await this.loginWithCredentials(user.email, user.password);
    }

    /**
     * Авторизация с указанными данными
     */
    async loginWithCredentials(email: string, password: string): Promise<void> {
        await this.fillField(this.emailInput, email);
        await this.fillField(this.passwordInput, password);
        await this.clickElement(this.submitButton);
        await this.waitForPageLoad();
    }

    /**
     * Переход назад
     */
    async goBack(): Promise<void> {
        await this.clickElement(this.backButton);
    }

    /**
     * Переход к странице регистрации
     */
    async goToRegister(): Promise<void> {
        await this.clickElement(this.registerButton);
    }

    /**
     * Проверка ошибки авторизации
     */
    async expectAuthError(): Promise<void> {
        await this.expectElementVisible(this.errorMessage);
    }

    /**
     * Проверка ошибки пустого email
     */
    async expectEmptyEmailError(): Promise<void> {
        await this.expectElementVisible(this.emptyEmailError);
    }

    /**
     * Проверка ошибки пустого пароля
     */
    async expectEmptyPasswordError(): Promise<void> {
        await this.expectElementVisible(this.emptyPasswordError);
    }

    /**
     * Проверка видимости заголовка
     */
    async expectTitleVisible(): Promise<void> {
        await this.expectElementVisible(this.title);
    }

    /**
     * Получение текста заголовка
     */
    async getTitleText(): Promise<string> {
        return await this.getElementText(this.title);
    }

    /**
     * Проверка URL страницы авторизации
     */
    async expectLoginUrl(): Promise<void> {
        await this.expectUrl(/login/);
    }
} 