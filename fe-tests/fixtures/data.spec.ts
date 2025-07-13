export let login = "test@mail.ru";
export let password = "111111";

export function ageChanger(age: number) {
    return {"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyOCwiaWF0IjoxNzUxOTk1NDIyLCJleHAiOjE3NTIwODE4MjJ9.9FN2lorZumYhl3Z_LlqwYHc-D5GwFJa9NplSc9filZk",
        "user": {
            "id": 128,
            "email": "test@mail.ru",
            "name": "ilia",
            "age": age
        }
    }
}


