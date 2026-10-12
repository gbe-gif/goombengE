import { Link } from 'react-router-dom';
import { ArchiveItem } from '../data/mockData';
import Thumbnail from './Thumbnail';

export default function SeriesShelf({ items, currentId }: { items: ArchiveItem[]; currentId?: string }) {
  return <div className="flex gap-4 overflow-x-auto pb-3 snap-x" tabIndex={0} role="region" aria-label="시리즈 스토리 썸네일">
    {items.map(item => <Link key={item.id} to={`/post/${item.id}`} aria-current={item.id === currentId ? 'page' : undefined}
      className={`w-28 sm:w-36 shrink-0 snap-start rounded-xl border bg-white/5 overflow-hidden transition-colors hover:border-blue-300 ${item.id === currentId ? 'border-blue-300' : 'border-white/10'}`}>
      <div className="aspect-[2/3] bg-black/20"><Thumbnail src={item.imageUrl} alt={item.name} /></div>
      <div className="p-3"><h3 className="text-sm text-white font-medium line-clamp-2">{item.name}</h3>
        {item.id === currentId && <p className="text-xs text-blue-200 mt-2">현재 스토리</p>}
        {item.isVisible !== true && <p className="text-xs text-amber-300 mt-2">비공개 · 관리자 전용</p>}
      </div>
    </Link>)}
  </div>;
}
