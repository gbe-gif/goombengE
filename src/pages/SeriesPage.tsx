import { Link, useSearchParams } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { useAuth } from '../hooks/useAuth';
import { groupStoriesBySeries, normalizeSeriesName, seriesUrl } from '../utils/series';
import StoryTabs from '../components/StoryTabs';
import SeriesShelf from '../components/SeriesShelf';
import { ArrowRight } from 'lucide-react';

export default function SeriesPage() {
  const { content, loading, error } = useContent();
  const { isAdmin } = useAuth();
  const [params] = useSearchParams();
  const selected = normalizeSeriesName(params.get('name') || '');
  const groups = groupStoriesBySeries(content, isAdmin);
  const visibleGroups = selected ? [...groups.entries()].filter(([name]) => name === selected) : [...groups.entries()];
  return <div className="max-w-7xl mx-auto space-y-8">
    <header className="border-b border-white/10 pb-6 space-y-5"><h1 className="text-3xl sm:text-4xl font-bold text-white">📚 스토리 시리즈</h1><StoryTabs /></header>
    <p className="text-slate-300 text-sm">같은 세계관과 등장인물로 이어지는 스토리를 시리즈별로 모았습니다.</p>
    {selected && <div className="flex flex-wrap items-center gap-4"><h2 className="text-xl font-semibold text-white">{selected}</h2><Link to="/series" className="browse-link">전체 시리즈 보기 <ArrowRight size={16} /></Link></div>}
    {loading ? <p role="status" className="text-center py-12">시리즈를 불러오는 중입니다…</p> : error ? <p role="alert" className="text-amber-300 py-12">{error}</p> : visibleGroups.length ?
      visibleGroups.map(([name, stories]) => <section key={name} className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-5"><div><h2 className="text-xl font-semibold text-white"><Link to={seriesUrl(name)}>{name}</Link></h2><p className="text-sm text-slate-400 mt-1">스토리 {stories.length}개</p></div>
          {!selected && <Link to={seriesUrl(name)} className="browse-link">시리즈 보기 <ArrowRight size={16} /></Link>}
        </div><SeriesShelf items={stories} />
      </section>) : <div className="text-center py-12 text-slate-400"><p>{selected ? '공개된 스토리가 있는 시리즈를 찾을 수 없습니다.' : '아직 등록된 시리즈가 없습니다.'}</p>
        {isAdmin && <Link to="/admin" className="browse-link mt-4">스토리 편집에서 시리즈를 지정해 주세요 <ArrowRight size={16} /></Link>}
      </div>}
  </div>;
}
