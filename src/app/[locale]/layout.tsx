import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, isLocale, type Locale } from '@/lib/i18n';
import { HtmlLangSync } from '@/components/layout/HtmlLangSync';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    openGraph: {
      type: 'website',
      siteName: 'Sadara Sports',
      locale: isAr ? 'ar_SA' : 'en_US',
      title: 'Sadara Sports — صدارة الرياضية',
      description: isAr
        ? 'مؤسسة، لا وكالة. نُمثّل المواهب، ونستشير الأندية والاتحادات، ونربط الأسواق.'
        : 'An institution, not an agency. We represent talent, advise clubs and federations, and connect markets.',
    },
    alternates: {
      canonical: isAr ? '/ar' : '/en',
      languages: {
        'x-default': '/ar',
        ar: '/ar',
        en: '/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;

  return (
    <>
      {/* HtmlLangSync syncs lang/dir on client-side navigations between locales */}
      <HtmlLangSync locale={loc} />
      <PageTransition />
      <Nav locale={loc} />
      <main id="main">{children}</main>
      <Footer locale={loc} />
    </>
  );
}
