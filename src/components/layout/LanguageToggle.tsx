'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { otherLocale, stripLocale } from '@/lib/i18n';
import { cn } from '@/lib/cn';

export function LanguageToggle({ locale, className }: { locale: Locale; className?: string }) {
  const pathname = usePathname() || `/${locale}`;
  const target = otherLocale(locale);
  const href = `/${target}${stripLocale(pathname) === '/' ? '' : stripLocale(pathname)}`;

  // Arabic mode temporarily disabled — hide toggle when only one locale is active.
  if (target === 'ar') return null;

  return (
    <Link href={href} className={cn('rounded-full border px-3 py-1.5 text-xs font-medium transition-colors', className)} aria-label="Toggle language">
      {target === 'ar' ? 'العربية' : 'EN'}
    </Link>
  );
}
