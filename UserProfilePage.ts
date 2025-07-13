import { Page, Locator, expect } from '@playwright/test'; // ✅ Теперь expect доступен

export class ProfilePage {
    private readonly page: Page;

    // Блок статуса
    readonly ageStatus: {
        young: Locator;
        adult: Locator;
        old: Locator;
    };

    // Блок статистики
    readonly stats: {
        posts: Locator;
        followers: Locator;
        likes: Locator;
    };

    // Блок действий
    readonly actions: {
        edit: Locator;
        logout: Locator;
    };

    constructor(page: Page) {
        this.page = page;

        // Инициализация элементов статуса
        this.ageStatus = {
            young: page.locator('.user-status:has-text("Молоденький котик")'),
            adult: page.locator('.user-status:has-text("Взрослый котик")'),
            old: page.locator('.user-status:has-text("Старый котик")')
        };

        // Инициализация статистики
        this.stats = {
            posts: page.locator('.counter:has-text("Постов")'),
            followers: page.locator('.counter:has-text("Подписчиков")'),
            likes: page.locator('.counter:has-text("Лайков")')
        };

        // Инициализация кнопок
        this.actions = {
            edit: page.locator('button.profile-edit'),
            logout: page.locator('button.profile-logout')
        };
    }

    /**
     * Открывает страницу профиля
     */
    async navigate() {
        await this.page.goto('/profile');
    }

    /**
     * Переходит на страницу редактирования профиля
     */
    async openEditMode() {
        await this.actions.edit.click();
    }

    /**
     * Выполняет выход из аккаунта
     */
    async signOut() {
        await this.actions.logout.click();
    }

    /**
     * Проверяет соответствие статуса возрасту
     * @param age - Возраст пользователя
     */
    async verifyAgeStatus(age: number) {
        if (age <= 21) {
            await expect(this.ageStatus.young).toBeVisible(); // ✅ Теперь работает
        } else if (age <= 68) {
            await expect(this.ageStatus.adult).toBeVisible();
        } else {
            await expect(this.ageStatus.old).toBeVisible();
        }
    }

    /**
     * Проверяет отображение статистики
     */
    async verifyStatsVisibility() {
        await expect(this.stats.posts).toBeVisible();
        await expect(this.stats.followers).toBeVisible();
        await expect(this.stats.likes).toBeVisible();
    }
}