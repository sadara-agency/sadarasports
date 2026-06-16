import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n';
import { HomeHero } from '@/components/sections/HomeHero';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'صدارة الرياضية — مؤسسة، لا وكالة' : 'Sadara Sports — An Institution, Not an Agency',
    description: isAr
      ? 'صدارة الرياضية: مؤسسة تُمثّل المواهب الرياضية، وتستشير الأندية والاتحادات، وتربط أسواق المنطقة والعالم.'
      : 'Sadara Sports represents and develops athletes, advises clubs and federations, and connects markets across MENA and beyond.',
    openGraph: {
      title: isAr ? 'صدارة الرياضية — مؤسسة، لا وكالة' : 'Sadara Sports — An Institution, Not an Agency',
      description: isAr
        ? 'مؤسسة تُمثّل المواهب، وتستشير الأندية والاتحادات، وتربط الأسواق.'
        : 'We represent talent, advise clubs and federations, and connect markets.',
      url: isAr ? '/ar' : '/en',
    },
  };
}

// CAA-faithful homepage: a single full-screen pillar-nav. The other Home*
// section components remain in the repo (unused here) for future use.
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  return <HomeHero locale={loc} />;
}
