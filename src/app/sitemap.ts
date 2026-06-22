import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { athletes } from '@/content/athletes';
import { listArticles } from '@/lib/content/insights';

const SITE = 'https://www.sadarasport.sa';

// Priority tiers
const HIGH_PRIORITY_ROUTES = new Set(['/']);
const SECTION_ROOTS = new Set([
  '/institution',
  '/what-we-do',
  '/talent',
  '/advisory',
  '/markets',
  '/athletes',
  '/insights',
  '/network',
  '/careers',
  '/contact',
]);

function priority(route: string) {
  if (HIGH_PRIORITY_ROUTES.has(route)) return 1.0;
  if (SECTION_ROOTS.has(route)) return 0.8;
  return 0.6;
}

const routes = [
  '/',
  '/institution',
  '/institution/about',
  '/institution/model',
  '/institution/leadership',
  '/institution/experts',
  '/institution/governance',
  '/institution/impact',
  '/what-we-do',
  '/talent',
  '/talent/elite-360',
  '/talent/services',
  '/talent/join',
  '/advisory',
  '/advisory/intelligence',
  '/advisory/coaching',
  '/advisory/recruitment',
  '/advisory/analysis',
  '/advisory/engage',
  '/markets',
  '/markets/deal-desk',
  '/markets/partnerships',
  '/markets/network',
  '/markets/connect',
  '/athletes',
  '/insights',
  '/insights/news',
  '/insights/articles',
  '/insights/press-kit',
  '/network',
  '/network/government',
  '/network/partners',
  '/network/corridors',
  '/careers',
  '/careers/culture',
  '/careers/roles',
  '/contact',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${SITE}/${locale}${route === '/' ? '' : route}`,
        lastModified: now,
        changeFrequency: route === '/' ? 'weekly' : 'monthly',
        priority: priority(route),
      });
    }

    for (const a of athletes) {
      entries.push({
        url: `${SITE}/${locale}/athletes/${a.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  // Articles from CMS
  try {
    const articles = await listArticles();
    const articleItems = articles.filter((a) => a.type === 'article');
    for (const locale of locales) {
      for (const a of articleItems) {
        entries.push({
          url: `${SITE}/${locale}/insights/articles/${a.slug}`,
          lastModified: a.date ? new Date(a.date) : now,
          changeFrequency: 'monthly',
          priority: 0.65,
        });
      }
    }
  } catch {
    // CMS unavailable at build time — skip dynamic articles
  }

  return entries;
}
