import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SupportWidget from './SupportWidget';
import ExitIntentPopup from './ExitIntentPopup';
import MobileBottomNav from './MobileBottomNav';
import ScrollToTop from './ScrollToTop';
import Starfield from './Starfield';
import CustomCursor from './CustomCursor';
import ScrollProgress from './ScrollProgress';
import Preloader from './Preloader';
import PageTransition from './PageTransition';
import MouseTrail from './MouseTrail';
import Sparkles from './Sparkles';

export default function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col surface-page">
      <Preloader />
      <ScrollToTop />
      <Starfield />
      <Sparkles />
      <MouseTrail />
      <div className="noise-overlay" />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-[2] flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <SupportWidget />
      <ExitIntentPopup />
      <MobileBottomNav />
    </div>
  );
}
