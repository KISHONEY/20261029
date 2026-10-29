/**
 * 토론 영역 "자리"입니다. 아직 아무 기능도 동작하지 않습니다.
 * 🔌 나중에 Firebase(로그인 + Firestore)를 연결하면 이 부분을 실제 댓글 기능으로 바꿉니다.
 */
export default function DiscussionPlaceholder() {
  return (
    <section aria-labelledby="discussion-title" className="mt-20 border-t border-stone-200 pt-10">
      <h2 id="discussion-title" className="text-2xl">
        토론
      </h2>
      <p className="mt-2 text-sm text-stone-500">이 연구에 대한 생각과 질문을 나누는 공간입니다.</p>

      <div className="mt-6 border border-dashed border-stone-300 bg-stone-50 p-5">
        <label htmlFor="comment" className="sr-only">
          댓글
        </label>
        <textarea
          id="comment"
          rows={3}
          disabled
          placeholder="로그인 후 참여할 수 있습니다 (준비 중)"
          className="w-full cursor-not-allowed resize-none border border-stone-200 bg-white p-3 text-sm placeholder:text-stone-400"
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-500">로그인 후 참여할 수 있습니다. (준비 중)</p>
          <button
            type="button"
            disabled
            className="cursor-not-allowed bg-stone-300 px-5 py-2 text-sm text-white"
          >
            댓글 남기기
          </button>
        </div>
      </div>
    </section>
  );
}
