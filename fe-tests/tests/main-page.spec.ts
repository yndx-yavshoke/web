import {expect} from "@playwright/test";
import {test} from '../fixtures/index';
import {faker} from '@faker-js/faker';

test('title visible', async ({mainPage}) => {
  await test.step('check visibility title' , async () => {
    await expect(mainPage.title).toBeVisible();
  })
})

test('chekcbutton visible', async ({mainPage}) => {

  await test.step('check visibility checkbutton' , async () => {
    await expect(mainPage.checkButton).toBeVisible();
  })
})

test('loginbutton visible', async ({mainPage}) => {

 await test.step('check visibility loginbutton' , async () => {
    await expect(mainPage.toLoginButton).toBeVisible();
  })
})

test('input-email visible', async ({mainPage}) => {

  await test.step('check visibility input-email' , async () => {
    await expect(mainPage.input).toBeVisible();
  })
})

test('check shokovost', async ({mainPage}) => {

  await test.step('fill email and click check button', async () => {

    await mainPage.input.fill('test123456@test.com');
    await mainPage.checkButton.click();
  })

  await test.step('check visibility title and cat GIF', async () => {

    await expect(mainPage.titleInShok).toBeVisible();
    await expect(mainPage.happyCatGIF).toBeVisible();
  })
})

test('check not shokovost', async ({ mainPage }, testInfo) => {
  const fakeEmail = faker.internet.email();

  await test.step('fill email and click check button', async () => {
    await mainPage.input.fill(fakeEmail);
    await mainPage.checkButton.click();
  });

  await test.step('check visibility title', async () => {
    await expect(mainPage.titleNotShok).toBeVisible();
  });
});

test('redirect to login page', async ({mainPage}) => {
  await test.step('click to login button', async() => {
    await mainPage.toLoginButton.click();
  })
  await test.step('check url', async() => {
    await expect(mainPage.page).toHaveURL('https://yavshok.ru/login');
  })
})