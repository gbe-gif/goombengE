import { Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, LayoutDashboard, Home } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function AdminLayout() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="min-h-screen bg-[#0B1021] flex items-center justify-center text-white">로딩 중...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0B1021] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#12182B] border-r border-white/10 p-4 sm:min-h-screen">
        <div className="flex items-center justify-between md:justify-center mb-8 pb-4 border-b border-white/10">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-500/20 text-blue-400 font-medium hover:bg-blue-500/30 transition-colors">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors mt-auto md:mt-8">
            <Home size={20} />
            Back to Site
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors text-left"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
