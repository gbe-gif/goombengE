import { ExternalLink } from 'lucide-react';
import type { ArchiveItem } from '../data/mockData';
import { getStoryLinks } from '../utils/storyLinks';

export default function StoryLinks({ item, compact = false }: { item: ArchiveItem; compact?: boolean }) {
  const links = getStoryLinks(item);
  if (!links.length) return null;
  return <div className={`flex flex-wrap gap-2 ${compact ? 'mb-4' : ''}`}>
    {links.map((link, index) => <a key={`${index}-${link.url}`} href={link.url} target="_blank" rel="noopener noreferrer"
      className={compact ? 'inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300 hover:bg-blue-500/30 max-w-full' : 'primary-button max-w-full'}>
      <span className="break-words min-w-0">{link.label}</span><ExternalLink size={compact ? 16 : 18} className="shrink-0" />
    </a>)}
  </div>;
}
