import { ArchiveItem } from '../data/mockData';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import clsx from 'clsx';
import { EyeOff } from 'lucide-react';

interface PostListProps {
  title: string;
  icon: string;
  items: ArchiveItem[];
  emptyMessage?: string;
}

export default function PostList({ title, icon, items, emptyMessage = "등록된 글이 없습니다." }: PostListProps) {
  const { isAdmin } = useAuth();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
        <span className="text-4xl">{icon}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h1>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-center py-12 text-[#C0C4CC]/50">{emptyMessage}</p>
        ) : (
          items.map(item => (
            <Link 
              key={item.id}
              to={`/post/${item.id}`}
              className={clsx(
                "block p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all shadow-lg shadow-black/20",
                item.isVisible === false && !isAdmin ? "hidden" : "",
                item.isVisible === false && isAdmin ? "opacity-50 grayscale" : ""
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-black/40 rounded-md text-xs font-medium text-[#C0C4CC]/80 uppercase">
                    {item.type}
                  </span>
                  {item.isVisible === false && (
                    <span className="flex items-center gap-1 text-red-400 text-xs font-medium bg-red-400/10 px-2 py-1 rounded-md">
                      <EyeOff size={12} /> 비공개
                    </span>
                  )}
                </div>
                <span className="text-sm text-[#C0C4CC]/60 font-mono">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
              {item.excerpt && (
                <p className="text-[#C0C4CC]/80 text-sm line-clamp-2">{item.excerpt}</p>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
