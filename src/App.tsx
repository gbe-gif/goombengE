import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeDashboard from './pages/HomeDashboard';
import { NoticePage, LatestPage, UpdatedPage, ResourcesPage } from './pages/ListPages';
import WorksPage from './pages/WorksPage';
import PlatformsPage from './pages/PlatformsPage';
import ArchivePage from './pages/ArchivePage';
import ArchiveCategoryPage from './pages/ArchiveCategoryPage';
import PostDetail from './pages/PostDetail';
import AdminDashboard from './admin/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/latest" element={<LatestPage />} />
          <Route path="/updated" element={<UpdatedPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/platforms" element={<PlatformsPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/archive/:category" element={<ArchiveCategoryPage />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
