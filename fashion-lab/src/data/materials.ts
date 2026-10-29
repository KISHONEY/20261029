/**
 * ✏️ 수업자료 목록 — 이 파일만 고치면 "수업자료" 페이지 내용이 바뀝니다.
 *
 * 수정 방법
 * 1. 새 자료를 추가하려면: 아래 { ... }, 덩어리 하나를 통째로 복사해서 바로 아래에 붙여넣고 내용을 바꾸세요.
 * 2. 각 항목 설명
 *    - semester: 학기 (예: '2026-2학기'). 같은 글자로 쓴 자료끼리 묶여서 보입니다.
 *    - course: 과목 이름 (예: '패션디자인 스튜디오'). 학기 안에서 과목별로 묶입니다.
 *    - 나머지(id, title, summary, content, tags, date, links, coverImageUrl)는
 *      연구 파일(research.ts)과 같습니다. id는 다른 자료와 겹치지 않게 해 주세요.
 *    - links: 학생들이 받을 파일 링크(구글 드라이브 공유 링크 등)를 넣으면 됩니다.
 * 3. 따옴표, 쉼표, 괄호를 지우지 않도록 주의하세요.
 */
import type { Material } from '../types';

export const materialList: Material[] = [
  {
    id: '2026-2-studio-week1',
    semester: '2026-2학기',
    course: '패션디자인 스튜디오',
    title: '1주차: 시즌 콘셉트와 무드보드 만들기',
    summary: '컬렉션 기획의 출발점인 콘셉트 설정과 무드보드 구성 방법을 다룹니다.',
    content: `무드보드는 디자인의 분위기와 방향을 한눈에 보여주는 이미지 모음입니다.

이번 주에는 이미지 수집, 색상 추출, 키워드 정리의 순서로 무드보드를 만듭니다.`,
    tags: ['기획', '무드보드'],
    date: '2026-09-01',
    links: [{ title: '강의 슬라이드 (예시)', url: 'https://example.com/studio-week1' }],
    coverImageUrl: 'https://placehold.co/1200x800/e7e5e4/57534e?text=Moodboard',
  },
  {
    id: '2026-2-studio-week3',
    semester: '2026-2학기',
    course: '패션디자인 스튜디오',
    title: '3주차: 실루엣 스케치와 라인업 구성',
    summary: '콘셉트를 실루엣으로 옮기고, 6~8착장의 라인업을 구성하는 방법을 연습합니다.',
    content: `라인업은 컬렉션 전체를 나란히 세워 보는 그림입니다.

착장 간 비례, 색 배치, 아이템 반복과 변주를 중심으로 피드백합니다.`,
    tags: ['드로잉', '기획'],
    date: '2026-09-15',
    links: [
      { title: '라인업 템플릿 (예시)', url: 'https://example.com/lineup-template' },
      { title: '참고 컬렉션 목록 (예시)', url: 'https://example.com/references' },
    ],
    coverImageUrl: 'https://placehold.co/1200x800/d6d3d1/44403c?text=Line-up',
  },
  {
    id: '2026-2-textile-intro',
    semester: '2026-2학기',
    course: '패션소재기획',
    title: '소재 기초: 섬유의 종류와 특성',
    summary: '천연섬유와 합성섬유의 특성, 그리고 지속가능 소재의 최신 흐름을 정리합니다.',
    content: `면, 마, 울, 실크 같은 천연섬유와 폴리에스터, 나일론 같은 합성섬유의 장단점을 비교합니다.

리사이클 폴리에스터, 텐셀 등 지속가능 소재 사례도 함께 살펴봅니다.`,
    tags: ['소재', '지속가능성'],
    date: '2026-09-03',
    links: [{ title: '섬유 특성 정리표 (예시)', url: 'https://example.com/fiber-table' }],
    coverImageUrl: 'https://placehold.co/1200x800/f5f5f4/78716c?text=Textile',
  },
  {
    id: '2026-1-pattern-basic',
    semester: '2026-1학기',
    course: '패턴메이킹 기초',
    title: '스커트 원형 제도',
    summary: '기본 스커트 원형을 제도하고, 다트 이동으로 변형하는 방법을 익힙니다.',
    content: `허리둘레, 엉덩이둘레, 스커트 길이 치수를 바탕으로 원형을 제도합니다.

다트를 이동하거나 접어 A라인, 플레어 스커트로 변형해 봅니다.`,
    tags: ['패턴'],
    date: '2026-03-10',
    links: [{ title: '제도 순서 안내 PDF (예시)', url: 'https://example.com/skirt-pattern.pdf' }],
    coverImageUrl: 'https://placehold.co/1200x800/cbd5e1/334155?text=Pattern',
  },
];
