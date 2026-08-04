import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Mail, Phone, Lock, Sparkles, ArrowRight, Heart } from 'lucide-react';
import Logo from './Logo';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import LeadDrawer from './LeadDrawer';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <footer className="bg-[#070A0F] text-white border-t border-white/10 relative overflow-hidden pt-20 pb-12">
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-oakivo-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Callout Card */}
        <div className="max-w-7xl mx-auto linear-card rounded-2xl md:rounded-3xl p-8 md:p-12 border border-white/[0.08] mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-2.5 max-w-xl">
            <span className="text-[10px] font-mono-tech text-oakivo-linearIndigo font-medium uppercase tracking-wider">
              Executive Readiness Protocol
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-linear-heading">
              Ready to de-risk your operational core?
            </h3>
            <p className="text-xs md:text-sm text-[#8A8F98] font-normal">
              Connect with a senior architect for a high-fidelity diagnostic of your current infrastructure, Odoo 19 readiness, and PIPEDA data residency.
            </p>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Sparkles size={15} /> Start Technical Intake
          </button>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10 max-w-7xl mx-auto">
          
          {/* Col 1: Brand & Sovereignty */}
          <div className="lg:col-span-2 space-y-6">
            <Logo light={true} />
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              Oakivo Solutions Inc. is Canada's premier Odoo 19 Implementation Partner and Agentic AI consultancy. We architect industrial digital cores, ERP resilience, and sovereign cybersecurity.
            </p>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2 max-w-sm">
              <span className="text-[10px] font-mono-tech text-oakivo-accent font-bold uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck size={14} /> Sovereign Data Security
              </span>
              <p className="text-[11px] text-gray-400">
                100% Canadian data residency in Montreal & Toronto data hubs. PIPEDA, Quebec Law 25, and SOC2 Type II compliance guaranteed.
              </p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-white">
              Core Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><NavLink to={NavRoute.HOME} className="hover:text-oakivo-secondary transition-colors">Home</NavLink></li>
              <li><NavLink to={NavRoute.VERTICALS} className="hover:text-oakivo-secondary transition-colors">Industries</NavLink></li>
              <li><NavLink to={NavRoute.SERVICES} className="hover:text-oakivo-secondary transition-colors">Technical Pillars</NavLink></li>
              <li><NavLink to={NavRoute.CASE_STUDIES} className="hover:text-oakivo-secondary transition-colors">Case Studies</NavLink></li>
              <li><NavLink to={NavRoute.COMPLIANCE} className="hover:text-oakivo-secondary transition-colors">Compliance Matrix</NavLink></li>
              <li><NavLink to={NavRoute.BLOG} className="hover:text-oakivo-secondary transition-colors">Perspectives & Briefs</NavLink></li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-white">
              Specialized Hubs
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><button onClick={() => setIsDrawerOpen(true)} className="hover:text-oakivo-secondary transition-colors text-left">Odoo 19 Sovereign Shift</button></li>
              <li><button onClick={() => setIsDrawerOpen(true)} className="hover:text-oakivo-secondary transition-colors text-left">Agentic AI Reasoning Engines</button></li>
              <li><button onClick={() => setIsDrawerOpen(true)} className="hover:text-oakivo-secondary transition-colors text-left">PIPEDA & Zero-Trust Audit</button></li>
              <li><button onClick={() => setIsDrawerOpen(true)} className="hover:text-oakivo-secondary transition-colors text-left">CRA Tax Engine Localization</button></li>
              <li><NavLink to={NavRoute.BOOKING} className="hover:text-oakivo-secondary transition-colors">Schedule Discovery Call</NavLink></li>
            </ul>
          </div>

          {/* Col 4: Hub Locations */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-white">
              Hub Locations
            </h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-oakivo-secondary shrink-0 mt-0.5" />
                <span>Dieppe / Moncton Hub, NB</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-oakivo-secondary shrink-0 mt-0.5" />
                <span>Financial District, Toronto, ON</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-oakivo-secondary shrink-0 mt-0.5" />
                <span>Innovation District, Montreal, QC</span>
              </li>
              <li className="pt-2">
                <a href="mailto:contact@oakivo.com" className="text-oakivo-secondary font-bold hover:underline flex items-center gap-1.5 text-xs">
                  <Mail size={14} /> contact@oakivo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights & Admin Link */}
        <div className="pt-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono-tech">
          <p>© {new Date().getFullYear()} Oakivo Solutions Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <NavLink to={NavRoute.PRIVACY} className="hover:text-white transition-colors">Privacy & PIPEDA</NavLink>
            <NavLink to={NavRoute.COMPLIANCE} className="hover:text-white transition-colors">SOC2 Matrix</NavLink>
            <Link to={NavRoute.ADMIN_PORTAL} className="flex items-center gap-1 text-gray-500 hover:text-oakivo-secondary transition-colors">
              <Lock size={12} /> Executive Vault
            </Link>
          </div>
        </div>
      </div>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </footer>
  );
};

export default Footer;
