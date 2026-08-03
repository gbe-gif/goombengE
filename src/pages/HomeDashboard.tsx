import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { useMemo } from 'react';
import { ArchiveItem } from '../data/mockData';
import { ChevronRight } from 'lucide-react';
import { formatKST } from '../lib/formatDate';
import { getCategoryLabel } from '../utils/category';

function PostItem({ item }: { item: ArchiveItem }) {
  return (
    <Link 
      to={`/post/${item.id}`}
      className="flex p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all shadow-lg shadow-black/20 gap-4 group"
    >
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center mb-2">
          <span className="text-[10px] px-2 py-0.5 bg-black/40 rounded-md text-[#C0C4CC]/80 uppercase">{getCategoryLabel(item.type)}</span>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-white mb-1 line-clamp-1 group-hover:text-blue-300 transition-colors">{item.name}</h3>
        <span className="text-xs text-[#C0C4CC]/60 font-mono mb-2">{formatKST(item.updatedAt || item.date)}</span>
        {item.excerpt && <p className="text-xs sm:text-sm text-[#C0C4CC]/80 line-clamp-2 mt-auto">{item.excerpt}</p>}
      </div>
      {item.imageUrl && (
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-black/40 border border-white/5">
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
        </div>
      )}
    </Link>
  );
}

function NoticeItem({ item }: { item: ArchiveItem }) {
  return (
    <Link 
      to={`/post/${item.id}`}
      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-white/10 hover:bg-white/5 transition-colors gap-2"
    >
      <h3 className="text-base font-medium text-white hover:text-blue-300 transition-colors line-clamp-1">{item.name}</h3>
      <span className="text-sm text-[#C0C4CC]/60 font-mono whitespace-nowrap shrink-0">{formatKST(item.date)}</span>
    </Link>
  );
}

export default function HomeDashboard() {
  const { content } = useContent();

  const notices = useMemo(() => {
    return content.filter(item => item.type === 'notice').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  }, [content]);

  const pinned = useMemo(() => {
    return content.filter(item => item.isPinned).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [content]);

  const latest = useMemo(() => {
    return content.filter(item => !item.isPinned).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 2);
  }, [content]);

  const updated = useMemo(() => {
    return content
      .filter(item => item.updatedAt && !item.isPinned) // Only items that have been updated
      .sort((a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime())
      .slice(0, 2);
  }, [content]);

  return (
    <div className="space-y-16">
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-3xl">📢</span> Notice
          </h2>
          <Link to="/notice" className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            더보기 <ChevronRight size={16} />
          </Link>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {notices.map(item => (
            <NoticeItem key={item.id} item={item} />
          ))}
          {notices.length === 0 && <p className="text-[#C0C4CC]/50 p-6 text-center">등록된 공지사항이 없습니다.</p>}
        </div>
      </section>

      {pinned.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">⭐</span> Pinned
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinned.map(item => (
              <PostItem key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-3xl">💡</span> Latest
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latest.map(item => (
            <PostItem key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-3xl">🔥</span> Updated
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {updated.map(item => (
            <PostItem key={item.id} item={item} />
          ))}
          {updated.length === 0 && <p className="text-[#C0C4CC]/50 py-4 col-span-full text-center">최근 수정된 글이 없습니다.</p>}
        </div>
      </section>
    </div>
  );
}
