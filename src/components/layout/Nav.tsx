'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { localeHref, pick, stripLocale } from '@/lib/i18n';
import { cta } from '@/content/nav';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { LanguageToggle } from './LanguageToggle';
import { MegaNav } from './MegaNav';
import { cn } from '@/lib/cn';

export function Nav({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  const pathname = usePathname() || `/${locale}`;
  const path = stripLocale(pathname);
  const isHome = path === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the overlay on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // The homepage IS the pillar nav (navy, full screen) — keep the header
  // transparent there and skip the menu trigger. Interior pages: transparent
  // over the dark photo hero, solid paper once scrolled.
  const solid = scrolled;
  const onDark = isHome || !solid;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          solid && !isHome ? 'border-b border-hairline bg-paper/95 backdrop-blur' : 'bg-transparent',
        )}
      >
        <div className="wrap flex h-[var(--header-h)] items-center gap-6">
          <Link href={localeHref(locale, '/')} aria-label="Sadara home">
            <Logo tone={onDark ? 'paper' : 'ink'} size={isHome ? 'lg' : 'sm'} />
          </Link>

          <div className="ms-auto flex items-center gap-3">
            {/* On the homepage, CAA shows only the logo — no chrome in the top bar. */}
            {!isHome && (
              <LanguageToggle locale={locale} className={onDark ? 'border-white/40 text-white' : 'border-hairline text-ink'} />
            )}
            {!isHome && (
              <Button href={localeHref(locale, '/contact')} size="sm" className="hidden sm:inline-flex">
                {tr(cta.contact)}
              </Button>
            )}
            {/* Menu trigger — CAA shows a hamburger even on desktop. Hidden on the
                homepage, which is itself the pillar nav. */}
            {!isHome && (
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={locale === 'ar' ? 'القائمة' : 'Menu'}
                aria-expanded={menuOpen}
                className={cn('flex items-center gap-2 transition-colors', onDark ? 'text-white' : 'text-ink')}
              >
                <span className="hidden text-sm font-medium md:inline">{locale === 'ar' ? 'القائمة' : 'Menu'}</span>
                <span className="flex flex-col gap-[5px]">
                  <span className={cn('block h-[2px] w-6', onDark ? 'bg-white' : 'bg-ink')} />
                  <span className={cn('block h-[2px] w-6', onDark ? 'bg-white' : 'bg-ink')} />
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      <MegaNav locale={locale} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
