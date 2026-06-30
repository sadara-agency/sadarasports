'use server';

import { revalidatePath } from 'next/cache';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';
import { requireFields } from '@/lib/admin/validate';

export type RoleRow = {
  id?: string;
  title_ar: string; title_en: string;
  team_ar: string; team_en: string;
  type_ar: string; type_en: string;
  location_ar: string; location_en: string;
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

export async function listAllRoles() {
  await guard();
  const db = serviceClient();
  const { data, error } = await db.from('roles').select('*').is('archived_at', null).order('sort', { ascending: true });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, rows: (data ?? []) as RoleRow[] };
}

export async function saveRole(row: RoleRow) {
  await guard();
  const db = serviceClient();

  const bad = requireFields(row, [
    { key: 'title_ar', label: { ar: 'المسمى (عربي)', en: 'Title (Arabic)' } },
    { key: 'title_en', label: { ar: 'المسمى (إنجليزي)', en: 'Title (English)' } },
  ]);
  if (bad) return { ok: false as const, error: bad.error };

  const payload = { ...row, updated_at: new Date().toISOString() };
  const res = row.id
    ? await db.from('roles').update(payload).eq('id', row.id)
    : await db.from('roles').insert(payload);
  if (res.error) return { ok: false as const, error: { ar: res.error.message, en: res.error.message } };
  refresh();
  return { ok: true as const };
}

export async function deleteRole(id: string) {
  await guard();
  const db = serviceClient();
  const { error } = await db.from('roles').update({ archived_at: new Date().toISOString() }).eq('id', id);
  if (error) return { ok: false as const, error: error.message };
  refresh();
  return { ok: true as const };
}

export async function reorderRoles(ids: string[]) {
  await guard();
  const db = serviceClient();
  for (let i = 0; i < ids.length; i++) {
    await db.from('roles').update({ sort: i }).eq('id', ids[i]);
  }
  refresh();
  return { ok: true as const };
}
