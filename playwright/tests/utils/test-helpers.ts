import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { User, RegistrationData } from '../types';

export class TestHelpers {
    constructor(private page: Page) {}

    /**
     * Генерация случайного пользователя
     */
    static generateRandomUser(): User {
        return {
            email: faker.internet.email(),
            password: faker.internet.password({ length: 10 }),
            name: faker.person.fullName(),
            age: faker.number.int({ min: 18, max: 99 })
        };
    }

    /**
     * Генерация данных для регистрации
     */
    static generateRegistrationData(): RegistrationData {
        return {
            email: faker.internet.email(),
            password: faker.internet.password({ length: 10 }),
            age: faker.number.int({ min: 18, max: 99 }).toString(),
            name: faker.person.fullName()
        };
    }

    /**
     * Ожидание загрузки страницы
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Сделать скриншот
     */
    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
    }

    /**
     * Проверка видимости элемента по тексту
     */
    async expectTextVisible(text: string): Promise<void> {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    /**
     * Проверка URL страницы
     */
    async expectUrl(url: string | RegExp): Promise<void> {
        await expect(this.page).toHaveURL(url);
    }

    /**
     * Безопасное заполнение поля
     */
    async fillField(selector: string, value: string): Promise<void> {
        const field = this.page.getByTestId(selector);
        await field.clear();
        await field.fill(value);
    }

    /**
     * Безопасный клик по элементу
     */
    async clickElement(selector: string): Promise<void> {
        const element = this.page.getByTestId(selector);
        await element.waitFor({ state: 'visible' });
        await element.click();
    }

    /**
     * Получение текста элемента
     */
    async getElementText(selector: string): Promise<string> {
        const element = this.page.getByTestId(selector);
        return await element.textContent() || '';
    }

    /**
     * Проверка отсутствия элемента
     */
    async expectElementNotVisible(selector: string): Promise<void> {
        const element = this.page.getByTestId(selector);
        await expect(element).not.toBeVisible();
    }

    /**
     * Ожидание появления элемента
     */
    async waitForElement(selector: string, timeout = 5000): Promise<void> {
        const element = this.page.getByTestId(selector);
        await element.waitFor({ state: 'visible', timeout });
    }
} 