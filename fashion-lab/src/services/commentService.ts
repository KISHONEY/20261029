/**
 * 토론(댓글)을 Firestore에 저장하고 읽어 오는 함수들입니다.
 * 저장 위치: research/{연구 id}/comments/{댓글 id}
 * 누가 무엇을 할 수 있는지는 firestore.rules 파일(보안 규칙)이 정합니다.
 */
import type { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export const MAX_COMMENT_LENGTH = 1000;

export interface Comment {
  id: string;
  text: string;
  authorUid: string;
  authorName: string;
  authorPhotoUrl: string;
  createdAt: Date | null; // 방금 쓴 댓글은 서버 시간이 정해지기 전까지 잠깐 null
}

function commentsRef(researchId: string) {
  if (!db) throw new Error('Firebase가 연결되지 않았습니다.');
  return collection(db, 'research', researchId, 'comments');
}

/** 댓글 목록을 실시간으로 받아 봅니다. 돌려주는 함수를 부르면 받아 보기를 멈춥니다. */
export function subscribeComments(
  researchId: string,
  onChange: (comments: Comment[]) => void,
  onError: (error: Error) => void,
): () => void {
  const q = query(commentsRef(researchId), orderBy('createdAt', 'asc'));
  return onSnapshot(
    q,
    (snap) =>
      onChange(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            text: data.text,
            authorUid: data.authorUid,
            authorName: data.authorName,
            authorPhotoUrl: data.authorPhotoUrl,
            createdAt: (data.createdAt as Timestamp | null)?.toDate() ?? null,
          };
        }),
      ),
    onError,
  );
}

export async function addComment(researchId: string, text: string, user: User): Promise<void> {
  await addDoc(commentsRef(researchId), {
    text: text.trim().slice(0, MAX_COMMENT_LENGTH),
    authorUid: user.uid,
    authorName: (user.displayName ?? '이름 없음').slice(0, 100),
    authorPhotoUrl: (user.photoURL ?? '').slice(0, 500),
    createdAt: serverTimestamp(),
  });
}

export async function deleteComment(researchId: string, commentId: string): Promise<void> {
  await deleteDoc(doc(commentsRef(researchId), commentId));
}
