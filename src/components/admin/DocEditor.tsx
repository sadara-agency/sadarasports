'use client';

import { useState } from 'react';
import { AutoField } from './AutoField';
import { setAt, type Path } from '@/lib/admin/jsonPath';
import { saveDoc } from '@/app/admin/(dashboard)/docs/[doc]/actions';
import { fieldLabel } from '@/lib/admin/fieldMeta';
import { SAVED_MSG } from '@/lib/admin/validate';

export function DocEditor({
  docKey,
  title,
  initial,
}: {
  docKey: string;
  title: string;
  initial: Record<string, unknown>;
}) {
  const [data, setData] = useState<Record<string, unknown>>(initial);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onChange = (path: Path, value: unknown) => {
    setData((d) => setAt(d, path, value));
    setDirty(true);
    setMsg(null);
  };

  async function save() {
    setSaving(true);
    setMsg(null);
    const res = await saveDoc(docKey, data);
    setSaving(false);
    if (res.ok) {
      setDirty(false);
      setMsg(SAVED_MSG);
    } else {
      setMsg(`Error: ${res.error}`);
    }
  }

  return (
    <div className="max-w-4xl">
      <div
        className="sticky top-0 z-10 -mx-8 mb-6 flex items-center justify-between border-b px-8 py-4 backdrop-blur"
        style={{ background: 'color-mix(in srgb, var(--adm-bg) 95%, transparent)', borderColor: 'var(--adm-border)' }}
      >
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {msg && <p className="mt-0.5 text-xs" style={{ color: 'var(--adm-text-sm)' }}>{msg}</p>}
        </div>
        <button
          onClick={save}
          disabled={!dirty || saving}
          className="rounded-lg px-5 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-40"
          style={{ background: 'var(--adm-accent)' }}
        >
          {saving ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
        </button>
      </div>

      <div className="space-y-6 pb-24">
        {Object.entries(data).map(([k, v]) => {
          const bi = fieldLabel(k);
          return (
            <section
              key={k}
              className="rounded-xl border p-5"
              style={{ borderColor: 'var(--adm-border)', background: 'var(--adm-input-bg)' }}
            >
              <AutoField value={v} path={[k]} label={bi?.en ?? labelize(k)} labelAr={bi?.ar} onChange={onChange} />
            </section>
          );
        })}
      </div>
    </div>
  );
}

const labelize = (k: string) =>
  k.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
