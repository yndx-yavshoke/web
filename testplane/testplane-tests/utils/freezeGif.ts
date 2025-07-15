export async function freezeGif(browser: WebdriverIO.Browser, selector: string) {
  await browser.execute((sel) => {
    const img = document.querySelector<HTMLImageElement>(sel);
    if (!img) return;

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);

    // Заменяем src гифки на PNG-данные
    img.src = canvas.toDataURL("image/png");
  }, selector);
}
