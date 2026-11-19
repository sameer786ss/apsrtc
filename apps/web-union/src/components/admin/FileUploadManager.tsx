'use client';
import { useState, useEffect, useRef } from 'react';
import { fetchDocs, removeEntry, saveFileDoc } from '@/lib/firestore';
import { FileDocument } from '@/lib/types';
import { Trash2, FileText, Image as ImageIcon, Music, Upload, X, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import * as Progress from '@radix-ui/react-progress';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Label from '@radix-ui/react-label';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Spinner from '@/components/ui/Spinner';

interface Props {
  collection: string;
  storagePath: string;
  label: string;
  accept: string;
  acceptLabel: string;
}

const FILE_ICONS: Record<string, React.ReactNode> = {
  pdf: <FileText size={20} className="text-red-600" />,
  audio: <Music size={20} className="text-purple-600" />,
  image: <ImageIcon size={20} className="text-blue-600" />,
};
const FILE_BADGE: Record<string, string> = {
  pdf: 'bg-red-100 text-red-700',
  audio: 'bg-purple-100 text-purple-700',
  image: 'bg-blue-100 text-blue-700',
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUploadManager({ collection: col, storagePath, label, accept, acceptLabel }: Props) {
  const [items, setItems] = useState<FileDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; url: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try { setItems(await fetchDocs<FileDocument>(col, 'date')); }
    catch { toast.error(`Failed to load ${label.toLowerCase()}s`); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [col]);

  const handleFile = (f: File) => { setFile(f); };
  const clearFile = () => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const tid = toast.loading('Deleting…');
    try { await removeEntry(col, deleteTarget.id, deleteTarget.url); toast.success('Deleted', { id: tid }); load(); }
    catch { toast.error('Failed to delete', { id: tid }); }
    finally { setDeleteTarget(null); }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) { toast.error('Please select a file'); return; }
    setSubmitting(true);
    setProgress(0);
    try {
      await saveFileDoc(col, storagePath, title, date, file, setProgress);
      toast.success(`${label} uploaded successfully!`);
      setTitle(''); setDate(new Date().toISOString().split('T')[0]); clearFile(); setProgress(0);
    } catch (err) { console.error(err); toast.error('Upload failed. Please try again.'); }
    finally { setSubmitting(false); }
  };

  return (
    <>
      {/* Delete Confirmation */}
      <AlertDialog.Root open={!!deleteTarget} onOpenChange={o => !o && setDeleteTarget(null)}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="alert-overlay" />
          <AlertDialog.Content className="alert-content">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <div>
                <AlertDialog.Title className="text-base font-bold text-gray-900">Delete {label}?</AlertDialog.Title>
                <AlertDialog.Description className="text-sm text-gray-500 mt-1">This will permanently delete the file and its record. This action cannot be undone.</AlertDialog.Description>
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
        {/* ── Upload Form ── */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-red-700 mb-5">Upload {label}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label.Root htmlFor={`${col}-title`} className="form-label">Title</Label.Root>
              <input id={`${col}-title`} type="text" value={title} onChange={e => setTitle(e.target.value)} required
                placeholder={`Enter ${label.toLowerCase()} title`}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" />
            </div>
            <div className="space-y-1">
              <Label.Root htmlFor={`${col}-date`} className="form-label">Date</Label.Root>
              <input id={`${col}-date`} type="date" value={date} onChange={e => setDate(e.target.value)} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" />
            </div>

            {/* Drop Zone */}
            <div className="space-y-1">
              <Label.Root className="form-label">File <span className="font-normal text-gray-400 text-xs">({acceptLabel})</span></Label.Root>
              <div
                className={`drop-zone ${isDragOver ? 'is-over' : ''} ${file ? 'has-file' : ''}`}
                onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${FILE_BADGE[file.type === 'application/pdf' ? 'pdf' : file.type.startsWith('audio/') ? 'audio' : 'image']}`}>
                      {file.type === 'application/pdf' ? <FileText size={20} /> : file.type.startsWith('audio/') ? <Music size={20} /> : <ImageIcon size={20} />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                      <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
                    </div>
                    <button type="button" onClick={clearFile} className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors"><X size={16} /></button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={28} className="text-gray-300" />
                    <p className="text-sm text-gray-600">
                      Drag &amp; drop or{' '}
                      <label className="text-red-600 cursor-pointer hover:underline font-medium">
                        browse
                        <input ref={fileInputRef} type="file" accept={accept} className="sr-only"
                          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
                      </label>
                    </p>
                    <p className="text-xs text-gray-400">{acceptLabel}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Progress */}
            {submitting && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    {progress === 100 ? <CheckCircle size={12} className="text-green-600" /> : <Spinner size={12} className="text-red-600" />}
                    {progress < 100 ? `Uploading… ${progress}%` : 'Saving record…'}
                  </span>
                  <span className="font-medium text-red-600">{progress}%</span>
                </div>
                <Progress.Root className="progress-root">
                  <Progress.Indicator className="progress-indicator" style={{ transform: `translateX(-${100 - progress}%)` }} />
                </Progress.Root>
              </div>
            )}

            <button type="submit" disabled={submitting}
              className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              {submitting ? <><Spinner size={16} className="text-white" /> Uploading…</> : <><Upload size={15} /> Upload {label}</>}
            </button>
          </form>
        </div>

        {/* ── Manage List ── */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">Manage {label}s</h2>
            {!loading && <span className="text-sm text-gray-400">{items.length} item{items.length !== 1 ? 's' : ''}</span>}
          </div>
          {loading ? (
            <div className="flex justify-center py-12"><Spinner size={36} /></div>
          ) : (
            <ScrollArea.Root className="scrollarea-root" style={{ height: 'calc(100vh - 280px)', minHeight: '300px' }}>
              <ScrollArea.Viewport className="scrollarea-viewport">
                <div className="space-y-2 pr-2 w-full overflow-hidden">
                  {items.map(item => (
                    <div
                      key={item.id}
                      style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '10px' }}
                      className="p-3 border border-gray-100 rounded-xl hover:border-gray-200 hover:bg-gray-50 transition-all"
                    >
                      <div className={`p-2 rounded-lg flex-shrink-0 ${FILE_BADGE[item.fileType]}`}>
                        {FILE_ICONS[item.fileType]}
                      </div>
                      <div style={{ minWidth: 0, overflow: 'hidden' }}>
                        <h3 style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 600, color: '#1f2937', lineHeight: '1.3' }} title={item.title}>{item.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" title="View file"
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                          <ExternalLink size={14} />
                        </a>
                        <button onClick={() => setDeleteTarget({ id: item.id, url: item.fileUrl })} title="Delete"
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                      <Upload size={32} className="mx-auto mb-3 text-gray-200" />
                      <p className="text-sm font-medium">No {label.toLowerCase()}s uploaded yet</p>
                      <p className="text-xs mt-1">Upload your first {label.toLowerCase()} using the form</p>
                    </div>
                  )}
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
