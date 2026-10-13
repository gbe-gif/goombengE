import { adminCategories, groupAdminContent } from '../utils/adminContent';
import { useMemo, useState } from 'react';
import { useContent } from '../hooks/useContent';
import { useAuth } from '../hooks/useAuth';
import { Plus, Edit2, Trash2, Eye, EyeOff, Pin } from 'lucide-react';
import { db } from '../lib/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ArchiveItem } from '../data/mockData';
import ContentForm from './ContentForm';
import { Navigate } from 'react-router-dom';
import { formatKST } from '../lib/formatDate';
import { getCategoryLabel } from '../utils/category';

import MemoSettings from './MemoSettings';

export default function AdminDashboard() {
  const { content, loading: contentLoading, error: contentError } = useContent();
  const { isAdmin, loading: authLoading } = useAuth();
  const [pending, setPending] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [editingItem, setEditingItem] = useState<ArchiveItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const contentGroups = useMemo(() => groupAdminContent(content, selectedCategory), [content, selectedCategory]);

  if (authLoading || contentLoading) return <div className="text-white/60 text-center py-20">로딩 중...</div>;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleDelete = async (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      await deleteDoc(doc(db, 'content', id));
    }
  };

  const updateFlags = async (item: ArchiveItem, flags: Partial<ArchiveItem>, message: string) => {
    if (pending) return;
    setPending(item.id);
    setFeedback('');
    try {
      await updateDoc(doc(db, 'content', item.id), flags);
      setFeedback(message);
    } catch (error) {
      console.error(error);
      setFeedback('저장하지 못했습니다. 관리자 로그인과 Firebase 권한을 확인해 주세요.');
    } finally {
      setPending(null);
    }
  };
  const handleToggleVisible = (item: ArchiveItem) => {
    const visible = item.isVisible !== true;
    return updateFlags(item, { isVisible: visible }, visible ? '공개로 변경했습니다.' : '비공개로 변경했습니다. 방문자에게는 표시되지 않습니다.');
  };
  const handleTogglePinned = (item: ArchiveItem) => updateFlags(item, { isPinned: !item.isPinned }, item.isPinned ? '홈 고정을 해제했습니다.' : '홈에 고정했습니다.');
  const handleToggleAdminPinned = (item: ArchiveItem) => updateFlags(item, { isAdminPinned: item.isAdminPinned !== true }, item.isAdminPinned === true ? '관리자 목록 고정을 해제했습니다.' : '관리자 목록 맨 위에 고정했습니다.');

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
      <p className="text-sm text-slate-300">관리자는 비공개 글도 볼 수 있습니다. 방문자에게는 공개 상태인 글만 표시됩니다.</p>
      {contentError && <p role="alert" className="text-amber-300">{contentError}</p>}
      {feedback && <p role="status" className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{feedback}</p>}
      {content.some(item => item.isVisible === undefined) && <p className="text-amber-300 text-sm">공개 상태가 없는 이전 글은 방문자에게 숨겨집니다. 공개하려는 글의 상태 버튼을 눌러 주세요.</p>}
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

      <p className="text-sm text-slate-400">핀으로 고정한 글은 분류와 관계없이 맨 위에 표시됩니다. 나머지 글은 카테고리별로 묶었습니다. 별표는 홈페이지 고정 설정입니다.</p>
      <div role="group" aria-label="관리할 글 분류" className="flex flex-wrap gap-2">
        {[{ id: 'all', label: '전체', count: content.length }, ...adminCategories.map(type => ({ id: type, label: getCategoryLabel(type), count: content.filter(item => item.type === type).length })).filter(category => category.count > 0)].map(category => <button key={category.id} type="button" aria-pressed={selectedCategory === category.id} onClick={() => setSelectedCategory(category.id)} className={`min-h-11 rounded-xl px-4 py-2 text-sm border transition-colors ${selectedCategory === category.id ? 'border-blue-400/50 bg-blue-500/20 text-blue-200' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}>{category.label} <span className="ml-1 text-xs opacity-70">{category.count}</span></button>)}
      </div>
      <div className="bg-[#12182B] border border-white/10 rounded-xl overflow-hidden shadow-lg shadow-black/20 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="uppercase tracking-wider border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-3 py-4 font-medium text-white/60"><span className="sr-only">관리자 목록 고정</span><Pin size={16} aria-hidden="true" /></th>
              <th className="px-6 py-4 font-medium text-white/60">분류</th>
              <th className="px-6 py-4 font-medium text-white/60 w-full">제목</th>
              <th className="px-6 py-4 font-medium text-white/60">작성일</th>
              <th className="px-6 py-4 font-medium text-white/60">수정일</th>
              <th className="px-6 py-4 font-medium text-white/60">상태 & 고정</th>
              <th className="px-6 py-4 font-medium text-white/60 text-right">관리</th>
            </tr>
          </thead>
          {contentGroups.map(group => <tbody key={group.id} className="divide-y divide-white/10">
            <tr><th colSpan={7} scope="rowgroup" className="px-6 py-4 text-left font-semibold text-blue-200 bg-white/5">{group.label} <span className="ml-2 text-xs text-slate-400">{group.items.length}개</span></th></tr>
            {group.items.map(item => (
              <tr key={item.id} className={`hover:bg-white/5 transition-colors ${item.isAdminPinned === true ? 'bg-blue-500/5' : ''}`}>
                <td className="px-3 py-4">
                  <button type="button" disabled={pending !== null}
                    aria-pressed={item.isAdminPinned === true}
                    aria-label={`${item.name} 관리자 목록 ${item.isAdminPinned === true ? '고정 해제' : '맨 위에 고정'}`}
                    title={item.isAdminPinned === true ? '관리자 목록 고정 해제' : '관리자 목록 맨 위에 고정'}
                    onClick={() => handleToggleAdminPinned(item)}
                    className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${item.isAdminPinned === true ? 'bg-blue-500/20 text-blue-300' : 'text-white/30 hover:bg-white/10 hover:text-white'}`}>
                    <Pin size={17} fill={item.isAdminPinned === true ? 'currentColor' : 'none'} aria-hidden="true" />
                  </button>
                </td>
                <td className="px-6 py-4 text-white/60">{getCategoryLabel(item.type)}</td>
                <td className="px-6 py-4 font-medium truncate max-w-xs">
                  {item.code && <span className="mr-2 text-xs text-blue-400 bg-blue-400/10 px-1 rounded">{item.code}</span>}
                  {item.name}
                </td>
                <td className="px-6 py-4 text-white/60 font-mono text-xs">{formatKST(item.date)}</td>
                <td className="px-6 py-4 text-white/60 font-mono text-xs">{item.updatedAt ? formatKST(item.updatedAt) : '-'}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <button 
                    disabled={pending !== null}
                    onClick={() => handleTogglePinned(item)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${item.isPinned ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/80'}`}
                    title="Home 고정 토글"
                  >
                    <span className={item.isPinned ? 'opacity-100' : 'opacity-50 grayscale'}>⭐</span>
                  </button>
                  <button 
                    disabled={pending !== null}
                    aria-label={`${item.name} ${item.isVisible === true ? '비공개로' : '공개로'} 변경`}
                    onClick={() => handleToggleVisible(item)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${item.isVisible === true ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}
                  >
                    {item.isVisible === true ? <Eye size={14} /> : <EyeOff size={14} />}
                    {item.isVisible === true ? '공개' : '비공개'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      aria-label={`${item.name} 수정`}
                      onClick={() => setEditingItem(item)}
                      className="p-2 bg-white/5 hover:bg-white/10 text-white/80 rounded transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      aria-label={`${item.name} 삭제`}
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>)}
          {contentGroups.length === 0 && <tbody><tr><td colSpan={7} className="px-6 py-12 text-center text-slate-400">선택한 분류에 등록된 글이 없습니다.</td></tr></tbody>}
        </table>
      </div>
      <MemoSettings />
    </div>
  );
}
