'use client';

import { useState } from 'react';
import {
  markRead, deleteSubmission, type SubmissionRow,
} from '@/app/admin/(dashboard)/inbox/actions';

export function InboxManager({ initial }: { initial: SubmissionRow[] }) {
  const [rows, setRows] = useState<SubmissionRow[]>(initial);
  const [msg, setMsg] = useState<string | null>(null);

  const unreadCount = rows.filter((r) => !r.read).length;

  async function onToggleRead(row: SubmissionRow) {
    const next = !row.read;
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, read: next } : r)));
    const res = await markRead(row.id, next);
    if (!res.ok) {
      setMsg(`Error: ${res.error}`);
      setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, read: row.read } : r)));
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this submission? This cannot be undone.')) return;
    const res = await deleteSubmission(id);
    if (!res.ok) { setMsg(`Error: ${res.error}`); return; }
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  function fmt(iso: string) {
    return new Date(iso).toLocaleString();
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold" style={{ color: 'var(--adm-text)' }}>Contact Inbox</h1>
        <p className="mt-0.5 text-xs" style={{ color: 'var(--adm-text-sm)' }}>
          {unreadCount > 0 ? `${unreadCount} unread` : 'All read'}
          {msg ? ` — ${msg}` : ''}
        </p>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border p-4"
            style={
              r.read
                ? { borderColor: 'var(--adm-border)', background: 'var(--adm-input-bg)' }
                : { borderColor: 'rgba(60,60,250,0.4)', background: 'rgba(60,60,250,0.06)' }
            }
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {!r.read && <span className="h-2 w-2 rounded-full" style={{ background: 'var(--adm-accent)' }} />}
                  <span
                    className="font-medium"
                    style={{ color: r.read ? 'var(--adm-text-md)' : 'var(--adm-text)' }}
                  >
                    {r.name || '(no name)'}
                  </span>
                </div>
                <div className="mt-0.5 text-xs" style={{ color: 'var(--adm-text-sm)' }}>
                  {r.email}
                  {r.org && <span> · {r.org}</span>}
                  {r.route && <span> · {r.route}</span>}
                </div>
              </div>
              <div className="shrink-0 text-xs" style={{ color: 'var(--adm-text-xs)' }}>{fmt(r.created_at)}</div>
            </div>

            <p className="mt-3 whitespace-pre-wrap text-sm" style={{ color: 'var(--adm-text-md)' }}>{r.message}</p>

            <div className="mt-3 flex gap-4 text-sm">
              <button onClick={() => onToggleRead(r)} className="hover:underline" style={{ color: 'var(--adm-accent)' }}>
                {r.read ? 'Mark unread' : 'Mark read'}
              </button>
              <button onClick={() => onDelete(r.id)} className="hover:underline" style={{ color: 'var(--adm-danger)' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <div
            className="rounded-xl border px-4 py-8 text-center"
            style={{ borderColor: 'var(--adm-border)', color: 'var(--adm-text-xs)' }}
          >
            No submissions yet.
          </div>
        )}
      </div>
    </div>
  );
}
