import type { Link } from '../types';

/** 첨부 링크 목록. 새 탭에서 열립니다. */
export default function LinkList({ links }: { links: Link[] }) {
  if (links.length === 0) return null;
  return (
    <ul className="divide-y divide-stone-200 border-y border-stone-200">
      {links.map((link) => (
        <li key={link.url}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 py-3 text-sm hover:text-accent"
          >
            <span>{link.title}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
