import {expect} from "@playwright/test";
import {test} from '../fixtures/index';



test.use({storageState: 'tests/setup/.auth/user.json'});



test('visibilty edit button', async ({profilePage}) => {

    await test.step('check visibility edit button', async () => {
        await expect(profilePage.editButton).toBeVisible();
    })

})

test('visibilty logout button', async ({profilePage}) => {

    await test.step('check visibility logout button', async () => {
        await expect(profilePage.logoutButton).toBeVisible();
    })

})

test('check edit button', async ({profilePage}) => {
    await test.step('click edit button', async () => {
        await profilePage.editButton.click();
    })

    await test.step('check URL', async () => {
        await expect(profilePage.page).toHaveURL(/^https?:\/\/yavshok\.ru\/edit/);
    })

})

test('check logout button', async ({profilePage}) => {

    await test.step('click logout button', async () => {
        await profilePage.logoutButton.click();
    })

    await test.step('chekc URL', async () => {
        await expect(profilePage.page).toHaveURL('https://yavshok.ru');
    })
})