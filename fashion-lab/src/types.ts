/**
 * 데이터의 "모양"을 정해 두는 파일입니다.
 * 나중에 Firestore(구글의 온라인 데이터 저장소)로 옮길 때도 이 모양 그대로 저장하면 됩니다.
 */

/** 첨부 링크 하나 (예: PDF, 발표 자료, 외부 기사) */
export interface Link {
  title: string;
  url: string;
}

/** 연구 글과 수업자료가 공통으로 가지는 항목 */
export interface BaseItem {
  id: string; // 주소에 쓰이는 고유 이름 (영어 소문자·숫자·하이픈만, 서로 겹치지 않게)
  title: string;
  summary: string; // 목록 카드에 보이는 짧은 소개
  content: string; // 상세 본문 (빈 줄로 문단을 나눕니다)
  tags: string[];
  date: string; // 'YYYY-MM-DD' 형식
  links: Link[];
  coverImageUrl: string;
}

export type Research = BaseItem;

export interface Material extends BaseItem {
  semester: string; // 예: '2026-2학기'
  course: string; // 예: '패션디자인 스튜디오'
}
