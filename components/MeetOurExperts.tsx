import React from 'react';
import { ShieldCheck, Mail, Linkedin, MapPin, Terminal, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MeetOurExperts: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const experts = [
    {
      name: 'Alexandre Roy',
      roleEn: 'Founding Partner & Principal Cloud Architect',
      roleFr: 'Associé Fondateur & Architecte Cloud Principal',
      bioEn: '14+ years in sovereign cloud engineering, Terraform infrastructure-as-code, and FinOps optimization across Canadian mid-market organizations.',
      bioFr: '14+ ans d’expérience en infonuagique souveraine, infrastructure Terraform et FinOps auprès d’entreprises canadiennes.',
      spec: 'AWS / Azure ca-central · FinOps · Zero Trust',
      location: 'Dieppe, NB (AST)'
    },
    {
      name: 'Mathieu Cormier',
      roleEn: 'Partner & Lead Enterprise Systems Architect',
      roleFr: 'Associé & Architecte Systèmes ERP d’Entreprise',
      bioEn: 'Specializes in turnkey Odoo ERP deployments, multi-warehouse automated logistics, and Canadian banking & accounting automation.',
      bioFr: 'Spécialiste des déploiements Odoo ERP clés en main, logistique multi-entrepôts et flux bancaires canadiens automatisés.',
      spec: 'Odoo Enterprise · EFT Reconciliations · Workflow Automation',
      location: 'Dieppe, NB (AST)'
    }
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-[#040815] border-t border-white/[0.06]">
      <div className="container mx-auto max-w-6xl space-y-12">
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            {isFr ? 'DIRECTION TECHNIQUE' : 'ENGINEERING LEADERSHIP'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            {isFr ? 'Rencontrez Vos Architectes Dédiés' : 'Direct Access to Senior Engineering Principals'}
          </h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            {isFr
              ? 'Aucune délégation à des centres d’appels ou analystes juniors. Vous collaborez directement avec des fondateurs expérimentés.'
              : 'Zero delegation to call centers or junior ticket queues. You work directly with veteran architects who take direct ownership.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experts.map((exp, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-[#090E1D] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold text-white">{exp.name}</h3>
                  <div className="text-xs font-mono text-cyan-400">{isFr ? exp.roleFr : exp.roleEn}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold">
                  {exp.name.charAt(0)}
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                {isFr ? exp.bioFr : exp.bioEn}
              </p>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{exp.spec}</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin size={12} className="text-cyan-400" />
                  <span>{exp.location}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurExperts;
