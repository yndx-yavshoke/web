export const SecureValues = {
  AuthToken: "AuthToken",
} as const;

export type SecureKeys = (typeof SecureValues)[keyof typeof SecureValues];
