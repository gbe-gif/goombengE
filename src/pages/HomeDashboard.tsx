import LatestSlideshow from '../components/LatestSlideshow';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import ContentCard from '../components/ContentCard';
import Thumbnail from '../components/Thumbnail';
import { ArchiveItem } from '../data/mockData';
const destinations = [
  { to: '/works', icon: '📖', title: '스토리', description: '스토리 소개와 플랫폼 바로가기' },
  { to: '/archive/image', icon: '🖼️', title: '이미지', description: '캐릭터 이미지와 공유 자료' },
  { to: '/resources', icon: '🎁', title: '자료실', description: '스크립트와 다운로드 자료' },
  { to: '/archive', icon: '🗃️', title: '아카이브', description: '세계관 설정과 테스트 기록' },
  { to: '/ooc', icon: '🎲', title: 'OOC 놀이터', description: 'OOC 글을 둘러보고 복사하기' },
  { to: '/notice', icon: '📢', title: '공지', description: '새 소식과 이용 안내' },
];
function Section({ title, description, to, items }: { title: string; description: string; to?: string; items: ArchiveItem[] }) {
  if (!items.length) return null;
  return <section><div className="section-heading"><div><h2>{title}</h2><p>{description}</p></div>
    {to && <Link to={to} className="browse-link">전체 보기 <ArrowRight size={16} /></Link>}
    </div><div className="grid md:grid-cols-2 gap-4">{items.map(item => <ContentCard key={item.id} item={item} />)}</div></section>;
}
export default function HomeDashboard() {
  const { content, loading, error } = useContent();
  const works = content.filter(item => item.type === 'work').slice(0, 4);
  const images = content.filter(item => item.type === 'image').slice(0, 6);
  const notices = content.filter(item => item.type === 'notice').slice(0, 2);
  const pinned = content.filter(item => item.isPinned);
  const latest = content.filter(item => !item.isPinned && item.type !== 'notice').slice(0, 6);
  const updated = content.filter(item => item.updatedAt && !item.isPinned).sort((a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime()).slice(0, 4);
  return <div className="space-y-12">
    <LatestSlideshow items={content} loading={loading} />
    <nav aria-label="콘텐츠 바로가기" className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {destinations.map(destination => <Link key={destination.to} to={destination.to} className="destination-card group">
        <span className="text-2xl" aria-hidden="true">{destination.icon}</span><div><h2 className="font-semibold text-white group-hover:text-blue-200">{destination.title}</h2><p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">{destination.description}</p></div><ArrowRight size={16} className="hidden sm:block ml-auto text-slate-400 shrink-0" />
      </Link>)}
    </nav>
    {loading ? <p role="status" className="text-center text-slate-300 py-8">창고의 글을 불러오는 중입니다…</p> : error ? <p role="alert" className="text-center text-amber-200 py-8">{error}</p> : <>
      <Section title="공지와 안내" description="방문 전에 확인할 소식" to="/notice" items={notices} />
      <Section title="먼저 만나보세요" description="창고에 고정해 둔 글" items={pinned} />
      <Section title="스토리 둘러보기" description="소개를 읽고 스토리가 있는 플랫폼으로 이동하세요." to="/works" items={works} />
      {images.length > 0 && <section><div className="section-heading"><div><h2>이미지 모아보기</h2><p>표지를 누르면 이미지와 관련 글을 볼 수 있어요.</p></div><Link to="/archive/image" className="browse-link">전체 보기 <ArrowRight size={16} /></Link></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">{images.map(item => <Link key={item.id} to={`/post/${item.id}`} className="image-tile group"><div className="aspect-[2/3] bg-black/20"><Thumbnail src={item.imageUrl} alt={item.name} /></div><h3 className="p-3 text-sm text-white line-clamp-2 group-hover:text-blue-200">{item.name}</h3>{item.isVisible !== true && <span className="block px-3 pb-3 text-xs text-amber-300">비공개 · 관리자 전용</span>}</Link>)}</div>
      </section>}
      <Section title="새로 들어온 글" description="최근 등록한 스토리와 자료" items={latest} />
      <Section title="최근 업데이트" description="새로운 내용을 더한 글" items={updated} />
      {content.length === 0 && <p className="text-center text-slate-400 py-8">아직 공개된 글이 없습니다.</p>}
    </>}
  </div>;
}
