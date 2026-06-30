'use client';

import { useState } from 'react';
import {
  saveArticle, deleteArticle, reorderArticles, type ArticleRow,
} from '@/app/admin/(dashboard)/articles/actions';
import { ImageInput } from './ImageInput';
import { errText, SAVED_MSG } from '@/lib/admin/validate';
import { SaveBar } from './SaveBar';

const TYPES: ArticleRow['type'][] = ['article', 'news'];

const BLANK: ArticleRow = {
  slug: '', category_ar: '', category_en: '', title_ar: '', title_en: '',
  excerpt_ar: '', excerpt_en: '', body_ar: '', body_en: '', date: '',
  type: 'article', image_url: null, sort: 0, published: true,
};

export function ArticlesManager({ initial }: { initial: ArticleRow[] }) {
  const [rows, setRows] = useState<ArticleRow[]>(initial);
  const [editing, setEditing] = useState<ArticleRow | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSave(row: ArticleRow) {
    const res = await saveArticle(row);
    if (!res.ok) { setMsg(`Error: ${errText(res.error)}`); return; }
    setEditing(null);
    setRows((rs) => {
      const exists = row.id && rs.some((r) => r.id === row.id);
      return exists ? rs.map((r) => (r.id === row.id ? row : r)) : [...rs, row];
    });
    setMsg(SAVED_MSG);
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this article? It will be hidden from the site but can be restored.\nحذف هذا المقال؟ سيُخفى من الموقع ويمكن استرجاعه.')) return;
    const res = await deleteArticle(id);
    if (!res.ok) { setMsg(`Error: ${errText(res.error)}`); return; }
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  async function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    setRows(next);
    await reorderArticles(next.map((r) => r.id!).filter(Boolean));
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Articles &amp; News</h1>
          {msg && <p className="mt-0.5 text-xs" style={{ color: 'var(--adm-text-sm)' }}>{msg}</p>}
        </div>
        <button
          onClick={() => setEditing({ ...BLANK, sort: rows.length })}
          className="rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: 'var(--adm-accent)' }}
        >
          + New article
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--adm-border)' }}>
        <table className="w-full text-sm">
          <thead className="text-left" style={{ background: 'var(--adm-input-bg)', color: 'var(--adm-text-sm)' }}>
            <tr>
              <th className="px-4 py-2 font-medium">Order</th>
              <th className="px-4 py-2 font-medium">Title</th>
              <th className="px-4 py-2 font-medium">Type</th>
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
                  <div className="font-medium">{r.title_en || '(no title)'}</div>
                  <div dir="rtl" className="text-xs" style={{ color: 'var(--adm-text-xs)' }}>{r.title_ar}</div>
                </td>
                <td className="px-4 py-2 capitalize">{r.type}</td>
                <td className="px-4 py-2">
                  <span className={r.published ? 'text-[#34C759]' : ''} style={r.published ? undefined : { color: 'var(--adm-text-xs)' }}>
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
              <tr><td colSpan={5} className="px-4 py-8 text-center" style={{ color: 'var(--adm-text-xs)' }}>No articles yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <ArticleEditor row={editing} onCancel={() => setEditing(null)} onSave={onSave} />
      )}
    </div>
  );
}

function ArticleEditor({
  row, onCancel, onSave,
}: { row: ArticleRow; onCancel: () => void; onSave: (r: ArticleRow) => void }) {
  const [draft, setDraft] = useState<ArticleRow>(row);
  const set = (patch: Partial<ArticleRow>) => setDraft((d) => ({ ...d, ...patch }));

  const Pair = ({ label, ar, en, keyAr, keyEn, long }: {
    label: string; ar: string; en: string; keyAr: keyof ArticleRow; keyEn: keyof ArticleRow; long?: boolean;
  }) => (
    <div className="space-y-2">
      <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>{label}</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {long ? (
          <textarea dir="rtl" lang="ar" rows={3} value={ar} onChange={(e) => set({ [keyAr]: e.target.value } as Partial<ArticleRow>)} className="rounded-lg px-3 py-2 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
        ) : (
          <input dir="rtl" lang="ar" value={ar} onChange={(e) => set({ [keyAr]: e.target.value } as Partial<ArticleRow>)} className="h-10 rounded-lg px-3 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
        )}
        {long ? (
          <textarea dir="ltr" lang="en" rows={3} value={en} onChange={(e) => set({ [keyEn]: e.target.value } as Partial<ArticleRow>)} className="rounded-lg px-3 py-2 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
        ) : (
          <input dir="ltr" lang="en" value={en} onChange={(e) => set({ [keyEn]: e.target.value } as Partial<ArticleRow>)} className="h-10 rounded-lg px-3 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={onCancel}>
      <div
        className="h-full w-full max-w-2xl overflow-y-auto p-8"
        style={{ background: 'var(--adm-surface)', color: 'var(--adm-text)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{row.id ? 'Edit article' : 'New article'}</h2>
          <button onClick={onCancel} className="text-2xl" style={{ color: 'var(--adm-text-sm)' }}>✕</button>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>Slug (URL, lowercase-dashes)</div>
            <input value={draft.slug} onChange={(e) => set({ slug: e.target.value })} className="h-10 w-full rounded-lg px-3 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
          </div>

          <Pair label="Category" ar={draft.category_ar} en={draft.category_en} keyAr="category_ar" keyEn="category_en" />
          <Pair label="Title" ar={draft.title_ar} en={draft.title_en} keyAr="title_ar" keyEn="title_en" />
          <Pair label="Excerpt" ar={draft.excerpt_ar} en={draft.excerpt_en} keyAr="excerpt_ar" keyEn="excerpt_en" long />
          <Pair label="Body" ar={draft.body_ar} en={draft.body_en} keyAr="body_ar" keyEn="body_en" long />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>Date (text)</div>
              <input value={draft.date} onChange={(e) => set({ date: e.target.value })} placeholder="e.g. June 2026" className="h-10 w-full rounded-lg px-3 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
            </div>
            <div className="space-y-1.5">
              <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>Type</div>
              <select value={draft.type} onChange={(e) => set({ type: e.target.value as ArticleRow['type'] })} className="h-10 w-full rounded-lg px-3 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }}>
                {TYPES.map((t) => <option key={t} value={t} className="capitalize" style={{ background: 'var(--adm-surface)' }}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>Image</div>
            <ImageInput value={draft.image_url ?? ''} onChange={(v) => set({ image_url: v || null })} />
          </div>

        </div>

        <SaveBar published={draft.published} onCancel={onCancel} onSave={(pub) => onSave({ ...draft, published: pub })} />
      </div>
    </div>
  );
}
