import 'server-only';
import type { Locale } from '@/lib/i18n';
import { pick, type Bi } from '@/lib/i18n';
import { FeatureGrid, SplitBand, StatBand, CTASection, Prose, type Feature, type Stat } from '@/components/sections/Blocks';
import { PageHero } from '@/components/sections/PageHero';
import { LogoGrid, type Logo } from '@/components/sections/LogoGrid';
import type { BlockData, BlockType } from './schemas';

type Props = Record<string, unknown>;
type RenderFn = (props: Props, locale: Locale) => React.ReactNode;

// ---- coercion helpers (tolerate missing/legacy keys as the schema evolves) ----
const asBi = (v: unknown): Bi =>
  v && typeof v === 'object' && 'ar' in (v as object) && 'en' in (v as object)
    ? (v as Bi)
    : { ar: '', en: '' };
const asStr = (v: unknown): string => (typeof v === 'string' ? v : '');
const asNum = (v: unknown, fallback: number): number => (typeof v === 'number' && !Number.isNaN(v) ? v : fallback);
const asArr = (v: unknown): Record<string, unknown>[] => (Array.isArray(v) ? (v as Record<string, unknown>[]) : []);
const filled = (b: Bi): boolean => Boolean(b.ar.trim() || b.en.trim());

// Each adapter maps stored bilingual JSON → the props the existing section
// component expects (resolved strings + Bi sub-fields), mirroring the inline
// mapping in DivisionOverview.tsx.
const RENDERERS: Record<BlockType, RenderFn> = {
  pageHero: (p, locale) => {
    const tr = pick(locale);
    const title = tr(asBi(p.title));
    if (!title) return null;
    const kicker = tr(asBi(p.kicker));
    const lead = tr(asBi(p.lead));
    return (
      <PageHero
        locale={locale}
        kicker={kicker || undefined}
        title={title}
        lead={lead || undefined}
        image={asStr(p.image) || undefined}
      />
    );
  },

  splitBand: (p, locale) => {
    const tr = pick(locale);
    const title = tr(asBi(p.title));
    const bullets = asArr(p.bullets).map(asBi).filter(filled);
    return (
      <SplitBand
        locale={locale}
        kicker={tr(asBi(p.kicker)) || undefined}
        title={title}
        body={tr(asBi(p.body))}
        bullets={bullets.length ? bullets : undefined}
      />
    );
  },

  featureGrid: (p, locale) => {
    const tr = pick(locale);
    const features: Feature[] = asArr(p.features)
      .map((f) => ({
        title: asBi(f.title),
        desc: asBi(f.desc),
        href: asStr(f.href) || undefined,
        cta: filled(asBi(f.cta)) ? asBi(f.cta) : undefined,
      }))
      .filter((f) => filled(f.title) || filled(f.desc));
    if (!features.length) return null;
    const columns = asNum(p.columns, 3);
    return (
      <FeatureGrid
        locale={locale}
        features={features}
        columns={columns === 2 || columns === 4 ? columns : 3}
        kicker={tr(asBi(p.kicker)) || undefined}
        title={tr(asBi(p.title)) || undefined}
        lead={tr(asBi(p.lead)) || undefined}
      />
    );
  },

  statBand: (p, locale) => {
    const tr = pick(locale);
    const stats: Stat[] = asArr(p.stats)
      .map((s) => ({
        value: asNum(s.value, 0),
        label: asBi(s.label),
        suffix: asStr(s.suffix) || undefined,
        prefix: asStr(s.prefix) || undefined,
        decimals: asNum(s.decimals, 0),
      }))
      .filter((s) => filled(s.label));
    if (!stats.length) return null;
    return (
      <StatBand
        locale={locale}
        kicker={tr(asBi(p.kicker)) || undefined}
        title={tr(asBi(p.title)) || undefined}
        stats={stats}
      />
    );
  },

  cta: (p, locale) => {
    const tr = pick(locale);
    const title = tr(asBi(p.title));
    if (!title) return null;
    const primary = (p.primary ?? {}) as Record<string, unknown>;
    const secondary = (p.secondary ?? {}) as Record<string, unknown>;
    const secHref = asStr(secondary.href);
    return (
      <CTASection
        locale={locale}
        title={title}
        lead={tr(asBi(p.lead)) || undefined}
        primary={{ label: tr(asBi(primary.label)), href: asStr(primary.href) || '/contact' }}
        secondary={secHref ? { label: tr(asBi(secondary.label)), href: secHref } : undefined}
      />
    );
  },

  logoGrid: (p, locale) => {
    const tr = pick(locale);
    // Stored as { title, image }; LogoGrid expects { title, src }.
    const logos: Logo[] = asArr(p.logos)
      .map((l) => ({ title: asBi(l.title), src: asStr(l.image) }))
      .filter((l) => Boolean(l.src));
    if (!logos.length) return null;
    return (
      <LogoGrid
        locale={locale}
        logos={logos}
        kicker={tr(asBi(p.kicker)) || undefined}
        title={tr(asBi(p.title)) || undefined}
      />
    );
  },

  prose: (p, locale) => {
    const tr = pick(locale);
    const body = tr(asBi(p.body));
    if (!body.trim()) return null;
    const paras = body.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
    return (
      <Prose>
        {paras.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </Prose>
    );
  },
};

/** Render one stored block, or null for unknown/empty blocks. */
export function renderBlock(block: BlockData, locale: Locale): React.ReactNode {
  const fn = RENDERERS[block.type];
  if (!fn) return null;
  return fn(block.props ?? {}, locale);
}
