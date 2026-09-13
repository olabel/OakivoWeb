import React, { useState } from 'react';
import { 
  ShieldCheck, GitBranch, Activity, CheckCircle2, ArrowRight, 
  Terminal, Lock, Cpu, Sparkles, Clock, Layers, ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StepDetail {
  id: string;
  stepNum: string;
  titleKey: string;
  durationKey: string;
  descKey: string;
  badgeKey: string;
  outcomeKey: string;
  icon: React.ReactNode;
  techStack: string[];
  deliverables: string[];
  frenchDeliverables: string[];
}

const MethodologyTimeline: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const displayedStep = hoveredStep !== null ? hoveredStep : activeStep;

  const stepsData: StepDetail[] = [
    {
      id: 'audit',
      stepNum: '01',
      titleKey: 'methodology_timeline.step1.name',
      durationKey: 'methodology_timeline.step1.duration',
      descKey: 'methodology_timeline.step1.short_desc',
      badgeKey: 'methodology_timeline.step1.badge',
      outcomeKey: 'methodology_timeline.step1.outcome',
      icon: <Terminal size={22} className="text-cyan-400" />,
      techStack: ['AWS / Azure / GCP', 'Trivy / Snyk', 'OPA Gatekeeper', 'CIS Benchmarks'],
      deliverables: [
        'Prioritized Threat & Remediation Blueprint with CVE scoring',
        'Multi-cloud topology & IAM least-privilege matrix review',
        'Automated SOC 2 / PIPEDA compliance gap matrix',
        'Zero-trust network segmentation plan'
      ],
      frenchDeliverables: [
        'Plan directeur de menaces et remédiation hiérarchisé avec pointage CVE',
        'Revue de topologie multi-cloud et de la matrice de moindre privilège IAM',
        'Matrice des écarts de conformité automatisée SOC 2 / LPRPDE',
        'Schéma de micro-segmentation réseau Zéro Confiance'
      ]
    },
    {
      id: 'pipeline',
      stepNum: '02',
      titleKey: 'methodology_timeline.step2.name',
      durationKey: 'methodology_timeline.step2.duration',
      descKey: 'methodology_timeline.step2.short_desc',
      badgeKey: 'methodology_timeline.step2.badge',
      outcomeKey: 'methodology_timeline.step2.outcome',
      icon: <GitBranch size={22} className="text-cyan-400" />,
      techStack: ['GitHub Actions / GitLab CI', 'Terraform / OpenTofu', 'Cosign / Sigstore', 'Docker / K8s'],
      deliverables: [
        'Automated SAST, DAST & SBOM pipeline gates in GitHub Actions/GitLab',
        'Immutable Infrastructure-as-Code modules (Terraform / OpenTofu)',
        'Container vulnerability gating & Cosign image signing',
        'Zero-Downtime deployment cutover and team runbooks'
      ],
      frenchDeliverables: [
        'Garde-fous SAST, DAST et SBOM dans GitHub Actions / GitLab',
        'Modules d\'Infrastructure-as-Code immuables (Terraform / OpenTofu)',
        'Analyse de vulnérabilité de conteneurs et signature d\'images Cosign',
        'Bascule en production sans interruption et guides opérationnels d\'équipe'
      ]
    },
    {
      id: 'sre',
      stepNum: '03',
      titleKey: 'methodology_timeline.step3.name',
      durationKey: 'methodology_timeline.step3.duration',
      descKey: 'methodology_timeline.step3.short_desc',
      badgeKey: 'methodology_timeline.step3.badge',
      outcomeKey: 'methodology_timeline.step3.outcome',
      icon: <Activity size={22} className="text-emerald-400" />,
      techStack: ['eBPF Kernel Probes', 'Datadog / Prometheus', 'Event-Driven Runbooks', 'Dieppe AST Escalation'],
      deliverables: [
        '24/7/365 Continuous Cloud Security Posture Management (CSPM)',
        'Autonomous event-driven threat isolation and key rotation',
        'Continuous cryptographic audit evidence archives',
        'Direct AST senior DevSecOps architect support from Dieppe, NB'
      ],
      frenchDeliverables: [
        'Gestion continue de posture de sécurité infonuagique (CSPM) 24/7/365',
        'Isolation autonome des menaces et rotation automatique des clés',
        'Archives cryptographiques de preuves d\'audit générées en continu',
        'Soutien direct d\'architectes DevSecOps seniors depuis Dieppe, N.-B.'
      ]
    }
  ];

  const currentDetail = stepsData[displayedStep];

  return (
    <section 
      id="methodology-timeline" 
      className="py-20 md:py-28 bg-slate-950 text-slate-100 border-b border-slate-900/60 relative overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-cyan-950/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <Sparkles size={13} className="animate-pulse" />
            <span>{t('methodology_timeline.badge') || 'Interactive Client Journey'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-100 leading-tight">
            <span>{t('methodology_timeline.title_main') || 'Predictable Execution: '}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {t('methodology_timeline.title_accent') || 'The 3-Step Client Journey'}
            </span>
          </h2>

          <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            {t('methodology_timeline.subtitle') || 'Hover over each phase to inspect technical deliverables, architectural guardrails, and guaranteed business outcomes.'}
          </p>
        </div>

        {/* Horizontal Timeline Bar Track */}
        <div className="relative mb-12 max-w-5xl mx-auto hidden md:block">
          {/* Connecting Track Line */}
          <div className="absolute top-1/2 left-12 right-12 -translate-y-1/2 h-[2px] bg-slate-800 z-0">
            {/* Dynamic illuminated progress fill */}
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-500 ease-out"
              style={{
                width: displayedStep === 0 ? '20%' : displayedStep === 1 ? '60%' : '100%'
              }}
            />
          </div>

          {/* 3 Step Nodes along the Horizontal Axis */}
          <div className="relative z-10 grid grid-cols-3 gap-8">
            {stepsData.map((step, idx) => {
              const isSelected = displayedStep === idx;
              return (
                <button
                  key={step.id}
                  id={`timeline-node-${step.id}`}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                  aria-label={`Select step ${step.stepNum}: ${t(step.titleKey)}`}
                >
                  {/* Step Node Circle */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                    isSelected 
                      ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.5)] scale-110' 
                      : 'bg-slate-900 border border-slate-700 text-slate-400 group-hover:border-cyan-500/60 group-hover:text-cyan-400 group-hover:scale-105'
                  }`}>
                    {step.stepNum}
                  </div>

                  {/* Step Label & Duration Pill */}
                  <div className="mt-4 space-y-1">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold transition-colors ${
                      isSelected 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      {t(step.durationKey)}
                    </span>
                    <h3 className={`text-sm font-bold tracking-tight transition-colors line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {t(step.titleKey)}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Horizontal Cards Grid (with responsive mobile stacking & rich hover details) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-10">
          {stepsData.map((step, idx) => {
            const isSelected = displayedStep === idx;
            const deliverables = language === 'fr' ? step.frenchDeliverables : step.deliverables;

            return (
              <div
                key={step.id}
                id={`step-card-${step.id}`}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900/90 border-2 border-cyan-500/60 shadow-[0_10px_35px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20 -translate-y-1.5'
                    : 'bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Active Indicator Top Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isSelected 
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider block">
                        Phase {step.stepNum}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-medium">
                        {t(step.durationKey)}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isSelected 
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' 
                      : 'bg-slate-950/60 text-slate-500 border-slate-800'
                  }`}>
                    {t(step.badgeKey)}
                  </span>
                </div>

                {/* Card Title & Description */}
                <div className="space-y-3 mb-6">
                  <h3 className={`text-lg font-bold tracking-tight transition-colors ${
                    isSelected ? 'text-white' : 'text-slate-200'
                  }`}>
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {t(step.descKey)}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="space-y-2 pt-4 border-t border-slate-800/60 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
                    {language === 'fr' ? 'Livrables & Artefacts Clés :' : 'Key Deliverables & Artifacts:'}
                  </span>
                  <ul className="space-y-2">
                    {deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-4 border-t border-slate-800/60 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {step.techStack.map((tech, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Guaranteed Outcome Box */}
                  <div className={`p-3 rounded-xl border text-xs transition-colors ${
                    isSelected 
                      ? 'bg-cyan-950/30 border-cyan-800/50 text-cyan-200' 
                      : 'bg-slate-950/40 border-slate-800/60 text-slate-400'
                  }`}>
                    <span className="text-[9px] font-mono uppercase font-bold tracking-wider text-cyan-400 block mb-0.5">
                      {language === 'fr' ? 'Résultat Garanti :' : 'Guaranteed Outcome:'}
                    </span>
                    <p className="text-[11px] leading-snug">
                      {t(step.outcomeKey)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout Bar */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {language === 'fr' ? 'Prêt à débuter par l\'étape 01 ?' : 'Ready to start with Step 01?'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'fr' 
                  ? 'Audit d\'architecture sans engagement de 30 minutes avec nos ingénieurs de Dieppe, N.-B.' 
                  : 'Zero-obligation 30-minute security audit review with senior engineers in Dieppe, NB.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-lead-drawer'))}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>{language === 'fr' ? 'Demander l\'Audit (Étape 01)' : 'Request Step 01 Audit'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MethodologyTimeline;
