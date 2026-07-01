import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { getPublishedPage } from '@/lib/content/pages';
import { renderBlock } from '@/lib/blocks/registry';
import { previewAllowed } from '@/lib/admin/preview';

const SITE = 'https://www.sadarasport.sa';

// Catch-all for builder-authored pages. Rendered dynamically (SSR) per request:
// pages are created/edited at runtime in the CMS, and the shared root layout uses
// headers(), so this route can't be statically prerendered. Next.js resolves
// more-specific routes first, so fixed routes (/talent, /athletes/[slug], …) are
// unaffected — only otherwise-unmatched paths reach here, and unknown slugs 404.
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const page = await getPublishedPage(slug.join('/'), await previewAllowed(await searchParams));
  if (!page) return {};
  const tr = pick(locale);
  const title = tr({ ar: page.title_ar, en: page.title_en });
  const description = tr({ ar: page.desc_ar, en: page.desc_en }) || undefined;
  const canonicalUrl = page.canonical_url || `${SITE}/${locale}/${slug.join('/')}`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      ...(page.og_image_url ? { images: [{ url: page.og_image_url, width: 1200, height: 630, alt: title }] } : {}),
    },
  };
}

export default async function BuilderPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const preview = await previewAllowed(await searchParams);
  const page = await getPublishedPage(slug.join('/'), preview);
  if (!page) notFound();

  return (
    <>
      {preview && (
        <div className="bg-[#FF9F0A] px-4 py-1.5 text-center text-sm font-medium text-black">
          Preview — not yet published · معاينة — غير منشورة
        </div>
      )}
      {page.blocks.map((block, i) => (
        <div key={i}>{renderBlock(block, loc)}</div>
      ))}
    </>
  );
}
