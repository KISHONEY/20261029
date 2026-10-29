import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../config';
import LoginButton from './LoginButton';

const navItems = [
  { to: '/', label: '홈', end: true },
  { to: '/research', label: '연구', end: false },
  { to: '/materials', label: '수업자료', end: false },
  { to: '/about', label: '소개', end: false },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm tracking-wide transition hover:text-accent ${isActive ? 'text-accent' : 'text-stone-700'}`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="font-serif text-xl tracking-wide sm:text-2xl">
          {siteConfig.siteName}
        </Link>

        {/* PC·태블릿 메뉴 */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="주 메뉴">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LoginButton />
          {/* 모바일 메뉴 버튼 */}
          <button
            type="button"
            className="p-2 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
          >
            <span className="block h-px w-5 bg-ink" />
            <span className="mt-1.5 block h-px w-5 bg-ink" />
            <span className="mt-1.5 block h-px w-5 bg-ink" />
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 펼침 */}
      {menuOpen && (
        <nav className="border-t border-stone-200 md:hidden" aria-label="모바일 메뉴">
          <div className="container-page flex flex-col py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={(s) => `${linkClass(s)} py-3`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
