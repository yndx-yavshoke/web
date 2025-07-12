# README — Запуск автотестов

### 1. Склонировать репозиторий

```bash
git clone <URL_твоего_репозитория>
cd <название_папки_репозитория>
```

---

## 2. Настройка терминала в VS Code (Windows)

По умолчанию терминал VS Code — PowerShell, который блокирует выполнение скриптов `.ps1`. Чтобы избежать ошибки:

- Открой меню терминала → **Select Default Profile** → выбери **Command Prompt (cmd.exe)**
- Перезапусти терминал

Или, если хочешь остаться в PowerShell, запусти PowerShell от администратора и выполни:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### 3. Установить зависимости

Убедись, что у тебя установлен Node.js версии 22 (рекомендуется через nvm):

```bash
nvm install 22
nvm use 22
```

Далее установи зависимости из `package.json`:

```bash
npm install
```

### 4. Создать файл `.env` для переменных окружения

Для хранения конфиденциальных данных и настройки окружения удобно использовать файл `.env` в корне проекта.

- В корне проекта создай файл .env, например, скопировав шаблон:

```bash
cp .env.example .env
```

Отредактируй .env, указав свои реальные значения для переменных.

---

## 5. Проверка и запуск тестов Playwright

Запусти тесты:

```bash
cd mrm_avelari/fe-tests
npx playwright test --ui
```

---

### 6. (Опционально) Настройка Prettier для автоматического форматирования кода

Установи Prettier как dev-зависимость:

```bash
npm install --save-dev prettier
```

Создай файл конфигурации `.prettierrc` в корне проекта, например:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

Чтобы отформатировать весь проект с помощью Prettier, выполни:

```bash
npx prettier --write .
```

> Это форматирует все поддерживаемые файлы в текущей директории и вложенных.

---
