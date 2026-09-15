update site_content
set payload = jsonb_set(coalesce(payload, '{}'::jsonb), '{email}', '"oxlisvoid1@gmail.com"'),
    updated_at = now()
where id = 1;
