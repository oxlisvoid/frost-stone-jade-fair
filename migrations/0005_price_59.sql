update site_content
set payload = jsonb_set(
  jsonb_set(coalesce(payload, '{}'::jsonb), '{priceCents}', '5990'::jsonb),
  '{comparePriceCents}',
  '105000'::jsonb
),
updated_at = now()
where id = 1;
