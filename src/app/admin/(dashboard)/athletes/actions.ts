'use server';

import { revalidatePath } from 'next/cache';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';
import { requireFields, validateSlug, checkDuplicateSlug } from '@/lib/admin/validate';

export type AthleteRow = {
  id?: string;
  slug: string;
  name_ar: string; name_en: string;
  sport_ar: string; sport_en: string;
  position_ar: string; position_en: string;
  tier: string;
  club_ar: string; club_en: string;
  featured: boolean;
  bio_ar: string; bio_en: string;
  trajectory_ar: string; trajectory_en: string;
  media_value_ar: string; media_value_en: string;
  stats: { value: number; decimals?: number; suffix?: string; label: { ar: string; en: string } }[];
  accent: string;
  photo_url: string | null;
  sort: number;
  published: boolean;
};

async function guard() {
  const { user, isAdmin } = await getSessionUser();
  if (!user || !isAdmin) throw new Error('unauthorized');
  return user;
}

function refresh() {
  revalidatePath('/[locale]', 'layout');
}

export async function listAllAthletes() {
  await guard();
  const db = serviceClient();
  const { data, error } = await db.from('athletes').select('*').is('archived_at', null).order('sort', { ascending: true });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, rows: (data ?? []) as AthleteRow[] };
}

export async function saveAthlete(row: AthleteRow) {
  await guard();
  const db = serviceClient();

  const bad =
    validateSlug(row.slug) ??
    requireFields(row, [
      { key: 'name_ar', label: { ar: 'الاسم (عربي)', en: 'Name (Arabic)' } },
      { key: 'name_en', label: { ar: 'الاسم (إنجليزي)', en: 'Name (English)' } },
    ]);
  if (bad) return { ok: false as const, error: bad.error };

  const { data: existing } = await db.from('athletes').select('id, slug').is('archived_at', null);
  const dup = checkDuplicateSlug(row.slug, existing ?? [], row.id);
  if (dup) return { ok: false as const, error: dup.error };

  const payload = { ...row, slug: row.slug.trim(), updated_at: new Date().toISOString() };
  const res = row.id
    ? await db.from('athletes').update(payload).eq('id', row.id)
    : await db.from('athletes').insert(payload);
  if (res.error) return { ok: false as const, error: { ar: res.error.message, en: res.error.message } };
  refresh();
  return { ok: true as const };
}

export async function deleteAthlete(id: string) {
  await guard();
  const db = serviceClient();
  // Soft delete: hidden everywhere but recoverable by clearing archived_at.
  const { error } = await db.from('athletes').update({ archived_at: new Date().toISOString() }).eq('id', id);
  if (error) return { ok: false as const, error: error.message };
  refresh();
  return { ok: true as const };
}

export async function reorderAthletes(ids: string[]) {
  await guard();
  const db = serviceClient();
  for (let i = 0; i < ids.length; i++) {
    await db.from('athletes').update({ sort: i }).eq('id', ids[i]);
  }
  refresh();
  return { ok: true as const };
}
