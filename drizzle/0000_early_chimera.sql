CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text DEFAULT 'Neko' NOT NULL,
	"age" integer,
	"created_at" text DEFAULT '2025-05-25T13:08:01.938Z' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
