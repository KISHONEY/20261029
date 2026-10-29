import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { isFirebaseReady } from '../lib/firebase';
import {
  addComment,
  deleteComment,
  MAX_COMMENT_LENGTH,
  subscribeComments,
  type Comment,
} from '../services/commentService';
import { Avatar } from './LoginButton';

/** 연구 상세 페이지 아래의 토론(댓글) 영역 */
export default function Discussion({ researchId }: { researchId: string }) {
  const { user, loading } = useAuth();

  return (
    <section aria-labelledby="discussion-title" className="mt-20 border-t border-stone-200 pt-10">
      <h2 id="discussion-title" className="text-2xl">
        토론
      </h2>
      <p className="mt-2 text-sm text-stone-500">이 연구에 대한 생각과 질문을 나누는 공간입니다.</p>

      {!isFirebaseReady ? (
        <NotReady />
      ) : loading ? null : user ? (
        <CommentThread researchId={researchId} />
      ) : (
        <SignInPrompt />
      )}
    </section>
  );
}

/** Firebase 설정 전: 모양만 보여 줍니다. */
function NotReady() {
  return (
    <div className="mt-6 border border-dashed border-stone-300 bg-stone-50 p-5">
      <textarea
        rows={3}
        disabled
        aria-label="댓글"
        placeholder="로그인 후 참여할 수 있습니다 (준비 중)"
        className="w-full cursor-not-allowed resize-none border border-stone-200 bg-white p-3 text-sm placeholder:text-stone-400"
      />
      <p className="mt-3 text-sm text-stone-500">로그인 후 참여할 수 있습니다. (준비 중)</p>
    </div>
  );
}

function SignInPrompt() {
  const { signIn } = useAuth();
  return (
    <div className="mt-6 flex flex-col items-start gap-4 border border-stone-200 bg-stone-50 p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-stone-600">구글 계정으로 로그인하면 댓글을 보고 남길 수 있습니다.</p>
      <button type="button" onClick={signIn} className="bg-ink px-5 py-2 text-sm text-white hover:bg-accent">
        구글로 로그인
      </button>
    </div>
  );
}

function CommentThread({ researchId }: { researchId: string }) {
  const { user, isAdmin } = useAuth();
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setComments(null);
    setLoadError(false);
    return subscribeComments(researchId, setComments, (e) => {
      console.error(e);
      setLoadError(true);
    });
  }, [researchId]);

  if (!user) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await addComment(researchId, text, user);
      setText('');
    } catch (err) {
      console.error(err);
      alert('댓글을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setSending(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('이 댓글을 삭제할까요?')) return;
    try {
      await deleteComment(researchId, id);
    } catch (err) {
      console.error(err);
      alert('댓글을 삭제하지 못했습니다.');
    }
  };

  return (
    <div className="mt-6">
      {loadError && <p className="py-4 text-sm text-stone-500">댓글을 불러오지 못했습니다. 새로고침해 주세요.</p>}
      {comments === null && !loadError && <p className="py-4 text-sm text-stone-400">불러오는 중…</p>}
      {comments?.length === 0 && <p className="py-4 text-sm text-stone-500">아직 댓글이 없습니다. 첫 의견을 남겨 주세요.</p>}

      <ul className="divide-y divide-stone-200">
        {comments?.map((c) => (
          <li key={c.id} className="flex gap-4 py-5">
            <Avatar url={c.authorPhotoUrl || null} name={c.authorName} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 text-sm">
                <span className="font-medium">{c.authorName}</span>
                <span className="text-xs text-stone-400">{c.createdAt ? formatDateTime(c.createdAt) : '방금'}</span>
                {(c.authorUid === user.uid || isAdmin) && (
                  <button
                    type="button"
                    onClick={() => remove(c.id)}
                    className="ml-auto text-xs text-stone-400 hover:text-accent"
                  >
                    삭제
                  </button>
                )}
              </div>
              <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-stone-800">{c.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="mt-6 border border-stone-200 p-4">
        <label htmlFor="comment" className="sr-only">
          댓글
        </label>
        <textarea
          id="comment"
          rows={3}
          value={text}
          maxLength={MAX_COMMENT_LENGTH}
          onChange={(e) => setText(e.target.value)}
          placeholder={`${user.displayName ?? ''} 님의 의견을 남겨 주세요`}
          className="w-full resize-y border border-stone-200 p-3 text-sm focus:border-ink focus:outline-none"
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-xs text-stone-400">
            {text.length}/{MAX_COMMENT_LENGTH}
          </span>
          <button
            type="submit"
            disabled={!text.trim() || sending}
            className="bg-ink px-5 py-2 text-sm text-white hover:bg-accent disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {sending ? '저장 중…' : '댓글 남기기'}
          </button>
        </div>
      </form>
    </div>
  );
}

function formatDateTime(d: Date): string {
  return d.toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' });
}
