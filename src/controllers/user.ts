import { Elysia, error, t } from "elysia";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { authGuard } from "../utils/authGuard";
import { SharedModel } from "../models/sharedModel";

export const userController = new Elysia({ prefix: "/user" })
  .use(SharedModel)
  .guard(
    {
      beforeHandle: async (context) => {
        const userOrError = await authGuard(context);
        if (!('id' in userOrError)) {
          return userOrError;
        }
      },
    },
    (app) =>
      app
        .resolve(async (context) => {
          const userOrError = await authGuard(context);
          if ('id' in userOrError) {
            return { user: userOrError };
          }
          // This shouldn't happen as beforeHandle would catch it
          throw new Error("Authentication failed");
        })
        .get(
          "/me",
          async ({ user }) => {
            return { user };
          },
          {
            response: {
              200: t.Object({
                user: t.Object({
                  id: t.Number(),
                  email: t.String(),
                  name: t.String(),
                  age: t.Optional(t.Number()),
                }),
              }),
              401: t.Object({
                message: t.String(),
              }),
            },
            detail: {
              summary: "Get current user data",
              description: "Returns the authenticated user's profile information",
              security: [{ bearerAuth: [] }],
              responses: {
                200: {
                  description: "User data retrieved successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          user: {
                            $ref: "#/components/schemas/user",
                          },
                        },
                      },
                    },
                  },
                },
                401: {
                  description: "Unauthorized - Invalid or missing token",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          message: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          }
        )
        .patch(
          "/name",
          async ({ body, user }) => {
            const { name } = body;

            // Validate name
            if (!name || name.trim().length === 0) {
              return error(422, {
                fields: {
                  name: "Имя не может быть пустым",
                },
              });
            }

            if (name.trim().length > 50) {
              return error(422, {
                fields: {
                  name: "Имя не может быть длиннее 50 символов",
                },
              });
            }

            const [updatedUser] = await db
              .update(users)
              .set({ name: name.trim() })
              .where(eq(users.id, user.id))
              .returning();

            const safeUser = {
              id: updatedUser.id,
              email: updatedUser.email,
              name: updatedUser.name,
              age: updatedUser.age || undefined,
            };

            return { user: safeUser };
          },
          {
            body: t.Object({
              name: t.String({
                minLength: 1,
                maxLength: 50,
                description: "User's display name",
              }),
            }),
            response: {
              200: t.Object({
                user: t.Object({
                  id: t.Number(),
                  email: t.String(),
                  name: t.String(),
                  age: t.Optional(t.Number()),
                }),
              }),
              401: t.Object({
                message: t.String(),
              }),
              422: "errorResponse",
            },
            detail: {
              summary: "Update user name",
              description: "Updates the authenticated user's display name",
              security: [{ bearerAuth: [] }],
              responses: {
                200: {
                  description: "User name updated successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          user: {
                            $ref: "#/components/schemas/user",
                          },
                        },
                      },
                    },
                  },
                },
                401: {
                  description: "Unauthorized - Invalid or missing token",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          message: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
                422: {
                  description: "Validation error",
                  content: {
                    "application/json": {
                      schema: {
                        $ref: "#/components/schemas/errorResponse",
                      },
                    },
                  },
                },
              },
            },
          }
        )
  ); 