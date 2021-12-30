--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

-- users --

CREATE TABLE users (
  "id" uuid DEFAULT public.gen_random_uuid() PRIMARY KEY NOT NULL,
  "username" text UNIQUE,
  "email" text,
  "phone" text
);

-- venmo_friends --

CREATE TABLE "public"."venmo_friends" (
    "id" uuid DEFAULT public.gen_random_uuid() PRIMARY KEY NOT NULL,
    "user_id" uuid,
    "username" text,
    CONSTRAINT "venmo_friends_user_id_users" FOREIGN KEY ("user_id") REFERENCES "public"."users" ON DELETE CASCADE
);

-- venmo_credentials --

CREATE TABLE "public"."venmo_credentials" (
    "id" uuid DEFAULT public.gen_random_uuid() PRIMARY KEY NOT NULL,
    "user_id" uuid,
    "username" text,
    "password" text,
    "access_token" text,
    "active" boolean DEFAULT False,
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE
);

-- venmo_account_info --

CREATE TABLE "public"."venmo_account_info" (
    "id" uuid DEFAULT public.gen_random_uuid() PRIMARY KEY NOT NULL,
    "credentials_id" uuid,
    "external_account_id" text,
    "email" text,
    "phone" text,
    FOREIGN KEY ("credentials_id") REFERENCES "public"."venmo_credentials"("id") ON DELETE CASCADE
);

-- schedules --

CREATE TABLE "public"."schedules" (
    "id" uuid DEFAULT public.gen_random_uuid() PRIMARY KEY NOT NULL,
    "user_id" uuid,
    "type" text,
    "amount" decimal,
    "recurrence" text,
    "next_occurrence" timestamp,
    "last_occurrence" timestamp,
    "start" text,
    "num_occurrences" integer,
    "repeat_days" text,
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE
);

-- schedule_executions --

CREATE TABLE "public"."schedule_executions" (
    "id" uuid DEFAULT public.gen_random_uuid() PRIMARY KEY NOT NULL,
    "schedule_id" uuid,
    "status" text,
    "executed_at" timestamp,
    "details" jsonb,
    FOREIGN KEY ("schedule_id") REFERENCES "public"."schedules"("id") ON DELETE CASCADE
);
