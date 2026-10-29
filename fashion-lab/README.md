# Fashion Research Lab (웹사이트)

패션디자인 연구·수업 자료 아카이브 + 학생 토론 웹사이트의 첫 번째 틀(MVP)입니다.

## 내용을 바꾸고 싶을 때 (이 파일들만 고치면 됩니다)
| 바꾸고 싶은 것 | 고칠 파일 |
|---|---|
| 사이트 이름, 첫 화면 문구, 교수 프로필·연락처 | `src/config.ts` |
| 연구 글 | `src/data/research.ts` |
| 수업자료 | `src/data/materials.ts` |
| 포인트 색상 | `tailwind.config.js` 의 `accent` 값 |

각 파일 맨 위에 한국어로 수정 방법이 적혀 있습니다.
내 이미지를 쓰려면 `public` 폴더에 사진을 넣고, 데이터 파일에서 `'/사진이름.jpg'` 처럼 적으면 됩니다.

## 내 컴퓨터에서 미리 보기
1. [Node.js](https://nodejs.org) 의 LTS 버전을 설치합니다. (웹사이트를 실행해 주는 프로그램)
2. 터미널에서 이 폴더로 이동합니다: `cd fashion-lab`
3. 처음 한 번만 필요한 부품을 설치합니다: `npm install`
4. 실행합니다: `npm run dev`
5. 화면에 나온 주소(보통 http://localhost:5173)를 브라우저에서 엽니다. 끄려면 터미널에서 `Ctrl + C`.

## 폴더 안내
- `src/pages/` — 각 페이지 화면 (홈, 연구 목록/상세, 수업자료, 소개, 404)
- `src/components/` — 여러 페이지에서 같이 쓰는 부분 (상단 메뉴, 푸터, 카드, 토론 자리)
- `src/services/` — 데이터를 가져오는 함수. 나중에 이 안쪽만 Firestore로 바꿉니다.
- `src/lib/firebase.ts` — Firebase 설정이 들어갈 자리 (지금은 안내 주석만 있음)
- `.env.example` — Firebase 설정 값의 이름 목록 (실제 값은 나중에 `.env` 에)

## 아직 준비 중인 것
- 로그인 버튼, 토론(댓글) 영역은 모양만 있고 동작하지 않습니다. Firebase 연결 단계에서 만듭니다.
