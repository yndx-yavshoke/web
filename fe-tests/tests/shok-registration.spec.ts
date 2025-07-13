import { expect } from "@playwright/test"
import { test } from '../screens/index'
import { EMAILS } from "../constants/testData"
import { faker } from "@faker-js/faker"
import { ENDPOINTS } from "../constants/testData"

test('Проверка наличия плейсхолдеров в полях ввода email, пароль и возраст', async ({registrationPage}) => {
    await test.step('переход на страницу /register', async () => {
        await registrationPage.open();
    })
    await test.step('Отоброжается страница /register', async () => {
        await expect(registrationPage.page).toHaveURL(ENDPOINTS.endpointRegistration)
    })
    await test.step('поле ввода email отоброжается', async () => {
        await expect(registrationPage.inputEmail).toBeVisible();
    })
    await test.step('плейсхолдер поля ввода email отображается', async () => {
        await expect(registrationPage.inputEmail).toHaveAttribute('placeholder', 'Email');
    })
    await test.step('поле ввода пароль отоброжается', async () => {
        await expect(registrationPage.inputPassword).toBeVisible();
    })
    await test.step('плейсхолдер поля ввода пароль отображается', async () => {
        await expect(registrationPage.inputPassword).toHaveAttribute('placeholder', 'Пароль');
    })
    await test.step('поле ввода возраста отоброжается', async () => {
        await expect(registrationPage.inputAge).toBeVisible();
    })
    await test.step('плейсхолдер поля ввода возраста отображается', async () => {
        await expect(registrationPage.inputAge).toHaveAttribute('placeholder', 'Возраст');
    })    
})

test ("Проверка работоспособности кнопки назад", async ({registrationPage, autorizePage}) => {
    await test.step('переход на страницу /register', async () => {
        await registrationPage.open();
    })
    await test.step('Отоброжается страница /register', async () => {
        await expect(registrationPage.page).toHaveURL(ENDPOINTS.endpointRegistration);
    })
    await test.step('Отображается кнопка назад', async () => {
        await expect(registrationPage.backButton).toBeVisible();
    })
    await test.step('Нажатие на кнопку назад', async () => {
        await registrationPage.backButton.click()
    })
    await test.step('Отоброжается страница /login', async () => {
        await expect(autorizePage.page).toHaveURL(ENDPOINTS.endpointLogin);
    })
    await test.step('Отображается заголовок на странице авторизации', async () => {
        await expect(autorizePage.title).toBeVisible();
    })
})

test("Проверка сообщений об ошибке при всех пустых полях", async ({registrationPage}) => {
    await test.step('переход на страницу /register', async () => {
        await registrationPage.open();
    })
    await test.step('Отоброжается страница /register', async () => {
        await expect(registrationPage.page).toHaveURL(ENDPOINTS.endpointRegistration)
    })
    await test.step('поле ввода email отоброжается', async () => {
        await expect(registrationPage.inputEmail).toBeVisible();
    })
    await test.step('поле ввода пароль отоброжается', async () => {
        await expect(registrationPage.inputPassword).toBeVisible();
    })
    await test.step('поле ввода возраста отоброжается', async () => {
        await expect(registrationPage.inputAge).toBeVisible();
    })
    await test.step('кнопка зарегистрироваться отображается', async () => {
        await expect(registrationPage.registerButon).toBeVisible();
    })
    await test.step('нажатие на кнопку регистрации', async () => {
        await registrationPage.registerButon.click();
    })
    await test.step('отображение сообщения ошибки о том что поле ввода email пустое', async () => {
        await expect(registrationPage.lineEmail).toBeVisible();
    })
    await test.step('отображение сообщения ошибки о том что поле ввода пароля пустое', async () => {
        await expect(registrationPage.linePassword).toBeVisible();
    })  
    await test.step('отображение сообщения ошибки о том что поле ввода возраста пустое', async () => {
        await expect(registrationPage.lineAge).toBeVisible();
    })        
})

