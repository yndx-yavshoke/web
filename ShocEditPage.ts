import { Page, Locator } from '@playwright/test';

export class ShocEditPage {
    private readonly page: Page;

    // Локаторы для элементов страницы
    readonly title: Locator;
    readonly nameInput: Locator;
    readonly nameInputPlaceholder: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    readonly nameError: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Инициализация локаторов
        this.title = this.page.locator('h1:has-text("Edit Profile")');
        this.nameInput = this.page.locator('[data-testid="name-input"]');
        this.nameInputPlaceholder = this.page.getByPlaceholder('Ваше имя');
        this.saveButton = this.page.locator('[data-testid="save-button"]');
        this.cancelButton = this.page.locator('[data-testid="cancel-button"]');
        this.nameError = this.page.locator('.error-message:has-text("Имя обязательно")');
    }

    /**
     * Переход на страницу редактирования профиля
     */
    async navigate() {
        await this.page.goto('/edit');
    }

    /**
     * Редактирование имени пользователя
     * @param name - Новое имя пользователя
     */
    async editName(name: string) {
        await this.nameInput.fill(name);
        await this.saveButton.click();
    }

    /**
     * Очистка поля имени
     */
    async clearName() {
        await this.nameInput.clear();
    }

    /**
     * Нажатие кнопки "Отмена"
     */
    async clickCancel() {
        await this.cancelButton.click();
    }
}