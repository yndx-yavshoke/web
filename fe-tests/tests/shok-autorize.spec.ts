import { expect } from "@playwright/test"
import { test } from '../screens/index'
import { validEmailPassword } from "../constants/testData"
import { faker, fakerRU } from "@faker-js/faker"
import { authController } from "../../src/controllers/auth"

test('Проверка наличия плейсхолдеров в полях ввода email и Пароль', async ({autorizePage}) => {
    await autorizePage.open();
    await expect(autorizePage.inputEmail).toBeVisible();
    await expect(autorizePage.inputEmail).toHaveAttribute('placeholder', 'Email');
    await expect(autorizePage.inputPassword).toBeVisible();
    await expect(autorizePage.inputPassword).toHaveAttribute('placeholder', 'Пароль');
})

test('Проверка входа несуществуещего пользователя', async ({autorizePage}) => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    
    await autorizePage.open();
    await expect(autorizePage.inputEmail).toBeVisible();
    await autorizePage.inputEmail.fill(email);
    await expect(autorizePage.inputPassword).toBeVisible();
    await autorizePage.inputPassword.fill(password);
    await expect(autorizePage.buttonEnter).toBeVisible();
    await autorizePage.buttonEnter.click();

    await expect(autorizePage.lineErrorEnter).toBeVisible();
})

test("Проверка вывода об ошбике при не введеном email", async ({autorizePage}) => {
    const password = faker.internet.password();

    await autorizePage.open();
    await expect(autorizePage.inputEmail).toBeVisible(); 
    await expect(autorizePage.inputPassword).toBeVisible();
    await autorizePage.inputPassword.fill(password);
    await expect(autorizePage.buttonEnter).toBeVisible();
    await autorizePage.buttonEnter.click();

    await expect(autorizePage.lineErrorEmail).toBeVisible();
}) 

test("Проверка вывода об ошбике при не введеном password", async ({autorizePage}) => {
    const email = faker.internet.email();

    await autorizePage.open();
    await expect(autorizePage.inputEmail).toBeVisible();
    await autorizePage.inputEmail.fill(email); 
    await expect(autorizePage.inputPassword).toBeVisible();
    await expect(autorizePage.buttonEnter).toBeVisible();
    await autorizePage.buttonEnter.click();

    await expect(autorizePage.lineErrorPassword).toBeVisible();
}) 

test("Проверка вывода ошибки при ввоже не валидных данных", async ({autorizePage}) => {
    const brokenEmail = faker.internet
        .email()
        .replace('@', '_')
        .replace('.', '')
    const password = faker.internet.password();
    await autorizePage.open();
    await expect(autorizePage.inputEmail).toBeVisible();
    await autorizePage.inputEmail.fill(brokenEmail);
    await expect(autorizePage.inputPassword).toBeVisible();
    await autorizePage.inputPassword.fill(password);
    await expect(autorizePage.buttonEnter).toBeVisible();
    await autorizePage.buttonEnter.click();

    await expect(autorizePage.lineError).toBeVisible();
})

test("Проверка работоспособности кнопки назад.", async ({autorizePage, mainPage}) => {
    await autorizePage.open();
    await expect(autorizePage.buttonBack).toBeVisible();
    await autorizePage.buttonBack.click();

    await expect(mainPage.title).toBeVisible();
})

test("Проверка работоспособности кнопки Регистрация", async ({autorizePage, registrationPage}) => {
    await autorizePage.open();
    await expect(autorizePage.buttonRegistration).toBeVisible();
    await autorizePage.buttonRegistration.click();

    await expect(registrationPage.title).toBeVisible();
})

test("Проверка входа в личный кабинет", async ({ autorizePage, userPage}) => {
    await autorizePage.open();
    await expect(autorizePage.inputEmail).toBeVisible();
    await autorizePage.inputEmail.fill(validEmailPassword.myEmailInBase);
    await expect(autorizePage.inputPassword).toBeVisible();
    await autorizePage.inputPassword.fill(validEmailPassword.myPasswordAdi);
    await expect(autorizePage.buttonEnter).toBeVisible();
    await autorizePage.buttonEnter.click();

    await expect(userPage.userAvatar).toBeVisible();
})