import React, { useState } from 'react';
import { 
  Send, CheckCircle2, ShieldCheck, Clock, Mail, MapPin, 
  HelpCircle, ChevronDown, ChevronUp, Loader2, Sparkles, User, AlertCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import { db } from '../utils/database';

const faqs = [
  {
    question: 'Do we need to buy new software subscriptions?',
    answer: 'No. In 95% of cases, we connect the software tools you already pay for and use daily (e.g. QuickBooks, Excel, Shopify, custom CRMs, Google Workspace, email).'
  },
  {
    question: 'How long does a typical workflow automation setup take?',
    answer: 'Most initial custom workflow bridges are built, tested, and handed over within 5 to 10 business days without interrupting your ongoing operations.'
  },
  {
    question: 'What happens during the free 15-minute operational audit?',
    answer: 'We look at your daily workflow, ask where your staff spends the most time on manual data entry or copy-pasting, and outline a straightforward automation plan—100% free with zero pushy sales talk.'
  }
];

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    bottleneck: '',
    location: 'New Brunswick'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      db.saveEntry('lead', { ...formState, source: 'Contact & Free Operational Audit Page' });
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
        title="Book Your Free 15-Minute Invoice Audit | Oakivo Solutions"
        description="Book a free 15-minute invoice audit with Oakivo Solutions. We will analyze your billing workflow and show you how to eliminate manual data entry across Atlantic Canada."
        canonical="/contact"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-white/[0.08] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <Sparkles size={13} className="text-emerald-400" />
              <span className="text-[11px] font-mono-tech font-medium text-gray-300">
                Atlantic Canada Invoice & Bookkeeping Automation
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-linear-heading leading-[1.06]">
              Book Your Free 15-Minute <span className="text-linear-accent font-semibold">Invoice Audit</span>
            </h1>

            <p className="text-lg md:text-xl text-[#8A8F98] font-normal leading-relaxed max-w-3xl tracking-linear-normal">
              No high-pressure sales pitch. One of our senior automation specialists will review your current invoicing and bookkeeping setup and show you where time is being lost to manual copy-pasting—100% free of charge.
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
                    <h2 className="text-2xl font-bold text-white">Audit Request Received!</h2>
                    <p className="text-sm text-gray-300 max-w-md mx-auto">
                      Thank you! An automation specialist will review your submitted workflow details and reach out within 24 hours to schedule your free 15-minute audit.
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
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Request Your Free 15-Minute Invoice Audit</h2>
                      <p className="text-xs text-gray-400 mt-1">Direct feedback from local Atlantic Canada automation leads. 100% confidential.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                          Full Name <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all"
                        />
                      </div>

                      {/* Work Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                          Work Email <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="sarah@company.ca"
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all"
                        />
                      </div>
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
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-all"
                      >
                        <option value="New Brunswick">New Brunswick</option>
                        <option value="Nova Scotia">Nova Scotia</option>
                        <option value="Prince Edward Island">Prince Edward Island</option>
                        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                        <option value="Other / Outside Atlantic Canada">Other / Outside Atlantic Canada</option>
                      </select>
                    </div>

                    {/* Manual Task Bottleneck */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                        Describe your current manual invoicing or bookkeeping pain point <span className="text-emerald-400">*</span>
                      </label>
                      <textarea
                        name="bottleneck"
                        required
                        rows={4}
                        value={formState.bottleneck}
                        onChange={handleChange}
                        placeholder="e.g. Copy-pasting invoice numbers from Excel into QuickBooks, re-entering job sheet hours manually into customer bills..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all resize-none"
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
                          <span>Transmitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Book Your Free 15-Minute Invoice Audit</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-500">
                      No credit card required. Zero obligation. 100% confidential.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="linear-card rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/[0.08] space-y-6">
                <h3 className="text-xl font-bold text-white tracking-tight">Direct Regional Support</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-mono-tech text-gray-400 uppercase tracking-wider block">Service Coverage</span>
                      <span className="text-sm font-semibold text-white block mt-0.5">Atlantic Canada Regional Operations</span>
                      <span className="text-xs text-gray-400 block mt-0.5">Serving NB, NS, PEI, and NL businesses</span>
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
                      <span className="text-xs font-mono-tech text-gray-400 uppercase tracking-wider block">Response Guarantee</span>
                      <span className="text-sm font-semibold text-white block mt-0.5">Within 24 Business Hours</span>
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
