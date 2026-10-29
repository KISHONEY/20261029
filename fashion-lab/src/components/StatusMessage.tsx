/** 데이터를 불러오는 중이거나 실패했을 때 보여 주는 문구 */
export function Loading() {
  return <p className="py-20 text-center text-sm text-stone-400">불러오는 중…</p>;
}

export function LoadError() {
  return (
    <p className="py-20 text-center text-sm text-stone-500">
      내용을 불러오지 못했습니다. 잠시 후 새로고침해 주세요.
    </p>
  );
}
