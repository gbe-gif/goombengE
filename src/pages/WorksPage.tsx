import StoryLinks from '../components/StoryLinks';
import { compareSeriesStories, normalizeSeriesName, seriesUrl } from '../utils/series';
import StoryTabs from '../components/StoryTabs';
import Thumbnail from '../components/Thumbnail';
import { useState, useMemo, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import { useSettings } from '../hooks/useSettings';
import { ArchiveItem } from '../data/mockData';
import { Link, useSearchParams } from 'react-router-dom';
import { Hash, X } from 'lucide-react';
import clsx from 'clsx';

export default function WorksPage() {
  const { content, loading, error } = useContent();
  const { memos } = useSettings();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPlatform = searchParams.get('platform') || 'all';
  const selectedGenre = searchParams.get('genre') || 'all';
  const selectedStatus = searchParams.get('status') || 'all';
  const selectedSeries = normalizeSeriesName(searchParams.get('series') || '');
  const selectedTag = searchParams.get('tag');

  const works = useMemo(() => {
    return content.filter(item => item.type === 'work').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [content]);

  const platforms = useMemo(() => Array.from(new Set(works.flatMap(w => w.platform ? w.platform.split(',').map(s => s.trim().split(' ')[0]) : []).filter(Boolean))), [works]);
  const genres = useMemo(() => Array.from(new Set(works.map(w => w.genre).filter(Boolean))), [works]);
  const statuses = useMemo(() => Array.from(new Set(works.map(w => w.status).filter(Boolean))), [works]);
  const seriesNames = useMemo(() => Array.from(new Set(works.map(w => normalizeSeriesName(w.seriesName)).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'ko')), [works]);

  const filteredStories = useMemo(() => {
    const filtered = works.filter(work => {
      const workPlatforms = work.platform ? work.platform.split(',').map(s => s.trim().split(' ')[0]) : [];
      const matchPlatform = selectedPlatform === 'all' || workPlatforms.includes(selectedPlatform);
      const matchGenre = selectedGenre === 'all' || work.genre === selectedGenre;
      const matchStatus = selectedStatus === 'all' || work.status === selectedStatus;
      const matchSeries = !selectedSeries || normalizeSeriesName(work.seriesName) === selectedSeries;
      const matchTag = !selectedTag || (work.tags && work.tags.includes(selectedTag));
      return matchPlatform && matchGenre && matchStatus && matchSeries && matchTag;
    });
    return selectedSeries ? filtered.sort(compareSeriesStories) : filtered;
  }, [works, selectedPlatform, selectedGenre, selectedStatus, selectedSeries, selectedTag]);

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

  const setSeriesFilter = (val: string) => {
    setSearchParams(prev => {
      if (!val) prev.delete('series');
      else prev.set('series', val);
      return prev;
    });
  };

  if (loading) return <p role="status" className="text-center py-20">글을 불러오는 중입니다…</p>;
  if (error) return <p role="alert" className="text-center py-20 text-amber-200">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-white/10 pb-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">📖</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">스토리</h1>
          </div>
          <StoryTabs />
        </div>
      </div>
      <div className="mb-10 min-h-[3.5rem] bg-white/5 border border-white/10 rounded-xl p-5 text-sm text-[#C0C4CC]/80 whitespace-pre-wrap leading-relaxed shadow-lg shadow-black/20">
        {memos['work'] || '스토리 소개를 읽거나, 사이트 이동 버튼으로 스토리가 있는 플랫폼을 바로 방문하세요.'}
      </div>
      <div>
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
            <select aria-label="플랫폼 필터"
              value={selectedPlatform}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="bg-[#12182B] border border-white/10 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500/50 transition-colors"
            >
              <option value="all">모든 플랫폼</option>
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select aria-label="장르 필터"
              value={selectedGenre}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="bg-[#12182B] border border-white/10 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500/50 transition-colors"
            >
              <option value="all">모든 장르</option>
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select aria-label="연재 상태 필터"
              value={selectedStatus}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#12182B] border border-white/10 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500/50 transition-colors"
            >
              <option value="all">모든 연재 상태</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select aria-label="시리즈 필터"
              value={selectedSeries}
              onChange={(e) => setSeriesFilter(e.target.value)}
              className="bg-[#12182B] border border-white/10 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500/50 transition-colors max-w-full"
            >
              <option value="">모든 시리즈</option>
              {selectedSeries && !seriesNames.includes(selectedSeries) && <option value={selectedSeries}>{selectedSeries}</option>}
              {seriesNames.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>

          <div className="flex items-center justify-between mb-5 text-sm text-slate-300">
            <p>스토리 {filteredStories.length}개</p>
            {(selectedPlatform !== 'all' || selectedGenre !== 'all' || selectedStatus !== 'all' || selectedSeries || selectedTag) && <button onClick={() => setSearchParams({})} className="text-blue-200 hover:underline">필터 초기화</button>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStories.map(work => (
              <div key={work.id} className="story-card bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group flex flex-col">
                <Link to={`/post/${work.id}`} className="story-cover block relative aspect-[2/3] bg-black/40 overflow-hidden">
                  <Thumbnail src={work.imageUrl} alt={work.name} />
                </Link>
                <div className="story-card-content p-5 flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white line-clamp-2">
                      <Link to={`/post/${work.id}`} className="hover:text-blue-400 transition-colors">{work.name}</Link>
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3 text-xs text-slate-300">
                    {work.platform && <span className="px-2 py-1 rounded bg-white/10">{work.platform}</span>}
                    {work.status && <span className="px-2 py-1 rounded bg-blue-500/20">{work.status}</span>}
                    {work.isVisible !== true && <span className="px-2 py-1 text-amber-300">비공개 · 관리자 전용</span>}
                  </div>
                  {normalizeSeriesName(work.seriesName) && <Link to={seriesUrl(work.seriesName!)} className="text-xs text-blue-200 mb-3 hover:underline">📚 {normalizeSeriesName(work.seriesName)}</Link>}
                  <StoryLinks item={work} compact />
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
