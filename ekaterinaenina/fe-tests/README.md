Запуск тестов
npx playwright test

Запуск тестов в браузере
npx playwright test --ui

Запуск тестов в дебаг режиме
npx playwright test --debug

Allure-отчеты
npm run allure:report         # генерирует отчет
npm run allure:open           # открывает UI

Testplane отчеты
npx serve html-report
npx html-reporter gui --tool playwright # открывает UI