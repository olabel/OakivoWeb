import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Loader2, 
  Mail, MapPin, Clock, Check
} from 'lucide-react';
import SEO from '../components/SEO';
import DynamicHero from '../components/DynamicHero';
import CoreDisciplines from '../components/CoreDisciplines';
import HumanInTheLoopPrinciple from '../components/HumanInTheLoopPrinciple';
import SmallBizCaseStudies from '../components/SmallBizCaseStudies';
import SmallBizFaq from '../components/SmallBizFaq';
import SmallBizAiAuditModal from '../components/SmallBizAiAuditModal';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

export const Home: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  // Live Atlantic Time Clock (Dieppe, NB)
  const [astTime, setAstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat(isFr ? 'fr-CA' : 'en-CA', {
          timeZone: 'America/Moncton',
          hour: '2-digit',
          minute: '2-digit',
          hour12: !isFr
        });
        setAstTime(formatter.format(new Date()));
      } catch {
        setAstTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [isFr]);

  // Contact / Discovery Session Form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    focusStream: 'Sales Acceleration (< 90s Lead Response)',
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateContactForm = () => {
    const errors: Record<string, string> = {};
    if (!contactForm.name.trim()) {
      errors.name = isFr ? 'Votre nom est requis' : 'Your name is required';
    }
    if (!contactForm.email.trim()) {
      errors.email = isFr ? 'Courriel professionnel requis' : 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      errors.email = isFr ? 'Format de courriel invalide' : 'Please enter a valid work email';
    }
    if (!contactForm.company.trim()) {
      errors.company = isFr ? 'Nom de l’entreprise requis' : 'Company name is required';
    }
    if (!contactForm.message.trim()) {
      errors.message = isFr ? 'Veuillez préciser votre besoin principal' : 'Please describe your biggest operational bottleneck';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setFormStatus('success');
      return;
    }
    if (!validateContactForm()) return;

    setFormStatus('submitting');
    try {
      await db.saveEntry('lead', {
        name: contactForm.name.trim(),
        email: contactForm.email.trim().toLowerCase(),
        phone: contactForm.phone.trim(),
        company: contactForm.company.trim(),
        focusArea: contactForm.focusStream,
        bottleneck: contactForm.message.trim(),
        source: 'Homepage Minimalist Contact Form'
      });

      setFormStatus('success');
    } catch (err) {
      console.error('Failed to submit discovery request:', err);
      setFormStatus('error');
    }
  };

  const scrollToContact = (focusStream?: string) => {
    if (focusStream) {
      setContactForm(prev => ({ ...prev, focusStream }));
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToBlueprints = () => {
    const el = document.getElementById('blueprints');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openAuditModal = () => {
    window.dispatchEvent(new CustomEvent('open-ai-audit-modal'));
  };

  return (
    <div className="min-h-screen bg-[#050811] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Dynamic SEO Meta */}
      <SEO 
        title={isFr 
          ? "Oakivo | Automatisation Pratique, Ventes & Logiciels pour PME Canadiennes" 
          : "Oakivo | Applied Automation, Sales Growth & Custom Software for Canadian SMBs"
        }
        description={isFr
          ? "Développez vos ventes, réduisez vos charges administratives, lancez de nouveaux logiciels et sécurisez vos données canadiennes avec nos micro-systèmes d’IA silencieux. Garantie pilote de 30 jours sans risque."
          : "Increase sales, cut administrative overhead, launch custom software, and protect Canadian sovereign data with quiet automation. 14-day rapid sprints with our 30-day risk-free pilot guarantee."
        }
        keywords="increase sales small business, save cost automation, reduce small business operating costs, launch new product MVP Canada, small business cyber security Canada, AI automation small business, PIPEDA Law 25 compliance, custom web application, Atlantic Canada software developer"
      />

      {/* Global Interactive AI Audit Modal */}
      <SmallBizAiAuditModal />

      {/* 1. Calm, Minimalist Hero Section */}
      <DynamicHero 
        onOpenAudit={openAuditModal}
        onScrollToContact={() => scrollToContact()}
        onScrollToBlueprints={scrollToBlueprints}
      />

      {/* 2. The Four Core Disciplines (Spacious, Minimalist Editorial Grid) */}
      <CoreDisciplines 
        onSelectTopic={(topic) => scrollToContact(topic)} 
      />

      {/* 3. The Core Safeguard Philosophy: "AI Prepares, Humans Approve" */}
      <HumanInTheLoopPrinciple />

      {/* 4. Tested Operational Blueprints (Radical Transparency & Realism) */}
      <SmallBizCaseStudies />

      {/* 5. Direct Founder Partnership & Clean Inquiry Form */}
      <section id="contact" className="py-24 bg-[#050811] border-b border-white/[0.06] relative">
        <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Direct Founder Partnership Note */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-3">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  {isFr ? 'Accès Direct aux Fondateurs' : 'Direct Founder Partnership'}
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">
                  {isFr 
                    ? 'Parlons de ce qui freine vos opérations.'
                    : 'Let’s discuss what’s slowing your business down.'
                  }
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  {isFr
                    ? "Aucun commercial insistant. Vous échangez directement avec les fondateurs et ingénieurs seniors à Dieppe (N.-B.). Nous analysons vos goulots d’étranglement, évaluons les gains réalistes et proposons un plan concret en 14 jours si le projet est pertinent."
                    : "No pushy sales reps. You will speak directly with our senior engineering founders in Dieppe, New Brunswick. We will review your bottlenecks, discuss realistic outcomes, and propose a fixed 14-day sprint if there is a genuine fit."
                  }
                </p>
              </div>

              {/* Direct Founder Commitments (Clean Unboxed List) */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  {isFr ? 'Nos Engagements Transparents :' : 'Our Straightforward Commitments:'}
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>{isFr ? 'Échange direct avec des ingénieurs seniors' : 'Direct senior engineering, zero junior account reps'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>{isFr ? 'Sprints à périmètre et tarif fixes (14 jours)' : 'Fixed-scope, fixed-investment 14-day sprints'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>{isFr ? 'Garantie pilote de 30 jours sans risque' : '30-day risk-free pilot milestone guarantee'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>{isFr ? 'Hébergement souverain 100% canadien (ca-central-1)' : '100% Canadian data residency (ca-central-1)'}</span>
                  </div>
                </div>
              </div>

              {/* Direct Founder Coordinates */}
              <div className="space-y-2 text-xs font-mono text-slate-400 pt-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin size={13} className="text-cyan-400 shrink-0" />
                  <span>Dieppe, New Brunswick, Canada</span>
                  {astTime && (
                    <>
                      <span className="text-slate-600">·</span>
                      <span className="text-cyan-400">{astTime} AST</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail size={13} className="text-cyan-400 shrink-0" />
                  <a href="mailto:hello@oakivo.com" className="hover:text-cyan-300 transition-colors">
                    hello@oakivo.com
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Minimalist Intake Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                
                {formStatus === 'success' ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={24} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-display font-semibold text-white tracking-tight">
                        {isFr ? 'Message Bien Reçu' : 'Inquiry Received'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto leading-relaxed">
                        {isFr
                          ? 'Un de nos fondateurs examinera vos notes et vous répondra d’ici 2 heures ouvrables pour convenir d’un échange.'
                          : 'Our senior founders will review your notes and reply within 2 business hours to schedule a direct working conversation.'
                        }
                      </p>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setFormStatus('idle');
                          setContactForm({
                            name: '',
                            email: '',
                            phone: '',
                            company: '',
                            focusStream: 'Sales Acceleration (< 90s Lead Response)',
                            message: ''
                          });
                        }}
                        className="px-5 py-2.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                      >
                        {isFr ? 'Envoyer une autre note' : 'Send another message'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    
                    {/* Honeypot field */}
                    <input 
                      type="text" 
                      name="middle_name_check" 
                      value={honeypot} 
                      onChange={(e) => setHoneypot(e.target.value)} 
                      className="hidden" 
                      tabIndex={-1} 
                      autoComplete="off" 
                    />

                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                        {isFr ? 'Votre Priorité Principale :' : 'Primary Focus Area:'}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { id: 'Sales Acceleration (< 90s Lead Response)', label: isFr ? 'Accélération des Ventes (< 90s)' : 'Sales Acceleration (< 90s)' },
                          { id: 'Operational Cost Reduction', label: isFr ? 'Réduction des Coûts / Zéro Saisie' : 'Operational Cost Reduction' },
                          { id: 'Custom Software / MVP Studio', label: isFr ? 'Logiciel Sur Mesure / Studio MVP' : 'Custom Software / MVP Studio' },
                          { id: 'Canadian Sovereign Cyber Security', label: isFr ? 'Cybersécurité & LPRPDE / Loi 25' : 'Cyber Security & PIPEDA' }
                        ].map((stream) => (
                          <button
                            key={stream.id}
                            type="button"
                            onClick={() => setContactForm(prev => ({ ...prev, focusStream: stream.id }))}
                            className={`p-3 rounded-xl border text-xs font-mono text-left transition-colors cursor-pointer ${
                              contactForm.focusStream === stream.id
                                ? 'bg-cyan-500/15 border-cyan-400 text-white font-medium'
                                : 'bg-black/30 border-white/[0.08] text-slate-400 hover:text-slate-200 hover:border-white/[0.15]'
                            }`}
                          >
                            {stream.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          {isFr ? 'Votre Nom *' : 'Your Name *'}
                        </label>
                        <input
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. Marc Tremblay"
                          className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors ${
                            formErrors.name ? 'border-rose-500' : 'border-white/[0.1]'
                          }`}
                        />
                        {formErrors.name && (
                          <span className="text-[11px] text-rose-400 font-mono mt-1 block">{formErrors.name}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          {isFr ? 'Courriel Professionnel *' : 'Work Email *'}
                        </label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="marc@company.ca"
                          className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors ${
                            formErrors.email ? 'border-rose-500' : 'border-white/[0.1]'
                          }`}
                        />
                        {formErrors.email && (
                          <span className="text-[11px] text-rose-400 font-mono mt-1 block">{formErrors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          {isFr ? 'Nom de Votre Entreprise *' : 'Company Name *'}
                        </label>
                        <input
                          type="text"
                          value={contactForm.company}
                          onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="e.g. Atlantic Mechanical Inc."
                          className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors ${
                            formErrors.company ? 'border-rose-500' : 'border-white/[0.1]'
                          }`}
                        />
                        {formErrors.company && (
                          <span className="text-[11px] text-rose-400 font-mono mt-1 block">{formErrors.company}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          {isFr ? 'Téléphone (optionnel)' : 'Phone (optional)'}
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="(506) 555-0192"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        {isFr ? 'Quel est votre plus grand goulot d’étranglement ? *' : 'What is your biggest operational headache right now? *'}
                      </label>
                      <textarea
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder={isFr 
                          ? "e.g. Nous perdons des devis parce que nous répondons trop tard, et notre équipe passe trop de temps à ressaisir des factures dans QuickBooks..." 
                          : "e.g. We lose bids because we take 3 days to return quotes, and our office wastes hours every week re-typing paper invoices into QuickBooks..."}
                        className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors ${
                          formErrors.message ? 'border-rose-500' : 'border-white/[0.1]'
                        }`}
                      />
                      {formErrors.message && (
                        <span className="text-[11px] text-rose-400 font-mono mt-1 block">{formErrors.message}</span>
                      )}
                    </div>

                    {formStatus === 'error' && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-2">
                        <AlertCircle size={14} />
                        <span>{isFr ? 'Erreur lors de l’envoi. Veuillez réessayer ou écrire à hello@oakivo.com.' : 'Submission error. Please try again or email hello@oakivo.com directly.'}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-slate-200 disabled:opacity-50 text-slate-950 font-medium font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <Loader2 size={15} className="animate-spin text-slate-950" />
                            <span>{isFr ? 'Transmission en cours...' : 'Sending to Founders...'}</span>
                          </>
                        ) : (
                          <>
                            <span>{isFr ? 'Envoyer Ma Demande aux Fondateurs' : 'Send Inquiry to Senior Founders'}</span>
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center text-[10px] font-mono text-slate-500 pt-1">
                      {isFr ? 'Réponse directe en moins de 2 heures ouvrables · 100 % Confidentiel' : 'Direct response in under 2 business hours · 100% Confidential'}
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Direct & Honest FAQ Accordion */}
      <SmallBizFaq />

    </div>
  );
};

export default Home;
