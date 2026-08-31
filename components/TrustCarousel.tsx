import React from 'react';
import { ShieldCheck, Lock, Server, FileCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const getCertifications = (t: (key: string) => string) => [
  { name: t('trust.soc2'), icon: ShieldCheck },
  { name: t('trust.iso27001'), icon: Lock },
  { name: t('trust.pipeda'), icon: Server },
  { name: t('trust.aws'), icon: CheckCircle2 },
  { name: t('trust.k8s'), icon: FileCheck },
  { name: t('trust.terraform'), icon: ShieldCheck },
  // Duplicate for seamless marquee
  { name: t('trust.soc2'), icon: ShieldCheck },
  { name: t('trust.iso27001'), icon: Lock },
  { name: t('trust.pipeda'), icon: Server },
  { name: t('trust.aws'), icon: CheckCircle2 },
  { name: t('trust.k8s'), icon: FileCheck },
  { name: t('trust.terraform'), icon: ShieldCheck },
];

const TrustCarousel: React.FC = () => {
  const { t } = useLanguage();
  const certifications = getCertifications(t);
  
  return (
    <div className="w-full bg-slate-950 border-b border-slate-900/50 py-6 overflow-hidden relative flex">
      {/* Edge Gradients for smooth fade in/out */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
      
      <div 
        className="flex w-fit hover:[animation-play-state:paused]"
        style={{ animation: 'marquee 40s linear infinite' }}
      >
        {certifications.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <div 
              key={index} 
              className="flex items-center gap-3 px-12 whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity cursor-default"
            >
              <Icon size={16} className="text-cyan-500" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
                {cert.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrustCarousel;
