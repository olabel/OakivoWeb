import React from 'react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-slate-950 pt-20 pb-12 px-6 border-t border-slate-900/50">
        <div className="container mx-auto max-w-7xl">
            {/* Top Section - Brand and Email */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
                
                <div className="lg:col-span-4 space-y-8">
                    <div>
                        <Link to={NavRoute.HOME} className="text-3xl font-display font-bold tracking-tight text-slate-100 flex items-center">
                            OAKIVO<span className="text-cyan-500">.</span>
                        </Link>
                    </div>
                    <p className="text-sm text-slate-400 font-light leading-relaxed pr-8">
                        {t('footer.brand_desc')}
                    </p>
                </div>
                
                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Column 1: Capabilities */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-100">{t('footer.solutions_header')}</h4>
                        <ul className="space-y-4">
                            <li><Link to={NavRoute.SERVICES} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Cloud Security (CSPM)</Link></li>
                            <li><Link to={NavRoute.SERVICES} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">DevSecOps Pipelines</Link></li>
                            <li><Link to={NavRoute.SERVICES} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Zero Trust IAM</Link></li>
                            <li><Link to={NavRoute.SERVICES} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">SRE Threat Remediation</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Industries */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-100">{t('nav.industries')}</h4>
                        <ul className="space-y-4">
                            <li><Link to={NavRoute.VERTICALS} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Logistics & Supply Chain</Link></li>
                            <li><Link to={NavRoute.VERTICALS} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Healthcare & MedTech</Link></li>
                            <li><Link to={NavRoute.VERTICALS} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Retail & E-Commerce</Link></li>
                            <li><Link to={NavRoute.VERTICALS} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Financial Services</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: The Firm */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-100">{t('nav.firm')}</h4>
                        <ul className="space-y-4">
                            <li><Link to={NavRoute.ABOUT} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">About Oakivo</Link></li>
                            <li><Link to={NavRoute.CAREERS} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Careers</Link></li>
                            <li><Link to={NavRoute.METHODOLOGY} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Engineering Methodology</Link></li>
                            <li><Link to={NavRoute.COMPLIANCE} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Security Glossary</Link></li>
                            <li><Link to={NavRoute.CONTACT} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Locations */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-100">{t('footer.area_header')}</h4>
                        <ul className="space-y-4">
                            <li className="text-sm text-slate-400">Dieppe, NB (HQ)</li>
                            <li className="text-sm text-slate-400">Halifax, NS</li>
                            <li className="text-sm text-slate-400">Charlottetown, PEI</li>
                            <li className="text-sm text-slate-400">St. John's, NL</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Bottom Section - Legal and Social */}
            <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <p className="text-xs text-slate-500 font-light">
                        {t('footer.copyright')}
                    </p>
                    <div className="flex gap-6 text-xs text-slate-500 font-light">
                        <Link to={NavRoute.PRIVACY} className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link to={NavRoute.COMPLIANCE} className="hover:text-slate-300 transition-colors">Security & Compliance</Link>
                    </div>
                </div>
                
                <div className="flex items-center gap-6">
                    <a href="#" aria-label="LinkedIn" className="text-slate-500 hover:text-cyan-400 transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" aria-label="Twitter" className="text-slate-500 hover:text-cyan-400 transition-colors">
                        <Twitter className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
