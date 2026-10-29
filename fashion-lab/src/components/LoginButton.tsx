import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../lib/auth';
import { isFirebaseReady } from '../lib/firebase';

/**
 * 우측 상단 로그인 버튼.
 * - Firebase 설정 전: 누르면 "준비 중" 안내
 * - 로그인 전: 누르면 구글 로그인 창
 * - 로그인 후: 이름을 누르면 로그아웃 메뉴
 */
export default function LoginButton() {
  const { user, loading, signIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // 바깥을 누르거나 Esc 키를 누르면 안내창·메뉴가 닫힙니다.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const buttonClass = 'border border-ink px-4 py-1.5 text-sm transition hover:bg-ink hover:text-white';
  const popoverClass =
    'absolute right-0 top-full z-20 mt-2 w-64 border border-stone-200 bg-white p-4 text-sm shadow-lg';

  if (loading) return <span className="w-16" aria-hidden="true" />;

  if (user) {
    return (
      <div ref={boxRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex items-center gap-2 text-sm hover:text-accent"
        >
          <Avatar url={user.photoURL} name={user.displayName} />
          <span className="hidden max-w-[8rem] truncate sm:inline">{user.displayName}</span>
        </button>
        {open && (
          <div className={popoverClass}>
            <p className="font-medium">{user.displayName}</p>
            <p className="mt-1 truncate text-stone-500">{user.email}</p>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className={`${buttonClass} mt-4 w-full`}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    );
  }

  if (isFirebaseReady) {
    return (
      <button type="button" onClick={signIn} className={buttonClass}>
        로그인
      </button>
    );
  }

  return (
    <div ref={boxRef} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className={buttonClass}>
        로그인
      </button>
      {open && (
        <div role="status" className={popoverClass}>
          <p className="font-medium">로그인 기능은 준비 중입니다.</p>
          <p className="mt-1 text-stone-500">곧 구글 계정으로 로그인할 수 있도록 할 예정입니다.</p>
        </div>
      )}
    </div>
  );
}

export function Avatar({ url, name }: { url: string | null; name: string | null }) {
  return url ? (
    <img src={url} alt="" referrerPolicy="no-referrer" className="h-8 w-8 rounded-full bg-stone-200 object-cover" />
  ) : (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200 text-xs">
      {name?.[0] ?? '?'}
    </span>
  );
}
