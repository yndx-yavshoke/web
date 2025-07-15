import { test, expect } from './fixtures';
import { getDefaultUser } from './utils/data-user';
import { generateUserEmail, generateUserPassword } from './utils/data-generator';
import { AllureHelper } from './utils/allure-helper';

test.describe('Авторизация', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.expectTitleVisible();
    });

    test('Успешная авторизация пользователя', async ({ loginPage, profilePage }) => {
        AllureHelper.setupAuthTest();
        AllureHelper.addDescription('Проверка успешной авторизации с валидными данными пользователя');
        AllureHelper.addStory('Пользователь может войти в систему с корректными учетными данными');
        
        await AllureHelper.addStep('Успешный логин', async () => {
            const defaultUser = getDefaultUser();
            AllureHelper.addParameter('Email', defaultUser.email);
            await loginPage.login(defaultUser);
            await profilePage.expectLogoutButtonVisible();
        });
    });

    test('Авторизация с неверными данными', async ({ loginPage }) => {
        AllureHelper.setupAuthTest();
        AllureHelper.addDescription('Проверка авторизации с неверными учетными данными');
        AllureHelper.addStory('Система должна показать ошибку при вводе неверных данных');
        
        await AllureHelper.addStep('Ввод случайных email и пароля', async () => {
            const randomUser = {
                email: generateUserEmail(),
                password: generateUserPassword()
            };
            AllureHelper.addParameter('Email', randomUser.email);
            AllureHelper.addParameter('Password', '***');
            await loginPage.loginWithCredentials(randomUser.email, randomUser.password);
            await loginPage.expectAuthError();
        });
    });

    test('Авторизация с пустыми полями', async ({ loginPage }) => {
        AllureHelper.setupAuthTest();
        AllureHelper.addDescription('Проверка валидации пустых полей при авторизации');
        AllureHelper.addStory('Система должна показать ошибки при отправке формы с пустыми полями');
        
        await AllureHelper.addStep('Оставить поля пустыми', async () => {
            await loginPage.loginWithCredentials('', '');
            await loginPage.expectEmptyEmailError();
            await loginPage.expectEmptyPasswordError();
        });
    });

    test('Переход на страницу регистрации', async ({ loginPage, registrationPage }) => {
        AllureHelper.setupAuthTest();
        AllureHelper.addDescription('Проверка навигации со страницы авторизации на регистрацию');
        AllureHelper.addStory('Пользователь может перейти к регистрации со страницы входа');
        
        await AllureHelper.addStep('Нажать "Зарегистрироваться"', async () => {
            await loginPage.goToRegister();
            await registrationPage.expectRegistrationUrl();
        });
    });

    test('Проверка видимости заголовка страницы авторизации', async ({ loginPage }) => {
        AllureHelper.setupAuthTest();
        AllureHelper.addDescription('Проверка корректного отображения заголовка страницы авторизации');
        AllureHelper.addStory('Заголовок страницы должен соответствовать ожидаемому тексту');
        
        await AllureHelper.addStep('Проверка отображения заголовка', async () => {
            const titleText = await loginPage.getTitleText();
            AllureHelper.addParameter('Expected Title', 'Войти в ШОК');
            AllureHelper.addParameter('Actual Title', titleText);
            expect(titleText).toBe('Войти в ШОК');
        });
    });
}); 