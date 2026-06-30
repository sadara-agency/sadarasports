'use client';

import { useState } from 'react';
import {
  saveRole, deleteRole, reorderRoles, type RoleRow,
} from '@/app/admin/(dashboard)/roles/actions';
import { errText, SAVED_MSG } from '@/lib/admin/validate';
import { SaveBar } from './SaveBar';

const BLANK: RoleRow = {
  title_ar: '', title_en: '', team_ar: '', team_en: '',
  type_ar: '', type_en: '', location_ar: '', location_en: '',
  sort: 0, published: true,
};

export function RolesManager({ initial }: { initial: RoleRow[] }) {
  const [rows, setRows] = useState<RoleRow[]>(initial);
  const [editing, setEditing] = useState<RoleRow | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSave(row: RoleRow) {
    const res = await saveRole(row);
    if (!res.ok) { setMsg(`Error: ${errText(res.error)}`); return; }
    setEditing(null);
    setRows((rs) => {
      const exists = row.id && rs.some((r) => r.id === row.id);
      return exists ? rs.map((r) => (r.id === row.id ? row : r)) : [...rs, row];
    });
    setMsg(SAVED_MSG);
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this role? It will be hidden from the site but can be restored.\nحذف هذا الدور؟ سيُخفى من الموقع ويمكن استرجاعه.')) return;
    const res = await deleteRole(id);
    if (!res.ok) { setMsg(`Error: ${errText(res.error)}`); return; }
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  async function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    setRows(next);
    await reorderRoles(next.map((r) => r.id!).filter(Boolean));
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Open Roles</h1>
          {msg && <p className="mt-0.5 text-xs" style={{ color: 'var(--adm-text-sm)' }}>{msg}</p>}
        </div>
        <button
          onClick={() => setEditing({ ...BLANK, sort: rows.length })}
          className="rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: 'var(--adm-accent)' }}
        >
          + New role
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--adm-border)' }}>
        <table className="w-full text-sm">
          <thead className="text-left" style={{ background: 'var(--adm-input-bg)', color: 'var(--adm-text-sm)' }}>
            <tr>
              <th className="px-4 py-2 font-medium">Order</th>
              <th className="px-4 py-2 font-medium">Title</th>
              <th className="px-4 py-2 font-medium">Team</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id ?? `${r.title_en}-${i}`} className="border-t" style={{ borderColor: 'var(--adm-border)' }}>
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
                <td className="px-4 py-2">
                  <div>{r.team_en}</div>
                  <div dir="rtl" className="text-xs" style={{ color: 'var(--adm-text-xs)' }}>{r.team_ar}</div>
                </td>
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
              <tr><td colSpan={5} className="px-4 py-8 text-center" style={{ color: 'var(--adm-text-xs)' }}>No roles yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <RoleEditor row={editing} onCancel={() => setEditing(null)} onSave={onSave} />
      )}
    </div>
  );
}

function RoleEditor({
  row, onCancel, onSave,
}: { row: RoleRow; onCancel: () => void; onSave: (r: RoleRow) => void }) {
  const [draft, setDraft] = useState<RoleRow>(row);
  const set = (patch: Partial<RoleRow>) => setDraft((d) => ({ ...d, ...patch }));

  const Pair = ({ label, ar, en, keyAr, keyEn }: {
    label: string; ar: string; en: string; keyAr: keyof RoleRow; keyEn: keyof RoleRow;
  }) => (
    <div className="space-y-2">
      <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>{label}</div>
      <div className="grid gap-2 sm:grid-cols-2">
        <input dir="rtl" lang="ar" value={ar} onChange={(e) => set({ [keyAr]: e.target.value } as Partial<RoleRow>)} className="h-10 rounded-lg px-3 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
        <input dir="ltr" lang="en" value={en} onChange={(e) => set({ [keyEn]: e.target.value } as Partial<RoleRow>)} className="h-10 rounded-lg px-3 text-sm" style={{ background: 'var(--adm-input-bg)', borderColor: 'var(--adm-border-md)', border: '1px solid' }} />
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
          <h2 className="text-lg font-semibold">{row.id ? 'Edit role' : 'New role'}</h2>
          <button onClick={onCancel} className="text-2xl" style={{ color: 'var(--adm-text-sm)' }}>✕</button>
        </div>

        <div className="space-y-5">
          <Pair label="Title" ar={draft.title_ar} en={draft.title_en} keyAr="title_ar" keyEn="title_en" />
          <Pair label="Team" ar={draft.team_ar} en={draft.team_en} keyAr="team_ar" keyEn="team_en" />
          <Pair label="Type" ar={draft.type_ar} en={draft.type_en} keyAr="type_ar" keyEn="type_en" />
          <Pair label="Location" ar={draft.location_ar} en={draft.location_en} keyAr="location_ar" keyEn="location_en" />

        </div>

        <SaveBar published={draft.published} onCancel={onCancel} onSave={(pub) => onSave({ ...draft, published: pub })} />
      </div>
    </div>
  );
}
