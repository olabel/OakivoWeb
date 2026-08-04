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
    company: '',
    phone: '',
    serviceArea: defaultTopic || 'Odoo 19 Implementation',
    bottleneck: '',
    timeline: 'Immediate (Q3 2026)',
    budget: '$50,000 - $100,000',
    sovereignAgreement: true
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;

    setStatus('submitting');
    
    // Persist lead to database / Vault
    db.saveEntry('lead', {
      ...formData,
      type: 'TECHNICAL_INTAKE_DRAWER',
      submittedAt: new Date().toISOString()
    });

    await new Promise(resolve => setTimeout(resolve, 1200));
    setStatus('success');
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      serviceArea: 'Odoo 19 Implementation',
      bottleneck: '',
      timeline: 'Immediate (Q3 2026)',
      budget: '$50,000 - $100,000',
      sovereignAgreement: true
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
                <div className="w-10 h-10 rounded-2xl bg-oakivo-secondary/10 border border-oakivo-secondary/30 flex items-center justify-center text-oakivo-secondary shadow-glow-cyan">
                  <Sparkles size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech font-bold uppercase tracking-[0.3em] text-oakivo-secondary block">
                    Oakivo Protocol Intake
                  </span>
                  <h3 className="text-xl font-display font-bold text-white">
                    {language === 'en' ? 'Initialize Technical Discovery' : 'Initialiser la Découverte Technique'}
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                aria-label="Close Intake Drawer"
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
                  <div className="w-20 h-20 rounded-full bg-oakivo-secondary/20 border-2 border-oakivo-secondary flex items-center justify-center text-oakivo-secondary mx-auto shadow-glow-cyan">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-display font-bold text-white">
                      {language === 'en' ? 'Technical Intake Transmitted' : 'Intake Technique Transmis'}
                    </h4>
                    <p className="text-sm text-gray-400 max-w-md mx-auto">
                      {language === 'en'
                        ? 'Your diagnostic profile has been dispatched directly to a Principal Architect. We guarantee a response within 24 hours.'
                        : 'Votre profil diagnostic a été transmis à un architecte principal. Réponse garantie sous 24 heures.'}
                    </p>
                  </div>

                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-left max-w-md mx-auto space-y-3">
                    <span className="text-[10px] font-mono-tech text-oakivo-secondary uppercase tracking-widest block font-bold">
                      SLA Dispatch Metrics
                    </span>
                    <div className="flex justify-between text-xs py-1 border-b border-white/5">
                      <span className="text-gray-400">Principal Lead:</span>
                      <span className="font-bold text-white">Ahmed Bello (MEng, PMP)</span>
                    </div>
                    <div className="flex justify-between text-xs py-1 border-b border-white/5">
                      <span className="text-gray-400">Security Clearance:</span>
                      <span className="font-bold text-oakivo-accent">PIPEDA / SOC2 Verified</span>
                    </div>
                    <div className="flex justify-between text-xs py-1">
                      <span className="text-gray-400">Target Contact Email:</span>
                      <span className="font-bold text-white">{formData.email}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-8 py-3.5 rounded-full bg-oakivo-secondary text-black font-bold text-xs uppercase tracking-widest hover:shadow-glow-cyan transition-all"
                  >
                    {language === 'en' ? 'Close & Return to Portal' : 'Fermer et Retourner au Portail'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-oakivo-secondary block">
                      Primary Architectural Objective
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Odoo 19 ERP Implementation',
                        'Agentic AI Orchestration',
                        'PIPEDA & Cyber Resilience',
                        'Legacy System Modernization'
                      ].map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => setFormData({ ...formData, serviceArea: service })}
                          className={`p-3.5 rounded-2xl border text-left text-xs font-bold transition-all ${
                            formData.serviceArea === service
                              ? 'bg-oakivo-secondary text-black border-oakivo-secondary shadow-glow-cyan'
                              : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Personal & Corporate Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-gray-400">
                        Principal Name *
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-3.5 text-gray-500" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Marcus Vance"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-oakivo-secondary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-gray-400">
                        Corporate Email *
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-3.5 text-gray-500" />
                        <input
                          type="email"
                          required
                          placeholder="m.vance@company.ca"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-oakivo-secondary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-gray-400">
                        Organization / Enterprise Name
                      </label>
                      <div className="relative">
                        <Building2 size={16} className="absolute left-4 top-3.5 text-gray-500" />
                        <input
                          type="text"
                          placeholder="e.g. Apex Industrial Systems"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-oakivo-secondary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-gray-400">
                        Phone / Direct Line
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-3.5 text-gray-500" />
                        <input
                          type="tel"
                          placeholder="+1 (506) 555-0199"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-oakivo-secondary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Operational Bottleneck */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-gray-400">
                      Core Technical Bottleneck
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your current system gaps, legacy debt, or automation constraints..."
                      value={formData.bottleneck}
                      onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-oakivo-secondary resize-none"
                    />
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-gray-400">
                        Target Budget Bracket
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#131B2A] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-oakivo-secondary"
                      >
                        <option value="$25,000 - $50,000">$25,000 - $50,000 CAD</option>
                        <option value="$50,000 - $100,000">$50,000 - $100,000 CAD</option>
                        <option value="$100,000 - $250,000">$100,000 - $250,000 CAD</option>
                        <option value="$250,000+">$250,000+ Enterprise</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-gray-400">
                        Deployment Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full bg-[#131B2A] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-oakivo-secondary"
                      >
                        <option value="Immediate (Q3 2026)">Immediate (Q3 2026)</option>
                        <option value="Next 90 Days">Next 90 Days</option>
                        <option value="Q4 2026 Planning">Q4 2026 Planning</option>
                        <option value="Exploratory / Diagnostic">Exploratory / Diagnostic</option>
                      </select>
                    </div>
                  </div>

                  {/* PIPEDA Agreement */}
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <input
                      type="checkbox"
                      id="sovereign"
                      checked={formData.sovereignAgreement}
                      onChange={(e) => setFormData({ ...formData, sovereignAgreement: e.target.checked })}
                      className="mt-0.5 accent-oakivo-secondary rounded cursor-pointer"
                    />
                    <label htmlFor="sovereign" className="text-[11px] text-gray-400 cursor-pointer">
                      I request Canadian sovereign data handling under PIPEDA and Quebec Law 25 parameters.
                    </label>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Transmitting Intelligence...
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Submit Technical Intake Protocol
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
