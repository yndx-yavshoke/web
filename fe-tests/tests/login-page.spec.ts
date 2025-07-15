import {expect} from "@playwright/test";
import {test} from '../fixtures/index';
import {faker} from '@faker-js/faker';


test('title visible', async ({loginPage}) => {
  await test.step('check visibility title', async () => {
    await expect(loginPage.title).toBeVisible();
  })
})

test('check input email  visible', async ({loginPage}) => {
    await test.step('check visibility input email', async () => {
        await expect(loginPage.inputEmail).toBeVisible();
  })
})

test('check input password  visible', async ({loginPage}) => {
    await test.step('check visibility input password', async () => {
        await expect(loginPage.inputPassword).toBeVisible();
  })
})

test('check login button  visible', async ({loginPage}) => {
    await test.step('check visibility login button', async () => {
        await expect(loginPage.loginButton).toBeVisible();
  })
})

test('check reg button visible', async ({loginPage}) => {
    await test.step('check visibility reg button', async () => {
        await expect(loginPage.registerButton).toBeVisible();
  })
})

test('check back button visible', async ({loginPage}) => {
    await test.step('check visibility back button', async () => {
        await expect(loginPage.backButton).toBeVisible();
  })
})

test('check log button visible', async ({loginPage}) => {
    await test.step('check visibility log button', async () => {
        await expect(loginPage.loginButton).toBeVisible();
  })
})

test('warn message empty feelds', async ({loginPage}) => {
    await test.step('click login button', async () => {
        await loginPage.loginButton.click();
    })

    await test.step('check warn messages (empty feelds)', async () => {
        await expect(loginPage.page.getByText('Введите email')).toBeVisible();
        await expect(loginPage.page.getByText('Введите пароль')).toBeVisible();
    })
})

test('warn message invalid data', async ({loginPage}) => {
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password({length: 15});

    await test.step('fill email, password and click login button', async () => {
        await loginPage.inputEmail.fill(fakeEmail);
        await loginPage.inputPassword.fill(fakePassword);
        await loginPage.loginButton.click();
    })

    await test.step('check warn message "Неправильный логин или пароль"', async () => {
        
        await new Promise(res => setTimeout(res, 100)); // плохая практика, по-другому не получилось
        
        await expect(loginPage.warnMessage).toBeVisible()
    })
})

test('back button', async ({loginPage}) => {
    await test.step('click back button', async () => {
        await loginPage.backButton.click();
    })

    await test.step('check URL', async () => {
        await expect(loginPage.page).toHaveURL('https://yavshok.ru');
    })
})

test('reg button', async ({loginPage}) => {
    await test.step('click reg button', async () => {
        await expect(loginPage.registerButton).toBeEnabled();
        await loginPage.registerButton.click();
    })

    await test.step('check URL', async () => {

        await expect(loginPage.page).toHaveURL('https://yavshok.ru/register');

    })
})