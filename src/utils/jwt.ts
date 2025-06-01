import "dotenv/config";
import { sign, verify } from "@node-rs/jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export function generateToken(payload: any) {
  const now = Math.floor(Date.now() / 1000);
  const tokenPayload = {
    ...payload,
    iat: now, // issued at
    exp: now + (24 * 60 * 60), // expires in 24 hours
  };
  return sign(tokenPayload, JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const result = await verify(token, JWT_SECRET);
    return result;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}
