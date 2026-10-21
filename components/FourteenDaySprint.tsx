import React from 'react';
import { 
  Calendar, CheckCircle2, ShieldCheck, ArrowRight, 
  Sparkles, Clock, Zap, Target, Lock, Award 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FourteenDaySprint: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const steps = [
    {
      day: isFr ? 'JOUR 1' : 'DAY 1',
      title: isFr ? 'Audit des Fuites Opérationnelles (45 Min)' : 'The 45-Min Operational Leak Audit',
      description: isFr
        ? 'Nous analysons vos flux réels : d’où viennent vos prospects, où stagnent vos devis, et combien d’heures sont englouties dans la saisie de factures.'
        : 'A laser-focused diagnostic session. We analyze where your leads leak, where quotes stall, and exactly which software tools (QuickBooks, Jobber, Gmail) need seamless AI pipes.',
      icon: Target
    },
    {
      day: isFr ? 'JOURS 2–9' : 'DAYS 2–9',
      title: isFr ? 'Ingénierie & Assemblage du Micro-Système' : 'Custom Micro-System Architecture & Build',
      description: isFr
        ? 'Nos ingénieurs seniors connectent vos outils existants sans rien bouleverser. Création des flux d’alerte 90s, du répondeur SMS et de l’extraction de reçus.'
        : 'Senior engineers build your bespoke AI automations. We connect your inbound channels, calendar, and accounting without disrupting current day-to-day operations.',
      icon: Zap
    },
    {
      day: isFr ? 'JOURS 10–12' : 'DAYS 10–12',
      title: isFr ? 'Bac à Sable & Prise en Main (30 Min)' : 'The "AI Prepares" Sandbox & Staff Handover',
      description: isFr
        ? 'Vous testez le système en toute sécurité. Votre équipe découvre la simplicité de la validation en 1 clic. Si vous savez envoyer un SMS, vous savez utiliser Oakivo.'
        : 'Zero steep learning curves. You and your team test drive the 1-click approval workflow in a safe staging sandbox. If you can tap "Approve" on your smartphone, you are ready.',
      icon: ShieldCheck
    },
    {
      day: isFr ? 'JOUR 14' : 'DAY 14',
      title: isFr ? 'Mise en Production & Tableau de Bord ROI' : 'Production Go-Live & Real-Time ROI Metrics',
      description: isFr
        ? 'Lancement officiel. Vos nouveaux prospects sont qualifiés en 45 secondes et vos premières factures sont traitées sans aucune saisie.'
        : 'The system goes live. Inbound leads are engaged in under 90 seconds, dormant quotes are reactivated, and Sunday paperwork is eliminated.',
      icon: Award
    }
  ];

  const handleOpenDrawer = () => {
    window.dispatchEvent(new CustomEvent('open-lead-drawer', {
      detail: {
        focus: '14-Day Rapid AI Deployment Sprint',
        topic: '14-Day Sprint Ingestion'
      }
    }));
  };

  return (
    <section id="sprint" className="py-24 bg-[#030610] border-t border-white/[0.08] relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-emerald-400 uppercase mb-4">
            <Clock size={14} />
            <span>{isFr ? 'MÉTHODOLOGIE RAPIDE & PRÉVISIBLE' : 'THE 14-DAY RAPID DEPLOYMENT SPRINT'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-6">
            {isFr 
              ? 'Pas de Projets Informatiques de 6 Mois. En Production en 14 Jours.'
              : 'No 6-Month Consulting Overhauls. Production Live in 14 Days Flat.'
            }
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {isFr
              ? 'Les PME n’ont pas le temps pour des réunions sans fin. Nous travaillons sur un périmètre fixe, à tarif fixe, avec un retour sur investissement garanti dès le premier mois.'
              : 'Small businesses don’t have time for endless agency discovery calls. We deploy working, high-converting AI micro-systems on a fixed sprint schedule with zero operational disruption.'
            }
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="relative p-7 rounded-2xl bg-[#090E1F]/90 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-md border border-cyan-500/20">
                      {step.day}
                    </span>
                    <Icon size={18} className="text-slate-400" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
                  {isFr ? `Étape ${idx + 1} validée par écrit` : `Milestone ${idx + 1} locked`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Reversal Guarantee Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-cyan-950/30 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              <ShieldCheck size={16} />
              <span>{isFr ? 'LA GARANTIE OAKIVO 30 JOURS' : 'THE OAKIVO 30-DAY ZERO-RISK GUARANTEE'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              {isFr 
                ? 'Si vous ne gagnez pas au moins 10h/semaine ou de nouveaux contrats, nous travaillons gratuitement.'
                : 'If you don’t reclaim at least 10 hours a week or close new business, we work for free.'
              }
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {isFr
                ? 'Nous prenons l’intégralité du risque à notre charge. Aucun engagement à long terme ni rétention captive.'
                : 'We carry 100% of the implementation risk. No endless retainer lock-ins or vague advisory hours.'
              }
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenDrawer}
            className="shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-cyan-400/20 cursor-pointer"
          >
            <span>{isFr ? 'Réserver Mon Audit de 45 Min' : 'Book Your 45-Min Audit Session'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default FourteenDaySprint;
