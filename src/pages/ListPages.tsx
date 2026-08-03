import { useContent } from '../hooks/useContent';
import PostList from '../components/PostList';
import { useMemo } from 'react';

export function NoticePage() {
  const { content } = useContent();
  const items = useMemo(() => content.filter(item => item.type === 'notice').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [content]);
  return <PostList title="Notice" icon="📢" items={items} emptyMessage="등록된 공지사항이 없습니다." />;
}

export function ResourcesPage() {
  const { content } = useContent();
  const items = useMemo(() => content.filter(item => item.type === 'resource' || item.type === 'script').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [content]);
  return <PostList title="배포 자료" icon="🎁" items={items} emptyMessage="등록된 배포 자료가 없습니다." />;
}
