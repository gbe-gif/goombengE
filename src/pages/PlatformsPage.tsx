import StoryLinks from '../components/StoryLinks';
import StoryTabs from '../components/StoryTabs';
import Thumbnail from '../components/Thumbnail';
import { useMemo } from 'react';
import { useContent } from '../hooks/useContent';
import { useSettings } from '../hooks/useSettings';
import { Link } from 'react-router-dom';

export default function PlatformsPage() {
  const { content, loading, error } = useContent();
  const { memos } = useSettings();

  const works = useMemo(() => {
    return content.filter(item => item.type === 'work').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [content]);

  const worksByPlatform = useMemo(() => {
    const map = new Map<string, typeof works>();
    works.forEach(work => {
      const platforms = work.platform ? work.platform.split(',').map(s => s.trim().split(' ')[0]).filter(Boolean) : ['기타'];
      platforms.forEach(platform => {
        if (!map.has(platform)) map.set(platform, []);
        if (!map.get(platform)!.find(w => w.id === work.id)) {
          map.get(platform)!.push(work);
        }
      });
    });
    return map;
  }, [works]);

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
        {memos['platforms'] || '\u00A0'}
      </div>

      {worksByPlatform.size === 0 ? (
        <p className="text-center py-12 text-[#C0C4CC]/50">등록된 스토리가 없습니다.</p>
      ) : (
        <div className="space-y-16">
          {Array.from(worksByPlatform.entries()).map(([platform, platformWorks]) => (
            <section key={platform}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
                {platform}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {platformWorks.map(work => (
                  <div key={work.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors flex flex-col group">
                     <Link to={`/post/${work.id}`} className="block relative aspect-[2/3] bg-black/40 overflow-hidden">
                      <Thumbnail src={work.imageUrl} alt={work.name} />
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        <Link to={`/post/${work.id}`} className="hover:text-blue-400 transition-colors">{work.name}</Link>
                      </h3>
                      {work.isVisible !== true && <span className="text-xs text-amber-300 mb-3">비공개 · 관리자 전용</span>}
                      <StoryLinks item={work} compact />
                      {work.excerpt && <p className="text-[#C0C4CC]/80 text-sm line-clamp-2 mb-4 flex-1">{work.excerpt}</p>}

                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
