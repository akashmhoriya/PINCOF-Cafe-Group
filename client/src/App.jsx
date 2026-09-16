import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';

// Route code-splitting with React.lazy
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Brands = lazy(() => import('./pages/Brands'));
const BrandDetail = lazy(() => import('./pages/BrandDetail'));
const Franchise = lazy(() => import('./pages/Franchise'));
const ProductOffering = lazy(() => import('./pages/ProductOffering'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

export function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#140c08] text-[#ede5d8] bg-noise relative">
      {/* Initial Loading Screen */}
      {initialLoading && (
        <LoadingScreen onComplete={() => setInitialLoading(false)} />
      )}

      {/* Desktop Custom Tracking Cursor */}
      <CustomCursor />

      {/* Global Cinematic Page Route Wipe */}
      <PageTransition />

      {/* Persistent Global Header */}
      <Navbar />

      {/* Page Routing with Suspense fallback */}
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="min-h-[70vh] flex items-center justify-center bg-[#140c08]">
              <div className="w-8 h-8 rounded-full border-2 border-caramel-400 border-t-transparent animate-spin" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/:slug" element={<BrandDetail />} />
            <Route path="/offerings" element={<ProductOffering />} />
            <Route path="/product-offering" element={<ProductOffering />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Persistent Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
