import type { Locale } from '@/lib/i18n';
import { pick, type Bi } from '@/lib/i18n';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';

/* Legal credentials band — navy, hairline-divided cards. Labels are bilingual;
   registration numbers are forced LTR so Arabic never reorders the digits. */
export function CredentialsStrip({
  locale,
  credentials,
}: {
  locale: Locale;
  credentials: { label: Bi; value: string }[];
}) {
  const tr = pick(locale);
  return (
    <section className="bg-navy-deep py-20 text-white md:py-24">
      <div className="wrap">
        <span className="section-label mb-12 border-white/15 text-white/55">
          {locale === 'ar' ? 'بيانات قانونية' : 'Legal credentials'}
        </span>
        <RevealGroup className="grid gap-px overflow-hidden border-y border-white/12 bg-white/12 sm:grid-cols-2">
          {credentials.map((c, i) => (
            <RevealItem key={i}>
              <div className="flex h-full flex-col gap-3 bg-navy-deep p-8 text-start">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                  {tr(c.label)}
                </span>
                <span
                  dir="ltr"
                  className="font-mono text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold tracking-tight text-electric-hi text-start"
                >
                  {c.value}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
