import React, { useState, useEffect } from 'react';
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
        focus: `Audit Review Session (${answers.company || 'Enterprise'})`,
        topic: `Audit Roadmap Review: Score ${calculateScore()}/100`
      }
    }));
  };

  if (!isOpen) return null;

  const score = calculateScore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#070a09] border border-[#23c694]/40 p-6 sm:p-8 shadow-2xl text-left overflow-hidden text-[#f7faf9]"
        role="dialog"
        aria-modal="true"
      >
        {/* Ambient Top Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#0f5e4a]/25 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-[#7c8581] hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {!completed ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#23c694] uppercase tracking-widest">
                <Sparkles size={12} className="text-[#23c694]" />
                <span>{isFr ? 'DIAGNOSTIC EXPRESS EN 60 SECONDES' : '60-SECOND EXECUTIVE AI AUDIT'}</span>
                <span className="text-[#36423d]">·</span>
                <span className="text-[#a8b0ad]">{isFr ? `Étape ${step} sur 5` : `Step ${step} of 5`}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-light text-white tracking-tight">
                {step === 1 && (isFr ? 'À quelle vitesse répondez-vous aux nouveaux prospects ?' : 'How fast does your team respond to new inbound leads?')}
                {step === 2 && (isFr ? 'Comment relancez-vous vos devis sans réponse ?' : 'How consistently do you follow up on sent quotes & estimates?')}
                {step === 3 && (isFr ? 'Combien d’heures par semaine sont perdues en paperasse ?' : 'How many hours a week does your team spend on manual paperwork?')}
                {step === 4 && (isFr ? 'Quels sont vos logiciels d’exploitation principaux ?' : 'What primary software does your business run on today?')}
                {step === 5 && (isFr ? 'Où devons-nous transmettre votre rapport personnalisé ?' : 'Where should we send your custom AI Roadmap?')}
              </h3>
            </div>

            {/* Step 1: Speed to Lead */}
            {step === 1 && (
              <div className="space-y-2.5">
                {[
                  { label: isFr ? '⚡ Moins de 5 minutes (réponse instantanée)' : '⚡ Under 5 minutes (Instant responder)', val: 'Under 5 mins' },
                  { label: isFr ? '⏱️ Entre 1 et 4 heures' : '⏱️ Within 1 to 4 hours', val: '1-4 hours' },
                  { label: isFr ? '📅 Le lendemain ou le soir après la tournée' : '📅 Next business day / evening catchup', val: 'Next day' },
                  { label: isFr ? '⚠️ Quand nous avons le temps (aléatoire)' : '⚠️ Inconsistent / when time permits', val: 'Inconsistent' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleSelectOption('responseTime', opt.val)}
                    className="w-full p-4 rounded-xl bg-[#000000]/50 hover:bg-[#0f5e4a]/20 border border-[#1e2d27] hover:border-[#23c694]/50 text-left text-xs sm:text-sm text-[#dce3e0] hover:text-white font-mono transition-all duration-200 cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight size={14} className="text-[#23c694]" />
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Followup Consistency */}
            {step === 2 && (
              <div className="space-y-2.5">
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
                    className="w-full p-4 rounded-xl bg-[#000000]/50 hover:bg-[#0f5e4a]/20 border border-[#1e2d27] hover:border-[#23c694]/50 text-left text-xs sm:text-sm text-[#dce3e0] hover:text-white font-mono transition-all duration-200 cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight size={14} className="text-[#23c694]" />
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Admin Hours */}
            {step === 3 && (
              <div className="space-y-2.5">
                {[
                  { label: isFr ? 'Moins de 5 heures par semaine' : 'Under 5 hours per week', val: '< 5 hrs' },
                  { label: isFr ? '5 à 15 heures par semaine (1 à 2 jours perdus)' : '5 to 15 hours per week (1-2 days lost)', val: '5–15 hrs' },
                  { label: isFr ? '15 à 30 heures par semaine (lourd goulot)' : '15 to 30 hours per week (heavy friction)', val: '15–30 hrs' },
                  { label: isFr ? '30+ heures par semaine (chaos administratif)' : '30+ hours per week (constant backlog)', val: '30+ hrs' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleSelectOption('adminHours', opt.val)}
                    className="w-full p-4 rounded-xl bg-[#000000]/50 hover:bg-[#0f5e4a]/20 border border-[#1e2d27] hover:border-[#23c694]/50 text-left text-xs sm:text-sm text-[#dce3e0] hover:text-white font-mono transition-all duration-200 cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight size={14} className="text-[#23c694]" />
                  </button>
                ))}
              </div>
            )}

            {/* Step 4: Tech Stack */}
            {step === 4 && (
              <div className="space-y-2.5">
                {[
                  { label: 'QuickBooks / Xero + Google Workspace / Outlook', val: 'QB/Xero + Workspace' },
                  { label: 'Jobber / ServiceTitan / Procore', val: 'Jobber/ServiceTitan' },
                  { label: 'ERP Sur Mesure / Odoo / NetSuite', val: 'Custom ERP / Odoo' },
                  { label: isFr ? 'Principalement papier, Excel et messages textes' : 'Primarily paper receipts, Excel & text messages', val: 'Paper & Excel' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleSelectOption('techStack', opt.val)}
                    className="w-full p-4 rounded-xl bg-[#000000]/50 hover:bg-[#0f5e4a]/20 border border-[#1e2d27] hover:border-[#23c694]/50 text-left text-xs sm:text-sm text-[#dce3e0] hover:text-white font-mono transition-all duration-200 cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight size={14} className="text-[#23c694]" />
                  </button>
                ))}
              </div>
            )}

            {/* Step 5: Contact Info */}
            {step === 5 && (
              <form onSubmit={handleSubmitAudit} className="space-y-3.5">
                {/* Honeypot */}
                <input
                  type="text"
                  name="audit_honeypot_code"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#a8b0ad] mb-1">
                      {isFr ? 'Votre Nom *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={answers.name}
                      onChange={(e) => setAnswers(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Marc Tremblay"
                      className="w-full px-4 py-3 rounded-xl bg-[#000000]/60 border border-[#1e2d27] focus:border-[#23c694] text-white text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#a8b0ad] mb-1">
                      {isFr ? 'Entreprise *' : 'Company Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={answers.company}
                      onChange={(e) => setAnswers(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Atlantic Dynamics Inc."
                      className="w-full px-4 py-3 rounded-xl bg-[#000000]/60 border border-[#1e2d27] focus:border-[#23c694] text-white text-xs font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#a8b0ad] mb-1">
                    {isFr ? 'Courriel Professionnel *' : 'Work Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={answers.email}
                    onChange={(e) => setAnswers(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="marc@company.ca"
                    className="w-full px-4 py-3 rounded-xl bg-[#000000]/60 border border-[#1e2d27] focus:border-[#23c694] text-white text-xs font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#a8b0ad] mb-1">
                    {isFr ? 'Numéro de Téléphone (optionnel)' : 'Direct Phone (optional)'}
                  </label>
                  <input
                    type="tel"
                    value={answers.phone}
                    onChange={(e) => setAnswers(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(506) 555-0192"
                    className="w-full px-4 py-3 rounded-xl bg-[#000000]/60 border border-[#1e2d27] focus:border-[#23c694] text-white text-xs font-mono focus:outline-none"
                  />
                </div>

                {error && (
                  <p className="text-xs text-rose-400 font-mono">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-[#23c694] disabled:opacity-50 text-black font-semibold font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer mt-3 shadow-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin text-black" />
                      <span>{isFr ? 'Calcul en cours...' : 'Calculating AI Yield Score...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      <span>{isFr ? 'Générer Mon Score et Ma Feuille de Route' : 'Generate My Executive AI Score'}</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {step > 1 && step <= 4 && (
              <div className="mt-4 pt-4 border-t border-[#1e2d27] flex justify-between items-center text-xs font-mono text-[#7c8581]">
                <button
                  type="button"
                  onClick={() => setStep(prev => prev - 1)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ← {isFr ? 'Retour' : 'Back'}
                </button>
                <span>{Math.round((step / 5) * 100)}% {isFr ? 'complété' : 'completed'}</span>
              </div>
            )}
          </div>
        ) : (
          /* Completed Result Screen */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <span className="nova-eyebrow text-[#23c694] block">
                {isFr ? 'RÉSULTATS DE L’AUDIT OAKIVO' : 'OAKIVO AI YIELD ASSESSMENT'}
              </span>
              <div className="text-5xl font-mono font-light text-white tracking-tight">
                {score} <span className="text-sm font-sans font-light text-[#7c8581]">/ 100</span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#0f5e4a]/25 border border-[#23c694]/40 text-[#23c694] text-xs font-mono font-medium">
                {score < 60 
                  ? (isFr ? 'Fuite Opérationnelle & Potentiel d’Accélération Élevé' : 'High Operational Leakage Detected')
                  : (isFr ? 'Gains Concrets Détectés dès le Premier Mois' : 'Immediate Acceleration Potential')}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#000000]/60 border border-[#1e2d27] space-y-3 text-xs font-mono">
              <div className="text-white font-medium uppercase tracking-wider text-[11px] flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#23c694]" />
                <span>{isFr ? 'Vos 3 Micro-Automations Prioritaires :' : 'Your Top 3 High-Yield Opportunities:'}</span>
              </div>
              <ul className="space-y-2 text-[#a8b0ad] font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-[#23c694] font-mono font-bold">1.</span>
                  <span><strong>Speed-to-Lead 45s:</strong> Instant quote drafting before competitors review inquiries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#23c694] font-mono font-bold">2.</span>
                  <span><strong>Automated Quote Resurrector:</strong> Reactivate stalled proposals with polite SMS.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#23c694] font-mono font-bold">3.</span>
                  <span><strong>Zero-Typing Invoices:</strong> Eradicate 8–12 hours of weekly invoice entry into accounting.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={openBookingDirectly}
                className="w-full nova-outline-btn justify-center cursor-pointer py-3.5"
              >
                <Calendar size={14} className="text-[#23c694]" />
                <span>{isFr ? 'Planifier une Consultation avec les Fondateurs' : 'Schedule Consultation with Senior Founders'}</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2 text-center text-xs font-mono text-[#7c8581] hover:text-white transition-colors cursor-pointer"
              >
                {isFr ? 'Fermer cette fenêtre' : 'Close and return to site'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SmallBizAiAuditModal;
