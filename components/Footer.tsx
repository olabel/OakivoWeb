import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Mail, Sparkles, Lock } from 'lucide-react';
import Logo from './Logo';
import { NavRoute } from '../types';
import LeadDrawer from './LeadDrawer';

const Footer: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <footer className="bg-[#070A0F] text-white border-t border-white/10 relative overflow-hidden pt-20 pb-12">
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Callout Card */}
        <div className="max-w-7xl mx-auto linear-card rounded-2xl md:rounded-3xl p-8 md:p-12 border border-white/[0.08] mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-2.5 max-w-xl">
            <span className="text-[10px] font-mono-tech text-emerald-400 font-medium uppercase tracking-wider">
              Free 15-Minute Invoice Audit
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-linear-heading">
              Ready to stop wasting payroll hours on manual invoicing?
            </h3>
            <p className="text-xs md:text-sm text-[#8A8F98] font-normal">
              Book a free 15-minute audit. We will review your current invoicing workflow and show you how connecting your existing software removes the need to fill scarce office admin roles.
            </p>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Sparkles size={15} /> Book Your Free 15-Minute Invoice Audit
          </button>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10 max-w-7xl mx-auto">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Logo light={true} />
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              Oakivo Solutions builds custom automated bridges between your existing accounting, inventory, and scheduling software so your team stops losing hours to manual data entry across Atlantic Canada.
            </p>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2 max-w-sm">
              <span className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck size={14} /> Atlantic Canada Regional Focus
              </span>
              <p className="text-[11px] text-gray-400">
                Grounded, responsive done-for-you automation support for businesses in New Brunswick, Nova Scotia, Prince Edward Island, and Newfoundland.
              </p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><NavLink to={NavRoute.HOME} className="hover:text-emerald-400 transition-colors">Home</NavLink></li>
              <li><NavLink to={NavRoute.SERVICES} className="hover:text-emerald-400 transition-colors">Services & Process</NavLink></li>
              <li><NavLink to={NavRoute.CASE_STUDIES} className="hover:text-emerald-400 transition-colors">Case Studies</NavLink></li>
              <li><NavLink to={NavRoute.ABOUT} className="hover:text-emerald-400 transition-colors">About Us</NavLink></li>
              <li><NavLink to={NavRoute.CONTACT} className="hover:text-emerald-400 transition-colors">Free Operational Audit</NavLink></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-white">
              Automation Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><NavLink to={NavRoute.SOLUTION_INVOICE} className="hover:text-emerald-400 transition-colors">Accounting & Invoice Sync</NavLink></li>
              <li><NavLink to={NavRoute.SOLUTION_INVENTORY} className="hover:text-emerald-400 transition-colors">Order & Inventory Bridges</NavLink></li>
              <li><NavLink to={NavRoute.SOLUTION_DISPATCH} className="hover:text-emerald-400 transition-colors">Dispatch & Route Logging</NavLink></li>
              <li><NavLink to={NavRoute.SOLUTION_REPORTING} className="hover:text-emerald-400 transition-colors">Custom Report Automation</NavLink></li>
            </ul>
          </div>

          {/* Col 4: Regional Coverage */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-white">
              Service Area
            </h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li>
                <NavLink to={NavRoute.LOCATION_NB} className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <MapPin size={14} className="text-emerald-400 shrink-0" />
                  <span>New Brunswick</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={NavRoute.LOCATION_NS} className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <MapPin size={14} className="text-emerald-400 shrink-0" />
                  <span>Nova Scotia</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={NavRoute.LOCATION_PEI} className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <MapPin size={14} className="text-emerald-400 shrink-0" />
                  <span>Prince Edward Island</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={NavRoute.LOCATION_NL} className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <MapPin size={14} className="text-emerald-400 shrink-0" />
                  <span>Newfoundland & Labrador</span>
                </NavLink>
              </li>
              <li className="pt-2">
                <a href="mailto:hello@oakivo.com" className="text-emerald-400 font-bold hover:underline flex items-center gap-1.5 text-xs">
                  <Mail size={14} /> hello@oakivo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono-tech">
          <p>© {new Date().getFullYear()} Oakivo Solutions Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <NavLink to={NavRoute.PRIVACY} className="hover:text-white transition-colors">Privacy Policy</NavLink>
            <NavLink to={NavRoute.COMPLIANCE} className="hover:text-white transition-colors">Security Guarantee</NavLink>
          </div>
        </div>
      </div>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </footer>
  );
};

export default Footer;
