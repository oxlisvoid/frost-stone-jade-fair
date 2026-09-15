create table if not exists catalog_products (
  id text primary key,
  name text not null,
  description text not null default '',
  unit_amount_cents integer not null,
  stripe_price_id text not null default '',
  addon integer not null default 0,
  active integer not null default 1,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

insert into catalog_products (id, name, description, unit_amount_cents, stripe_price_id, addon, active, sort_order)
values
  ('all-access', 'All Access', 'Every workflow, 13-lesson course, toolkit, and lifetime updates. One payment. Files emailed within 24 hours.', 5990, '', 0, 1, 0),
  ('instagram', 'Help building the Instagram', 'Optional add-on after All Access. Not sold on its own.', 8900, '', 1, 1, 1)
on conflict (id) do nothing;

create table if not exists site_posts (
  id text primary key,
  title text not null,
  body text not null default '',
  url text not null default '',
  kind text not null default 'link',
  published integer not null default 1,
  created_at timestamptz not null default now()
);
