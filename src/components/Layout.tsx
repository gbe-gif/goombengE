import { useState } from 'react';
import { Menu, X, Home, Search, Image as ImageIcon, FileText, Database, Package, Library, Server, Plus, LogOut, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';
import SearchBar from './SearchBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (result.user.email !== 'workingsh2716@gmail.com') {
        alert(`관리자 권한이 없는 계정입니다. 로그인된 이메일: ${result.user.email}`);
        await auth.signOut();
      } else {
        setIsMenuOpen(false);
      }
    } catch (err: any) {
      console.error(err);
      alert(`로그인에 실패했습니다. 사유: ${err.message || '알 수 없는 오류'}`);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#0B1021] text-[#C0C4CC] font-sans selection:bg-blue-500/30">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-blue-200 focus:text-slate-950 focus:p-3">본문으로 바로가기</a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1021]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label="메뉴 열기 및 닫기"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            <Link to="/" onClick={closeMenu} className="text-xl font-bold text-white tracking-tight hover:text-blue-400 transition-colors whitespace-nowrap">
              게으른굼벵이의 창고
            </Link>
            <div className="hidden sm:block flex-1 max-w-sm ml-4">
              <SearchBar />
            </div>
          </div>
          <nav aria-label="주요 메뉴" className="hidden xl:flex items-center gap-1 shrink-0">
            {[['/notice', '공지'], ['/works', '스토리'], ['/resources', '자료실'], ['/archive', '아카이브'], ['/ooc', 'OOC 놀이터']].map(([to, label]) => <NavLink key={to} to={to} className={({isActive}) => `px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-blue-400/15 text-blue-200' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>{label}</NavLink>)}
          </nav>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-16 left-0 right-0 overflow-hidden bg-[#0B1021] border-b border-white/10 shadow-2xl max-h-[calc(100dvh-4rem)] overflow-y-auto"
            >
              <nav className="visitor-menu max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
                <div className="px-4 py-2 sm:hidden -ml-4">
                  <SearchBar onSelect={closeMenu} />
                </div>
                <Link onClick={closeMenu} to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-lg font-medium text-white transition-colors">
                  <Home className="text-blue-400" size={20} />
                  홈
                </Link>
                <Link onClick={closeMenu} to="/notice" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-lg font-medium text-white transition-colors">
                  <span className="text-xl">📢</span> 공지
                </Link>
                <Link onClick={closeMenu} to="/resources" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-lg font-medium text-white transition-colors">
                  <span className="text-xl">🎁</span> 자료실
                </Link>

                <div className="px-4 py-3 flex flex-col">
                  <button aria-expanded={isStoriesOpen} onClick={() => setIsStoriesOpen(!isStoriesOpen)} className="flex items-center justify-between text-lg font-medium text-white w-full">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📖</span> 스토리
                    </div>
                    {isStoriesOpen ? <ChevronUp size={20} className="text-white/50" /> : <ChevronDown size={20} className="text-white/50" />}
                  </button>
                  <AnimatePresence>
                    {isStoriesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-9 flex flex-col gap-3 mt-4">
                          <Link onClick={closeMenu} to="/works" className="text-[#C0C4CC]/80 hover:text-white transition-colors">전체 스토리</Link>
                          <Link onClick={closeMenu} to="/platforms" className="text-[#C0C4CC]/80 hover:text-white transition-colors">플랫폼별 스토리</Link>
                          <Link onClick={closeMenu} to="/series" className="text-[#C0C4CC]/80 hover:text-white transition-colors">시리즈별 스토리</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="px-4 py-3 flex flex-col">
                  <button aria-expanded={isArchiveOpen} onClick={() => setIsArchiveOpen(!isArchiveOpen)} className="flex items-center justify-between text-lg font-medium text-white w-full">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🗃️</span> 아카이브
                    </div>
                    {isArchiveOpen ? <ChevronUp size={20} className="text-white/50" /> : <ChevronDown size={20} className="text-white/50" />}
                  </button>
                  <AnimatePresence>
                    {isArchiveOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-9 flex flex-col gap-3 mt-4">
                          <Link onClick={closeMenu} to="/archive/image" className="text-[#C0C4CC]/80 hover:text-white transition-colors flex items-center gap-2">🖼 이미지</Link>
                          <Link onClick={closeMenu} to="/archive/worldview" className="text-[#C0C4CC]/80 hover:text-white transition-colors flex items-center gap-2">🌍 세계관</Link>
                          <Link onClick={closeMenu} to="/archive/log" className="text-[#C0C4CC]/80 hover:text-white transition-colors flex items-center gap-2">📋 테스트 기록</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link onClick={closeMenu} to="/ooc" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-lg font-medium text-white transition-colors">
                  <span className="text-xl">🎲</span> OOC 놀이터
                </Link>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <Link onClick={closeMenu} to="/dev-notes" className="flex items-center gap-3 px-4 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors">
                    <span className="text-base grayscale opacity-70">📓</span> 개발 기록
                  </Link>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="px-4 py-1 text-[10px] font-medium text-[#C0C4CC]/40 mb-1">관계자 전용</div>
                  {isAdmin ? (
                    <div className="flex items-center gap-4 px-4">
                      <Link 
                        onClick={closeMenu}
                        to="/admin"
                        className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        관리자 대시보드
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="text-xs text-red-400/80 hover:text-red-400 transition-colors"
                      >
                        로그아웃
                      </button>
                    </div>
                  ) : (
                    <div className="px-4">
                      <button 
                        onClick={handleGoogleLogin}
                        disabled={isLoggingIn}
                        className="text-xs text-[#C0C4CC]/50 hover:text-[#C0C4CC]/80 transition-colors disabled:opacity-50 inline-flex items-center"
                      >
                        {isLoggingIn ? '로딩중...' : 'Google Login →'}
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" className="pt-24 pb-24 max-w-7xl mx-auto px-4">
        {children}
      </main>
      <footer className="border-t border-white/10 px-4 py-8 text-center text-xs text-slate-400">게으른굼벵이의 창고 · 스토리와 기록을 모아두는 곳</footer>
    </div>
  );
}
