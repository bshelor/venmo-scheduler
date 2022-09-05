--
-- Name: pgcrypto; Type: EXTENSION; Schema: heroku_ext; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA heroku_ext;

-- users --

CREATE TABLE IF NOT EXISTS "public"."users" (
  "id" uuid DEFAULT heroku_ext.gen_random_uuid() PRIMARY KEY NOT NULL,
  "username" text UNIQUE,
  "email" text,
  "phone" text
);

-- venmo_users --

CREATE TABLE IF NOT EXISTS "public"."venmo_users" (
    "id" uuid DEFAULT heroku_ext.gen_random_uuid() PRIMARY KEY NOT NULL,
    "user_id" uuid,
    "username" text,
    CONSTRAINT "venmo_friends_user_id_users" FOREIGN KEY ("user_id") REFERENCES "public"."users" ON DELETE CASCADE
);

-- venmo_accounts --

CREATE TABLE IF NOT EXISTS "public"."venmo_accounts" (
    "id" uuid DEFAULT heroku_ext.gen_random_uuid() PRIMARY KEY NOT NULL,
    "user_id" uuid,
    "username" text,
    "password" text,
    "access_token" text,
    "active" boolean DEFAULT False,
    "external_account_id" text,
    "email" text,
    "phone" text,
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE
);

-- schedules --

CREATE TABLE IF NOT EXISTS "public"."schedules" (
    "id" uuid DEFAULT heroku_ext.gen_random_uuid() PRIMARY KEY NOT NULL,
    "user_id" uuid,
    "type" text,
    "amount" decimal,
    "recurrence" text,
    "next_occurrence" timestamp,
    "final_occurrence" timestamp,
    "first_occurrence" timestamp,
    "num_occurrences" integer,
    "repeat_days" text[],
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE
);

-- schedule_venmo_users many-to-many join table --

CREATE TABLE IF NOT EXISTS "public"."schedule_venmo_users" (
    "venmo_user_id" uuid NOT NULL,
    "schedule_id" uuid NOT NULL,
    FOREIGN KEY ("venmo_user_id") REFERENCES "public"."venmo_users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("schedule_id") REFERENCES "public"."schedules"("id") ON DELETE CASCADE
);

-- schedule_executions --

CREATE TABLE IF NOT EXISTS "public"."schedule_executions" (
    "id" uuid DEFAULT heroku_ext.gen_random_uuid() PRIMARY KEY NOT NULL,
    "schedule_id" uuid,
    "status" text,
    "executed_at" timestamp,
    "details" jsonb,
    FOREIGN KEY ("schedule_id") REFERENCES "public"."schedules"("id") ON DELETE CASCADE
);
