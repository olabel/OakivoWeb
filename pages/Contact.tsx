import React, { useState } from 'react';
import { 
  Send, CheckCircle2, ShieldCheck, Clock, Mail, MapPin, 
  HelpCircle, ChevronDown, ChevronUp, Loader2, Sparkles
} from 'lucide-react';
import SEO from '../components/SEO';
import { db } from '../utils/database';

const faqs = [
  {
    question: 'What is the typical duration of an Oakivo engineering engagement?',
    answer: 'Initial technical audits take 5–10 business days. Full platform refactoring or compliance readiness engagements typically range from 60 to 90 days with continuous post-deployment governance.'
  },
  {
    question: 'How are Oakivo engagements structured and priced?',
    answer: 'We offer fixed-scope architectural transformations with guaranteed deliverables, as well as recurring Principal-as-a-Service retainer models. Zero hidden fees or junior associate billing multipliers.'
  },
  {
    question: 'How does Oakivo integrate with our existing internal engineering team?',
    answer: 'We act as force multipliers. Our senior architects work directly alongside your VPs of Engineering and DevOps leads, co-authoring IaC code and conducting hands-on knowledge transfers throughout the lifecycle.'
  }
];

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    bottleneck: '',
    timeline: '< 30 Days',
    budget: '$50k – $100k'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      db.saveEntry('lead', { ...formState, source: 'Contact & Discovery Intake' });
      await new Promise((resolve) => setTimeout(resolve, 1200));
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
        title="Schedule a Technical Intake & Cloud Audit | Oakivo"
        description="Connect directly with Oakivo's senior architects to analyze your cloud platform, security posture, and infrastructure bottlenecks. Response within 24 hours."
        keywords="Technical Intake, Cloud Audit, Schedule Consultation, Oakivo Contact, DevOps Advisory"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-white/[0.08] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <Sparkles size={13} className="text-oakivo-linearIndigo" />
              <span className="text-[11px] font-mono-tech font-medium text-gray-300">
                Direct Senior Architect Consultation
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-linear-heading leading-[1.06]">
              Initiate Technical Intake & <span className="text-linear-accent">Platform Audit</span>
            </h1>

            <p className="text-lg md:text-xl text-[#8A8F98] font-normal leading-relaxed max-w-3xl tracking-linear-normal">
              Schedule a direct consultation with our principal engineering team. We will analyze your current cloud infrastructure, identify security vulnerabilities, and outline a high-ROI transformation blueprint.
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
                    <h2 className="text-2xl font-bold text-white">Intake Profile Transmitted</h2>
                    <p className="text-sm text-gray-300 max-w-md mx-auto">
                      Our senior architecture leads are reviewing your parameters. You will receive direct technical feedback within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-4 px-6 py-2.5 rounded-full linear-pill text-xs font-medium text-white hover:border-white/20"
                    >
                      Submit Another Diagnostic
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Technical Intake Parameters</h2>
                      <p className="text-xs text-gray-400 mt-1">Direct review by senior cloud architects. Zero sales proxies.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                          Full Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-oakivo-linearIndigo transition-all"
                        />
                        <span className="text-[10px] font-mono-tech text-gray-500 block">Your full professional name.</span>
                      </div>

                      {/* Work Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                          Work Email <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="sarah@company.com"
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-oakivo-linearIndigo transition-all"
                        />
                        <span className="text-[10px] font-mono-tech text-gray-500 block">We respect your privacy. Zero spam.</span>
                      </div>
                    </div>

                    {/* Technical Bottleneck */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                        Primary Technical Bottleneck <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        name="bottleneck"
                        required
                        rows={3}
                        value={formState.bottleneck}
                        onChange={handleChange}
                        placeholder="e.g. Scaling issues, AWS cost overruns, SOC 2 audit preparation, legacy monolithic debt..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-oakivo-linearIndigo transition-all resize-none"
                      />
                      <span className="text-[10px] font-mono-tech text-gray-500 block">Provide a brief overview of your current architecture constraints.</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Timeline */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                          Target Implementation Timeline
                        </label>
                        <select
                          name="timeline"
                          value={formState.timeline}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-oakivo-linearIndigo transition-all"
                        >
                          <option value="< 30 Days">&lt; 30 Days</option>
                          <option value="1–3 Months">1–3 Months</option>
                          <option value="3–6 Months">3–6 Months</option>
                          <option value="Exploring / Advisory">Exploring / Advisory</option>
                        </select>
                        <span className="text-[10px] font-mono-tech text-gray-500 block">When do you need execution to begin?</span>
                      </div>

                      {/* Budget */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono-tech font-medium text-gray-300 block">
                          Infrastructure / Consulting Budget
                        </label>
                        <select
                          name="budget"
                          value={formState.budget}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-oakivo-linearIndigo transition-all"
                        >
                          <option value="$25k – $50k">$25k – $50k</option>
                          <option value="$50k – $100k">$50k – $100k</option>
                          <option value="$100k – $250k">$100k – $250k</option>
                          <option value="$250k+ Enterprise">$250k+ Enterprise</option>
                        </select>
                        <span className="text-[10px] font-mono-tech text-gray-500 block">Helps us scope architectural team resources.</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 size={16} className="animate-spin text-black" />
                            <span>Transmitting Intake Profile...</span>
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            <span>Transmit Technical Intake Profile</span>
                          </>
                        )}
                      </button>
                      <p className="text-[10px] font-mono-tech text-gray-500 text-center mt-3">
                        Direct Senior Architect Review • Response Guaranteed within 24 Hours
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Direct Info & Trust Cards Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="linear-card rounded-2xl p-6 md:p-8 border border-white/[0.08] space-y-6">
                <div>
                  <span className="text-xs font-mono-tech text-oakivo-linearIndigo font-medium uppercase tracking-wider block">
                    Direct Contact Channels
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Connect With Architecture Principals
                  </h3>
                </div>

                <div className="space-y-4 text-xs text-gray-300">
                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-oakivo-linearIndigo shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400 block text-[10px] font-mono-tech">Direct Engineering Email</span>
                      <a href="mailto:architects@oakivo.com" className="text-white hover:text-oakivo-linearIndigo font-medium font-mono-tech">
                        architects@oakivo.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-oakivo-linearIndigo shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400 block text-[10px] font-mono-tech">Primary Engineering Hubs</span>
                      <span className="text-white font-medium">Toronto • Montreal • San Francisco</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400 block text-[10px] font-mono-tech">SLA Commitment</span>
                      <span className="text-white font-medium">Guaranteed 24-Hour Architect Response</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="linear-card rounded-2xl p-6 border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck size={18} />
                  <span className="text-xs font-mono-tech font-bold uppercase">Zero-Spam Guarantee</span>
                </div>
                <p className="text-xs text-[#8A8F98] leading-relaxed">
                  Your architecture parameters remain strictly confidential under non-disclosure protocols. We never share or sell contact data.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-mono-tech font-medium uppercase tracking-wider text-oakivo-linearIndigo">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-linear-tight text-linear-heading">
              Engineering Engagement FAQs
            </h2>
            <p className="text-xs md:text-sm text-[#8A8F98]">
              Everything you need to know about working with Oakivo’s principal engineers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="linear-card rounded-xl border border-white/[0.08] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-white hover:text-oakivo-linearIndigo transition-colors"
                >
                  <span className="text-sm md:text-base font-semibold">
                    {faq.question}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp size={18} className="shrink-0 text-oakivo-linearIndigo" />
                  ) : (
                    <ChevronDown size={18} className="shrink-0 text-gray-400" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs md:text-sm text-[#8A8F98] leading-relaxed border-t border-white/[0.06] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
