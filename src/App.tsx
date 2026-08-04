import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeDashboard from './pages/HomeDashboard';
import { NoticePage, ResourcesPage } from './pages/ListPages';
import WorksPage from './pages/WorksPage';
import PlatformsPage from './pages/PlatformsPage';
import ArchivePage from './pages/ArchivePage';
import ArchiveCategoryPage from './pages/ArchiveCategoryPage';
import PostDetail from './pages/PostDetail';
import AdminDashboard from './admin/AdminDashboard';
import OOCPage from './pages/OOCPage';
import DevNotesPage from './pages/DevNotesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/platforms" element={<PlatformsPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/archive/:category" element={<ArchiveCategoryPage />} />
          <Route path="/ooc" element={<OOCPage />} />
          <Route path="/dev-notes" element={<DevNotesPage />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
