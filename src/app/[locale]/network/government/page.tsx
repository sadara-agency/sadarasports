import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { ModuleDetail } from '@/components/sections/ModuleDetail';
import { LogoGrid } from '@/components/sections/LogoGrid';
import { government } from '@/content/network';
import { images } from '@/content/images';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(government.title), description: tr(government.lead) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <ModuleDetail locale={locale as Locale} data={government} image={images.pageHero.network} />
      <LogoGrid
        locale={locale as Locale}
        logos={[
          { title: { ar: 'وزارة الرياضة', en: 'Ministry of Sport' }, src: '/network/GOVERNMENT/Ministry of Sport.png' },
          { title: { ar: 'الاتحاد السعودي لكرة القدم', en: 'SAFF' }, src: '/network/GOVERNMENT/saff.png' },
        ]}
        kicker={locale === 'ar' ? 'الحكومة والاتحادات' : 'Government & Federations'}
        title={locale === 'ar' ? 'الجهات التي نعمل ضمن إطارها.' : 'The bodies we operate within.'}
      />
    </>
  );
}
