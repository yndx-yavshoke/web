# Проверка, пройдет ли регистрация без указания данных - должна появится ошибка

from playwright.sync_api import Page

def test_registration_without_creds(page: Page):
    page.goto("https://yavshok.ru/register", wait_until="networkidle") # добавил wait_until тк инпут для возврата почему-то появлется позже других

    page.locator('[data-testid="register-submit-button"]').click()

    assert page.locator('text=Введите возраст').is_visible(), "Ошибка для возраста не появилась"
    assert page.locator('text=Введите email').is_visible(), "Ошибка для email не появилась"
    assert page.locator('text=Введите пароль').is_visible(), "Ошибка для пароля не появилась"
