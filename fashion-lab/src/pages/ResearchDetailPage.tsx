import { Link, useParams } from 'react-router-dom';
import Discussion from '../components/Discussion';
import { TagList } from '../components/ItemCard';
import LinkList from '../components/LinkList';
import { LoadError, Loading } from '../components/StatusMessage';
import { getResearchById } from '../services/researchService';
import { useAsync } from '../services/useAsync';
import { formatDate } from '../services/utils';
import NotFoundPage from './NotFoundPage';

export default function ResearchDetailPage() {
  const { id = '' } = useParams();
  const { data: item, loading, error } = useAsync(() => getResearchById(id), [id]);

  if (loading) return <Loading />;
  if (error) return <LoadError />;
  if (!item) return <NotFoundPage />;

  return (
    <article className="container-page max-w-3xl">
      <Link to="/research" className="mt-10 inline-block text-sm text-stone-500 hover:text-accent">
        ← 연구 목록
      </Link>

      <header className="pb-10 pt-8">
        <p className="eyebrow">{formatDate(item.date)}</p>
        <h1 className="mt-4 text-3xl leading-tight sm:text-5xl">{item.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-stone-600">{item.summary}</p>
        <TagList tags={item.tags} className="mt-6" />
      </header>

      <img src={item.coverImageUrl} alt="" className="aspect-[3/2] w-full bg-stone-100 object-cover" />

      <div className="mt-12 space-y-6 leading-loose text-stone-800">
        {item.content.split(/\n\s*\n/).map((paragraph, i) => (
          <p key={i}>{paragraph.trim()}</p>
        ))}
      </div>

      {item.links.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-2xl">첨부 자료</h2>
          <LinkList links={item.links} />
        </section>
      )}

      <Discussion researchId={item.id} />
    </article>
  );
}
