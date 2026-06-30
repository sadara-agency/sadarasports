'use client';

import { isBilingual, isImageArrayKey, isImageKey, isLongTextKey, looksLikeImageUrl, type Path } from '@/lib/admin/jsonPath';
import { ImageInput } from './ImageInput';
import { fieldLabel, minItems } from '@/lib/admin/fieldMeta';

type Props = {
  value: unknown;
  path: Path;
  label?: string;
  labelAr?: string;
  onChange: (path: Path, value: unknown) => void;
  forceImage?: boolean;
};

const labelize = (k: string | number) =>
  String(k).replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

// Curated bilingual label for a key, falling back to the auto-derived English one.
function resolveLabel(k: string | number): { label: string; labelAr?: string } {
  const bi = fieldLabel(k);
  return bi ? { label: bi.en, labelAr: bi.ar } : { label: labelize(k) };
}

const inputCls =
  'w-full rounded-lg border px-3 text-sm outline-none transition-colors focus:ring-1 focus:ring-[#3C3CFA]';

export function AutoField({ value, path, label, labelAr, onChange, forceImage }: Props) {
  // Bilingual { ar, en } → paired inputs.
  if (isBilingual(value)) {
    const long = isLongTextKey(path[path.length - 1] ?? '');
    return (
      <div className="space-y-2">
        {label && <FieldLabel ar={labelAr}>{label}</FieldLabel>}
        <div className="grid gap-2 sm:grid-cols-2">
          <LocaleInput
            dir="rtl" lang="ar" placeholder="العربية" long={long}
            value={value.ar}
            onChange={(v) => onChange([...path, 'ar'], v)}
          />
          <LocaleInput
            dir="ltr" lang="en" placeholder="English" long={long}
            value={value.en}
            onChange={(v) => onChange([...path, 'en'], v)}
          />
        </div>
      </div>
    );
  }

  // Image/asset string → uploader.
  if (typeof value === 'string' && (forceImage || isImageKey(path[path.length - 1] ?? '') || looksLikeImageUrl(value))) {
    return (
      <div className="space-y-2">
        {label && <FieldLabel ar={labelAr}>{label}</FieldLabel>}
        <ImageInput value={value} onChange={(v) => onChange(path, v)} />
      </div>
    );
  }

  // Primitive string.
  if (typeof value === 'string') {
    return (
      <div className="space-y-1.5">
        {label && <FieldLabel ar={labelAr}>{label}</FieldLabel>}
        <input
          value={value}
          onChange={(e) => onChange(path, e.target.value)}
          className={`h-10 ${inputCls}`}
          style={{ borderColor: 'var(--adm-border-md)', background: 'var(--adm-input-bg)', color: 'var(--adm-text)' }}
        />
      </div>
    );
  }

  // Number.
  if (typeof value === 'number') {
    return (
      <div className="space-y-1.5">
        {label && <FieldLabel ar={labelAr}>{label}</FieldLabel>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(path, e.target.value === '' ? 0 : Number(e.target.value))}
          className={`h-10 w-40 ${inputCls}`}
          style={{ borderColor: 'var(--adm-border-md)', background: 'var(--adm-input-bg)', color: 'var(--adm-text)' }}
        />
      </div>
    );
  }

  // Boolean.
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={value} onChange={(e) => onChange(path, e.target.checked)} />
        {label}
      </label>
    );
  }

  // Array → repeatable rows with add/remove/reorder.
  if (Array.isArray(value)) {
    const move = (from: number, to: number) => {
      if (to < 0 || to >= value.length) return;
      const next = [...value];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      onChange(path, next);
    };
    const blank = makeBlank(value[0]);
    const min = minItems(path[path.length - 1] ?? '');
    const canRemove = value.length > min;
    const itemIsImage = isImageArrayKey(path[path.length - 1] ?? '');
    return (
      <div className="space-y-3 rounded-xl border p-4" style={{ borderColor: 'var(--adm-border)', background: 'var(--adm-input-bg)' }}>
        {label && <FieldLabel ar={labelAr}>{label}</FieldLabel>}
        {value.map((item, i) => (
          <div key={i} className="rounded-lg border p-3" style={{ borderColor: 'var(--adm-border)', background: 'var(--adm-surface)' }}>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[11px]" style={{ color: 'var(--adm-text-xs)' }}>#{i + 1}</span>
              <div className="flex gap-1.5 text-xs">
                <RowBtn onClick={() => move(i, i - 1)} disabled={i === 0}>↑</RowBtn>
                <RowBtn onClick={() => move(i, i + 1)} disabled={i === value.length - 1}>↓</RowBtn>
                <RowBtn
                  onClick={() => onChange(path, value.filter((_, j) => j !== i))}
                  disabled={!canRemove}
                  danger
                >
                  Remove
                </RowBtn>
              </div>
            </div>
            <AutoField value={item} path={[...path, i]} onChange={onChange} forceImage={itemIsImage} />
          </div>
        ))}
        {blank !== undefined && (
          <button
            type="button"
            onClick={() => onChange(path, [...value, blank])}
            className="rounded-lg border border-dashed px-3 py-1.5 text-sm transition-colors hover:border-[#3C3CFA]"
            style={{ borderColor: 'var(--adm-border-md)', color: 'var(--adm-text-sm)' }}
          >
            + Add item
          </button>
        )}
      </div>
    );
  }

  // Object → nested fieldset.
  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value as Record<string, unknown>);
    return (
      <div className="space-y-4">
        {label && <SectionTitle ar={labelAr}>{label}</SectionTitle>}
        <div className="space-y-4 border-s ps-4" style={{ borderColor: 'var(--adm-border)' }}>
          {entries.map(([k, v]) => {
            const lbl = resolveLabel(k);
            return <AutoField key={k} value={v} path={[...path, k]} label={lbl.label} labelAr={lbl.labelAr} onChange={onChange} />;
          })}
        </div>
      </div>
    );
  }

  // null/undefined → editable string fallback.
  return (
    <div className="space-y-1.5">
      {label && <FieldLabel>{label}</FieldLabel>}
      <input
        value=""
        onChange={(e) => onChange(path, e.target.value)}
        placeholder="(empty)"
        className={`h-10 ${inputCls}`}
        style={{ borderColor: 'var(--adm-border-md)', background: 'var(--adm-input-bg)', color: 'var(--adm-text)' }}
      />
    </div>
  );
}

