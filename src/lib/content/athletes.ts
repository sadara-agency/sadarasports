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
};

// DB row → the Athlete shape components already consume, plus resolved photo.
function fromRow(r: Row): Athlete & { photoUrl: string } {
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
  };
}

const withPhoto = (a: Athlete): Athlete & { photoUrl: string } => ({
  ...a,
  photoUrl: images.athletes[a.slug] ?? images.athleteDefault,
});

export const listAthletes = cache(async (): Promise<(Athlete & { photoUrl: string })[]> => {
  if (!supabaseConfigured()) return fallback.map(withPhoto);
  try {
    const db = serviceClient();
    const { data, error } = await db
      .from('athletes')
      .select('*')
      .eq('published', true)
      .is('archived_at', null)
      .order('sort', { ascending: true });
    if (error || !data?.length) return fallback.map(withPhoto);
    return (data as Row[]).map(fromRow);
  } catch {
    return fallback.map(withPhoto);
  }
});

export const getAthlete = cache(async (slug: string) => {
  const all = await listAthletes();
  return all.find((a) => a.slug === slug) ?? null;
});
