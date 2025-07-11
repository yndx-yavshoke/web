import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { faker } from '@faker-js/faker';

test.use({ storageState: 'tests/setup/.auth/user.json' });

test.beforeEach(async ({ editPage }) => {
    await editPage.open();

    await expect(editPage.title).toBeVisible();
});


test('Successful name changing', async ({ editPage }) => {
    const newName = faker.person.firstName('male');
    
    await editPage.clearName();

    await editPage.editName(newName);
});

test('Cancel name changing', async ({ editPage, userProfilePage, mainPage }) => {
    await editPage.backToProfileButton.click();

    await expect(mainPage.inputEmail).not.toBeVisible();

    await expect(userProfilePage.logoutButton).toBeVisible();
});

test('Unsuccessful name changing (empty name field)', async ({ editPage }) => {
    await editPage.clearName();

    await expect(editPage.inputName).toBeEmpty();
    await expect(editPage.inputNamePlaceholder).toBeVisible();

    await editPage.saveButton.click();

    await expect(editPage.warningEmptyName).toBeVisible();
});