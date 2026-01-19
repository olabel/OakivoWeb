import React, { useState } from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const contactData = translations[language].contact;
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
       console.log("Form Data Sent:", formState);
       // In a real app, you would POST to an endpoint here.
       setStatus('success');
       setFormState({ name: '', email: '', company: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Oakivo Solutions Inc",
    "image": "https://www.oakivo.com/logo.png",
    "telephone": "+1-506-899-4941",
    "email": "hello@oakivo.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "21 Delta Street",
      "addressLocality": "Dieppe",
      "addressRegion": "NB",
      "postalCode": "E1A 7B8",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 46.0945,
      "longitude": -64.7477
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    }
  };

  return (
    <>
      <SEO 
        title="Contact Oakivo | IT Consulting Dieppe & Atlantic Canada"
        description="Contact Oakivo Solutions for Odoo ERP implementation, business automation, and IT consulting. Located in Dieppe, New Brunswick, serving Atlantic Canada and nationwide."
        keywords="Contact Oakivo, IT Consultants Dieppe, Odoo Partner New Brunswick, Business Consulting Atlantic Canada"
        schema={localBusinessSchema}
        canonical="/contact"
      />

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
            
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-oakivo-surface p-8 md:p-12 rounded-2xl shadow-sm relative overflow-hidden">
              
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20 animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-bold font-serif-display mb-4">{contactData.success_title}</h3>
                  <p className="text-gray-600 max-w-md mx-auto">{contactData.success_message}</p>
                  <Button variant="outline" className="mt-8 text-black border-black hover:bg-black hover:text-white" onClick={() => setStatus('idle')}>
                    Send Another
                  </Button>
                </div>
              ) : (
                <>
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
                            disabled={status === 'submitting'}
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
                            disabled={status === 'submitting'}
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
                        disabled={status === 'submitting'}
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
                        disabled={status === 'submitting'}
                      ></textarea>
                    </div>

                    <div className="pt-4">
                       <Button type="submit" variant="black" size="lg" className="w-full md:w-auto flex items-center justify-center gap-2" disabled={status === 'submitting'}>
                         {status === 'submitting' ? (
                           <>
                            <Loader2 className="animate-spin" size={20} />
                            {contactData.btn_sending}
                           </>
                         ) : (
                           <>
                             {t('contact.btn_send')} <Send size={16} />
                           </>
                         )}
                       </Button>
                    </div>
                  </form>
                </>
              )}
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
                            {contactData.hq_address_1}<br/>
                            {contactData.hq_address_2}<br/>
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
                          <p className="text-lg text-gray-800">{contactData.hq_phone}</p>
                        </div>
                      </div>
                   </div>
               </div>

               {/* Grayscale Map */}
               <div className="flex-grow w-full min-h-[300px] bg-gray-200 rounded-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                 {/* Interactive Map Placeholder (Iframe) */}
                 <iframe 
                   title="Oakivo HQ Location"
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2766.1956100808027!2d-64.74768562341904!3d46.09455327109156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca0b92e8e90641b%3A0x6b8d4f4007621c1!2sDieppe%2C%20NB!5e0!3m2!1sen!2sca!4v1715000000000!5m2!1sen!2sca" 
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