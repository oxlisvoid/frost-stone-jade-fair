create table if not exists inquiries (
  id text primary key,
  name text not null,
  email text not null,
  message text not null,
  mailed integer not null default 0,
  created_at timestamptz not null default now()
);
