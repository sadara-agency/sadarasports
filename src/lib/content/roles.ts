import 'server-only';
import { cache } from 'react';
import { serviceClient, supabaseConfigured } from '@/lib/supabase/service';
import { roles as fallback, type Role } from '@/content/careers';

type Row = {
  title_ar: string; title_en: string;
  team_ar: string; team_en: string;
  type_ar: string; type_en: string;
  location_ar: string; location_en: string;
  sort: number;
};

const fromRow = (r: Row): Role => ({
  title: { ar: r.title_ar, en: r.title_en },
  team: { ar: r.team_ar, en: r.team_en },
  type: { ar: r.type_ar, en: r.type_en },
  location: { ar: r.location_ar, en: r.location_en },
});

export const listRoles = cache(async (): Promise<Role[]> => {
  if (!supabaseConfigured()) return fallback.list;
  try {
    const db = serviceClient();
    const { data, error } = await db
      .from('roles')
      .select('*')
      .eq('published', true)
      .is('archived_at', null)
      .order('sort', { ascending: true });
    if (error || !data?.length) return fallback.list;
    return (data as Row[]).map(fromRow);
  } catch {
    return fallback.list;
  }
});
