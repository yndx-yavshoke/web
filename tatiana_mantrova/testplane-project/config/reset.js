module.exports = async function (browser) {
    // 1. Закрываем все вкладки кроме одной
    const handles = await browser.getWindowHandles();
    while (handles.length > 1) {
        await browser.switchToWindow(handles.pop());
        await browser.closeWindow();
    }

    // 2. Очищаем хранилища
    await browser.url('https://yavshok.ru/');
    await browser.execute(() => {
        localStorage.clear();
        sessionStorage.clear();
        indexedDB.databases().then(dbs => {
            dbs.forEach(db => indexedDB.deleteDatabase(db.name));
        });
    });

    // 3. Очищаем cookies
    const cookies = await browser.getCookies();
    for (const cookie of cookies) {
        await browser.deleteCookie(cookie.name);
    }

    // 4. Hard reload
    await browser.refresh();
};