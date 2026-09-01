import React, { useState } from 'react';
import { ArrowRight, FileText, CheckCircle, Zap, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';
import Button from './Button';
import { db } from '../utils/database';
import { useLanguage, translations } from '../context/LanguageContext';

interface LeadMagnetProps {
  type: 'erp' | 'cyber' | 'ai' | 'modern';
}

const LeadMagnet: React.FC<LeadMagnetProps> = ({ type }) => {
  const { language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Access the object directly from translations with fallback
  const langDict = translations[language] || translations['en'];
  const magnetData = langDict?.magnets?.[type] || translations['en'].magnets[type] || {
    title: "Technical Automation Briefing",
    desc: "Detailed workflow analysis on connecting existing software to automate manual data entry.",
    btn: "Download Briefing"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Bot detected via honeypot: silently simulate success
      setStatus('success');
      return;
    }
    setStatus('submitting');
    await db.saveEntry('subscriber', { email, magnetType: type });
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
  };

  const icons = {
    erp: <Sparkles className="text-oakivo-secondary" />,
    cyber: <ShieldAlert className="text-red-500" />,
    ai: <Zap className="text-oakivo-secondary" />,
    modern: <FileText className="text-oakivo-secondary" />
  };

  return (
    <div className="bg-oakivo-surface border border-gray-100 rounded-[48px] p-10 md:p-14 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-10 transition-opacity">
         {/* Cast to React.ReactElement<any> to allow passing 'size' prop to cloned elements */}
         {React.cloneElement(icons[type] as React.ReactElement<any>, { size: 120 })}
      </div>

      {status === 'success' ? (
        <div className="text-center py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h4 className="text-2xl font-serif-display font-bold text-oakivo-primary mb-2">Access Granted</h4>
          <p className="text-gray-500 text-sm font-light">Check your inbox for the technical briefing.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
               {/* Cast to React.ReactElement<any> to allow passing 'size' prop to cloned elements */}
               {React.cloneElement(icons[type] as React.ReactElement<any>, { size: 24 })}
            </div>
            <h3 className="text-2xl md:text-3xl font-serif-display font-bold text-oakivo-primary tracking-tight">
               {magnetData.title}
            </h3>
          </div>
          
          <p className="text-gray-500 font-light leading-relaxed mb-10 max-w-lg">
            {magnetData.desc}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            {/* Hidden Honeypot Input for Bot Anti-Spam */}
            <input
              type="text"
              name="b_website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden absolute opacity-0 pointer-events-none -z-10"
              aria-hidden="true"
            />
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter corporate email" 
              className="flex-grow bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-oakivo-primary focus:ring-4 focus:ring-oakivo-primary/5 transition-all text-gray-900 placeholder-gray-500"
            />
            <Button variant="black" size="md" type="submit" disabled={status === 'submitting'} className="min-w-[200px]">
              {status === 'submitting' ? <Loader2 className="animate-spin" size={18} /> : magnetData.btn}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default LeadMagnet;