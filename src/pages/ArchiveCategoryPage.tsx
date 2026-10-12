import Thumbnail from '../components/Thumbnail';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { useSettings } from '../hooks/useSettings';
import { ArchiveItem } from '../data/mockData';
import { useMemo } from 'react';
import { Image as ImageIcon, FileText, Database, ArrowLeft } from 'lucide-react';

export default function ArchiveCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { content, loading, error } = useContent();
  const { memos } = useSettings();

  const { title, icon, items, type } = useMemo(() => {
    let t = '';
    let i = <></>;
    let ty = '';
    if (category === 'image') {
      t = '이미지 아카이브';
      i = <ImageIcon className="text-blue-400" size={32} />;
      ty = 'image';
    } else if (category === 'worldview') {
      t = '세계관 설정';
      i = <FileText className="text-purple-400" size={32} />;
      ty = 'worldview';
    } else if (category === 'log') {
      t = '테스트 기록';
      i = <Database className="text-emerald-400" size={32} />;
      ty = 'log';
    }

    const itms = content.filter(item => item.type === ty).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return { title: t, icon: i, items: itms, type: ty };
  }, [category, content]);

  if (!type) return <div className="text-center py-20">잘못된 카테고리입니다.</div>;

  if (loading) return <p role="status" className="text-center py-20">글을 불러오는 중입니다…</p>;
  if (error) return <p role="alert" className="text-center py-20 text-amber-200">{error}</p>;

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
      {type && (
        <div className="mb-10 min-h-[3.5rem] bg-white/5 border border-white/10 rounded-xl p-5 text-sm text-[#C0C4CC]/80 whitespace-pre-wrap leading-relaxed shadow-lg shadow-black/20">
          {memos[type] || '\u00A0'}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {items.map(item => (
          <Link 
            key={item.id} 
            to={`/post/${item.id}`}
            className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="aspect-[2/3] overflow-hidden bg-black/40 relative">
              <Thumbnail src={item.imageUrl} alt={item.name} />
            </div>
            <div className="p-4">
              {item.isVisible !== true && <span className="block text-xs text-amber-300 mb-2">비공개 · 관리자 전용</span>}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-white/50 bg-white/10 px-2 py-1 rounded-md">{item.code || item.type.substring(0, 1).toUpperCase()}</span>
              </div>
              <h3 className="text-sm md:text-base font-medium text-white line-clamp-2">{item.name}</h3>
            </div>
          </Link>
        ))}
      </div>
      {items.length === 0 && <p className="text-center py-12 text-[#C0C4CC]/50">등록된 항목이 없습니다.</p>}
    </div>
  );
}
