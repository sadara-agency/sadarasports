import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { ModuleDetail } from '@/components/sections/ModuleDetail';
import { CredentialsStrip } from '@/components/sections/CredentialsStrip';
import { governance, credentials } from '@/content/institution';
import { images } from '@/content/images';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(governance.title), description: tr(governance.lead) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <ModuleDetail locale={locale as Locale} data={governance} image={images.pageHero.institution} />
      <CredentialsStrip locale={locale as Locale} credentials={credentials} />
    </>
  );
}
