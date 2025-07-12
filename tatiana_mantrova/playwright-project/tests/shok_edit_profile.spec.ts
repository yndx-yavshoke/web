import { expect } from '@playwright/test'
import { test } from '../fixtures/index'
import { faker } from '@faker-js/faker'

test.describe('Страница Редактирования профиля', () => {
  test.use({ storageState: 'tests/setup/.auth/user.json' })

  test.beforeEach(async ({ editProfilePage }) => {
    await test.step('Открыть страницу https://yavshok.ru/edit', async () => {
      await editProfilePage.open()
    })
  })

  test('Проверка наличия плэйсхолдера в поле ввода имени', async ({ editProfilePage }) => {
    await test.step('Очистить поле ввода имени', async () => {
      await editProfilePage.editNameInput.clear()
    })
    await test.step('В поле ввода имени плэйсхолдер Enter your name', async () => {
      await expect(editProfilePage.editNameInput).toHaveAttribute('placeholder', 'Enter your name')
    })
  })

  test('Проверка сохранения измененного имени', async ({ editProfilePage }) => {
    let randomName: string

    await test.step('Генерируем рандомное имя', async () => {
      randomName = faker.person.firstName()
    })
    await test.step('Вставляем сгенерированного рандомное имя в поле ввода имени', async () => {
      await editProfilePage.editNameInput.fill(randomName)
    })
    await test.step('Кликаем на кнопку Save Changes', async () => {
      await editProfilePage.editSaveButton.click()
    })
    await test.step('Ждем пока на кнопке отобразится надпись Save Changes', async () => {
      await expect(editProfilePage.editSaveButton).toHaveText('Save Changes')
    })
    await test.step('Кликаем на кнопку Save Cancel', async () => {
      await editProfilePage.editCancelButton.click()
    })
    await test.step('Отображается страница https://yavshok.ru/', async () => {
      await expect(editProfilePage.page).toHaveURL('/')
    })
    await test.step('На странице Пользователя отобжается сохраненное имя', async () => {
      await expect(editProfilePage.page.getByText(randomName)).toBeVisible()
    })
  })
})

test.describe('Страница Редактирования профиля', () => {
  test.use({ storageState: 'tests/setup/.auth/user.json' })

  test('Проверка, что имя не сохранятся, если не нажимать на кнопку Save Changes', async ({ editProfilePage }) => {
    let userName: string

    await test.step('Открываем страницу профиля', async () => {
      await editProfilePage.page.goto('/')
    })
    await test.step('Открыта страница профиля', async () => {
      await expect(editProfilePage.page).toHaveURL('/')
    })
    await test.step('Нажимаем на кнопку редактировать Профиль', async () => {
      await editProfilePage.page.getByTestId('user-edit-profile-button').click()
    })
    await test.step('Сохраняем в переменную текущее имя пользователя', async () => {
      userName = await editProfilePage.editNameInput.inputValue()
    })
    await test.step('Всталяем в поле имя рандомное имя пользователя', async () => {
      await editProfilePage.editNameInput.fill(faker.person.firstName())
    })
    await test.step('Нажимаем кнопку Cancel', async () => {
      await editProfilePage.editCancelButton.click()
    })
    await test.step('Открыта страница Профиля', async () => {
      await expect(editProfilePage.page).toHaveURL('/')
    })
    await test.step('Имя профиля не изменилось', async () => {
      await expect(editProfilePage.page.getByText(userName)).toBeVisible()
    })
  })
})