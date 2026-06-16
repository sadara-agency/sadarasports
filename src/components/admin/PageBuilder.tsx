'use client';

import { useState } from 'react';
import type { PageRow } from '@/app/admin/(dashboard)/pages/actions';
import { AutoField } from './AutoField';
import { setAt, type Path } from '@/lib/admin/jsonPath';
import { BLOCK_TYPES, BLOCK_LABELS, BLOCK_DEFAULTS, type BlockData, type BlockType } from '@/lib/blocks/schemas';

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
        className="h-full w-full max-w-3xl overflow-y-auto bg-[#11132B] p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{row.id ? 'Edit page' : 'New page'}</h2>
          <button onClick={onCancel} className="text-2xl text-white/60 hover:text-white">✕</button>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <div className="text-sm font-medium text-white/75">Slug (URL, lowercase-dashes)</div>
            <input
              value={draft.slug}
              onChange={(e) => set({ slug: e.target.value })}
              placeholder="about-us"
              className="h-10 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-sm"
            />
            <p className="text-xs text-white/40">Lives at /en/{draft.slug || 'slug'} and /ar/{draft.slug || 'slug'}.</p>
          </div>

          <Pair label="Title" ar={draft.title_ar} en={draft.title_en}
            onAr={(v) => set({ title_ar: v })} onEn={(v) => set({ title_en: v })} />
          <Pair label="Meta description" ar={draft.desc_ar} en={draft.desc_en} long
            onAr={(v) => set({ desc_ar: v })} onEn={(v) => set({ desc_en: v })} />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={draft.published} onChange={(e) => set({ published: e.target.checked })} /> Published
          </label>
        </div>

        {/* Blocks */}
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold">Blocks</h3>
            <div className="relative">
              <button
                onClick={() => setAddOpen((o) => !o)}
                className="rounded-lg border border-dashed border-white/25 px-3 py-1.5 text-sm text-white/70 hover:border-[#3C3CFA] hover:text-white"
              >
                + Add block
              </button>
              {addOpen && (
                <div className="absolute end-0 z-10 mt-1 w-64 overflow-hidden rounded-lg border border-white/15 bg-[#1a1d3a] shadow-lg">
                  {BLOCK_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => addBlock(t)}
                      className="block w-full px-3 py-2 text-start text-sm text-white/80 hover:bg-white/10"
                    >
                      {BLOCK_LABELS[t]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {draft.blocks.length === 0 && (
            <p className="rounded-lg border border-dashed border-white/15 px-4 py-8 text-center text-sm text-white/40">
              No blocks yet. Use “+ Add block” to start building.
            </p>
          )}

          <div className="space-y-4">
            {draft.blocks.map((block, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/85">
                    <span className="font-mono text-[11px] text-white/40">#{i + 1}</span>{' '}
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

        <div className="mt-8 flex gap-3">
          <button onClick={() => onSave(draft)} className="rounded-lg bg-[#3C3CFA] px-5 py-2 text-sm font-medium">Save</button>
          <button onClick={onCancel} className="rounded-lg border border-white/15 px-5 py-2 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function Pair({
  label, ar, en, onAr, onEn, long,
}: {
  label: string; ar: string; en: string; onAr: (v: string) => void; onEn: (v: string) => void; long?: boolean;
}) {
  const cls = 'rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm';
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-white/75">{label}</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {long ? (
          <textarea dir="rtl" lang="ar" rows={2} value={ar} onChange={(e) => onAr(e.target.value)} className={cls} />
        ) : (
          <input dir="rtl" lang="ar" value={ar} onChange={(e) => onAr(e.target.value)} className={`h-10 ${cls}`} />
        )}
        {long ? (
          <textarea dir="ltr" lang="en" rows={2} value={en} onChange={(e) => onEn(e.target.value)} className={cls} />
        ) : (
          <input dir="ltr" lang="en" value={en} onChange={(e) => onEn(e.target.value)} className={`h-10 ${cls}`} />
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
      className={`rounded border border-white/15 px-2 py-0.5 hover:bg-white/10 disabled:opacity-30 ${className}`}
    >
      {children}
    </button>
  );
}
