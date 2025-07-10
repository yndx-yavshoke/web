# Проверка возвразения назад с экрана регистрации - нажать на "Назад" открывается https://yavshok.ru/login

from playwright.sync_api import Page, expect

def test_exit_button(page: Page):
    page.goto("https://yavshok.ru/register")

    page.locator('[data-testid="register-back-button"]').click()

    expect(page).to_have_url("https://yavshok.ru/login")
