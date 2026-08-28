import React, { useState } from 'react';
import { 
  Send, CheckCircle2, ShieldCheck, Clock, Mail, MapPin, 
  HelpCircle, ChevronDown, ChevronUp, Loader2, Sparkles, User, AlertCircle, Building2, Terminal
} from 'lucide-react';
import SEO from '../components/SEO';
import { db } from '../utils/database';
import { useLanguage } from '../context/LanguageContext';

const faqs = [
  {
    question: 'Why should Atlantic Canadian businesses choose Oakivo over national consulting firms?',
    answer: 'National vendors route tickets through generic offshore queues with long delay times. Headquartered in Dieppe, NB, Oakivo provides direct, bilingual (EN/FR) senior DevSecOps architects who understand regional regulatory requirements and operate in Atlantic Standard Time.'
  },
  {
    question: 'Will adding automated DevSecOps pipelines slow down our engineering release cycles?',
    answer: 'No. Shifting security left into automated CI/CD pipelines (GitHub Actions, GitLab CI, ArgoCD) catches vulnerabilities in milliseconds during pull requests, eliminating weeks of manual security review delays.'
  },
  {
    question: 'What is delivered in the 30-Minute Security Architecture Audit?',
    answer: 'Our senior DevSecOps engineers analyze your current cloud configuration, CI/CD pipeline guardrails, and compliance posture (SOC 2, PIPEDA). You receive a prioritized, actionable remediation blueprint with zero pushy sales talk.'
  }
];

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    bottleneck: '',
    location: 'New Brunswick'
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Bot detected via honeypot: silently simulate success
      setStatus('success');
      return;
    }
    setStatus('submitting');
    try {
      db.saveEntry('lead', { ...formState, source: 'Contact & 30-Min Security Audit Page' });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO 
        title="Book 30-Minute Security Architecture Audit | Oakivo Solutions — Dieppe, NB"
        description="Schedule a 30-minute DevSecOps and Cloud Security Architecture Audit with Oakivo Solutions. Direct senior engineering guidance for Atlantic Canadian businesses."
        canonical="/contact"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-white/[0.08] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <Terminal size={13} className="text-emerald-400" />
              <span className="text-[11px] font-mono-tech font-medium text-gray-300">
                Dieppe, New Brunswick • Atlantic Canada Authority
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-linear-heading leading-[1.06]">
              Book Your 30-Minute <span className="text-linear-accent font-semibold">Security Architecture Audit</span>
            </h1>

            <p className="text-lg md:text-xl text-[#8A8F98] font-normal leading-relaxed max-w-3xl tracking-linear-normal">
              No sales reps or high-pressure pitches. Meet directly with a senior DevSecOps engineer to evaluate your cloud infrastructure, CI/CD pipelines, and compliance exposure—100% confidential and free of charge.
            </p>
          </div>
        </div>
      </section>

      {/* Main Intake Form & Contact Details Grid */}
      <section className="py-16 md:py-24 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="linear-card rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/[0.08] shadow-2xl">
                {status === 'success' ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{t('drawer.success_title')}</h2>
                    <p className="text-sm text-gray-300 max-w-md mx-auto">
                      {t('drawer.success_desc')}
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-4 px-6 py-2.5 rounded-full linear-pill text-xs font-medium text-white hover:border-white/20"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden Honeypot Input for Bot Anti-Spam */}
                    <input
                      type="text"
                      name="b_company_suite"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden absolute opacity-0 pointer-events-none -z-10"
                      aria-hidden="true"
                    />

                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">{t('drawer.title')}</h2>
                      <p className="text-xs text-gray-300 mt-1">Direct evaluation from senior DevSecOps architects based in Dieppe, NB. 100% confidential.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                          {t('drawer.name_label')} <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder={t('drawer.name_placeholder')}
                          className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all"
                        />
                      </div>

                      {/* Work Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                          {t('drawer.email_label')} <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder={t('drawer.email_placeholder')}
                          className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Company */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                          {t('drawer.company_label')}
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formState.company}
                          onChange={handleChange}
                          placeholder={t('drawer.company_placeholder')}
                          className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all"
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                          Your Location / Province
                        </label>
                        <select
                          name="location"
                          value={formState.location}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-all"
                        >
                          <option value="New Brunswick">New Brunswick (Moncton, Dieppe, Fredericton, Saint John)</option>
                          <option value="Nova Scotia">Nova Scotia (Halifax, Dartmouth, Sydney)</option>
                          <option value="Prince Edward Island">Prince Edward Island (Charlottetown)</option>
                          <option value="Newfoundland and Labrador">Newfoundland and Labrador (St. John's)</option>
                          <option value="Other / Outside Atlantic Canada">Other / Outside Atlantic Canada</option>
                        </select>
                      </div>
                    </div>

                    {/* Security & Infrastructure Bottleneck */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                        {t('drawer.bottleneck_label')} <span className="text-emerald-400">*</span>
                      </label>
                      <textarea
                        name="bottleneck"
                        required
                        rows={4}
                        value={formState.bottleneck}
                        onChange={handleChange}
                        placeholder={t('drawer.bottleneck_placeholder')}
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-4 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 cursor-pointer"
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

                    <p className="text-center text-xs text-gray-500 font-mono-tech">
                      {t('common.guarantee')}
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="linear-card rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/[0.08] space-y-6">
                <h3 className="text-xl font-bold text-white tracking-tight">Direct Regional Presence</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-mono-tech text-gray-400 uppercase tracking-wider block">Headquarters</span>
                      <span className="text-sm font-semibold text-white block mt-0.5">Dieppe, New Brunswick</span>
                      <span className="text-xs text-gray-400 block mt-0.5">Serving NB, NS, PEI, and NL enterprises</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-mono-tech text-gray-400 uppercase tracking-wider block">Direct Email</span>
                      <a href="mailto:hello@oakivo.com" className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors block mt-0.5">
                        hello@oakivo.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-mono-tech text-gray-400 uppercase tracking-wider block">Direct SLA</span>
                      <span className="text-sm font-semibold text-white block mt-0.5">&lt; 15 Minute Critical Incident SLA</span>
                      <span className="text-xs text-gray-400 block mt-0.5">Atlantic Standard Time</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-tech font-bold uppercase tracking-wider">
                  <HelpCircle size={16} /> Frequently Asked Questions
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left flex items-center justify-between gap-2 py-1 text-sm font-semibold text-white hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {openFaq === idx ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
                      </button>
                      {openFaq === idx && (
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
