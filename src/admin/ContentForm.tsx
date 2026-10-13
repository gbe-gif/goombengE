import { useContent } from '../hooks/useContent';
import { normalizeSeriesName } from '../utils/series';
import { DEFAULT_STORY_LINK_LABEL, getStoryLinks, isStoryUrl } from '../utils/storyLinks';
import { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ArchiveItem } from '../data/mockData';
import { ArrowLeft, Save } from 'lucide-react';
import MarkdownContent from '../components/MarkdownContent';

interface ContentFormProps {
  item: ArchiveItem | null;
  onClose: () => void;
}

export default function ContentForm({ item, onClose }: ContentFormProps) {
  const { content } = useContent();
  const existingSeries = [...new Set(content.filter(story => story.type === 'work').map(story => normalizeSeriesName(story.seriesName)).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'ko'));
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
  const [storyLinks, setStoryLinks] = useState(() => getStoryLinks(item || {}));
  const addStoryLink = (label = DEFAULT_STORY_LINK_LABEL) => setStoryLinks(prev => [...prev, { label, url: '' }]);
  const updateStoryLink = (index: number, field: 'label' | 'url', value: string) => setStoryLinks(prev => prev.map((link, i) => i === index ? { ...link, [field]: value } : link));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type === 'work' && storyLinks.some(link => !isStoryUrl(link.url.trim()))) {
      alert('스토리 링크에 http:// 또는 https://로 시작하는 주소를 입력해 주세요.');
      return;
    }
    setSaving(true);
    try {
      const dataToSave = { ...formData, isVisible: formData.isVisible === true };
      
      if (dataToSave.type === 'work') {
        dataToSave.storyLinks = storyLinks.map(link => ({ label: link.label.trim() || DEFAULT_STORY_LINK_LABEL, url: link.url.trim() }));
        delete dataToSave.link;
        dataToSave.tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
        dataToSave.seriesName = normalizeSeriesName(formData.seriesName);
        if (!dataToSave.seriesName || !Number.isInteger(dataToSave.seriesOrder) || dataToSave.seriesOrder! < 1) delete dataToSave.seriesOrder;
      } else {
        delete dataToSave.storyLinks;
        delete dataToSave.seriesName;
        delete dataToSave.seriesOrder;
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
              <option value="work" className="bg-[#12182B]">스토리 (Work)</option>
              <option value="resource" className="bg-[#12182B]">배포 자료 (Resource)</option>
              <option value="ooc" className="bg-[#12182B]">OOC Playground (OOC)</option>
              <option value="devnote" className="bg-[#12182B]">기록</option>
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
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-4">
              <div>
                <label htmlFor="series-name" className="block text-sm font-medium text-white/60 mb-2">시리즈 (선택)</label>
                <input id="series-name" name="seriesName" list="series-options" value={formData.seriesName || ''} onChange={handleChange} placeholder="기존 시리즈를 선택하거나 새 이름 입력" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white" />
                <datalist id="series-options">{existingSeries.map(name => <option key={name} value={name} />)}</datalist>
                <p className="text-xs text-slate-400 mt-2">같은 이름의 스토리는 한 시리즈로 묶입니다. 비우면 시리즈에서 제외됩니다.</p>
              </div>
              <div>
                <label htmlFor="series-order" className="block text-sm font-medium text-white/60 mb-2">시리즈 순서 (선택)</label>
                <input id="series-order" type="number" min="1" step="1" disabled={!formData.seriesName?.trim()} value={formData.seriesOrder ?? ''} onChange={e => setFormData(prev => ({ ...prev, seriesOrder: e.target.value === '' ? undefined : e.target.valueAsNumber }))} placeholder="예: 1" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white disabled:opacity-40" />
                <p className="text-xs text-slate-400 mt-2">순서를 비우면 작성일 순으로 표시됩니다.</p>
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
          {formData.type !== 'work' && <div>
            <label className="block text-sm font-medium text-white/60 mb-2">외부 링크 (선택)</label>
            <input 
              name="link" 
              value={formData.link || ''} 
              onChange={handleChange} 
              placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" 
            />
          </div>}
        </div>

        {formData.type === 'work' && <section className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div><h3 className="font-semibold">스토리 사이트 링크</h3><p className="text-sm text-slate-400 mt-1">버전이나 플랫폼별로 원하는 만큼 추가하세요. 입력한 순서대로 버튼이 표시됩니다.</p></div>
          {storyLinks.map((link, index) => <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 border-b border-white/10 pb-4">
            <div><label htmlFor={`story-label-${index}`} className="block text-sm text-slate-300 mb-2">버튼 문구 {index + 1}</label>
              <input id={`story-label-${index}`} value={link.label} onChange={e => updateStoryLink(index, 'label', e.target.value)} placeholder={DEFAULT_STORY_LINK_LABEL} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white" /></div>
            <div><label htmlFor={`story-url-${index}`} className="block text-sm text-slate-300 mb-2">사이트 주소 {index + 1}</label>
              <input id={`story-url-${index}`} type="url" required value={link.url} onChange={e => updateStoryLink(index, 'url', e.target.value)} placeholder="https://..." className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white" /></div>
            <button type="button" aria-label={`스토리 링크 ${index + 1} 삭제`} onClick={() => setStoryLinks(prev => prev.filter((_, i) => i !== index))} className="sm:self-end rounded-lg px-3 py-3 text-red-300 hover:bg-red-500/10">삭제</button>
          </div>)}
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => addStoryLink()} className="rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-200 hover:bg-blue-500/30">+ 링크 추가</button>
            <button type="button" onClick={() => addStoryLink('세이프 버전으로 이동')} className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20">+ 세이프 버전</button>
            <button type="button" onClick={() => addStoryLink('언세이프 버전으로 이동')} className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20">+ 언세이프 버전</button>
            <button type="button" onClick={() => addStoryLink('소개 사이트로 이동')} className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20">+ 소개 사이트</button>
          </div>
        </section>}

        <label className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
          <input type="checkbox" checked={formData.isVisible === true} onChange={e => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))} className="w-5 h-5" />
          <span className="text-sm text-white">방문자에게 공개하기 <span className="text-slate-400">(해제하면 관리자만 볼 수 있어요)</span></span>
        </label>

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
              <div className="prose prose-invert prose-emerald prose-sm max-w-none prose-em:text-[#C0C4CC]/60 prose-em:italic prose-headings:text-white">
                <MarkdownContent copyCodeBlocks={formData.type === 'ooc'}>
                  {formData.content || '*내용이 없습니다.*'}
                </MarkdownContent>
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
