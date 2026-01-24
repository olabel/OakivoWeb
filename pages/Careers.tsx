import React, { useState } from 'react';
import { ArrowRight, Globe, Heart, Clock, Loader2, Send, CheckCircle, Zap, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import { useLanguage, translations } from '../context/LanguageContext';
import Section from '../components/Section';
import { db } from '../utils/database';

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

  const icons = [<Globe size={24} />, <Zap size={24} />, <Clock size={24} />, <Heart size={24} />];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Explicit Validation
    if (!formState.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrorMessage(language === 'en' ? 'Valid email required.' : 'E-mail valide requis.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    
    try {
      // 1. Save to database
      db.saveEntry('applicant', formState);
      
      // 2. Simulate processing delay
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
      <section className="bg-black text-white pt-40 pb-20 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-oakivo-secondary/10 to-transparent pointer-events-none"></div>
         <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-5xl md:text-8xl font-serif-display font-bold max-w-5xl leading-tight mb-8">
              {careersData.hero_title}
            </h1>
            <p className="text-xl md:text-3xl text-gray-400 max-w-3xl font-light leading-relaxed mb-12">
              {careersData.hero_subtitle}
            </p>
         </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-4">
                 <h2 className="text-4xl font-serif-display font-bold mb-6">{careersData.culture_title}</h2>
                 <div className="w-20 h-1 bg-oakivo-secondary mb-8"></div>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                 {careersData.values.map((val: any, idx: number) => (
                    <div key={idx} className="p-8 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                       <div className="w-12 h-12 bg-oakivo-primary text-white flex items-center justify-center rounded-lg mb-6">
                          {icons[idx]}
                       </div>
                       <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                       <p className="text-gray-600 leading-relaxed">{val.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      <Section bg="light">
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-oakivo-secondary via-oakivo-blue to-oakivo-secondary"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif-display font-bold mb-6">{careersData.apply_title}</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {careersData.apply_text}
              </p>
              <div className="flex items-center gap-4 text-oakivo-primary font-bold">
                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Send size={18} />
                 </div>
                 {careersData.email_link}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 min-h-[400px] flex flex-col justify-center">
               {status === 'success' ? (
                  <div className="text-center py-12 animate-in fade-in zoom-in">
                     <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-6 shadow-inner">
                        <CheckCircle size={32} />
                     </div>
                     <h3 className="text-2xl font-bold mb-2">Application Received</h3>
                     <p className="text-gray-500 mb-6">We have received your details. Our HR team will review your profile.</p>
                     <Button variant="outline" className="text-black border-gray-300 hover:border-black" onClick={() => setStatus('idle')}>Apply Again</Button>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                        <input type="text" name="name" required minLength={2} value={formState.name} onChange={handleChange} className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors" placeholder="John Doe" disabled={status === 'submitting'} />
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                        <input type="email" name="email" required value={formState.email} onChange={handleChange} className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors" placeholder="john@example.com" disabled={status === 'submitting'} />
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">LinkedIn Profile</label>
                        <input type="url" name="linkedin" required value={formState.linkedin} onChange={handleChange} className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors" placeholder="https://linkedin.com/in/johndoe" disabled={status === 'submitting'} />
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Tell us about yourself</label>
                        <textarea name="message" rows={3} required minLength={20} value={formState.message} onChange={handleChange} className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none" placeholder="What drives you?" disabled={status === 'submitting'}></textarea>
                     </div>

                     {status === 'error' && (
                        <div className="text-red-500 text-xs font-bold flex items-center gap-2">
                           <AlertCircle size={14} /> {errorMessage}
                        </div>
                     )}

                     <Button type="submit" variant="black" className="w-full justify-center" disabled={status === 'submitting'}>
                        {status === 'submitting' ? (
                           <>
                              <Loader2 className="animate-spin mr-2" size={20} /> Processing...
                           </>
                        ) : (
                           careersData.apply_btn
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