import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

interface SubscribeNewsletterProps {
  className?: string;
  source?: string;
}

export const SubscribeNewsletter: React.FC<SubscribeNewsletterProps> = ({
  className = '',
  source = 'insights_footer'
}) => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !validateEmail(email)) {
      setErrorMessage(
        language === 'fr' 
          ? 'Veuillez saisir une adresse courriel valide.' 
          : 'Please provide a valid corporate email address.'
      );
      return;
    }

    try {
      setStatus('loading');
      await db.subscribeToNewsletter(email, source);
      setStatus('success');
      setEmail('');
      toast.success(
        language === 'fr' ? 'Abonnement confirmé !' : 'Subscribed to Security Insights',
        {
          description: language === 'fr'
            ? 'Vous recevrez nos prochaines publications d’ingénierie et de conformité.'
            : 'You are subscribed to receive our bi-weekly architectural briefings.'
        }
      );
    } catch (err: any) {
      console.error('Newsletter subscription error:', err);
      setStatus('error');
      setErrorMessage(
        language === 'fr'
          ? 'Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.'
          : 'Failed to record subscription. Please try again or contact us directly.'
      );
    }
  };

  return (
    <div className={`w-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-slate-900/90 border border-slate-800 shadow-2xl ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-16">
        {/* Text Header */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <ShieldCheck size={14} />
            <span>{language === 'fr' ? 'Veille Technique & Réglementaire' : 'Security Intelligence Briefing'}</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight">
            {language === 'fr' ? (
              <>Abonnez-vous aux <span className="text-cyan-400">Analyses de Sécurité</span></>
            ) : (
              <>Subscribe to <span className="text-cyan-400">Security Insights</span></>
            )}
          </h2>

          <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
            {language === 'fr'
              ? 'Recevez nos analyses bimensuelles sur la souveraineté des données canadiennes (Loi 25, Bill C-26, PIPEDA), le Zero-Trust et l\'automatisation DevSecOps directement dans votre boîte de réception. Zéro spam, contenu strictement technique.'
              : 'Receive bi-weekly executive briefings on Canadian data sovereignty (Bill C-26, PIPEDA, Law 25), zero-trust architecture, and DevSecOps engineering directly in your inbox. Strictly technical, zero marketing fluff.'}
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full lg:max-w-md flex-shrink-0">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success-box"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-display font-bold text-white">
                  {language === 'fr' ? 'Abonnement Confirmé' : 'Subscription Confirmed'}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 font-light">
                  {language === 'fr'
                    ? 'Merci de votre intérêt. Votre adresse a été enregistrée avec succès dans notre base de données sécurisée.'
                    : 'Thank you for subscribing! You will receive our latest engineering whitepapers and threat briefings.'}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 underline"
                >
                  {language === 'fr' ? 'Abonner une autre adresse' : 'Subscribe another address'}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form-box"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={language === 'fr' ? 'nom@entreprise.ca' : 'security.lead@enterprise.ca'}
                      aria-label="Corporate email address"
                      disabled={status === 'loading'}
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-60 shadow-lg shadow-cyan-500/20 flex-shrink-0 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{language === 'fr' ? 'Envoi...' : 'Subscribing...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{language === 'fr' ? 'S’abonner' : 'Subscribe'}</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-400 font-mono">{errorMessage}</p>
                )}

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <ShieldCheck size={12} className="text-cyan-400 flex-shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Stockage sécurisé au Canada. Désabonnement à tout moment en un clic.'
                      : 'Data persisted securely in Canada. Unsubscribe at any time with zero hassle.'}
                  </span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SubscribeNewsletter;
