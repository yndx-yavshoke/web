import { test } from "./fixture/edit/EditProfileFixture";
import { editData } from './fixture/edit/EditProfileData';
import { ProfilePage } from './fixture/ProfilePage';
import { EditProfilePage } from "./fixture/edit/EditProfilePage";
import { expect } from '@playwright/test';

test('Checking for successful name changing', async ({ page, changeName }) => {

    await test.step('Initialize ProfilePage object, initialize name', async () => {
        const profilePage = new ProfilePage(page);
        const editPage = new EditProfilePage(page);
        const changedName = editData.name;

        await test.step('Checking for Save button has right placeholder', async () => {
            await expect(editPage.saveChangesButton).toHaveText('Save Changes');
        });

        await test.step('Checking for Cancel button has right placeholder', async () => {
            await expect(editPage.cancelButton).toHaveText('Cancel');
        });

        await test.step('Filling name field with new random name', async () => {
            await editPage.nameInput.fill(changedName);
        });

        await test.step('Clicking on Save Changes button', async () => {
            await editPage.saveChangesButton.click();
        });

        await test.step('Go back to Profile page', async () => {
            await editPage.cancelButton.click();
        });

        await test.step('Checking name is changed', async () => {
            expect(profilePage.name).toBe(changedName);
        });
    });
})