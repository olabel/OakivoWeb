import React, { useState } from 'react';
import { ArrowRight, Globe, Heart, Clock, Loader2, Send, CheckCircle, Zap, AlertCircle, Sparkles, ShieldCheck, Cpu } from 'lucide-react';
import Button from '../components/Button';
import { useLanguage, translations } from '../context/LanguageContext';
import Section from '../components/Section';
import { db } from '../utils/database';
import SEO from '../components/SEO';

const Careers: React.FC = () => {
  const { t, language } = useLanguage();
  const careersData = translations[language].careers;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    linkedin: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const icons = [
    <Globe size={24} className="text-oakivo-secondary" />, 
    <Cpu size={24} className="text-oakivo-secondary" />, 
    <Clock size={24} className="text-oakivo-secondary" />, 
    <Heart size={24} className="text-oakivo-secondary" />
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrorMessage(language === 'en' ? 'Valid email required.' : 'E-mail valide requis.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    
    try {
      db.saveEntry('applicant', formState);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
      setFormState({ name: '', email: '', linkedin: '', message: '' });
    } catch (err) {
      console.error("Applicant capture error:", err);
      setStatus('error');
      setErrorMessage(language === 'en' ? 'Submission failure.' : 'Échec de l\'envoi.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO 
        title="Careers | Join the Oakivo Engineering Elite"
        description="Help build the future of Canadian enterprise. Join Oakivo's remote-first team of Odoo architects and AI engineers."
        keywords="Odoo Developer Jobs Canada, AI Engineer Careers, Remote Tech Jobs Canada, Oakivo Culture"
        canonical="/careers"
      />

      {/* Cinematic Header */}
      <section className="bg-[#020504] text-white pt-48 pb-32 overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-oakivo-secondary/5 to-transparent pointer-events-none"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md mb-10">
               <Sparkles size={14} className="text-oakivo-secondary" />
               <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">Future of Work</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif-display font-bold max-w-5xl leading-[0.85] mb-12 tracking-tighter">
              {careersData.hero_title}
            </h1>
            <p className="text-2xl md:text-4xl text-gray-400 max-w-3xl font-light leading-snug mb-12">
              {careersData.hero_subtitle}
            </p>
         </div>
      </section>

      {/* Values & Culture Grid */}
      <section className="bg-white py-32">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
              <div className="lg:col-span-5 sticky top-32">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
                    <span className="text-oakivo-secondary font-black tracking-[0.3em] uppercase text-[10px]">The Oakivo Ecosystem</span>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-serif-display font-bold text-oakivo-primary mb-10 leading-none tracking-tighter">
                   Architecting <br/> Autonomy.
                 </h2>
                 <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
                    We don't just hire employees; we partner with orchestrators. Our culture is built on deep technical ownership, radical transparency, and the pursuit of operational elegance.
                 </p>
                 <div className="p-8 bg-oakivo-surface rounded-[40px] border border-gray-100 flex items-center gap-6">
                    <ShieldCheck className="text-oakivo-secondary shrink-0" size={40} />
                    <p className="text-sm font-bold text-oakivo-primary uppercase tracking-widest leading-relaxed">
                       Security-First <br/> Mindset Standard
                    </p>
                 </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                 {careersData.values.map((val: any, idx: number) => (
                    <div key={idx} className="group p-10 bg-gray-50 rounded-[48px] hover:bg-white hover:shadow-4xl transition-all duration-700 border border-transparent hover:border-gray-100 flex flex-col h-full cv-auto">
                       <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-10 group-hover:scale-110 transition-transform">
                          {icons[idx]}
                       </div>
                       <h3 className="text-2xl font-bold font-serif-display mb-6 tracking-tight">{val.title}</h3>
                       <p className="text-gray-500 leading-relaxed text-lg font-light flex-grow">{val.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Spontaneous Application Section */}
      <Section bg="light" className="py-40">
        <div className="bg-white rounded-[60px] p-8 md:p-20 shadow-4xl relative overflow-hidden border border-gray-50">
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-oakivo-secondary via-oakivo-blue to-oakivo-secondary"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-7xl font-serif-display font-bold text-oakivo-primary mb-10 tracking-tighter leading-none">
                {careersData.apply_title}
              </h2>
              <p className="text-2xl text-gray-500 mb-12 leading-relaxed font-light italic">
                {careersData.apply_text}
              </p>
              <div className="flex flex-col gap-6">
                 <div className="flex items-center gap-5 p-6 bg-oakivo-surface rounded-3xl border border-gray-100">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-oakivo-secondary shadow-sm">
                       <Send size={24} />
                    </div>
                    <div>
                       <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Direct Technical Inquiry</span>
                       <a href={`mailto:${careersData.email_link}`} className="text-lg font-bold text-oakivo-primary hover:text-oakivo-secondary transition-colors underline decoration-oakivo-secondary/30">
                          {careersData.email_link}
                       </a>
                    </div>
                 </div>
                 <p className="text-sm text-gray-400 font-medium px-4">
                    * Please include links to your GitHub, Portfolio, or relevant technical certifications.
                 </p>
              </div>
            </div>

            <div className="bg-gray-50 p-10 md:p-14 rounded-[48px] border border-gray-100 relative min-h-[500px] flex flex-col justify-center shadow-inner">
               {status === 'success' ? (
                  <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                     <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-8 shadow-inner">
                        <CheckCircle size={48} />
                     </div>
                     <h3 className="text-3xl font-serif-display font-bold text-oakivo-primary mb-4">Transmission Successful</h3>
                     <p className="text-gray-500 mb-10 text-lg font-light">Your technical profile has been logged in the Oakivo Strategy Vault. Our engineering lead will review it shortly.</p>
                     <Button variant="black" size="lg" onClick={() => setStatus('idle')}>Submit Another Profile</Button>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400">Full Name</label>
                           <input type="text" name="name" required minLength={2} value={formState.name} onChange={handleChange} className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-oakivo-secondary focus:ring-4 focus:ring-oakivo-secondary/5 transition-all text-sm font-medium" placeholder="E.g. Elena Rossi" disabled={status === 'submitting'} />
                        </div>
                        <div className="space-y-2">
                           <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                           <input type="email" name="email" required value={formState.email} onChange={handleChange} className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-oakivo-secondary focus:ring-4 focus:ring-oakivo-secondary/5 transition-all text-sm font-medium" placeholder="elena@engineer.com" disabled={status === 'submitting'} />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400">LinkedIn / Portfolio URL</label>
                        <input type="url" name="linkedin" required value={formState.linkedin} onChange={handleChange} className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-oakivo-secondary focus:ring-4 focus:ring-oakivo-secondary/5 transition-all text-sm font-medium" placeholder="https://linkedin.com/in/profile" disabled={status === 'submitting'} />
                     </div>
                     <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400">Technical Overview</label>
                        <textarea name="message" rows={4} required minLength={20} value={formState.message} onChange={handleChange} className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-oakivo-secondary focus:ring-4 focus:ring-oakivo-secondary/5 transition-all text-sm font-medium resize-none" placeholder="Briefly summarize your expertise in Odoo, AI, or Infrastructure..." disabled={status === 'submitting'}></textarea>
                     </div>

                     {status === 'error' && (
                        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-600 text-xs font-bold animate-shake">
                           <AlertCircle size={18} /> {errorMessage}
                        </div>
                     )}

                     <Button type="submit" variant="black" size="lg" className="w-full flex items-center justify-center gap-3 group" disabled={status === 'submitting'}>
                        {status === 'submitting' ? (
                           <>
                              <Loader2 className="animate-spin" size={20} /> Processing Intelligence...
                           </>
                        ) : (
                           <>
                              {careersData.apply_btn} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                           </>
                        )}
                     </Button>
                  </form>
               )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Careers;