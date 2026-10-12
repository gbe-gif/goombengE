import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ArchiveItem } from '../data/mockData';
import { getCategoryLabel } from '../utils/category';
import Thumbnail from './Thumbnail';

export default function LatestSlideshow({ items, loading }: { items: ArchiveItem[]; loading: boolean }) {
  const slides = items.filter(item => item.isVisible === true)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  const signature = slides.map(item => item.id).join(',');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const interacting = hovered || focused;
  const [hidden, setHidden] = useState(document.hidden);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updateMotion();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);
  useEffect(() => setIndex(0), [signature]);
  useEffect(() => {
    if (slides.length < 2 || paused || interacting || hidden || reducedMotion) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [signature, slides.length, paused, interacting, hidden, reducedMotion, index]);
  const slide = slides[index % slides.length];
  const move = (direction: number) => setIndex(current => (current + direction + slides.length) % slides.length);

  if (!slide) return <section className="home-intro"><div>
    <p className="text-xs tracking-[0.18em] text-blue-200 mb-4">게으른굼벵이의 창고</p>
    <h1 className="text-3xl sm:text-4xl font-bold text-white">스토리와 기록을 둘러보세요.</h1>
    <p className="mt-4 text-slate-300">{loading ? '최신 글을 불러오는 중입니다…' : '아래 카테고리에서 궁금한 곳부터 둘러보세요.'}</p>
    <Link to="/works" className="primary-button mt-6">스토리 둘러보기 <ArrowRight size={18} /></Link>
  </div></section>;

  return <section className="latest-hero" aria-label="최신 공개 글" aria-roledescription="슬라이드쇼"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); } }}>
    <div className="hero-backdrop" key={`backdrop-${slide.id}`} aria-hidden="true"><Thumbnail src={slide.imageUrl} alt="" /></div>
    <div className="hero-shade" aria-hidden="true" />
    <div className="hero-slide" key={slide.id} aria-roledescription="슬라이드" aria-label={`${index % slides.length + 1} / ${slides.length}`}>
      <div className="hero-copy">
        <p className="hero-eyebrow">창고에 새로 들어온 글</p>
        <span className="hero-category">{getCategoryLabel(slide.type)}</span>
        <h1><Link to={`/post/${slide.id}`}>{slide.name}</Link></h1>
        {slide.excerpt && <p className="hero-description">{slide.excerpt}</p>}
        {slide.tags?.length > 0 && <p className="hero-tags">{slide.tags.slice(0, 4).map(tag => `#${tag}`).join(' ')}</p>}
        <Link to={`/post/${slide.id}`} className="primary-button mt-5">자세히 보기 <ArrowRight size={18} /></Link>
      </div>
      <Link to={`/post/${slide.id}`} className="hero-cover" aria-label={`${slide.name} 자세히 보기`}><Thumbnail src={slide.imageUrl} alt={slide.name} /></Link>
    </div>
    <div className="hero-controls">
      <div className="hero-dots" aria-label="슬라이드 선택">{slides.map((item, position) => <button key={item.id} className={position === index % slides.length ? 'is-current' : ''}
        aria-label={`${position + 1}번 글: ${item.name}`} aria-pressed={position === index % slides.length} onClick={() => setIndex(position)}><span /></button>)}</div>
      <div className="hero-navigation"><span className="hero-counter">{index % slides.length + 1} / {slides.length}</span>
        {slides.length > 1 && <><button onClick={() => move(-1)} aria-label="이전 글"><ChevronLeft size={18} /></button>
          {!reducedMotion && <button onClick={() => setPaused(value => !value)} aria-label={paused ? '자동 전환 재생' : '자동 전환 일시정지'}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>}
          <button onClick={() => move(1)} aria-label="다음 글"><ChevronRight size={18} /></button></>}
      </div>
    </div>
  </section>;
}
