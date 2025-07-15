export async function clearStorage(browser: any) {
     try {
          await browser.execute(() => {
               localStorage.clear();
               sessionStorage.clear();
          });
     } catch (e) {
          // ignore errors in data: URLs or restricted contexts
     }
}

export async function clearCookies(browser: any) {
     try {
          await browser.execute(() => {
               document.cookie.split(';').forEach(function (c) {
                    document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
               });
          });
     } catch (e) {
          // ignore errors in data: URLs or restricted contexts
     }
} 