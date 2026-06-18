import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, type Locale, pick, localeHref, locales } from '@/lib/i18n';
import { listArticles, getArticleBySlug } from '@/lib/content/insights';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { CTASection } from '@/components/sections/Blocks';

export async function generateStaticParams() {
  const articles = await listArticles();
  return locales.flatMap((locale) =>
    articles.filter((a) => a.type === 'news').map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  const a = await getArticleBySlug(slug);
  if (!a) return { title: 'News' };
  return { title: tr(a.title), description: tr(a.excerpt) };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);
  const a = await getArticleBySlug(slug);
  if (!a || a.type !== 'news') notFound();

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(a.category)}
        title={tr(a.title)}
        lead={tr(a.excerpt)}
        image={a.image}
        crumbs={[
          { label: tr({ en: 'Home', ar: 'الرئيسية' }), href: '/' },
          { label: tr({ en: 'Insights', ar: 'رؤى وأخبار' }), href: '/insights' },
          { label: tr({ en: 'News', ar: 'أخبار' }), href: '/insights/news' },
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
              href={localeHref(loc, '/insights/news')}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <span className="rtl:rotate-180">←</span>
              {tr({ en: 'Back to news', ar: 'العودة إلى الأخبار' })}
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
