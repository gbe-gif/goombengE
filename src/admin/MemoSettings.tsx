import { useState, useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';
import { Save } from 'lucide-react';

const CATEGORIES = [
  { id: 'notice', label: '공지사항 (Notice)' },
  { id: 'resource', label: '배포 자료 (Resource)' },
  { id: 'work', label: '스토리 (Works)' },
  { id: 'platforms', label: '플랫폼별 스토리 (Platforms)' },
  { id: 'image', label: 'Image Archive' },
  { id: 'worldview', label: 'Worldview' },
  { id: 'log', label: 'Test Logs' },
  { id: 'ooc', label: 'OOC Playground' },
  { id: 'devnote', label: 'Dev Notes' },
];

export default function MemoSettings() {
  const { memos, updateMemo, loading } = useSettings();
  const [localMemos, setLocalMemos] = useState<{ [key: string]: string }>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      setLocalMemos(memos);
    }
  }, [memos, loading]);

  const handleSave = async (category: string) => {
    setSaving(category);
    await updateMemo(category, localMemos[category] || '');
    setSaving(null);
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="bg-[#12182B] border border-white/10 rounded-xl p-6 shadow-lg shadow-black/20 mt-8">
      <h2 className="text-2xl font-bold mb-6">카테고리 메모 관리</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col gap-3">
            <label className="text-sm font-medium text-white/80">{cat.label}</label>
            <textarea
              className="w-full h-24 bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
              placeholder="표시할 메모를 입력하세요 (Markdown 지원하지 않음)"
              value={localMemos[cat.id] || ''}
              onChange={(e) => setLocalMemos({ ...localMemos, [cat.id]: e.target.value })}
            />
            <button
              onClick={() => handleSave(cat.id)}
              disabled={saving === cat.id}
              className="self-end bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {saving === cat.id ? '저장 중...' : '저장'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
