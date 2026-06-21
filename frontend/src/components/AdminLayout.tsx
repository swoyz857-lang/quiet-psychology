import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Star,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react';
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.title = 'Admin | Quiet Psychology';
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-charcoal border-b border-white/5 sticky top-0 z-30">
        <Link to="/" className="font-serif text-lg text-muted-white">
          Quiet Psychology
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-muted-gray hover:text-muted-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-charcoal border-r border-white/5 flex-shrink-0 transform transition-transform duration-300
          md:relative md:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="font-serif text-xl text-muted-white">
            Quiet Psychology
          </Link>
          <div className="flex items-center gap-2 mt-2">
            <Shield size={12} className="text-soft-gold" />
            <p className="text-xs text-muted-gray">Administration</p>
          </div>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-180px)]">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors rounded-sm ${
                  active
                    ? 'bg-white/5 text-soft-gold'
                    : 'text-muted-gray hover:text-muted-white hover:bg-white/5'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5 bg-charcoal">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 bg-soft-gold/10 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-soft-gold uppercase">{user.email.charAt(0)}</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-muted-white truncate">{user.email}</p>
              <p className="text-[10px] text-muted-gray">Administrator</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-gray hover:text-muted-white hover:bg-white/5 transition-colors rounded-sm text-left"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
