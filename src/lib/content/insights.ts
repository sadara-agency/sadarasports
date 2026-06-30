import 'server-only';
import { cache } from 'react';
import { serviceClient, supabaseConfigured } from '@/lib/supabase/service';
import { articles as fallback, type Article } from '@/content/insights';
import { images } from '@/content/images';

export type ArticleWithImage = Article & { slug: string; image: string; body?: { ar: string; en: string } };

type Row = {
  slug: string;
  category_ar: string; category_en: string;
  title_ar: string; title_en: string;
  excerpt_ar: string; excerpt_en: string;
  body_ar: string; body_en: string;
  date: string;
  type: Article['type'];
  image_url: string | null;
  sort: number;
};

function fromRow(r: Row, i: number): ArticleWithImage {
  return {
    slug: r.slug,
    category: { ar: r.category_ar, en: r.category_en },
    title: { ar: r.title_ar, en: r.title_en },
    excerpt: { ar: r.excerpt_ar, en: r.excerpt_en },
    body: { ar: r.body_ar, en: r.body_en },
    date: r.date,
    type: r.type,
    image: r.image_url || images.articles[i % images.articles.length],
  };
}

const fallbackList = (): ArticleWithImage[] =>
  fallback.map((a, i) => ({
    ...a,
    slug: a.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60) || `article-${i}`,
    image: images.articles[i % images.articles.length],
  }));

export async function getArticleBySlug(slug: string): Promise<ArticleWithImage | null> {
  const all = await listArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

export const listArticles = cache(async (): Promise<ArticleWithImage[]> => {
  if (!supabaseConfigured()) return fallbackList();
  try {
    const db = serviceClient();
    const { data, error } = await db
      .from('articles')
      .select('*')
      .eq('published', true)
      .is('archived_at', null)
      .order('sort', { ascending: true });
    if (error || !data?.length) return fallbackList();
    return (data as Row[]).map(fromRow);
  } catch {
    return fallbackList();
  }
});
