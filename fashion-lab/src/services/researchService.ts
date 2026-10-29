/**
 * 연구 데이터를 가져오는 함수들입니다.
 * 화면(페이지)은 data 파일을 직접 읽지 않고 항상 이 함수들을 통해 데이터를 받습니다.
 *
 * 🔌 나중에 Firestore로 바꿀 때: 각 함수의 "안쪽"만 Firestore에서 읽어 오도록 고치면 되고,
 *    화면 코드는 고칠 필요가 없습니다. (그래서 지금도 async — "기다렸다 받는" 형태 — 로 만들어 두었습니다.)
 */
import { researchList } from '../data/research';
import type { Research } from '../types';
import { sortByDateDesc } from './utils';

export async function getAllResearch(): Promise<Research[]> {
  return sortByDateDesc(researchList);
}

export async function getRecentResearch(count = 3): Promise<Research[]> {
  return (await getAllResearch()).slice(0, count);
}

export async function getResearchById(id: string): Promise<Research | null> {
  return researchList.find((item) => item.id === id) ?? null;
}
