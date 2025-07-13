import { Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class ProfilePage extends BasePage {
    // Locators
    private readonly logoutButton: Locator;
    private readonly profileTitle: Locator;
    private readonly userInfo: Locator;

    constructor(page: any) {
        super(page);
        this.logoutButton = this.page.getByTestId('user-logout-button');
        this.profileTitle = this.page.getByText('Профиль', { exact: true });
        this.userInfo = this.page.getByTestId('user-info');
    }

    /**
     * Открытие страницы профиля
     */
    async open(): Promise<void> {
        await this.page.goto('/profile');
        await this.waitForPageLoad();
    }

    /**
     * Проверка видимости кнопки выхода
     */
    async expectLogoutButtonVisible(): Promise<void> {
        await this.expectElementVisible(this.logoutButton);
    }

    /**
     * Выход из аккаунта
     */
    async logout(): Promise<void> {
        await this.clickElement(this.logoutButton);
        await this.waitForPageLoad();
    }

    /**
     * Проверка видимости заголовка профиля
     */
    async expectProfileTitleVisible(): Promise<void> {
        await this.expectElementVisible(this.profileTitle);
    }

    /**
     * Получение информации о пользователе
     */
    async getUserInfo(): Promise<string> {
        return await this.getElementText(this.userInfo);
    }

    /**
     * Проверка URL страницы профиля
     */
    async expectProfileUrl(): Promise<void> {
        await this.expectUrl(/profile/);
    }
} 