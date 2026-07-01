import 'server-only';
import { cache } from 'react';
import { serviceClient, supabaseConfigured } from '@/lib/supabase/service';
import { athletes as fallback, type Athlete } from '@/content/athletes';
import { images } from '@/content/images';

type Row = {
  slug: string;
  name_ar: string; name_en: string;
  sport_ar: string; sport_en: string;
  position_ar: string; position_en: string;
  tier: Athlete['tier'];
  club_ar: string; club_en: string;
  featured: boolean;
  bio_ar: string; bio_en: string;
  trajectory_ar: string; trajectory_en: string;
  media_value_ar: string; media_value_en: string;
  stats: Athlete['stats'];
  accent: string;
  photo_url: string | null;
  sort: number;
  meta_description_ar?: string; meta_description_en?: string;
  og_image_url?: string | null; canonical_url?: string | null;
};

export type AthleteWithPhoto = Athlete & {
  photoUrl: string;
  metaDescription?: { ar: string; en: string }; ogImage?: string | null; canonicalUrl?: string | null;
};

// DB row → the Athlete shape components already consume, plus resolved photo.
function fromRow(r: Row): AthleteWithPhoto {
  return {
    slug: r.slug,
    name: { ar: r.name_ar, en: r.name_en },
    sport: { ar: r.sport_ar, en: r.sport_en },
    position: { ar: r.position_ar, en: r.position_en },
    tier: r.tier,
    club: { ar: r.club_ar, en: r.club_en },
    featured: r.featured,
    bio: { ar: r.bio_ar, en: r.bio_en },
    trajectory: { ar: r.trajectory_ar, en: r.trajectory_en },
    mediaValue: { ar: r.media_value_ar, en: r.media_value_en },
    stats: r.stats ?? [],
    accent: r.accent,
    photoUrl: r.photo_url || images.athletes[r.slug] || images.athleteDefault,
    metaDescription: { ar: r.meta_description_ar ?? '', en: r.meta_description_en ?? '' },
    ogImage: r.og_image_url ?? null,
    canonicalUrl: r.canonical_url ?? null,
  };
}

const withPhoto = (a: Athlete): AthleteWithPhoto => ({
  ...a,
  photoUrl: images.athletes[a.slug] ?? images.athleteDefault,
});

// preview=true also returns unpublished drafts (callers must verify the request is from an admin before passing it).
export const listAthletes = cache(async (preview = false): Promise<AthleteWithPhoto[]> => {
  if (!supabaseConfigured()) return fallback.map(withPhoto);
  try {
    const db = serviceClient();
    let q = db.from('athletes').select('*').is('archived_at', null);
    if (!preview) q = q.eq('published', true);
    const { data, error } = await q.order('sort', { ascending: true });
    if (error || !data?.length) return fallback.map(withPhoto);
    return (data as Row[]).map(fromRow);
  } catch {
    return fallback.map(withPhoto);
  }
});

export const getAthlete = cache(async (slug: string, preview = false) => {
  const all = await listAthletes(preview);
  return all.find((a) => a.slug === slug) ?? null;
});
