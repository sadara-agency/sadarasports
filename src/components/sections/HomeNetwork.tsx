import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { networkStrip } from '@/content/home';
import { Marquee } from '@/components/motion/Marquee';

export function HomeNetwork({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  return (
    <section className="border-t border-hairline bg-canvas py-16">
      <div className="wrap">
        <span className="kicker">{tr(networkStrip.kicker)}</span>
        <h2 className="mt-3 max-w-2xl text-h3 font-bold text-ink">{tr(networkStrip.title)}</h2>
      </div>
      <div className="mt-10">
        <Marquee>
          {networkStrip.partners.map((p) =>
            p.logo ? (
              <img key={p.name} src={p.logo} alt={p.name} className="h-10 w-auto object-contain opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0" />
            ) : (
              <span key={p.name} className="whitespace-nowrap text-lg font-bold text-faint">{p.name}</span>
            )
          )}
        </Marquee>
      </div>
    </section>
  );
}
