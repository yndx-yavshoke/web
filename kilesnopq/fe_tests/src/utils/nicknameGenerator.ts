export function generateRandomNickname(): string {
  const length = Math.floor(Math.random() * 6) + 5; // 5-10 символов
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let nickname = '';
  for (let i = 0; i < length; i++) {
    nickname += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nickname;
} 