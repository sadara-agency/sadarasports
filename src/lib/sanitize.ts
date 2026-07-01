import sanitizeHtmlLib from 'sanitize-html';

// Allowlist matches Tiptap StarterKit output — closes stored-XSS on admin-authored HTML
// that gets rendered as raw markup on public pages.
const ALLOWED_TAGS = ['p', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote', 'a', 'strong', 'em', 'br'];
const ALLOWED_ATTR = ['href', 'target', 'rel'];

export function sanitizeHtml(html: string): string {
  return sanitizeHtmlLib(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { a: ALLOWED_ATTR },
  });
}

// Recursively sanitizes string leaves under long-text keys (body/desc/excerpt/bio/...)
// anywhere in a content_docs JSON tree, leaving plain short-text fields untouched.
export function sanitizeLongTextTree(value: unknown, isLongTextKey: (key: string | number) => boolean, key?: string | number): unknown {
  if (typeof value === 'string') {
    return key !== undefined && isLongTextKey(key) ? sanitizeHtml(value) : value;
  }
  if (Array.isArray(value)) {
    return value.map((v) => sanitizeLongTextTree(v, isLongTextKey));
  }
  if (typeof value === 'object' && value !== null) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = sanitizeLongTextTree(v, isLongTextKey, k);
    }
    return out;
  }
  return value;
}
