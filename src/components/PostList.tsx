import ContentCard from './ContentCard';
import { ArchiveItem } from '../data/mockData';
import { useSettings } from '../hooks/useSettings';

interface PostListProps {
  title: string;
  icon: string;
  items: ArchiveItem[];
  emptyMessage?: string;
  categoryId?: string;
}

export default function PostList({ title, icon, items, emptyMessage = "등록된 글이 없습니다.", categoryId }: PostListProps) {
  const { memos } = useSettings();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
        <span className="text-4xl">{icon}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h1>
      </div>

      {categoryId && (
        <div className="mb-10 min-h-[3.5rem] bg-white/5 border border-white/10 rounded-xl p-5 text-sm text-[#C0C4CC]/80 whitespace-pre-wrap leading-relaxed shadow-lg shadow-black/20">
          {memos[categoryId] || '\u00A0'}
        </div>
      )}
      <div className="space-y-4">
        {items.length === 0 ? <p className="text-center py-12 text-slate-400">{emptyMessage}</p> : items.map(item => <ContentCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}
