import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import EmailCapture from './EmailCapture';

const footerLinks = [
  { label: 'Archive', href: '/#archive' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Refund Policy', href: '/refund' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-black/5 dark:border-white/10 bg-light-gray/40 dark:bg-charcoal overflow-hidden transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,169,98,0.12),transparent_50%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Quiet Psychology" className="w-12 h-12 object-contain" />
              <h3 className="font-serif text-2xl text-heading">Quiet Psychology</h3>
            </div>
            <p className="text-body leading-relaxed max-w-sm mb-6">
              A premium behavioral intelligence publisher. Research-driven digital publications on breakups,
              attachment, communication, and attraction.
            </p>
            <div className="flex items-center gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-body hover:text-soft-gold hover:drop-shadow-[0_0_8px_rgba(201,169,98,0.5)] transition-all duration-300"
                >
                  <social.icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-heading mb-6">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-body hover:text-soft-gold hover:drop-shadow-[0_0_8px_rgba(201,169,98,0.5)] transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-heading mb-6">Research Updates</h4>
            <EmailCapture source="footer" />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-body">
            © {new Date().getFullYear()} Quiet Psychology. All rights reserved.
          </p>
          <p className="text-sm text-body">
            Premium digital publications. Not therapy. Not coaching.
          </p>
        </div>
      </div>
    </footer>
  );
}
