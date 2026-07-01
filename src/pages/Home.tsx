import { useState, useMemo } from 'react';
import { Menu, X, Search, Image as ImageIcon, FileText, Database, ChevronDown, ExternalLink, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useContent } from '../hooks/useContent';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

export default function Home() {
  const { content: archiveData, loading } = useContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleImagesCount, setVisibleImagesCount] = useState(8);
  const [selectedLog, setSelectedLog] = useState<any>(null);

  // Filter data based on search query (name or code)
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    // Only show visible items for non-admin
    const visibleData = archiveData.filter(item => item.isVisible !== false);
    return visibleData.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.code.toLowerCase().includes(query)
    );
  }, [searchQuery, archiveData]);

  const images = filteredData.filter(item => item.type === 'image');
  const worldviews = filteredData.filter(item => item.type === 'worldview');
  const logs = filteredData.filter(item => item.type === 'log');

  const recentUpdates = useMemo(() => {
    return [...filteredData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
  }, [filteredData]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1021] text-[#C0C4CC] font-sans selection:bg-blue-500/30">
      {/* Header & Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1021]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Admin Login (Top Right) */}
          <Link 
            to="/admin" 
            className="text-xs md:text-sm font-medium text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/5"
          >
            관리자 로그인
          </Link>
        </div>

        {/* Slide-down Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden bg-[#0B1021] border-b border-white/10 shadow-2xl"
            >
              <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
                <button 
                  onClick={() => scrollToSection('category-i')} 
                  className="flex items-center gap-3 text-left px-4 py-4 rounded-xl hover:bg-white/5 text-lg font-medium transition-colors text-white"
                >
                  <ImageIcon className="text-blue-400" size={20} />
                  Category I: Image Archive
                </button>
                <button 
                  onClick={() => scrollToSection('category-w')} 
                  className="flex items-center gap-3 text-left px-4 py-4 rounded-xl hover:bg-white/5 text-lg font-medium transition-colors text-white"
                >
                  <FileText className="text-purple-400" size={20} />
                  Category W: Worldview
                </button>
                <button 
                  onClick={() => scrollToSection('category-l')} 
                  className="flex items-center gap-3 text-left px-4 py-4 rounded-xl hover:bg-white/5 text-lg font-medium transition-colors text-white"
                >
                  <Database className="text-emerald-400" size={20} />
                  Category L: Test Logs
                </button>
              </nav>
              
              <div className="max-w-7xl mx-auto px-8 py-4 border-t border-white/5 flex justify-end">
                <Link to="/admin" className="text-xs text-white/20 hover:text-white/60 transition-colors">
                  Admin Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-24 pb-24 max-w-7xl mx-auto px-4">
        
        {/* Hero Section - Slider on Mobile, Grid on Desktop */}
        <section className="mb-20">
          {/* Title Banner */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">게으른굼벵이의 창고</h1>
            <p className="text-[#C0C4CC]/80 text-sm md:text-base">환영합니다. 기록을 열람하세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image 1 */}
            <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden group border border-white/10 bg-black/50">
              <img 
                src="https://i.postimg.cc/Y9rn7ynV/TA_2026_03_12_11_07_26_solo_male_1592326835_0.png" 
                alt="Hero Image 1" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1021] via-[#0B1021]/40 to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-xl md:text-2xl font-medium text-white tracking-tight">(허전해서 넣었어요)</h2>
              </div>
            </div>
            
            {/* Image 2 */}
            <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden group border border-white/10 bg-black/50">
              <img 
                src="https://i.postimg.cc/G2L7RS7Z/TA_2026_03_12_10_47_34_solo_femal_1824067726_1.png" 
                alt="Hero Image 2" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1021] via-[#0B1021]/40 to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-xl md:text-2xl font-medium text-white tracking-tight">(어서오세요)</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Portal-style Search Bar */}
        <section className="mb-20 max-w-3xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search size={24} className="text-[#C0C4CC]/60 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="이름이나 코드로 검색 (예: I1, W1)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-lg text-white placeholder:text-[#C0C4CC]/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all shadow-lg shadow-black/20"
            />
          </div>
        </section>

        {/* Recent Updates Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <Sparkles className="text-yellow-400" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">최신 업데이트</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentUpdates.map(item => (
              <a 
                key={`recent-${item.id}`} 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/20"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono text-[#C0C4CC]/60 bg-black/40 px-2 py-1 rounded-md">{item.code}</span>
                    <ExternalLink size={16} className="text-[#C0C4CC]/40 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </div>
                <div className="mt-4 text-xs text-[#C0C4CC]/50">
                  {new Date(item.date).toLocaleDateString('ko-KR')}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Category 1: Image Archive (I1~) */}
        <section id="category-i" className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <ImageIcon className="text-blue-400" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Image Archive <span className="text-base font-normal text-[#C0C4CC]/50 ml-2 font-mono">I1~</span></h2>
          </div>
          
          {images.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {images.slice(0, visibleImagesCount).map(item => (
                  <a 
                    key={item.id} 
                    href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/20"
                >
                  <div className="aspect-square overflow-hidden bg-black/40 relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    {/* Folder Tab Visual Effect */}
                    <div className="absolute top-0 left-0 w-1/3 h-1 bg-blue-500/50 rounded-br-lg" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-semibold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md">{item.code}</span>
                    </div>
                    <h3 className="text-sm md:text-base font-medium text-white truncate">{item.name}</h3>
                  </div>
                </a>
              ))}
            </div>
            
            {images.length > visibleImagesCount && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisibleImagesCount(prev => prev + 8)}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all duration-300 shadow-lg shadow-black/20"
                >
                  더보기 ({visibleImagesCount} / {images.length})
                </button>
              </div>
            )}
            </>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-[#C0C4CC]/60 italic">검색 결과가 없습니다.</p>
            </div>
          )}
        </section>

        {/* Category 2: Worldview (W1~) */}
        <section id="category-w" className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <FileText className="text-purple-400" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Worldview <span className="text-base font-normal text-[#C0C4CC]/50 ml-2 font-mono">W1~</span></h2>
          </div>

          {worldviews.length > 0 ? (
            <div className="space-y-4">
              {worldviews.map(item => (
                <a 
                  key={item.id} 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-5 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors shadow-lg shadow-black/20"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs md:text-sm font-mono font-semibold text-purple-400 bg-purple-400/10 px-3 py-1.5 rounded-md shrink-0">{item.code}</span>
                    <h3 className="text-base md:text-lg font-medium text-white">{item.name}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <ExternalLink size={18} className="text-[#C0C4CC] group-hover:text-white transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-[#C0C4CC]/60 italic">검색 결과가 없습니다.</p>
            </div>
          )}
        </section>

        {/* Category 3: Test Logs (L1~) */}
        <section id="category-l" className="mb-10">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <Database className="text-emerald-400" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Test Logs <span className="text-base font-normal text-[#C0C4CC]/50 ml-2 font-mono">L1~</span></h2>
          </div>

          {logs.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {logs.map(item => {
                const isMarkdown = !!item.content;
                const Wrapper = isMarkdown ? 'button' : 'a';
                const props = isMarkdown 
                  ? { onClick: () => setSelectedLog(item), className: "text-left" } 
                  : { href: item.link, target: "_blank", rel: "noopener noreferrer" };

                return (
                  <Wrapper 
                    key={item.id} 
                    {...props}
                    className={clsx(
                      "group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/20",
                      isMarkdown ? "text-left" : ""
                    )}
                  >
                    <div className="aspect-square overflow-hidden bg-black/40 relative">
                      <img 
                        src={item.imageUrl || `https://dummyimage.com/400x400/0B1021/10B981&text=${item.code}`} 
                        alt={item.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                      {/* Tech border effect */}
                      <div className="absolute inset-0 border-[4px] border-transparent group-hover:border-emerald-500/20 transition-colors duration-500 pointer-events-none" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">{item.code}</span>
                      </div>
                      <h3 className="text-sm md:text-base font-medium text-white truncate">{item.name}</h3>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-[#C0C4CC]/60 italic">검색 결과가 없습니다.</p>
            </div>
          )}
        </section>
      </main>
      
      <Modal isOpen={!!selectedLog} onClose={() => setSelectedLog(null)}>
        {selectedLog && (
          <div className="text-[#C0C4CC]">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-mono font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-md shrink-0">
                {selectedLog.code}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{selectedLog.name}</h2>
            </div>
            <div className="prose prose-invert prose-emerald max-w-none">
              <Markdown remarkPlugins={[remarkGfm]}>
                {selectedLog.content}
              </Markdown>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
