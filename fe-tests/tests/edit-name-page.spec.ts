import {expect} from "@playwright/test";
import {test} from '../fixtures/index';
import { fa, faker } from "@faker-js/faker";

test.use({storageState: 'tests/setup/.auth/user.json'});

test('visibility input name', async ({editPage}) => {

    await test.step('redirect to edit page' , async () => {

        await editPage.page.goto('/');

        await expect(editPage.page).toHaveURL('https://yavshok.ru');

        await editPage.page.getByTestId('user-edit-profile-button').click();

        await expect(editPage.page).toHaveURL(/^https?:\/\/yavshok\.ru\/edit/);

    })


    await test.step('check visibility input name', async () => {
        await expect(editPage.inputName).toBeVisible();
    })
})

test('visibility save button', async ({editPage}) => {

    await test.step('redirect to edit page' , async () => {

        await editPage.page.goto('/');

        await expect(editPage.page).toHaveURL('https://yavshok.ru');

        await editPage.page.getByTestId('user-edit-profile-button').click();

        await expect(editPage.page).toHaveURL(/^https?:\/\/yavshok\.ru\/edit/);

    })


    await test.step('check visisbility save button', async () => {
        await expect(editPage.saveButton).toBeVisible();
    })
})

test('visibility cancel button', async ({editPage}) => {

    await test.step('redirect to edit page' , async () => {

        await editPage.page.goto('/');

        await expect(editPage.page).toHaveURL('https://yavshok.ru');

        await editPage.page.getByTestId('user-edit-profile-button').click();

        await expect(editPage.page).toHaveURL(/^https?:\/\/yavshok\.ru\/edit/);

    })


    await test.step('check visibility cancel button', async () => {
        await expect(editPage.cancelButton).toBeVisible();
    })
})

test('visibilty title', async ({editPage}) => {

    await test.step('redirect to edit page' , async () => {

        await editPage.page.goto('/');

        await expect(editPage.page).toHaveURL('https://yavshok.ru');

        await editPage.page.getByTestId('user-edit-profile-button').click();

        await expect(editPage.page).toHaveURL(/^https?:\/\/yavshok\.ru\/edit/);

    })


    await test.step('check visibility title', async () => {
        await expect(editPage.title).toBeVisible();
    })
})

test('change name', async({editPage }) => {

    const fakeName = faker.person.fullName();

    await test.step('redirect to edit page' , async () => {

        await editPage.page.goto('/');

        await expect(editPage.page).toHaveURL('https://yavshok.ru');

        await editPage.page.getByTestId('user-edit-profile-button').click();

        await expect(editPage.page).toHaveURL(/^https?:\/\/yavshok\.ru\/edit/);

    })

    await test.step('fill new name', async () => {
        await editPage.inputName.fill('');

        await editPage.inputName.fill(fakeName);
    })

    await test.step('click save button', async () => {
        await editPage.saveButton.click();

        await expect(editPage.page.getByText('Save Changes', {exact: true})).toBeVisible();
    })

    await test.step('click cancel button', async () => {
         await editPage.cancelButton.click();
    })

    await test.step('check URL profile page and check new name', async () => {
        await expect(editPage.page).toHaveURL('https://yavshok.ru');
        await expect(editPage.page.getByText(`${fakeName}`)).toBeVisible();
    })
    
})

test('empty name test', async({editPage}) => {

    await test.step('redirect to edit page' , async () => {

        await editPage.page.goto('/');

        await expect(editPage.page).toHaveURL('https://yavshok.ru');

        await editPage.page.getByTestId('user-edit-profile-button').click();

        await expect(editPage.page).toHaveURL(/^https?:\/\/yavshok\.ru\/edit/);

    })
    
    await test.step('fill empty name', async () => {
        await editPage.inputName.fill('');
    })

    await test.step('click save button', async () => {
        await editPage.saveButton.click();
    })

    await test.step('check warn message "Name is required"', async () => {
        await expect(editPage.page.getByText('Name is required')).toBeVisible();
    })
})

test('name with more than 50 symbols', async ({editPage}) => {

    await test.step('redirect to edit page' , async () => {

        await editPage.page.goto('/');

        await expect(editPage.page).toHaveURL('https://yavshok.ru');

        await editPage.page.getByTestId('user-edit-profile-button').click();

        await expect(editPage.page).toHaveURL(/^https?:\/\/yavshok\.ru\/edit/);

    })

    await test.step('fill name with 51 symbols', async () => {
        
        const fakeName51 = faker.internet.password({length: 51});

        await editPage.inputName.fill('');
        await editPage.inputName.fill(fakeName51);

    })

    await test.step('click save button', async () => {

        await editPage.saveButton.click();

    })

    await test.step('check warn message "Name must be less than 50 characters"', async () =>
    {
        await expect(editPage.page.getByText('Name must be less than 50 characters', {exact: true})).toBeVisible();

    })

})
