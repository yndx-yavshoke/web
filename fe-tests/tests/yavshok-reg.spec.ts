import { expect } from "@playwright/test";
import { test } from '../fixtures/index';
import { emailToRegister, registeredEmail, registeredPassword, youngAge } from "../fixtures/user-data";

//готово; успешная регистрация закомментирована, чтобы не засорять прод; добавить генерацию адресов для регистрации

test('Внешний вид и атрибуты элементов', async ({ regPage }) => {
    await regPage.open();

    await expect(regPage.page, 'Открылась неверная страница').toHaveURL('/register')
    await expect(regPage.title, 'Не отображается заголовок страницы регистрации').toBeVisible();
    await expect(regPage.backButton, 'Не отображается кнопка "Назад"').toBeVisible();
    await expect(regPage.regButton, 'Не отображается кнопка регистрации').toBeVisible();
    await expect(regPage.mailInput, 'Не отображается поле ввода эл. почты').toBeVisible();
    await expect(regPage.passwordInput, 'Не отображаетс яполе ввода пароля').toBeVisible();
    await expect(regPage.ageInput, 'Не отображается поле ввода возраста').toBeVisible();

    await expect(regPage.backButton, 'Текст на кнопке "Назад" отличается от ожидаемого').toHaveText('Назад');
    await expect(regPage.regButton, 'Текст на кнопке регистрации отличается от ожидаемого').toHaveText('Зарегистрироваться');

    await expect(regPage.mailInput, 'Плейсхолдер в поле ввода эл. почты отличается от ожидаемого').toHaveAttribute('placeholder', 'Email');
    await expect(regPage.mailInput, 'Формат (type) поля ввода эл. почты отличается от ожидаемого').toHaveAttribute('type', 'email');
    await expect(regPage.mailInput, 'Поле ввода эл. почты недоступно для ввода').toBeEditable();
    
    await expect(regPage.passwordInput, 'Плейсхолдер в поле ввода пароля отличается от ожидаемого').toHaveAttribute('placeholder', 'Пароль');
    await expect(regPage.passwordInput, 'Формат (type) поля ввода пароля отличается от ожидаемого').toHaveAttribute('type', 'password');
    await expect(regPage.passwordInput, 'Поле ввода пароля недоступно для ввода').toBeEditable();

    await expect(regPage.ageInput, 'Плейсхолдер в поле ввода возраст отличается от ожидаемого').toHaveAttribute('placeholder', 'Возраст');
    await expect(regPage.ageInput, 'Формат (type) поля ввода возраста отличается от ожидаемого').toHaveAttribute('inputmode', 'numeric');
    await expect(regPage.ageInput, 'Поле ввода пароля недоступно для ввода').toBeEditable();

});

test.skip('Успешная регистрация', async ({ regPage }) => { //пропущен, чтобы не засорять прод 
    await regPage.open();
    
    await regPage.mailInput.fill(emailToRegister);
    await regPage.passwordInput.fill(registeredPassword);
    await regPage.ageInput.fill(youngAge);
    
    await regPage.regButton.click();
    await expect(regPage.page, 'Произошел переход на неожиданную страницу').toHaveURL('/');
    await expect(regPage.page.getByTestId('user-logout-button'), 'Не загрузилась страница профиля').toBeVisible();//проверка на подгрузку страницы профиля по уникальному элементу

});

test('Попытка регистрации с пустыми полями', async ({ regPage }) => {
    await regPage.open();
    
    await regPage.mailInput.fill('');
    await regPage.passwordInput.fill('');
    await regPage.ageInput.fill('');
    
    await regPage.regButton.click();


    await expect(regPage.page, 'Произошел незапланированный переход на другую страницу').toHaveURL('/register');
    await expect(regPage.noEmailError, 'Не отображается сообщение об ошибке в связи с пустым полем эл. почты').toBeVisible();
    await expect(regPage.noPasswordError, 'Не отображается сообщение об ошибке в связи с пустым полем пароля').toBeVisible();
    await expect(regPage.noAgeError, 'Не отображается сообщение об ошибке в связи с пустым полем возраста').toBeVisible();
});