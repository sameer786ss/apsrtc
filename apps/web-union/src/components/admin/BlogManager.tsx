'use client';
import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { fetchDocs, uploadFileWithProgress, removeEntry } from '@/lib/firestore';
import { Blog, BlogFormData } from '@/lib/types';
import Link from 'next/link';
import { Trash2, Edit, X, ChevronDown, Check, Image as ImageIcon, Upload, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import * as Select from '@radix-ui/react-select';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Label from '@radix-ui/react-label';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Progress from '@radix-ui/react-progress';
import TipTapEditor from './TipTapEditor';
import Spinner from '@/components/ui/Spinner';
import { stripHtml, generateExcerpt } from '@/lib/utils';

const emptyForm: BlogFormData = { title: '', category: 'General', content: '', excerpt: '', meta_title: '', meta_description: '', keywords: '', cover_image: '' };
const CATEGORIES = ['General', 'Employees', 'Circulars', 'News'];

export default function BlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogFormData>({ ...emptyForm });
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; url: string } | null>(null);
  // Cover image drag-drop
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [coverDragOver, setCoverDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try { setBlogs(await fetchDocs<Blog>('blogs', 'created_at')); }
    catch { toast.error('Failed to load blogs'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleCoverFile = (file: File) => {
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file'); return; }
    setCoverFile(file);
    const reader = new FileReader();
    reader.onload = e => setCoverPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const clearCover = () => { setCoverFile(null); setCoverPreview(''); if (fileInputRef.current) fileInputRef.current.value = ''; };

  const startEdit = (b: Blog) => {
    setEditId(b.id);
    setForm({ title: b.title, category: b.category, content: b.content, excerpt: b.excerpt || '', meta_title: b.meta_title || '', meta_description: b.meta_description || '', keywords: b.keywords || '', cover_image: b.cover_image });
    clearCover();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const cancelEdit = () => { setEditId(null); setForm({ ...emptyForm }); clearCover(); };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const tid = toast.loading('Deleting…');
    try { await removeEntry('blogs', deleteTarget.id, deleteTarget.url); toast.success('Deleted', { id: tid }); load(); }
    catch { toast.error('Failed to delete', { id: tid }); }
    finally { setDeleteTarget(null); }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editId && !coverFile) { toast.error('Cover image is required'); return; }
    setSubmitting(true);
    setUploadProgress(0);
    const tid = toast.loading(editId ? 'Updating…' : 'Publishing…');
    try {
      let cover_image = form.cover_image;
      if (coverFile) cover_image = await uploadFileWithProgress('covers', coverFile, setUploadProgress);
      const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `post-${Date.now()}`;
      // Always store a plain-text excerpt stripped of HTML tags
      const excerpt = form.excerpt || generateExcerpt(form.content, 200);
      const plainMetaDesc = form.meta_description ? stripHtml(form.meta_description) : excerpt;
      const data = { ...form, slug, cover_image, excerpt, meta_description: plainMetaDesc, updated_at: serverTimestamp() };
      if (editId) { await updateDoc(doc(db, 'blogs', editId), data); toast.success('Updated!', { id: tid }); }
      else { await addDoc(collection(db, 'blogs'), { ...data, created_at: serverTimestamp() }); toast.success('Published!', { id: tid }); }
      cancelEdit();
      load();
    } catch (err) { console.error(err); toast.error('Failed to save', { id: tid }); }
    finally { setSubmitting(false); setUploadProgress(0); }
  };

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <AlertDialog.Root open={!!deleteTarget} onOpenChange={o => !o && setDeleteTarget(null)}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="alert-overlay" />
          <AlertDialog.Content className="alert-content">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <div>
                <AlertDialog.Title className="text-base font-bold text-gray-900">Delete Blog Post?</AlertDialog.Title>
                <AlertDialog.Description className="text-sm text-gray-500 mt-1">This action cannot be undone. The post and its cover image will be permanently removed.</AlertDialog.Description>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <AlertDialog.Cancel asChild>
                <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium text-sm transition-colors">Cancel</button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium text-sm transition-colors">Delete</button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Form ── */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-red-700">{editId ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
            {editId && <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm transition-colors"><X size={16} /> Cancel</button>}
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label.Root htmlFor="title" className="form-label">Title</Label.Root>
                <input id="title" type="text" name="title" value={form.title} onChange={onChange} required
                  placeholder="Enter blog post title (Telugu or English)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white transition-colors" />
              </div>
              <div className="space-y-1">
                <Label.Root htmlFor="category-trigger" className="form-label">Category</Label.Root>
                <Select.Root value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
                  <Select.Trigger id="category-trigger" className="select-trigger">
                    <Select.Value />
                    <Select.Icon className="select-icon"><ChevronDown size={15} /></Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="select-content" position="popper" sideOffset={0}>
                      <Select.Viewport className="select-viewport">
                        {CATEGORIES.map(cat => (
                          <Select.Item key={cat} value={cat} className="select-item">
                            <Select.ItemText>{cat}</Select.ItemText>
                            <Select.ItemIndicator className="select-item-indicator"><Check size={13} /></Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>

            {/* SEO */}
            <details className="border border-gray-200 rounded-lg overflow-hidden">
              <summary className="bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer select-none hover:bg-gray-100 transition-colors">SEO Settings (optional)</summary>
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <Label.Root htmlFor="meta_title" className="form-label">Meta Title</Label.Root>
                  <input id="meta_title" type="text" name="meta_title" value={form.meta_title} onChange={onChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
                <div className="space-y-1">
                  <Label.Root htmlFor="meta_description" className="form-label">Meta Description</Label.Root>
                  <textarea id="meta_description" name="meta_description" value={form.meta_description} onChange={onChange} rows={2}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white resize-none" />
                </div>
                <div className="space-y-1">
                  <Label.Root htmlFor="keywords" className="form-label">Keywords <span className="font-normal text-gray-400">(comma separated)</span></Label.Root>
                  <input id="keywords" type="text" name="keywords" value={form.keywords} onChange={onChange}
                    placeholder="APSRTC, transfers, circular"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
              </div>
            </details>

            {/* Content */}
            <div className="space-y-1">
              <Label.Root className="form-label">Content</Label.Root>
              <TipTapEditor content={form.content} onChange={html => setForm(p => ({ ...p, content: html }))} />
            </div>

            {/* Cover Image */}
            <div className="space-y-1">
              <Label.Root className="form-label">Cover Image {editId && <span className="font-normal text-gray-400">(leave empty to keep current)</span>}</Label.Root>
              <div
                className={`drop-zone ${coverDragOver ? 'is-over' : ''} ${coverFile ? 'has-file' : ''}`}
                onDragOver={e => { e.preventDefault(); setCoverDragOver(true); }}
                onDragLeave={() => setCoverDragOver(false)}
                onDrop={e => { e.preventDefault(); setCoverDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleCoverFile(f); }}
              >
                {coverPreview ? (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={coverPreview} alt="Cover preview" className="w-full h-44 object-cover rounded-lg" />
                    <button type="button" onClick={clearCover}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-lg hover:bg-red-700 transition-colors">
                      <X size={14} />
                    </button>
                    <p className="text-xs text-green-700 mt-2 font-medium">✓ {coverFile?.name}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Upload size={28} className="text-gray-300" />
                    <p className="text-sm text-gray-600">
                      Drag &amp; drop or{' '}
                      <label className="text-red-600 cursor-pointer hover:underline font-medium">
                        browse
                        <input ref={fileInputRef} type="file" accept="image/*" className="sr-only"
                          onChange={e => e.target.files?.[0] && handleCoverFile(e.target.files[0])} />
                      </label>
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG, WebP — max 10MB</p>
                    {editId && form.cover_image && (
                      <a href={form.cover_image} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                        <ImageIcon size={12} /> View current image
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Upload progress */}
            {submitting && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{uploadProgress < 100 ? 'Uploading image…' : 'Saving post…'}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress.Root className="progress-root">
                  <Progress.Indicator className="progress-indicator" style={{ transform: `translateX(-${100 - uploadProgress}%)` }} />
                </Progress.Root>
              </div>
            )}

            <button type="submit" disabled={submitting}
              className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              {submitting ? <><Spinner size={16} className="text-white" /> {editId ? 'Updating…' : 'Publishing…'}</> : (editId ? 'Update Blog Post' : 'Publish Blog Post')}
            </button>
          </form>
        </div>

        {/* ── Blog List ── */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-8">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Published Posts</h2>
          {loading ? (
            <div className="flex justify-center py-8"><Spinner /></div>
          ) : (
            <ScrollArea.Root className="scrollarea-root h-[78vh]">
              <ScrollArea.Viewport className="scrollarea-viewport">
                <div className="space-y-4 pr-3">
                  {blogs.map(b => (
                    <div key={b.id} className={`pb-4 border-b border-gray-100 last:border-0 transition-all ${editId === b.id ? 'bg-red-50 -mx-2 px-2 py-2 rounded-lg border-none' : ''}`}>
                      <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-snug">{b.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-white bg-red-600 px-1.5 py-0.5 rounded-sm font-medium">{b.category}</span>
                        <span className="text-xs text-gray-400">{b.created_at?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex gap-3 mt-2">
                        <Link href={`/blog/${b.slug}`} target="_blank" className="text-blue-500 text-xs hover:underline">View</Link>
                        <button onClick={() => startEdit(b)} className="text-emerald-600 text-xs hover:underline flex items-center gap-1 transition-colors"><Edit size={11} /> Edit</button>
                        <button onClick={() => setDeleteTarget({ id: b.id, url: b.cover_image })} className="text-red-500 text-xs hover:underline flex items-center gap-1 transition-colors"><Trash2 size={11} /> Delete</button>
                      </div>
                    </div>
                  ))}
                  {blogs.length === 0 && <p className="text-gray-400 text-sm text-center py-4">No blogs published yet.</p>}
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar orientation="vertical" className="scrollarea-scrollbar">
                <ScrollArea.Thumb className="scrollarea-thumb" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          )}
        </div>
      </div>
    </>
  );
}
