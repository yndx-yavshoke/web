import { test, expect } from '@playwright/test';
import { UserProfilePage } from './fixtures/UserProfilePage';
import { UserNameUpdatePage } from './fixtures/UserNameUpdatePage';
import auth from './setup/auth.json';

test.use({ storageState: auth });

test.describe('Проверка профиля пользователя', () => {
    let profilePage: UserProfilePage;
    let userNameUpdatePage: UserNameUpdatePage;

    test.beforeEach(async ({ page }) => {
        profilePage = new UserProfilePage(page);

        await test.step('Открываем страницу профиля', async () => {
            await profilePage.Open();
        });
        await test.step('Проверяем отображение UI-элементов', async () => {
            await profilePage.CheckUserAvatar();
            await profilePage.CheckUserName();
            await profilePage.CheckUserStatus();
            await profilePage.CheckButtonEditProfile();
            await profilePage.CheckLogoutButton();
            await profilePage.CheckGallery();
        });
    });

    test('Проверка возможности изменения имени пользователя', async ({ page }) => {
        await test.step('Сохраняем старое имя пользователя', async () => {
            await profilePage.SaveOldName();
        });

        userNameUpdatePage = new UserNameUpdatePage(page);

        await test.step('Проверяем, что кнопка "Изменить имя" переводит на страницу изменения имени', async () => {
            await userNameUpdatePage.Open();
            await userNameUpdatePage.CheckTitle();
            await userNameUpdatePage.CheckTextName();
            await userNameUpdatePage.CheckInputName();
            await userNameUpdatePage.CheckSaveChangesButton();
            await userNameUpdatePage.CheckCancelButton();
        });
        await test.step('Изменяем имя пользователя на непустое значение', async () => {
            await userNameUpdatePage.UpdateName();
        });
        await test.step('Проверяем, что имя пользователя изменилось', async () => {
            await profilePage.SaveChangedName();
            await profilePage.CheckIsChangedName();
        });
    });

    test('При пустом имени пользователя не происходит изменение имени', async ({ page }) => {
        await test.step('Сохраняем старое имя пользователя', async () => {
            await profilePage.SaveOldName();
        });

        userNameUpdatePage = new UserNameUpdatePage(page);

        await test.step('Проверяем, что кнопка "Изменить имя" переводит на страницу изменения имени', async () => {
            await userNameUpdatePage.Open();
            await userNameUpdatePage.CheckTitle();
            await userNameUpdatePage.CheckTextName();
            await userNameUpdatePage.CheckInputName();
            await userNameUpdatePage.CheckSaveChangesButton();
            await userNameUpdatePage.CheckCancelButton();
        });
        await test.step('Изменяем имя пользователя на пустое значение', async () => {
            await userNameUpdatePage.UpdateNameEmpty();
        });
        await test.step('Проверяем, что имя пользователя не изменилось', async () => {
            await profilePage.CheckIsNotChangedNameWhenEmpty();
        });
    });

    test('Проверка возможности выхода из аккаунта', async ({ page }) => {
        await test.step('Выходим из аккаунта', async () => {
            await profilePage.Logout();
        });
    });
});