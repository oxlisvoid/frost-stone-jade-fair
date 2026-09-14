create table if not exists operator_settings (
  user_id text primary key,
  stripe_link text not null default '',
  contact_email text not null default '',
  notes text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists operator_leads (
  id serial primary key,
  user_id text not null,
  name text not null,
  email text not null,
  created_at timestamptz not null default now()
);
create index if not exists operator_leads_user_id_idx on operator_leads (user_id);
