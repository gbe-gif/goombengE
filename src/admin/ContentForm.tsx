import { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ArchiveItem } from '../data/mockData';
import { ArrowLeft, Save } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ContentFormProps {
  item: ArchiveItem | null;
  onClose: () => void;
}

export default function ContentForm({ item, onClose }: ContentFormProps) {
  const [formData, setFormData] = useState<Partial<ArchiveItem>>(
    item || {
      id: crypto.randomUUID(),
      code: '',
      name: '',
      type: 'notice',
      imageUrl: '',
      link: '',
      date: new Date().toISOString(),
      content: '',
      isVisible: true,
      excerpt: '',
      platform: '',
      genre: '',
      status: '',
      version: '',
      downloadUrl: ''
    }
  );

  const [tagsInput, setTagsInput] = useState(item?.tags?.join(', ') || '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const dataToSave = { ...formData };
      
      if (dataToSave.type === 'work') {
        dataToSave.tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
      }
      
      if (item) {
        dataToSave.updatedAt = new Date().toISOString();
      }
      await setDoc(doc(db, 'content', formData.id!), dataToSave);
      onClose();
    } catch (err) {
      console.error('Error saving document: ', err);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onClose} className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={20} /> 돌아가기
      </button>

      <form onSubmit={handleSubmit} className="bg-[#12182B] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl space-y-6">
        <h2 className="text-2xl font-bold mb-6">{item ? '콘텐츠 수정' : '새 콘텐츠 추가'}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">분류</label>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange} 
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 appearance-none"
            >
              <option value="notice" className="bg-[#12182B]">공지사항 (Notice)</option>
              <option value="work" className="bg-[#12182B]">작품 (Work)</option>
              <option value="resource" className="bg-[#12182B]">배포 자료 (Resource)</option>
              <option value="ooc" className="bg-[#12182B]">OOC Playground (OOC)</option>
              <optgroup label="Archive (아카이브)" className="bg-[#12182B] text-white/50">
                <option value="image" className="bg-[#12182B] text-white">Image Archive (Category I)</option>
                <option value="worldview" className="bg-[#12182B] text-white">Worldview (Category W)</option>
                <option value="log" className="bg-[#12182B] text-white">Test Log (Category L)</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">코드 (아카이브용, 선택)</label>
            <input 
              name="code" 
              value={formData.code || ''} 
              onChange={handleChange} 
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">제목</label>
          <input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">요약 / 미리보기 (목록에 표시됨)</label>
          <textarea 
            name="excerpt" 
            value={formData.excerpt || ''} 
            onChange={handleChange} 
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 resize-none h-20" 
          />
        </div>

        {formData.type === 'work' && (
          <div className="space-y-6 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">플랫폼</label>
                <input name="platform" list="platform-options" value={formData.platform || ''} onChange={handleChange} placeholder="예: 크리지널" className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500" />
                <datalist id="platform-options">
                  <option value="크랙 오리지널" />
                  <option value="크랙 온리" />
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">장르</label>
                <input name="genre" value={formData.genre || ''} onChange={handleChange} placeholder="예: 판타지" className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">연재 상태</label>
                <input name="status" value={formData.status || ''} onChange={handleChange} placeholder="예: 연재중" className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">태그 (쉼표로 구분)</label>
              <input 
                type="text" 
                value={tagsInput} 
                onChange={(e) => setTagsInput(e.target.value)} 
                placeholder="예: 순애, 회귀, 집착" 
                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500" 
              />
            </div>
          </div>
        )}

        {formData.type === 'resource' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-4 rounded-xl border border-white/10">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">버전</label>
              <input name="version" value={formData.version || ''} onChange={handleChange} placeholder="예: v1.0.0" className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">다운로드 URL</label>
              <input name="downloadUrl" value={formData.downloadUrl || ''} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">이미지 URL (Cloudflare R2 등)</label>
            <input 
              name="imageUrl" 
              value={formData.imageUrl || ''} 
              onChange={handleChange} 
              placeholder="https://... (URL을 붙여넣으세요)"
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">외부 링크 (선택)</label>
            <input 
              name="link" 
              value={formData.link || ''} 
              onChange={handleChange} 
              placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" 
            />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
          <input
            type="checkbox"
            id="isPinned"
            name="isPinned"
            checked={formData.isPinned || false}
            onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
            className="w-5 h-5 rounded border-white/20 bg-black/40 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900 cursor-pointer"
          />
          <label htmlFor="isPinned" className="text-sm font-medium text-white cursor-pointer select-none">
            ⭐ Home 최상단에 고정하기 (Pinned)
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">
            본문 내용 (Markdown 지원)
          </label>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <textarea 
              name="content" 
              value={formData.content || ''} 
              onChange={handleChange} 
              placeholder="# 제목\n\n내용을 입력하세요..."
              className="w-full h-96 bg-white/5 border border-white/10 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:border-blue-500 resize-y" 
            />
            <div className="w-full h-96 bg-black/30 border border-white/5 rounded-lg p-4 overflow-y-auto">
              <div className="text-sm text-white/40 mb-2 border-b border-white/10 pb-2">미리보기</div>
              <div className="prose prose-invert prose-emerald prose-sm max-w-none prose-em:text-[#C0C4CC]/60 prose-em:italic prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h5:font-semibold prose-h6:text-base prose-headings:text-white">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {formData.content || '*내용이 없습니다.*'}
                </Markdown>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/10">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
