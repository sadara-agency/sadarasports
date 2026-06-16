import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import type { Person } from '@/content/institution';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { LogoIcon } from '@/components/ui/Logo';

/** Bio-card grid for Leadership / Experts. Emblem placeholder avatar until real
 *  headshots are supplied. */
export function PeopleGrid({ locale, people }: { locale: Locale; people: Person[] }) {
  const tr = pick(locale);
  const cols = people.length <= 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3';
  return (
    <section className="border-t border-hairline bg-paper py-20 md:py-28">
      <div className="wrap">
        <RevealGroup className={`grid gap-6 ${cols}`}>
          {people.map((p, i) => (
            <RevealItem key={i}>
              <div className="group h-full overflow-hidden rounded-card border border-hairline bg-paper transition-colors hover:border-ink/30">
                <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-canvas">
                  {p.photo ? (
                    <img src={p.photo} alt={tr(p.name)} className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <LogoIcon className="h-16 w-16 text-electric/25 transition-transform duration-700 group-hover:scale-110" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-h3 font-bold text-ink">{tr(p.name)}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-electric">{tr(p.role)}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{tr(p.bio)}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
