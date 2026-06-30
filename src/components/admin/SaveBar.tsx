'use client';

// Draft/Publish split used by every admin editor. "Publish" confirms before
// going live; "Save draft" keeps published:false. Replaces the old single
// Save button + Published checkbox so a non-technical editor can't publish
// incomplete content by accident.
type Props = {
  published: boolean;
  onSave: (published: boolean) => void;
  onCancel: () => void;
  /** When set, shows a Preview button (opens the last-saved version in a new tab). */
  onPreview?: () => void;
};

export function SaveBar({ published, onSave, onCancel, onPreview }: Props) {
  function publish() {
    if (confirm('Publish now? This makes the content live on the site.\nنشر الآن؟ سيظهر المحتوى مباشرةً على الموقع.')) onSave(true);
  }
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      {onPreview && (
        <button
          onClick={onPreview}
          className="rounded-lg px-5 py-2 text-sm font-medium"
          style={{ borderColor: 'var(--adm-border-md)', border: '1px solid' }}
        >
          Preview · معاينة
        </button>
      )}
      <button
        onClick={() => onSave(false)}
        className="rounded-lg px-5 py-2 text-sm font-medium"
        style={{ borderColor: 'var(--adm-border-md)', border: '1px solid' }}
      >
        Save draft · حفظ كمسودة
      </button>
      <button
        onClick={publish}
        className="rounded-lg px-5 py-2 text-sm font-medium"
        style={{ background: 'var(--adm-accent)' }}
      >
        {published ? 'Save & keep published · حفظ' : 'Publish · نشر'}
      </button>
      <button
        onClick={onCancel}
        className="rounded-lg px-5 py-2 text-sm"
        style={{ borderColor: 'var(--adm-border-md)', border: '1px solid' }}
      >
        Cancel · إلغاء
      </button>
    </div>
  );
}
