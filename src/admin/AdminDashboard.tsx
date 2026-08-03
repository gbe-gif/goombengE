import { useState } from 'react';
import { useContent } from '../hooks/useContent';
import { useAuth } from '../hooks/useAuth';
import { Plus, Edit2, Trash2, Eye, EyeOff, Link as LinkIcon, Loader2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { ArchiveItem } from '../data/mockData';
import ContentForm from './ContentForm';
import { Navigate } from 'react-router-dom';
import { formatKST } from '../lib/formatDate';
import { getCategoryLabel } from '../utils/category';

export default function AdminDashboard() {
  const { content, loading: contentLoading } = useContent();
  const { isAdmin, loading: authLoading } = useAuth();
  const [editingItem, setEditingItem] = useState<ArchiveItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [quickUrl, setQuickUrl] = useState('');
  const [isQuickAdding, setIsQuickAdding] = useState(false);

  if (authLoading || contentLoading) return <div className="text-white/60 text-center py-20">로딩 중...</div>;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleDelete = async (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      await deleteDoc(doc(db, 'content', id));
    }
  };

  const handleToggleVisible = async (item: ArchiveItem) => {
    await setDoc(doc(db, 'content', item.id), { ...item, isVisible: item.isVisible === false ? true : false });
  };

  const handleTogglePinned = async (item: ArchiveItem) => {
    await setDoc(doc(db, 'content', item.id), { ...item, isPinned: !item.isPinned });
  };

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUrl) return;
    
    setIsQuickAdding(true);
    try {
      const imageItems = content.filter(i => i.type === 'image');
      let maxCode = 0;
      imageItems.forEach(i => {
        if (!i.code) return;
        const match = i.code.match(/I(\d+)/i);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxCode) maxCode = num;
        }
      });
      const nextCode = `I${maxCode + 1}`;
      
      const newItem: ArchiveItem = {
        id: crypto.randomUUID(),
        code: nextCode,
        name: `새 이미지 (${nextCode})`,
        type: 'image',
        imageUrl: quickUrl,
        link: quickUrl,
        date: new Date().toISOString(),
        isVisible: true
      };
      
      await setDoc(doc(db, 'content', newItem.id), newItem);
      setQuickUrl('');
    } catch (err) {
      console.error(err);
      alert('추가 실패');
    } finally {
      setIsQuickAdding(false);
    }
  };

  if (isCreating || editingItem) {
    return (
      <ContentForm 
        item={editingItem} 
        onClose={() => {
          setIsCreating(false);
          setEditingItem(null);
        }} 
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-[#12182B] border border-white/10 rounded-xl p-6 shadow-lg shadow-black/20">
        <h3 className="text-lg font-medium text-white mb-4">빠른 이미지 추가</h3>
        <form onSubmit={handleQuickAdd} className="flex gap-4 items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon size={18} className="text-white/40" />
            </div>
            <input 
              type="url"
              placeholder="https://i.postimg.cc/... (이미지 URL 붙여넣기)" 
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isQuickAdding || !quickUrl}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors whitespace-nowrap"
          >
            {isQuickAdding ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
            바로 추가
          </button>
        </form>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">콘텐츠 관리</h2>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          상세 콘텐츠 추가
        </button>
      </div>

      <div className="bg-[#12182B] border border-white/10 rounded-xl overflow-hidden shadow-lg shadow-black/20 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="uppercase tracking-wider border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-6 py-4 font-medium text-white/60">분류</th>
              <th className="px-6 py-4 font-medium text-white/60 w-full">제목</th>
              <th className="px-6 py-4 font-medium text-white/60">작성일</th>
              <th className="px-6 py-4 font-medium text-white/60">수정일</th>
              <th className="px-6 py-4 font-medium text-white/60">상태 & 고정</th>
              <th className="px-6 py-4 font-medium text-white/60 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {content.map(item => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-white/60">{getCategoryLabel(item.type)}</td>
                <td className="px-6 py-4 font-medium truncate max-w-xs">
                  {item.code && <span className="mr-2 text-xs text-blue-400 bg-blue-400/10 px-1 rounded">{item.code}</span>}
                  {item.name}
                </td>
                <td className="px-6 py-4 text-white/60 font-mono text-xs">{formatKST(item.date)}</td>
                <td className="px-6 py-4 text-white/60 font-mono text-xs">{item.updatedAt ? formatKST(item.updatedAt) : '-'}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <button 
                    onClick={() => handleTogglePinned(item)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${item.isPinned ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/80'}`}
                    title="Home 고정 토글"
                  >
                    <span className={item.isPinned ? 'opacity-100' : 'opacity-50 grayscale'}>⭐</span>
                  </button>
                  <button 
                    onClick={() => handleToggleVisible(item)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${item.isVisible !== false ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}
                  >
                    {item.isVisible !== false ? <Eye size={14} /> : <EyeOff size={14} />}
                    {item.isVisible !== false ? '공개' : '비공개'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => setEditingItem(item)}
                      className="p-2 bg-white/5 hover:bg-white/10 text-white/80 rounded transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
