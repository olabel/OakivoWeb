import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Lock, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export const ComplianceGrader: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 'residency',
      titleEn: 'Data Residency & Sovereign Jurisdiction',
      titleFr: 'Résidence des Données & Souveraineté',
      descEn: 'Are corporate, customer, and backup records stored strictly within Canadian sovereign zones (AWS/Azure ca-central)?',
      descFr: 'Les données clients et sauvegardes sont-elles hébergées exclusivement au Canada (ca-central)?',
      options: [
        { labelEn: '100% strictly in Canadian ca-central regions', labelFr: '100% strictement dans les régions canadiennes', points: 25 },
        { labelEn: 'Mixed or uncertain multi-region US/Canada hosting', labelFr: 'Hébergement mixte ou incertain É.-U. / Canada', points: 10 },
        { labelEn: 'Hosted primarily in US without Canadian isolation', labelFr: 'Hébergé principalement aux É.-U.', points: 0 }
      ]
    },
    {
      id: 'iam',
      titleEn: 'Zero Trust Identity & Access Management (IAM)',
      titleFr: 'Zéro Confiance & Gestion des Accès (IAM)',
      descEn: 'Do all staff and cloud infrastructure accounts enforce MFA and least-privilege role boundaries?',
      descFr: 'Tous les comptes et accès cloud appliquent-ils le MFA et le principe du moindre privilège?',
      options: [
        { labelEn: 'Mandatory hardware MFA and automated least-privilege policies', labelFr: 'MFA matériel obligatoire et politiques de moindre privilège', points: 25 },
        { labelEn: 'Basic MFA on key accounts, but manual admin privileges', labelFr: 'MFA basique sur certains comptes, privilèges manuels', points: 12 },
        { labelEn: 'Shared credentials or no centralized MFA enforcement', labelFr: 'Identifiants partagés ou pas de MFA centralisé', points: 0 }
      ]
    },
    {
      id: 'encryption',
      titleEn: 'Encryption at Rest & in Transit',
      titleFr: 'Chiffrement au Repos et en Transit',
      descEn: 'Is all data encrypted using customer-managed keys (AES-256) and TLS 1.3 across all communication buses?',
      descFr: 'Les données sont-elles chiffrées en AES-256 avec clés gérées et TLS 1.3 en transit?',
      options: [
        { labelEn: 'AES-256 with rotation and enforced TLS 1.3 mTLS', labelFr: 'AES-256 avec rotation et TLS 1.3 mTLS obligatoire', points: 25 },
        { labelEn: 'Standard provider-managed encryption without custom audits', labelFr: 'Chiffrement standard sans audit des clés', points: 15 },
        { labelEn: 'Unencrypted stores or legacy TLS 1.0/1.1 protocols', labelFr: 'Stockages non chiffrés ou protocoles obsolètes', points: 0 }
      ]
    },
    {
      id: 'evidence',
      titleEn: 'Automated Audit Evidence & Logging',
      titleFr: 'Preuves d’Audit Automatisées & Télémétrie',
      descEn: 'Can you produce automated audit evidence for PIPEDA, Quebec Law 25, or SOC 2 in under 48 hours?',
      descFr: 'Pouvez-vous fournir des preuves d’audit pour LPRPDE ou Loi 25 en moins de 48 heures?',
      options: [
        { labelEn: 'Automated continuous evidence collectors with immutable logs', labelFr: 'Collecteurs automatisés continus et journaux immuables', points: 25 },
        { labelEn: 'Manual compilation taking 1–2 weeks of engineering time', labelFr: 'Compilation manuelle nécessitant 1 à 2 semaines d’ingénieurs', points: 10 },
        { labelEn: 'No structured evidence collection currently implemented', labelFr: 'Aucune collecte structurée de preuves', points: 0 }
      ]
    }
  ];

  const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);

  const getTier = (score: number) => {
    if (score >= 85) return { grade: 'A', statusEn: 'Enterprise Ready & Sovereign Compliant', statusFr: 'Conforme et Prêt pour l’Entreprise', color: 'text-emerald-400' };
    if (score >= 60) return { grade: 'B', statusEn: 'Moderate Risk: Gaps in Audit Automation', statusFr: 'Risque Modéré: Lacunes d’Automatisation', color: 'text-cyan-400' };
    return { grade: 'C', statusEn: 'Critical Exposure: Canadian Sovereignty & Access Gaps', statusFr: 'Exposition Critique: Vulnérabilités Majeures', color: 'text-amber-400' };
  };

  const handleSelect = (qId: string, pts: number) => {
    setAnswers(prev => ({ ...prev, [qId]: pts }));
  };

  const tier = getTier(totalScore);

  return (
    <>
      <SEO 
        title={isFr ? "Évaluateur de Conformité & Risque Infonuagique | Oakivo" : "Canadian Compliance Readiness Grader | Oakivo"}
        description={isFr ? "Évaluez votre posture de souveraineté infonuagique et votre conformité LPRPDE, Loi 25 et SOC 2." : "Assess your cloud sovereignty and security posture against PIPEDA, Quebec Law 25, and SOC 2 criteria."}
        canonical="/compliance-grader"
      />

      <div className="bg-[#030712] min-h-screen pt-32 pb-24 px-6 sm:px-8">
        <div className="container mx-auto max-w-4xl space-y-12">
          
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
              {isFr ? 'OUTIL D’ÉVALUATION EN LIGNE' : 'INSTITUTIONAL DIAGNOSTIC TOOL'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              {isFr ? 'Évaluateur de Maturité Réglementaire' : 'Canadian Compliance & Sovereignty Grader'}
            </h1>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              {isFr 
                ? 'Évaluez en 2 minutes votre exposition aux exigences fédérales (LPRPDE), québécoises (Loi 25) et aux audits SOC 2 Type II de vos clients corporatifs.' 
                : 'Benchmark your cloud security, Canadian data residency, and audit posture in 2 minutes against federal PIPEDA, Law 25, and enterprise SOC 2 standards.'}
            </p>
          </div>

          <div className="space-y-8">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-7 sm:p-8 rounded-3xl bg-[#090E1D] border border-white/[0.08] space-y-5">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-cyan-400 font-bold">0{idx + 1}</div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white">{isFr ? q.titleFr : q.titleEn}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-light">{isFr ? q.descFr : q.descEn}</p>
                </div>

                <div className="space-y-2.5">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = answers[q.id] === opt.points;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelect(q.id, opt.points)}
                        className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-mono transition-all border flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-950/40 border-cyan-400 text-white font-semibold shadow-lg shadow-cyan-500/10'
                            : 'bg-[#050811] border-white/[0.06] text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{isFr ? opt.labelFr : opt.labelEn}</span>
                        {isSelected && <CheckCircle2 size={16} className="text-cyan-400 shrink-0 ml-3" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Results Card */}
          {Object.keys(answers).length === questions.length && (
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#090E1D] to-[#040815] border border-cyan-500/40 shadow-2xl text-center space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  {isFr ? 'SCORE GLOBAL DE CONFORMITÉ' : 'DIAGNOSTIC COMPLIANCE SCORE'}
                </span>
                <div className="text-5xl sm:text-6xl font-mono font-bold text-white tracking-tight">
                  {totalScore} <span className="text-2xl text-slate-500">/ 100</span>
                </div>
                <div className={`text-base sm:text-lg font-mono font-bold ${tier.color}`}>
                  Grade {tier.grade} · {isFr ? tier.statusFr : tier.statusEn}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-cyan-500/20"
                >
                  <span>{isFr ? 'Planifier une Remise à Niveau' : 'Schedule Hardening Architecture Review'}</span>
                  <ArrowRight size={14} />
                </Link>
                <button
                  type="button"
                  onClick={() => setAnswers({})}
                  className="px-5 py-3.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white font-mono text-xs transition-colors flex items-center gap-2"
                >
                  <RotateCcw size={13} />
                  <span>{isFr ? 'Réinitialiser le Test' : 'Reset Diagnostic'}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default ComplianceGrader;
