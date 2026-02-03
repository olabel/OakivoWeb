import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import Contact from './pages/Contact';
import Verticals from './pages/Verticals';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Careers from './pages/Careers';
import AdminPortal from './pages/AdminPortal';
import Privacy from './pages/Privacy';
import ComplianceMatrix from './pages/ComplianceMatrix';
import Chatbot from './components/Chatbot';
import { LanguageProvider } from './context/LanguageContext';
import { NavRoute } from './types';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen relative">
            <Navbar />
            <main className="flex-grow pt-16"> 
              <Routes>
                <Route path={NavRoute.HOME} element={<Home />} />
                <Route path={NavRoute.ABOUT} element={<About />} />
                <Route path={NavRoute.VERTICALS} element={<Verticals />} />
                <Route path={NavRoute.SERVICES} element={<Services />} />
                <Route path={NavRoute.CASE_STUDIES} element={<CaseStudies />} />
                <Route path={NavRoute.CONTACT} element={<Contact />} />
                <Route path={NavRoute.BLOG} element={<Blog />} />
                <Route path={`${NavRoute.BLOG}/:id`} element={<BlogPost />} />
                <Route path={NavRoute.CAREERS} element={<Careers />} />
                <Route path={NavRoute.ADMIN_PORTAL} element={<AdminPortal />} />
                <Route path={NavRoute.PRIVACY} element={<Privacy />} />
                <Route path={NavRoute.COMPLIANCE} element={<ComplianceMatrix />} />
              </Routes>
            </main>
            <Footer />
            {/* AI Assistant available on all pages */}
            <Chatbot />
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;