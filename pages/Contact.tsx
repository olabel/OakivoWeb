
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Button from '../components/Button';
// Added Activity to the imports
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, ShieldCheck, Clock, Info, AlertCircle, Sparkles, Building, User, Target, Activity } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import { NavRoute } from '../types';
import SEO from '../components/SEO';
import { db } from '../utils/database';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const contactData = translations[language].contact;
  
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Expert-level validation
    if (!formState.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrorMessage(language === 'en' ? 'Provide a valid organizational email.' : 'Veuillez fournir un e-mail professionnel valide.');
      setStatus('error');
      return;
    }

    if (formState.message.length < 20) {
      setErrorMessage(language === 'en' ? 'Brief overview must be at least 20 characters.' : 'L\'aperçu doit faire au moins 20 caractères.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    
    try {
      db.saveEntry('lead', formState);
      // Simulate industrial-grade processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
      setFormState({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(language === 'en' ? 'Transmission timeout. Please email hello@oakivo.com' : 'Délai d\'envoi dépassé. Contactez hello@oakivo.com');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (status === 'error') setStatus('idle');
  };

  return (
    <>
      <SEO 
        title="Contact Oakivo | Book a Digital Audit & Odoo Consultation"
        description="Schedule a technical audit with Oakivo Solutions. Expert Odoo implementation and automation consulting for Canadian SMEs."
        keywords="Odoo Partner Canada, IT Audit Dieppe, ERP Consulting Atlantic Canada"
        canonical="/contact"
      />

      {/* Cinematic Header */}
      <section className="bg-oakivo-primary text-white pt-48 pb-32 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-oakivo-secondary/5 to-transparent pointer-events-none"></div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md mb-12 animate-fade-in-up">
               <Sparkles size={14} className="text-oakivo-secondary" />
               <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">Direct Engineering Line</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif-display font-bold mb-12 tracking-tighter leading-none animate-fade-in-up [animation-delay:200ms]">
              Initiate Audit.
            </h1>
            <p className="text-2xl md:text-4xl text-gray-400 max-w-3xl font-light leading-snug animate-fade-in-up [animation-delay:400ms]">
                Connect with our senior architects to map your organization's digital trajectory.
            </p>
         </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            
            {/* Form Matrix */}
            <div className="lg:col-span-7">
              <div className="bg-white p-10 md:p-20 rounded-[64px] shadow-4xl border border-gray-50 relative min-h-[750px] flex flex-col justify-center overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 p-16 opacity-[0.03] text-oakivo-primary group-hover:opacity-10 transition-opacity">
                   <Target size={300} />
                </div>

                {status === 'success' ? (
                  <div className="text-center py-20 animate-in fade-in zoom-in duration-700 relative z-10">
                    <div className="w-40 h-40 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-12 shadow-inner border border-green-100">
                      <CheckCircle size={80} />
                    </div>
                    <h3 className="text-5xl font-serif-display font-bold mb-6 text-oakivo-primary tracking-tight">{contactData.success_title}</h3>
                    <p className="text-2xl text-gray-500 max-w-md mx-auto font-light leading-relaxed mb-16">{contactData.success_message}</p>
                    <Button variant="black" size="lg" className="px-16 py-6" onClick={() => setStatus('idle')}>Initiate New Query</Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-6 mb-16 relative z-10">
                       <div className="w-16 h-16 bg-oakivo-surface rounded-2xl flex items-center justify-center text-oakivo-secondary shadow-sm border border-gray-100">
                          <ShieldCheck size={32} />
                       </div>
                       <div>
                          <span className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Secure Gateway</span>
                          <span className="block text-lg font-bold text-oakivo-primary">SOC2 Compliant Capture Portal</span>
                       </div>
                    </div>

                    <h2 className="text-5xl font-serif-display font-bold mb-16 text-oakivo-primary tracking-tight relative z-10">{t('contact.form_title')}</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
                               <User size={12} className="text-oakivo-secondary" /> {t('contact.label_name')}
                            </label>
                            <input type="text" name="name" required minLength={2} value={formState.name} onChange={handleChange} className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-100 focus:border-oakivo-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-oakivo-primary/5 transition-all font-medium text-lg" placeholder="E.g. James Wilson" />
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
                               <Mail size={12} className="text-oakivo-secondary" /> {t('contact.label_email')}
                            </label>
                            <input type="email" name="email" required value={formState.email} onChange={handleChange} className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-100 focus:border-oakivo-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-oakivo-primary/5 transition-all font-medium text-lg" placeholder="work@company.com" />
                          </div>
                      </div>
                      
                      <div className="space-y-4">
                         <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
                            <Building size={12} className="text-oakivo-secondary" /> {t('contact.label_company')}
                         </label>
                         <input type="text" name="company" required value={formState.company} onChange={handleChange} className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-100 focus:border-oakivo-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-oakivo-primary/5 transition-all font-medium text-lg" placeholder="Organization Name" />
                      </div>

                      <div className="space-y-4">
                         <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
                            <Activity size={12} className="text-oakivo-secondary" /> {t('contact.label_message')}
                         </label>
                         <textarea name="message" rows={5} required value={formState.message} onChange={handleChange} className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-100 focus:border-oakivo-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-oakivo-primary/5 transition-all font-medium text-lg resize-none" placeholder="Briefly describe your industrial challenges..."></textarea>
                      </div>

                      {status === 'error' && (
                        <div className="bg-red-50 border border-red-100 p-8 rounded-2xl flex items-center gap-4 text-red-600 font-bold animate-shake text-lg">
                           <AlertCircle size={28} /> {errorMessage}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center gap-12 pt-8">
                         <Button type="submit" variant="black" size="lg" className="w-full sm:w-auto flex items-center justify-center min-w-[320px] py-6 text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all" disabled={status === 'submitting'}>
                           {status === 'submitting' ? (
                             <>
                               <Loader2 className="animate-spin mr-4" size={24} /> Processing...
                             </>
                           ) : (
                             <>
                               <Send className="mr-4" size={24} /> Request Blueprint Audit
                             </>
                           )}
                         </Button>
                         <div className="flex items-center gap-4 text-[11px] text-gray-400 font-black uppercase tracking-widest">
                            <Clock size={20} className="text-oakivo-secondary" /> Response SLA: 24h
                         </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Info Matrix */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
               <div className="space-y-20">
                  <div className="animate-fade-in-up">
                      <h3 className="text-[11px] font-black text-oakivo-secondary uppercase tracking-[0.4em] mb-12">{t('contact.hq_title')}</h3>
                      <div className="space-y-16">
                         {[
                            { icon: <MapPin />, title: "Headquarters Hub", detail: "21 Delta St., Dieppe, NB E1A 3R5" },
                            { icon: <Mail />, title: "Strategic Intelligence", detail: "hello@oakivo.com", isLink: true, href: "mailto:hello@oakivo.com" },
                            { icon: <Phone />, title: "Direct Orchestration", detail: "+1 (506) 857-4000" }
                         ].map((item, i) => (
                           <div key={i} className="flex gap-10 group">
                              <div className="w-20 h-20 bg-oakivo-surface rounded-2xl flex items-center justify-center text-oakivo-primary group-hover:bg-oakivo-primary group-hover:text-white transition-all duration-700 shadow-sm border border-gray-50">
                                 {React.cloneElement(item.icon as React.ReactElement<any>, { size: 36 })}
                              </div>
                              <div className="pt-2">
                                 <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">{item.title}</p>
                                 {item.isLink ? (
                                   <a href={item.href} className="text-3xl font-bold text-oakivo-primary hover:text-oakivo-secondary transition-colors font-serif-display tracking-tight">{item.detail}</a>
                                 ) : (
                                   <p className="text-3xl font-bold text-oakivo-primary font-serif-display leading-tight tracking-tight">{item.detail}</p>
                                 )}
                              </div>
                           </div>
                         ))}
                      </div>
                  </div>
                  
                  {/* High Performance Map */}
                  <div className="aspect-[16/10] w-full bg-oakivo-surface rounded-[64px] overflow-hidden relative border border-gray-100 shadow-inner group animate-fade-in-up [animation-delay:400ms]">
                    <iframe 
                      title="Oakivo Hub Moncton" 
                      className="w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2766.1956100808027!2d-64.74768562341904!3d46.09455327109156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca0b92e8e90641b%3A0x6b8d4f4007621c1!2sDieppe%2C%20NB!5e0!3m2!1sen!2sca!4v1715000000000!5m2!1sen!2sca" 
                      loading="lazy"
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none border-[20px] border-white/5 group-hover:border-transparent transition-all duration-1000"></div>
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
