-- web-caa CMS — Phase 4: SEO field overrides
-- Run in Supabase SQL Editor after 005_seed_fallback_articles.sql.
-- Idempotent: safe to re-run.
--
-- Lets admins override meta description / OG image / canonical URL per
-- article, athlete, or page instead of always deriving them from
-- excerpt/bio/desc + content image + the route pattern. Empty/null values
-- keep the existing derived behavior — purely additive.

alter table public.articles add column if not exists meta_description_ar text not null default '';
alter table public.articles add column if not exists meta_description_en text not null default '';
alter table public.articles add column if not exists og_image_url text;
alter table public.articles add column if not exists canonical_url text;

alter table public.athletes add column if not exists meta_description_ar text not null default '';
alter table public.athletes add column if not exists meta_description_en text not null default '';
alter table public.athletes add column if not exists og_image_url text;
alter table public.athletes add column if not exists canonical_url text;

-- pages already has desc_ar/desc_en serving as meta description; no new column needed there.
alter table public.pages add column if not exists og_image_url text;
alter table public.pages add column if not exists canonical_url text;
