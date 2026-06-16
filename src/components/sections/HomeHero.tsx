import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { homeThesis } from '@/content/home';
import { HeroNeonFrame } from '@/components/sections/HeroNeonFrame';
import { HeroBackdrop_v2 } from '@/components/sections/HeroBackdrop_v2';
import { MagneticPillars_v2 } from '@/components/sections/MagneticPillars_v2';

/* The homepage IS the navigation — CAA's exact model.
   Single full-viewport dark screen, no header chrome, pillars centered left. */
export function HomeHero({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black text-white">
      {/* Visually hidden H1 — content present for crawlers and screen readers */}
      <h1 className="sr-only">{tr(homeThesis)}</h1>

      {/* V2 "Magnetic" — cursor-tracking spotlight backdrop */}
      <HeroBackdrop_v2 />

      {/* Neon light frame — flowing electric-blue along the right + bottom edges */}
      <HeroNeonFrame />

      {/* CAA layout: pillar block starts at ~32% from top, 24% from the start edge (RTL-safe) */}
      <div
        className="relative z-10 flex w-full flex-1 flex-col"
        style={{ paddingTop: '32vh', paddingInlineStart: '24vw', paddingBottom: '8vh' }}
      >
        <MagneticPillars_v2 locale={locale} />
      </div>
    </section>
  );
}
