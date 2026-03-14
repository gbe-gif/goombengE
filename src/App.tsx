import { useState, useMemo } from 'react';
import { Menu, X, Search, Image as ImageIcon, FileText, Database, ChevronDown, ExternalLink, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const archiveData = [
  // Image Archive (Category I)
  { id: 'i1', code: 'I1', name: '도유안움짤', type: 'image', imageUrl: 'https://i.postimg.cc/P5f1z7ZG/b1.jpg', link: 'https://posty.pe/fi23fm', date: '2026-03-01T00:01:00Z' },
  { id: 'i2', code: 'I2', name: '도유안 b컷', type: 'image', imageUrl: 'https://i.postimg.cc/y8V8bg7t/b6.jpg', link: 'https://posty.pe/4rh5d4', date: '2026-03-01T00:02:00Z' },
  { id: 'i3', code: 'I3', name: '도유안 a컷', type: 'image', imageUrl: 'https://i.postimg.cc/6Qr65X0D/표지_오리지널.jpg', link: 'https://posty.pe/nstpuy', date: '2026-03-01T00:03:00Z' },
  { id: 'i4', code: 'I4', name: '도유안 신뜨기념', type: 'image', imageUrl: 'https://i.postimg.cc/rFD8RWjG/12.jpg', link: 'https://posty.pe/ngyakm', date: '2026-03-01T00:04:00Z' },
  { id: 'i5', code: 'I5', name: '에이드런', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/o3rs95', date: '2026-03-01T00:05:00Z' },
  { id: 'i6', code: 'I6', name: '금욕하세요 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/7lhyar', date: '2026-03-01T00:06:00Z' },
  { id: 'i7', code: 'I7', name: '금욕하세요 a컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/npcloc', date: '2026-03-01T00:07:00Z' },
  { id: 'i8', code: 'I8', name: '고추만두튀김의 달인', type: 'image', imageUrl: 'https://i.postimg.cc/wBcfSdVG/검열.jpg', link: 'https://posty.pe/mabb4x', date: '2026-03-01T00:08:00Z' },
  { id: 'i9', code: 'I9', name: '아 비밀로 해달라고', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/t6lvma', date: '2026-03-01T00:09:00Z' },
  { id: 'i10', code: 'I10', name: '루카스 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/1uhoe4', date: '2026-03-01T00:10:00Z' },
  { id: 'i11', code: 'I11', name: '루카스 a컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/xrkp8b', date: '2026-03-01T00:11:00Z' },
  { id: 'i12', code: 'I12', name: '서지안 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/enfb70', date: '2026-03-01T00:12:00Z' },
  { id: 'i13', code: 'I13', name: '메이슨 a컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/54vq7n', date: '2026-03-01T00:13:00Z' },
  { id: 'i14', code: 'I14', name: '메이슨 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/edw2dy', date: '2026-03-01T00:14:00Z' },
  { id: 'i15', code: 'I15', name: '로드리온', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/cqemno', date: '2026-03-01T00:15:00Z' },
  { id: 'i16', code: 'I16', name: '리타 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/rlrylz', date: '2026-03-01T00:16:00Z' },
  { id: 'i17', code: 'I17', name: '켈른 서비스컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/4x5o6v', date: '2026-03-01T00:17:00Z' },
  { id: 'i18', code: 'I18', name: '카이스', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/dxt9uk', date: '2026-03-01T00:18:00Z' },
  { id: 'i19', code: 'I19', name: '강태범', type: 'image', imageUrl: 'https://i.postimg.cc/FFqyqzfp/표지.jpg', link: 'https://posty.pe/wklkak', date: '2026-03-01T00:19:00Z' },
  { id: 'i20', code: 'I20', name: '카를하인츠', type: 'image', imageUrl: 'https://i.postimg.cc/28zRNmqY/젖소표지.jpg', link: 'https://posty.pe/tu1nc5', date: '2026-03-01T00:20:00Z' },
  { id: 'i21', code: 'I21', name: '카를하인츠 서비스컷', type: 'image', imageUrl: 'https://i.postimg.cc/bwQQSdsk/젖소.jpg', link: 'https://posty.pe/id3lvt', date: '2026-03-01T00:21:00Z' },
  { id: 'i22', code: 'I22', name: '루카스&메이슨', type: 'image', imageUrl: 'https://i.postimg.cc/Hxj0VXfF/메이슨-1.jpg', link: 'https://posty.pe/gkatxy', date: '2026-03-01T00:22:00Z' },
  { id: 'i23', code: 'I23', name: '루콘', type: 'image', imageUrl: 'https://i.postimg.cc/K8KV6362/solo,1male-3396431501-08_12_23.jpg', link: 'https://posty.pe/pov6ql', date: '2026-03-01T00:23:00Z' },
  { id: 'i24', code: 'I24', name: '범희성 서비스컷', type: 'image', imageUrl: 'https://i.postimg.cc/vm2L806N/이거.jpg', link: 'https://posty.pe/xdaa2i', date: '2026-03-01T00:24:00Z' },
  { id: 'i25', code: 'I25', name: '자이얀', type: 'image', imageUrl: 'https://i.postimg.cc/ZRn6VWyn/오만과_뻔뻔.jpg', link: 'https://posty.pe/cbhn3y', date: '2026-03-01T00:25:00Z' },
  { id: 'i26', code: 'I26', name: '석무열 서비스컷', type: 'image', imageUrl: 'https://i.postimg.cc/B60kQKF2/solo,1male-1623302651-04_29_16.jpg', link: 'https://posty.pe/3jmaa6', date: '2026-03-01T00:26:00Z' },
  { id: 'i27', code: 'I27', name: '내 남자의 남자', type: 'image', imageUrl: 'https://i.postimg.cc/NftG72LK/제목_없는_디자인.gif', link: 'https://posty.pe/1y4esf', date: '2026-03-12T00:27:00Z' },
  { id: 'i28', code: 'I28', name: '신님의 신부', type: 'image', imageUrl: 'https://i.postimg.cc/sfmMHNfM/solo,1male-1445762169-07_09_03.jpg', link: 'https://posty.pe/62x780', date: '2026-03-12T00:28:00Z' },
  { id: 'i29', code: 'I29', name: '레오카셀', type: 'image', imageUrl: 'https://i.postimg.cc/qvBpKqng/pyojiji.jpg', link: 'https://posty.pe/d6uhlm', date: '2026-03-12T00:29:00Z' },
  { id: 'i30', code: 'I30', name: '튀어나와요 커신의 집', type: 'image', imageUrl: 'https://i.postimg.cc/kGWYf1ZR/1.jpg', link: 'https://posty.pe/dlj88h', date: '2026-03-12T00:30:00Z' },
  { id: 'i31', code: 'I31', name: '잡아먹어요 커신의 저택', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/qpg5x8', date: '2026-03-12T00:31:00Z' },
  { id: 'i32', code: 'I32', name: '발타자르', type: 'image', imageUrl: 'https://i.postimg.cc/TwJkQYS5/pyopyo.jpg', link: 'https://posty.pe/8x6ej7', date: '2026-03-12T00:32:00Z' },
  { id: 'i33', code: 'I33', name: '가주들', type: 'image', imageUrl: 'https://i.postimg.cc/mDN8CRG2/1.jpg', link: 'https://posty.pe/ev7hwn', date: '2026-03-12T00:33:00Z' },
  { id: 'i34', code: 'I34', name: '가주들S', type: 'image', imageUrl: 'https://i.postimg.cc/yNyM2MzV/표지1111.jpg', link: 'https://posty.pe/zuzkpc', date: '2026-03-12T00:34:00Z' },
  { id: 'i35', code: 'I35', name: '나황심', type: 'image', imageUrl: 'https://i.postimg.cc/tJnqccP0/112.jpg', link: 'https://posty.pe/a856ym', date: '2026-03-12T00:35:00Z' },
  { id: 'i36', code: 'I36', name: '최성필', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/1k0nzn', date: '2026-03-12T00:36:00Z' },
  { id: 'i37', code: 'I37', name: '잘못 주웠다', type: 'image', imageUrl: 'https://i.postimg.cc/3x7zSd9P/멈머쿤.jpg', link: 'https://posty.pe/f5uiup', date: '2026-03-12T00:37:00Z' },
  { id: 'i38', code: 'I38', name: '황보 현', type: 'image', imageUrl: 'https://i.postimg.cc/1X4FX2qq/의사.jpg', link: 'https://posty.pe/exmx6z', date: '2026-03-12T00:38:00Z' },
  { id: 'i39', code: 'I39', name: '크리스마스 이미지', type: 'image', imageUrl: 'https://i.postimg.cc/G2TSvdG3/신목크리스마스.jpg', link: 'https://posty.pe/qt2y09', date: '2026-03-12T00:39:00Z' },
  { id: 'i40', code: 'I40', name: '치비 배경화면 공유1 - 신목/황보현/나황심/코르벤/바실', type: 'image', imageUrl: 'https://i.postimg.cc/nc4gdF5m/예.png', link: 'https://posty.pe/7oe87j', date: '2026-03-13T00:40:00Z' },
  { id: 'i41', code: 'I41', name: '치비 배경화면 공유2 - 켈른/카를하인츠/카실리안', type: 'image', imageUrl: 'https://i.postimg.cc/5NBTP4Gv/예2.png', link: 'https://posty.pe/iv2ru6', date: '2026-03-13T00:41:00Z' },
  { id: 'i42', code: 'I42', name: '치비 배경화면 공유3 - 범희성/령휘/석무열', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/lih8ni', date: '2026-03-13T00:42:00Z' },
  { id: 'i43', code: 'I43', name: '치비 배경화면 공유4 - 레오카셀/루콘/탐미르/시우', type: 'image', imageUrl: 'https://i.postimg.cc/sDNZjLH8/산타레오1.jpg', link: 'https://posty.pe/atz119', date: '2026-03-13T00:43:00Z' },
  { id: 'i44', code: 'I44', name: '코르벤 개인챗 B컷', type: 'image', imageUrl: 'https://i.postimg.cc/rpjRcm3N/표표표.jpg', link: 'https://posty.pe/suxvxq', date: '2026-03-13T00:44:00Z' },
  { id: 'i45', code: 'I45', name: '코르벤 개인챗 검열컷', type: 'image', imageUrl: 'https://i.postimg.cc/3x7zSd9P/멈머쿤.jpg', link: 'https://posty.pe/3bt1kt', date: '2026-03-13T00:45:00Z' },
  { id: 'i46', code: 'I46', name: '구단주님 아무래도~ B컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/epdkp4', date: '2026-03-13T00:46:00Z' },
  { id: 'i47', code: 'I47', name: '구단주님 아무래도~ A컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/r87gmr', date: '2026-03-13T00:47:00Z' },
  { id: 'i48', code: 'I48', name: '성인용품 개발팀~ B컷', type: 'image', imageUrl: 'https://i.postimg.cc/vZVwXQZ6/1안표지.jpg', link: 'https://posty.pe/3o91q0', date: '2026-03-13T00:48:00Z' },
  { id: 'i49', code: 'I49', name: '성인용품 개발팀~ A컷', type: 'image', imageUrl: 'https://i.postimg.cc/vZVwXQZ6/1안표지.jpg', link: 'https://posty.pe/8ko65v', date: '2026-03-13T00:49:00Z' },
  { id: 'i50', code: 'I50', name: '바실 개인챗 19컷', type: 'image', imageUrl: 'https://i.postimg.cc/Gmr67Hzf/늑대쿤.jpg', link: 'https://posty.pe/z9dn81', date: '2026-03-13T00:50:00Z' },
  { id: 'i51', code: 'I51', name: '바실 개인챗 일상컷', type: 'image', imageUrl: 'https://i.postimg.cc/Wb81wCR6/11.jpg', link: 'https://posty.pe/aljk9f', date: '2026-03-13T00:51:00Z' },
  { id: 'i52', code: 'I52', name: '마티니 블루 최해건', type: 'image', imageUrl: 'https://i.postimg.cc/htcDRV1p/선주_표지.jpg', link: 'https://posty.pe/m10gbo', date: '2026-03-13T00:52:00Z' },
  { id: 'i53', code: 'I53', name: '고언집', type: 'image', imageUrl: 'https://i.postimg.cc/qqd7906h/고언집.jpg', link: 'https://posty.pe/apq3nl', date: '2026-03-13T00:53:00Z' },
  { id: 'i54', code: 'I54', name: '빛만승', type: 'image', imageUrl: 'https://i.postimg.cc/Gt1pZrTT/빛만승.jpg', link: 'https://posty.pe/2ppo21', date: '2026-03-13T00:54:00Z' },
  { id: 'i55', code: 'I55', name: '선즈옌', type: 'image', imageUrl: 'https://i.postimg.cc/FKnRWVwZ/1011.jpg', link: 'https://posty.pe/uw4yz9', date: '2026-03-13T00:55:00Z' },
  { id: 'i56', code: 'I56', name: '김영준', type: 'image', imageUrl: 'https://i.postimg.cc/Kc9kndvk/332.jpg', link: 'https://posty.pe/izpmqx', date: '2026-03-13T00:56:00Z' },
  { id: 'i57', code: 'I57', name: '엘리오르', type: 'image', imageUrl: 'https://i.postimg.cc/CKBWXM96/표지2.jpg', link: 'https://posty.pe/sci3fp', date: '2026-03-13T00:57:00Z' },
  { id: 'i58', code: 'I58', name: '알리스테어/에드먼드/발테마르', type: 'image', imageUrl: 'https://i.postimg.cc/HLDHv6wF/ss.jpg', link: 'https://posty.pe/jbo26u', date: '2026-03-13T00:58:00Z' },
  { id: 'i59', code: 'I59', name: '카샤엘', type: 'image', imageUrl: 'https://i.postimg.cc/gkgg6HNH/pp1.jpg', link: 'https://posty.pe/n9bpga', date: '2026-03-13T00:59:00Z' },

  // Worldview
  { id: 'w1', code: 'W1', name: '사신수 세계관', type: 'worldview', link: 'https://posty.pe/rq1w6b', date: '2026-03-12T01:00:00Z' },
  { id: 'w2', code: 'W2', name: '수인 세계관 - instimate', type: 'worldview', link: 'https://posty.pe/yn5oz4', date: '2026-03-12T01:01:00Z' },
  { id: 'w3', code: 'W3', name: '계략 소꿉친구', type: 'worldview', link: 'https://posty.pe/zks0y2', date: '2026-03-12T01:02:00Z' },
  { id: 'w4', code: 'W4', name: '루콘 스포일러 인적사항', type: 'worldview', link: 'https://posty.pe/jod7ki', date: '2026-03-12T01:03:00Z' },
  { id: 'w5', code: 'W5', name: '나황심 스포 정보', type: 'worldview', link: 'https://posty.pe/7dxqbl', date: '2026-03-12T01:04:00Z' },
  { id: 'w6', code: 'W6', name: '보호라는 이름아래 - 리의중', type: 'worldview', link: 'https://posty.pe/o5iqhi', date: '2026-03-12T01:05:00Z' },

  // Logs
  { id: 'l1', code: 'L1', name: '강태범 프로챗', type: 'log', imageUrl: 'https://dummyimage.com/400x400/0B1021/10B981&text=LOG', link: 'https://posty.pe/377cgz', date: '2026-03-12T01:06:00Z' },
  { id: 'l2', code: 'L2', name: '범희성 서방님', type: 'log', imageUrl: 'https://dummyimage.com/400x400/0B1021/10B981&text=LOG', link: 'https://posty.pe/z1m3hl', date: '2026-03-12T01:07:00Z' },
  { id: 'l3', code: 'L3', name: '범희성 제미나이3.1 문체 개편', type: 'log', imageUrl: 'https://dummyimage.com/400x400/0B1021/10B981&text=LOG', link: 'https://posty.pe/hc39qo', date: '2026-03-12T01:08:00Z' },
  { id: 'l4', code: 'L4', name: '내 남자의 남자', type: 'log', imageUrl: 'https://dummyimage.com/400x400/0B1021/10B981&text=LOG', link: 'https://posty.pe/667gjq', date: '2026-03-12T01:09:00Z' },
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
  const logs = filteredData.filter(item => item.type === 'log').reverse();

  const recentUpdates = useMemo(() => {
    return [...archiveData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
  }, []);

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
