import { siteConfig } from '../config';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200">
      <div className="container-page flex flex-col gap-2 py-10 text-sm text-stone-500 sm:flex-row sm:justify-between">
        <p className="font-serif text-base text-ink">{siteConfig.siteName}</p>
        <p>
          {siteConfig.professor.name} · {siteConfig.professor.title} ·{' '}
          <a href={`mailto:${siteConfig.professor.email}`} className="hover:text-accent">
            {siteConfig.professor.email}
          </a>
        </p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
