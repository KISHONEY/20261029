import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Firebase 부분을 따로 묶어, 사이트 내용만 바뀔 때 방문자가 다시 받지 않아도 되게 합니다.
        manualChunks: { firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'] },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
