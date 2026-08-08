import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { Link, useNavigate } from 'react-router-dom';
import { ArchiveItem } from '../data/mockData';

export default function SearchBar({ onSelect }: { onSelect?: () => void }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useContent();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = query.trim() ? content.filter(item => {
    const q = query.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(q);
    const contentMatch = (item.content || '').toLowerCase().includes(q);
    const excerptMatch = (item.excerpt || '').toLowerCase().includes(q);
    return nameMatch || contentMatch || excerptMatch;
  }).slice(0, 10) : [];

  const handleSelect = (id: string) => {
    setIsOpen(false);
    setQuery('');
    if (onSelect) onSelect();
    navigate(`/post/${id}`);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-[#C0C4CC]/50" size={18} />
        <input
          type="text"
          placeholder="검색..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-colors"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 text-[#C0C4CC]/50 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-[#12182B] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            <ul className="py-2">
              {searchResults.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSelect(item.id)}
                    className="w-full text-left px-4 py-2 hover:bg-white/5 transition-colors flex flex-col gap-1"
                  >
                    <div className="text-sm font-medium text-white line-clamp-1">{item.name}</div>
                    {item.excerpt && (
                      <div className="text-xs text-[#C0C4CC]/60 line-clamp-1">{item.excerpt}</div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-4 text-sm text-[#C0C4CC]/60 text-center">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
