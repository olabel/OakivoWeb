import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Core entry route loaded eagerly for immediate first paint
import Home from './pages/Home';

// Secondary routes code-split and loaded asynchronously on demand for optimal Vercel performance
const About = lazy(() => import('./pages/About'));
const Expertise = lazy(() => import('./pages/Services')); // Renamed import for clarity
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Contact = lazy(() => import('./pages/Contact'));
const Booking = lazy(() => import('./pages/Booking'));
const Verticals = lazy(() => import('./pages/Verticals'));
const Methodology = lazy(() => import('./pages/Methodology'));
const Careers = lazy(() => import('./pages/Careers'));
const AdminPortal = lazy(() => import('./pages/AdminPortal'));
const Privacy = lazy(() => import('./pages/Privacy'));
const ComplianceMatrix = lazy(() => import('./pages/ComplianceMatrix'));
const BrandShowcase = lazy(() => import('./pages/BrandShowcase'));
const SolutionDetail = lazy(() => import('./pages/SolutionDetail'));
const LocationDetail = lazy(() => import('./pages/LocationDetail'));
const ClientPortal = lazy(() => import('./pages/ClientPortal'));
const ClientPortalDemo = lazy(() => import('./pages/ClientPortalDemo'));
const Insights = lazy(() => import('./pages/Insights'));
const InsightDetail = lazy(() => import('./pages/InsightDetail'));
const RiskCalculator = lazy(() => import('./pages/RiskCalculator'));
const ComplianceSEO = lazy(() => import('./pages/ComplianceSEO'));
const NotFound = lazy(() => import('./pages/NotFound'));
import { LanguageProvider } from './context/LanguageContext';
import { NavRoute } from './types';
import { analytics } from './utils/analytics';
import LiveChat from './components/LiveChat';
import { Analytics } from './components/Analytics';
import { Toaster } from 'sonner';

// Minimal, brand-aligned loading fallback for async route transitions
const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20"></div>
      <div className="absolute inset-0 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
    </div>
    <span className="mt-4 font-mono text-xs text-slate-400 tracking-wider">LOADING MODULE...</span>
  </div>
);

// Scroll to top and track analytics, with smooth hash anchor support
const ScrollToTopAndTrack = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user was redirected through static 404 fallback
    try {
      const spaRedirect = sessionStorage.getItem('spa_redirect');
      if (spaRedirect && spaRedirect !== pathname) {
        sessionStorage.removeItem('spa_redirect');
        navigate(spaRedirect, { replace: true });
        return;
      }
    } catch {
      // Storage access disabled or sandboxed
    }

    if (hash) {
      setTimeout(() => {
        try {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo(0, 0);
          }
        } catch {
          window.scrollTo(0, 0);
        }
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
    analytics.trackPageView(pathname);
  }, [pathname, hash, navigate]);
  return null;
};

const AppLayout = () => {
  const { pathname } = useLocation();
  const isDemo = pathname === NavRoute.CLIENT_DEMO;

  return (
    <div className="flex flex-col min-h-screen relative">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:font-mono focus:font-bold focus:rounded-lg focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>
      {!isDemo && <Navbar />}
      <main id="main-content" tabIndex={-1} className={!isDemo ? "flex-grow pt-20 lg:pt-24 focus:outline-none" : "flex-grow focus:outline-none"}>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path={NavRoute.HOME} element={<Home />} />
            <Route path={NavRoute.SERVICES} element={<Expertise />} />
            <Route path={NavRoute.CAPABILITIES} element={<Expertise />} />
            <Route path="/services" element={<Expertise />} />
            <Route path="/capabilities" element={<Expertise />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path={NavRoute.CASE_STUDIES} element={<CaseStudies />} />
            <Route path="/casestudies" element={<CaseStudies />} />
            <Route path="/work" element={<CaseStudies />} />
            <Route path={NavRoute.CONTACT} element={<Contact />} />
            <Route path={NavRoute.BOOKING} element={<Booking />} />
            <Route path="/schedule" element={<Booking />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/audit" element={<Booking />} />
            <Route path={NavRoute.METHODOLOGY} element={<Methodology />} />
            <Route path={NavRoute.CAREERS} element={<Careers />} />
            <Route path={NavRoute.ABOUT} element={<About />} />
            <Route path={NavRoute.FIRM} element={<About />} />
            <Route path={NavRoute.VERTICALS} element={<Verticals />} />
            <Route path={NavRoute.INDUSTRIES} element={<Verticals />} />
            <Route path={NavRoute.ADMIN_PORTAL} element={<AdminPortal />} />
            <Route path={NavRoute.PRIVACY} element={<Privacy />} />
            <Route path={NavRoute.COMPLIANCE} element={<ComplianceMatrix />} />
            <Route path="/compliance" element={<ComplianceMatrix />} />
            <Route path="/compliance-matrix" element={<ComplianceMatrix />} />
            <Route path="/matrix" element={<ComplianceMatrix />} />
            <Route path={NavRoute.BRAND_IDENTITY} element={<BrandShowcase />} />
            <Route path={NavRoute.CLIENT_DEMO} element={<ClientPortalDemo />} />
            <Route path="/client-portal" element={<ClientPortal />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:id" element={<InsightDetail />} />
            <Route path="/perspectives" element={<Navigate to="/insights" replace />} />
            <Route path="/perspectives/:id" element={<Navigate to="/insights" replace />} />
            <Route path="/solutions/:slug" element={<SolutionDetail />} />
            <Route path="/locations/:slug" element={<LocationDetail />} />
            <Route path="/compliance/:slug" element={<ComplianceSEO />} />
            <Route path="/risk-calculator" element={<RiskCalculator />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isDemo && <Footer />}
      {!isDemo && <LiveChat />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTopAndTrack />
      <Analytics />
          <Toaster theme="dark" position="bottom-right" />
          <AppLayout />
        </Router>
      </LanguageProvider>
    </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;