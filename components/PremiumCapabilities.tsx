import React from 'react';
import { ArrowRight } from 'lucide-react';

const capabilities = [
  {
    id: '01',
    title: 'Cloud Security Posture (CSPM)',
    description: 'Automated cloud misconfiguration detection across AWS, Azure, and GCP. Real-time drift detection for Infrastructure-as-Code with continuous SOC 2 and PIPEDA mapping.',
    features: ['Real-time drift detection', 'Continuous compliance mapping', 'Push-button audit evidence']
  },
  {
    id: '02',
    title: 'DevSecOps Pipeline Engineering',
    description: 'Shift-left CI/CD security automation. Build fast and secure every commit with automated SAST, DAST, and container scanning integrated directly into GitHub Actions or GitLab.',
    features: ['Automated SAST & DAST', 'Container image scanning', 'CI/CD pipeline hardening']
  },
  {
    id: '03',
    title: 'Zero-Trust Architecture',
    description: 'Identity-first security perimeters. We replace legacy VPNs and static credentials with short-lived tokens, mTLS service meshes, and strict least-privilege IAM policies.',
    features: ['Identity-first networking', 'mTLS service meshes', 'Just-in-time (JIT) access']
  },
  {
    id: '04',
    title: 'Odoo Implementation & Digital Transformation',
    description: 'Comprehensive business management through Odoo ERP integration. We streamline workflows, automate complex processes, and secure enterprise data for sustainable growth.',
    features: ['Custom Odoo integration', 'Process automation', 'ERP security hardening']
  }
];

const PremiumCapabilities: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#070A0F] text-slate-100 border-t border-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column - Sticky Header */}
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-sm font-mono tracking-widest text-cyan-500 mb-6 uppercase">Our Expertise</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6 text-slate-100">
                Core Capabilities
              </h3>
              <p className="text-lg text-slate-400 font-light leading-relaxed mb-8">
                Foundational DevSecOps architecture engineered for scale, compliance, and velocity. We deliver enterprise-grade security without compromising deployment speed.
              </p>
              <a href="#engagement" className="inline-flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm tracking-wide uppercase group">
                Explore Methodology 
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column - Capability Rows */}
          <div className="lg:col-span-8 flex flex-col">
            {capabilities.map((cap, index) => (
              <div 
                key={cap.id} 
                className={`py-12 md:py-16 flex flex-col md:flex-row gap-8 md:gap-12 group transition-all duration-500 ${index === 0 ? 'pt-0 lg:pt-4' : 'border-t border-slate-800/60'}`}
              >
                {/* Minimalist Number */}
                <div className="shrink-0">
                  <span className="text-6xl md:text-7xl font-display font-light text-slate-800 group-hover:text-cyan-500/40 transition-colors duration-500 select-none">
                    {cap.id}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h4 className="text-2xl md:text-3xl font-display font-bold mb-6 text-slate-200 group-hover:text-cyan-400 transition-colors duration-300">
                    {cap.title}
                  </h4>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
                    {cap.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {cap.features.map(feature => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-slate-700 group-hover:bg-cyan-500 shrink-0 transition-colors duration-300"></span>
                        <span className="text-slate-300 text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PremiumCapabilities;
