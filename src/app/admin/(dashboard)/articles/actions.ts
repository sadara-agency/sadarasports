'use server';

import { revalidatePath } from 'next/cache';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';
import { requireFields, validateSlug, checkDuplicateSlug } from '@/lib/admin/validate';

export type ArticleRow = {
  id?: string;
  slug: string;
  category_ar: string; category_en: string;
  title_ar: string; title_en: string;
  excerpt_ar: string; excerpt_en: string;
  body_ar: string; body_en: string;
  date: string;
  type: 'article' | 'news';
  image_url: string | null;
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

export async function listAllArticles() {
  await guard();
  const db = serviceClient();
  const { data, error } = await db.from('articles').select('*').is('archived_at', null).order('sort', { ascending: true });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, rows: (data ?? []) as ArticleRow[] };
}

export async function saveArticle(row: ArticleRow) {
  await guard();
  const db = serviceClient();

  const bad =
    validateSlug(row.slug) ??
    requireFields(row, [
      { key: 'title_ar', label: { ar: 'العنوان (عربي)', en: 'Title (Arabic)' } },
      { key: 'title_en', label: { ar: 'العنوان (إنجليزي)', en: 'Title (English)' } },
    ]);
  if (bad) return { ok: false as const, error: bad.error };

  const { data: existing } = await db.from('articles').select('id, slug').is('archived_at', null);
  const dup = checkDuplicateSlug(row.slug, existing ?? [], row.id);
  if (dup) return { ok: false as const, error: dup.error };

  const payload = { ...row, slug: row.slug.trim(), updated_at: new Date().toISOString() };
  const res = row.id
    ? await db.from('articles').update(payload).eq('id', row.id)
    : await db.from('articles').insert(payload);
  if (res.error) return { ok: false as const, error: { ar: res.error.message, en: res.error.message } };
  refresh();
  return { ok: true as const };
}

export async function deleteArticle(id: string) {
  await guard();
  const db = serviceClient();
  const { error } = await db.from('articles').update({ archived_at: new Date().toISOString() }).eq('id', id);
  if (error) return { ok: false as const, error: error.message };
  refresh();
  return { ok: true as const };
}

export async function reorderArticles(ids: string[]) {
  await guard();
  const db = serviceClient();
  for (let i = 0; i < ids.length; i++) {
    await db.from('articles').update({ sort: i }).eq('id', ids[i]);
  }
  refresh();
  return { ok: true as const };
}
