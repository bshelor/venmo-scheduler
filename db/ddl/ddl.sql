--
-- Name: pgcrypto; Type: EXTENSION; Schema: heroku_ext OR public; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA :SCHEMA;

-- users_internal --

CREATE TABLE IF NOT EXISTS "public"."users_internal" (
  "id" uuid DEFAULT :SCHEMA.gen_random_uuid() PRIMARY KEY NOT NULL,
  "username" text UNIQUE,
  "email" text,
  "phone" text
);

-- users_venmo --

CREATE TABLE IF NOT EXISTS "public"."users_venmo" (
    "id" uuid DEFAULT :SCHEMA.gen_random_uuid() PRIMARY KEY NOT NULL,
    "username"              text,
    "external_id"           uuid
);

-- venmo_accounts --

CREATE TABLE IF NOT EXISTS "public"."venmo_accounts" (
    "id" uuid DEFAULT :SCHEMA.gen_random_uuid() PRIMARY KEY NOT NULL,
    "user_id"                           uuid,
    "username"                          text,
    "password"                          text,
    "access_token"                      text,
    "active"                            boolean DEFAULT True,
    "external_id"                       text,
    "profile_picture_url"               text,
    "display_name"                      text,
    "first_name"                        text,
    "last_name"                         text,
    "email"                             text,
    "phone"                             text,
    FOREIGN KEY ("user_id") REFERENCES "public"."users_internal"("id") ON DELETE CASCADE
);

-- schedule_definitions --

CREATE TABLE IF NOT EXISTS "public"."schedule_definitions" (
    "id" uuid DEFAULT :SCHEMA.gen_random_uuid() PRIMARY KEY NOT NULL,
    "user_id" uuid,
    "type" text,
    "amount" decimal,
    "description" text,
    "dynamic_text" text[],
    "first_execution_timestamp" timestamp,
    "final_execution_timestamp" timestamp,
    "recurrence" text,
    FOREIGN KEY ("user_id") REFERENCES "public"."users_internal"("id") ON DELETE CASCADE
);

-- schedules --
CREATE TABLE IF NOT EXISTS "public"."schedules" (
    "id"                            uuid DEFAULT :SCHEMA.gen_random_uuid()       PRIMARY KEY NOT NULL,
    "schedule_definition_id"        uuid,
    "execution_timestamp"           timestamp,
    "status"                        text,
    "executed_at"                   timestamp,
    "details"                       jsonb,
    FOREIGN KEY ("schedule_definition_id") REFERENCES "public"."schedule_definitions"("id") ON DELETE CASCADE
);


-- transaction_users many-to-many join table --

CREATE TABLE IF NOT EXISTS "public"."transaction_users" (
    "users_venmo_id"                uuid NOT NULL,
    "schedule_definition_id"        uuid NOT NULL,
    FOREIGN KEY ("users_venmo_id") REFERENCES "public"."users_venmo"("id") ON DELETE CASCADE,
    FOREIGN KEY ("schedule_definition_id") REFERENCES "public"."schedule_definitions"("id") ON DELETE CASCADE
);
