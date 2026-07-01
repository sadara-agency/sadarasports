'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

const inputCls =
  'w-full rounded-lg border px-3 text-sm outline-none transition-colors focus:ring-1 focus:ring-[#3C3CFA]';

export function RichTextField({
  value, onChange, dir, lang, placeholder,
}: {
  value: string; onChange: (v: string) => void;
  dir: 'rtl' | 'ltr'; lang: string; placeholder: string;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        dir, lang,
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[6rem]',
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const btnCls = (active: boolean) =>
    `rounded px-2 py-1 text-xs transition-colors ${active ? 'bg-[#3C3CFA] text-white' : 'hover:bg-[var(--adm-hover)]'}`;

  return (
    <div
      className={`${inputCls} space-y-2 py-2`}
      style={{ borderColor: 'var(--adm-border-md)', background: 'var(--adm-input-bg)', color: 'var(--adm-text)' }}
    >
      <div className="flex flex-wrap gap-1 border-b pb-2" style={{ borderColor: 'var(--adm-border)' }}>
        <button type="button" className={btnCls(editor.isActive('bold'))} onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button type="button" className={btnCls(editor.isActive('italic'))} onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
        <button type="button" className={btnCls(editor.isActive('heading', { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type="button" className={btnCls(editor.isActive('heading', { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
        <button type="button" className={btnCls(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button type="button" className={btnCls(editor.isActive('orderedList'))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
        <button type="button" className={btnCls(editor.isActive('blockquote'))} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo;&rdquo;</button>
        <button
          type="button"
          className={btnCls(editor.isActive('link'))}
          onClick={() => {
            const url = window.prompt('URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
            else editor.chain().focus().unsetLink().run();
          }}
        >
          Link
        </button>
      </div>
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  );
}
