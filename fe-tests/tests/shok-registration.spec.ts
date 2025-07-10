import { expect } from "@playwright/test"
import { test } from '../screens/index'
import { validEmailPassword } from "../constants/testData"
import { faker, fakerRU } from "@faker-js/faker"

test('Проверка наличия плейсхолдеров в полях ввода email и Пароль', async ({registrationPage}) => {
    await registrationPage.open();

    await expect(registrationPage.inputEmail).toBeVisible();
    await expect(registrationPage.inputEmail).toHaveAttribute('placeholder', 'Email');
    await expect(registrationPage.inputPassword).toBeVisible();
    await expect(registrationPage.inputPassword).toHaveAttribute('placeholder', 'Пароль');
    await expect(registrationPage.inputAge).toBeVisible();
    await expect(registrationPage.inputAge).toHaveAttribute('placeholder', 'Возраст');
})

test("Проверка сообщений об ошибке при всех пустых полях", async ({registrationPage}) => {
    await registrationPage.open();

    await expect(registrationPage.inputEmail).toBeVisible();
    await expect(registrationPage.inputPassword).toBeVisible();
    await expect(registrationPage.inputAge).toBeVisible();
    await expect(registrationPage.registerButon).toBeVisible();
    await registrationPage.registerButon.click();

    await expect(registrationPage.lineEmail).toBeVisible();
    await expect(registrationPage.linePassword).toBeVisible();
    await expect(registrationPage.lineAge).toBeVisible();
})

test("Проверка сообщения об ошибке при вводе уже существуещего email", async ({registrationPage}) => {
    await registrationPage.open();

    await expect(registrationPage.inputEmail).toBeVisible();
    await registrationPage.inputEmail.fill(validEmailPassword.myEmailInBase);
    await expect(registrationPage.inputPassword).toBeVisible();
    await registrationPage.inputPassword.fill(validEmailPassword.myPasswordAdi);
    await expect(registrationPage.inputAge).toBeVisible();
    await registrationPage.inputAge.fill('18');
    await registrationPage.registerButon.click();

    await expect(registrationPage.lineEmailAlreadyExists).toBeVisible();

})

test("Проверка сообщения ош ошибке длины вводимого пароля", async ({registrationPage}) => {
    const email = faker.internet.email();
    
    await registrationPage.open();

    await expect(registrationPage.inputEmail).toBeVisible();
    await registrationPage.inputEmail.fill(email);
    await expect(registrationPage.inputPassword).toBeVisible();
    await registrationPage.inputPassword.fill('12345');
    await expect(registrationPage.inputAge).toBeVisible();
    await registrationPage.inputAge.fill('18');
    await registrationPage.registerButon.click();

    await expect(registrationPage.lineErrorLenPassword).toBeVisible();
})

test("Проверка сообщения об ошибке неверного email", async ({ registrationPage }) => {
    const brokenEmail = faker.internet
        .email()
        .replace('@', '_')
        .replace('.', '')
    const password = faker.internet.password();
    
    await registrationPage.open();

    await expect(registrationPage.inputEmail).toBeVisible();
    await registrationPage.inputEmail.fill(brokenEmail);
    await expect(registrationPage.inputPassword).toBeVisible();
    await registrationPage.inputPassword.fill(password);
    await expect(registrationPage.inputAge).toBeVisible();
    await registrationPage.inputAge.fill('18');
    await registrationPage.registerButon.click();

    await expect(registrationPage.lineErrorEmail).toBeVisible();
})

test("Проверка сообщения об ошибке неверного password", async ({ registrationPage }) => {
    const email = faker.internet.email()
    const password = faker.internet.password();
    
    await registrationPage.open();

    await expect(registrationPage.inputEmail).toBeVisible();
    await registrationPage.inputEmail.fill(email);
    await expect(registrationPage.inputPassword).toBeVisible();
    await registrationPage.inputPassword.fill(password);
    await expect(registrationPage.inputAge).toBeVisible();
    await registrationPage.inputAge.fill('-1');
    await registrationPage.registerButon.click();

    await expect(registrationPage.lineErrorAgeNumber).toBeVisible();
})

// test("Успешная регистрация пользователя", async ({ registrationPage, userPage }) => {
//     const email = faker.internet.email()
//     const password = faker.internet.password();
//     const age = faker.number.int({min: 0, max: 100}).toString();
    
//     await registrationPage.open();

//     await expect(registrationPage.inputEmail).toBeVisible();
//     await registrationPage.inputEmail.fill(email);
//     await expect(registrationPage.inputPassword).toBeVisible();
//     await registrationPage.inputPassword.fill(password);
//     await expect(registrationPage.inputAge).toBeVisible();
//     await registrationPage.inputAge.fill(age);
//     await registrationPage.registerButon.click();

//     await expect(userPage.userAvatar).toBeVisible();
//     await expect(userPage.lineUserNickName).toBeVisible();
// })