import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

export interface AuthUser {
    email: string;
    password: string;
}

// 1. Улучшенная функция сохранения данных
export async function saveAuthState(page: any) {
    await page.context().storageState({ path: authFile });
}

// 2. Обновлённая функция авторизации
export async function loginUser(user: AuthUser, page: any) {
    try {
        // Шаг 1: Переход на страницу входа
        await page.goto('https://yavshok.ru/login');
        
        // Шаг 2: Заполнение полей с ожиданием
        await page.locator('input[placeholder="Email"]').waitFor();
        await page.fill('input[placeholder="Email"]', user.email);
        
        await page.locator('input[placeholder="Пароль"]').waitFor();
        await page.fill('input[placeholder="Пароль"]', user.password);
        
        // Шаг 3: Клик по кнопке с проверкой
        const loginButton = page.locator('[data-testid="login-submit-button"]');
        await expect(loginButton).toBeEnabled();
        await loginButton.click();
        
        // Шаг 4: Ожидание успешной авторизации
        await Promise.race([
            page.locator('text="Ты молоденький котик"').waitFor(),
            page.locator('text="Ты взрослый котик"').waitFor(),
            page.locator('text="Ты старый котик"').waitFor(),
            page.waitForURL(/profile/, { timeout: 15000 })
        ]);
        
        // Шаг 5: Сохранение сессии
        await saveAuthState(page);
        
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        throw error;
    }
}

// 3. Получение данных аутентификации
export function getAuthData() {
    if (fs.existsSync(authFile)) {
        try {
            return JSON.parse(fs.readFileSync(authFile, 'utf-8'));
        } catch (e) {
            console.error('Ошибка чтения auth файла:', e);
            return null;
        }
    }
    return null;
}