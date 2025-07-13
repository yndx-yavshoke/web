import { test, expect } from './fixtures';
import { getDefaultUser } from './utils/data-user';
import { generateUserEmail } from './utils/data-generator';
import { AllureHelper } from './utils/allure-helper';

test.describe('Главная страница — проверка email', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
        await homePage.expectTitleVisible();
    });

    test('Пользователь уже в ШОКе', async ({ homePage }) => {
        AllureHelper.setupHomeTest();
        AllureHelper.addDescription('Проверка статуса зарегистрированного пользователя');
        AllureHelper.addStory('Система должна показать что пользователь уже в ШОКе');
        
        await AllureHelper.addStep('Ввод email зарегистрированного пользователя', async () => {
            const defaultUser = getDefaultUser();
            AllureHelper.addParameter('Email', defaultUser.email);
            await homePage.fillEmail(defaultUser.email);
            await homePage.checkEmail();
            await homePage.expectSuccessGIF();
            await homePage.expectShockStatus('in');
        });
    });

    test('Пользователь не в ШОКе', async ({ homePage }) => {
        AllureHelper.setupHomeTest();
        AllureHelper.addDescription('Проверка статуса незарегистрированного пользователя');
        AllureHelper.addStory('Система должна показать что пользователь еще не в ШОКе');
        
        await AllureHelper.addStep('Ввод email несуществующего пользователя', async () => {
            const randomEmail = generateUserEmail();
            AllureHelper.addParameter('Email', randomEmail);
            await homePage.fillEmail(randomEmail);
            await homePage.checkEmail();
            await homePage.expectShockStatus('out');
        });
    });

    test('Переход к авторизации по кнопке "В ШОК"', async ({ homePage, loginPage }) => {
        AllureHelper.setupHomeTest();
        AllureHelper.addDescription('Проверка навигации с главной страницы на авторизацию');
        AllureHelper.addStory('Пользователь может перейти к авторизации с главной страницы');
        
        await AllureHelper.addStep('Переход на страницу авторизации', async () => {
            await homePage.proceedToLogin();
            await loginPage.expectLoginUrl();
        });
    });

    test('Проверка видимости заголовка', async ({ homePage }) => {
        AllureHelper.setupHomeTest();
        AllureHelper.addDescription('Проверка корректного отображения заголовка главной страницы');
        AllureHelper.addStory('Заголовок главной страницы должен соответствовать ожидаемому тексту');
        
        await AllureHelper.addStep('Проверка отображения заголовка', async () => {
            const titleText = await homePage.getTitleText();
            AllureHelper.addParameter('Expected Title', 'Я в ШОКе');
            AllureHelper.addParameter('Actual Title', titleText);
            expect(titleText).toBe('Я в ШОКе');
        });
    });
}); 