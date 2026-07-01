'use server';

import { revalidatePath } from 'next/cache';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';
import { sanitizeLongTextTree } from '@/lib/sanitize';

const isRichTextKey = (key: string | number) => String(key).toLowerCase().includes('body');

// Persist a content_docs row and refresh the public site.
export async function saveDoc(key: string, data: Record<string, unknown>) {
  const { user, isAdmin } = await getSessionUser();
  if (!user || !isAdmin) return { ok: false, error: 'unauthorized' };

  const db = serviceClient();
  const clean = sanitizeLongTextTree(data, isRichTextKey) as Record<string, unknown>;
  const { error } = await db
    .from('content_docs')
    .upsert({ key, data: clean, updated_by: user.id, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) return { ok: false, error: error.message };

  // Refresh the whole localized tree (every page may read this doc, e.g. nav/images).
  revalidatePath('/[locale]', 'layout');
  return { ok: true };
}
