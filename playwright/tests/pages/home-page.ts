import { Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { ShockStatus } from '../types';
import { TEST_IDS, MESSAGES } from '../constants';

export class HomePage extends BasePage {
    // Locators
    private readonly title: Locator;
    private readonly emailInput: Locator;
    private readonly checkButton: Locator;
    private readonly loginButton: Locator;
    private readonly successGIF: Locator;

    constructor(page: any) {
        super(page);
        this.title = this.page.getByText(MESSAGES.HOME_TITLE, { exact: true });
        this.emailInput = this.page.getByTestId(TEST_IDS.MAIN_EMAIL_INPUT);
        this.checkButton = this.page.getByTestId(TEST_IDS.MAIN_CHECK_BUTTON);
        this.loginButton = this.page.getByTestId(TEST_IDS.MAIN_LOGIN_BUTTON);
        this.successGIF = this.page.getByRole('img');
    }

    /**
     * Открытие главной страницы
     */
    async open(): Promise<void> {
        await this.page.goto('/');
        await this.waitForPageLoad();
    }

    /**
     * Заполнение email поля
     */
    async fillEmail(email: string): Promise<void> {
        await this.fillField(this.emailInput, email);
    }

    /**
     * Проверка email
     */
    async checkEmail(): Promise<void> {
        await this.clickElement(this.checkButton);
        await this.waitForPageLoad();
    }

    /**
     * Проверка статуса пользователя в ШОКе
     */
    async expectShockStatus(expected: ShockStatus): Promise<void> {
        const message = expected === 'in' ? MESSAGES.SHOCK_STATUS_IN : MESSAGES.SHOCK_STATUS_OUT;
        await this.expectText(message);
    }

    /**
     * Переход к странице авторизации
     */
    async proceedToLogin(): Promise<void> {
        await this.clickElement(this.loginButton);
    }

    /**
     * Проверка видимости GIF
     */
    async expectSuccessGIF(): Promise<void> {
        await this.expectElementVisible(this.successGIF);
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
} 