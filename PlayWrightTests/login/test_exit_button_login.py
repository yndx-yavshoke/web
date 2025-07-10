# проверка возвразения назад с экрана логина нажать на "Назад" открывается https://yavshok.ru/

from playwright.sync_api import Page, expect

def test_exit_button_login(page: Page):
    page.goto("https://yavshok.ru/login")

    back_button = page.locator('[data-testid="login-back-button"]')
    back_button.click()

    expect(page).to_have_url("https://yavshok.ru/")
