import { Link } from 'react-router-dom';
import { Image as ImageIcon, FileText, Database } from 'lucide-react';

export default function ArchivePage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
        <span className="text-4xl">🗃️</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Archive</h1>
      </div>
      <p className="text-[#C0C4CC]/80 mb-12 text-lg">기존 카테고리 보관소입니다. 열람할 기록을 선택하세요.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/archive/image" className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg shadow-black/20 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ImageIcon className="text-blue-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Category I</h2>
          <p className="text-[#C0C4CC]/60 font-medium mb-4">Image Archive</p>
          <p className="text-[#C0C4CC]/80 text-sm">일러스트, 설정화 등 이미지 자료 보관소</p>
        </Link>

        <Link to="/archive/worldview" className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg shadow-black/20 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FileText className="text-purple-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Category W</h2>
          <p className="text-[#C0C4CC]/60 font-medium mb-4">Worldview</p>
          <p className="text-[#C0C4CC]/80 text-sm">세계관 설정 및 문서 자료 보관소</p>
        </Link>

        <Link to="/archive/log" className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg shadow-black/20 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Database className="text-emerald-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Category L</h2>
          <p className="text-[#C0C4CC]/60 font-medium mb-4">Test Logs</p>
          <p className="text-[#C0C4CC]/80 text-sm">진행 로그 및 테스트 기록 보관소</p>
        </Link>
      </div>
    </div>
  );
}
