import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, ShieldCheck, Sparkles, Building2, Mail, User, Phone, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { db } from '../utils/database';
import { useLanguage } from '../context/LanguageContext';

interface LeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

const LeadDrawer: React.FC<LeadDrawerProps> = ({ isOpen, onClose, defaultTopic }) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bottleneck: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.bottleneck) return;

    setStatus('submitting');
    
    // Persist lead to database
    db.saveEntry('lead', {
      ...formData,
      type: 'OPERATIONAL_AUDIT_INTAKE',
      submittedAt: new Date().toISOString()
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      bottleneck: ''
    });
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
            <div className="p-6 md:p-8 bg-[#070A0F] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech font-bold uppercase tracking-[0.2em] text-emerald-400 block">
                    Oakivo Free 15-Min Audit
                  </span>
                  <h3 className="text-xl font-display font-bold text-white">
                    Book Your Operational Audit
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
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-display font-bold text-white">
                      Operational Audit Request Received
                    </h4>
                    <p className="text-sm text-gray-400 max-w-md mx-auto">
                      One of our senior automation specialists will review your workflow request and contact you directly within 24 hours to schedule your 15-minute operational audit.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    Close & Return to Page
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    No high-pressure sales pitch. One of our senior automation specialists will review your daily workflow and show you exactly where time is being lost—100% free of charge.
                  </p>

                  {/* Field 1: Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-gray-300 block">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-3.5 text-gray-500" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marcus Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  {/* Field 2: Work Email */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-gray-300 block">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-3.5 text-gray-500" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. m.vance@company.ca"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  {/* Field 3: Task Description */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-gray-300 block">
                      What manual task takes up most of your team's time? *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="e.g. Typing invoice data from PDFs into our accounting tool, copy-pasting customer orders into spreadsheets..."
                      value={formData.bottleneck}
                      onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-black" />
                        <span>Scheduling Operational Audit...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Book My Free 15-Minute Operational Audit</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Footer badge */}
            <div className="p-4 bg-[#070A0F] border-t border-white/10 flex items-center justify-between text-[11px] text-gray-500 font-mono-tech">
              <span className="flex items-center gap-1.5 text-oakivo-accent font-bold">
                <ShieldCheck size={14} /> PIPEDA & SOC2 Type II Certified
              </span>
              <span>Dieppe • Toronto • Montreal</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadDrawer;
