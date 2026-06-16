// Football-led Unsplash placeholders for the photography-led CAA register.
// Centralized + typed so real Sadara assets can replace these in one place.
//
// TODO(content): Replace ALL of these with real Sadara photography before
// go-live. The CAA look depends heavily on photo quality. Keys to supply:
// homeHero (unused on home now — kept for future), pageHero.* (one per
// section), per-athlete portraits keyed by slug, athleteDefault, article cards.

export const images = {
  homeHero: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&q=75',
  pageHero: {
    institution: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1600&q=72', // stadium
    talent: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=72', // football training
    advisory: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1600&q=72', // pitch / play
    markets: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1600&q=72', // pitch / play
    athletes: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1600&q=72', // stadium crowd
    insights: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1600&q=72', // football close
    network: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&q=72', // boot + ball
    careers: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1600&q=72', // team
    contact: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1600&q=72',
    default: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1600&q=72',
  },
  // Per-athlete-slug portrait. Falls back to `athleteDefault` when a slug is absent.
  athletes: {
    'hammam-al-hammami': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&q=75',
  } as Record<string, string>,
  athleteDefault: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1000&q=72',
  // Insights/news cards — indexed by position in the articles array.
  articles: [
    'https://picsum.photos/seed/sadara-a1/900/562',
    'https://picsum.photos/seed/sadara-a2/900/562',
    'https://picsum.photos/seed/sadara-a3/900/562',
    'https://picsum.photos/seed/sadara-a4/900/562',
    'https://picsum.photos/seed/sadara-a5/900/562',
    'https://picsum.photos/seed/sadara-a6/900/562',
  ] as string[],
};

/** Athlete portrait by slug, with fallback. */
export function athletePhoto(slug: string): string {
  return images.athletes[slug] ?? images.athleteDefault;
}

/** Article photo by index, cycling if out of range. */
export function articlePhoto(i: number): string {
  return images.articles[i % images.articles.length];
}
