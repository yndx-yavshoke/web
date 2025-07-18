// tests/fixtures/pages.ts
import { test as base } from '@playwright/test';
import { AuthUser, RegUser } from './users';

interface PageFixtures {
    loginPage: {
        goto: () => Promise<void>;
        login: (user: AuthUser) => Promise<void>;
        shouldSeeProfile: () => Promise<void>;
    };
    registerPage: {
        goto: () => Promise<void>;
        fillForm: (user: RegUser) => Promise<void>;
        submit: () => Promise<void>;
        verifySuccess: (expectedText: string) => Promise<void>;
    };
    mainPage: {
        goto: () => Promise<void>;
        checkRegisteredUserFlow: () => Promise<void>;
        checkUnregisteredUserFlow: () => Promise<void>;
    };
    profilePage: {
        goto: () => Promise<void>;
        openEditProfile: () => Promise<void>;
        editName: (newName: string) => Promise<void>;
        saveChanges: () => Promise<void>;
        verifyNameChanged: (expectedName: string) => Promise<void>;
    };
}

export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = {
            async goto() {
                await page.goto('/login');
            },

            async login(user: AuthUser) {
                await page.fill('input[placeholder="Email"]', user.email);
                await page.fill('input[placeholder="Пароль"]', user.password);
                await page.click('[data-testid="login-submit-button"]');
                await page.locator('text="Edit Profile"').waitFor({ 
                    state: 'visible', 
                    timeout: 15000 
                });
            },

            async shouldSeeProfile() {
                await expect(page.getByText('Edit Profile')).toBeVisible();
            }
        };
        await use(loginPage);
    },
    registerPage: async ({ page }, use) => {
        const registerPage = {
            async goto() {
                await page.goto('/register');
            },
            
            // Заполнение всех полей формы
            async fillForm(user: RegUser) {
                await page.fill('input[placeholder="Email"]', user.email);
                await page.fill('input[placeholder="Пароль"]', user.password);
                await page.fill('input[placeholder="Возраст"]', user.age.toString());
            },
            
            // Отправка формы
            async submit() {
                await page.click('[data-testid="register-submit-button"]');
            },
            
            // Проверка успешной регистрации
            async verifySuccess(expectedText: string) {
                
                await expect(page.getByText('Edit Profile')).toBeVisible();
                // 2. Проверяем возрастное сообщение
                await expect(page.locator('body'))
                    .toContainText(expectedText);
                
            
            }
        };
        await use(registerPage);
    },
    mainPage: async ({ page }, use) => {
        const mainPage = {
            async goto() {
                await page.goto('/');
            },

            async checkRegisteredUserFlow() {
                // Вводим зарегистрированный email
                await page.fill('input[placeholder="Введите email"]', 'qwerty@yandex.ru');
                
                await page.click('[data-testid="main-check-button"]');
                
                await expect(page.getByText('Ты уже в ШОКе')).toBeVisible();
            },

            async checkUnregisteredUserFlow() {
                // Вводим НЕзарегистрированный email
                await page.fill('input[placeholder="Введите email"]', 'new@test.com');
                
                await page.click('[data-testid="main-check-button"]');
                
                await expect(page.getByText('Ты еще не в ШОКе')).toBeVisible();
            }
        };
        await use(mainPage);
    },
    profilePage: async ({ page }, use) => {
        const profilePage = {
            async goto() {
                await page.goto('/profile');
            },

            async openEditProfile() {
                await page.locator('[data-testid="user-edit-profile-button"]').click();
                await page.waitForSelector('input[name="name"]');
            },

            async editName(newName: string) {
                await page.fill('input[name="name"]', newName);
            },

            async saveChanges() {
                await page.click('button:has-text("Save Changes")');
                await page.waitForURL(/profile/);
            },

            async verifyNameChanged(expectedName: string) {
                await expect(page.locator('.profile-name')).toHaveText(expectedName);
            }
        };
        await use(profilePage);
    }
});

export const expect = base.expect;