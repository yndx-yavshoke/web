// tests/fixtures/pages.ts
import { test as base, Page } from '@playwright/test';
import { allure } from 'allure-playwright';
import { AuthUser, RegUser } from './users';

interface PageFixtures {
    loginPage: {
        goto: () => Promise<void>;
        login: (user: AuthUser) => Promise<void>;
        shouldSeeProfile: () => Promise<void>;
    };
    registerPage: {
        page: Page;
        goto: () => Promise<void>;
        fillForm: (user: RegUser) => Promise<void>;
        submit: () => Promise<void>;
        verifySuccess: (expectedText: string) => Promise<void>;
    };
    mainPage: {
        page: Page;
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
                await allure.step('Переход на страницу входа', async () => {
                    await page.goto('/login');
                    await allure.attachment('Скриншот страницы входа', await page.screenshot(), 'image/png');
                });
            },

            async login(user: AuthUser) {
                await allure.step('Заполнение формы входа', async () => {
                    await page.fill('input[placeholder="Email"]', user.email);
                    await page.fill('input[placeholder="Пароль"]', user.password);
                    await allure.attachment('Форма после заполнения', await page.screenshot(), 'image/png');
                });

                await allure.step('Отправка формы', async () => {
                    await page.click('[data-testid="login-submit-button"]');
                    await page.locator('text="Edit Profile"').waitFor({ 
                        state: 'visible', 
                        timeout: 15000 
                    });
                });
            },

            async shouldSeeProfile() {
                await allure.step('Проверка отображения профиля', async () => {
                    await expect(page.getByText('Edit Profile')).toBeVisible();
                    await allure.attachment('Скриншот профиля', await page.screenshot(), 'image/png');
                });
            }
        };
        await use(loginPage);
    },
    registerPage: async ({ page }, use) => {
        const registerPage = {
            page,
            async goto() {
                await allure.step('Переход на страницу регистрации', async () => {
                    await page.goto('/register');
                });
            },
            
            async fillForm(user: RegUser) {
                await allure.step('Заполнение формы регистрации', async () => {
                    await page.fill('input[placeholder="Email"]', user.email);
                    await page.fill('input[placeholder="Пароль"]', user.password);
                    await page.fill('input[placeholder="Возраст"]', user.age.toString());
                    await allure.attachment('Заполненная форма', await page.screenshot(), 'image/png');
                });
            },
            
            async submit() {
                await allure.step('Отправка формы', async () => {
                    await page.click('[data-testid="register-submit-button"]');
                });
            },
            
            async verifySuccess(expectedText: string) {
                await allure.step('Проверка успешной регистрации', async () => {
                    await expect(page.getByText('Edit Profile')).toBeVisible();
                    await expect(page.locator('body')).toContainText(expectedText);
                    await allure.attachment('Скриншот после регистрации', await page.screenshot(), 'image/png');
                });
            }
        };
        await use(registerPage);
    },
    mainPage: async ({ page }, use) => {
        const mainPage = {
            page, 
            async goto() {
                await page.goto('/');
            },
            async checkRegisteredUserFlow() {
                await page.fill('input[placeholder="Введите email"]', 'qwerty@yandex.ru');
                await page.click('[data-testid="main-check-button"]');
                await expect(page.getByText('Ты уже в ШОКе')).toBeVisible();
            },
            async checkUnregisteredUserFlow() {
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
                await allure.step('Переход в профиль', async () => {
                    await page.goto('/profile');
                });
            },

            async openEditProfile() {
                await allure.step('Открытие формы редактирования', async () => {
                    await page.locator('[data-testid="user-edit-profile-button"]').click();
                    await page.waitForSelector('input[name="name"]');
                });
            },

            async editName(newName: string) {
                await allure.step('Изменение имени', async () => {
                    await page.fill('input[name="name"]', newName);
                });
            },

            async saveChanges() {
                await allure.step('Сохранение изменений', async () => {
                    await page.click('button:has-text("Save Changes")');
                    await page.waitForURL(/profile/);
                });
            },

            async verifyNameChanged(expectedName: string) {
                await allure.step('Проверка изменения имени', async () => {
                    await expect(page.locator('.profile-name')).toHaveText(expectedName);
                    await allure.attachment('Профиль после изменения', await page.screenshot(), 'image/png');
                });
            }
        };
        await use(profilePage);
    }
});

export const expect = base.expect;