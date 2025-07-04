import pytest
import requests

BASE_URL = "https://yavshok.ru"
TEST_EMAIL = "test@example.com"
CORRECT_PASSWORD = "123456"
WRONG_PASSWORD = "wrong"


def test_login_success():
    response = requests.post(
        f"{BASE_URL}/login",
        json={"email": TEST_EMAIL, "password": CORRECT_PASSWORD},
    )
    assert response.status_code == 200
    assert "token" in response.json()


def test_login_fail():
    response = requests.post(
        f"{BASE_URL}/login",
        json={"email": TEST_EMAIL, "password": WRONG_PASSWORD},
    )
    assert response.status_code == 401
