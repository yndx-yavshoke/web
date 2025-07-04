import pytest
import requests

BASE_URL = "https://yavshok.ru"
TEST_EMAIL = "test@example.com"
CORRECT_PASSWORD = "123456"


def test_name_changing():
    login_response = requests.post(
        f"{BASE_URL}/login",
        json={"email": TEST_EMAIL, "password": CORRECT_PASSWORD},
    )
    assert login_response.status_code == 200
    token = login_response.json()["token"]
    
    headers = {"Authorization": f"Bearer {token}"}
    
    update_data = {"name": "New Name"}
    update_response = requests.patch(f"{BASE_URL}/edit?__EXPO_ROUTER_key=undefined-U8oKLQOgMTwTay3spXV8F", json=update_data, headers=headers)
    assert update_response.status_code == 200
    
    user_response = requests.get(f"{BASE_URL}/edit?__EXPO_ROUTER_key=undefined-U8oKLQOgMTwTay3spXV8F", headers=headers)
    assert user_response.json()["name"] == "New Name"    
