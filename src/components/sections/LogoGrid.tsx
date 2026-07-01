import type { Locale } from '@/lib/i18n';
import { pick, type Bi } from '@/lib/i18n';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';

export type Logo = {
  title: Bi;
  src: string;
};

export function LogoGrid({
  locale,
  logos,
  kicker,
  title,
  skipAnimation = false,
}: {
  locale: Locale;
  logos: Logo[];
  kicker?: string;
  title?: string;
  skipAnimation?: boolean;
}) {
  const tr = pick(locale);
  const cols = logos.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="wrap">
        {(kicker || title) && (
          <div className="mb-14 max-w-3xl">
            {kicker && <span className="section-label mb-10">{kicker}</span>}
            {title && <h2 className="text-h2 font-extrabold text-ink">{title}</h2>}
          </div>
        )}
        <RevealGroup className={`grid gap-8 ${cols}`} skipAnimation={skipAnimation}>
          {logos.map((logo, i) => (
            <RevealItem key={i}>
              <div className="flex flex-col items-center justify-center gap-6 rounded-card border border-hairline bg-canvas p-8 transition-all duration-300 hover:border-electric/50 hover:shadow-md">
                <div className="flex h-32 items-center justify-center">
                  <img src={logo.src} alt={tr(logo.title)} className="max-h-full max-w-full object-contain" />
                </div>
                <h3 className="text-center text-h4 font-bold text-ink">{tr(logo.title)}</h3>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
