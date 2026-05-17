import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DrawingsCategoryPage from './pages/DrawingsCategoryPage';
import DrawingsPage from './pages/DrawingsPage';
import HomePage from './pages/HomePage';
import PipeCleanersPage from './pages/PipeCleanersPage';
import UpcomingPage from './pages/UpcomingPage';
import VideoPage from './pages/VideoPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="video" element={<VideoPage />} />
        <Route path="drawings" element={<DrawingsPage />} />
        <Route path="drawings/:category" element={<DrawingsCategoryPage />} />
        <Route path="sculpture/pipe-cleaners" element={<PipeCleanersPage />} />
        <Route path="upcoming" element={<UpcomingPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
