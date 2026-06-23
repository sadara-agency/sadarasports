import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { OrganizationJsonLd } from '@/components/layout/JsonLd';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { IntroOverlay } from '@/components/layout/IntroOverlay';
import '@/styles/globals.css';

const ibmPlexArabic = localFont({
  src: [
    { path: '../../public/fonts/IBMPlexSansArabic-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-ar',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-en',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#1629E2',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sadarasport.sa'),
  title: { default: 'Sadara Sports — صدارة الرياضية', template: '%s · Sadara Sports' },
  description:
    'An institution, not an agency. Sadara represents and develops athletes, advises clubs and federations, and connects markets — one institution, three strategic units.',
  keywords: [
    'Sadara Sports',
    'صدارة الرياضية',
    'football agency MENA',
    'sports agency Saudi Arabia',
    'athlete representation',
    'وكالة رياضية',
    'تمثيل لاعبين',
    'سعودي برو ليغ',
  ],
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/brand/logo-icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/brand/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  twitter: {
    card: 'summary_large_image',
    site: '@SadaraSports',
    creator: '@SadaraSports',
    title: 'Sadara Sports — صدارة الرياضية',
    description:
      'An institution, not an agency. Sadara represents athletes, advises clubs and federations, and connects markets across MENA.',
    images: ['/brand/og-default.jpg'],
  },
  openGraph: {
    type: 'website',
    siteName: 'Sadara Sports',
    images: [{ url: '/brand/og-default.jpg', width: 1200, height: 630, alt: 'Sadara Sports' }],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Derive locale from the request path so crawlers see correct lang/dir on first paint.
  // Next.js sets x-invoke-path internally; fall back to 'ar' (primary locale) if absent.
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') ?? headersList.get('x-pathname') ?? '/en';
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
<body className={`${ibmPlexArabic.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
        <IntroOverlay />
        <OrganizationJsonLd />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
