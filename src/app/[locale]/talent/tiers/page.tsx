import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale } from '@/lib/i18n';
import { ComingSoon } from '@/components/sections/ComingSoon';

export const metadata: Metadata = {
  title: 'Coming Soon — Sadara Sports',
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <ComingSoon
      backHref={`/${locale}/talent`}
      backLabel="Back to Talent"
      title="Coming soon."
      lead="The tier system page is on its way. Return to Talent Management in the meantime."
      kicker="In progress"
    />
  );
}
