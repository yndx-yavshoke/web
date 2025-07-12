export function generateRandomEmail(prefix: string = 'user'): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}${timestamp}${random}@example.com`;
} 