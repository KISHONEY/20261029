/**
 * 로그인 상태를 사이트 전체에 알려 주는 부분입니다.
 * 어느 화면에서든 useAuth() 로 "지금 누가 로그인했는지"를 알 수 있습니다.
 */
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { siteConfig } from '../config';
import { auth, googleProvider } from './firebase';

interface AuthState {
  user: User | null;
  loading: boolean; // 처음 로그인 상태를 확인하는 중
  isAdmin: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(auth));

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const value: AuthState = {
    user,
    loading,
    isAdmin: Boolean(user?.email && user.emailVerified && siteConfig.adminEmails.includes(user.email)),
    signIn: async () => {
      if (!auth) return;
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (e) {
        const code = (e as { code?: string }).code;
        // 사용자가 로그인 창을 그냥 닫은 경우는 오류가 아니므로 조용히 넘어갑니다.
        if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return;
        console.error(e);
        alert('로그인하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      }
    },
    signOut: async () => {
      if (auth) await signOut(auth);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth는 AuthProvider 안에서만 쓸 수 있습니다.');
  return ctx;
}
