import React, { useState } from 'react';
import { ArrowRight, Globe, Heart, Clock, Loader2, Send, CheckCircle2, Sparkles, ShieldCheck, Cpu } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import Section from '../components/Section';
import { db } from '../utils/database';
import SEO from '../components/SEO';

const Careers: React.FC = () => {
  const { language } = useLanguage();
  const careersData = translations[language].careers;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    linkedin: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const icons = [
    <Globe size={24} className="text-emerald-400" />, 
    <Cpu size={24} className="text-emerald-400" />, 
    <Clock size={24} className="text-emerald-400" />, 
    <Heart size={24} className="text-emerald-400" />
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.name) return;

    setStatus('submitting');
    
    try {
      db.saveEntry('applicant', formState);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setFormState({ name: '', email: '', linkedin: '', message: '' });
    } catch (err) {
      console.error("Applicant capture error:", err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO 
        title="Careers | Join Oakivo Solutions in Atlantic Canada"
        description="Join Oakivo's team of workflow automation specialists and integration engineers building invoice & bookkeeping solutions for Atlantic Canada."
        canonical="/careers"
      />

      <section className="bg-[#070A0F] text-white pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <Sparkles size={14} className="text-emerald-400" />
            <span className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-widest">
              Grow With Us
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-linear-heading mb-6">
            {careersData.hero_title}
          </h1>
          <p className="text-base md:text-xl text-[#8A8F98] max-w-2xl mx-auto font-normal leading-relaxed">
            {careersData.hero_subtitle}
          </p>
        </div>
      </section>

      <Section className="bg-[#0B0F17] text-white py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono-tech font-bold uppercase tracking-widest text-xs">
              <ShieldCheck size={16} /> Our Core Values
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-linear-heading">
              Grounded, practical automation craftsmanship.
            </h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              We help local business owners and operators stop wasting valuable staff time on repetitive software tasks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {careersData.values.map((val: any, idx: number) => (
                <div key={idx} className="linear-card rounded-2xl p-6 border border-white/[0.08] space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                  <h3 className="text-base font-bold text-white">{val.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="linear-card rounded-3xl p-8 border border-white/10 space-y-6">
            <h3 className="text-2xl font-bold text-white">{careersData.apply_title}</h3>
            <p className="text-xs text-gray-400 font-light">{careersData.apply_text}</p>

            {status === 'success' ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Application Received</h4>
                <p className="text-xs text-gray-400">Our team will review your profile and reach out shortly.</p>
                <button onClick={() => setStatus('idle')} className="px-6 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider">
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono-tech uppercase text-gray-400 block mb-1">Full Name *</label>
                  <input type="text" name="name" required value={formState.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white" placeholder="Marcus Vance" />
                </div>

                <div>
                  <label className="text-[10px] font-mono-tech uppercase text-gray-400 block mb-1">Work Email *</label>
                  <input type="email" name="email" required value={formState.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white" placeholder="m.vance@company.ca" />
                </div>

                <div>
                  <label className="text-[10px] font-mono-tech uppercase text-gray-400 block mb-1">LinkedIn / Portfolio URL</label>
                  <input type="url" name="linkedin" value={formState.linkedin} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white" placeholder="https://linkedin.com/in/profile" />
                </div>

                <div>
                  <label className="text-[10px] font-mono-tech uppercase text-gray-400 block mb-1">Background Summary</label>
                  <textarea name="message" rows={3} value={formState.message} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white resize-none" placeholder="Briefly introduce your experience in software integration..." />
                </div>

                <button type="submit" disabled={status === 'submitting'} className="w-full py-3.5 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer">
                  {status === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : <Send size={14} />}
                  <span>{careersData.apply_btn}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </Section>
    </>
  );
};

export default Careers;
