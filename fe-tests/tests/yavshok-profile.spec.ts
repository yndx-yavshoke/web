import { expect } from '@playwright/test';
import {test} from '../fixtures/index'

//готово

test.use({ storageState: 'tests/setup/.auth/user.json' }); //работаем из залогиненного состояния

const mockAgeYoung = {
    "flags": {
        "age": {
            "enabled": true,
            "young": {
                "from": 0,
                "to": 21
            },
            "adult": {
                "from": 22,
                "to": 68
            },
            "old": {
                "from": 69,
                "to": 99
            },
            "oldFrom": 30,
            "youngFrom": 2
        }
    }
}

const mockAgeAdult = {
    "flags": {
        "age": {
            "enabled": true,
            "young": {
                "from": 0,
                "to": 21
            },
            "adult": {
                "from": 22,
                "to": 68
            },
            "old": {
                "from": 69,
                "to": 99
            },
            "oldFrom": 30,
            "youngFrom": 2
        }
    }
}

const mockAgeOld = {
    "flags": {
        "age": {
            "enabled": true,
            "young": {
                "from": 0,
                "to": 21
            },
            "adult": {
                "from": 22,
                "to": 68
            },
            "old": {
                "from": 69,
                "to": 99
            },
            "oldFrom": 20,
            "youngFrom": 2
        }
    }
}

test('Внешний вид и атрибуты элементов', async({ profilePage }) =>{
    await profilePage.open();

    await expect(profilePage.page, 'Открылась неверная страница').toHaveURL('/');
    await expect(profilePage.page.getByTestId('main-email-input'), 'Не произошла авторизация, отображается главная страница вместо страницы профиля').not.toBeVisible(); // проверяем, что стр логина выгрузилась

    // await expect(profilePage.name, 'Не отображается имя пользователя').toBeVisible();
    await expect(profilePage.userAvatar, 'Не отображается аватар пользователя').toBeVisible();
    await expect(profilePage.logOutButton, 'Не отображается кнопка выхода из профиля').toBeVisible();
    await expect(profilePage.editNameButton, 'Не отображается кнопка смены имени').toBeVisible();

    // await expect(profilePage.status, 'Не отображается статус').toBeVisible();
})

test('Отображение статуса молодого котика', async({ profilePage }) => {
    await profilePage.open();

    await profilePage.page.route('https://api.yavshok.ru/experiments', route => 
        route.fulfill({
            status: 200,
            body: JSON.stringify(mockAgeYoung),
        })
    );
    
    await expect(profilePage.page.getByTestId('main-email-input'), 'Не произошла авторизация, отображается главная страница вместо страницы профиля').not.toBeVisible(); // проверяем, что стр логина выгрузилась
    await expect(profilePage.logOutButton, 'Не загрузилась страница профиля').toBeVisible(); // проверяем, что страница профиля вгрузилась
    await expect(profilePage.page.getByText('Ты молоденький котик'), 'Отображаемый статус не совпадает с ожидаемым').toBeVisible();
});

//проверить и переписать тест после реализации статуса взрослого котика
// test('Отображение статуса взрослого котика', async({ profilePage }) => {
//     await profilePage.open();

//     await profilePage.page.route('https://api.yavshok.ru/experiments', route => 
//         route.fulfill({
//             status: 200,
//             body: JSON.stringify(mockAgeAdult),
//         })
//     );
    
//     await expect(profilePage.page.getByTestId('main-email-input')).not.toBeVisible(); // проверяем, что стр логина выгрузилась
//     await expect (profilePage.logOutButton).toBeVisible(); // проверяем, что страница профиля вгрузилась
//     await expect (profilePage.status).toHaveText('Ты взрослый котик');
// });

test('Отображение статуса старого котика', async({ profilePage }) => {
    await profilePage.open();

    await profilePage.page.route('https://api.yavshok.ru/experiments', route => 
        route.fulfill({
            status: 200,
            body: JSON.stringify(mockAgeOld),
        })
    );
    
    await expect(profilePage.page.getByTestId('main-email-input'), 'Не произошла авторизация, отображается главная страница вместо страницы профиля').not.toBeVisible(); // проверяем, что стр логина выгрузилась
    await expect(profilePage.logOutButton, 'Не загрузилась страница профиля').toBeVisible(); // проверяем, что страница профиля вгрузилась
    await expect(profilePage.page.getByText('Ты старый котик'), 'Отображаемый статус не совпадает с ожидаемым').toBeVisible();
});