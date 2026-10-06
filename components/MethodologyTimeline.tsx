import React from 'react';
import { ShieldCheck, GitBranch, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MethodologyTimeline: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const phases = [
    {
      step: '01',
      titleEn: 'Discovery & Architecture Blueprint',
      titleFr: 'Découverte & Schéma d’Architecture',
      time: 'Weeks 1–2',
      descEn: 'Full audit of existing infrastructure, data flow bottlenecks, and security posture. Production-ready blueprint deliverable with fixed-price scope.',
      descFr: 'Audit complet des infrastructures existantes, goulots d’étranglement et posture de sécurité. Schéma d’architecture à prix fixe.'
    },
    {
      step: '02',
      titleEn: 'Immutable Infrastructure as Code',
      titleFr: 'Infrastructure-as-Code Immuable',
      time: 'Weeks 3–6',
      descEn: 'Terraform pipelines deployed strictly in Canadian ca-central regions. Odoo ERP workflows configured with automated reconciliations.',
      descFr: 'Pipelines Terraform déployés strictement dans les régions canadiennes ca-central. ERP Odoo configuré avec flux automatisés.'
    },
    {
      step: '03',
      titleEn: 'Validation & Automated Canary Testing',
      titleFr: 'Validation & Tests Canaris Automatisés',
      time: 'Weeks 7–10',
      descEn: 'End-to-end data validation, non-disruptive parallel runs, load testing, and security hardening against PIPEDA and SOC 2 criteria.',
      descFr: 'Validation des données de bout en bout, exécutions parallèles sans interruption, tests de charge et renforcement de sécurité.'
    },
    {
      step: '04',
      titleEn: 'Zero-Downtime Production Cutover',
      titleFr: 'Bascule en Production sans Coupure',
      time: 'Weeks 11–12',
      descEn: 'Controlled cutover with instant rollback capabilities, hands-on executive and operator training, and 24/7 SLA governance.',
      descFr: 'Bascule contrôlée avec retour arrière instantané, formation des équipes et gouvernance proactive 24/7 sous SLA garanti.'
    }
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-[#030712] border-t border-white/[0.06]">
      <div className="container mx-auto max-w-6xl space-y-12">
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            {isFr ? 'CADRE D’EXÉCUTION EN 4 ÉTAPES' : '4-PHASE EXECUTION FRAMEWORK'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            {isFr ? 'Un Protocole Prévisible et Rigoureux' : 'Predictable, Zero-Surprise Delivery'}
          </h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            {isFr
              ? 'Chaque étape est jalonnée de livrables vérifiables et de revues de code directes par les associés seniors.'
              : 'Every milestone is backed by verifiable code deliverables, automated audit proofs, and direct partner accountability.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {phases.map((p, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-[#090E1D] border border-white/[0.08] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">PHASE {p.step}</span>
                  <span className="text-[11px] font-mono text-slate-500">{p.time}</span>
                </div>
                <h3 className="text-lg font-display font-bold text-white">{isFr ? p.titleFr : p.titleEn}</h3>
                <p className="text-slate-300 text-xs font-light leading-relaxed">{isFr ? p.descFr : p.descEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologyTimeline;
