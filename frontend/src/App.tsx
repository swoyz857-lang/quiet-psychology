import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.tsx';
import { ThemeProvider } from './hooks/useTheme.tsx';
import Layout from './components/Layout';
import Home from './pages/Home';
import Archive from './pages/Archive';
import BookDetail from './pages/BookDetail';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import Download from './pages/Download';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminReviews from './pages/admin/Reviews';
import AdminSubscribers from './pages/admin/Subscribers';
import AdminSupport from './pages/admin/Support';
import AdminAnalytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/Settings';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="archive" element={<Archive />} />
          <Route path="books/:slug" element={<BookDetail />} />
          <Route path="checkout/:slug" element={<Checkout />} />
          <Route path="thank-you" element={<ThankYou />} />
          <Route path="download" element={<Download />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="refund" element={<Refund />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="subscribers" element={<AdminSubscribers />} />
          <Route path="support" element={<AdminSupport />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
