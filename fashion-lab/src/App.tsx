import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './lib/auth';
import { siteConfig } from './config';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import MaterialsPage from './pages/MaterialsPage';
import NotFoundPage from './pages/NotFoundPage';
import ResearchDetailPage from './pages/ResearchDetailPage';
import ResearchListPage from './pages/ResearchListPage';

/** 페이지 주소와 화면을 연결하는 곳입니다. */
export default function App() {
  useEffect(() => {
    document.title = siteConfig.siteName;
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/research" element={<ResearchListPage />} />
            <Route path="/research/:id" element={<ResearchDetailPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
