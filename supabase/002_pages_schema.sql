-- web-caa CMS — Phase 2: page builder
-- Run in Supabase SQL Editor after 001_cms_schema.sql.
-- Idempotent: safe to re-run.

-- ============================================================
-- Builder pages: admin-authored standalone pages composed of
-- an ordered list of block components stored as JSONB.
-- ============================================================
create table if not exists public.pages (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,                 -- e.g. "about-us" (no locale, no leading slash)
  title_ar    text not null default '',
  title_en    text not null default '',
  desc_ar     text not null default '',             -- meta description (optional)
  desc_en     text not null default '',
  blocks      jsonb not null default '[]'::jsonb,    -- ordered [{ type, props }]
  published   boolean not null default false,
  sort        int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists pages_sort_idx on public.pages (sort);
create index if not exists pages_slug_idx on public.pages (slug);

-- ============================================================
-- Row Level Security — anon reads only published rows; admins
-- read all and write (mirrors athletes/articles/roles).
-- ============================================================
alter table public.pages enable row level security;

drop policy if exists pages_public_read on public.pages;
create policy pages_public_read on public.pages
  for select using (published or public.is_admin());

drop policy if exists pages_admin_write on public.pages;
create policy pages_admin_write on public.pages
  for all using (public.is_admin()) with check (public.is_admin());
