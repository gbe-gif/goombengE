import { useState } from 'react';
import { Menu, X, Home, Search, Image as ImageIcon, FileText, Database, Package, Library, Server, Plus, LogOut, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isWorksOpen, setIsWorksOpen] = useState(false);
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1021]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            <Link to="/" onClick={closeMenu} className="text-xl font-bold text-white tracking-tight hover:text-blue-400 transition-colors">
              게으른굼벵이의 창고
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/notice" className="text-xl" title="Notice">📢</Link>
            <Link to="/resources" className="text-xl" title="Resources">🎁</Link>
            <Link to="/works" className="text-xl" title="Works">📖</Link>
            <Link to="/archive" className="text-xl" title="Archive">🗃️</Link>
            <Link to="/ooc" className="text-xl" title="OOC Playground">🎲</Link>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-16 left-0 right-0 overflow-hidden bg-[#0B1021] border-b border-white/10 shadow-2xl h-[calc(100vh-4rem)] md:h-auto overflow-y-auto"
            >
              <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
                <Link onClick={closeMenu} to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-lg font-medium text-white transition-colors">
                  <Home className="text-blue-400" size={20} />
                  Home
                </Link>
                <Link onClick={closeMenu} to="/notice" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-lg font-medium text-white transition-colors">
                  <span className="text-xl">📢</span> Notice
                </Link>
                <Link onClick={closeMenu} to="/resources" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-lg font-medium text-white transition-colors">
                  <span className="text-xl">🎁</span> Resources
                </Link>

                <div className="px-4 py-3 flex flex-col">
                  <button onClick={() => setIsWorksOpen(!isWorksOpen)} className="flex items-center justify-between text-lg font-medium text-white w-full">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📖</span> Works
                    </div>
                    {isWorksOpen ? <ChevronUp size={20} className="text-white/50" /> : <ChevronDown size={20} className="text-white/50" />}
                  </button>
                  <AnimatePresence>
                    {isWorksOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-9 flex flex-col gap-3 mt-4">
                          <Link onClick={closeMenu} to="/works" className="text-[#C0C4CC]/80 hover:text-white transition-colors">전체 작품</Link>
                          <Link onClick={closeMenu} to="/platforms" className="text-[#C0C4CC]/80 hover:text-white transition-colors">플랫폼별 작품</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="px-4 py-3 flex flex-col">
                  <button onClick={() => setIsArchiveOpen(!isArchiveOpen)} className="flex items-center justify-between text-lg font-medium text-white w-full">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🗃️</span> Archive
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
                          <Link onClick={closeMenu} to="/archive/image" className="text-[#C0C4CC]/80 hover:text-white transition-colors flex items-center gap-2">🖼 Image Archive</Link>
                          <Link onClick={closeMenu} to="/archive/worldview" className="text-[#C0C4CC]/80 hover:text-white transition-colors flex items-center gap-2">🌍 Worldview</Link>
                          <Link onClick={closeMenu} to="/archive/log" className="text-[#C0C4CC]/80 hover:text-white transition-colors flex items-center gap-2">📋 Test Logs</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link onClick={closeMenu} to="/ooc" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-lg font-medium text-white transition-colors">
                  <span className="text-xl">🎲</span> OOC Playground
                </Link>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <div className="px-4 py-2 text-xs font-mono text-[#C0C4CC]/50 mb-2">ADMINISTRATION</div>
                  {isAdmin ? (
                    <>
                      <Link 
                        onClick={closeMenu}
                        to="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-lg font-medium transition-colors"
                      >
                        <Settings size={20} />
                        관리자 대시보드
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 text-lg font-medium transition-colors"
                      >
                        <LogOut size={20} />
                        로그아웃
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={handleGoogleLogin}
                      disabled={isLoggingIn}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-white text-lg font-medium transition-colors disabled:opacity-50"
                    >
                      <LogOut size={20} />
                      {isLoggingIn ? '로딩중...' : 'Google 로그인'}
                    </button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-24 pb-24 max-w-7xl mx-auto px-4">
        {children}
      </main>
    </div>
  );
}
