import { Elysia, error, t } from "elysia";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../utils/crypto";
import { generateToken } from "../utils/jwt";
import { SharedModel } from "../models/sharedModel";

export const authController = new Elysia().guard(
  {
    beforeHandle: ({ headers }) => {
      if (headers.authorization) {
        return error(422);
      }
    },
  },
  (app) =>
    app
      .use(SharedModel)
      .post(
        "/register",
        async ({ body }) => {
          const { email, password, age } = body;
          const hashedPassword = await hashPassword(password);
          const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (existingUser.length > 0) {
            return error(422, {
              fields: {
                email: "Пользователь с таким email уже существует",
              },
            });
          }

          const [user] = await db
            .insert(users)
            .values({
              email,
              password: hashedPassword,
              age,
            })
            .returning();

          const token = await generateToken({ userId: user.id });
          const safeUser = {
            ...user,
            age: user.age ? user.age : undefined,
            password: undefined,
          };

          return { token, user: safeUser };
        },
        {
          body: t.Object(
            {
              email: t.String(),
              password: t.String(),
              age: t.Optional(
                t.Number({
                  description: "Users age (optional)",
                })
              ),
            },
            {
              description:
                "Expected an email and password (+ age if experiment enabled)",
            }
          ),
          response: {
            200: "authResponse",
            422: "errorResponse",
          },
          detail: {
            summary: "Sign up the user",
            responses: {
              200: {
                description: "Successfully registered",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/authResponse",
                    },
                  },
                },
              },
              422: {
                description: "User already exists",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/errorResponse",
                    },
                  },
                },
              },
              500: {
                description: "Server Error",
              },
            },
          },
        }
      )
      .post(
        "/login",
        async ({ body }) => {
          const { email, password } = body;
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

          if (!user) {
            return error(422, {
              fields: {
                password: "Неправильный логин или пароль",
              },
            });
          }

          const isValid = await comparePassword(password, user.password);
          if (!isValid) {
            return error(422, {
              fields: {
                password: "Неправильный логин или пароль",
              },
            });
          }

          const token = await generateToken({ userId: user.id });
          const safeUser = {
            ...user,
            age: user.age ? user.age : undefined,
            password: undefined,
          };

          return { token, user: safeUser };
        },
        {
          body: t.Object({
            email: t.String({ format: "email" }),
            password: t.String(),
          }),
          response: {
            200: "authResponse",
            422: "errorResponse",
          },
          detail: {
            summary: "Sign in the user",
            responses: {
              200: {
                description: "Successfully logged in",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/authResponse",
                    },
                  },
                },
              },
              422: {
                description: "Invalid credentials",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/errorResponse",
                    },
                  },
                },
              },
              500: {
                description: "Server Error",
              },
            },
          },
        }
      )
);
