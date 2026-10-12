import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArchiveItem } from '../data/mockData';
import { useAuth } from './useAuth';

export function useContent() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [state, setState] = useState<{ owner: boolean; content: ArchiveItem[]; loading: boolean; error: string | null }>({ owner: false, content: [], loading: true, error: null });
  useEffect(() => {
    if (authLoading) return;
    setState({ owner: isAdmin, content: [], loading: true, error: null });
    const source = collection(db, 'content');
    const q = isAdmin ? query(source) : query(source, where('isVisible', '==', true));
    return onSnapshot(q, snapshot => {
      const items = snapshot.docs.map(document => ({ ...document.data(), id: document.id } as ArchiveItem));
      items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setState({ owner: isAdmin, content: items, loading: false, error: null });
    }, error => {
      console.error('Error fetching content:', error);
      setState({ owner: isAdmin, content: [], loading: false, error: '글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.' });
    });
  }, [isAdmin, authLoading]);
  // Prevent stale private results from being rendered during logout.
  if (authLoading || state.owner !== isAdmin) return { content: [], loading: true, error: null };
  return { content: state.content, loading: state.loading, error: state.error };
}
