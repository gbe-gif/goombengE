import { useState, useMemo, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import { ArchiveItem } from '../data/mockData';
import { Link, useSearchParams } from 'react-router-dom';
import { ExternalLink, Hash, X } from 'lucide-react';
import clsx from 'clsx';

export default function WorksPage() {
  const { content } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPlatform = searchParams.get('platform') || 'all';
  const selectedGenre = searchParams.get('genre') || 'all';
  const selectedStatus = searchParams.get('status') || 'all';
  const selectedTag = searchParams.get('tag');

  const works = useMemo(() => {
    return content.filter(item => item.type === 'work').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [content]);

  const platforms = useMemo(() => Array.from(new Set(works.flatMap(w => w.platform ? w.platform.split(',').map(s => s.trim()) : []).filter(Boolean))), [works]);
  const genres = useMemo(() => Array.from(new Set(works.map(w => w.genre).filter(Boolean))), [works]);
  const statuses = useMemo(() => Array.from(new Set(works.map(w => w.status).filter(Boolean))), [works]);

  const filteredStories = useMemo(() => {
    return works.filter(work => {
      const workPlatforms = work.platform ? work.platform.split(',').map(s => s.trim()) : [];
      const matchPlatform = selectedPlatform === 'all' || workPlatforms.includes(selectedPlatform);
      const matchGenre = selectedGenre === 'all' || work.genre === selectedGenre;
      const matchStatus = selectedStatus === 'all' || work.status === selectedStatus;
      const matchTag = !selectedTag || (work.tags && work.tags.includes(selectedTag));
      return matchPlatform && matchGenre && matchStatus && matchTag;
    });
  }, [works, selectedPlatform, selectedGenre, selectedStatus, selectedTag]);

  const handleClearTag = () => {
    searchParams.delete('tag');
    setSearchParams(searchParams);
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchParams(prev => {
      prev.set('tag', tag);
      return prev;
    });
  };

  const setPlatformFilter = (val: string) => {
    setSearchParams(prev => {
      if (val === 'all') prev.delete('platform');
      else prev.set('platform', val);
      return prev;
    });
  };

  const setGenreFilter = (val: string) => {
    setSearchParams(prev => {
      if (val === 'all') prev.delete('genre');
      else prev.set('genre', val);
      return prev;
    });
  };

  const setStatusFilter = (val: string) => {
    setSearchParams(prev => {
      if (val === 'all') prev.delete('status');
      else prev.set('status', val);
      return prev;
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">📖</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Stories</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/works" className="text-blue-400 font-bold border-b-2 border-blue-400 pb-1">전체 스토리</Link>
            <Link to="/platforms" className="text-[#C0C4CC]/60 hover:text-white pb-1 transition-colors">플랫폼별 스토리</Link>
          </div>
        </div>
        {selectedTag && (
          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
            <span className="text-blue-400 font-medium flex items-center">
              <Hash size={16} className="mr-1" />
              {selectedTag}
            </span>
            <button onClick={handleClearTag} className="text-[#C0C4CC]/60 hover:text-white p-1 rounded-full transition-colors">
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {works.length === 0 ? (
        <p className="text-center py-12 text-[#C0C4CC]/50">등록된 스토리가 없습니다.</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 mb-8 bg-white/5 p-4 rounded-2xl border border-white/10">
            <select
              value={selectedPlatform}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="bg-[#12182B] border border-white/10 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500/50 transition-colors"
            >
              <option value="all">모든 플랫폼</option>
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select
              value={selectedGenre}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="bg-[#12182B] border border-white/10 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500/50 transition-colors"
            >
              <option value="all">모든 장르</option>
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#12182B] border border-white/10 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500/50 transition-colors"
            >
              <option value="all">모든 연재 상태</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map(work => (
              <div key={work.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group flex flex-col">
                <Link to={`/post/${work.id}`} className="block relative aspect-square bg-black/40 overflow-hidden">
                  {work.imageUrl ? (
                    <img src={work.imageUrl} alt={work.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#C0C4CC]/30 font-bold text-2xl p-6 text-center break-words">{work.name}</div>
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
                  
                  {work.tags && work.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {work.tags.map(tag => (
                        <button
                          key={tag}
                          onClick={(e) => handleTagClick(tag, e)}
                          className="text-xs text-blue-400/80 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-300 px-2 py-1 rounded-md transition-colors"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}

                  {work.link && (
                    <a href={work.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 mt-auto bg-blue-500/10 px-4 py-2 rounded-lg justify-center transition-colors">
                      보러 가기 <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
            {filteredStories.length === 0 && <p className="col-span-full text-center py-12 text-[#C0C4CC]/50">조건에 맞는 스토리가 없습니다.</p>}
          </div>
        </>
      )}
    </div>
  );
}
