/**
 * 🔌 여기에 나중에 Firebase 설정이 들어갑니다.
 *
 * 지금은 비어 있습니다. (firebase 패키지도 아직 설치하지 않았습니다.)
 *
 * 나중에 연결할 때 할 일 (그때 다시 안내해 드립니다)
 * 1. Firebase 웹사이트에서 프로젝트를 만들고(무료 Spark 요금제), 웹 앱 설정 값을 받습니다.
 * 2. .env.example 파일을 복사해 .env 로 이름을 바꾸고 값을 채웁니다.
 * 3. 터미널에서 `npm install firebase` 로 패키지를 설치합니다.
 * 4. 이 파일에서 Firebase를 시작하고(initializeApp), Firestore와 구글 로그인을 내보냅니다.
 * 5. src/services/ 의 함수 안쪽을 Firestore에서 읽도록 바꿉니다.
 *
 * 설정 값은 아래처럼 .env 에서 읽어 오게 됩니다. (코드에 직접 적지 않습니다)
 *   import.meta.env.VITE_FIREBASE_API_KEY
 *   import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
 *   import.meta.env.VITE_FIREBASE_PROJECT_ID
 *   import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
 *   import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
 *   import.meta.env.VITE_FIREBASE_APP_ID
 */

/** 아직 연결되지 않았음을 알려 주는 표시. 로그인·토론 기능은 이 값을 보고 "준비 중"을 보여 줍니다. */
export const isFirebaseReady = false;
