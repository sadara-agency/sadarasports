'use server';

import { revalidatePath } from 'next/cache';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';
import type { BlockData } from '@/lib/blocks/schemas';
import { requireFields, validateSlug, checkDuplicateSlug } from '@/lib/admin/validate';

export type PageRow = {
  id?: string;
  slug: string;
  title_ar: string; title_en: string;
  desc_ar: string; desc_en: string;
  blocks: BlockData[];
  published: boolean;
  sort: number;
};

async function guard() {
  const { user, isAdmin } = await getSessionUser();
  if (!user || !isAdmin) throw new Error('unauthorized');
  return user;
}

function refresh() {
  revalidatePath('/[locale]', 'layout');
}

export async function listAllPages() {
  await guard();
  const db = serviceClient();
  const { data, error } = await db.from('pages').select('*').is('archived_at', null).order('sort', { ascending: true });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, rows: (data ?? []) as PageRow[] };
}

export async function savePage(row: PageRow) {
  await guard();
  const db = serviceClient();

  const bad =
    validateSlug(row.slug) ??
    requireFields(row, [
      { key: 'title_ar', label: { ar: 'العنوان (عربي)', en: 'Title (Arabic)' } },
      { key: 'title_en', label: { ar: 'العنوان (إنجليزي)', en: 'Title (English)' } },
    ]);
  if (bad) return { ok: false as const, error: bad.error };

  const { data: existing } = await db.from('pages').select('id, slug').is('archived_at', null);
  const dup = checkDuplicateSlug(row.slug, existing ?? [], row.id);
  if (dup) return { ok: false as const, error: dup.error };

  const payload = { ...row, slug: row.slug.trim(), updated_at: new Date().toISOString() };
  const res = row.id
    ? await db.from('pages').update(payload).eq('id', row.id)
    : await db.from('pages').insert(payload);
  if (res.error) return { ok: false as const, error: { ar: res.error.message, en: res.error.message } };
  refresh();
  return { ok: true as const };
}

export async function deletePage(id: string) {
  await guard();
  const db = serviceClient();
  const { error } = await db.from('pages').update({ archived_at: new Date().toISOString() }).eq('id', id);
  if (error) return { ok: false as const, error: error.message };
  refresh();
  return { ok: true as const };
}

export async function reorderPages(ids: string[]) {
  await guard();
  const db = serviceClient();
  for (let i = 0; i < ids.length; i++) {
    await db.from('pages').update({ sort: i }).eq('id', ids[i]);
  }
  refresh();
  return { ok: true as const };
}
