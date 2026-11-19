'use client';
import { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { app, db } from './firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function useAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      if (!u) { setUser(null); setIsAdmin(false); setLoading(false); return; }
      try {
        const snap = await getDoc(doc(db, 'users', u.uid));
        setUser(u);
        setIsAdmin(snap.exists() && snap.data()?.role === 'admin');
      } catch { setUser(u); setIsAdmin(false); }
      setLoading(false);
    });
  }, []);
  return { user, isAdmin, loading };
}

export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logoutUser = () => signOut(auth);
