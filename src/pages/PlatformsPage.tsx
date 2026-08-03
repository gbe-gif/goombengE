import { useMemo } from 'react';
import { useContent } from '../hooks/useContent';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

export default function PlatformsPage() {
  const { content } = useContent();

  const works = useMemo(() => {
    return content.filter(item => item.type === 'work').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [content]);

  const worksByPlatform = useMemo(() => {
    const map = new Map<string, typeof works>();
    works.forEach(work => {
      const platform = work.platform || '기타';
      if (!map.has(platform)) map.set(platform, []);
      map.get(platform)!.push(work);
    });
    return map;
  }, [works]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">📖</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Works</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/works" className="text-[#C0C4CC]/60 hover:text-white pb-1 transition-colors">전체 작품</Link>
            <Link to="/platforms" className="text-blue-400 font-bold border-b-2 border-blue-400 pb-1">플랫폼별 작품</Link>
          </div>
        </div>
      </div>

      {worksByPlatform.size === 0 ? (
        <p className="text-center py-12 text-[#C0C4CC]/50">등록된 작품이 없습니다.</p>
      ) : (
        <div className="space-y-16">
          {Array.from(worksByPlatform.entries()).map(([platform, platformWorks]) => (
            <section key={platform}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
                {platform}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platformWorks.map(work => (
                  <div key={work.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors flex flex-col group">
                     <Link to={`/post/${work.id}`} className="block relative aspect-square bg-black/40 overflow-hidden">
                      {work.imageUrl ? (
                        <img src={work.imageUrl} alt={work.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#C0C4CC]/30 font-bold text-2xl">{work.name}</div>
                      )}
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        <Link to={`/post/${work.id}`} className="hover:text-blue-400 transition-colors">{work.name}</Link>
                      </h3>
                      {work.excerpt && <p className="text-[#C0C4CC]/80 text-sm line-clamp-2 mb-4 flex-1">{work.excerpt}</p>}
                      {work.link && (
                        <a href={work.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg justify-center mt-auto">
                          {platform}에서 보기 <ExternalLink size={16} />
                        </a>
                      )}
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
