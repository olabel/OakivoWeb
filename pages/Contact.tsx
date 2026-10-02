import React, { useState, useEffect } from 'react';
import { 
  Send, CheckCircle2, Mail, MapPin, 
  HelpCircle, ChevronDown, ChevronUp, Loader2, Sparkles, User, Building2, Phone,
  Zap, Globe, ShieldCheck, Clock, Calendar, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { db } from '../utils/database';
import { useLanguage } from '../context/LanguageContext';
import { SuccessModal } from '../components/SuccessModal';

const faqs = [
  {
    question: 'Why choose Oakivo over big consulting firms or commodity IT shops?',
    answer: 'Big national firms sell with senior partners, hand you off to junior staff, and charge six-figure retainers for slide decks. Local IT shops only fix hardware and reset passwords. Oakivo gives you direct, hands-on access to senior founders who build modern ERP systems, automate your invoicing, craft high-converting websites, and lock down cloud security—with measurable results in weeks.'
  },
  {
    question: 'Will modernizing our software or automating workflows disrupt our daily sales?',
    answer: 'No. We configure, customize, and test all ERP modules, automated workflow bridges, and web designs in isolated sandbox environments. Historical data is safely migrated, and go-live is executed with zero downtime to your daily operations.'
  },
  {
    question: 'How does the free 30-minute discovery call work?',
    answer: 'It is a friendly, confidential conversation directly with our senior founders in Atlantic Standard Time. We review your current bottlenecks, software stack, or web goals. If we are a great fit, we outline a plain-English roadmap with clear costs and timelines. Zero sales pressure.'
  },
  {
    question: 'Where is our business and customer data stored?',
    answer: 'Strictly on Canadian soil. All primary databases, automated backups, and file storage reside in certified Canadian sovereign cloud regions (AWS ca-central-1 or Azure Canada Central), fully compliant with PIPEDA, Law 25, and SOC 2.'
  }
];

const PILLARS = [
  {
    id: 'Modern ERP & Operations',
    title: 'Modern ERP & Operations',
    subtitle: 'Consolidate spreadsheets, Odoo/ERPNext, inventory & accounting',
    icon: Building2
  },
  {
    id: 'Workflow & Billing Automation',
    title: 'Workflow Automation',
    subtitle: 'Quote-to-cash, automated invoicing upon fulfillment, payment syncing',
    icon: Zap
  },
  {
    id: 'Creative Web Design & Exposure',
    title: 'Creative Web Design',
    subtitle: 'High-converting custom web apps, client self-service portals, SEO',
    icon: Globe
  },
  {
    id: 'Sovereign Cloud & Security',
    title: 'Cloud Security & Compliance',
    subtitle: 'Canadian data residency, SOC 2, Law 25, PIPEDA, Zero-Trust defense',
    icon: ShieldCheck
  }
];

const TIMELINES = [
  'Immediate (< 2 weeks)',
  'Within 30 Days',
  '1–3 Months',
  'Exploratory / Planning'
];

const TEAM_SIZES = [
  '1–10 employees',
  '11–50 employees',
  '51–200 employees',
  '200+ employees'
];

const PROMPT_SUGGESTIONS = [
  "We want to automate our invoices & order fulfillment without manual data entry.",
  "Looking to replace legacy accounting/ERP spreadsheets with a unified system.",
  "Need an ultra-fast, high-converting website redesign and custom client portal.",
  "Looking for an audit of our Canadian cloud security and Law 25 / PIPEDA compliance."
];

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: 'Modern ERP & Operations',
    timeline: 'Within 30 Days',
    teamSize: '11–50 employees',
    message: ''
  });
  
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [astTime, setAstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-CA', {
          timeZone: 'America/Moncton',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now);
        setAstTime(formatted);
      } catch {
        setAstTime('Atlantic Time (AST)');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Bot detected via honeypot: silently simulate success
      setStatus('success');
      return;
    }

    setStatus('submitting');
    
    try {
      // 1. Save to persistent Firestore
      const entry = await db.saveEntry('lead', { 
        ...formState, 
        source: 'Contact Us Interactive Page',
        submittedAt: new Date().toISOString()
      });

      // 2. Dispatch executive notification to olabel@gmail.com and hello@oakivo.com
      try {
        await fetch('/api/notify-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'lead',
            entryId: entry?.id || 'LEAD-' + Date.now(),
            data: {
              Name: formState.name,
              Email: formState.email,
              Phone: formState.phone || 'Not provided',
              Company: formState.company || 'Not provided',
              Pillar: formState.inquiryType,
              Timeline: formState.timeline,
              TeamSize: formState.teamSize,
              Message: formState.message,
              Source: 'Contact Us Interactive Page'
            }
          })
        });
      } catch (notifyErr) {
        console.warn('Backend notification dispatch warning:', notifyErr);
      }

      setStatus('success');
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectPillar = (pillarId: string) => {
    setFormState(prev => ({ ...prev, inquiryType: pillarId }));
  };

  const handleApplyPrompt = (promptText: string) => {
    setFormState(prev => ({
      ...prev,
      message: prev.message ? `${prev.message}\n\n${promptText}` : promptText
    }));
  };

  const handleModalClose = () => {
    setStatus('idle');
    setFormState({
      name: '',
      email: '',
      phone: '',
      company: '',
      inquiryType: 'Modern ERP & Operations',
      timeline: 'Within 30 Days',
      teamSize: '11–50 employees',
      message: ''
    });
  };

  return (
    <>
      <SuccessModal 
        isOpen={status === 'success'}
        onClose={handleModalClose}
        title={isFr ? "Demande reçue | Oakivo Solutions" : "Inquiry Received | Oakivo Solutions"}
        message={isFr 
          ? "Merci de nous avoir contactés. Un de nos associés fondateurs étudiera personnellement votre demande et vous répondra dans un délai de 4 heures ouvrables."
          : "Thank you for reaching out. One of our senior founders will personally review your operational inquiry and reply within 4 business hours."}
      />

      <SEO 
        title="Contact Oakivo | Modern Software, ERP & Web Design in Atlantic Canada"
        description="Connect with Oakivo. Direct senior founder advice on modern ERP implementations, workflow automation, custom web design, and Canadian cloud security."
        keywords="Contact Oakivo, Modern ERP Atlantic Canada, Business Automation Dieppe, Creative Web Design Moncton, Cloud Security Canada"
        canonical="/contact"
      />

      {/* Header Section */}
      <section className="relative pt-12 pb-12 md:pt-20 md:pb-16 border-b border-white/[0.06] overflow-hidden bg-[#070A10]">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <span>{isFr ? 'Siège Social : Dieppe, Nouveau-Brunswick' : 'Headquarters: Dieppe, New Brunswick'}</span>
              <span className="text-slate-600">·</span>
              <span>100% Bilingual (EN/FR)</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-tight">
              {isFr ? 'Démarrons une ' : 'Start a '}
              <span className="text-cyan-400">{isFr ? 'Conversation' : 'Conversation'}</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl">
              {isFr
                ? 'Que vous souhaitiez unifier vos logiciels internes, automatiser vos devis et factures, concevoir un site web performant ou auditer votre sécurité cloud, nos associés sont à votre écoute.'
                : 'Whether you need to unify your operational software, automate tedious billing busywork, build a high-converting digital portal, or lock down cloud security—we’re ready to help.'}
            </p>

            {/* Live Operational Status Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                <span>Dieppe AST: <strong className="text-white">{astTime || 'Loading...'}</strong></span>
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-cyan-400">
                {isFr ? 'Réponse garantie sous 4 heures ouvrables' : 'Guaranteed response within 4 business hours'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Intake Form & Contact Details Grid */}
      <section className="py-12 md:py-20 relative bg-[#070A10]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Interactive Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
                
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

                  {/* Step 1: Interactive Pillar Selection */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono font-medium text-slate-300 block uppercase tracking-wider">
                      1. Select Your Primary Area of Focus <span className="text-cyan-400">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PILLARS.map((p) => {
                        const Icon = p.icon;
                        const isSelected = formState.inquiryType === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => handleSelectPillar(p.id)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                              isSelected
                                ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-sm shadow-cyan-500/10'
                                : 'bg-slate-950/60 border-white/[0.06] text-slate-400 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            <Icon size={18} className={`shrink-0 mt-0.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                            <div className="space-y-0.5">
                              <span className="text-xs font-bold text-white block">{p.title}</span>
                              <span className="text-[11px] text-slate-400 leading-tight block">{p.subtitle}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Contact Details */}
                  <div className="space-y-4 pt-2">
                    <label className="text-xs font-mono font-medium text-slate-300 block uppercase tracking-wider">
                      2. Your Contact Information <span className="text-cyan-400">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-slate-400">Full Name</span>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="e.g. Marc Leblanc"
                          className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-cyan-400/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-slate-400">Work Email</span>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="e.g. marc@organization.ca"
                          className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-cyan-400/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-slate-400">Phone (Optional)</span>
                        <input
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder="e.g. 506-800-2440"
                          className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-cyan-400/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-slate-400">Company / Organization</span>
                        <input
                          type="text"
                          name="company"
                          value={formState.company}
                          onChange={handleChange}
                          placeholder="e.g. Atlantic Seafood & Logistics"
                          className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-cyan-400/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Interactive Parameters (Timeline & Team Size) */}
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-mono font-medium text-slate-300 block uppercase tracking-wider">
                      3. Project Timeline & Team Size
                    </label>

                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-slate-400 block">Target Timeline</span>
                      <div className="flex flex-wrap gap-2">
                        {TIMELINES.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setFormState(prev => ({ ...prev, timeline: t }))}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                              formState.timeline === t
                                ? 'bg-cyan-500 text-slate-950 font-bold'
                                : 'bg-slate-950 border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-mono text-slate-400 block">Organization Scale</span>
                      <div className="flex flex-wrap gap-2">
                        {TEAM_SIZES.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setFormState(prev => ({ ...prev, teamSize: s }))}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                              formState.teamSize === s
                                ? 'bg-cyan-500 text-slate-950 font-bold'
                                : 'bg-slate-950 border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Operational Challenge & Quick Prompts */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-medium text-slate-300 block uppercase tracking-wider">
                        4. What Challenge Can We Help Solve? <span className="text-cyan-400">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-slate-500">
                        {formState.message.length} / 1000
                      </span>
                    </div>

                    {/* Quick Suggestions */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-slate-500 block">Need a quick starting point? Click one:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {PROMPT_SUGGESTIONS.map((prompt, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleApplyPrompt(prompt)}
                            className="text-left text-[11px] font-mono px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-cyan-400 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
                          >
                            + {prompt.slice(0, 45)}...
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      name="message"
                      required
                      rows={4}
                      maxLength={1000}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us about your current software bottlenecks, spreadsheet silos, web redesign goals, or compliance targets..."
                      className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-cyan-400/80 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-rose-400 font-medium bg-rose-400/10 border border-rose-400/20 p-3 rounded-lg">
                      An error occurred while dispatching your request. Please email us directly at <a href="mailto:hello@oakivo.com" className="underline font-bold">hello@oakivo.com</a> or call 506-899-4941.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10 active:scale-[0.99]"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={15} className="animate-spin text-slate-950" />
                        <span>Sending Request to Founders...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Submit Inquiry to Senior Partners</span>
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-[11px] text-slate-500 font-mono">
                    Protected by TLS 1.3 encryption. Data stored strictly in Canadian cloud regions. Zero spam guarantee.
                  </p>
                </form>

              </div>
            </div>

            {/* Sidebar Column: Presence, Direct Booking & FAQs */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Direct Booking Alternative Box */}
              <div className="bg-gradient-to-br from-cyan-950/20 to-slate-900/40 border border-cyan-500/20 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  <Calendar size={15} />
                  <span>Prefer an Instant Video Call?</span>
                </div>

                <h3 className="text-lg font-display font-bold text-white leading-snug">
                  Schedule a 30-Minute Architecture Discovery
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Skip the email back-and-forth. Pick an open slot directly on our founders' calendar for a confidential Google Meet or phone consultation.
                </p>

                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <span>Select Date & Time on Calendar</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Direct Contact Details */}
              <div className="bg-slate-900/40 border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Direct Regional Coordinates
                </h3>
                
                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Dieppe, New Brunswick</span>
                      <span className="text-slate-400 block">Serving NB, NS, PEI, and NL enterprises</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Direct Line</span>
                      <a href="tel:5068994941" className="text-slate-300 hover:text-cyan-400 transition-colors">
                        506-899-4941
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Executive Email</span>
                      <a href="mailto:hello@oakivo.com" className="text-slate-300 hover:text-cyan-400 transition-colors">
                        hello@oakivo.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs Accordion */}
              <div className="bg-slate-900/40 border border-white/[0.08] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <HelpCircle size={15} className="text-cyan-400" />
                  <span>Frequently Asked Questions</span>
                </div>

                <div className="space-y-2.5">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-white/[0.06] pb-2.5 last:border-b-0 last:pb-0">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left flex items-center justify-between gap-2 py-1 text-xs font-medium text-white hover:text-cyan-300 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {openFaq === idx ? <ChevronUp size={14} className="shrink-0 text-cyan-400" /> : <ChevronDown size={14} className="shrink-0 text-slate-500" />}
                      </button>
                      {openFaq === idx && (
                        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
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
