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
};

// A published builder page by slug, or null. There is no in-repo fallback for
// builder pages — when Supabase is unset or the row is missing/unpublished we
// simply have no page (the route 404s).
export const getPublishedPage = cache(async (slug: string): Promise<PublishedPage | null> => {
  if (!supabaseConfigured()) return null;
  try {
    const db = serviceClient();
    const { data, error } = await db
      .from('pages')
      .select('slug, title_ar, title_en, desc_ar, desc_en, blocks')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    if (error || !data) return null;
    return { ...data, blocks: Array.isArray(data.blocks) ? (data.blocks as BlockData[]) : [] };
  } catch {
    return null;
  }
});

// Slugs of all published pages — used by generateStaticParams.
export const listPublishedSlugs = cache(async (): Promise<string[]> => {
  if (!supabaseConfigured()) return [];
  try {
    const db = serviceClient();
    const { data, error } = await db.from('pages').select('slug').eq('published', true);
    if (error || !data) return [];
    return data.map((r) => r.slug as string);
  } catch {
    return [];
  }
});
