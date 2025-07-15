import { test, expect } from './fixtures';
import { getDefaultUser } from './utils/data-user';
import { generateRegistrationData } from './utils/data-generator';
import { AllureHelper } from './utils/allure-helper';

test.describe('Регистрация', () => {
    test.beforeEach(async ({ registrationPage }) => {
        await registrationPage.open();
    });

    test('Регистрация с валидными данными', async ({ registrationPage }) => {
        AllureHelper.setupRegistrationTest();
        AllureHelper.addDescription('Проверка успешной регистрации с валидными данными');
        AllureHelper.addStory('Пользователь может зарегистрироваться с корректными данными');
        
        await AllureHelper.addStep('Заполнить валидными данными', async () => {
            const registrationData = generateRegistrationData();
            AllureHelper.addParameter('Email', registrationData.email);
            AllureHelper.addParameter('Age', registrationData.age);
            AllureHelper.addParameter('Name', registrationData.name || 'N/A');
            await registrationPage.register(registrationData);
            await registrationPage.expectSuccessfulRegistration();
        });
    });

    test('Регистрация данными существующего пользователя', async ({ registrationPage }) => {
        AllureHelper.setupRegistrationTest();
        AllureHelper.addDescription('Проверка валидации при регистрации существующего пользователя');
        AllureHelper.addStory('Система должна показать ошибку при попытке регистрации с существующим email');
        
        await AllureHelper.addStep('Ввод зарегистрированного email', async () => {
            const defaultUser = getDefaultUser();
            AllureHelper.addParameter('Email', defaultUser.email);
            AllureHelper.addParameter('Age', '25');
            await registrationPage.fillEmail(defaultUser.email);
            await registrationPage.fillPassword(defaultUser.password);
            await registrationPage.fillAge('25');
            await registrationPage.submitForm();
            await registrationPage.expectExistingUserError();
        });
    });

    test('Регистрация без ввода значений', async ({ registrationPage }) => {
        AllureHelper.setupRegistrationTest();
        AllureHelper.addDescription('Проверка валидации пустых полей при регистрации');
        AllureHelper.addStory('Система должна показать ошибки при отправке формы с пустыми полями');
        
        await AllureHelper.addStep('Оставить все поля пустыми', async () => {
            await registrationPage.registerWithCredentials('', '', '');
            await registrationPage.expectEmptyEmailError();
            await registrationPage.expectEmptyPasswordError();
            await registrationPage.expectEmptyAgeError();
        });
    });

    test('Регистрация с невалидным email', async ({ registrationPage }) => {
        AllureHelper.setupRegistrationTest();
        AllureHelper.addDescription('Проверка валидации email при регистрации');
        AllureHelper.addStory('Система должна показать ошибку при вводе невалидного email');
        
        await AllureHelper.addStep('Ввод невалидного email', async () => {
            const invalidEmail = 'invalid-email';
            AllureHelper.addParameter('Invalid Email', invalidEmail);
            AllureHelper.addParameter('Age', '25');
            await registrationPage.registerWithCredentials(invalidEmail, 'password123', '25');
            await registrationPage.expectWrongEmailError();
        });
    });

    test('Регистрация с коротким паролем', async ({ registrationPage }) => {
        AllureHelper.setupRegistrationTest();
        AllureHelper.addDescription('Проверка валидации длины пароля при регистрации');
        AllureHelper.addStory('Система должна показать ошибку при вводе короткого пароля');
        
        await AllureHelper.addStep('Ввод короткого пароля', async () => {
            const shortPassword = '123';
            AllureHelper.addParameter('Short Password', shortPassword);
            AllureHelper.addParameter('Email', 'test@example.com');
            AllureHelper.addParameter('Age', '25');
            await registrationPage.registerWithCredentials('test@example.com', shortPassword, '25');
            await registrationPage.expectTooShortPasswordError();
        });
    });

    test('Регистрация с нечисловым возрастом', async ({ registrationPage }) => {
        AllureHelper.setupRegistrationTest();
        AllureHelper.addDescription('Проверка валидации возраста при регистрации');
        AllureHelper.addStory('Система должна показать ошибку при вводе нечислового возраста');
        
        await AllureHelper.addStep('Ввод нечислового возраста', async () => {
            const invalidAge = 'abc';
            AllureHelper.addParameter('Invalid Age', invalidAge);
            AllureHelper.addParameter('Email', 'test@example.com');
            await registrationPage.registerWithCredentials('test@example.com', 'password123', invalidAge);
            await registrationPage.expectNotNumericAgeError();
        });
    });
});
