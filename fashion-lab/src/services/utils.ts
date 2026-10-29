import type { BaseItem } from '../types';

/** 최신 날짜가 먼저 오도록 정렬합니다. (원본 배열은 건드리지 않음) */
export function sortByDateDesc<T extends BaseItem>(items: T[]): T[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

/** '2026-09-15' → '2026. 9. 15.' */
export function formatDate(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  return `${y}. ${m}. ${d}.`;
}
