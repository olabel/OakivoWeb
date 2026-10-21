import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, 
  Clock, Zap, TrendingUp, AlertTriangle, Send, Loader2, 
  Calendar, Check, RefreshCw 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

export const SmallBizAiAuditModal: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Form responses
  const [answers, setAnswers] = useState({
    responseTime: '',
    followUpStyle: '',
    adminHours: '',
    techStack: '',
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(1);
      setCompleted(false);
      setError('');
    };
    window.addEventListener('open-ai-audit-modal', handleOpen);
    return () => window.removeEventListener('open-ai-audit-modal', handleOpen);
  }, []);

  const handleSelectOption = (field: 'responseTime' | 'followUpStyle' | 'adminHours' | 'techStack', value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    setStep(prev => prev + 1);
  };

  const calculateScore = () => {
    let score = 50;
    if (answers.responseTime.includes('Under 5') || answers.responseTime.includes('Moins de 5')) score += 15;
    else if (answers.responseTime.includes('Next') || answers.responseTime.includes('Lendemain')) score -= 20;

    if (answers.followUpStyle.includes('3+')) score += 15;
    else if (answers.followUpStyle.includes('rarely') || answers.followUpStyle.includes('Rarement')) score -= 25;

    if (answers.adminHours.includes('30+')) score -= 20;
    else if (answers.adminHours.includes('5–15')) score -= 5;

    return Math.max(32, Math.min(94, score));
  };

  const handleSubmitAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setCompleted(true);
      return;
    }

    if (!answers.name.trim() || !answers.email.trim() || !answers.company.trim()) {
      setError(isFr ? 'Veuillez remplir vos coordonnées.' : 'Please provide your name, company, and email.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const score = calculateScore();
      await db.saveEntry('lead', {
        name: answers.name.trim(),
        email: answers.email.trim().toLowerCase(),
        company: answers.company.trim(),
        phone: answers.phone.trim(),
        focusArea: 'Interactive AI Leak & Growth Audit',
        bottleneck: `Audit Score: ${score}/100 | Response Time: ${answers.responseTime} | FollowUp: ${answers.followUpStyle} | Weekly Admin: ${answers.adminHours} | Tech: ${answers.techStack}`,
        source: 'Interactive 60-Sec AI Audit Modal'
      });

      setSubmitting(false);
      setCompleted(true);
    } catch (err) {
      console.error('Audit submission error:', err);
      setSubmitting(false);
      // Still show completed state so user gets their score
      setCompleted(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setCompleted(false);
      setError('');
    }, 300);
  };

  const openBookingDirectly = () => {
    handleClose();
    window.dispatchEvent(new CustomEvent('open-lead-drawer', {
      detail: {
        focus: `Audit Review Session (${answers.company || 'Small Business'})`,
        topic: `Audit Roadmap Review: Score ${calculateScore()}/100`
      }
    }));
  };

  if (!isOpen) return null;

  const score = calculateScore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#090E1F] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl text-left overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Ambient Top Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {!completed ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                <Sparkles size={12} className="text-emerald-400" />
                <span>{isFr ? 'AUDIT EXPRESS EN 60 SECONDES' : '60-SECOND SMALL BUSINESS AI AUDIT'}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{isFr ? `Étape ${step} sur 5` : `Step ${step} of 5`}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                {step === 1 && (isFr ? 'À quelle vitesse répondez-vous aux nouveaux prospects ?' : 'How fast does your team respond to new inbound leads?')}
                {step === 2 && (isFr ? 'Comment relancez-vous vos devis sans réponse ?' : 'How consistently do you follow up on sent quotes & estimates?')}
                {step === 3 && (isFr ? 'Combien d’heures par semaine sont perdues en saisie manuelle ?' : 'How many hours a week does your team spend on manual paperwork?')}
                {step === 4 && (isFr ? 'Quels sont vos logiciels actuels principaux ?' : 'What primary software does your business run on today?')}
                {step === 5 && (isFr ? 'Où devons-nous envoyer votre rapport personnalisé ?' : 'Where should we send your custom AI Roadmap?')}
              </h3>
            </div>

            {/* Step 1: Speed to Lead */}
            {step === 1 && (
              <div className="space-y-3">
                {[
                  { label: isFr ? '⚡ Moins de 5 minutes (très rare)' : '⚡ Under 5 minutes (Fast responder)', val: 'Under 5 mins' },
                  { label: isFr ? '⏱️ Entre 1 et 4 heures' : '⏱️ Within 1 to 4 hours', val: '1-4 hours' },
                  { label: isFr ? '📅 Le lendemain ou le soir après la tournée' : '📅 Next business day / evening catchup', val: 'Next day' },
                  { label: isFr ? '⚠️ Quand nous avons le temps (aléatoire)' : '⚠️ Whenever we get a free moment', val: 'Inconsistent' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleSelectOption('responseTime', opt.val)}
                    className="w-full p-4 rounded-xl bg-black/40 hover:bg-slate-800/80 border border-white/[0.08] hover:border-cyan-500/40 text-left text-sm text-slate-200 hover:text-white font-medium transition-all duration-200 cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight size={14} className="text-cyan-400" />
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Followup Consistency */}
            {step === 2 && (
              <div className="space-y-3">
                {[
                  { label: isFr ? '✅ Nous relançons 3+ fois de façon systématique' : '✅ We follow up 3+ times systematically', val: '3+ systematic' },
                  { label: isFr ? '📨 Nous envoyons 1 seul courriel poli' : '📨 We send 1 polite follow-up email', val: '1 email only' },
                  { label: isFr ? '⏳ Nous relançons rarement (manque de temps)' : '⏳ We rarely follow up (lack of time)', val: 'Rarely follow up' },
                  { label: isFr ? '🤷 Pas de suivi : si le client veut, il rappelle' : '🤷 We wait for them to call back', val: 'Passive / No follow-up' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleSelectOption('followUpStyle', opt.val)}
                    className="w-full p-4 rounded-xl bg-black/40 hover:bg-slate-800/80 border border-white/[0.08] hover:border-cyan-500/40 text-left text-sm text-slate-200 hover:text-white font-medium transition-all duration-200 cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight size={14} className="text-cyan-400" />
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Admin Hours */}
            {step === 3 && (
              <div className="space-y-3">
                {[
                  { label: isFr ? 'Moins de 5 heures par semaine' : 'Under 5 hours per week', val: '< 5 hrs' },
                  { label: isFr ? '5 à 15 heures par semaine (1 à 2 jours perdus)' : '5 to 15 hours per week (1-2 days lost)', val: '5–15 hrs' },
                  { label: isFr ? '15 à 30 heures par semaine (lourd goulot)' : '15 to 30 hours per week (heavy friction)', val: '15–30 hrs' },
                  { label: isFr ? '30+ heures par semaine (chaos administratif)' : '30+ hours per week (constant paperwork backlog)', val: '30+ hrs' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleSelectOption('adminHours', opt.val)}
                    className="w-full p-4 rounded-xl bg-black/40 hover:bg-slate-800/80 border border-white/[0.08] hover:border-cyan-500/40 text-left text-sm text-slate-200 hover:text-white font-medium transition-all duration-200 cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight size={14} className="text-cyan-400" />
                  </button>
                ))}
              </div>
            )}

            {/* Step 4: Tech Stack */}
            {step === 4 && (
              <div className="space-y-3">
                {[
                  { label: isFr ? 'QuickBooks ou Xero + Gmail / Outlook' : 'QuickBooks or Xero + Gmail / Outlook', val: 'QBO/Xero' },
                  { label: isFr ? 'Jobber, Housecall Pro ou ServiceTitan' : 'Jobber, Housecall Pro, or ServiceTitan', val: 'Jobber/Field' },
                  { label: isFr ? 'Tableurs Excel, fiches papier & boîte de reçus' : 'Excel spreadsheets, paper forms & physical receipts', val: 'Excel/Paper' },
                  { label: isFr ? 'Odoo, CRM sur mesure ou ERP existant' : 'Odoo, custom CRM, or legacy ERP', val: 'Odoo/CRM' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleSelectOption('techStack', opt.val)}
                    className="w-full p-4 rounded-xl bg-black/40 hover:bg-slate-800/80 border border-white/[0.08] hover:border-cyan-500/40 text-left text-sm text-slate-200 hover:text-white font-medium transition-all duration-200 cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight size={14} className="text-cyan-400" />
                  </button>
                ))}
              </div>
            )}

            {/* Step 5: Contact Info */}
            {step === 5 && (
              <form onSubmit={handleSubmitAudit} className="space-y-4">
                {/* Honeypot anti-spam */}
                <input 
                  type="text" 
                  name="website_url" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  className="hidden" 
                  tabIndex={-1} 
                  autoComplete="off" 
                />

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    {isFr ? 'Votre Nom Complet *' : 'Your Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={answers.name}
                    onChange={(e) => setAnswers(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. David Cormier"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    {isFr ? 'Nom de Votre Entreprise *' : 'Company Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={answers.company}
                    onChange={(e) => setAnswers(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g. Apex Mechanical"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    {isFr ? 'Courriel Professionnel *' : 'Work Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={answers.email}
                    onChange={(e) => setAnswers(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="david@apexmechanical.ca"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    {isFr ? 'Numéro de Téléphone (pour SMS de suivi, optionnel)' : 'Phone Number (for SMS report link, optional)'}
                  </label>
                  <input
                    type="tel"
                    value={answers.phone}
                    onChange={(e) => setAnswers(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(506) 555-0199"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {error && (
                  <p className="text-xs text-rose-400 font-mono">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-emerald-400/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{isFr ? 'Analyse en cours...' : 'Calculating AI Opportunity Score...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>{isFr ? 'Afficher Mon Score & Ma Feuille de Route' : 'Generate My Custom AI Score & Roadmap'}</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {step > 1 && step <= 4 && (
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-between items-center text-xs font-mono text-slate-500">
                <button
                  type="button"
                  onClick={() => setStep(prev => prev - 1)}
                  className="hover:text-slate-300 transition-colors cursor-pointer"
                >
                  ← {isFr ? 'Retour' : 'Back'}
                </button>
                <span>{Math.round((step / 5) * 100)}% {isFr ? 'terminé' : 'completed'}</span>
              </div>
            )}
          </div>
        ) : (
          /* Completed Result Screen */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                {isFr ? 'RÉSULTATS DE L’AUDIT OAKIVO' : 'OAKIVO AI OPPORTUNITY REPORT'}
              </span>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight">
                {score} <span className="text-sm font-sans font-light text-slate-400">/ 100</span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono font-semibold">
                {score < 60 
                  ? (isFr ? 'Fuite de Revenu Élevée Détectée' : 'High Revenue & Time Leakage Detected')
                  : (isFr ? 'Potentiel d’Accélération Immédiat' : 'Immediate Acceleration Potential')}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-3 text-xs font-mono">
              <div className="text-slate-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
                <CheckCircle2 size={13} className="text-cyan-400" />
                <span>{isFr ? 'Vos 3 Micro-Automations Prioritaires :' : 'Your Top 3 High-ROI Quick Wins:'}</span>
              </div>
              <ul className="space-y-2 text-slate-300 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">1.</span>
                  <span><strong>Speed-to-Lead 90s:</strong> Stop losing inbound leads during busy job hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">2.</span>
                  <span><strong>Automated Quote Resurrector:</strong> Reclaim ~18% of stalled estimates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-300 font-bold">3.</span>
                  <span><strong>Zero-Typing Receipts:</strong> Eliminate 8-12 hours of weekly invoice typing.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={openBookingDirectly}
                className="w-full py-4 px-6 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-cyan-400/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar size={15} />
                <span>{isFr ? 'Réserver Ma Session d’Examen (30 Min)' : 'Schedule 30-Min Roadmap Review with Founders'}</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 text-center text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {isFr ? 'Fermer cette fenêtre' : 'Close and return to website'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SmallBizAiAuditModal;
