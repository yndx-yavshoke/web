describe("Страница входа yavshok.ru", () => {
  it("Проверка страницы входа: дефолтное состояние,фокус,ошибка входа", async ({ browser }) => {
    // 1. Дефолтное состояние
    await browser.url("https://yavshok.ru/login");
   
    await browser.assertView("login_default", "body");

    // 2. Проверка фокуса на email
    const emailInput = await browser.$('[data-testid="login-email-input"]');
    await emailInput.waitForDisplayed();
    await emailInput.click();
    await browser.pause(300);
    await browser.assertView("login_focus_email", '[data-testid="login-email-input"]');

    // 3. Проверка фокуса на password
    const passwordInput = await browser.$('[data-testid="login-password-input"]');
    await passwordInput.waitForDisplayed();
    await passwordInput.click();
    await browser.pause(300);
    await browser.assertView("login_focus_password", '[data-testid="login-password-input"]');

    //4. Проверка на некорректный ввод данных
    await browser.$('[data-testid="login-email-input"]').setValue("invalid@test.com");
    await browser.$('[data-testid="login-password-input"]').setValue("wrongpass");
    await browser.$('[data-testid="login-submit-button"]').click();
    const errorSelector = '.css-146c3p1.r-howw7u.r-1enofrn.r-15d164r';
    const errorMessage = await browser.$(errorSelector);
    
    await errorMessage.waitForDisplayed({ timeout: 5000 });
    await expect(errorMessage).toHaveText("Неправильный логин или пароль");
    await browser.assertView("email_error_style", '[data-testid="login-email-input"]');
    await browser.assertView("password_error_style",'[data-testid="login-password-input"]');
  });
  

  //К заданию:на какие части можно разбить визуальные проверки
  //Страницу профиля пользователя можно разбить на 3 части:
  //1.Шапка профиля(header) из 2 групп:(лого(гифка)),имя пользователя,статус,кнопка редактирования профиля - 1 группа визуальных проверок;2 группа: посты,подписчики,лайки;
  //2.Основное содержание(main) - галерея изображений
  //3.Подвал (футер) - пока пустой; 
  //Отдельно вынести проверку кнопки выхода из профиля

  //cтабилизация гифки
  it("Стабилизация гифки", async ({ browser }) => {
    await browser.$('[data-testid="login-email-input"]').setValue("al.colesnicov@gmail.com");
    await browser.$('[data-testid="login-password-input"]').setValue("qwerty");
    await browser.$('[data-testid="login-submit-button"]').click();
    await browser.pause(700);
    await browser.assertView("gif_stable", "body", {
        ignoreElements: ['.live-counter', 'img[src*=".gif"]']
    });
});
//Страница редактирования профиля
it("Переход на страницу редактирования профиля", async ({ browser }) => {
    await browser.$('[data-testid="user-edit-profile-button"]').click();
    //await browser.pause(500); 
    await browser.assertView("default_edit_page", "body");
});
it("Проверка валидации имени при сохранении пустого поля", async ({ browser }) => {
  

    const nameInput = await browser.$('[data-testid="edit-name-input"]');
    
    await nameInput.setValue(""); 
    await browser.pause(300); 
    await browser.$('[data-testid="edit-save-button"]').click();
    await browser.pause(500); 
    await browser.$('div*=Name is required').getText(); 
    await browser.assertView("edit_error_message_name_input", '[data-testid="edit-name-input"]');
    
       });
});