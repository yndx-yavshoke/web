/**
 * @param {Object} browser - Testplane browser instance
 * @param {string} selector - CSS селектор для поиска GIF элемента
 */
export async function stabilizeGif(browser, selector = "img") {
  await browser.execute((sel) => {
    const allImages = document.querySelectorAll("img");

    allImages.forEach((img, index) => {
      if (img && img.complete && img.src && img.src.includes(".gif")) {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.naturalWidth || img.offsetWidth || 100;
          canvas.height = img.naturalHeight || img.offsetHeight || 100;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          img.src = canvas.toDataURL("image/png");
        } catch (error) {
          // Если canvas не работает, ничего не делаем - disableAnimation уже отключает CSS
        }
      }
    });
  }, selector);
}
