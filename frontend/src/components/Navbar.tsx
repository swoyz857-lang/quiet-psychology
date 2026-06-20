import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../hooks/useTheme';

const navLinks = [
  { label: 'Archive', href: '/archive' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          scrolled
            ? 'py-2 bg-cream/90 dark:bg-obsidian/90 backdrop-blur-xl border-b border-black/5 dark:border-white/10 shadow-lg shadow-black/5'
            : 'py-4 md:py-5 bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className={cn(
                'absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-out',
                scrolled ? 'top-1.5' : 'top-3 md:top-4'
              )}
            >
              <div
                className={cn(
                  'relative transition-all duration-500',
                  scrolled ? 'w-12 h-12 md:w-14 md:h-14 opacity-95' : 'w-16 h-16 md:w-20 md:h-20 opacity-100'
                )}
              >
                <img
                  src="/logo.png"
                  alt="Quiet Psychology"
                  className="h-full w-full object-contain drop-shadow-[0_0_20px_rgba(201,169,98,0.35)]"
                />
                <div className="absolute inset-0 rounded-full bg-soft-gold/10 blur-xl -z-10" />
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="group relative text-sm tracking-[0.16em] uppercase text-light-text dark:text-muted-white/85 hover:text-soft-gold transition-all duration-300 px-2 py-1"
                >
                  <span className="absolute inset-0 -z-10 rounded-md bg-[radial-gradient(circle_at_center,rgba(201,169,98,0.12),transparent_70%)] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-soft-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <nav className="hidden md:flex items-center gap-8 lg:gap-10 ml-auto">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="group relative text-sm tracking-[0.16em] uppercase text-light-text dark:text-muted-white/85 hover:text-soft-gold transition-all duration-300 px-2 py-1"
                >
                  <span className="absolute inset-0 -z-10 rounded-md bg-[radial-gradient(circle_at_center,rgba(201,169,98,0.12),transparent_70%)] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-soft-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 text-light-text dark:text-muted-white/85 hover:text-soft-gold transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </nav>

            <div className="flex items-center gap-2 md:hidden ml-auto z-50">
              <button
                onClick={toggleTheme}
                className="p-2 text-light-text dark:text-muted-white/85 hover:text-soft-gold transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                className="p-2 text-soft-gold"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-50 bg-cream/98 dark:bg-obsidian/98 backdrop-blur-2xl transition-all duration-500 md:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-2xl tracking-[0.2em] uppercase text-dark-text dark:text-muted-white hover:text-soft-gold transition-colors duration-300"
              style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
