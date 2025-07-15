# Autotests for Yavshoke (Testplane)

Проект содержит автоматизированные скриншотные тесты, написанные с использованием Testplane.

# Запуск

## 1. Установить зависимости
```
cd tests/tests_testplane
npm install
```

## 2. Клонировать testplane-global-hook
```
git clone https://github.com/gemini-testing/testplane-global-hook
```

## 3. Установить зависимости для плагина
```
cd testplane-global-hook
npm install
cd ..
```

## 4. Настройка переменных окружения
### Скопируй шаблон
```
cp .env.example .env
```
### Заполни значения в .env

## 5. Запуск GUI
```
npx testplane gui
```