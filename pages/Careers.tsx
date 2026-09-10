import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Heart, Clock, Loader2, Send, CheckCircle2, Sparkles, ShieldCheck, Cpu, Briefcase, MapPin } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import Section from '../components/Section';
import { db } from '../utils/database';
import SEO from '../components/SEO';
import { toast } from 'sonner';

const openRoles = [
  {
    title: "Senior DevSecOps Engineer",
    department: "Engineering",
    location: "Halifax, NS (Hybrid)",
    type: "Full-Time"
  },
  {
    title: "Cloud Compliance Architect",
    department: "Security & Governance",
    location: "Moncton, NB (Remote)",
    type: "Full-Time"
  },
  {
    title: "Strategic Account Executive",
    department: "Sales",
    location: "St. John's, NL",
    type: "Full-Time"
  }
];

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
    <Globe size={24} className="text-cyan-400" />, 
    <Cpu size={24} className="text-cyan-400" />, 
    <Clock size={24} className="text-cyan-400" />, 
    <Heart size={24} className="text-cyan-400" />
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.name) return;
    setStatus('submitting');
    
    try {
      // Save to Firebase (this automatically triggers the email notification)
      await db.saveEntry('applicant', formState);

      setStatus('success');
      setFormState({ name: '', email: '', linkedin: '', message: '' });
      toast.success('Application Submitted', { description: 'Our technical recruiting team will review your profile.' });
    } catch (err) {
      console.error("Applicant capture error:", err);
      setStatus('error');
      toast.error('Submission Failed', { description: 'Please try again.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO 
        title="DevSecOps & Cloud Security Careers | Oakivo Atlantic Canada"
        description="Join Oakivo's elite team of DevSecOps engineers and cloud security specialists building advanced compliance and process automation solutions in Atlantic Canada."
        canonical="/careers"
      />

      <section className="bg-slate-950 pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full mb-8 shadow-lg"
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
              Grow With Us
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-6"
          >
            {careersData.hero_title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {careersData.hero_subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-slate-950 relative border-t border-slate-900">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Core Values & Roles */}
            <div className="space-y-16">
              <div>
                <div className="inline-flex items-center gap-2 text-cyan-400 font-mono font-bold uppercase tracking-widest text-xs mb-6">
                  <ShieldCheck size={16} /> Our Core Values
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-4">
                  Grounded, practical automation craftsmanship.
                </h2>
                <p className="text-slate-400 font-light leading-relaxed mb-10">
                  We are building Atlantic Canada's premier DevSecOps engineering firm. We value deep technical execution over corporate posturing.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {careersData.values.map((val: any, idx: number) => (
                    <div key={idx} className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800 space-y-4 hover:border-cyan-500/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                        {icons[idx]}
                      </div>
                      <h3 className="text-base font-bold text-white">{val.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed font-light">{val.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 text-cyan-400 font-mono font-bold uppercase tracking-widest text-xs mb-6">
                  <Briefcase size={16} /> Open Positions
                </div>
                <div className="space-y-4">
                  {openRoles.map((role, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-500/50 transition-all group cursor-pointer">
                      <div>
                        <h3 className="text-white font-bold font-display text-lg group-hover:text-cyan-400 transition-colors">{role.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-400 font-mono">
                          <span className="flex items-center gap-1.5"><MapPin size={14}/> {role.location}</span>
                          <span>{role.type}</span>
                        </div>
                      </div>
                      <ArrowRight className="text-slate-600 group-hover:text-cyan-400 transform group-hover:translate-x-1 transition-all mt-4 sm:mt-0" size={20} />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Application Form */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 sticky top-32 shadow-2xl">
              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold text-white mb-2">{careersData.apply_title}</h3>
                <p className="text-sm text-slate-400 font-light">{careersData.apply_text}</p>
              </div>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} className="text-cyan-400" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white">Application Received</h4>
                  <p className="text-sm text-slate-400 font-light max-w-xs mx-auto">
                    Our technical recruiting team will review your profile and reach out shortly.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')} 
                    className="mt-6 px-8 py-3 rounded-xl border border-slate-700 text-white text-sm font-mono font-bold hover:bg-slate-800 transition-colors"
                  >
                    Submit Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-mono">
                      There was a problem submitting your application. Please try again.
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Full Name *</label>
                    <input 
                      id="name"
                      type="text" 
                      name="name" 
                      required 
                      value={formState.name} 
                      onChange={handleChange} 
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" 
                      placeholder="Marcus Vance" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Work Email *</label>
                    <input 
                      id="email"
                      type="email" 
                      name="email" 
                      required 
                      value={formState.email} 
                      onChange={handleChange} 
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" 
                      placeholder="m.vance@company.ca" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="linkedin" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">LinkedIn / Portfolio URL</label>
                    <input 
                      id="linkedin"
                      type="url" 
                      name="linkedin" 
                      value={formState.linkedin} 
                      onChange={handleChange} 
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" 
                      placeholder="https://linkedin.com/in/profile" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Background Summary</label>
                    <textarea 
                      id="message"
                      name="message" 
                      rows={4} 
                      value={formState.message} 
                      onChange={handleChange} 
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none" 
                      placeholder="Briefly introduce your experience in software engineering..." 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'} 
                    className="w-full py-4 rounded-xl bg-white hover:bg-cyan-400 text-slate-950 font-bold font-mono text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    {status === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    <span>{careersData.apply_btn}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;
