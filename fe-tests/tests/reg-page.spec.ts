import {expect} from "@playwright/test";
import {test} from '../fixtures/index';
import {faker} from '@faker-js/faker';
import {getRandomNumber} from '../utils/generate-data';


test('visibility title', async ({regPage}) => {

    await test.step('check visibility title', async () => {
        await expect(regPage.title).toBeVisible();
    })
})

test('visibility input email', async ({regPage}) => {

    await test.step('check visibility input email', async () => {
        await expect(regPage.inputEmail).toBeVisible();
    })
})

test('visibility input passwrd', async ({regPage}) => {

    await test.step('check visibility input passwd', async () => {
        await expect(regPage.inputPassword).toBeVisible();
    })
})

test('visibility input age', async ({regPage}) => {

    await test.step('check visibility input age', async () => {
        await expect(regPage.inputAge).toBeVisible();
    })
})

test('visibility reg button', async ({regPage}) => {

    await test.step('check visibility reg button', async () => {
        await expect(regPage.regButton).toBeVisible();
    })
})

test('visibility back button', async ({regPage}) => {

    await test.step('check visibility back button', async () => {
        await expect(regPage.backButton).toBeVisible();
    })
})

test('empty feelds', async ({regPage}) => {
    await test.step('click reg button', async () => {
        await regPage.regButton.click();
    })

    await test.step('check warn messages (empty input feelds)', async () => {
        await expect(regPage.page.getByText('Введите email')).toBeVisible();
        await expect(regPage.page.getByText('Введите пароль')).toBeVisible();
        await expect(regPage.page.getByText('Введите возраст')).toBeVisible();
    })
    
})

test('reg with existing email', async ({regPage}) => {

    const fakePassword = faker.internet.password({length: 15});
    const fakeAge = Math.floor(Math.random() * 101);
    const fakeAgeStr: string = String(fakeAge);

    await test.step('fill existing email',async () => {
        await regPage.inputEmail.fill('test123456@test.com')
    })

    await test.step('fill password and age', async () => {
        await regPage.inputPassword.fill(fakePassword);
        await regPage.inputAge.fill(fakeAgeStr);
    })

   await test.step('click reg button', async () => {
     await regPage.regButton.click();
   })

    await test.step('check warn message "Пользователь с таким email уже существует"', async () => {
        await expect(regPage.page.getByText('Пользователь с таким email уже существует')).toBeVisible();
    })

})

test('short password', async ({regPage}) => {
    await test.step('fill enail', async () => {
        await regPage.inputEmail.fill(faker.internet.email());
    })

    await test.step('fill short password(3 symbols)', async () => {
        await regPage.inputPassword.fill(faker.internet.password({length: 3}))
    })

    await test.step('fill age', async () => {
        await regPage.inputAge.fill(getRandomNumber());
    })

    await test.step('click reg button', async () => {
        await regPage.regButton.click();
    })

    await test.step('check warn message "Пароль должен содержать минимум 6 символов"', async () => {
        await expect(regPage.page.getByText('Пароль должен содержать минимум 6 символов')).toBeVisible();
    })
})

test('not a number in age', async ({regPage}) => {
    await test.step('fill email and age', async () => {
        await regPage.inputEmail.fill(faker.internet.email());
        await regPage.inputPassword.fill(faker.internet.password());
    })
    await test.step('fill string in age', async () => {
        await regPage.inputAge.fill(faker.person.firstName());
    })
    await test.step('click reg button', async () => {
        await regPage.regButton.click();
    })

    await test.step('check warn message "Возраст должен быть числом" ', async () => {
        await expect(regPage.page.getByText('Возраст должен быть числом')).toBeVisible();

    })
})

test('negative number in age', async ({regPage}) => {
    await test.step('fill email and age', async () => {
        await regPage.inputEmail.fill(faker.internet.email());
        await regPage.inputPassword.fill(faker.internet.password());
    })

    await test.step('fill negative number in age', async () => {
        await regPage.inputAge.fill(faker.person.firstName());
    })


     await test.step('click reg button', async () => {
        await regPage.regButton.click();
    })

    await test.step('check warn message "Возраст должен быть числом" ', async () => {
        await expect(regPage.page.getByText('Возраст должен быть числом')).toBeVisible();

    })

})

test('correct registration', async ({regPage}) => {
    await test.step('fill email, password and age', async () => {
        await regPage.inputEmail.fill(faker.internet.email());
        await regPage.inputPassword.fill(faker.internet.password());
        await regPage.inputAge.fill(getRandomNumber());
    })
    
    await test.step('click reg button', async () => {
        await regPage.regButton.click();
    })

    await test.step('check url page and visibility title', async () => {
        await expect(regPage.page).toHaveURL('https://yavshok.ru')
        await expect(regPage.title).not.toBeVisible();
    })

})