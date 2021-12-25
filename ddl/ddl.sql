--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

CREATE TABLE users (
  id uuid DEFAULT public.gen_random_uuid() NOT NULL,
  app_label text,
  category text
)