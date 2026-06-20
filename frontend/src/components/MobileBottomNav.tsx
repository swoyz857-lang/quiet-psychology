import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Mail } from 'lucide-react';
import { cn } from '../lib/utils';

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/archive', label: 'Archive', icon: BookOpen },
  { to: '/contact', label: 'Support', icon: Mail },
];

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 surface-glass border-t border-black/5 dark:border-white/10 safe-area-pb">
      <div className="flex items-center justify-around">
        {links.map((link) => {
          const active = location.pathname === link.to || (link.to === '/#archive' && location.pathname === '/');
          return (
            <Link
              key={link.label}
              to={link.to}
              className={cn(
                'flex flex-col items-center gap-1 py-3 px-4 text-xs transition-colors',
                active ? 'text-soft-gold' : 'text-body hover:text-heading'
              )}
            >
              <link.icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
