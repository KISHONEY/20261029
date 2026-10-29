/**
 * ✏️ 사이트 기본 정보 — 이 파일만 고치면 사이트 곳곳에 반영됩니다.
 *
 * 수정 방법
 * - 따옴표(' ') 안의 글자만 바꾸세요. 따옴표와 쉼표는 지우지 마세요.
 * - 저장하면 화면이 자동으로 새로고침됩니다.
 */
export const siteConfig = {
  // 사이트 이름 (상단 로고, 브라우저 탭, 푸터에 표시)
  siteName: 'Fashion Research Lab',

  // 홈 화면 첫 문장과 소개 글
  tagline: '옷과 몸, 기술과 지속가능성 사이를 연구합니다.',
  intro:
    '패션디자인 연구와 수업 자료를 모아 두는 아카이브입니다. 연구 기록을 공유하고, 학생들과 함께 이야기 나누는 공간으로 키워 가려 합니다.',

  // 소개(About) 페이지에 들어갈 교수 정보
  professor: {
    name: '정기성',
    title: '패션디자인학과 교수',
    photoUrl: 'https://placehold.co/600x750/e7e5e4/57534e?text=Profile',
    bio: '지속가능한 패션 디자인과 디지털 패턴 기술을 연구합니다. 전통 복식의 구조를 현대 디자인 언어로 다시 해석하는 작업에 관심이 많습니다.',
    researchAreas: ['지속가능 패션', '제로 웨이스트 패턴', '디지털 패션·3D 가상착장', '한국 전통 복식의 현대화'],
    email: 'kisungjeong30@gmail.com',
    office: '예술관 000호',
  },

  // 관리자 이메일: 이 계정으로 로그인하면 모든 댓글을 지울 수 있습니다.
  // ⚠️ 바꿀 때는 firestore.rules 파일의 이메일도 똑같이 바꿔서 Firebase에 다시 붙여넣어야 합니다.
  adminEmails: ['kisungjeong30@gmail.com'],
};
