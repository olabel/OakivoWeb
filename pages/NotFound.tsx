import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Home, Layers, FileCheck, ArrowRight, PhoneCall } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  return (
    <>
      <SEO 
        title={language === 'fr' ? "404 - Périmètre Dépassé | Oakivo Solutions" : "404 - Perimeter Boundary Exceeded | Oakivo Solutions"}
        description={language === 'fr' ? "La ressource demandée n'existe pas ou a été déplacée vers une enclave isolée." : "The requested resource does not exist or has been relocated to an isolated enclave."}
        canonical="/404"
      />
      <section className="min-h-[85vh] pt-32 pb-20 px-6 flex items-center justify-center relative bg-slate-950 text-slate-100 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto max-w-2xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-8">
            <ShieldAlert size={14} />
            {t('not_found.badge') || "HTTP 404 • BOUNDARY LIMIT"}
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 text-white leading-tight">
            {t('not_found.title') || "Perimeter Boundary Exceeded"}
          </h1>

          <p className="text-lg text-slate-400 font-light leading-relaxed mb-10 max-w-xl mx-auto">
            {t('not_found.subtitle') || "The requested route or telemetry asset does not exist or has been relocated to an isolated security enclave."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10 text-left">
            <button
              onClick={() => navigate('/')}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all flex items-center gap-3 group text-slate-200"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Home size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-white">{t('not_found.cta_home') || "Return to Safe Harbor"}</div>
                <div className="text-xs text-slate-400 truncate">Go to Homepage</div>
              </div>
              <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => navigate('/services')}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all flex items-center gap-3 group text-slate-200"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Layers size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-white">{t('not_found.cta_services') || "DevSecOps Arsenal"}</div>
                <div className="text-xs text-slate-400 truncate">Cloud & SRE Services</div>
              </div>
              <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => navigate('/compliance-matrix')}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all flex items-center gap-3 group text-slate-200"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <FileCheck size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-white">{t('not_found.cta_compliance') || "Compliance Matrix"}</div>
                <div className="text-xs text-slate-400 truncate">Bill C-26, PIPEDA, SOC 2</div>
              </div>
              <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => navigate('/schedule')}
              className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center gap-3 group text-slate-200"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <PhoneCall size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-white">{t('not_found.cta_audit') || "Book Audit"}</div>
                <div className="text-xs text-cyan-400 truncate">30-Min Diagnostic</div>
              </div>
              <ArrowRight size={16} className="text-cyan-400 group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Node ID: YQM-01 • Dieppe, NB Cloud Enclave
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
