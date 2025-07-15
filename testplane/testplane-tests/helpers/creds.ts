import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.EMAIL) {
     throw new Error('EMAIL is not set in .env file');
}
if (!process.env.PASSWORD) {
     throw new Error('PASSWORD is not set in .env file');
}

export const EMAIL = process.env.EMAIL;
export const PASSWORD = process.env.PASSWORD;

export const SCREENSHOT_OPTS = {
     screenshotDelay: 100,
     disableAnimation: true,
     ignoreElements: ['.live-counter', 'img', '[data-testid="user-avatar"]']
}; 