import { useState, useMemo } from 'react';
import { useContent } from '../hooks/useContent';
import { ArchiveItem } from '../data/mockData';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import clsx from 'clsx';

export default function WorksPage() {
  const { content } = useContent();
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const works = useMemo(() => {
    return content.filter(item => item.type === 'work').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [content]);

  const platforms = useMemo(() => Array.from(new Set(works.map(w => w.platform).filter(Boolean))), [works]);
  const genres = useMemo(() => Array.from(new Set(works.map(w => w.genre).filter(Boolean))), [works]);
  const statuses = useMemo(() => Array.from(new Set(works.map(w => w.status).filter(Boolean))), [works]);

  const filteredWorks = useMemo(() => {
    return works.filter(work => {
      const matchPlatform = platformFilter === 'all' || work.platform === platformFilter;
      const matchGenre = genreFilter === 'all' || work.genre === genreFilter;
      const matchStatus = statusFilter === 'all' || work.status === statusFilter;
      return matchPlatform && matchGenre && matchStatus;
    });
  }, [works, platformFilter, genreFilter, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
        <span className="text-4xl">🔎</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">전체 작품</h1>
      </div>

      {works.length === 0 ? (
        <p className="text-center py-12 text-[#C0C4CC]/50">등록된 작품이 없습니다.</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 mb-8 bg-white/5 p-4 rounded-2xl border border-white/10">
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="bg-[#12182B] border border-white/10 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500/50 transition-colors"
            >
              <option value="all">모든 플랫폼</option>
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="bg-[#12182B] border border-white/10 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500/50 transition-colors"
            >
              <option value="all">모든 장르</option>
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#12182B] border border-white/10 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500/50 transition-colors"
            >
              <option value="all">모든 연재 상태</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map(work => (
              <div key={work.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group flex flex-col">
                <Link to={`/post/${work.id}`} className="block relative aspect-video bg-black/40 overflow-hidden">
                  {work.imageUrl ? (
                    <img src={work.imageUrl} alt={work.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#C0C4CC]/30 font-bold text-2xl">{work.name}</div>
                  )}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {work.platform && <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-xs font-medium text-white border border-white/10">{work.platform}</span>}
                    {work.status && <span className="px-2 py-1 bg-blue-500/80 backdrop-blur-md rounded-md text-xs font-medium text-white border border-blue-400/30">{work.status}</span>}
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white line-clamp-1">
                      <Link to={`/post/${work.id}`} className="hover:text-blue-400 transition-colors">{work.name}</Link>
                    </h3>
                  </div>
                  {work.genre && <p className="text-sm text-[#C0C4CC]/60 mb-3">{work.genre}</p>}
                  {work.excerpt && <p className="text-[#C0C4CC]/80 text-sm line-clamp-2 flex-1 mb-4">{work.excerpt}</p>}
                  
                  {work.link && (
                    <a href={work.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 mt-auto bg-blue-500/10 px-4 py-2 rounded-lg justify-center transition-colors">
                      보러 가기 <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
            {filteredWorks.length === 0 && <p className="col-span-full text-center py-12 text-[#C0C4CC]/50">조건에 맞는 작품이 없습니다.</p>}
          </div>
        </>
      )}
    </div>
  );
}
