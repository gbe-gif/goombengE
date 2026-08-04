import { useMemo } from 'react';
import { useContent } from '../hooks/useContent';
import PostList from '../components/PostList';

export default function DevNotesPage() {
  const { content } = useContent();

  const notesItems = useMemo(() => {
    return content
      .filter(item => item.type === 'devnote')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [content]);

  return (
    <PostList 
      title="Dev Notes" 
      icon="📓" 
      items={notesItems} 
      emptyMessage="등록된 개발 노트가 없습니다."
    />
  );
}
