'use client';

import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { SplitBand } from '@/components/sections/Blocks';
import { CountUp } from '@/components/motion/CountUp';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { renderBlock } from '@/lib/blocks/registry';
import type { BlockData } from '@/lib/blocks/schemas';

const LOCALE: Locale = 'en';

type Bi = { ar: string; en: string };

type PageDraft = { title_ar: string; title_en: string; blocks: BlockData[] };
type ArticleDraft = {
  title_ar: string; title_en: string;
  category_ar: string; category_en: string;
  image_url: string | null;
  body_ar: string; body_en: string;
};
type AthleteDraft = {
  name_ar: string; name_en: string;
  position_ar: string; position_en: string;
  photo_url: string | null;
  stats: { value: number; decimals?: number; suffix?: string; label: Bi }[];
  trajectory_ar: string; trajectory_en: string;
  media_value_ar: string; media_value_en: string;
};

type Props =
  | { kind: 'page'; draft: PageDraft }
  | { kind: 'article'; draft: ArticleDraft }
  | { kind: 'athlete'; draft: AthleteDraft };

// The public site is English-only today (see lib/i18n.ts — `locales` has a
// single entry), so this pane always renders the `en` half of each field.
//
// Body HTML here is the admin's own in-progress rich-text draft (same Tiptap
// output already rendered live in the editor above) — mirrored here as-is,
// same trust boundary. It's sanitized at save time before it ever reaches
// public pages (see lib/sanitize.ts).
export function LivePreviewPane(props: Props) {
  const tr = pick(LOCALE);

  return (
    <div
      className="sticky top-0 h-[calc(100vh-4rem)] overflow-y-auto rounded-xl border"
      style={{ borderColor: 'var(--adm-border)', background: 'var(--adm-surface-2)' }}
    >
      <div
        className="sticky top-0 z-10 border-b px-4 py-2 text-xs font-medium"
        style={{ borderColor: 'var(--adm-border)', background: 'var(--adm-surface-2)', color: 'var(--adm-text-sm)' }}
      >
        Live preview
      </div>

      <div className="bg-paper text-ink">
        {props.kind === 'page' && (
          <>
            {props.draft.blocks.length === 0 && (
              <p className="p-8 text-center text-sm text-muted">No blocks yet.</p>
            )}
            {props.draft.blocks.map((block, i) => (
              <div key={i}>{renderBlock(block, LOCALE, true)}</div>
            ))}
          </>
        )}

        {props.kind === 'article' && (
          <>
            <PageHero
              locale={LOCALE}
              kicker={tr({ ar: props.draft.category_ar, en: props.draft.category_en })}
              title={tr({ ar: props.draft.title_ar, en: props.draft.title_en }) || 'Untitled'}
              image={props.draft.image_url ?? undefined}
            />
            <section className="border-t border-hairline bg-paper py-16">
              <div className="wrap max-w-3xl">
                {props.draft.body_en ? (
                  <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: props.draft.body_en }} />
                ) : (
                  <p className="text-sm text-muted">No body content yet.</p>
                )}
              </div>
            </section>
          </>
        )}

        {props.kind === 'athlete' && (
          <>
            <PageHero
              locale={LOCALE}
              kicker={tr({ ar: props.draft.position_ar, en: props.draft.position_en })}
              title={tr({ ar: props.draft.name_ar, en: props.draft.name_en }) || 'Untitled'}
              image={props.draft.photo_url ?? undefined}
            />
            {props.draft.stats.length > 0 && (
              <section className="border-t border-hairline bg-canvas py-12">
                <div className="wrap">
                  <RevealGroup className="grid grid-cols-1 gap-8 sm:grid-cols-3" skipAnimation>
                    {props.draft.stats.map((s, i) => (
                      <RevealItem key={i}>
                        <div className="text-h1 font-bold text-ink">
                          <CountUp value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ''} skipAnimation />
                        </div>
                        <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                          {tr(s.label)}
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>
              </section>
            )}
            <SplitBand
              locale={LOCALE}
              kicker={tr({ en: 'Trajectory', ar: 'المسار' })}
              title={tr({ en: 'From discovery to value.', ar: 'من الاكتشاف إلى القيمة.' })}
              body={tr({ ar: props.draft.trajectory_ar, en: props.draft.trajectory_en })}
              tone="electric"
              skipAnimation
            />
            <SplitBand
              locale={LOCALE}
              kicker={tr({ en: 'Media value', ar: 'القيمة الإعلامية' })}
              title={tr({ en: 'Market value and presence.', ar: 'القيمة السوقية والحضور.' })}
              body={tr({ ar: props.draft.media_value_ar, en: props.draft.media_value_en })}
              reverse
              skipAnimation
            />
          </>
        )}
      </div>
    </div>
  );
}
