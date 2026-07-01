import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, type Locale, pick, localeHref, locales } from '@/lib/i18n';
import { getAthlete, listAthletes } from '@/lib/content/athletes';
import { PageHero } from '@/components/sections/PageHero';
import { SplitBand, CTASection } from '@/components/sections/Blocks';
import { CountUp } from '@/components/motion/CountUp';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Tag } from '@/components/ui/Tag';
import { AthleteJsonLd } from '@/components/layout/JsonLd';
import { previewAllowed } from '@/lib/admin/preview';

const SITE = 'https://www.sadarasport.sa';

export async function generateStaticParams() {
  const athletes = await listAthletes();
  return locales.flatMap((locale) => athletes.map((a) => ({ locale, slug: a.slug })));
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
  const a = await getAthlete(slug, await previewAllowed(await searchParams));
  if (!a) return { title: 'Athlete' };
  const canonicalUrl = a.canonicalUrl || `${SITE}/${locale}/athletes/${slug}`;
  const description = (a.metaDescription && tr(a.metaDescription)) || tr(a.bio);
  const ogImage = a.ogImage || a.photoUrl;
  const altLocale = locale === 'ar' ? 'en' : 'ar';
  return {
    title: tr(a.name),
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': `${SITE}/ar/athletes/${slug}`,
        ar: `${SITE}/ar/athletes/${slug}`,
        en: `${SITE}/en/athletes/${slug}`,
      },
    },
    openGraph: {
      title: tr(a.name),
      description,
      url: canonicalUrl,
      type: 'profile',
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: tr(a.name) }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: tr(a.name),
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function AthleteProfilePage({
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
  const a = await getAthlete(slug, preview);
  if (!a) notFound();

  return (
    <>
      {preview && (
        <div className="bg-[#FF9F0A] px-4 py-1.5 text-center text-sm font-medium text-black">
          Preview — not yet published · معاينة — غير منشورة
        </div>
      )}
      <AthleteJsonLd
        name={tr(a.name)}
        description={tr(a.bio)}
        image={a.photoUrl}
        jobTitle={tr(a.position)}
        memberOf={tr(a.club)}
        url={`${SITE}/${loc}/athletes/${slug}`}
      />
      <PageHero
        locale={loc}
        kicker={tr(a.position)}
        title={tr(a.name)}
        lead={tr(a.bio)}
        image={a.photoUrl}
        crumbs={[
          { label: tr({ en: 'Home', ar: 'الرئيسية' }), href: '/' },
          { label: tr({ en: 'Our Athletes', ar: 'لاعبونا' }), href: '/athletes' },
          { label: tr(a.name) },
        ]}
      />

      {/* Stat band */}
      <section className="relative border-t border-hairline bg-canvas py-12">
        <div className="wrap relative">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Tag tone="neutral">{tr(a.sport)}</Tag>
            <Tag tone="neutral">{tr(a.club)}</Tag>
            {a.featured && <Tag tone="cyan">{tr({ en: 'Featured case', ar: 'القضية المميَّزة' })}</Tag>}
          </div>
          <RevealGroup className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {a.stats.map((s, i) => (
              <RevealItem key={i}>
                <div className="text-h1 font-bold text-ink">
                  <CountUp value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ''} />
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {tr(s.label)}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <SplitBand
        locale={loc}
        kicker={tr({ en: 'Trajectory', ar: 'المسار' })}
        title={tr({ en: 'From discovery to value.', ar: 'من الاكتشاف إلى القيمة.' })}
        body={tr(a.trajectory)}
        tone="electric"
      />

      <SplitBand
        locale={loc}
        kicker={tr({ en: 'Media value', ar: 'القيمة الإعلامية' })}
        title={tr({ en: 'Market value and presence.', ar: 'القيمة السوقية والحضور.' })}
        body={tr(a.mediaValue)}
        reverse
      />

      {/* Back to roster */}
      <section className="border-t border-hairline py-12">
        <div className="wrap">
          <Reveal>
            <Link
              href={localeHref(loc, '/athletes')}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <span className="rtl:rotate-180">←</span>
              {tr({ en: 'Back to the roster', ar: 'العودة إلى القائمة' })}
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        locale={loc}
        title={tr({ en: 'A career like this starts with a conversation.', ar: 'مثل هذا اللاعب يبدأ بمحادثة.' })}
        primary={{ label: tr({ en: 'Enquire about representation', ar: 'قدّم طلب تمثيل' }), href: '/talent/join' }}
        secondary={{ label: tr({ en: 'The Elite 360 platform', ar: 'منصة Elite 360' }), href: '/talent/elite-360' }}
      />
    </>
  );
}
