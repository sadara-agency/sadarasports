// Immutable get/set by path array for the auto-form editor.
export type Path = (string | number)[];

export function getAt(obj: unknown, path: Path): unknown {
  return path.reduce<unknown>((acc, key) => {
    if (acc == null) return undefined;
    return (acc as Record<string | number, unknown>)[key];
  }, obj);
}

export function setAt<T>(obj: T, path: Path, value: unknown): T {
  if (path.length === 0) return value as T;
  const [head, ...rest] = path;
  const clone: Record<string | number, unknown> = Array.isArray(obj)
    ? ([...(obj as unknown[])] as unknown as Record<string | number, unknown>)
    : { ...(obj as Record<string, unknown>) };
  clone[head] = setAt(clone[head], rest, value);
  return clone as T;
}

export function isBilingual(v: unknown): v is { ar: string; en: string } {
  return (
    typeof v === 'object' &&
    v !== null &&
    !Array.isArray(v) &&
    'ar' in v &&
    'en' in v &&
    Object.keys(v as object).length === 2 &&
    typeof (v as { ar: unknown }).ar === 'string' &&
    typeof (v as { en: unknown }).en === 'string'
  );
}

// Field key looks like an image/asset URL → render an uploader.
export function isImageKey(key: string | number): boolean {
  const k = String(key).toLowerCase();
  return k === 'logo' || k === 'image' || k === 'photo' || k.endsWith('image') || k.endsWith('photourl') || k.endsWith('logo');
}

// Array field whose items are themselves image URLs (e.g. images.articles: string[]).
export function isImageArrayKey(key: string | number): boolean {
  const k = String(key).toLowerCase();
  return k === 'articles' || k === 'images' || k === 'photos' || k === 'gallery' || k.endsWith('images') || k.endsWith('photos');
}

// Long-text bilingual fields (lead/body/desc/excerpt/bio) → textarea.
export function isLongTextKey(key: string | number): boolean {
  const k = String(key).toLowerCase();
  return ['lead', 'body', 'desc', 'description', 'excerpt', 'bio', 'trajectory', 'tagline', 'mediavalue'].some((t) =>
    k.includes(t),
  );
}
