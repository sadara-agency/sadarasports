// Page-builder block catalogue — client-safe metadata (no component imports).
// A block's `defaultProps` is a plain bilingual JSON template that drives BOTH
// the admin editor (rendered by AutoField) and the "Add block" seed. The render
// adapters that map these props onto the real section components live in
// ./registry.tsx (server-only, imports the section components).
import type { Bi } from '@/lib/i18n';

export type BlockType =
  | 'pageHero'
  | 'splitBand'
  | 'featureGrid'
  | 'statBand'
  | 'cta'
  | 'logoGrid'
  | 'prose';

export type BlockData = { type: BlockType; props: Record<string, unknown> };

const bi = (): Bi => ({ ar: '', en: '' });

// Ordered list for the "Add block" menu.
export const BLOCK_TYPES: BlockType[] = [
  'pageHero',
  'splitBand',
  'featureGrid',
  'statBand',
  'cta',
  'logoGrid',
  'prose',
];

export const BLOCK_LABELS: Record<BlockType, string> = {
  pageHero: 'Page hero',
  splitBand: 'Split band (headline + body)',
  featureGrid: 'Feature grid',
  statBand: 'Stat band',
  cta: 'Call to action',
  logoGrid: 'Logo grid',
  prose: 'Prose (rich text)',
};

// Plain JSON templates. Arrays are seeded with one sample element so AutoField's
// makeBlank() clones the correct shape for "+ Add item".
export const BLOCK_DEFAULTS: Record<BlockType, Record<string, unknown>> = {
  pageHero: {
    kicker: bi(),
    title: bi(),
    lead: bi(),
    image: '',
  },
  splitBand: {
    kicker: bi(),
    title: bi(),
    body: bi(),
    bullets: [bi()],
  },
  featureGrid: {
    kicker: bi(),
    title: bi(),
    lead: bi(),
    columns: 3,
    features: [{ title: bi(), desc: bi(), href: '', cta: bi() }],
  },
  statBand: {
    kicker: bi(),
    title: bi(),
    stats: [{ value: 0, suffix: '', decimals: 0, label: bi() }],
  },
  cta: {
    title: bi(),
    lead: bi(),
    primary: { label: bi(), href: '/contact' },
    secondary: { label: bi(), href: '' },
  },
  logoGrid: {
    kicker: bi(),
    title: bi(),
    logos: [{ title: bi(), image: '' }],
  },
  prose: {
    body: bi(),
  },
};
