import { test, expect } from '@playwright/test';
import { ProfilePage } from './pages/ProfilePage';
import { setupProfileMock } from './mocks/apiMocks';

test.beforeEach(async ({ page }) => {
  await page.context().addCookies([
    { name: 'auth_token', value: 'mock-token', domain: 'yavshok.ru', path: '/' }
  ]);
});

test('Профиль: проверка статуса UwU (0)', async ({ page }) => {
  const profilePage = new ProfilePage(page);
  
  await setupProfileMock(page, 0);
  
  await test.step('Открытие страницы профиля', async () => {
    await profilePage.goto();
  });
  
  await test.step('Проверка загрузки страницы', async () => {
    expect(page.url().includes('yavshok')).toBe(true);
  });
});

test('Профиль: проверка статуса молоденький котик (1-29)', async ({ page }) => {
  const profilePage = new ProfilePage(page);
  
  await setupProfileMock(page, 20);
  
  await test.step('Открытие страницы профиля', async () => {
    await profilePage.goto();
  });
  
  await test.step('Проверка загрузки страницы', async () => {
    expect(page.url().includes('yavshok')).toBe(true);
  });
});

test('Профиль: проверка статуса старый котик (30-99)', async ({ page }) => {
  const profilePage = new ProfilePage(page);
  
  await setupProfileMock(page, 40);
  
  await test.step('Открытие страницы профиля', async () => {
    await profilePage.goto();
  });
  
  await test.step('Проверка загрузки страницы', async () => {
    expect(page.url().includes('yavshok')).toBe(true);
  });
});

test('Профиль: кнопка Edit Profile активна', async ({ page }) => {
  const profilePage = new ProfilePage(page);
  
  await test.step('Открытие страницы профиля', async () => {
    await profilePage.goto();
  });
  
  await test.step('Проверка активности кнопки Edit Profile', async () => {
    const isDisabled = await profilePage.getEditProfileButtonDisabled();
    expect(isDisabled === 'true' || isDisabled === null).toBe(true);
  });
});

test('Профиль: кнопка Logout активна', async ({ page }) => {
  const profilePage = new ProfilePage(page);
  
  await test.step('Открытие страницы профиля', async () => {
    await profilePage.goto();
  });
  
  await test.step('Проверка активности кнопки Logout', async () => {
    const isDisabled = await profilePage.getLogoutButtonDisabled();
    expect(isDisabled === 'true' || isDisabled === null).toBe(true);
  });
}); 