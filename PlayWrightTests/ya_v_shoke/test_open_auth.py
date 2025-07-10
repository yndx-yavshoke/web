# Тест-кейс "Проверка нажатия кнопки "В ШОК""" - открывается экран авторизации

from playwright.sync_api import Page, expect

def test_open_auth(page: Page):
    page.goto("https://yavshok.ru/")

    page.locator('[data-testid="main-login-button"]').click()

    assert page.url == "https://yavshok.ru/login", f'Переход на /login не прошел, мы на {page.url}'


