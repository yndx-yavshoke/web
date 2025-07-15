import { expect } from "@playwright/test"
import { test } from '../screens/index'
import { EMAILS } from "../constants/testData"
import { faker } from "@faker-js/faker"
import { ENDPOINTS } from "../constants/testData"

test('Проверка наличия плейсхолдеров в полях ввода email и Пароль', async ({autorizePage}) => {
    await test.step('Открыть страницу https://yavshok.ru/login', async () => {
        await autorizePage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/login', async () => {
        await expect(autorizePage.page).toHaveURL(ENDPOINTS.endpointLogin)
    })
    await test.step('Отоброжается поле ввода Email', async () => {
        await expect(autorizePage.inputEmail).toBeVisible();
    } )
    await test.step('Плейсхолдер в поле email отоброжается', async () => {
        await expect(autorizePage.inputEmail).toHaveAttribute('placeholder', 'Email');
    })
    await test.step('Отоброжается поле ввода password', async () => {
        await expect(autorizePage.inputPassword).toBeVisible();
    })
    await test.step('Отоброжается плейсхолдер в поле password', async () => {
        await expect(autorizePage.inputPassword).toHaveAttribute('placeholder', 'Пароль');
    })    
})

test('Проверка входа несуществуещего пользователя', async ({autorizePage}) => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    
    await test.step('Открыть страницу https://yavshok.ru/login', async () => {
        await autorizePage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/login', async () => {
        await expect(autorizePage.page).toHaveURL(ENDPOINTS.endpointLogin)
    })
    await test.step('Отоброжается поле ввода Email', async () => {
        await expect(autorizePage.inputEmail).toBeVisible();
    })
    await test.step('Вввод данных в поле email', async () => {
        await autorizePage.inputEmail.fill(email);
    })
    await test.step('Отоброжается поле ввода password', async () => {
        await expect(autorizePage.inputPassword).toBeVisible();
    })
    await test.step('Ввод данных в поле password', async () => {
        await autorizePage.inputPassword.fill(password);
    })
    await test.step('Кнопка входа отоброжается', async () => {
        await expect(autorizePage.buttonEnter).toBeVisible();
    })
    await test.step('Нажатие на кнопку входа', async () => {
        await autorizePage.buttonEnter.click();
    })
    await test.step('Вывод сообщения об ошибке', async () => {
        await expect(autorizePage.lineErrorEnter).toBeVisible();
    })    
})

test("Проверка вывода об ошбике при не введеном email", async ({autorizePage}) => {
    const password = faker.internet.password();

    await test.step('Открыть страницу https://yavshok.ru/login', async () => {
        await autorizePage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/login', async () => {
        await expect(autorizePage.page).toHaveURL(ENDPOINTS.endpointLogin)
    })
    await test.step('Отоброжается поле ввода Email', async () => {
        await expect(autorizePage.inputEmail).toBeVisible();
    })
    await test.step('Отоброжается поле ввода password', async () => {
        await expect(autorizePage.inputPassword).toBeVisible();
    })
    await test.step('Ввод данных в поле password', async () => {
        await autorizePage.inputPassword.fill(password);
    })
    await test.step('Кнопка входа отоброжается', async () => {
        await expect(autorizePage.buttonEnter).toBeVisible();
    })
    await test.step('Нажатие на кнопку входа', async () => {
        await autorizePage.buttonEnter.click();
    })
    await test.step('Отображение ошибки о не введенном email', async () => {
        await expect(autorizePage.lineErrorEmail).toBeVisible();
    })    
}) 

test("Проверка вывода об ошбике при не введеном password", async ({autorizePage}) => {
    const email = faker.internet.email();

    await test.step('Открыть страницу https://yavshok.ru/login', async () => {
        await autorizePage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/login', async () => {
        await expect(autorizePage.page).toHaveURL(ENDPOINTS.endpointLogin)
    })
    await test.step('Отоброжается поле ввода Email', async () => {
        await expect(autorizePage.inputEmail).toBeVisible();
    })
    await test.step('Вввод данных в поле email', async () => {
        await autorizePage.inputEmail.fill(email);
    })
    await test.step('Отоброжается поле ввода password', async () => {
        await expect(autorizePage.inputPassword).toBeVisible();
    })
    await test.step('Кнопка входа отоброжается', async () => {
        await expect(autorizePage.buttonEnter).toBeVisible();
    })
    await test.step('Нажатие на кнопку входа', async () => {
        await autorizePage.buttonEnter.click();
    })
    await test.step('Отображение ошибки о невведенном password', async () => {
        await expect(autorizePage.lineErrorPassword).toBeVisible();
    })    
}) 

