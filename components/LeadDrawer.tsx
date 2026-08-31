import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, ShieldCheck, Sparkles, Mail, User, Loader2, Building, Terminal } from 'lucide-react';
import { db } from '../utils/database';
import { useLanguage } from '../context/LanguageContext';

interface LeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

const LeadDrawer: React.FC<LeadDrawerProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    bottleneck: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Work Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email format";

    if (!formData.company.trim()) newErrors.company = "Company name is required";
    
    if (!formData.bottleneck.trim()) newErrors.bottleneck = "Please provide details about your challenge";
    else if (formData.bottleneck.trim().length < 10) newErrors.bottleneck = "Please provide a bit more detail";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Bot detected via honeypot: silently simulate success without DB entry
      setStatus('success');
      return;
    }
    if (!validateForm()) return;

    setStatus('submitting');
    
    // Persist lead to database
    db.saveEntry('lead', {
      ...formData,
      type: 'SECURITY_ARCHITECTURE_AUDIT',
      submittedAt: new Date().toISOString()
    });

    try {
      const response = await fetch('/api/book-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: `Challenge / Bottleneck:\n${formData.bottleneck}`,
          urgency: 'High Priority (Audit Booking)'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      setStatus('success');
    } catch (err) {
      setErrors({ ...errors, submit: 'A network error occurred. Please try again.' });
      setStatus('idle');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      company: '',
      bottleneck: ''
    });
    setErrors({});
    setHoneypot('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-[#0B0F17] text-white z-[101] border-l border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 md:p-8 bg-slate-950 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Terminal size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400 block">
                    {t('drawer.tag')}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {t('drawer.title')}
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                aria-label="Close Audit Drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 no-scrollbar">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-white">
                      {t('drawer.success_title')}
                    </h4>
                    <p className="text-sm text-gray-400 max-w-md mx-auto">
                      {t('drawer.success_desc')}
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    {t('drawer.success_close') || "Close & Return to Site"}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Hidden Honeypot Field for Bot Anti-Spam */}
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

                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    {t('drawer.desc')}
                  </p>

                  {/* Field 1: Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-300 block">
                      {t('drawer.name_label')}
                    </label>
                    <div className="relative">
                      <User size={16} className={`absolute left-4 top-3.5 ${errors.name ? 'text-red-400' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        placeholder={t('drawer.name_placeholder')}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/15 focus:border-white'} rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-gray-400 focus:outline-none transition-colors`}
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-400 font-medium pl-1">{errors.name}</p>}
                  </div>

                  {/* Field 2: Work Email */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-300 block">
                      {t('drawer.email_label')}
                    </label>
                    <div className="relative">
                      <Mail size={16} className={`absolute left-4 top-3.5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                      <input
                        type="email"
                        placeholder={t('drawer.email_placeholder')}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/15 focus:border-white'} rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-gray-400 focus:outline-none transition-colors`}
                      />
                    </div>
                    {errors.email && <p className="text-[10px] text-red-400 font-medium pl-1">{errors.email}</p>}
                  </div>

                  {/* Field 3: Company */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-300 block">
                      {t('drawer.company_label')}
                    </label>
                    <div className="relative">
                      <Building size={16} className={`absolute left-4 top-3.5 ${errors.company ? 'text-red-400' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        placeholder={t('drawer.company_placeholder')}
                        value={formData.company}
                        onChange={(e) => {
                          setFormData({ ...formData, company: e.target.value });
                          if (errors.company) setErrors({ ...errors, company: '' });
                        }}
                        className={`w-full bg-white/5 border ${errors.company ? 'border-red-500/50 focus:border-red-500' : 'border-white/15 focus:border-white'} rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-gray-400 focus:outline-none transition-colors`}
                      />
                    </div>
                    {errors.company && <p className="text-[10px] text-red-400 font-medium pl-1">{errors.company}</p>}
                  </div>

                  {/* Field 4: Bottleneck / Security Challenge */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-300 block">
                      {t('drawer.bottleneck_label')}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={t('drawer.bottleneck_placeholder')}
                      value={formData.bottleneck}
                      onChange={(e) => {
                        setFormData({ ...formData, bottleneck: e.target.value });
                        if (errors.bottleneck) setErrors({ ...errors, bottleneck: '' });
                      }}
                      className={`w-full bg-white/5 border ${errors.bottleneck ? 'border-red-500/50 focus:border-red-500' : 'border-white/15 focus:border-white'} rounded-2xl p-4 text-xs text-white placeholder-gray-400 focus:outline-none resize-none transition-colors`}
                    />
                    {errors.bottleneck && <p className="text-[10px] text-red-400 font-medium pl-1">{errors.bottleneck}</p>}
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-full bg-white hover:bg-gray-100 text-black font-extrabold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-black" />
                        <span>{t('drawer.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>{t('drawer.submit_btn')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Footer badge */}
            <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-500 font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <ShieldCheck size={14} /> {t('drawer.footer_badge')}
              </span>
              <span>{t('drawer.footer_region')}</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadDrawer;
