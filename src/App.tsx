import { useState, useMemo } from 'react';
import { Menu, X, Search, Image as ImageIcon, FileText, Database, ChevronDown, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const archiveData = [
  // Image Archive (Category E)
  { id: 'e1', code: 'E1', name: '도유안움짤', type: 'image', imageUrl: 'https://i.postimg.cc/P5f1z7ZG/b1.jpg', link: 'https://posty.pe/fi23fm' },
  { id: 'e2', code: 'E2', name: '도유안 b컷', type: 'image', imageUrl: 'https://i.postimg.cc/y8V8bg7t/b6.jpg', link: 'https://posty.pe/4rh5d4' },
  { id: 'e3', code: 'E3', name: '도유안 a컷', type: 'image', imageUrl: 'https://i.postimg.cc/6Qr65X0D/표지_오리지널.jpg', link: 'https://posty.pe/nstpuy' },
  { id: 'e4', code: 'E4', name: '도유안 신뜨기념', type: 'image', imageUrl: 'https://i.postimg.cc/rFD8RWjG/12.jpg', link: 'https://posty.pe/ngyakm' },
  { id: 'e5', code: 'E5', name: '에이드런', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/o3rs95' },
  { id: 'e6', code: 'E6', name: '금욕하세요 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/7lhyar' },
  { id: 'e7', code: 'E7', name: '금욕하세요 a컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/npcloc' },
  { id: 'e8', code: 'E8', name: '고추만두튀김의 달인', type: 'image', imageUrl: 'https://i.postimg.cc/wBcfSdVG/검열.jpg', link: 'https://posty.pe/mabb4x' },
  { id: 'e9', code: 'E9', name: '아 비밀로 해달라고', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/t6lvma' },
  { id: 'e10', code: 'E10', name: '루카스 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/1uhoe4' },
  { id: 'e11', code: 'E11', name: '루카스 a컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/xrkp8b' },
  { id: 'e12', code: 'E12', name: '서지안 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/enfb70' },
  { id: 'e13', code: 'E13', name: '메이슨 a컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/54vq7n' },
  { id: 'e14', code: 'E14', name: '메이슨 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/edw2dy' },
  { id: 'e15', code: 'E15', name: '로드리온', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/cqemno' },
  { id: 'e16', code: 'E16', name: '리타 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/rlrylz' },
  { id: 'e17', code: 'E17', name: '켈른 서비스컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/4x5o6v' },
  { id: 'e18', code: 'E18', name: '카이스', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/dxt9uk' },
  { id: 'e19', code: 'E19', name: '강태범', type: 'image', imageUrl: 'https://i.postimg.cc/FFqyqzfp/표지.jpg', link: 'https://posty.pe/wklkak' },
  { id: 'e20', code: 'E20', name: '카를하인츠', type: 'image', imageUrl: 'https://i.postimg.cc/28zRNmqY/젖소표지.jpg', link: 'https://posty.pe/tu1nc5' },
  { id: 'e21', code: 'E21', name: '카를하인츠 서비스컷', type: 'image', imageUrl: 'https://i.postimg.cc/bwQQSdsk/젖소.jpg', link: 'https://posty.pe/id3lvt' },
  { id: 'e22', code: 'E22', name: '루카스&메이슨', type: 'image', imageUrl: 'https://i.postimg.cc/Hxj0VXfF/메이슨-1.jpg', link: 'https://posty.pe/gkatxy' },
  { id: 'e23', code: 'E23', name: '루콘', type: 'image', imageUrl: 'https://i.postimg.cc/K8KV6362/solo,1male-3396431501-08_12_23.jpg', link: 'https://posty.pe/pov6ql' },
  { id: 'e24', code: 'E24', name: '범희성 서비스컷', type: 'image', imageUrl: 'https://i.postimg.cc/vm2L806N/이거.jpg', link: 'https://posty.pe/xdaa2i' },
  { id: 'e25', code: 'E25', name: '자이얀', type: 'image', imageUrl: 'https://i.postimg.cc/ZRn6VWyn/오만과_뻔뻔.jpg', link: 'https://posty.pe/cbhn3y' },
  { id: 'e26', code: 'E26', name: '석무열 서비스컷', type: 'image', imageUrl: 'https://i.postimg.cc/B60kQKF2/solo,1male-1623302651-04_29_16.jpg', link: 'https://posty.pe/3jmaa6' },
  { id: 'e27', code: 'E27', name: '내 남자의 남자', type: 'image', imageUrl: 'https://i.postimg.cc/NftG72LK/제목_없는_디자인.gif', link: 'https://posty.pe/1y4esf' },
  { id: 'e28', code: 'E28', name: '신님의 신부', type: 'image', imageUrl: 'https://i.postimg.cc/sfmMHNfM/solo,1male-1445762169-07_09_03.jpg', link: 'https://posty.pe/62x780' },
  { id: 'e29', code: 'E29', name: '레오카셀', type: 'image', imageUrl: 'https://i.postimg.cc/qvBpKqng/pyojiji.jpg', link: 'https://posty.pe/d6uhlm' },
  { id: 'e30', code: 'E30', name: '튀어나와요 커신의 집', type: 'image', imageUrl: 'https://i.postimg.cc/kGWYf1ZR/1.jpg', link: 'https://posty.pe/dlj88h' },
  { id: 'e31', code: 'E31', name: '잡아먹어요 커신의 저택', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/qpg5x8' },
  { id: 'e32', code: 'E32', name: '발타자르', type: 'image', imageUrl: 'https://i.postimg.cc/TwJkQYS5/pyopyo.jpg', link: 'https://posty.pe/8x6ej7' },
  { id: 'e33', code: 'E33', name: '가주들', type: 'image', imageUrl: 'https://i.postimg.cc/mDN8CRG2/1.jpg', link: 'https://posty.pe/ev7hwn' },
  { id: 'e34', code: 'E34', name: '가주들S', type: 'image', imageUrl: 'https://i.postimg.cc/yNyM2MzV/표지1111.jpg', link: 'https://posty.pe/zuzkpc' },
  { id: 'e35', code: 'E35', name: '나황심', type: 'image', imageUrl: 'https://i.postimg.cc/tJnqccP0/112.jpg', link: 'https://posty.pe/a856ym' },
  { id: 'e36', code: 'E36', name: '최성필', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/1k0nzn' },
  { id: 'e37', code: 'E37', name: '잘못 주웠다', type: 'image', imageUrl: 'https://i.postimg.cc/3x7zSd9P/멈머쿤.jpg', link: 'https://posty.pe/f5uiup' },
  { id: 'e38', code: 'E38', name: '황보 현', type: 'image', imageUrl: 'https://i.postimg.cc/1X4FX2qq/의사.jpg', link: 'https://posty.pe/exmx6z' },
  { id: 'e39', code: 'E39', name: '크리스마스 이미지', type: 'image', imageUrl: 'https://i.postimg.cc/G2TSvdG3/신목크리스마스.jpg', link: 'https://posty.pe/qt2y09' },

  // Worldview
  { id: 'w1', code: 'W1', name: '사신수 세계관', type: 'worldview', link: 'https://posty.pe/rq1w6b' },
  { id: 'w2', code: 'W2', name: '수인 세계관 - instimate', type: 'worldview', link: 'https://posty.pe/yn5oz4' },
  { id: 'w3', code: 'W3', name: '계략 소꿉친구', type: 'worldview', link: 'https://posty.pe/zks0y2' },
  { id: 'w4', code: 'W4', name: '루콘 스포일러 인적사항', type: 'worldview', link: 'https://posty.pe/jod7ki' },
  { id: 'w5', code: 'W5', name: '나황심 스포 정보', type: 'worldview', link: 'https://posty.pe/7dxqbl' },
  { id: 'w6', code: 'W6', name: '보호라는 이름아래 - 리의중', type: 'worldview', link: 'https://posty.pe/o5iqhi' },

  // Logs
  { id: 'l1', code: 'L1', name: '강태범 프로챗', type: 'log', imageUrl: 'https://dummyimage.com/400x400/0B1021/10B981&text=LOG', link: 'https://posty.pe/377cgz' },
  { id: 'l2', code: 'L2', name: '범희성 서방님', type: 'log', imageUrl: 'https://dummyimage.com/400x400/0B1021/10B981&text=LOG', link: 'https://posty.pe/z1m3hl' },
  { id: 'l3', code: 'L3', name: '범희성 제미나이3.1 문체 개편', type: 'log', imageUrl: 'https://dummyimage.com/400x400/0B1021/10B981&text=LOG', link: 'https://posty.pe/hc39qo' },
  { id: 'l4', code: 'L4', name: '내 남자의 남자', type: 'log', imageUrl: 'https://dummyimage.com/400x400/0B1021/10B981&text=LOG', link: 'https://posty.pe/667gjq' },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleImagesCount, setVisibleImagesCount] = useState(8);

  // Filter data based on search query (name or code)
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return archiveData.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const images = filteredData.filter(item => item.type === 'image').reverse();
  const worldviews = filteredData.filter(item => item.type === 'worldview');
  const logs = filteredData.filter(item => item.type === 'log');

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

          {/* Search Bar */}
          <div className="flex-1 max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-[#C0C4CC]/60" />
            </div>
            <input
              type="text"
              placeholder="이름이나 코드로 검색 (예: E1, W1)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm md:text-base text-white placeholder:text-[#C0C4CC]/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
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
                  onClick={() => scrollToSection('category-e')} 
                  className="flex items-center gap-3 text-left px-4 py-4 rounded-xl hover:bg-white/5 text-lg font-medium transition-colors text-white"
                >
                  <ImageIcon className="text-blue-400" size={20} />
                  Category E: Image Archive
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

          <div 
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Image 1 */}
            <div className="relative min-w-[85vw] sm:min-w-[60vw] md:min-w-0 aspect-[4/5] md:aspect-[4/3] rounded-2xl overflow-hidden group snap-center shrink-0 border border-white/10 bg-black/50">
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
            <div className="relative min-w-[85vw] sm:min-w-[60vw] md:min-w-0 aspect-[4/5] md:aspect-[4/3] rounded-2xl overflow-hidden group snap-center shrink-0 border border-white/10 bg-black/50">
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

        {/* Category 1: Image Archive (E1~) */}
        <section id="category-e" className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <ImageIcon className="text-blue-400" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Image Archive <span className="text-base font-normal text-[#C0C4CC]/50 ml-2 font-mono">E1~</span></h2>
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
              {logs.map(item => (
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
                </a>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-[#C0C4CC]/60 italic">검색 결과가 없습니다.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
