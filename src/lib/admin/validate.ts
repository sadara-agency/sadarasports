// Server-side save validation for admin CRUD: required fields, slug format,
// duplicate-slug. Returns a bilingual error so managers can show it in either
// locale. Authoritative (runs in server actions), so client checks are optional.
import type { Bi } from '@/lib/i18n';

export type ValidationError = { error: Bi };

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Bilingual "saved" confirmation shown after every successful save. */
export const SAVED_MSG = 'Saved — live within seconds. · تم الحفظ — سيظهر خلال ثوانٍ.';

/** Render an action error (string or bilingual) for the admin UI. */
export function errText(e: string | Bi | undefined, locale: 'ar' | 'en' = 'en'): string {
  if (!e) return 'Error';
  return typeof e === 'string' ? e : e[locale];
}

function missing(label: Bi): ValidationError {
  return { error: { ar: `${label.ar} مطلوب.`, en: `${label.en} is required.` } };
}

/** Check a set of required string fields are non-empty (after trim). */
export function requireFields(
  row: Record<string, unknown>,
  fields: { key: string; label: Bi }[],
): ValidationError | null {
  for (const { key, label } of fields) {
    const v = row[key];
    if (typeof v !== 'string' || v.trim() === '') return missing(label);
  }
  return null;
}

/** Validate slug format. Empty slug is reported as required. */
export function validateSlug(slug: unknown): ValidationError | null {
  if (typeof slug !== 'string' || slug.trim() === '') {
    return missing({ ar: 'الرابط (slug)', en: 'Slug' });
  }
  if (!SLUG_RE.test(slug.trim())) {
    return {
      error: {
        ar: 'الرابط يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وشرطات فقط (مثال: my-page).',
        en: 'Slug must be lowercase letters, numbers, and dashes only (e.g. my-page).',
      },
    };
  }
  return null;
}

/** Reject a slug already used by another row (excluding the row being edited). */
export function checkDuplicateSlug(
  slug: string,
  existing: { id?: string; slug: string }[],
  currentId?: string,
): ValidationError | null {
  const clash = existing.some((r) => r.slug === slug.trim() && r.id !== currentId);
  if (clash) {
    return {
      error: {
        ar: 'هذا الرابط مستخدم بالفعل. اختر رابطًا مختلفًا.',
        en: 'This slug is already in use. Choose a different one.',
      },
    };
  }
  return null;
}
