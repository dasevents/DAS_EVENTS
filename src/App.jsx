import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import { CookieProvider } from './components/ui/pref-manager';
import ConsentBanner from './components/ui/pref-manager';
import ScrollToTop from './components/ui/scroll-to-top';
import SocialFloat from './components/ui/social-float';
import Loader from './components/ui/loader';
import Home from './pages/home';
import About from './pages/about';
import CorporateEvents from './pages/corporate-events';
import CorporateEventDetail from './pages/corporate-event-detail';
import SocialEvents from './pages/social-events';
import SocialEventDetail from './pages/social-event-detail';
import Services from './pages/services';
import ServiceDetail from './pages/service-detail';
import Portfolio from './pages/portfolio';
import Clientele from './pages/clientele';
import Blog from './pages/blog';
import Contact from './pages/contact';
import Privacy from './pages/privacy';
import Cookies from './pages/cookies';
import TermsConditions from './pages/terms-conditions';
import NotFound from './pages/notfound';

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) return <Loader />;

  return (
    <CookieProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/clientele" element={<Clientele />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/corporate-events" element={<CorporateEvents />} />
              <Route path="/corporate-events/:slug" element={<CorporateEventDetail />} />
              <Route path="/social-events" element={<SocialEvents />} />
              <Route path="/social-events/:slug" element={<SocialEventDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <ConsentBanner />
        <ScrollToTop />
        <SocialFloat />
      </div>
    </CookieProvider>
  );
}
