'use client';

import { useState } from 'react';
import type { PageRow } from '@/app/admin/(dashboard)/pages/actions';
import { AutoField } from './AutoField';
import { setAt, type Path } from '@/lib/admin/jsonPath';
import { BLOCK_TYPES, BLOCK_LABELS, BLOCK_DEFAULTS, type BlockData, type BlockType } from '@/lib/blocks/schemas';
import { SaveBar } from './SaveBar';

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v)) as T;

export function PageBuilder({
  row, onCancel, onSave,
}: { row: PageRow; onCancel: () => void; onSave: (r: PageRow) => void }) {
  const [draft, setDraft] = useState<PageRow>(row);
  const [addOpen, setAddOpen] = useState(false);
  const set = (patch: Partial<PageRow>) => setDraft((d) => ({ ...d, ...patch }));

  const setBlocks = (blocks: BlockData[]) => set({ blocks });

  const addBlock = (type: BlockType) => {
    setBlocks([...draft.blocks, { type, props: clone(BLOCK_DEFAULTS[type]) }]);
    setAddOpen(false);
  };

  const removeBlock = (i: number) => setBlocks(draft.blocks.filter((_, j) => j !== i));

  const moveBlock = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= draft.blocks.length) return;
    const next = [...draft.blocks];
    [next[i], next[j]] = [next[j], next[i]];
    setBlocks(next);
  };

  // AutoField edits one block's props; setAt keeps updates immutable.
  const onPropsChange = (i: number) => (path: Path, value: unknown) => {
    setDraft((d) => {
      const next = [...d.blocks];
      const wrapped = setAt({ props: next[i].props }, path, value) as { props: Record<string, unknown> };
      next[i] = { ...next[i], props: wrapped.props };
      return { ...d, blocks: next };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={onCancel}>
      <div
        className="h-full w-full max-w-3xl overflow-y-auto p-8"
        style={{ background: 'var(--adm-surface)', color: 'var(--adm-text)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{row.id ? 'Edit page' : 'New page'}</h2>
          <button onClick={onCancel} className="text-2xl" style={{ color: 'var(--adm-text-sm)' }}>✕</button>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>Slug (URL, lowercase-dashes)</div>
            <input
              value={draft.slug}
              onChange={(e) => set({ slug: e.target.value })}
              placeholder="about-us"
              className="h-10 w-full rounded-lg px-3 text-sm"
              style={{ border: '1px solid var(--adm-border-md)', background: 'var(--adm-input-bg)' }}
            />
            <p className="text-xs" style={{ color: 'var(--adm-text-xs)' }}>Lives at /en/{draft.slug || 'slug'} and /ar/{draft.slug || 'slug'}. Preview opens the last saved version — save a draft first to preview new changes.</p>
          </div>

          <Pair label="Title" ar={draft.title_ar} en={draft.title_en}
            onAr={(v) => set({ title_ar: v })} onEn={(v) => set({ title_en: v })} />
          <Pair label="Meta description" ar={draft.desc_ar} en={draft.desc_en} long
            onAr={(v) => set({ desc_ar: v })} onEn={(v) => set({ desc_en: v })} />
        </div>

        {/* Blocks */}
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold">Blocks</h3>
            <div className="relative">
              <button
                onClick={() => setAddOpen((o) => !o)}
                className="rounded-lg border border-dashed px-3 py-1.5 text-sm"
                style={{ borderColor: 'var(--adm-border-md)', color: 'var(--adm-text-sm)' }}
              >
                + Add block
              </button>
              {addOpen && (
                <div
                  className="absolute end-0 z-10 mt-1 w-64 overflow-hidden rounded-lg shadow-lg"
                  style={{ border: '1px solid var(--adm-border-md)', background: 'var(--adm-surface-2)' }}
                >
                  {BLOCK_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => addBlock(t)}
                      className="block w-full px-3 py-2 text-start text-sm"
                      style={{ color: 'var(--adm-text-md)' }}
                    >
                      {BLOCK_LABELS[t]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {draft.blocks.length === 0 && (
            <p
              className="rounded-lg border border-dashed px-4 py-8 text-center text-sm"
              style={{ borderColor: 'var(--adm-border)', color: 'var(--adm-text-xs)' }}
            >
              No blocks yet. Use &quot;+ Add block&quot; to start building.
            </p>
          )}

          <div className="space-y-4">
            {draft.blocks.map((block, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{ border: '1px solid var(--adm-border)', background: 'var(--adm-input-bg)' }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: 'var(--adm-text-md)' }}>
                    <span className="font-mono text-[11px]" style={{ color: 'var(--adm-text-xs)' }}>#{i + 1}</span>{' '}
                    {BLOCK_LABELS[block.type]}
                  </span>
                  <div className="flex gap-1.5 text-xs">
                    <RowBtn onClick={() => moveBlock(i, -1)} disabled={i === 0}>↑</RowBtn>
                    <RowBtn onClick={() => moveBlock(i, 1)} disabled={i === draft.blocks.length - 1}>↓</RowBtn>
                    <RowBtn onClick={() => removeBlock(i)} className="text-[#FF453A]">Remove</RowBtn>
                  </div>
                </div>
                <AutoField value={block.props} path={['props']} onChange={onPropsChange(i)} />
              </div>
            ))}
          </div>
        </div>

        <SaveBar
          published={draft.published}
          onCancel={onCancel}
          onSave={(pub) => onSave({ ...draft, published: pub })}
          onPreview={
            draft.slug
              ? () => window.open(`/en/${draft.slug}?preview=1`, '_blank', 'noopener')
              : undefined
          }
        />
      </div>
    </div>
  );
}

function Pair({
  label, ar, en, onAr, onEn, long,
}: {
  label: string; ar: string; en: string; onAr: (v: string) => void; onEn: (v: string) => void; long?: boolean;
}) {
  const inputStyle: React.CSSProperties = { border: '1px solid var(--adm-border-md)', background: 'var(--adm-input-bg)' };
  const cls = 'rounded-lg px-3 py-2 text-sm';
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>{label}</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {long ? (
          <textarea dir="rtl" lang="ar" rows={2} value={ar} onChange={(e) => onAr(e.target.value)} className={cls} style={inputStyle} />
        ) : (
          <input dir="rtl" lang="ar" value={ar} onChange={(e) => onAr(e.target.value)} className={`h-10 ${cls}`} style={inputStyle} />
        )}
        {long ? (
          <textarea dir="ltr" lang="en" rows={2} value={en} onChange={(e) => onEn(e.target.value)} className={cls} style={inputStyle} />
        ) : (
          <input dir="ltr" lang="en" value={en} onChange={(e) => onEn(e.target.value)} className={`h-10 ${cls}`} style={inputStyle} />
        )}
      </div>
    </div>
  );
}

function RowBtn({
  children, onClick, disabled, className = '',
}: { children: React.ReactNode; onClick: () => void; disabled?: boolean; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-2 py-0.5 disabled:opacity-30 ${className}`}
      style={{ border: '1px solid var(--adm-border)' }}
    >
      {children}
    </button>
  );
}
