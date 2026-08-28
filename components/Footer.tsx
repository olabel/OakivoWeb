import React from 'react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="border-t border-white/[0.05] bg-[#02040a] pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
                
                <div className="lg:col-span-5">
                    <div className="text-3xl font-display font-bold tracking-tight mb-8 text-white">
                        OAKIVO<span className="text-cyan-500">.</span>
                    </div>
                    <p className="text-slate-400 font-light max-w-sm mb-8 leading-relaxed text-lg">
                        Defending Atlantic Canadian enterprises through elite DevSecOps automation and autonomous infrastructure design.
                    </p>
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-slate-300 font-light">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 relative">
                            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50"></span>
                        </span>
                        100% Bilingual Support (EN/FR)
                    </div>
                </div>
                
                <div className="lg:col-span-3 lg:col-start-7">
                    <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-8">Headquarters</h4>
                    <address className="not-italic text-slate-400 font-light space-y-2 text-base leading-relaxed">
                        Dieppe, New Brunswick<br />
                        Atlantic Canada<br />
                        <a href="mailto:hello@oakivo.com" className="block mt-6 text-cyan-400 hover:text-cyan-300 transition-colors">hello@oakivo.com</a>
                    </address>
                </div>

                <div className="lg:col-span-3">
                    <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-8">Capabilities</h4>
                    <ul className="space-y-4 text-base text-slate-400 font-light">
                        <li><Link to={NavRoute.SERVICES} className="hover:text-white transition-colors">Cloud Security Posture</Link></li>
                        <li><Link to={NavRoute.SERVICES} className="hover:text-white transition-colors">CI/CD Pipeline Security</Link></li>
                        <li><Link to={NavRoute.SERVICES} className="hover:text-white transition-colors">Zero Trust IAM</Link></li>
                        <li><Link to={NavRoute.SERVICES} className="hover:text-white transition-colors">SRE Automation</Link></li>
                    </ul>
                </div>

            </div>
            
            <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-sm text-slate-600 font-light">
                    &copy; {new Date().getFullYear()} Oakivo Solutions Inc. All rights reserved.
                </p>
                <div className="flex gap-8 text-sm text-slate-600 font-light">
                    <Link to={NavRoute.PRIVACY} className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
                    <Link to={NavRoute.HOME} className="hover:text-slate-400 transition-colors">Terms of Service</Link>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
