import type { Bi } from '@/lib/i18n';

// Curated bilingual labels + structural guards for the section-doc editor.
// Keyed by the leaf field name (matches how AutoField already derives labels),
// so one dictionary covers talent/advisory/markets/institution and the rest —
// they all share the DivisionData / ModuleData vocabulary.

export const FIELD_LABELS: Record<string, Bi> = {
  kicker: { ar: 'العنوان التمهيدي', en: 'Kicker' },
  title: { ar: 'العنوان', en: 'Title' },
  lead: { ar: 'النص التمهيدي', en: 'Lead paragraph' },
  body: { ar: 'النص', en: 'Body' },
  desc: { ar: 'الوصف', en: 'Description' },
  proposition: { ar: 'القيمة المقترحة', en: 'Proposition' },
  modulesHeader: { ar: 'ترويسة الوحدات', en: 'Modules header' },
  overview: { ar: 'نظرة عامة', en: 'Overview' },
  detail: { ar: 'التفاصيل', en: 'Detail' },
  features: { ar: 'الميزات', en: 'Features' },
  header: { ar: 'الترويسة', en: 'Header' },
  stats: { ar: 'الإحصائيات', en: 'Stats' },
  modules: { ar: 'الوحدات', en: 'Modules' },
  items: { ar: 'العناصر', en: 'Items' },
  bullets: { ar: 'النقاط', en: 'Bullet points' },
  crumbs: { ar: 'مسار التنقّل', en: 'Breadcrumbs' },
  cta: { ar: 'دعوة لاتخاذ إجراء', en: 'Call to action' },
  primary: { ar: 'الزر الأساسي', en: 'Primary button' },
  secondary: { ar: 'الزر الثانوي', en: 'Secondary button' },
  label: { ar: 'النص', en: 'Label' },
  href: { ar: 'الرابط', en: 'Link' },
  no: { ar: 'الرقم', en: 'Number' },
  value: { ar: 'القيمة', en: 'Value' },
  suffix: { ar: 'اللاحقة', en: 'Suffix' },
  decimals: { ar: 'المنازل العشرية', en: 'Decimals' },
  tone: { ar: 'النغمة', en: 'Tone' },
  slug: { ar: 'الرابط (slug)', en: 'Slug' },
  image: { ar: 'الصورة', en: 'Image' },
};

/** Curated bilingual label for a field key, or null to fall back to auto-labelize. */
export function fieldLabel(key: string | number): Bi | null {
  return FIELD_LABELS[String(key)] ?? null;
}

// Arrays that a section template needs at least one of — emptying them makes the
// rendered block vanish (the audit's main "client broke the page" case). The
// editor blocks removing the last item of these.
const MIN_ONE_ITEM = new Set(['stats', 'modules', 'items', 'bullets', 'crumbs']);

/** Minimum number of items an array under this key must keep (default 0). */
export function minItems(key: string | number): number {
  return MIN_ONE_ITEM.has(String(key)) ? 1 : 0;
}
