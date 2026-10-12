import { Link } from 'react-router-dom';
import { EyeOff, ArrowUpRight } from 'lucide-react';
import { ArchiveItem } from '../data/mockData';
import { formatKST } from '../lib/formatDate';
import { getCategoryLabel } from '../utils/category';
import Thumbnail from './Thumbnail';
export default function ContentCard({ item }: { item: ArchiveItem }) {
  return <Link to={`/post/${item.id}`} className="content-card group">
    <div className="aspect-[2/3] shrink-0 w-20 sm:w-24 rounded-xl bg-black/20 overflow-hidden"><Thumbnail src={item.imageUrl} alt={item.name} /></div>
    <div className="min-w-0 flex-1 flex flex-col items-start">
      <span className="text-xs text-blue-200 mb-2">{getCategoryLabel(item.type)}</span>
      {item.isVisible !== true && <span className="text-xs text-amber-300 flex items-center gap-1 mb-2"><EyeOff size={12} /> 비공개 · 관리자에게만 표시</span>}
      <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2 group-hover:text-blue-200">{item.name}</h3>
      {item.excerpt && <p className="text-sm text-slate-300 line-clamp-2 mt-2 leading-relaxed">{item.excerpt}</p>}
      <span className="text-xs text-slate-400 mt-auto pt-3">{formatKST(item.updatedAt || item.date)}</span>
    </div><ArrowUpRight size={16} className="shrink-0 text-slate-400" />
  </Link>;
}
