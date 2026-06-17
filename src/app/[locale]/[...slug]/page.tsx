import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { getPublishedPage } from '@/lib/content/pages';
import { renderBlock } from '@/lib/blocks/registry';

// Catch-all for builder-authored pages. Rendered dynamically (SSR) per request:
// pages are created/edited at runtime in the CMS, and the shared root layout uses
// headers(), so this route can't be statically prerendered. Next.js resolves
// more-specific routes first, so fixed routes (/talent, /athletes/[slug], …) are
// unaffected — only otherwise-unmatched paths reach here, and unknown slugs 404.
export const dynamic = 'force-dynamic';

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
