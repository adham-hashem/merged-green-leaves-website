import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import Header from './components/Header';
import AnnouncementBar from './components/AnnouncementBar';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Lazy load heavy pages for better performance
const BeforeAfterPage = lazy(() => import('./pages/BeforeAfterPage'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

// Loading spinner component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function PublicSite() {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    // Dynamic SEO Optimization for Home Page
    document.title = "Cambridge Green Leaves | Professional Gardening & Landscaping Services in Cambridge";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Professional gardening, landscaping, fencing, turfing, tree surgery, hedge trimming, and garden clearance in Cambridge. Transforming gardens and creating beautiful outdoor spaces. Get a free quote today!');
    }
    
    // Dynamic Canonical Link Update
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', window.location.origin + window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'booking', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      <Header activeSection={activeSection} />
      <AnnouncementBar />
      <main>
        <section id="home" className="scroll-mt-[72px]">
          <Hero />
        </section>
        <section id="services" className="scroll-mt-[72px]">
          <Services />
        </section>
        <section id="booking" className="scroll-mt-[72px]">
          <BookingForm />
        </section>
        <section id="contact" className="scroll-mt-[72px]">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AdminAuthProvider>
        <Routes>
          <Route path="/" element={<PublicSite />} />
          <Route
            path="/before-after"
            element={
              <Suspense fallback={<PageLoader />}>
                <BeforeAfterPage />
              </Suspense>
            }
          />
          <Route
            path="/services/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <ServiceDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminLogin />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminDashboard />
              </Suspense>
            }
          />
          <Route
            path="/privacy"
            element={
              <Suspense fallback={<PageLoader />}>
                <PrivacyPolicy />
              </Suspense>
            }
          />
          <Route
            path="/terms"
            element={
              <Suspense fallback={<PageLoader />}>
                <TermsOfService />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminAuthProvider>
    </Router>
  );
}

export default App;
