import CopyTextButton from '../components/CopyTextButton';
import OocContent from '../components/OocContent';
import StoryLinks from '../components/StoryLinks';
import SeriesShelf from '../components/SeriesShelf';
import { groupStoriesBySeries, normalizeSeriesName, seriesUrl } from '../utils/series';
import { useAuth } from '../hooks/useAuth';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import MarkdownContent from '../components/MarkdownContent';
import { ExternalLink, ArrowLeft, Download } from 'lucide-react';
import { formatKST } from '../lib/formatDate';
import { getCategoryLabel } from '../utils/category';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { content, loading, error } = useContent();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const post = content.find(item => item.id === id);


  if (loading) return <p role="status" className="text-center py-20">글을 불러오는 중입니다…</p>;
  if (error) return <p role="alert" className="text-center py-20 text-amber-200">{error}</p>;

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">게시글을 찾을 수 없습니다.</h2>
        <Link to="/" className="text-blue-400 hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  const seriesName = post.type === 'work' ? normalizeSeriesName(post.seriesName) : '';
  const seriesStories = seriesName ? groupStoriesBySeries(content, isAdmin).get(seriesName) || [] : [];

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8 border-b border-white/10 pb-8">
        <button type="button" onClick={() => { if (window.history.state?.idx > 0) navigate(-1); else navigate('/'); }} className="inline-flex items-center gap-2 text-[#C0C4CC]/60 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={20} />
          뒤로 가기
        </button>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm uppercase tracking-wider font-medium">
            {getCategoryLabel(post.type)}
          </span>
          <span className="text-[#C0C4CC]/60 text-sm">
            작성일: {formatKST(post.date)}
          </span>
          {post.updatedAt && (
            <span className="text-[#C0C4CC]/60 text-sm">
              | 수정일: {formatKST(post.updatedAt)}
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">{post.name}</h1>
        
        {post.excerpt && (
          <p className="text-lg text-[#C0C4CC]/80 mb-6 italic border-l-4 border-blue-500/50 pl-4">{post.excerpt}</p>
        )}

        {post.isVisible !== true && <p className="text-amber-300 text-sm mb-4">비공개 글입니다. 관리자에게만 표시됩니다.</p>}
        {post.type === 'work' && <StoryLinks item={post} />}
        {post.type === 'resource' && post.link && <a href={post.link} target="_blank" rel="noopener noreferrer" className="primary-button">자료 사이트로 이동 <ExternalLink size={18} /></a>}

        {post.type === 'work' && (
          <div className="flex flex-wrap gap-4 mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            {post.platform && (
              <div className="flex flex-col">
                <span className="text-xs text-[#C0C4CC]/60 mb-1">플랫폼</span>
                <span className="text-sm font-medium text-white">{post.platform}</span>
              </div>
            )}
            {post.genre && (
              <div className="flex flex-col">
                <span className="text-xs text-[#C0C4CC]/60 mb-1">장르</span>
                <span className="text-sm font-medium text-white">{post.genre}</span>
              </div>
            )}
            {post.status && (
              <div className="flex flex-col">
                <span className="text-xs text-[#C0C4CC]/60 mb-1">연재 상태</span>
                <span className="text-sm font-medium text-white">{post.status}</span>
              </div>
            )}
          </div>
        )}

        {post.type === 'work' && post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map(tag => (
              <Link
                key={tag}
                to={`/works?tag=${encodeURIComponent(tag)}`}
                className="text-sm text-blue-400/80 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-300 px-3 py-1.5 rounded-md transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {post.type === 'resource' && post.downloadUrl && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div>
              <h3 className="text-lg font-bold text-white">리소스 다운로드</h3>
              {post.version && <p className="text-sm text-blue-300/80 mt-1">버전: {post.version}</p>}
            </div>
            <a 
              href={post.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
            >
              <Download size={20} />
              다운로드
            </a>
          </div>
        )}
      </div>

      {seriesName && <section className="mb-10 border-b border-white/10 pb-7">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5"><div><p className="text-xs text-blue-200 mb-1">이 스토리가 속한 시리즈</p><h2 className="text-xl font-semibold text-white">{seriesName}</h2></div><Link to={seriesUrl(seriesName)} className="browse-link">시리즈 전체 보기 →</Link></div>
        <SeriesShelf items={seriesStories} currentId={post.id} />
      </section>}

      <div className="post-body prose prose-invert prose-emerald max-w-none prose-em:text-[#C0C4CC]/60 prose-em:italic prose-headings:text-white">
        {post.type === 'ooc' && <div className="flex justify-end mb-4"><CopyTextButton text={post.content || ''} /></div>}

        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt={post.name}
            className="w-full rounded-2xl mb-8 border border-white/10 shadow-2xl shadow-black/40"
            referrerPolicy="no-referrer"
          />
        )}
        
        {post.type === 'ooc' ? <OocContent text={post.content || '내용이 없습니다.'} /> : <MarkdownContent>{post.content || '*내용이 없습니다.*'}</MarkdownContent>}

        {post.link && post.type !== 'work' && post.type !== 'resource' && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <a 
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              외부 링크 열기 <ExternalLink size={20} />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
