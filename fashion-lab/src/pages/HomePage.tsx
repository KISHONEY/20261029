import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { siteConfig } from '../config';
import { getRecentMaterials } from '../services/materialService';
import { getRecentResearch } from '../services/researchService';
import { useAsync } from '../services/useAsync';

export default function HomePage() {
  const research = useAsync(() => getRecentResearch(3));
  const materials = useAsync(() => getRecentMaterials(3));

  return (
    <>
      {/* 사이트 소개 */}
      <section className="container-page py-20 sm:py-32">
        <p className="eyebrow">{siteConfig.professor.title}</p>
        <h1 className="mt-6 max-w-4xl text-4xl leading-tight sm:text-6xl">{siteConfig.tagline}</h1>
        <p className="mt-8 max-w-2xl leading-relaxed text-stone-600">{siteConfig.intro}</p>
        <div className="mt-10 h-px w-16 bg-accent" />
      </section>

      <HomeSection title="최근 연구" moreTo="/research">
        {research.data?.map((item) => (
          <ItemCard key={item.id} item={item} to={`/research/${item.id}`} />
        ))}
      </HomeSection>

      <HomeSection title="최근 수업자료" moreTo="/materials">
        {materials.data?.map((item) => (
          <ItemCard key={item.id} item={item} meta={item.course} to="/materials" />
        ))}
      </HomeSection>
    </>
  );
}

function HomeSection({ title, moreTo, children }: { title: string; moreTo: string; children: React.ReactNode }) {
  return (
    <section className="container-page py-12">
      <div className="mb-8 flex items-end justify-between border-b border-stone-200 pb-4">
        <h2 className="text-3xl">{title}</h2>
        <Link to={moreTo} className="text-sm text-stone-600 hover:text-accent">
          전체 보기 →
        </Link>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}
