import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, isLocale, type Locale } from '@/lib/i18n';
import { HtmlLangSync } from '@/components/layout/HtmlLangSync';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { NavDataProvider } from '@/components/layout/NavDataContext';
import { getDoc } from '@/lib/content';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ISR: pages are statically rendered and re-validated. Admin saves also trigger
// an on-demand revalidate via /api/revalidate for near-instant updates.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    openGraph: {
      type: 'website',
      siteName: 'Sadara Sports',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      title: 'Sadara Sports',
      description: 'An institution, not an agency. We represent talent, advise clubs and federations, and connect markets.',
      images: [{ url: '/brand/og-default.jpg', width: 1200, height: 630, alt: 'Sadara Sports' }],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'x-default': '/en',
        en: '/en',
        ar: '/ar',
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

  // Content sourced from Supabase (with in-repo fallback) and shared with the
  // client nav components via context — no prop-drilling.
  const [nav, home, institution] = await Promise.all([
    getDoc('nav'),
    getDoc('home'),
    getDoc('institution'),
  ]);

  return (
    <NavDataProvider value={{ navItems: nav.navItems, cta: nav.cta, homePillars: home.homePillars }}>
      {/* HtmlLangSync syncs lang/dir on client-side navigations between locales */}
      <HtmlLangSync locale={loc} />
      <PageTransition />
      <Nav locale={loc} />
      <main id="main">{children}</main>
      <Footer locale={loc} footer={nav.footer} credentials={institution.credentials} />
    </NavDataProvider>
  );
}
