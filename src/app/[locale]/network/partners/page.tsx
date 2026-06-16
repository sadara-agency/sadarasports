import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { ModuleDetail } from '@/components/sections/ModuleDetail';
import { LogoGrid } from '@/components/sections/LogoGrid';
import { partners } from '@/content/network';
import { images } from '@/content/images';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(partners.title), description: tr(partners.lead) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <ModuleDetail locale={locale as Locale} data={partners} image={images.pageHero.network} />
      <LogoGrid
        locale={locale as Locale}
        logos={[
          { title: { ar: 'درية', en: 'Derayah' }, src: '/network/INSTITUTIONS/Derayah.png' },
          { title: { ar: 'سجايا', en: 'Sajaya' }, src: '/network/INSTITUTIONS/Sajaya.png' },
          { title: { ar: 'صكوك', en: 'Sukuk' }, src: '/network/INSTITUTIONS/Sukuk.png' },
        ]}
        kicker={locale === 'ar' ? 'المؤسسات المالية' : 'Financial Institutions'}
        title={locale === 'ar' ? 'الشركاء الماليون.' : 'Financial partners.'}
      />
      <LogoGrid
        locale={locale as Locale}
        logos={[
          { title: { ar: 'سكاوتنج ستاتس', en: 'ScoutingStats' }, src: '/network/SOLUTIONS/ScoutingStats.png' },
          { title: { ar: 'كاتابولت', en: 'Catapult' }, src: '/network/SOLUTIONS/Catapult.png' },
          { title: { ar: 'هودل', en: 'Hudl' }, src: '/network/SOLUTIONS/Hudl.png' },
          { title: { ar: 'فيتبت', en: 'FITBIT' }, src: '/network/SOLUTIONS/FITBIT.png' },
        ]}
        kicker={locale === 'ar' ? 'المنصات التقنية' : 'Technical Platforms'}
        title={locale === 'ar' ? 'أدوات الأداء والتحليل.' : 'Performance & analytics tools.'}
      />
    </>
  );
}
