import dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL || 'https://yavshok.ru',
  apiBaseURL: process.env.API_BASE_URL || 'https://api.yavshok.ru',
  email: process.env.USER_EMAIL || '',
  password: process.env.USER_PASSWORD || ''
};
