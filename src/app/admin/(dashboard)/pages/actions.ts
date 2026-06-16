'use server';

import { revalidatePath } from 'next/cache';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';
import type { BlockData } from '@/lib/blocks/schemas';

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
  const { data, error } = await db.from('pages').select('*').order('sort', { ascending: true });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, rows: (data ?? []) as PageRow[] };
}

export async function savePage(row: PageRow) {
  await guard();
  const slug = row.slug.trim();
  if (!slug) return { ok: false as const, error: 'Slug is required.' };
  const db = serviceClient();
  const payload = { ...row, slug, updated_at: new Date().toISOString() };
  const res = row.id
    ? await db.from('pages').update(payload).eq('id', row.id)
    : await db.from('pages').insert(payload);
  if (res.error) return { ok: false as const, error: res.error.message };
  refresh();
  return { ok: true as const };
}

export async function deletePage(id: string) {
  await guard();
  const db = serviceClient();
  const { error } = await db.from('pages').delete().eq('id', id);
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
