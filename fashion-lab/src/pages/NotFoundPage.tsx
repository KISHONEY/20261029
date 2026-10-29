import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container-page py-32 text-center">
      <p className="font-serif text-7xl text-stone-300">404</p>
      <h1 className="mt-6 text-3xl">페이지를 찾을 수 없습니다</h1>
      <p className="mt-4 text-stone-600">주소가 바뀌었거나 삭제된 페이지일 수 있습니다.</p>
      <Link to="/" className="mt-10 inline-block border border-ink px-6 py-2 text-sm hover:bg-ink hover:text-white">
        홈으로 가기
      </Link>
    </div>
  );
}
