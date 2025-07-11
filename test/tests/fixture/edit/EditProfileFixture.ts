import { test as base, expect } from '@playwright/test';
import { ProfilePage } from '../ProfilePage';
import { EditProfilePage } from '../edit/EditProfilePage';
import { editData } from '../edit/EditProfileData';
import { executionAsyncId } from 'async_hooks';


type MyFixture = {
    changeName: string;
}

export const test = base.extend<MyFixture>({

    changeName: async ({ page }, use) => {

        await test.step('Initialize ProfilePage object, initialize name', async () => {
            const profilePage = new ProfilePage(page);
            const editPage = new EditProfilePage(page);

            await test.step('Open progile page', async () => {
                await page.goto('https://yavshok.ru/');
            });

            await test.step('Waiting edit profile button is avaliable', async () => {
                await profilePage.editButton.waitFor();
            });

            await test.step('Clicking on Edit Profile button', async () => {
                await profilePage.editButton.click();
            });

            await test.step('Waiting name field to be available', async () => {
                await editPage.nameInput.waitFor();
            });

            await use('nameChanged');
        });
    }
});