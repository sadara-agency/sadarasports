import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, type Locale, pick, localeHref, locales } from '@/lib/i18n';
import { listArticles, getArticleBySlug } from '@/lib/content/insights';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { CTASection } from '@/components/sections/Blocks';
import { ArticleJsonLd } from '@/components/layout/JsonLd';
import { previewAllowed } from '@/lib/admin/preview';

const SITE = 'https://www.sadarasport.sa';

export async function generateStaticParams() {
  const articles = await listArticles();
  return locales.flatMap((locale) =>
    articles.filter((a) => a.type === 'article').map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  const a = await getArticleBySlug(slug, await previewAllowed(await searchParams));
  if (!a) return { title: 'Article' };
  const canonicalUrl = a.canonicalUrl || `${SITE}/${locale}/insights/articles/${slug}`;
  const description = (a.metaDescription && tr(a.metaDescription)) || tr(a.excerpt);
  const ogImage = a.ogImage || a.image;
  return {
    title: tr(a.title),
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': `${SITE}/ar/insights/articles/${slug}`,
        ar: `${SITE}/ar/insights/articles/${slug}`,
        en: `${SITE}/en/insights/articles/${slug}`,
      },
    },
    openGraph: {
      title: tr(a.title),
      description,
      url: canonicalUrl,
      type: 'article',
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: tr(a.title) }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: tr(a.title),
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ArticleDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);
  const preview = await previewAllowed(await searchParams);
  const a = await getArticleBySlug(slug, preview);
  if (!a || a.type !== 'article') notFound();

  return (
    <>
      {preview && (
        <div className="bg-[#FF9F0A] px-4 py-1.5 text-center text-sm font-medium text-black">
          Preview — not yet published · معاينة — غير منشورة
        </div>
      )}
      <ArticleJsonLd
        headline={tr(a.title)}
        description={tr(a.excerpt)}
        image={a.image}
        datePublished={a.date}
        url={`${SITE}/${loc}/insights/articles/${slug}`}
        locale={loc}
      />
      <PageHero
        locale={loc}
        kicker={tr(a.category)}
        title={tr(a.title)}
        lead={tr(a.excerpt)}
        image={a.image}
        crumbs={[
          { label: tr({ en: 'Home', ar: 'الرئيسية' }), href: '/' },
          { label: tr({ en: 'Insights', ar: 'رؤى وأخبار' }), href: '/insights' },
          { label: tr({ en: 'Articles', ar: 'مقالات' }), href: '/insights/articles' },
          { label: tr(a.title) },
        ]}
      />

      <section className="border-t border-hairline bg-paper py-16 md:py-24">
        <div className="wrap max-w-3xl">
          <Reveal>
            <div className="mb-8 flex items-center gap-4 text-xs text-faint">
              <span className="font-mono uppercase tracking-wider">{a.date}</span>
              <span>·</span>
              <span className="font-mono uppercase tracking-wider text-electric">{tr(a.category)}</span>
            </div>
          </Reveal>
          {a.body ? (
            <Reveal>
              <div
                className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-h2 prose-h3:text-h3 prose-h2:mt-12 prose-h3:mt-6 prose-h3:mb-2 prose-p:text-base prose-p:leading-relaxed prose-p:text-ink prose-p:mb-5 prose-blockquote:border-l-4 prose-blockquote:border-electric prose-blockquote:ps-6 prose-blockquote:not-italic prose-blockquote:text-lg prose-blockquote:font-medium prose-blockquote:text-ink prose-strong:text-ink prose-li:text-ink prose-li:leading-relaxed prose-ol:my-6 prose-ul:my-6"
                dangerouslySetInnerHTML={{ __html: a.body[loc] ?? a.body.en }}
              />
            </Reveal>
          ) : (
            <Reveal>
              <p className="text-lg leading-relaxed text-muted">{tr(a.excerpt)}</p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-t border-hairline py-12">
        <div className="wrap">
          <Reveal>
            <Link
              href={localeHref(loc, '/insights/articles')}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <span className="rtl:rotate-180">←</span>
              {tr({ en: 'Back to articles', ar: 'العودة إلى المقالات' })}
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        locale={loc}
        title={tr({ en: 'Ready to start the conversation?', ar: 'هل أنت مستعد لبدء المحادثة؟' })}
        primary={{ label: tr({ en: 'Contact us', ar: 'تواصل معنا' }), href: '/contact' }}
      />
    </>
  );
}
