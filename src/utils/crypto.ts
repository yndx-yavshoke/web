import { hash, verify } from "@node-rs/argon2";

export async function hashPassword(password: string) {
  return hash(password);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return verify(hashedPassword, password);
}
