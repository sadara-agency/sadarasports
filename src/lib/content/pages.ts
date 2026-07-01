import 'server-only';
import { cache } from 'react';
import { serviceClient, supabaseConfigured } from '@/lib/supabase/service';
import type { BlockData } from '@/lib/blocks/schemas';

export type PublishedPage = {
  slug: string;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
  blocks: BlockData[];
  og_image_url: string | null;
  canonical_url: string | null;
};

// A published builder page by slug, or null. There is no in-repo fallback for
// builder pages — when Supabase is unset or the row is missing/unpublished we
// simply have no page (the route 404s).
// preview=true returns an unpublished draft too (callers must verify the
// request is from an admin before passing it). Archived rows are never shown.
export const getPublishedPage = cache(async (slug: string, preview = false): Promise<PublishedPage | null> => {
  if (!supabaseConfigured()) return null;
  try {
    const db = serviceClient();
    let q = db
      .from('pages')
      .select('slug, title_ar, title_en, desc_ar, desc_en, blocks, og_image_url, canonical_url')
      .eq('slug', slug)
      .is('archived_at', null);
    if (!preview) q = q.eq('published', true);
    const { data, error } = await q.single();
    if (error || !data) return null;
    return { ...data, blocks: Array.isArray(data.blocks) ? (data.blocks as BlockData[]) : [] };
  } catch {
    return null;
  }
});
