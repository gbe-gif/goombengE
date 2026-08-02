import { useParams, Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { ArchiveItem } from '../data/mockData';
import { useMemo } from 'react';
import { Image as ImageIcon, FileText, Database, ArrowLeft } from 'lucide-react';

export default function ArchiveCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { content } = useContent();

  const { title, icon, items, type } = useMemo(() => {
    let t = '';
    let i = <></>;
    let ty = '';
    if (category === 'image') {
      t = 'Category I: Image Archive';
      i = <ImageIcon className="text-blue-400" size={32} />;
      ty = 'image';
    } else if (category === 'worldview') {
      t = 'Category W: Worldview';
      i = <FileText className="text-purple-400" size={32} />;
      ty = 'worldview';
    } else if (category === 'log') {
      t = 'Category L: Test Logs';
      i = <Database className="text-emerald-400" size={32} />;
      ty = 'log';
    }

    const itms = content.filter(item => item.type === ty).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return { title: t, icon: i, items: itms, type: ty };
  }, [category, content]);

  if (!type) return <div className="text-center py-20">잘못된 카테고리입니다.</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <Link to="/archive" className="inline-flex items-center gap-2 text-[#C0C4CC]/60 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={20} />
        Archive 돌아가기
      </Link>
      
      <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
        {icon}
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {items.map(item => (
          <Link 
            key={item.id} 
            to={`/post/${item.id}`}
            className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="aspect-square overflow-hidden bg-black/40 relative">
              <img 
                src={item.imageUrl || `https://dummyimage.com/400x400/0B1021/10B981&text=${item.code || 'IMG'}`} 
                alt={item.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-white/50 bg-white/10 px-2 py-1 rounded-md">{item.code || item.type.substring(0, 1).toUpperCase()}</span>
              </div>
              <h3 className="text-sm md:text-base font-medium text-white truncate">{item.name}</h3>
            </div>
          </Link>
        ))}
      </div>
      {items.length === 0 && <p className="text-center py-12 text-[#C0C4CC]/50">등록된 항목이 없습니다.</p>}
    </div>
  );
}
