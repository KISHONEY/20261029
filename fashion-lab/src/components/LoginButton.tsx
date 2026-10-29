import { useEffect, useRef, useState } from 'react';

/** 우측 상단 로그인 버튼. 지금은 누르면 "준비 중" 안내만 보여 줍니다. */
export default function LoginButton() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // 바깥을 누르거나 Esc 키를 누르면 안내창이 닫힙니다.
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

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="border border-ink px-4 py-1.5 text-sm transition hover:bg-ink hover:text-white"
      >
        로그인
      </button>
      {open && (
        <div
          role="status"
          className="absolute right-0 top-full z-20 mt-2 w-64 border border-stone-200 bg-white p-4 text-sm shadow-lg"
        >
          <p className="font-medium">로그인 기능은 준비 중입니다.</p>
          <p className="mt-1 text-stone-500">곧 구글 계정으로 로그인할 수 있도록 할 예정입니다.</p>
        </div>
      )}
    </div>
  );
}
