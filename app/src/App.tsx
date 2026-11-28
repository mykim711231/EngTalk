import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import PathPage from './pages/PathPage';
import LessonPage from './pages/LessonPage';
import DailyPage from './pages/DailyPage';
import SettingsPage from './pages/SettingsPage';
import { useSettingsStore } from './stores/useSettingsStore';

export default function App() {
  const fontSize = useSettingsStore((s) => s.fontSize);
  useEffect(() => {
    document.documentElement.style.setProperty('--fs', fontSize === 'xl' ? '1.3' : fontSize === 'lg' ? '1.15' : '1');
  }, [fontSize]);
  return (
    <div className="mx-auto max-w-xl min-h-screen min-h-[100dvh]">
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/path" element={<PathPage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/daily" element={<DailyPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
