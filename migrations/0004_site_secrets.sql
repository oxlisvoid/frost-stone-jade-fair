create table if not exists site_secrets (
  id integer primary key check (id = 1),
  stripe_secret_key text not null default '',
  updated_at timestamptz not null default now()
);
