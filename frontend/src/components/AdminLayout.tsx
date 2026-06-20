import { useEffect } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, ShoppingBag, Star, Users, MessageSquare, BarChart3, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.tsx';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: BookOpen },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Subscribers', href: '/admin/subscribers', icon: Users },
  { label: 'Support', href: '/admin/support', icon: MessageSquare },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.title = 'Admin | Quiet Psychology';
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <p className="text-muted-gray">Loading...</p>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-obsidian flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-charcoal border-r border-white/5 flex-shrink-0">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="font-serif text-xl text-muted-white">
            Quiet Psychology
          </Link>
          <p className="text-xs text-muted-gray mt-1">Administration</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                location.pathname === item.href
                  ? 'bg-white/5 text-soft-gold'
                  : 'text-muted-gray hover:text-muted-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-gray hover:text-muted-white hover:bg-white/5 transition-colors text-left"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
