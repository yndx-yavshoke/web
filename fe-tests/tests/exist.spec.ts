import { test } from "../fixtures";
import * as allure from "allure-js-commons";

test.use({ storageState: 'playwright/.auth/user.json' });

test.beforeEach(async ({ editPage }) => {
    await allure.step('Открыть страницу редактирования профиля', async () => {
        await editPage.open();
    });
});

test('edit name', async ({ editPage, profilePage }) => {
    await allure.epic('Редактирование профиля');
    await allure.feature('Изменение имени');
    await allure.story('Успешное изменение имени');

    const newName = 'Kim';

    await allure.step('Ввести новое имя и сохранить', async () => {
        await editPage.edit(newName);
    });

    await allure.step('Вернуться на страницу профиля', async () => {
        await editPage.backToProfile();
    });

    await allure.step('Проверить отображение нового имени', async () => {
        await profilePage.expectNewUsernameVisible(newName);
    });
});

test('edit with empty name', async ({ editPage }) => {
    await allure.epic('Редактирование профиля');
    await allure.feature('Валидация имени');
    await allure.story('Попытка сохранения пустого имени');

    await allure.step('Очистить поле имени и сохранить', async () => {
        await editPage.edit('');
    });

    await allure.step('Проверить сообщение об ошибке', async () => {
        await editPage.expectEmptyNameMessage();
    });
});

test('name placeholder', async ({ editPage }) => {
    await allure.epic('UI проверки');
    await allure.feature('Плейсхолдер имени');
    await allure.story('Отображение плейсхолдера');

    await allure.step('Очистить поле имени', async () => {
        await editPage.edit('');
    });

    await allure.step('Проверить отображение плейсхолдера', async () => {
        await editPage.expectNamePlaceholderVisible();
    });
});