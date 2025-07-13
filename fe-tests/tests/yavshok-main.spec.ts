import { expect } from "@playwright/test";
import { test } from '../fixtures/index';
import { registeredEmail, unregisteredEmail } from "../fixtures/user-data";

//готово

test('Внешний вид и атрибуты элементов', async ({ mainPage }) => {

    await expect(mainPage.page, 'Открылась неверная страница').toHaveURL('/')
    await expect(mainPage.title, 'Не отображается заголовок главной страницы').toBeVisible();
    await expect(mainPage.checkButton, 'Не отображается кнопка проверки шоковости').toBeVisible();
    await expect(mainPage.loginButton, 'Не отображается кнопка перехода к авторизации').toBeVisible();
    await expect(mainPage.input, 'Не отображаетс поле ввода эл. почты').toBeVisible();

    await expect(mainPage.checkButton, 'Текст на кнопке проверки шоковости отличается от ожидаемого').toHaveText('Я в шоке?');
    await expect(mainPage.loginButton, 'Текст на кнопке перехода к авторизации отличается от ожидаемого').toHaveText('В шок');

    await expect(mainPage.input, 'Плейсхолдер в поле ввода эл. почты отличается от ожидаемого').toHaveAttribute('placeholder', 'Введите email');
    await expect(mainPage.input, 'Неверный формат (type) поля ввода эл. почты').toHaveAttribute('type', 'email');
    await expect(mainPage.input, 'Поле ввода эл. почты недоступно для редактирования').toBeEditable();
    
    await expect(mainPage.checkButton, 'Кнопка проверки шоковости доступна при пустом поле ввода эл. почты').toHaveAttribute('aria-disabled', 'true');
    await mainPage.input.fill(registeredEmail);
    await expect(mainPage.checkButton, 'Кнопка проверки шоковости остается недоступна после ввода эл. почты').not.toHaveAttribute('aria-disabled', 'true')//, 'Кнопка проверки становистся доступна при вводе текста';
});

test('Проверка зарегистрированного пользователя', async ({ mainPage }) => {
    await mainPage.checkEmail(registeredEmail);

    await expect (mainPage.vShockeGIF, 'Не отображается гифка радости от присутсвия в ШОКе').toBeVisible();
    await expect(mainPage.vShockeText, 'Не отображается сообщение о присутствии в ШОКе').toBeVisible();
});

test('Проверка незарегистрированного пользователя', async ({ mainPage }) => {
    await mainPage.checkEmail(unregisteredEmail);
    
    await expect (mainPage.notYetShocked, 'Не отображается сообщение об отсутствии в ШОКе').toBeVisible();
});