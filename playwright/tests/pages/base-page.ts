import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Ожидание загрузки страницы
     */
    protected async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Проверка видимости элемента
     */
    protected async expectElementVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    /**
     * Проверка URL страницы
     */
    protected async expectUrl(url: string | RegExp): Promise<void> {
        await expect(this.page).toHaveURL(url);
    }

    /**
     * Безопасное заполнение поля
     */
    protected async fillField(locator: Locator, value: string): Promise<void> {
        await locator.clear();
        await locator.fill(value);
    }

    /**
     * Безопасный клик по элементу
     */
    protected async clickElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    /**
     * Получение текста элемента
     */
    protected async getElementText(locator: Locator): Promise<string> {
        return await locator.textContent() || '';
    }

    /**
     * Проверка наличия текста на странице
     */
    protected async expectText(text: string): Promise<void> {
        await expect(this.page.getByText(text)).toBeVisible();
    }
} 