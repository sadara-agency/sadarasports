'use client';

import { useState } from 'react';
import { savePage, deletePage, reorderPages, type PageRow } from '@/app/admin/(dashboard)/pages/actions';
import { PageBuilder } from './PageBuilder';
import { errText, SAVED_MSG } from '@/lib/admin/validate';

const BLANK: PageRow = {
  slug: '', title_ar: '', title_en: '', desc_ar: '', desc_en: '',
  blocks: [], published: false, sort: 0, og_image_url: null, canonical_url: null,
};

export function PagesManager({ initial }: { initial: PageRow[] }) {
  const [rows, setRows] = useState<PageRow[]>(initial);
  const [editing, setEditing] = useState<PageRow | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSave(row: PageRow) {
    const res = await savePage(row);
    if (!res.ok) { setMsg(`Error: ${errText(res.error)}`); return; }
    setEditing(null);
    // Optimistic local update.
    setRows((rs) => {
      const exists = row.id && rs.some((r) => r.id === row.id);
      return exists ? rs.map((r) => (r.id === row.id ? row : r)) : [...rs, row];
    });
    setMsg(SAVED_MSG);
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this page? It will be hidden from the site but can be restored.\nحذف هذه الصفحة؟ ستُخفى من الموقع ويمكن استرجاعها.')) return;
    const res = await deletePage(id);
    if (!res.ok) { setMsg(`Error: ${errText(res.error)}`); return; }
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  async function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    setRows(next);
    await reorderPages(next.map((r) => r.id!).filter(Boolean));
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Pages</h1>
          <p className="mt-0.5 text-xs" style={{ color: 'var(--adm-text-sm)' }}>
            {msg ?? 'Build custom pages from blocks. Published pages live at /en/<slug> and /ar/<slug>.'}
          </p>
        </div>
        <button
          onClick={() => setEditing({ ...BLANK, sort: rows.length })}
          className="rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: 'var(--adm-accent)', color: 'var(--adm-text)' }}
        >
          + New page
        </button>
      </div>

      <div className="overflow-hidden rounded-xl" style={{ border: '1px solid var(--adm-border)' }}>
        <table className="w-full text-sm">
          <thead className="text-left" style={{ background: 'var(--adm-input-bg)', color: 'var(--adm-text-sm)' }}>
            <tr>
              <th className="px-4 py-2 font-medium">Order</th>
              <th className="px-4 py-2 font-medium">Title</th>
              <th className="px-4 py-2 font-medium">Slug</th>
              <th className="px-4 py-2 font-medium">Blocks</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id ?? r.slug} className="border-t" style={{ borderColor: 'var(--adm-border)' }}>
                <td className="px-4 py-2">
                  <div className="flex gap-1">
                    <button onClick={() => move(i, -1)} disabled={i === 0} className="px-1 disabled:opacity-30">↑</button>
                    <button onClick={() => move(i, 1)} disabled={i === rows.length - 1} className="px-1 disabled:opacity-30">↓</button>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="font-medium">{r.title_en || '(untitled)'}</div>
                  <div dir="rtl" className="text-xs" style={{ color: 'var(--adm-text-xs)' }}>{r.title_ar}</div>
                </td>
                <td className="px-4 py-2 font-mono text-xs" style={{ color: 'var(--adm-text-sm)' }}>/{r.slug}</td>
                <td className="px-4 py-2" style={{ color: 'var(--adm-text-sm)' }}>{r.blocks?.length ?? 0}</td>
                <td className="px-4 py-2">
                  <span className={r.published ? 'text-[#34C759]' : undefined} style={!r.published ? { color: 'var(--adm-text-xs)' } : undefined}>
                    {r.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  <button onClick={() => setEditing(r)} className="text-[#3C3CFA]">Edit</button>
                  {r.id && (
                    <button onClick={() => onDelete(r.id!)} className="ms-3 text-[#FF453A]">Delete</button>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center" style={{ color: 'var(--adm-text-xs)' }}>No pages yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <PageBuilder row={editing} onCancel={() => setEditing(null)} onSave={onSave} />
      )}
    </div>
  );
}
