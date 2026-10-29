import { Link } from 'react-router-dom';
import { formatDate } from '../services/utils';
import type { BaseItem } from '../types';

interface Props {
  item: BaseItem;
  to?: string; // 누르면 이동할 주소 (없으면 이동 없이 카드만 표시)
  meta?: string; // 날짜 옆에 붙는 추가 정보 (예: 과목명)
}

/** 이미지 중심 카드. 연구·수업자료 목록에서 함께 씁니다. */
export default function ItemCard({ item, to, meta }: Props) {
  const body = (
    <>
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={item.coverImageUrl}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <p className="eyebrow">
          {formatDate(item.date)}
          {meta && ` · ${meta}`}
        </p>
        <h3 className="mt-2 text-xl leading-snug group-hover:text-accent">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600">{item.summary}</p>
        <TagList tags={item.tags} className="mt-3" />
      </div>
    </>
  );

  return to ? (
    <Link to={to} className="group block">
      {body}
    </Link>
  ) : (
    <article className="group">{body}</article>
  );
}

export function TagList({ tags, className = '' }: { tags: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li key={tag} className="border border-stone-300 px-2 py-0.5 text-xs text-stone-600">
          {tag}
        </li>
      ))}
    </ul>
  );
}
