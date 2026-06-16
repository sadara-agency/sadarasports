import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localeHref, pick } from '@/lib/i18n';
import { footer } from '@/content/nav';
import { credentials } from '@/content/institution';
import { LogoLockup } from '@/components/ui/Logo';

export function Footer({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  return (
    <footer className="border-t border-white/10 bg-navy-deep py-16 text-white/80">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <LogoLockup variant="reverse" className="h-10" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">{tr(footer.tagline)}</p>
          </div>
          {footer.columns.map((col, i) => (
            <div key={i}>
              <h5 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{tr(col.title)}</h5>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l, j) => (
                  <li key={j}>
                    <Link href={localeHref(locale, l.href)} className="text-sm text-white/75 transition-colors hover:text-white">
                      {tr(l.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-white/45">
          {footer.legal.map((l, i) => (
            <Link key={i} href={localeHref(locale, l.href)} className="transition-colors hover:text-white/80">
              {tr(l.label)}
            </Link>
          ))}
          {credentials.map((c, i) => (
            <span key={`cred-${i}`} className="text-white/40">
              {tr(c.label)}: <span dir="ltr" className="font-mono text-white/55">{c.value}</span>
            </span>
          ))}
          <span className="font-ar ms-auto">صدارة الرياضية · Riyadh</span>
        </div>
      </div>
    </footer>
  );
}