function makeBlank(sample: unknown): unknown {
  if (sample === undefined) return undefined;
  if (isBilingual(sample)) return { ar: '', en: '' };
  if (typeof sample === 'string') return '';
  if (typeof sample === 'number') return 0;
  if (typeof sample === 'boolean') return false;
  if (Array.isArray(sample)) return [];
  if (typeof sample === 'object' && sample !== null) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(sample)) out[k] = makeBlank(v);
    return out;
  }
  return '';
}

function LocaleInput({
  value, onChange, dir, lang, placeholder, long,
}: {
  value: string; onChange: (v: string) => void;
  dir: 'rtl' | 'ltr'; lang: string; placeholder: string; long: boolean;
}) {
  const style = { borderColor: 'var(--adm-border-md)', background: 'var(--adm-input-bg)', color: 'var(--adm-text)' };
  return long ? (
    <textarea
      dir={dir} lang={lang} placeholder={placeholder} rows={3} value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} resize-y py-2`}
      style={style}
    />
  ) : (
    <input
      dir={dir} lang={lang} placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-10 ${inputCls}`}
      style={style}
    />
  );
}

function FieldLabel({ children, ar }: { children: React.ReactNode; ar?: string }) {
  return (
    <div className="text-sm font-medium" style={{ color: 'var(--adm-text-md)' }}>
      {children}
      {ar && <span dir="rtl" className="ms-2 font-normal" style={{ color: 'var(--adm-text-xs)' }}>· {ar}</span>}
    </div>
  );
}

function SectionTitle({ children, ar }: { children: React.ReactNode; ar?: string }) {
  return (
    <div className="text-base font-semibold" style={{ color: 'var(--adm-text)' }}>
      {children}
      {ar && <span dir="rtl" className="ms-2 text-sm font-normal" style={{ color: 'var(--adm-text-xs)' }}>· {ar}</span>}
    </div>
  );
}

function RowBtn({
  children, onClick, disabled, danger,
}: { children: React.ReactNode; onClick: () => void; disabled?: boolean; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded border px-2 py-0.5 transition-colors disabled:opacity-30"
      style={{
        borderColor: 'var(--adm-border-md)',
        color: danger ? 'var(--adm-danger)' : 'var(--adm-text-sm)',
        background: 'var(--adm-hover)',
      }}
    >
      {children}
    </button>
  );
}
