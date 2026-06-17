'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import { localeHref, pick } from '@/lib/i18n';
import { useNavData } from './NavDataContext';
import { cn } from '@/lib/cn';

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/* CAA homepage-as-nav pattern.
   Both home and overlay show the children column on hover.
   home size: larger pillar font; overlay size: compact font inside MegaNav. */

const secondaryHrefs = ['/institution', '/athletes', '/insights', '/network', '/careers'];

export function PillarNav({
  locale,
  onNavigate,
  size = 'home',
}: {
  locale: Locale;
  onNavigate?: () => void;
  size?: 'home' | 'overlay';
}) {
  const tr = pick(locale);
  const { homePillars, navItems } = useNavData();
  const [active, setActive] = useState<string | null>(null);
  const current = active ? (homePillars.find((p) => p.key === active) ?? null) : null;
  const reduce = useReducedMotion();

  const secondary = secondaryHrefs
    .map((href) => navItems.find((n) => n.href === href))
    .filter((n): n is NonNullable<typeof n> => Boolean(n));

  const pillarFontSize = size === 'home' ? 'clamp(28px,6vw,50px)' : 'clamp(22px,5vw,38px)';

  // Animate only on the home size; overlay is triggered mid-session (no entrance needed)
  const animate = size === 'home' && !reduce;

  return (
    <div
      className="flex w-full flex-wrap items-start gap-10 md:flex-nowrap md:gap-20"
      onMouseLeave={() => setActive(null)}
    >
      {/* Pillars + secondary links */}
      <div className="flex-none">
        <ul className="flex flex-col" style={{ gap: '2px' }}>
          {homePillars.map((p, i) => (
            <motion.li
              key={p.key}
              initial={animate ? { opacity: 0, y: 18 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={animate ? { delay: i * 0.13, duration: 0.55, ease: EASE_OUT_EXPO } : undefined}
            >
              <Link
                href={localeHref(locale, p.href)}
                onMouseEnter={() => setActive(p.key)}
                onFocus={() => setActive(p.key)}
                onClick={onNavigate}
                aria-current={active === p.key ? 'true' : undefined}
                className={cn(
                  'block font-semibold transition-colors duration-150',
                  active === null
                    ? 'text-white/90'
                    : active === p.key
                    ? 'text-white'
                    : 'text-white/[0.32]',
                )}
                style={{ fontSize: pillarFontSize, lineHeight: '1.2', letterSpacing: '-0.01em' }}
              >
                {tr(p.label)}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Secondary destinations */}
        <ul className="mt-10 flex flex-col" style={{ gap: '7px' }}>
          {secondary.map((n, i) => (
            <motion.li
              key={n.href}
              initial={animate ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={
                animate
                  ? { delay: homePillars.length * 0.13 + 0.15 + i * 0.08, duration: 0.45, ease: EASE_OUT_EXPO }
                  : undefined
              }
            >
              <Link
                href={localeHref(locale, n.href)}
                onClick={onNavigate}
                onMouseEnter={() => setActive(null)}
                className="font-medium text-white/45 transition-colors hover:text-white/80"
                style={{ fontSize: 'clamp(14px,2vw,18px)' }}
              >
                {tr(n.label)}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Children column — visible on hover for both home and overlay */}
      <div
        className={cn(
          'flex-none pt-1 transition-opacity duration-200',
          current ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        style={{ minWidth: 'min(220px, 100%)' }}
        aria-hidden={!current}
      >
        {/* Render all pillars' children stacked; only the active one is shown via opacity above */}
        {homePillars.map((p) => {
          const isActive = active === p.key;
          return (
            <div key={p.key} className={cn('absolute', isActive ? 'relative' : 'hidden')}>
              <span className="mb-5 block font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                {tr(p.label)}
              </span>
              <ul className="flex flex-col gap-3">
                {p.children.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={localeHref(locale, c.href)}
                      onClick={onNavigate}
                      className="group inline-flex items-center gap-2 text-[1.15rem] font-semibold text-white/70 transition-colors hover:text-white"
                    >
                      {tr(c.label)}
                      <span className="inline-block opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