test("Проверка сообщения об ошибке при вводе уже существуещего email", async ({registrationPage}) => {
    await test.step('переход на страницу /register', async () => {
        await registrationPage.open();
    })
    await test.step('Отоброжается страница /register', async () => {
        await expect(registrationPage.page).toHaveURL(ENDPOINTS.endpointRegistration)
    })
    await test.step('поле ввода email отоброжается', async () => {
        await expect(registrationPage.inputEmail).toBeVisible();
    })
    await test.step('ввод уже существующего email в поле ввода', async () => {
        await registrationPage.inputEmail.fill(EMAILS.myEmailInBase);
    })
    await test.step('поле ввода пароля отоброжается', async () => {
        await expect(registrationPage.inputPassword).toBeVisible();
    })
    await test.step('ввод уже существующего пароля в поле ввода', async () => {
        await registrationPage.inputPassword.fill(EMAILS.myPasswordAdi);
    })    
    await test.step('поле ввода возраста отоброжается', async () => {
        await expect(registrationPage.inputAge).toBeVisible();
    })    
    await test.step('ввод 18 лет в поле ввода', async () => {
        await registrationPage.inputAge.fill('18');
    })  
    await test.step('кнопка зарегистрироваться отображается', async () => {
        await expect(registrationPage.registerButon).toBeVisible();
    })
    await test.step('нажатие на кнопку регистрации', async () => {
        await registrationPage.registerButon.click();
    })
    await test.step('отоброжается сообщение о том, что пользователь уже существует', async () => {
        await expect(registrationPage.lineEmailAlreadyExists).toBeVisible();
    })
})

test("Проверка сообщения ош ошибке длины вводимого пароля", async ({registrationPage}) => {
    const email = faker.internet.email();
    
    await test.step('переход на страницу /register', async () => {
        await registrationPage.open();
    })
    await test.step('Отоброжается страница /register', async () => {
        await expect(registrationPage.page).toHaveURL(ENDPOINTS.endpointRegistration)
    })
    await test.step('поле ввода email отоброжается', async () => {
        await expect(registrationPage.inputEmail).toBeVisible();
    })
    await test.step('ввод уже существующего email в поле ввода', async () => {
        await registrationPage.inputEmail.fill(email);
    })
    await test.step('поле ввода пароля отоброжается', async () => {
        await expect(registrationPage.inputPassword).toBeVisible();
    })
    await test.step('ввод пароля длиной 5 символов', async () => {
        await registrationPage.inputPassword.fill('12345');
    })
    await test.step('поле ввода возраста отоброжается', async () => {
        await expect(registrationPage.inputAge).toBeVisible();
    })    
    await test.step('ввод 18 лет в поле ввода', async () => {
        await registrationPage.inputAge.fill('18');
    })
    await test.step('кнопка зарегистрироваться отображается', async () => {
        await expect(registrationPage.registerButon).toBeVisible();
    })
    await test.step('нажатие на кнопку регистрации', async () => {
        await registrationPage.registerButon.click();
    })
    await test.step('выводится ошибка о длине пароля < 6 символов', async () => {
        await expect(registrationPage.lineErrorLenPassword).toBeVisible();
    })    
})

test("Проверка сообщения об ошибке неверного email", async ({ registrationPage }) => {
    const brokenEmail = faker.internet
        .email()
        .replace('@', '_')
        .replace('.', '')
    const password = faker.internet.password();
    
    await test.step('переход на страницу /register', async () => {
        await registrationPage.open();
    })
    await test.step('Отоброжается страница /register', async () => {
        await expect(registrationPage.page).toHaveURL(ENDPOINTS.endpointRegistration)
    })
    await test.step('поле ввода email отоброжается', async () => {
        await expect(registrationPage.inputEmail).toBeVisible();
    })
    await test.step('ввод уже существующего email в поле ввода', async () => {
        await registrationPage.inputEmail.fill(brokenEmail);
    })
    await test.step('поле ввода пароля отоброжается', async () => {
        await expect(registrationPage.inputPassword).toBeVisible();
    })
    await test.step('ввод пароля длиной 5 символов', async () => {
        await registrationPage.inputPassword.fill(password);
    })
    await test.step('поле ввода возраста отоброжается', async () => {
        await expect(registrationPage.inputAge).toBeVisible();
    })    
    await test.step('ввод 18 лет в поле ввода', async () => {
        await registrationPage.inputAge.fill('18');
    })
    await test.step('кнопка зарегистрироваться отображается', async () => {
        await expect(registrationPage.registerButon).toBeVisible();
    })
    await test.step('нажатие на кнопку регистрации', async () => {
        await registrationPage.registerButon.click();
    })
    await test.step('вывод ошибки о неверном email', async () => {
        await expect(registrationPage.lineErrorEmail).toBeVisible();
    })    
})

