import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { getDoc } from '@/lib/content';
import { HeroBackdrop_v4 } from '@/components/sections/HeroBackdrop_v4';
import { MagneticPillars_v4 } from '@/components/sections/MagneticPillars_v4';
import { LogoLockup } from '@/components/ui/Logo';

/* The homepage IS the navigation — CAA's exact model.
   Single full-viewport dark screen, no header chrome, pillars centered left. */
export async function HomeHero({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  const { homeThesis } = await getDoc('home');
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black text-white">
      {/* Visually hidden H1 — content present for crawlers and screen readers */}
      <h1 className="sr-only">{tr(homeThesis)}</h1>

      {/* V4 — consistent aurora blobs backdrop */}
      <HeroBackdrop_v4 />

      {/* Logo — top-left / top-right (RTL-safe) */}
      <div className="relative z-10 flex items-center p-8">
        <LogoLockup variant="reverse" className="h-9" />
      </div>

      {/* CAA layout: pillar block starts at ~32% from top, 24% from the start edge (RTL-safe) */}
      <div
        className="relative z-10 flex w-full flex-1 flex-col px-6 pt-[18vh] pb-[8vh] sm:px-10 md:pt-[22vh] md:[padding-inline-start:24vw] md:px-0"
      >
        <MagneticPillars_v4 locale={locale} />
      </div>
    </section>
  );
}
