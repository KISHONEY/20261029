/**
 * 🔌 Firebase 연결 설정
 *
 * 설정 값은 코드에 직접 적지 않고 "환경변수"(사이트 밖에 따로 보관하는 설정 값)에서 읽어 옵니다.
 * - 인터넷 사이트: Netlify > Project configuration > Environment variables 에 넣습니다.
 * - 내 컴퓨터: .env.example 을 복사해 .env 로 이름을 바꾸고 값을 채웁니다.
 *
 * 값이 비어 있으면 Firebase를 켜지 않고, 로그인·토론은 "준비 중"으로 보입니다. (사이트는 정상 작동)
 */
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/** 설정 값이 들어 있으면 true. 로그인·토론 기능은 이 값을 보고 켜고 끕니다. */
export const isFirebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

const app = isFirebaseReady ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const googleProvider = new GoogleAuthProvider();
