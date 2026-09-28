import React from 'react';
import { ShieldCheck, GitCommit, Database, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export const StrategicImperative: React.FC = () => {
  const { t, language } = useLanguage();
  const isFr = language === 'fr';

  const invariants = [
    {
      icon: ShieldCheck,
      title: isFr ? 'Preuve Continue vs Panique d\'Audit' : 'Continuous Evidence vs. Audit Panic',
      description: isFr 
        ? 'Remplacement des audits manuels et des chiffriers d\'urgence par une télémétrie continue de conformité 24/7/365.'
        : 'Replaces annual audit fire-drills and manual spreadsheets with 24/7/365 real-time policy and compliance telemetry.',
      metric: isFr ? '100% Vérifiable' : '100% Provable'
    },
    {
      icon: GitCommit,
      title: isFr ? 'Zéro Friction dans les Pipelines' : 'Zero Pipeline Disruption',
      description: isFr
        ? 'Garde-fous Policy-as-Code intégrés avant la mise en production. Les développeurs livrent vite avec validation immédiate.'
        : 'Policy-as-Code gates enforced pre-commit and in CI. Developers maintain full release velocity with instant PR feedback.',
      metric: isFr ? 'Shift-Left Natif' : 'Native Shift-Left'
    },
    {
      icon: Database,
      title: isFr ? 'Souveraineté des Données Canadiennes' : 'Canadian Sovereign Telemetry',
      description: isFr
        ? 'Infrastructures infonuagiques strictement hébergées en régions canadiennes (AWS ca-central-1 / Azure), alignées Loi 25 et Projet de loi C-26.'
        : 'Infrastructures architected strictly within Canadian regions (AWS ca-central-1 / Azure), compliant with PIPEDA, Law 25, and Bill C-26.',
      metric: isFr ? 'Résidence NB / CA' : 'NB / CA Residency'
    }
  ];

  return (
    <section 
      id="imperative" 
      aria-labelledby="strategic-headline" 
      className="py-24 md:py-32 px-6 bg-slate-950 relative border-t border-slate-900/60"
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Editorial 2-Column Briefing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Executive Thesis */}
          <div className="lg:col-span-6 lg:pr-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4">
              <span>{isFr ? 'L\'IMPÉRATIF ARCHITECTURAL' : 'THE ARCHITECTURAL IMPERATIVE'}</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-400">{isFr ? 'RÉSILIENCE SOUVERAINE' : 'SOVEREIGN RESILIENCE'}</span>
            </div>

            <h2 
              id="strategic-headline" 
              className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-8 leading-[1.15]"
            >
              {t('landing.strategic_headline')}
            </h2>

            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-8">
              {t('landing.strategic_body')}
            </p>

            <div className="pt-2">
              <Link
                to="/compliance-matrix"
                className="inline-flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider group"
              >
                <span>{isFr ? 'Consulter la matrice de conformité' : 'Explore Sovereign Compliance Matrix'}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Architectural Invariants */}
          <div className="lg:col-span-6 space-y-6">
            {invariants.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 md:p-7 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700/80 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-950/50 border border-cyan-500/20 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-cyan-400 shrink-0">
                      {item.metric}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-light leading-relaxed pl-12">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default StrategicImperative;
