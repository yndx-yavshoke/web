import pytest
import requests

BASE_URL = "http://localhost:3000"
TEST_EMAIL = "user@example.com"
CORRECT_PASSWORD = "string"
WRONG_PASSWORD = "wrong_password"


def test_login_success():
    register_response = requests.post(
        f"{BASE_URL}/auth/register",
        json={"email": TEST_EMAIL, "password": CORRECT_PASSWORD, "name": "Test User"},
    )

    login_response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": TEST_EMAIL, "password": CORRECT_PASSWORD},
    )

    assert login_response.status_code == 200
    assert "token" in login_response.json()


def test_login_fail():
    response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": TEST_EMAIL, "password": WRONG_PASSWORD},
        headers={"Content-Type": "application/json"},
    )
    assert response.status_code == 422
