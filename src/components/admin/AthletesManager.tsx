'use client';

import { useState } from 'react';
import {
  saveAthlete, deleteAthlete, reorderAthletes, type AthleteRow,
} from '@/app/admin/(dashboard)/athletes/actions';
import { AutoField } from './AutoField';
import { ImageInput } from './ImageInput';
import { setAt, type Path } from '@/lib/admin/jsonPath';
import { errText, SAVED_MSG } from '@/lib/admin/validate';
import { SaveBar } from './SaveBar';

const TIERS = ['A+', 'A', 'B+', 'B'];

const BLANK: AthleteRow = {
  slug: '', name_ar: '', name_en: '', sport_ar: '', sport_en: '',
  position_ar: '', position_en: '', tier: 'B', club_ar: '', club_en: '',
  featured: false, bio_ar: '', bio_en: '', trajectory_ar: '', trajectory_en: '',
  media_value_ar: '', media_value_en: '', stats: [], accent: 'from-electric/40',
  photo_url: null, sort: 0, published: true,
};

export function AthletesManager({ initial }: { initial: AthleteRow[] }) {
  const [rows, setRows] = useState<AthleteRow[]>(initial);
  const [editing, setEditing] = useState<AthleteRow | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function refreshFromSave() {
    setMsg(SAVED_MSG);
  }

  async function onSave(row: AthleteRow) {
    const res = await saveAthlete(row);
    if (!res.ok) { setMsg(`Error: ${errText(res.error)}`); return; }
    setEditing(null);
    // Optimistic local update.
    setRows((rs) => {
      const exists = row.id && rs.some((r) => r.id === row.id);
      return exists ? rs.map((r) => (r.id === row.id ? row : r)) : [...rs, row];
    });
    refreshFromSave();
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this athlete? It will be hidden from the site but can be restored.\nحذف هذا اللاعب؟ سيُخفى من الموقع ويمكن استرجاعه.')) return;
    const res = await deleteAthlete(id);
    if (!res.ok) { setMsg(`Error: ${errText(res.error)}`); return; }
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  async function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    setRows(next);
    await reorderAthletes(next.map((r) => r.id!).filter(Boolean));
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Athletes</h1>
          {msg && <p className="mt-0.5 text-xs" style={{ color: 'var(--adm-text-sm)' }}>{msg}</p>}
        </div>
        <button
          onClick={() => setEditing({ ...BLANK, sort: rows.length })}
          className="rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: 'var(--adm-accent)' }}
        >
          + New athlete
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--adm-border)' }}>
        <table className="w-full text-sm">
          <thead className="text-left" style={{ background: 'var(--adm-input-bg)', color: 'var(--adm-text-sm)' }}>
            <tr>
              <th className="px-4 py-2 font-medium">Order</th>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Tier</th>
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
                  <div className="font-medium">{r.name_en || '(no name)'}</div>
                  <div dir="rtl" className="text-xs" style={{ color: 'var(--adm-text-xs)' }}>{r.name_ar}</div>
                </td>
                <td className="px-4 py-2">{r.tier}</td>
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
              <tr><td colSpan={5} className="px-4 py-8 text-center" style={{ color: 'var(--adm-text-xs)' }}>No athletes yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <AthleteEditor row={editing} onCancel={() => setEditing(null)} onSave={onSave} />
      )}
    </div>
  );
}

function AthleteEditor({
  row, onCancel, onSave,
}: { row: AthleteRow; onCancel: () => void; onSave: (r: AthleteRow) => void }) {
  const [draft, setDraft] = useState<AthleteRow>(row);
  const set = (patch: Partial<AthleteRow>) => setDraft((d) => ({ ...d, ...patch }));

  // stats uses the AutoField array editor via a path on a tiny wrapper object.
  const onStatsChange = (path: Path, value: unknown) => {
    const wrapped = setAt({ stats: draft.stats }, path, value) as { stats: AthleteRow['stats'] };
    set({ stats: wrapped.stats });
  };

  const Pair = ({ label, ar, en, keyAr, keyEn, long }: {
    label: string; ar: string; en: string; keyAr: keyof AthleteRow; keyEn: keyof AthleteRow; long?: boolean;
  }) => (
    <div className="space-y-2">
      <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>{label}</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {long ? (
          <textarea dir="rtl" lang="ar" rows={2} value={ar} onChange={(e) => set({ [keyAr]: e.target.value } as Partial<AthleteRow>)} className="rounded-lg px-3 py-2 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
        ) : (
          <input dir="rtl" lang="ar" value={ar} onChange={(e) => set({ [keyAr]: e.target.value } as Partial<AthleteRow>)} className="h-10 rounded-lg px-3 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
        )}
        {long ? (
          <textarea dir="ltr" lang="en" rows={2} value={en} onChange={(e) => set({ [keyEn]: e.target.value } as Partial<AthleteRow>)} className="rounded-lg px-3 py-2 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
        ) : (
          <input dir="ltr" lang="en" value={en} onChange={(e) => set({ [keyEn]: e.target.value } as Partial<AthleteRow>)} className="h-10 rounded-lg px-3 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
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
          <h2 className="text-lg font-semibold">{row.id ? 'Edit athlete' : 'New athlete'}</h2>
          <button onClick={onCancel} className="text-2xl" style={{ color: 'var(--adm-text-sm)' }}>✕</button>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>Slug (URL, lowercase-dashes)</div>
            <input value={draft.slug} onChange={(e) => set({ slug: e.target.value })} className="h-10 w-full rounded-lg px-3 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
          </div>
          <Pair label="Name" ar={draft.name_ar} en={draft.name_en} keyAr="name_ar" keyEn="name_en" />
          <Pair label="Sport" ar={draft.sport_ar} en={draft.sport_en} keyAr="sport_ar" keyEn="sport_en" />
          <Pair label="Position" ar={draft.position_ar} en={draft.position_en} keyAr="position_ar" keyEn="position_en" />
          <Pair label="Club" ar={draft.club_ar} en={draft.club_en} keyAr="club_ar" keyEn="club_en" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>Tier</div>
              <select value={draft.tier} onChange={(e) => set({ tier: e.target.value })} className="h-10 w-full rounded-lg px-3 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }}>
                {TIERS.map((t) => <option key={t} value={t} style={{ background: 'var(--adm-surface)' }}>{t}</option>)}
              </select>
            </div>
            <label className="mt-7 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={draft.featured} onChange={(e) => set({ featured: e.target.checked })} /> Featured
            </label>
          </div>
          <Pair label="Bio" ar={draft.bio_ar} en={draft.bio_en} keyAr="bio_ar" keyEn="bio_en" long />
          <Pair label="Trajectory" ar={draft.trajectory_ar} en={draft.trajectory_en} keyAr="trajectory_ar" keyEn="trajectory_en" long />
          <Pair label="Media value" ar={draft.media_value_ar} en={draft.media_value_en} keyAr="media_value_ar" keyEn="media_value_en" long />

          <div className="space-y-2">
            <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>Photo</div>
            <ImageInput value={draft.photo_url ?? ''} onChange={(v) => set({ photo_url: v || null })} />
          </div>

          <AutoField value={draft.stats} path={['stats']} label="Stats" onChange={onStatsChange} />
        </div>

        <SaveBar published={draft.published} onCancel={onCancel} onSave={(pub) => onSave({ ...draft, published: pub })} />
      </div>
    </div>
  );
}
