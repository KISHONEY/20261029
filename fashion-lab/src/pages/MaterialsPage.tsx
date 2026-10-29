import { useSearchParams } from 'react-router-dom';
import { TagList } from '../components/ItemCard';
import LinkList from '../components/LinkList';
import PageTitle from '../components/PageTitle';
import { LoadError, Loading } from '../components/StatusMessage';
import { getAllMaterials } from '../services/materialService';
import { useAsync } from '../services/useAsync';
import { formatDate } from '../services/utils';
import type { Material } from '../types';
import { FilterButton } from './ResearchListPage';

export default function MaterialsPage() {
  const { data, loading, error } = useAsync(getAllMaterials);
  const [params, setParams] = useSearchParams();

  if (loading) return <Loading />;
  if (error || !data) return <LoadError />;

  // 학기 목록 (최신 학기가 앞). 선택이 없으면 가장 최근 학기를 보여 줍니다.
  const semesters = Array.from(new Set(data.map((m) => m.semester))).sort().reverse();
  const selected = params.get('semester') ?? semesters[0];
  const inSemester = data.filter((m) => m.semester === selected);

  // 과목별로 묶기
  const byCourse = new Map<string, Material[]>();
  for (const m of inSemester) byCourse.set(m.course, [...(byCourse.get(m.course) ?? []), m]);

  return (
    <div className="container-page">
      <PageTitle eyebrow="Course Materials" title="수업자료" description="학기와 과목별로 정리한 수업자료입니다." />

      <div className="mb-14 flex flex-wrap gap-2" role="group" aria-label="학기 선택">
        {semesters.map((s) => (
          <FilterButton key={s} active={s === selected} onClick={() => setParams({ semester: s })}>
            {s}
          </FilterButton>
        ))}
      </div>

      {byCourse.size === 0 && <p className="text-sm text-stone-500">해당 학기의 자료가 없습니다.</p>}

      <div className="space-y-20">
        {[...byCourse].map(([course, items]) => (
          <section key={course}>
            <h2 className="border-b border-stone-200 pb-4 text-3xl">{course}</h2>
            <div className="divide-y divide-stone-200">
              {items.map((m) => (
                <MaterialRow key={m.id} material={m} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function MaterialRow({ material: m }: { material: Material }) {
  return (
    <article className="grid gap-6 py-10 md:grid-cols-[240px_1fr] md:gap-10">
      <img src={m.coverImageUrl} alt="" loading="lazy" className="aspect-[4/3] w-full bg-stone-100 object-cover" />
      <div>
        <p className="eyebrow">{formatDate(m.date)}</p>
        <h3 className="mt-2 text-2xl">{m.title}</h3>
        <p className="mt-3 leading-relaxed text-stone-600">{m.summary}</p>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-stone-700">
          {m.content.split(/\n\s*\n/).map((p, i) => (
            <p key={i}>{p.trim()}</p>
          ))}
        </div>
        <TagList tags={m.tags} className="mt-4" />
        {m.links.length > 0 && (
          <div className="mt-6">
            <LinkList links={m.links} />
          </div>
        )}
      </div>
    </article>
  );
}
