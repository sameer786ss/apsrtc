import { collection, getDocs, query, orderBy, addDoc, deleteDoc, doc, serverTimestamp, limit as firestoreLimit } from 'firebase/firestore';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

export async function fetchDocs<T>(col: string, field: string, dir: 'asc' | 'desc' = 'desc', limitCount = 100): Promise<T[]> {
  const q = query(collection(db, col), orderBy(field, dir), firestoreLimit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data(), created_at: d.data().created_at?.toDate?.() || new Date() })) as T[];
}

export async function uploadFile(path: string, file: File): Promise<string> {
  const storageRef = ref(storage, `${path}/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function uploadFileWithProgress(path: string, file: File, onProgress?: (pct: number) => void): Promise<string> {
  const storageRef = ref(storage, `${path}/${Date.now()}-${file.name}`);
  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file);
    task.on(
      'state_changed',
      s => onProgress?.(Math.round((s.bytesTransferred / s.totalBytes) * 100)),
      reject,
      () => getDownloadURL(task.snapshot.ref).then(resolve).catch(reject)
    );
  });
}

export async function removeEntry(col: string, id: string, fileUrl?: string) {
  await deleteDoc(doc(db, col, id));
  if (fileUrl) { try { await deleteObject(ref(storage, fileUrl)); } catch { /* already gone */ } }
}

export async function saveFileDoc(
  col: string, storagePath: string, title: string, date: string, file: File,
  onProgress?: (pct: number) => void
) {
  const fileUrl = await uploadFileWithProgress(storagePath, file, onProgress);
  let fileType: 'pdf' | 'image' | 'audio' = 'image';
  if (file.type === 'application/pdf') fileType = 'pdf';
  else if (file.type.startsWith('audio/')) fileType = 'audio';
  await addDoc(collection(db, col), { title, date, fileUrl, fileType, created_at: serverTimestamp() });
}
