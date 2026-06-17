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

const SITE = 'https://www.sadarasport.sa';

export async function generateStaticParams() {
  const athletes = await listAthletes();
  return locales.flatMap((locale) => athletes.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  const a = await getAthlete(slug);
  if (!a) return { title: 'Athlete' };
  const canonicalUrl = `${SITE}/${locale}/athletes/${slug}`;
  const altLocale = locale === 'ar' ? 'en' : 'ar';
  return {
    title: tr(a.name),
    description: tr(a.bio),
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
      description: tr(a.bio),
      url: canonicalUrl,
      type: 'profile',
      ...(a.photoUrl ? { images: [{ url: a.photoUrl, width: 1200, height: 630, alt: tr(a.name) }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: tr(a.name),
      description: tr(a.bio),
      ...(a.photoUrl ? { images: [a.photoUrl] } : {}),
    },
  };
}

export default async function AthleteProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);
  const a = await getAthlete(slug);
  if (!a) notFound();

  return (
    <>
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
        kicker={`${a.tier} · ${tr(a.position)}`}
        title={tr(a.name)}
        lead={tr(a.bio)}
        image={a.photoUrl}
        crumbs={[
          { label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
          { label: loc === 'ar' ? 'لاعبونا' : 'Our Athletes', href: '/athletes' },
          { label: tr(a.name) },
        ]}
      />

      {/* Stat band */}
      <section className="relative border-t border-hairline bg-canvas py-12">
        <div className="wrap relative">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Tag tone={a.tier === 'A+' ? 'gold' : 'blue'}>{a.tier}</Tag>
            <Tag tone="neutral">{tr(a.sport)}</Tag>
            <Tag tone="neutral">{tr(a.club)}</Tag>
            {a.featured && <Tag tone="cyan">{loc === 'ar' ? 'القضية المميَّزة' : 'Featured case'}</Tag>}
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
        kicker={loc === 'ar' ? 'المسار' : 'Trajectory'}
        title={loc === 'ar' ? 'من الاكتشاف إلى القيمة.' : 'From discovery to value.'}
        body={tr(a.trajectory)}
        tone="electric"
      />

      <SplitBand
        locale={loc}
        kicker={loc === 'ar' ? 'القيمة الإعلامية' : 'Media value'}
        title={loc === 'ar' ? 'القيمة السوقية والحضور.' : 'Market value and presence.'}
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
              {loc === 'ar' ? 'العودة إلى القائمة' : 'Back to the roster'}
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        locale={loc}
        title={loc === 'ar' ? 'مثل هذا اللاعب يبدأ بمحادثة.' : 'A career like this starts with a conversation.'}
        primary={{ label: loc === 'ar' ? 'قدّم طلب تمثيل' : 'Enquire about representation', href: '/talent/join' }}
        secondary={{ label: loc === 'ar' ? 'منصة Elite 360' : 'The Elite 360 platform', href: '/talent/elite-360' }}
      />
    </>
  );
}
