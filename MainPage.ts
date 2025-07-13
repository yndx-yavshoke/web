import { Page, Locator } from '@playwright/test';

export class MainPage {
    private readonly page: Page;

    // Основные элементы
    readonly emailInput: Locator;
    readonly checkShockButton: Locator;
    readonly loginButton: Locator;

    // Элементы ответа
    readonly shockStatusText: Locator;
    readonly shockStatusImage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Форма проверки статуса
        this.emailInput = page.locator('[data-role="shock-email-input"]');
        this.checkShockButton = page.locator('[data-action="check-shock-status"]');
        this.loginButton = page.locator('[data-action="navigate-to-login"]');

        // Результаты проверки
        this.shockStatusText = page.locator('.shock-status-message');
        this.shockStatusImage = page.locator('.shock-status-image');
    }

    /**
     * Открывает главную страницу приложения
     */
    async openMainPage() {
        await this.page.goto('/');
    }

    /**
     * Проверяет статус ШОК для указанного email
     * @param email Email пользователя для проверки
     */
    async checkShockStatus(email: string) {
        await this.emailInput.fill(email);
        await this.checkShockButton.click();
    }

    /**
     * Переходит на страницу авторизации
     */
    async navigateToLogin() {
        await this.loginButton.click();
    }

    /**
     * Проверяет наличие положительного статуса "Ты уже в ШОКе"
     */
    async isUserInShock() {
        return await this.shockStatusText.filter({ 
            hasText: 'Ты уже в ШОКе' 
        }).isVisible();
    }

    /**
     * Проверяет наличие отрицательного статуса "Ты ещё не в ШОКе"
     */
    async isUserNotInShock() {
        return await this.shockStatusText.filter({ 
            hasText: 'Ты ещё не в ШОКе' 
        }).isVisible();
    }

    /**
     * Проверяет отображение GIF с котом
     */
    async isShockCatVisible() {
        return await this.shockStatusImage.isVisible();
    }
}