import React, { useState } from 'react';
import { 
  TrendingUp, ShieldCheck, CheckCircle2, ArrowRight, Zap, 
  BarChart3, Cpu, Layers, Server, Activity, Lock, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import SEO from '../components/SEO';

interface CaseStudyItem {
  id: string;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

const caseStudiesData: CaseStudyItem[] = [
  {
    id: 'paycore-fintech',
    client: 'PayCore Solutions',
    industry: 'FinTech Scale-up',
    title: 'High-Availability Database Refactoring & Cloud Cost Optimization',
    challenge: 'PayCore Solutions, a fast-scaling payment processor, was experiencing severe database locks during peak transaction hours, leading to sub-optimal API performance, an unsustainable $180,000/month cloud overspend, and looming PCI-DSS audit deadlines.',
    solution: 'Oakivo refactored their monolithic MySQL setup into high-availability AWS Aurora clusters with auto-sharding. We replaced manual cloud management with automated Terraform Infrastructure as Code (IaC) and implemented real-time API monitoring with micro-second latency tracing.',
    results: [
      { metric: '42%', label: 'Cloud Spend Reduction' },
      { metric: '99.99%', label: 'Core API Uptime Achieved' },
      { metric: '0ms', label: 'Downtime During Migration' }
    ],
    testimonial: {
      quote: 'Oakivo eliminated our database lockup issues in weeks while reducing our cloud bill by over $75,000 a month. Their senior engineers delivered what three previous agencies couldn’t.',
      author: 'David Vance',
      role: 'VP of Infrastructure, PayCore Solutions'
    }
  },
  {
    id: 'medpulse-healthtech',
    client: 'MedPulse Data Systems',
    industry: 'HealthTech SaaS',
    title: 'Zero-Trust Architecture & Rapid SOC 2 / PIPEDA Compliance',
    challenge: 'MedPulse operated a legacy monolithic medical platform preparing for Series B funding. Their deployment pipeline took 4 hours of manual effort per release, and they faced urgent HIPAA, PIPEDA, and SOC 2 Type II compliance mandates required by enterprise healthcare buyers.',
    solution: 'Oakivo designed a zero-trust Kubernetes microservices architecture featuring automated least-privilege IAM governance, end-to-end TLS 1.3 encryption, GitOps CI/CD pipelines, and continuous vulnerability telemetry embedded directly into build pipelines.',
    results: [
      { metric: '45 Days', label: 'SOC 2 & PIPEDA Readiness' },
      { metric: '8 Mins', label: 'Deploy Time (Down from 4 hrs)' },
      { metric: '100%', label: 'Automated Security Auditing' }
    ],
    testimonial: {
      quote: 'Securing SOC 2 compliance in 45 days transformed our sales pipeline. Oakivo’s zero-trust blueprint gave our enterprise clients absolute confidence in our platform security.',
      author: 'Dr. Elena Rostova',
      role: 'CTO & Co-Founder, MedPulse Data'
    }
  },
  {
    id: 'omnitrack-logistics',
    client: 'OmniTrack Logistics',
    industry: 'Global Supply Chain & IoT',
    title: 'High-Throughput Telemetry Platform & Distributed Stream Processing',
    challenge: 'OmniTrack processes over 50 million IoT fleet data points daily. Intermittent telemetry latency spikes (P99 > 3,500ms) caused lost tracking updates during seasonal surges, alongside vulnerability exposures across unhardened REST API endpoints.',
    solution: 'Oakivo architected an event-driven Apache Kafka stream processing hub on AWS, established multi-region failover routing, hardened API Gateway authentication with rate-limiting, and deployed continuous automated penetration testing verification.',
    results: [
      { metric: '70%', label: 'P99 Latency Reduction' },
      { metric: '3.5x', label: 'Throughput Capacity Increase' },
      { metric: '0', label: 'Security Breaches in 18 Mos' }
    ],
    testimonial: {
      quote: 'Oakivo rebuilt our core streaming data layer to handle 3.5x our previous capacity effortlessly. The responsiveness and reliability of our IoT platform has never been higher.',
      author: 'Marcus Sterling',
      role: 'Head of Engineering, OmniTrack'
    }
  }
];

const CaseStudies: React.FC = () => {
  return (
    <>
      <SEO 
        title="Enterprise Engineering Case Studies & Impact | Oakivo"
        description="Explore how Oakivo engineered 99.99% uptime, reduced cloud spend by 40%, and accelerated SOC 2 compliance for enterprise clients."
        keywords="Cloud Engineering Case Studies, SOC 2 Compliance Success, Cloud Spend Reduction, DevOps ROI, Case Studies"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <TrendingUp size={13} className="text-oakivo-linearIndigo" />
              <span className="text-[11px] font-mono-tech font-medium text-gray-300">
                Verified Engineering Impact & Case Studies
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-linear-heading leading-[1.06]">
              Quantifiable Results Delivered to <span className="text-linear-accent">Enterprise Leaders</span>
            </h1>

            <p className="text-lg md:text-xl text-[#8A8F98] font-normal leading-relaxed max-w-3xl tracking-linear-normal">
              Explore concrete evidence of how Oakivo eliminates technical debt, optimizes cloud expenditure, and secures enterprise infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Cards */}
      <section className="py-20 md:py-28 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="space-y-16">
            {caseStudiesData.map((study, idx) => (
              <div 
                key={study.id}
                className="linear-card rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/[0.08] relative overflow-hidden"
              >
                <div className="space-y-8">
                  
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                    <div>
                      <span className="text-xs font-mono-tech text-oakivo-linearIndigo uppercase tracking-wider block">
                        Case Study 0{idx + 1} • {study.industry}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                        {study.client}: {study.title}
                      </h2>
                    </div>
                  </div>

                  {/* Quantitative Metric Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {study.results.map((res, rIdx) => (
                      <div key={rIdx} className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center">
                        <span className="text-2xl md:text-3xl font-extrabold font-mono-tech text-white block">
                          {res.metric}
                        </span>
                        <span className="text-xs font-mono-tech text-gray-400 mt-1 block">
                          {res.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Challenge & Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 p-5 rounded-xl bg-black/40 border border-white/[0.06]">
                      <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-rose-400">
                        Client Profile & Challenge
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    <div className="space-y-2 p-5 rounded-xl bg-black/40 border border-white/[0.06]">
                      <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-emerald-400">
                        The Oakivo Architecture Solution
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="p-6 rounded-xl bg-oakivo-linearIndigo/10 border border-oakivo-linearIndigo/20 space-y-3">
                    <p className="text-sm md:text-base text-gray-200 italic font-normal leading-relaxed">
                      "{study.testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-gray-400">
                      <span className="text-white font-bold">{study.testimonial.author}</span>
                      <span>—</span>
                      <span>{study.testimonial.role}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="linear-card rounded-2xl md:rounded-3xl p-8 md:p-14 border border-white/[0.08] text-center space-y-6 relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading">
                Achieve Similar Engineering Impact
              </h2>
              <p className="text-sm md:text-base text-[#8A8F98] max-w-2xl mx-auto">
                Request a custom architecture diagnostic for your infrastructure stack today.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={NavRoute.CONTACT}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group transition-all"
              >
                <span>Schedule Architecture Audit</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
