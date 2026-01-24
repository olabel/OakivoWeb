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
import Chatbot from './components/Chatbot';
import { LanguageProvider } from './context/LanguageContext';

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
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/verticals" element={<Verticals />} />
                <Route path="/services" element={<Services />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/perspectives" element={<Blog />} />
                <Route path="/perspectives/:id" element={<BlogPost />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/admin-portal" element={<AdminPortal />} />
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