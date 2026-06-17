'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localeHref, pick } from '@/lib/i18n';
import { useNavData } from './NavDataContext';
import { Logo } from '@/components/ui/Logo';
import { LanguageToggle } from './LanguageToggle';
import { PillarNav } from './PillarNav';

/* Full-screen navy nav overlay — CAA's interior menu. Opened by the header
   trigger; the homepage renders PillarNav directly instead of this. */
export function MegaNav({ locale, open, onClose }: { locale: Locale; open: boolean; onClose: () => void }) {
  const tr = pick(locale);
  const { cta } = useNavData();
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc to close + body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Move focus into the panel.
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={tr({ en: 'Menu', ar: 'القائمة' })}
      tabIndex={-1}
      className="fixed inset-0 z-[60] flex flex-col overflow-x-hidden overflow-y-auto bg-navy text-white outline-none animate-fade-up"
    >
      {/* Atmospheric electric glow (the only flourish). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 75% 20%, rgba(22,41,226,0.28), transparent 100%)' }}
      />

      {/* Overlay header — mirrors the page header, with a close button. */}
      <div className="relative z-10 flex h-[var(--header-h)] shrink-0 items-center gap-6 px-6 md:px-10">
        <Link href={localeHref(locale, '/')} onClick={onClose} aria-label="Sadara home">
          <Logo tone="paper" />
        </Link>
        <div className="ms-auto flex items-center gap-3">
          <LanguageToggle locale={locale} className="border-white/40 text-white" />
          <button
            type="button"
            onClick={onClose}
            aria-label={tr({ en: 'Close', ar: 'إغلاق' })}
            className="text-3xl leading-none text-white/80 transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Pillar navigation */}
      <div className="relative z-10 mx-auto flex w-full max-w-wrap flex-1 flex-col justify-center px-6 py-14 md:px-10">
        <PillarNav locale={locale} onNavigate={onClose} size="overlay" />
      </div>

      {/* Utility row */}
      <div className="relative z-10 mx-auto flex w-full max-w-wrap shrink-0 flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 px-6 py-6 text-sm text-white/55 md:px-10">
        <Link href={localeHref(locale, '/institution/about')} onClick={onClose} className="transition-colors hover:text-white">
          {tr({ en: 'About', ar: 'من نحن' })}
        </Link>
        <Link href={localeHref(locale, '/careers')} onClick={onClose} className="transition-colors hover:text-white">
          {tr({ en: 'Careers', ar: 'الوظائف' })}
        </Link>
        <Link href={localeHref(locale, '/contact')} onClick={onClose} className="transition-colors hover:text-white">
          {tr(cta.contact)}
        </Link>
      </div>
    </div>
  );
}
