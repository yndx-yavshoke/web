import { json, pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull().default("Neko"),
  age: integer("age"),
  createdAt: text("created_at").default(new Date().toISOString()).notNull(),
});
