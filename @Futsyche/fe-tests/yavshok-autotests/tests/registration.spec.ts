import { test, expect } from './fixtures/pages';
import { regUsers } from './fixtures/users';

test.describe('Регистрация', () => {
    test('Успешная регистрация молоденького котика', async ({ registerPage }) => {
        await registerPage.goto();
        await registerPage.fillForm(regUsers.youngCat);
        await registerPage.submit();
        await registerPage.verifySuccess('Ты молоденький котик');
    });

    test('Успешная регистрация взрослого котика', async ({ registerPage }) => {
        await registerPage.goto();
        await registerPage.fillForm(regUsers.adultCat);
        await registerPage.submit();
        await registerPage.verifySuccess('Ты взрослый котик');
    });

    test('Успешная регистрация старого котика', async ({ registerPage }) => {
        await registerPage.goto();
        await registerPage.fillForm(regUsers.oldCat);
        await registerPage.submit();
        await registerPage.verifySuccess('Ты старый котик');
    });
});