import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, ShieldAlert } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export const NotFound: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <>
      <SEO 
        title="404 - Page Not Found | Oakivo"
        description="The requested page could not be found."
        canonical="/404"
      />
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center bg-[#030712] py-24">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
          <ShieldAlert size={32} />
        </div>
        <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">Error 404</span>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
          {isFr ? 'Page Introuvable' : 'System Route Not Found'}
        </h1>
        <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed mb-8 font-light">
          {isFr 
            ? "L'adresse demandée n'existe pas ou a été déplacée dans notre nouvelle architecture." 
            : "The requested route does not exist or has been relocated to our sovereign production cluster."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-lg"
        >
          <Home size={14} />
          <span>{isFr ? "Retour à l'Accueil" : "Return to Operations"}</span>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
