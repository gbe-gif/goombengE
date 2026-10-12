import type { ArchiveItem } from '../data/mockData';

export const DEFAULT_STORY_LINK_LABEL = '스토리 사이트로 이동';

export function isStoryUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

// An explicitly empty list means the owner removed every link.
export function getStoryLinks(item: Pick<ArchiveItem, 'link' | 'storyLinks'>) {
  const links = Array.isArray(item.storyLinks)
    ? item.storyLinks
    : item.link ? [{ label: DEFAULT_STORY_LINK_LABEL, url: item.link }] : [];
  return links
    .filter(link => typeof link?.url === 'string' && isStoryUrl(link.url.trim()))
    .map(link => ({ label: link.label?.trim() || DEFAULT_STORY_LINK_LABEL, url: link.url.trim() }));
}