test("Проверка сообщения об ошибке неверного возраста", async ({ registrationPage }) => {
    const email = faker.internet.email()
    const password = faker.internet.password();
    
    await test.step('переход на страницу /register', async () => {
        await registrationPage.open();
    })
    await test.step('Отоброжается страница /register', async () => {
        await expect(registrationPage.page).toHaveURL(ENDPOINTS.endpointRegistration)
    })
    await test.step('поле ввода email отоброжается', async () => {
        await expect(registrationPage.inputEmail).toBeVisible();
    })
    await test.step('ввод уже существующего email в поле ввода', async () => {
        await registrationPage.inputEmail.fill(email);
    })
    await test.step('поле ввода пароля отоброжается', async () => {
        await expect(registrationPage.inputPassword).toBeVisible();
    })
    await test.step('ввод пароля длиной 5 символов', async () => {
        await registrationPage.inputPassword.fill(password);
    })
    await test.step('поле ввода возраста отоброжается', async () => {
        await expect(registrationPage.inputAge).toBeVisible();
    })    
    await test.step('ввод -1 лет в поле ввода', async () => {
        await registrationPage.inputAge.fill('-1');
    })
    await test.step('кнопка зарегистрироваться отображается', async () => {
        await expect(registrationPage.registerButon).toBeVisible();
    })
    await test.step('нажатие на кнопку регистрации', async () => {
        await registrationPage.registerButon.click();
    })
    await test.step('отображение ошибки, что в поле вводится только числа', async () => {
        await expect(registrationPage.lineErrorAgeNumber).toBeVisible();
    })    
})

test.skip("Успешная регистрация пользователя", async ({ registrationPage, userPage }) => {
    const email = faker.internet.email()
    const password = faker.internet.password();
    const age = faker.number.int({min: 0, max: 100}).toString();
    
    await test.step('переход на страницу /register', async () => {
        await registrationPage.open();
    })
    await test.step('Отоброжается страница /register', async () => {
        await expect(registrationPage.page).toHaveURL(ENDPOINTS.endpointRegistration)
    })
    await test.step('поле ввода email отоброжается', async () => {
        await expect(registrationPage.inputEmail).toBeVisible();
    })
    await test.step('ввод уже существующего email в поле ввода', async () => {
        await registrationPage.inputEmail.fill(email);
    })
    await test.step('поле ввода пароля отоброжается', async () => {
        await expect(registrationPage.inputPassword).toBeVisible();
    })
    await test.step('ввод пароля длиной 5 символов', async () => {
        await registrationPage.inputPassword.fill(password);
    })
    await test.step('поле ввода возраста отоброжается', async () => {
        await expect(registrationPage.inputAge).toBeVisible();
    })    
    await test.step('ввод -1 лет в поле ввода', async () => {
        await registrationPage.inputAge.fill(age);
    })
    await test.step('кнопка зарегистрироваться отображается', async () => {
        await expect(registrationPage.registerButon).toBeVisible();
    })
    await test.step('нажатие на кнопку регистрации', async () => {
        await registrationPage.registerButon.click();
    })
    await test.step('Отоброжается страница пользователя /', async () => {
        await expect(userPage.page).toHaveURL(ENDPOINTS.enpointMain)
    })
    await test.step('Отображается аватар пользователя', async () => {
        await expect(userPage.userAvatar).toBeVisible();
    })
    await test.step('отображается стандартное имя пользователя Neko', async () => {
        await expect(userPage.lineUserNickName).toBeVisible();
    })    
})