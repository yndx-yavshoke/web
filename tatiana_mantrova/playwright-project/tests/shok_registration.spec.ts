import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { faker } from '@faker-js/faker'

test.describe('Страница регистрации пользователя', () => {
  test.beforeEach(async ({ registrationPage }) => {
    await test.step('Открыть страницу https://yavshok.ru/register', async () => {
      await registrationPage.open()
    })
  })

  test('Проверка наличия плэйсхолдеров в полях ввода', async ({ registrationPage }) => {
    await test.step('Отображается плэйсхолдер Email', async () => {
      await expect(registrationPage.emailInput).toHaveAttribute('placeholder', 'Email')
    })
    await test.step('Отображается плэйсхолдер Пароль', async () => {
      await expect(registrationPage.passwordInput).toHaveAttribute('placeholder', 'Пароль')
    })
    await test.step('Отображается плэйсхолдер Возраст', async () => {
      await expect(registrationPage.ageInput).toHaveAttribute('placeholder', 'Возраст')
    })
  });

  test('Проверка отображения ошибки при регистрация пользователя без заполнения обязательных полей', async ({ registrationPage }) => {
    await registrationPage.submitButton.click()

    await expect(registrationPage.emailInputErrorLabel).toBeVisible()
    await expect(registrationPage.passwordInputErrorLabel).toBeVisible()
  });

  test('Регистрация пользователя с заполнением обязательных полей', async ({ registrationPage }) => {
    await registrationPage.emailInput.fill(faker.internet.email({ firstName: faker.string.nanoid(10) }))
    await registrationPage.passwordInput.fill('123456')
    await registrationPage.ageInput.fill('34')
    await registrationPage.submitButton.click()

    await expect(registrationPage.page.getByText('Ты старый котик')).toBeVisible()
  });
})
