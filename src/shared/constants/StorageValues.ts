export const StorageValues = {
  UserData: "UserData",
} as const;

export type SecureKeys = (typeof StorageValues)[keyof typeof StorageValues];
