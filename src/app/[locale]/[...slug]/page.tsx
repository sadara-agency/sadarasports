import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, isLocale, type Locale, pick } from '@/lib/i18n';
import { getPublishedPage, listPublishedSlugs } from '@/lib/content/pages';
import { renderBlock } from '@/lib/blocks/registry';

// Catch-all for builder-authored pages. Next.js resolves more-specific routes
// first, so fixed routes (/talent, /athletes/[slug], …) are unaffected — only
// otherwise-unmatched paths reach here, and unknown slugs 404.
export async function generateStaticParams() {
  const slugs = await listPublishedSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug: slug.split('/') })),
  );
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const page = await getPublishedPage(slug.join('/'));
  if (!page) return {};
  const tr = pick(locale);
  return {
    title: tr({ ar: page.title_ar, en: page.title_en }),
    description: tr({ ar: page.desc_ar, en: page.desc_en }) || undefined,
  };
}

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const page = await getPublishedPage(slug.join('/'));
  if (!page) notFound();

  return (
    <>
      {page.blocks.map((block, i) => (
        <div key={i}>{renderBlock(block, loc)}</div>
      ))}
    </>
  );
}
