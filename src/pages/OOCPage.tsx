import { useMemo } from 'react';
import { useContent } from '../hooks/useContent';
import PostList from '../components/PostList';

export default function OOCPage() {
  const { content } = useContent();

  const oocItems = useMemo(() => {
    return content
      .filter(item => item.type === 'ooc')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [content]);

  return (
    <PostList 
      title="OOC Playground" 
      icon="🎲" 
      items={oocItems} 
      emptyMessage="등록된 OOC 글이 없습니다."
    />
  );
}
