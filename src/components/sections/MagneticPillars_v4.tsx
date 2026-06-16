'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import { localeHref, pick } from '@/lib/i18n';
import { homePillars } from '@/content/home';
import { navItems } from '@/content/nav';
import { cn } from '@/lib/cn';

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
const secondaryHrefs = ['/institution', '/athletes', '/insights', '/network', '/careers'];

/**
 * Version 4 — home-only pillar variant (V2 magnetic hover + electric underline,
 * combined with V4's consistent aurora backdrop).
 *
 * Each pillar nudges toward the cursor (spring-smoothed) and shows an electric-blue
 * underline wipe on hover. Kept separate from PillarNav — MegaNav overlay untouched.
 * Reduced-motion → no nudge, underline appears instantly.
 */
export function MagneticPillars_v4({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const secondary = secondaryHrefs
    .map((href) => navItems.find((n) => n.href === href))
    .filter((n): n is NonNullable<typeof n> => Boolean(n));

  return (
    <div className="flex w-full items-start gap-20" onMouseLeave={() => setActive(null)}>
      <div className="flex-none">
        <ul className="flex flex-col" style={{ gap: '2px' }}>
          {homePillars.map((p, i) => (
            <MagneticPillar
              key={p.key}
              index={i}
              reduce={!!reduce}
              dimmed={active !== null && active !== p.key}
              activeOn={active === p.key}
              onActivate={() => setActive(p.key)}
            >
              <Link
                href={localeHref(locale, p.href)}
                aria-current={active === p.key ? 'true' : undefined}
                className="block font-semibold text-white"
                style={{ fontSize: '50px', lineHeight: '1.2', letterSpacing: '-0.01em' }}
              >
                {tr(p.label)}
              </Link>
            </MagneticPillar>
          ))}
        </ul>

        <ul className="mt-10 flex flex-col" style={{ gap: '7px' }}>
          {secondary.map((n, i) => (
            <motion.li
              key={n.href}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? undefined : { delay: homePillars.length * 0.13 + 0.15 + i * 0.08, duration: 0.45, ease: EASE_OUT_EXPO }}
            >
              <Link
                href={localeHref(locale, n.href)}
                onMouseEnter={() => setActive(null)}
                className="font-medium text-white/45 transition-colors hover:text-white/80"
                style={{ fontSize: '18px' }}
              >
                {tr(n.label)}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Children column — visible on hover. */}
      <div
        className={cn('flex-none pt-1 transition-opacity duration-200', active ? 'opacity-100' : 'pointer-events-none opacity-0')}
        style={{ minWidth: '220px' }}
        aria-hidden={!active}
      >
        {homePillars.map((p) => (
          <div key={p.key} className={cn('absolute', active === p.key ? 'relative' : 'hidden')}>
            <span className="mb-5 block font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">{tr(p.label)}</span>
            <ul className="flex flex-col gap-3">
              {p.children.map((c) => (
                <li key={c.href}>
                  <Link
                    href={localeHref(locale, c.href)}
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
        ))}
      </div>
    </div>
  );
}

function MagneticPillar({
  index,
  reduce,
  dimmed,
  activeOn,
  onActivate,
  children,
}: {
  index: number;
  reduce: boolean;
  dimmed: boolean;
  activeOn: boolean;
  onActivate: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 150, damping: 15 });
  const y = useSpring(my, { stiffness: 150, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.06);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.12);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? undefined : { delay: index * 0.13, duration: 0.55, ease: EASE_OUT_EXPO }}
      onMouseEnter={onActivate}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative w-fit"
      style={{ opacity: dimmed ? 0.32 : 1, transition: 'opacity 150ms' }}
    >
      <motion.div style={{ x, y }}>
        {children}
        {/* Electric underline — wipes from start edge on hover, direction-aware. */}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 start-0 h-[3px] transition-[width] duration-300 ease-out"
          style={{ width: activeOn ? '100%' : '0%', backgroundColor: 'var(--electric-hi)' }}
        />
      </motion.div>
    </motion.li>
  );
}
