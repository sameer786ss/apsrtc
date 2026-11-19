'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Progress from '@radix-ui/react-progress';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered,
  Quote, Code, Braces, Link as LinkIcon, ImagePlus,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Minus, Undo, Redo,
} from 'lucide-react';
import { useEffect, useCallback, useState, useRef } from 'react';
import { uploadFileWithProgress } from '@/lib/firestore';

const CHAR_LIMIT = 50000;

interface Props {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function Btn({
  onClick, active, label, shortcut, disabled, children,
}: { onClick: () => void; active?: boolean; label: string; shortcut?: string; disabled?: boolean; children: React.ReactNode }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          onClick={onClick}
          className={active ? 'is-active' : ''}
          aria-label={label}
          disabled={disabled}
          style={disabled ? { opacity: 0.35, cursor: 'not-allowed' } : undefined}
        >
          {children}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="tooltip-content" side="top" sideOffset={6}>
          {label}
          {shortcut && <span className="tooltip-shortcut">{shortcut}</span>}
          <Tooltip.Arrow className="tooltip-arrow" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function Divider() {
  return <span className="toolbar-divider" aria-hidden="true" />;
}

export default function TipTapEditor({ content, onChange, placeholder = 'Write your content here… (supports Telugu & English)' }: Props) {
  // Reactive counts driven by useState — NOT read from storage at render time
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  // Image upload state
  const [imgUploading, setImgUploading] = useState(false);
  const [imgProgress, setImgProgress] = useState(0);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const syncCounts = (ed: ReturnType<typeof useEditor>) => {
    if (!ed) return;
    setCharCount(ed.storage.characterCount.characters());
    setWordCount(ed.storage.characterCount.words());
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: { languageClassPrefix: 'language-' } }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-red-700 underline', target: '_blank', rel: 'noopener noreferrer' } }),
      Image.configure({ HTMLAttributes: { class: 'max-w-full rounded-lg' } }),
      Placeholder.configure({ placeholder }),
      CharacterCount.configure({ limit: CHAR_LIMIT }),
    ],
    content,
    onUpdate: ({ editor }) => { onChange(editor.getHTML()); syncCounts(editor); },
    onCreate: ({ editor }) => { syncCounts(editor); },
    editorProps: { attributes: { class: 'ProseMirror' } },
  });

  // Sync when content prop changes externally (edit mode / form reset)
  useEffect(() => {
    if (!editor) return;
    if (content !== editor.getHTML()) {
      editor.commands.setContent(content || '', { emitUpdate: false });
      syncCounts(editor);
    }
  }, [content, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Enter URL', prev ?? 'https://');
    if (url === null) return;
    if (url === '') { editor.chain().focus().extendMarkRange('link').unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  // Image: upload to Firebase Storage, then insert URL into editor
  const handleImageFile = useCallback(async (file: File) => {
    if (!editor || !file.type.startsWith('image/')) return;
    setImgUploading(true);
    setImgProgress(0);
    try {
      const url = await uploadFileWithProgress('editor-images', file, setImgProgress);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch { /* silent — user will see nothing inserted */ }
    finally { setImgUploading(false); setImgProgress(0); if (imgInputRef.current) imgInputRef.current.value = ''; }
  }, [editor]);

  if (!editor) return <div className="tiptap-wrapper" style={{ minHeight: 420 }}><div className="animate-pulse bg-gray-100 h-full w-full" style={{ minHeight: 420 }} /></div>;

  const pct = Math.min(100, Math.round((charCount / CHAR_LIMIT) * 100));
  const readingMins = Math.max(1, Math.ceil(wordCount / 200));
  const nearLimit = pct >= 80;
  const atLimit = pct >= 100;

  return (
    <Tooltip.Provider delayDuration={350}>
      <div className="tiptap-wrapper">
        <div className="tiptap-toolbar">
          {/* Formatting */}
          <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} label="Bold" shortcut="⌘B"><Bold size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} label="Italic" shortcut="⌘I"><Italic size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} label="Underline" shortcut="⌘U"><UnderlineIcon size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} label="Strikethrough"><Strikethrough size={14} /></Btn>
          <Divider />
          {/* Headings */}
          <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} label="Heading 1" shortcut="⌘⌥1"><Heading1 size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} label="Heading 2" shortcut="⌘⌥2"><Heading2 size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} label="Heading 3" shortcut="⌘⌥3"><Heading3 size={14} /></Btn>
          <Divider />
          {/* Lists & blocks */}
          <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} label="Bullet List" shortcut="⌘⇧8"><List size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} label="Numbered List" shortcut="⌘⇧7"><ListOrdered size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} label="Blockquote"><Quote size={14} /></Btn>
          <Divider />
          {/* Code */}
          <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} label="Inline Code" shortcut="⌘E"><Code size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} label="Code Block" shortcut="⌘⌥C"><Braces size={14} /></Btn>
          <Divider />
          {/* Alignment */}
          <Btn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} label="Align Left"><AlignLeft size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} label="Align Center"><AlignCenter size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} label="Align Right"><AlignRight size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} label="Justify"><AlignJustify size={14} /></Btn>
          <Divider />
          {/* Insert: Link */}
          <Btn onClick={setLink} active={editor.isActive('link')} label="Insert / Edit Link" shortcut="⌘K"><LinkIcon size={14} /></Btn>
          {/* Insert: Image upload (not URL prompt) */}
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <label
                className={`tiptap-img-btn${imgUploading ? ' is-active' : ''}`}
                aria-label="Upload image"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '5px 7px', borderRadius: 5, cursor: imgUploading ? 'wait' : 'pointer', color: '#374151', transition: 'background 0.12s' }}
              >
                <ImagePlus size={14} />
                <input
                  ref={imgInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  disabled={imgUploading}
                  onChange={e => e.target.files?.[0] && handleImageFile(e.target.files[0])}
                />
              </label>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="tooltip-content" side="top" sideOffset={6}>
                {imgUploading ? `Uploading… ${imgProgress}%` : 'Upload Image'}
                <Tooltip.Arrow className="tooltip-arrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
          <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} label="Horizontal Rule"><Minus size={14} /></Btn>
          <Divider />
          {/* History */}
          <Btn onClick={() => editor.chain().focus().undo().run()} active={false} disabled={!editor.can().undo()} label="Undo" shortcut="⌘Z"><Undo size={14} /></Btn>
          <Btn onClick={() => editor.chain().focus().redo().run()} active={false} disabled={!editor.can().redo()} label="Redo" shortcut="⌘⇧Z"><Redo size={14} /></Btn>
        </div>

        {/* Image upload progress bar — shown inline below toolbar */}
        {imgUploading && (
          <div className="px-3 py-1.5 border-b border-gray-100 bg-red-50 flex items-center gap-3">
            <span className="text-xs text-red-700 font-medium whitespace-nowrap">Uploading image… {imgProgress}%</span>
            <Progress.Root className="progress-root flex-1" style={{ height: 5 }}>
              <Progress.Indicator className="progress-indicator" style={{ transform: `translateX(-${100 - imgProgress}%)` }} />
            </Progress.Root>
          </div>
        )}

        <EditorContent editor={editor} />

        {/* Status bar */}
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 flex justify-between items-center gap-4">
          <span className="text-xs text-gray-400">Telugu (తెలుగు) &amp; English · ~{readingMins} min read</span>
          <div className="flex items-center gap-3">
            {/* Progress fill for char limit */}
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${pct}%`, background: atLimit ? '#dc2626' : nearLimit ? '#f59e0b' : '#b91c1c' }}
                />
              </div>
              <span className={`text-xs ${atLimit ? 'text-red-600 font-semibold' : nearLimit ? 'text-amber-500 font-medium' : 'text-gray-400'}`}>
                {charCount.toLocaleString()}<span className="text-gray-300">/{CHAR_LIMIT.toLocaleString()}</span>
              </span>
            </div>
            <span className="text-gray-200 text-xs">|</span>
            <span className="text-xs text-gray-400">{wordCount.toLocaleString()} words</span>
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
}
