import { test } from './fixtures/ShokFixtures';

test.use({ storageState: './tests/setup/auth.json' });

test.describe('Проверка профиля пользователя', () => {

    test.beforeEach(async ({ userProfilePage }) => {

        await test.step('Открываем страницу профиля', async () => {
            await userProfilePage.Open();
        });
        await test.step('Проверяем отображение UI-элементов', async () => {
            await userProfilePage.CheckUserAvatar();
            await userProfilePage.CheckUserName();
            await userProfilePage.CheckUserStatus();
            await userProfilePage.CheckButtonEditProfile();
            await userProfilePage.CheckLogoutButton();
            await userProfilePage.CheckGallery();
        });
    });

    test('Проверка возможности изменения имени пользователя', async ({ userProfilePage, userNameUpdatePage }) => {
        await test.step('Сохраняем старое имя пользователя', async () => {
            await userProfilePage.SaveOldName();
        });

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
            await userProfilePage.SaveChangedName();
            await userProfilePage.CheckIsChangedName();
        });
    });

    test('При пустом имени пользователя не происходит изменение имени', async ({ userProfilePage, userNameUpdatePage }) => {
        await test.step('Сохраняем старое имя пользователя', async () => {
            await userProfilePage.SaveOldName();
        });

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
            await userProfilePage.CheckIsNotChangedNameWhenEmpty();
        });
    });

    test('Проверка возможности выхода из аккаунта', async ({ userProfilePage }) => {
        await test.step('Выходим из аккаунта', async () => {
            await userProfilePage.Logout();
        });
    });
});