import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, ShieldCheck, Sparkles, Mail, User, Loader2, Building, Terminal } from 'lucide-react';
import { db } from '../utils/database';
import { useLanguage } from '../context/LanguageContext';
import { SuccessModal } from './SuccessModal';

interface LeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

const LeadDrawer: React.FC<LeadDrawerProps> = ({ isOpen, onClose, defaultTopic }) => {
  const { t, language } = useLanguage();
  const isFr = language === 'fr';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    focusArea: 'AI Speed-to-Lead & Lead Capture (< 90s)',
    bottleneck: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  React.useEffect(() => {
    if (defaultTopic && isOpen) {
      setFormData(prev => ({
        ...prev,
        bottleneck: prev.bottleneck ? prev.bottleneck : defaultTopic
      }));
    }
  }, [defaultTopic, isOpen]);

  const handleReset = () => {
    setStatus('idle');
    setFormData({ 
      name: '', 
      email: '', 
      company: '', 
      focusArea: 'AI Speed-to-Lead & Lead Capture (< 90s)',
      bottleneck: '' 
    });
    setErrors({});
    setHoneypot('');
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.name.trim()) newErrors.name = isFr ? "Votre nom est requis" : "Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = isFr ? "Nom trop court" : "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = isFr ? "Courriel professionnel requis" : "Work Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = isFr ? "Format de courriel invalide" : "Please enter a valid email format";

    if (!formData.company.trim()) newErrors.company = isFr ? "Entreprise requise" : "Company name is required";
    
    if (!formData.bottleneck.trim()) newErrors.bottleneck = isFr ? "Détaillez brièvement votre défi" : "Please provide details about your challenge";
    else if (formData.bottleneck.trim().length < 4) newErrors.bottleneck = isFr ? "Veuillez préciser un peu plus" : "Please provide a bit more detail";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setStatus('success');
      return;
    }
    if (!validateForm()) return;

    setStatus('submitting');
    
    try {
      await db.saveEntry('lead', {
        ...formData,
        type: 'DIGITAL_TRANSFORMATION_DISCOVERY',
        submittedAt: new Date().toISOString()
      });

      setStatus('success');
    } catch (err) {
      setErrors({ ...errors, bottleneck: isFr ? 'Erreur de connexion. Veuillez réessayer.' : 'A network error occurred. Please try again.' });
      setStatus('idle');
    }
  };

  return (
    <>
      <SuccessModal 
        isOpen={status === 'success'}
        onClose={() => {
          handleReset();
          onClose();
        }}
        title={t('drawer.success_title')}
        message={t('drawer.success_desc')}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100]"
          />
        )}
        {isOpen && (
          <motion.div
            key="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-[#000000] text-[#f7faf9] z-[101] border-l border-[#1e2d27] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 md:p-8 bg-[#070a09] border-b border-[#1e2d27] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0f5e4a]/25 border border-[#23c694]/40 flex items-center justify-center text-[#23c694]">
                  <Terminal size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#23c694] block">
                    {t('drawer.tag')}
                  </span>
                  <h3 className="text-lg md:text-xl font-display font-light text-white">
                    {t('drawer.title')}
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                aria-label="Close Audit Drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 no-scrollbar">
              {(status === 'idle' || status === 'submitting' || status === 'success') && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot Field */}
                  <input
                    type="text"
                    name="b_security_code"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden absolute opacity-0 pointer-events-none -z-10"
                    aria-hidden="true"
                  />

                  <p className="text-xs sm:text-sm text-[#a8b0ad] leading-relaxed font-light">
                    {t('drawer.desc')}
                  </p>

                  {/* Field 1: Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#dce3e0] block">
                      {t('drawer.name_label')}
                    </label>
                    <div className="relative">
                      <User size={15} className={`absolute left-4 top-3.5 ${errors.name ? 'text-red-400' : 'text-[#7c8581]'}`} />
                      <input
                        type="text"
                        placeholder={t('drawer.name_placeholder')}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        className={`w-full bg-[#070a09] border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-[#1e2d27] focus:border-[#23c694]'} rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-[#7c8581] focus:outline-none transition-colors`}
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-400 font-mono pl-1">{errors.name}</p>}
                  </div>

                  {/* Field 2: Work Email */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#dce3e0] block">
                      {t('drawer.email_label')}
                    </label>
                    <div className="relative">
                      <Mail size={15} className={`absolute left-4 top-3.5 ${errors.email ? 'text-red-400' : 'text-[#7c8581]'}`} />
                      <input
                        type="email"
                        placeholder={t('drawer.email_placeholder')}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full bg-[#070a09] border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-[#1e2d27] focus:border-[#23c694]'} rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-[#7c8581] focus:outline-none transition-colors`}
                      />
                    </div>
                    {errors.email && <p className="text-[10px] text-red-400 font-mono pl-1">{errors.email}</p>}
                  </div>

                  {/* Field 3: Company */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#dce3e0] block">
                      {t('drawer.company_label')}
                    </label>
                    <div className="relative">
                      <Building size={15} className={`absolute left-4 top-3.5 ${errors.company ? 'text-red-400' : 'text-[#7c8581]'}`} />
                      <input
                        type="text"
                        placeholder={t('drawer.company_placeholder')}
                        value={formData.company}
                        onChange={(e) => {
                          setFormData({ ...formData, company: e.target.value });
                          if (errors.company) setErrors({ ...errors, company: '' });
                        }}
                        className={`w-full bg-[#070a09] border ${errors.company ? 'border-red-500/50 focus:border-red-500' : 'border-[#1e2d27] focus:border-[#23c694]'} rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-[#7c8581] focus:outline-none transition-colors`}
                      />
                    </div>
                    {errors.company && <p className="text-[10px] text-red-400 font-mono pl-1">{errors.company}</p>}
                  </div>

                  {/* Field 4: Primary Focus Area */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#dce3e0] block">
                      {t('drawer.focus_label')}
                    </label>
                    <select
                      value={formData.focusArea}
                      onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
                      className="w-full bg-[#070a09] border border-[#1e2d27] focus:border-[#23c694] rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="AI Speed-to-Lead & Lead Capture (< 90s)">Speed-to-Lead Under 90s (Sales Engine)</option>
                      <option value="Automated Quote Resurrection & Revival">Automated Quote Resurrection & Drafting</option>
                      <option value="Zero-Typing Receipt & Invoice Sync">Zero-Typing Invoices & Bookkeeping</option>
                      <option value="24/7 AI Lead & Appointment Booker">24/7 AI Lead Scheduling & SMS Responder</option>
                      <option value="Executive Advisory & Applied Systems Deployment">Executive Advisory & Applied Systems Deployment</option>
                      <option value="Modern ERP Implementation & Migration">Modern ERP & Composable Architecture</option>
                    </select>
                  </div>

                  {/* Field 5: Bottleneck / Details */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#dce3e0] block">
                      {t('drawer.bottleneck_label')}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={t('drawer.bottleneck_placeholder')}
                      value={formData.bottleneck}
                      onChange={(e) => {
                        setFormData({ ...formData, bottleneck: e.target.value });
                        if (errors.bottleneck) setErrors({ ...errors, bottleneck: '' });
                      }}
                      className={`w-full bg-[#070a09] border ${errors.bottleneck ? 'border-red-500/50 focus:border-red-500' : 'border-[#1e2d27] focus:border-[#23c694]'} rounded-xl p-4 text-xs text-white placeholder-[#7c8581] focus:outline-none resize-none transition-colors`}
                    />
                    {errors.bottleneck && <p className="text-[10px] text-red-400 font-mono pl-1">{errors.bottleneck}</p>}
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 rounded-full bg-white hover:bg-[#23c694] text-black font-mono font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={15} className="animate-spin text-black" />
                        <span>{t('drawer.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>{t('drawer.submit_btn')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Footer badge */}
            <div className="p-4 bg-[#070a09] border-t border-[#1e2d27] flex items-center justify-between text-[11px] text-[#7c8581] font-mono">
              <span className="flex items-center gap-1.5 text-[#23c694] font-medium">
                <ShieldCheck size={14} /> {t('drawer.footer_badge')}
              </span>
              <span>{t('drawer.footer_region')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeadDrawer;
