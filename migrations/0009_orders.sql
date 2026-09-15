create table if not exists orders (
  id text primary key,
  session_id text not null unique,
  email text not null default '',
  payment_status text not null default '',
  amount_total integer not null default 0,
  currency text not null default 'usd',
  products text not null default '',
  created_at timestamptz not null default now()
);
