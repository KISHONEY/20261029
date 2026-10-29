import PageTitle from '../components/PageTitle';
import { siteConfig } from '../config';

export default function AboutPage() {
  const p = siteConfig.professor;
  return (
    <div className="container-page">
      <PageTitle eyebrow="About" title="소개" />
      <div className="grid gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
        <img src={p.photoUrl} alt={`${p.name} 프로필 사진`} className="aspect-[4/5] w-full bg-stone-100 object-cover" />
        <div>
          <h2 className="text-4xl">{p.name}</h2>
          <p className="mt-2 text-stone-500">{p.title}</p>
          <p className="mt-8 leading-loose text-stone-700">{p.bio}</p>

          <h3 className="mt-12 text-2xl">연구 분야</h3>
          <ul className="mt-4 space-y-2 text-stone-700">
            {p.researchAreas.map((area) => (
              <li key={area} className="flex gap-3">
                <span className="mt-3 h-px w-4 shrink-0 bg-accent" />
                {area}
              </li>
            ))}
          </ul>

          <h3 className="mt-12 text-2xl">연락처</h3>
          <dl className="mt-4 grid grid-cols-[5rem_1fr] gap-y-2 text-stone-700">
            <dt className="text-stone-500">이메일</dt>
            <dd>
              <a href={`mailto:${p.email}`} className="hover:text-accent">
                {p.email}
              </a>
            </dd>
            <dt className="text-stone-500">연구실</dt>
            <dd>{p.office}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
