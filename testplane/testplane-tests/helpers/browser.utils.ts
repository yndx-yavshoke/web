export async function clearStorage(browser: any) {
     try {
          await browser.execute(() => {
               localStorage.clear();
               sessionStorage.clear();
          });
     } catch (e) {
     }
}