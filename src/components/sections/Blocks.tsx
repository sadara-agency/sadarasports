import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localeHref, pick, type Bi } from '@/lib/i18n';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { CountUp } from '@/components/motion/CountUp';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/* FROZEN interface — copied content files conform to this. */
export type Feature = {
  no?: string;
  title: Bi;
  desc: Bi;
  href?: string;
  cta?: Bi;
};

export function FeatureGrid({
  locale,
  features,
  columns = 3,
  kicker,
  title,
  lead,
  skipAnimation = false,
}: {
  locale: Locale;
  features: Feature[];
  columns?: 2 | 3 | 4;
  kicker?: string;
  title?: string;
  lead?: string;
  skipAnimation?: boolean;
}) {
  const tr = pick(locale);
  const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }[columns];

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="wrap">
        {(title || kicker) && (
          <div className="mb-14 max-w-3xl">
            {kicker && <span className="section-label mb-10">{kicker}</span>}
            {title && <h2 className="text-h2 font-extrabold text-ink">{title}</h2>}
            {lead && <p className="mt-5 text-lead text-muted">{lead}</p>}
          </div>
        )}
        <RevealGroup className={cn('grid gap-px overflow-hidden border-y border-hairline bg-hairline', cols)} skipAnimation={skipAnimation}>
          {features.map((f, i) => {
            const inner = (
              <div className="group relative flex h-full flex-col bg-paper p-7 transition-colors duration-300 hover:bg-canvas">
                <span className="font-mono text-sm text-faint">{f.no ?? String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-h3 font-bold text-ink transition-colors group-hover:text-electric">{tr(f.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{tr(f.desc)}</p>
                {f.href && (
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-electric">
                    {f.cta ? tr(f.cta) : tr({ en: 'Learn more', ar: 'اعرف المزيد' })}
                    <span className="inline-block transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">→</span>
                  </span>
                )}
              </div>
            );
            return (
              <RevealItem key={i}>
                {f.href ? (
                  <Link href={localeHref(locale, f.href)} className="block h-full">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/* CAA "Be legendary." pattern — light band, mono section-label + hairline rule,
   a big accent display headline on the start side, body copy on the end side. */
export function SplitBand({
  locale,
  kicker,
  title,
  body,
  bullets,
  reverse = false,
  tone = 'dark',
  cta,
  skipAnimation = false,
}: {
  locale: Locale;
  kicker?: string;
  title: string;
  body: string | string[];
  bullets?: Bi[];
  reverse?: boolean;
  tone?: 'dark' | 'electric';
  cta?: { label: string; href: string };
  skipAnimation?: boolean;
}) {
  const tr = pick(locale);
  const paras = Array.isArray(body) ? body : [body];

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="wrap">
        {kicker && <span className="section-label mb-16">{kicker}</span>}
        <div className={cn('grid gap-x-16 gap-y-8 lg:grid-cols-2', reverse && 'lg:[&>*:first-child]:order-2')}>
          <Reveal direction={reverse ? 'end' : 'start'} skipAnimation={skipAnimation}>
            <h2 className="text-display font-extrabold text-electric">{title}</h2>
          </Reveal>
          <Reveal direction={reverse ? 'start' : 'end'} delay={0.08} skipAnimation={skipAnimation}>
            <div>
              {paras.map((p, i) => (
                <p key={i} className={cn('text-lead text-ink/80', i > 0 && 'mt-6')}>
                  {p}
                </p>
              ))}
              {bullets && (
                <ul className="mt-7 space-y-3">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] text-ink/85">
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                      {tr(b)}
                    </li>
                  ))}
                </ul>
              )}
              {cta && (
                <div className="mt-9">
                  <Button href={localeHref(locale, cta.href)}>{cta.label}</Button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* CAA "107 / First-round draft picks since 2011" — navy band, one giant electric
   number on the start side, hairline-divided supporting stat rows on the end. */
export type Stat = {
  value: number;
  label: Bi;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  grouping?: boolean;
};

export function StatBand({
  locale,
  kicker,
  title,
  stats,
  skipAnimation = false,
}: {
  locale: Locale;
  kicker?: string;
  title?: string;
  stats: Stat[];
  skipAnimation?: boolean;
}) {
  const tr = pick(locale);
  const [lead, ...rest] = stats;
  const rows = rest.length > 0 ? rest : stats;

  return (
    <section className="bg-navy py-24 text-white md:py-32">
      <div className="wrap">
        {(kicker || title) && (
          <div className="mb-14 max-w-3xl">
            {kicker && <span className="section-label mb-10 border-white/15 text-white/55">{kicker}</span>}
            {title && <h2 className="text-h2 font-extrabold text-white">{title}</h2>}
          </div>
        )}
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal skipAnimation={skipAnimation}>
            <div>
              <div className="text-[clamp(5rem,11vw,9.5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-electric-hi">
                <CountUp
                  value={lead.value}
                  prefix={lead.prefix}
                  suffix={lead.suffix}
                  decimals={lead.decimals ?? 0}
                  grouping={lead.grouping ?? true}
                  skipAnimation={skipAnimation}
                />
              </div>
              <p className="mt-6 max-w-xs text-lead text-white/70">{tr(lead.label)}</p>
            </div>
          </Reveal>
          <RevealGroup className="flex flex-col" skipAnimation={skipAnimation}>
            {rows.map((s, i) => (
              <RevealItem key={i}>
                <div className="flex items-baseline gap-6 border-t border-white/12 py-6">
                  <span className="min-w-[120px] text-h2 font-extrabold tracking-tight text-electric-hi">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} grouping={s.grouping ?? true} skipAnimation={skipAnimation} />
                  </span>
                  <span className="text-lead font-medium text-white">{tr(s.label)}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* CAA "Building your brand." CTA — navy band, big headline, accent buttons. */
export function CTASection({
  locale,
  title,
  lead,
  primary,
  secondary,
  skipAnimation = false,
}: {
  locale: Locale;
  title: string;
  lead?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  skipAnimation?: boolean;
}) {
  return (
    <section className="bg-navy py-24 text-paper md:py-32">
      <div className="wrap text-center">
        <Reveal skipAnimation={skipAnimation}>
          <h2 className="mx-auto max-w-3xl text-balance text-display font-extrabold text-white">{title}</h2>
        </Reveal>
        {lead && (
          <Reveal delay={0.08} skipAnimation={skipAnimation}>
            <p className="mx-auto mt-6 max-w-2xl text-lead text-white/70">{lead}</p>
          </Reveal>
        )}
        <Reveal delay={0.16} skipAnimation={skipAnimation}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={localeHref(locale, primary.href)} size="lg">
              {primary.label}
            </Button>
            {secondary && (
              <Button href={localeHref(locale, secondary.href)} variant="secondary" size="lg" className="border-white/30 bg-transparent text-white hover:border-white">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Prose({ children, className, skipAnimation = false }: { children: React.ReactNode; className?: string; skipAnimation?: boolean }) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="wrap">
        <Reveal className={cn('max-w-prose space-y-6 text-[15px] leading-relaxed text-muted', className)} skipAnimation={skipAnimation}>{children}</Reveal>
      </div>
    </section>
  );
}