test("Проверка вывода ошибки при вводе не валидных данных", async ({autorizePage}) => {
    const brokenEmail = faker.internet
        .email()
        .replace('@', '_')
        .replace('.', '')
    const password = faker.internet.password();

    await test.step('Открыть страницу https://yavshok.ru/login', async () => {
        await autorizePage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/login', async () => {
        await expect(autorizePage.page).toHaveURL(ENDPOINTS.endpointLogin)
    })
    await test.step('Отоброжается поле ввода Email', async () => {
        await expect(autorizePage.inputEmail).toBeVisible();
    })
    await test.step('Вввод данных в поле email', async () => {
        await autorizePage.inputEmail.fill(brokenEmail);
    })
    await test.step('Отоброжается поле ввода password', async () => {
        await expect(autorizePage.inputPassword).toBeVisible();
    })
    await test.step('Ввод данных в поле password', async () => {
        await autorizePage.inputPassword.fill(password);
    })
    await test.step('Кнопка входа отоброжается', async () => {
        await expect(autorizePage.buttonEnter).toBeVisible();
    })
    await test.step('Нажатие на кнопку входа', async () => {
        await autorizePage.buttonEnter.click();
    })
    await test.step('Отображение ошибки', async () => {
        await expect(autorizePage.lineError).toBeVisible();
    })    
})

test("Проверка работоспособности кнопки назад.", async ({autorizePage, mainPage}) => {
    await test.step('Открыть страницу https://yavshok.ru/login', async () => {
        await autorizePage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/login', async () => {
        await expect(autorizePage.page).toHaveURL(ENDPOINTS.endpointLogin)
    })
    await test.step('Кнопка назад отображается', async () => {
        await expect(autorizePage.buttonBack).toBeVisible();
    })
    await test.step('Нажатие на кнопку назад', async () => {
        await autorizePage.buttonBack.click();
    })
    await test.step('Отоброжается страница https://yavshok.ru/', async () => {
        await expect(mainPage.page).toHaveURL(ENDPOINTS.enpointMain)
    })
    await test.step('Отображается заголовок стартовой страницы', async () => {
        await expect(mainPage.title).toBeVisible();
    })
})

test("Проверка работоспособности кнопки Регистрация", async ({autorizePage, registrationPage}) => {
    await test.step('Открыть страницу https://yavshok.ru/login', async () => {
        await autorizePage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/login', async () => {
        await expect(autorizePage.page).toHaveURL(ENDPOINTS.endpointLogin)
    })
    await test.step('Отображается кнопка регистрации', async () => {
        await expect(autorizePage.buttonRegistration).toBeVisible();
    })
    await test.step('Нажатие на кнопку регистрация', async () => {
        await autorizePage.buttonRegistration.click();
    })
    await test.step('Отображается страница https://yavshok.ru/register', async () => {
        await expect(registrationPage.page).toHaveURL(ENDPOINTS.endpointRegistration)
    })    
    await test.step('Отображается заголовок страницы регистрации', async () => {
        await expect(registrationPage.title).toBeVisible();
    })    
})

test("Проверка входа в личный кабинет", async ({autorizePage, userPage}) => {
    await test.step('Открыть страницу https://yavshok.ru/login', async () => {
        await autorizePage.open();
    })
    await test.step('Отоброжается страница https://yavshok.ru/login', async () => {
        await expect(autorizePage.page).toHaveURL(ENDPOINTS.endpointLogin)
    })
    await test.step('Отображается поле ввода email', async () => {
        await expect(autorizePage.inputEmail).toBeVisible();
    })
    await test.step('Ввод существуещего email', async () => {
        await autorizePage.inputEmail.fill(EMAILS.myEmailInBase);
    })
    await test.step('Отоброжается поле ввода password', async () => {
        await expect(autorizePage.inputPassword).toBeVisible();
    })
    await test.step('Ввод соответсвующего password', async () => {
        await autorizePage.inputPassword.fill(EMAILS.myPasswordAdi);
    })
    await test.step('Кнопка входа отоброжается', async () => {
        await expect(autorizePage.buttonEnter).toBeVisible();
    })
    await test.step('Нажатие на кнопку входа', async () => {
        await autorizePage.buttonEnter.click();
    })
    await test.step('Отображается страница пользователя https://yavshok.ru/', async () => {
        await expect(userPage.page).toHaveURL(ENDPOINTS.enpointMain)
    })
    await test.step('Отображается аватар пользователя', async () => {
        await expect(userPage.userAvatar).toBeVisible();    
    })    
})