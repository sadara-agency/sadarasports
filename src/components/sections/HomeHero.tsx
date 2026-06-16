import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { homeThesis } from '@/content/home';
import { PillarNav } from '@/components/layout/PillarNav';
import { HeroBackdrop_v3 } from '@/components/sections/HeroBackdrop_v3';

/* The homepage IS the navigation — CAA's exact model.
   Single full-viewport dark screen, no header chrome, pillars centered left. */
export function HomeHero({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black text-white">
      {/* Visually hidden H1 — content present for crawlers and screen readers */}
      <h1 className="sr-only">{tr(homeThesis)}</h1>

      {/* V3 "Cinematic Entrance" — mesh fade-in + one-shot light beam + igniting glow */}
      <HeroBackdrop_v3 />

      {/* CAA layout: pillar block starts at ~32% from top, 24% from the start edge (RTL-safe) */}
      <div
        className="relative z-10 flex w-full flex-1 flex-col"
        style={{ paddingTop: '32vh', paddingInlineStart: '24vw', paddingBottom: '8vh' }}
      >
        <PillarNav locale={locale} size="home" />
      </div>
    </section>
  );
}
