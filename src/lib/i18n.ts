// Lightweight, dependency-free i18n for the English marketing site.

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dir(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'ar' ? 'en' : 'ar';
}

/** A bilingual string. */
export type Bi = { ar: string; en: string };

/** Resolve a bilingual value (or plain string) for the active locale. */
export function t(value: Bi | string, locale: Locale): string {
  if (typeof value === 'string') return value;
  return value[locale];
}

/** Curried picker: const tr = pick(locale); tr(someBi). */
export function pick(locale: Locale) {
  return (value: Bi | string) => t(value, locale);
}

/** Build a localized href, e.g. localeHref('en', '/talent') -> '/en/talent'. */
export function localeHref(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean === '/' ? '' : clean}`;
}

/** Strip the leading /ar or /en from a pathname (for the language toggle). */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/(ar|en)(\/.*)?$/);
  return m ? m[2] || '/' : pathname;
}
