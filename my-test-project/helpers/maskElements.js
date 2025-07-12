/**
 * @param {Object} browser - Testplane browser instance
 * @param {Array} selectors - Массив селекторов input полей
 */
export async function maskInputFields(browser, selectors = []) {
  await browser.execute((selectors) => {
    selectors.forEach((selector) => {
      const inputs = document.querySelectorAll(selector);
      inputs.forEach((input) => {
        input.style.color = "transparent";
        input.style.textShadow = "0 0 0 black";
        input.style.background = "black";
        input.style.caretColor = "transparent";
      });
    });
  }, selectors);
}
