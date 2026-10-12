import { ArchiveItem } from '../data/mockData';

export const normalizeSeriesName = (name?: string) => (name || '').normalize('NFC').trim().replace(/\s+/g, ' ');
export const seriesUrl = (name: string) => `/series?name=${encodeURIComponent(normalizeSeriesName(name))}`;

export function groupStoriesBySeries(items: ArchiveItem[], includePrivate = false) {
  const groups = new Map<string, ArchiveItem[]>();
  for (const item of items) {
    const name = normalizeSeriesName(item.seriesName);
    if (item.type !== 'work' || !name || (!includePrivate && item.isVisible !== true)) continue;
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name)!.push(item);
  }
  for (const stories of groups.values()) stories.sort((a, b) => {
    const orderA = Number.isInteger(a.seriesOrder) && a.seriesOrder! > 0 ? a.seriesOrder! : Infinity;
    const orderB = Number.isInteger(b.seriesOrder) && b.seriesOrder! > 0 ? b.seriesOrder! : Infinity;
    if (orderA !== orderB) return orderA < orderB ? -1 : 1;
    return a.date.localeCompare(b.date) || a.id.localeCompare(b.id);
  });
  return new Map([...groups.entries()].sort(([a], [b]) => a.localeCompare(b, 'ko')));
}
