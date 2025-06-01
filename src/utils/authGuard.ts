import { Context, error } from 'elysia';
import { verifyToken } from './jwt';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  age?: number;
}

export async function authGuard(
  context: Context,
): Promise<AuthenticatedUser | unknown> {
  // Check for authorization header (case-insensitive)
  const authHeader = context.headers.authorization || context.headers.Authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(401, { message: 'Authorization header required' });
  }

  const token = authHeader.substring(7);
  const payload = await verifyToken(token);

  if (!payload || typeof payload !== 'object' || !payload.userId) {
    return error(401, { message: 'Invalid token' });
  }

  const [user] = await db.select().from(users).where(eq(users.id, payload.userId));

  if (!user) {
    return error(401, { message: 'User not found' });
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    age: user.age || undefined,
  };
}
