import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface CategoryMemos {
  [key: string]: string;
}

export function useSettings() {
  const [memos, setMemos] = useState<CategoryMemos>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'categoryMemos'), (docSnap) => {
      if (docSnap.exists()) {
        setMemos(docSnap.data() as CategoryMemos);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching settings:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const updateMemo = async (category: string, text: string) => {
    try {
      await setDoc(doc(db, 'settings', 'categoryMemos'), { [category]: text }, { merge: true });
    } catch(err) {
      console.error("Error updating settings:", err);
    }
  }

  return { memos, updateMemo, loading };
}
