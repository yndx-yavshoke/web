export async function checkElement(browser: any, selector: string, timeout = 5000) {
  const element = await browser.$(selector);
  await element.waitForExist({ timeout });
}

export async function click(browser: any, selector: string, timeout = 5000) {
  const input = await browser.$(selector);
  await input.waitForExist({ timeout });
  await input.click();
}

export async function setInputValue(browser: any, selector: string, value: string, timeout = 5000) {
  const input = await browser.$(selector);
  await input.waitForExist({ timeout });
  await input.setValue(value);
}