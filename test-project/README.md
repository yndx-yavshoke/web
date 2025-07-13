# Screenshot

Automated tests for https://yavshok.ru/

## Установка

### 1. Настройка переменных окружения

Создайте файл `.env` в корневой директории проекта:

```bash
cp .env.example .env
```

Укажите в файле ваши данные, а так же базовый URL для тестирования.

### 2. Для запуска тестов:

```bash
npx testplane gui
```