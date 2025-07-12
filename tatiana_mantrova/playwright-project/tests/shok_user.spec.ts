import { expect } from '@playwright/test'
import { test } from '../fixtures/index'

test.describe('Страница Профиля', () => {
  test.use({ storageState: 'tests/setup/.auth/user.json' })

  test.beforeEach(async ({ userPage }) => {
    await test.step('Открыть страницу https://yavshok.ru/', async () => {
      await userPage.open()
    })
  })

  const MOCK = {
    "flags": {
      "age": {
        "enabled": true,
        "young": {
          "from": 0,
          "to": 18
        },
        "adult": {
          "from": 18,
          "to": 20
        },
        "old": {
          "from": 21,
          "to": 99
        },
        "oldFrom": 22,
        "youngFrom": 2
      }
    }
  }

  test('Проверка отображения кнопки Выход', async ({ userPage }) => {
    await test.step('Кнопка Выход отображена на странице', async () => {
      await expect(userPage.userLogoutButton).toBeVisible()
    })
  })

  test('Проверка статуса "Ты молоденький котик"', async ({ userPage }) => {
    await test.step('Отображается статус Ты молоденький котик', async () => {
      await expect(userPage.page.getByText('Ты молоденький котик')).toBeVisible()
    })
  })

  test('проверка статуса "Ты старый котик"', async ({ userPage }) => {
    await test.step('Подменяем ответ на https://api.yavshok.ru/experiments моком', async () => {
      await userPage.page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify(MOCK)
        })
      })
    })

    await test.step('Отображается статус Ты старый котик', async () => {
      await expect(userPage.page.getByText('Ты старый котик')).toBeVisible()
    })
  })
})