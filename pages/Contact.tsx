import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Button from '../components/Button';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, ShieldCheck, Clock, Info, AlertCircle } from 'lucide-react';
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
    
    // Basic JS validation as secondary layer
    if (!formState.email.includes('@')) {
      setErrorMessage(language === 'en' ? 'Please provide a valid business email.' : 'Veuillez fournir un e-mail professionnel valide.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    
    try {
      // 1. Save to database
      db.saveEntry('lead', formState);
      
      // 2. Simulate backend processing delay for "email"
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.info("Lead captured in database & email queued:", formState);
      setStatus('success');
      setFormState({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      console.error("Critical submission error:", err);
      setStatus('error');
      setErrorMessage(language === 'en' ? 'Submission failed. Please try hello@oakivo.ca' : 'Échec de l\'envoi. Veuillez essayer hello@oakivo.ca');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO 
        title="Contact Oakivo | Book a Digital Audit & Odoo Consultation"
        description="Schedule a technical audit with Oakivo Solutions. Expert Odoo implementation and automation consulting for Canadian SMEs."
        keywords="Odoo Partner Canada, IT Audit Dieppe, ERP Consulting Atlantic Canada"
        canonical="/contact"
      />

      <section className="bg-oakivo-primary text-white pt-40 pb-20 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-serif-display font-bold mb-6">{t('contact.hero_title')}</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                {t('contact.hero_subtitle')}
            </p>
         </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 relative min-h-[600px] flex flex-col justify-center">
                {status === 'success' ? (
                  <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 shadow-inner">
                      <CheckCircle size={48} />
                    </div>
                    <h3 className="text-3xl font-bold font-serif-display mb-4 text-oakivo-primary">{contactData.success_title}</h3>
                    <p className="text-gray-600 max-w-md mx-auto leading-relaxed">{contactData.success_message}</p>
                    <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-400 font-medium">
                       Reference ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </div>
                    <Button variant="black" className="mt-12" onClick={() => setStatus('idle')}>Send another message</Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-8 text-oakivo-secondary font-bold uppercase text-xs tracking-widest">
                       <ShieldCheck size={18} /> Secure Submission Portal
                    </div>
                    <h2 className="text-4xl font-serif-display font-bold mb-4 text-oakivo-primary">{t('contact.form_title')}</h2>
                    <p className="text-gray-500 mb-6">{t('contact.form_response')}</p>
                    
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-12 flex items-start gap-3">
                       <Info className="text-oakivo-blue shrink-0 mt-1" size={18} />
                       <p className="text-xs text-blue-800 leading-relaxed">
                          Need urgent assistance? Our <Link to={NavRoute.BLOG} className="underline font-bold">Latest Perspectives</Link> cover standard implementation timelines for 2026.
                       </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('contact.label_name')}</label>
                            <input type="text" name="name" required minLength={2} value={formState.name} onChange={handleChange} className="w-full py-3 border-b border-gray-200 focus:border-oakivo-secondary focus:outline-none text-lg transition-colors bg-transparent" placeholder="Full Name" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('contact.label_email')}</label>
                            <input type="email" name="email" required value={formState.email} onChange={handleChange} className="w-full py-3 border-b border-gray-200 focus:border-oakivo-secondary focus:outline-none text-lg transition-colors bg-transparent" placeholder="work@company.com" />
                          </div>
                      </div>
                      
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('contact.label_company')}</label>
                         <input type="text" name="company" required value={formState.company} onChange={handleChange} className="w-full py-3 border-b border-gray-200 focus:border-oakivo-secondary focus:outline-none text-lg transition-colors bg-transparent" placeholder="Organization Name" />
                      </div>

                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('contact.label_message')}</label>
                         <textarea name="message" rows={4} required minLength={10} value={formState.message} onChange={handleChange} className="w-full py-3 border-b border-gray-200 focus:border-oakivo-secondary focus:outline-none text-lg transition-colors resize-none bg-transparent" placeholder="Tell us about your project..."></textarea>
                      </div>

                      {status === 'error' && (
                        <div className="bg-red-50 border border-red-100 p-4 rounded-lg flex items-center gap-3 text-red-600 text-sm font-semibold animate-shake">
                           <AlertCircle size={18} /> {errorMessage}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                         <Button type="submit" variant="black" size="lg" className="w-full sm:w-auto flex items-center justify-center min-w-[220px]" disabled={status === 'submitting'}>
                           {status === 'submitting' ? (
                             <>
                               <Loader2 className="animate-spin mr-2" /> {contactData.btn_sending}
                             </>
                           ) : (
                             <>
                               <Send className="mr-2" size={18} /> {t('contact.btn_send')}
                             </>
                           )}
                         </Button>
                         <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                            <Clock size={14} /> Expected response: Within 24 hours
                         </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5">
               <div className="space-y-16 lg:sticky lg:top-32">
                  <div>
                      <h3 className="text-xs font-bold text-oakivo-secondary uppercase tracking-[0.2em] mb-8">{t('contact.hq_title')}</h3>
                      <div className="space-y-12">
                         <div className="flex gap-6 group cursor-pointer">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-oakivo-primary group-hover:bg-oakivo-primary group-hover:text-white transition-all">
                               <MapPin size={24} />
                            </div>
                            <div>
                               <p className="text-xl font-bold mb-1">{t('contact.hq_visit')}</p>
                               <p className="text-gray-500 leading-relaxed">{contactData.hq_address_1}, {contactData.hq_address_2}</p>
                            </div>
                         </div>
                         <div className="flex gap-6 group cursor-pointer">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-oakivo-primary group-hover:bg-oakivo-primary group-hover:text-white transition-all">
                               <Mail size={24} />
                            </div>
                            <div>
                               <p className="text-xl font-bold mb-1">{t('contact.hq_email')}</p>
                               <a href="mailto:hello@oakivo.ca" className="text-gray-500 hover:text-oakivo-secondary transition-colors">hello@oakivo.ca</a>
                            </div>
                         </div>
                         <div className="flex gap-6 group cursor-pointer">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-oakivo-primary group-hover:bg-oakivo-primary group-hover:text-white transition-all">
                               <Phone size={24} />
                            </div>
                            <div>
                               <p className="text-xl font-bold mb-1">{t('contact.hq_call')}</p>
                               <p className="text-gray-500">{contactData.hq_phone}</p>
                            </div>
                         </div>
                      </div>
                  </div>
                  
                  {/* Map Mockup */}
                  <div className="aspect-video w-full bg-gray-100 rounded-3xl overflow-hidden relative grayscale opacity-70 border border-gray-200 shadow-inner">
                    <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2766.1956100808027!2d-64.74768562341904!3d46.09455327109156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca0b92e8e90641b%3A0x6b8d4f4007621c1!2sDieppe%2C%20NB!5e0!3m2!1sen!2sca!4v1715000000000!5m2!1sen!2sca" width="100%" height="100%" loading="lazy"></iframe>
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