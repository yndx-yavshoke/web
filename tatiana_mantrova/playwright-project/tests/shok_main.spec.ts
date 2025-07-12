import { expect } from '@playwright/test'
import { test } from '../fixtures/index'
import { faker } from '@faker-js/faker'

test.describe('Главный страница', () => {
  test.beforeEach(async ({ mainPage }) => {
    await test.step('Открыть страницу https://yavshok.ru/', async () => {
      await mainPage.open()
    })
  })

  test('Проверка наличия всех элементов на экране', async ({ mainPage }) => {
    await test.step('Отображается заголовок Я в ШОКе', async () => {
      await expect(mainPage.title).toBeVisible()
    })
    await test.step('Отображается поле ввода почты', async () => {
      await expect(mainPage.emailInput).toBeVisible()
    })
    await test.step('Отображается кнопка проверки шоковости', async () => {
      await expect(mainPage.checkButton).toBeVisible()
    })
    await test.step('Отображается кнопка В шок', async () => {
      await expect(mainPage.toLoginButton).toBeVisible()
    })
    await test.step('Отображается плэйсхолдер Введите email', async () => {
      await expect(mainPage.emailInput).toHaveAttribute('placeholder', 'Введите email')
    })
    await test.step('Отображается надпись на кнопке Я в шоке?', async () => {
      await expect(mainPage.checkButton).toHaveText('Я в шоке?')
    })
    await test.step('Отображается надпись на кнопке В шок', async () => {
      await expect(mainPage.toLoginButton).toHaveText('В шок')
    })
  })

  test('Проверка отображения лэйбла "Ты уже в ШОКе"', async ({ mainPage }) => {
    await test.step('Вводим почту tatiana.mantrova@gmail.com и нажимаем кнопку Я в шоке?', async () => {
      await mainPage.checkIsUserExist('tatiana.mantrova@gmail.com')
    })
    await test.step('Отображается лэйбл Ты уже в ШОКе', async () => {
      await expect(mainPage.youAreInShokLabel).toBeVisible()
    })
  })

  test('Проверка отображения лэйбла "Ты еще не в ШОКе"', async ({ mainPage }) => {
    await test.step('Вводим рандомную почту в поле Введите email', async () => {
      await mainPage.checkIsUserExist(faker.internet.email({ firstName: faker.string.nanoid(10) }))
    })
    await test.step('Отображается лэйбл Ты еще не в ШОКе', async () => {
      await expect(mainPage.youAreNotInShokLabel).toBeVisible()
    })
  })
})
