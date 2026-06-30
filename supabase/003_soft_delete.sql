-- web-caa CMS — Phase 1.3 soft delete
-- Run in Supabase SQL Editor. Idempotent: safe to re-run.
--
-- Adds archived_at to the list/page tables. A non-null archived_at means the
-- row is in the trash: hidden from the public site and from admin lists, but
-- still recoverable (clear the column to restore). Replaces hard DELETE so an
-- accidental click can be undone.

alter table public.athletes add column if not exists archived_at timestamptz;
alter table public.articles add column if not exists archived_at timestamptz;
alter table public.roles    add column if not exists archived_at timestamptz;
alter table public.pages    add column if not exists archived_at timestamptz;

-- Public read must also exclude archived rows. (The public site reads via the
-- service-role key and filters in code, but tighten RLS too so the anon key
-- can never surface trashed content.)
drop policy if exists athletes_public_read on public.athletes;
create policy athletes_public_read on public.athletes
  for select using ((published and archived_at is null) or public.is_admin());

drop policy if exists articles_public_read on public.articles;
create policy articles_public_read on public.articles
  for select using ((published and archived_at is null) or public.is_admin());

drop policy if exists roles_public_read on public.roles;
create policy roles_public_read on public.roles
  for select using ((published and archived_at is null) or public.is_admin());

drop policy if exists pages_public_read on public.pages;
create policy pages_public_read on public.pages
  for select using ((published and archived_at is null) or public.is_admin());
