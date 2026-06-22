import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Mail } from 'lucide-react';
import { cn } from '../lib/utils';
import QPCharacter from './QPCharacter';

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/archive', label: 'Archive', icon: BookOpen },
  { to: '/contact', label: 'Support', icon: Mail },
];

export default function MobileBottomNav() {
  const location = useLocation();

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-support-widget'));
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 surface-glass border-t border-black/5 dark:border-white/10 safe-area-pb">
      <div className="flex items-center justify-around">
        {links.slice(0, 2).map((link) => {
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

        <button
          onClick={openChat}
          className="relative -mt-5 flex flex-col items-center justify-center w-14 h-14 bg-soft-gold text-obsidian rounded-full shadow-lg shadow-soft-gold/30 hover:bg-soft-gold-light transition-colors"
          aria-label="Open support chat"
        >
          <QPCharacter size={26} />
          <span className="text-[9px] font-medium mt-0.5">Ask QP</span>
        </button>

        {links.slice(2).map((link) => {
          const active = location.pathname === link.to;
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
