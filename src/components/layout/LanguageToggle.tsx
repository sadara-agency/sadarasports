'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { otherLocale, localeHref, stripLocale, type Locale } from '@/lib/i18n';

export function LanguageToggle({ locale, className }: { locale: Locale; className?: string }) {
  const pathname = usePathname();
  const next = otherLocale(locale);
  const href = localeHref(next, stripLocale(pathname));

  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors hover:opacity-80 ${className ?? ''}`}
    >
      {next}
    </Link>
  );
}
