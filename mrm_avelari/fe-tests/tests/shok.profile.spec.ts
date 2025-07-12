import { test } from '../fixtures/index';
import { expect, Page } from '@playwright/test';
import { YOUNG_MOCK, ADULT_MOCK, OLD_MOCK } from '../constants/mocks';
import { API } from '../constants/api';
import { BASE_URL } from '../constants/env';

export const mockAge = async (page: Page, mock: unknown) => {
  await page.route(API.EXPERIMENTS, (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(mock),
    });
  });
};

test.use({ storageState: 'tests/setup/.auth/user.json' })

test.describe('Проверка UI элементов страницы профиля и навигации', () => {
  test.beforeEach(async ({ profilePage }) => {
    await test.step(`Открыть страницу профиля: ${BASE_URL}`, async () => {
      await profilePage.open();
    });
  });

  test('All main UI elements are visible and correct', async ({ profilePage }) => {
    await test.step('Проверить отображение основных UI элементов', async () => {
      await profilePage.expectUI();
    });
  });

  test('Clicking "Edit Profile" button navigates to edit page', async ({ profilePage }) => {
    await test.step('Кликнуть кнопку "Редактировать профиль"', async () => {
      await profilePage.clickEditProfileButton();
    });

    await test.step('Проверить URL содержит /edit', async () => {
      await expect(profilePage.page).toHaveURL(/\/edit/);
    });
  });

  test('Clicking "Logout" button navigates to login page', async ({ profilePage }) => {
    await test.step('Кликнуть кнопку "Выйти"', async () => {
      await profilePage.clickLogoutButton();
    });

    await test.step(`Проверить, что URL соответствует корню ${BASE_URL}`, async () => {
      await expect(profilePage.page).toHaveURL('/');
    });
  });
});

test.describe('Отображение возрастных статусов пользователя', () => {
  test('status - young cat', async ({ profilePage }) => {
    await test.step('Подменить API ответ на статус молодой котик', async () => {
      await mockAge(profilePage.page, YOUNG_MOCK);
    });

    await test.step(`Открыть страницу профиля: ${BASE_URL}`, async () => {
      await profilePage.open();
    });

    await test.step('Проверить, что email input не виден', async () => {
      await expect(profilePage.page.getByTestId('main-email-input')).not.toBeVisible();
    });

    await test.step('Проверить отображение статуса "Ты молоденький котик"', async () => {
      await expect(profilePage.page.getByText('Ты молоденький котик')).toBeVisible();
    });

    await test.step('Проверить, что кнопка выхода видна', async () => {
      await expect(profilePage.page.getByTestId('user-logout-button')).toBeVisible();
    });
  });

  test.skip('status - adult cat', async ({ profilePage }) => {
    await test.step('Подменить API ответ на статус взрослый котик', async () => {
      await mockAge(profilePage.page, ADULT_MOCK);
    });

    await test.step(`Открыть страницу профиля: ${BASE_URL}`, async () => {
      await profilePage.open();
    });

    await test.step('Проверить, что email input не виден', async () => {
      await expect(profilePage.page.getByTestId('main-email-input')).not.toBeVisible();
    });

    await test.step('Проверить отображение текста "Ты взрослый котик"', async () => {
      await expect(profilePage.page.getByText('Ты взрослый котик')).toBeVisible();
    });

    await test.step('Проверить, что кнопка выхода видна', async () => {
      await expect(profilePage.page.getByTestId('user-logout-button')).toBeVisible();
    });
  });

  test('status - old cat', async ({ profilePage }) => {
    await test.step('Подменить API ответ на статус старый котик', async () => {
      await mockAge(profilePage.page, OLD_MOCK);
    });

    await test.step(`Открыть страницу профиля: ${BASE_URL}`, async () => {
      await profilePage.open();
    });

    await test.step('Проверить, что email input не виден', async () => {
      await expect(profilePage.page.getByTestId('main-email-input')).not.toBeVisible();
    });

    await test.step('Проверить отображение текста "Ты старый котик"', async () => {
      await expect(profilePage.page.getByText('Ты старый котик')).toBeVisible();
    });

    await test.step('Проверить, что кнопка выхода видна', async () => {
      await expect(profilePage.page.getByTestId('user-logout-button')).toBeVisible();
    });
  });
});