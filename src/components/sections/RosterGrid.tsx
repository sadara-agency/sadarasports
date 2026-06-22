'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import { localeHref, pick } from '@/lib/i18n';
import type { Athlete } from '@/content/athletes';
import { Tag } from '@/components/ui/Tag';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

type RosterAthlete = Athlete & { photoUrl: string };

export function RosterGrid({ locale, athletes }: { locale: Locale; athletes: RosterAthlete[] }) {
  const tr = pick(locale);
  const positions = useMemo(() => {
    const set = new Map<string, string>();
    athletes.forEach((a) => set.set(tr(a.position), tr(a.position)));
    return Array.from(set.keys());
  }, [tr, athletes]);
  const [position, setPosition] = useState<string | null>(null);
  const filtered = athletes.filter((a) => !position || tr(a.position) === position);

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="wrap">
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <FilterChip active={!position} onClick={() => setPosition(null)}>
            {tr({ en: 'All', ar: 'الكل' })}
          </FilterChip>
          <span className="mx-1 h-5 w-px bg-hairline" aria-hidden="true" />
          {positions.map((p) => (
            <FilterChip key={p} active={position === p} onClick={() => setPosition(position === p ? null : p)}>{p}</FilterChip>
          ))}
        </div>
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((a) => (
              <motion.div key={a.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.4, ease: EASE }}>
                <AthleteCard locale={locale} athlete={a} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && <p className="py-16 text-center text-muted">{tr({ en: 'No results.', ar: 'لا نتائج.' })}</p>}
      </div>
    </section>
  );
}

function FilterChip({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
        active ? 'border-electric bg-electric/10 text-electric' : 'border-hairline text-muted hover:border-ink/30 hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}

function AthleteCard({ locale, athlete: a }: { locale: Locale; athlete: RosterAthlete }) {
  const tr = pick(locale);
  return (
    <Link href={localeHref(locale, `/athletes/${a.slug}`)} className="group block h-full overflow-hidden rounded-card border border-hairline bg-paper transition-colors hover:border-ink/30">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={a.photoUrl} alt={tr(a.name)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        {a.featured && (
          <div className="absolute inset-x-0 top-0 flex items-center justify-end p-3">
            <Tag tone="cyan">{tr({ en: 'Featured', ar: 'مميَّز' })}</Tag>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-h3 font-bold text-ink">{tr(a.name)}</h3>
        <p className="mt-1 text-sm text-muted">{tr(a.position)} · {tr(a.club)}</p>
      </div>
    </Link>
  );
}
