import type { ArchiveItem } from '../data/mockData';
import { getCategoryLabel } from './category';

export const adminCategories: ArchiveItem['type'][] = ['notice', 'work', 'ooc', 'devnote', 'resource', 'image', 'worldview', 'log'];

export function groupAdminContent(content: ArchiveItem[], category: string = 'all') {
  const pinned = content.filter(item => item.isAdminPinned === true);
  const groups = adminCategories
    .filter(type => category === 'all' || category === type)
    .map(type => ({ id: type as string, label: getCategoryLabel(type), items: content.filter(item => item.type === type && item.isAdminPinned !== true) }))
    .filter(group => group.items.length > 0);
  return pinned.length ? [{ id: 'pinned', label: '📌 자주 수정하는 고정 글', items: pinned }, ...groups] : groups;
}
