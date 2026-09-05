import React, { useState } from 'react';
import { 
  Send, CheckCircle2, Mail, MapPin, 
  HelpCircle, ChevronDown, ChevronUp, Loader2, Sparkles, User, Building2, Terminal, Phone, MessageSquare
} from 'lucide-react';
import SEO from '../components/SEO';
import { db } from '../utils/database';
import { useLanguage } from '../context/LanguageContext';
import { SuccessModal } from '../components/SuccessModal';

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
    question: 'Do you offer custom engagements beyond the architectural audit?',
    answer: 'Yes. While the audit is a great starting point, we frequently engage in long-term DevSecOps transformations, infrastructure-as-code migrations, and continuous compliance automation for SOC 2.'
  }
];

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'General Inquiry',
    message: ''
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
      await db.saveEntry('lead', { 
        ...formState, 
        source: 'Contact Us Page' 
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleModalClose = () => {
    setStatus('idle');
    setFormState({ name: '', email: '', company: '', inquiryType: 'General Inquiry', message: '' });
  };

  return (
    <>
      <SuccessModal 
        isOpen={status === 'success'}
        onClose={handleModalClose}
        title="Message Sent Successfully"
        message="Thank you for reaching out to Oakivo Solutions. A member of our team will get back to you shortly."
      />

      <SEO 
        title="Contact Oakivo Solutions | Enterprise Cloud Security & DevSecOps"
        description="Start a conversation with Oakivo Solutions. We architect secure, compliant, and automated cloud infrastructure for Atlantic Canadian enterprises."
        canonical="/contact"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-white/[0.08] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <Terminal size={13} className="text-cyan-400" />
              <span className="text-[11px] font-mono font-medium text-gray-300">
                Dieppe, New Brunswick • Atlantic Canada Authority
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-slate-100 leading-[1.06]">
              Start a <span className="text-linear-accent font-semibold">Conversation</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#8A8F98] font-normal leading-relaxed max-w-3xl tracking-linear-normal">
              Whether you're looking to automate your pipelines, achieve SOC 2 compliance, or just want to talk cloud architecture—our senior engineers are ready to help.
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
              <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl">
                {(status === 'idle' || status === 'submitting' || status === 'success' || status === 'error') && (
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
                      <h2 className="text-xl font-bold text-white tracking-tight">How can we help?</h2>
                      <p className="text-xs text-gray-300 mt-1">Direct evaluation from senior DevSecOps architects based in Dieppe, NB. 100% confidential.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-medium text-gray-300 block">
                          Your Name <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="e.g. David Cormier"
                          className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all"
                        />
                      </div>

                      {/* Work Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-medium text-gray-300 block">
                          Work Email <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="e.g. david@enterprise.ca"
                          className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Company */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-medium text-gray-300 block">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formState.company}
                          onChange={handleChange}
                          placeholder="e.g. Maritime Logistics Inc."
                          className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all"
                        />
                      </div>

                      {/* Inquiry Type */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-medium text-gray-300 block">
                          Inquiry Type
                        </label>
                        <select
                          name="inquiryType"
                          value={formState.inquiryType}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-all"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Cloud Security & Architecture">Cloud Security & Architecture</option>
                          <option value="CI/CD Pipeline Automation">CI/CD Pipeline Automation</option>
                          <option value="Compliance (SOC 2 / PIPEDA)">Compliance (SOC 2 / PIPEDA)</option>
                          <option value="ERP / Operations Alignment">ERP / Operations Alignment</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-gray-300 block">
                        Message <span className="text-cyan-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Tell us a bit about your current infrastructure and what you're looking to achieve..."
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-xs text-red-400 font-medium bg-red-400/10 border border-red-400/20 p-3 rounded-lg">
                        An error occurred while sending your message. Please try again or email us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-4 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={16} className="animate-spin text-black" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-center text-xs text-gray-500 font-mono">
                      Your information is protected by enterprise-grade encryption.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white tracking-tight">Direct Regional Presence</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Headquarters</span>
                      <span className="text-sm font-semibold text-white block mt-0.5">Dieppe, New Brunswick</span>
                      <span className="text-xs text-gray-400 block mt-0.5">Serving NB, NS, PEI, and NL enterprises</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Phone</span>
                      <a href="tel:506899491" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors block mt-0.5">
                        506-899-0491
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Direct Email</span>
                      <a href="mailto:hello@oakivo.com" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors block mt-0.5">
                        hello@oakivo.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
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
