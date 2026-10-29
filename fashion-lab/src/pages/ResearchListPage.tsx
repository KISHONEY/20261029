import { useSearchParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import PageTitle from '../components/PageTitle';
import { LoadError, Loading } from '../components/StatusMessage';
import { getAllResearch } from '../services/researchService';
import { useAsync } from '../services/useAsync';

export default function ResearchListPage() {
  const { data, loading, error } = useAsync(getAllResearch);
  // 선택한 태그를 주소(?tag=...)에 저장해서, 링크를 공유해도 같은 필터가 보이게 합니다.
  const [params, setParams] = useSearchParams();
  const selected = params.get('tag');

  if (loading) return <Loading />;
  if (error || !data) return <LoadError />;

  const tags = Array.from(new Set(data.flatMap((item) => item.tags)));
  const filtered = selected ? data.filter((item) => item.tags.includes(selected)) : data;

  const select = (tag: string | null) => setParams(tag ? { tag } : {});

  return (
    <div className="container-page">
      <PageTitle eyebrow="Research" title="연구" description="진행한 연구와 프로젝트 기록입니다." />

      <div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="분류 필터">
        <FilterButton active={!selected} onClick={() => select(null)}>
          전체
        </FilterButton>
        {tags.map((tag) => (
          <FilterButton key={tag} active={selected === tag} onClick={() => select(tag)}>
            {tag}
          </FilterButton>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-sm text-stone-500">해당 분류의 연구가 없습니다.</p>
      ) : (
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} to={`/research/${item.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-4 py-1.5 text-sm transition ${
        active ? 'border-ink bg-ink text-white' : 'border-stone-300 text-stone-600 hover:border-ink'
      }`}
    >
      {children}
    </button>
  );
}
