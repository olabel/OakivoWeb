import React, { useState } from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent.');
    setFormState({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <section className="bg-black text-white pt-40 pb-20">
         <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-serif-display font-bold mb-6">{t('contact.hero_title')}</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {t('contact.hero_subtitle')}
            </p>
         </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Contact Form - Prominent with Background Tint */}
            <div className="lg:col-span-7 bg-oakivo-surface p-8 md:p-12 rounded-2xl shadow-sm">
              <h2 className="text-3xl font-serif-display font-bold mb-2">{t('contact.form_title')}</h2>
              <p className="text-gray-500 mb-10">{t('contact.form_response')}</p>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="border-b border-gray-300 focus-within:border-black transition-colors">
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t('contact.label_name')}</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full py-3 bg-transparent focus:outline-none text-lg text-black placeholder-gray-400"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="border-b border-gray-300 focus-within:border-black transition-colors">
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t('contact.label_email')}</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full py-3 bg-transparent focus:outline-none text-lg text-black placeholder-gray-400"
                        placeholder="jane@company.com"
                      />
                    </div>
                </div>
                
                <div className="border-b border-gray-300 focus-within:border-black transition-colors">
                   <label htmlFor="company" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t('contact.label_company')}</label>
                   <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full py-3 bg-transparent focus:outline-none text-lg text-black placeholder-gray-400"
                    placeholder="Company Ltd."
                  />
                </div>

                <div className="border-b border-gray-300 focus-within:border-black transition-colors">
                   <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t('contact.label_message')}</label>
                   <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full py-3 bg-transparent focus:outline-none text-lg text-black resize-none placeholder-gray-400"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <div className="pt-4">
                   <Button type="submit" variant="black" size="lg" className="w-full md:w-auto flex items-center justify-center gap-2">
                     {t('contact.btn_send')} <Send size={16} />
                   </Button>
                </div>
              </form>
            </div>

            {/* Info & Map */}
            <div className="lg:col-span-5 flex flex-col h-full">
               <div className="mb-12">
                   <h3 className="text-2xl font-serif-display font-bold mb-8 text-black">{t('contact.hq_title')}</h3>
                   
                   <div className="space-y-8">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-oakivo-primary shrink-0">
                            <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-gray-400 mb-1">{t('contact.hq_visit')}</h4>
                          <p className="text-lg text-gray-800 leading-relaxed">
                            123 Innovation Drive, Suite 400<br/>
                            Halifax, NS, B3J 2K9<br/>
                            Canada
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-oakivo-primary shrink-0">
                            <Mail size={20} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-gray-400 mb-1">{t('contact.hq_email')}</h4>
                          <a href="mailto:hello@oakivo.ca" className="text-lg text-gray-800 hover:text-oakivo-secondary transition-colors">hello@oakivo.ca</a>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-oakivo-primary shrink-0">
                            <Phone size={20} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-gray-400 mb-1">{t('contact.hq_call')}</h4>
                          <p className="text-lg text-gray-800">+1 (902) 555-0123</p>
                        </div>
                      </div>
                   </div>
               </div>

               {/* Grayscale Map */}
               <div className="flex-grow w-full min-h-[300px] bg-gray-200 rounded-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                 {/* Interactive Map Placeholder (Iframe) */}
                 <iframe 
                   title="Oakivo HQ Location"
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.399220078736!2d-63.57523868427517!3d44.64876307909988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5a2232b6e5e8e7%3A0x6b4f7e5b5e5e5e5e!2sHalifax%2C%20NS!5e0!3m2!1sen!2sca!4v1620000000000!5m2!1sen!2sca" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen={true} 
                   loading="lazy"
                   className="absolute inset-0 w-full h-full"
                 ></iframe>
               </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;