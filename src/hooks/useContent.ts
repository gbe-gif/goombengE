import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArchiveItem, initialArchiveData } from '../data/mockData';

export function useContent() {
  const [content, setContent] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'content'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // Seed initial data if empty
        seedData();
      } else {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ArchiveItem));
        setContent(items);
        setLoading(false);
      }
    }, (error) => {
      console.error("Error fetching content:", error);
      // Fallback to mock data if permissions fail or something
      setContent(initialArchiveData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const seedData = async () => {
    try {
      // Just for local/first-time seeding
      for (const item of initialArchiveData) {
        await setDoc(doc(db, 'content', item.id), item);
      }
    } catch (error) {
      console.error("Error seeding data:", error);
      setContent(initialArchiveData);
      setLoading(false);
    }
  };

  return { content, loading };
}
