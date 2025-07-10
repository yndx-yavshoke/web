# Проверка кнопки редактирования - Кнопка редактирования должна быть. При нажатии происходит переход на экран редактирования.

def test_default_name_after_registration(page):

    print("Введите email, незарегистрированный в системе:")
    email = input()

    page.goto("https://yavshok.ru/register")

    page.locator('[data-testid="register-email-input"]').fill(email) 
    page.locator('[data-testid="register-password-input"]').fill("1234241")
    page.locator('[data-testid="register-age-input"]').fill("65")

    page.locator('[data-testid="register-submit-button"]').click()

    assert page.locator('div.css-146c3p1.r-vw2c0b.r-15zivkp.r-evnaw').inner_text() == "Neko", f"Ожидалось, что имя будет 'Neko', но отобразилось {page.locator('div.css-146c3p1.r-vw2c0b.r-15zivkp.r-evnaw').inner_text()}"

