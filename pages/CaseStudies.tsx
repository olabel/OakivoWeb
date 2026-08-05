import React from 'react';
import { 
  TrendingUp, CheckCircle2, ArrowRight, Zap, 
  Layers, FileText, Sparkles, Clock, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import SEO from '../components/SEO';

interface CaseStudyItem {
  id: string;
  client: string;
  industry: string;
  location: string;
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
    id: 'atlantic-seafood-logistics',
    client: 'Maritime Seafood & Cold Storage',
    industry: 'Seafood Processing & Distribution',
    location: 'Shediac, New Brunswick',
    title: 'Automating Order Intake & Cold-Chain Inventory Sync',
    challenge: 'Staff were spending 3 hours every morning manually re-entering faxed, emailed, and phone orders into both QuickBooks accounting and their warehouse cold-storage tracking software, leading to order typos and shipping delays during peak lobster season.',
    solution: 'Oakivo built an automated workflow bridge connecting incoming digital orders directly to QuickBooks and warehouse inventory tags. Invoices and shipping manifests are now generated instantly upon order confirmation.',
    results: [
      { metric: '15 Hours', label: 'Saved Per Week in Office Admin' },
      { metric: '0 Typo Errors', label: 'In Bill-of-Lading & Invoices' },
      { metric: 'Same-Day', label: 'Fulfillment Processing Time' }
    ],
    testimonial: {
      quote: 'Oakivo saved our office staff 15 hours of painful data entry every single week. Peak harvest season used to be pure panic—now our orders flow automatically without missing a beat.',
      author: 'Robert LeBlanc',
      role: 'General Manager'
    }
  },
  {
    id: 'maritime-equipment-supplier',
    client: 'Acadian Industrial Parts',
    industry: 'Equipment & Auto Parts Wholesaler',
    location: 'Halifax, Nova Scotia',
    title: 'Connecting E-Commerce Orders with Regional Supplier Inventories',
    challenge: 'Customer service agents had to manually open three separate supplier portals to copy part numbers and verify stock levels whenever a regional client submitted a wholesale order.',
    solution: 'Oakivo created an automated background integration that syncs real-time inventory counts across supplier feeds directly into Acadian’s online portal and accounting logs.',
    results: [
      { metric: '12 Hours', label: 'Reclaimed Staff Hours / Week' },
      { metric: 'Instant', label: 'Stock Verification for Clients' },
      { metric: '25%', label: 'Increase in Daily Order Capacity' }
    ],
    testimonial: {
      quote: 'We didn’t have to buy expensive new software or change how we work. Oakivo made our existing tools talk to each other seamlessly. Our team can handle 25% more orders effortlessly.',
      author: 'David Cormier',
      role: 'Operations Director'
    }
  },
  {
    id: 'pei-potato-distribution',
    client: 'Island Harvest Logistics',
    industry: 'Agricultural Produce Transport',
    location: 'Charlottetown, PEI',
    title: 'Automating Truck Dispatching & Weekly Driver Payroll Collation',
    challenge: 'Every Friday, the office manager spent 6 grueling hours collecting paper trip tickets and copy-pasting haul metrics into spreadsheets to prepare driver payments and client billing.',
    solution: 'Oakivo implemented a simple mobile trip logging form that feeds directly into QuickBooks and automated payroll sheets in real time, eliminating paper forms entirely.',
    results: [
      { metric: '6 Hours', label: 'Saved Every Friday Afternoon' },
      { metric: '100%', label: 'Paperless Dispatch Logs' },
      { metric: '24-Hour', label: 'Faster Client Invoicing Cycle' }
    ],
    testimonial: {
      quote: 'Friday afternoon payroll used to take up my entire day. Oakivo turned a 6-hour nightmare into a 5-minute automated click. I finally get my Fridays back.',
      author: 'Karen MacLeod',
      role: 'Finance & Operations Lead'
    }
  }
];

const CaseStudies: React.FC = () => {
  return (
    <>
      <SEO 
        title="Atlantic Canada Automation Case Studies & Results | Oakivo Solutions"
        description="See how Atlantic Canada businesses in New Brunswick, Nova Scotia, and PEI saved 10 to 15 hours per week by connecting their existing software tools with Oakivo Solutions."
        canonical="/case-studies"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <TrendingUp size={13} className="text-emerald-400" />
              <span className="text-[11px] font-mono-tech font-medium text-gray-300">
                Atlantic Canada Client Results
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-linear-heading leading-[1.06]">
              Real Hours Saved for <span className="text-linear-accent font-semibold">Atlantic Canada Businesses</span>
            </h1>

            <p className="text-lg md:text-xl text-[#8A8F98] font-normal leading-relaxed max-w-3xl tracking-linear-normal">
              Explore concrete examples of how local businesses across New Brunswick, Nova Scotia, and PEI eliminated manual copy-paste admin work and reclaimed staff hours.
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
                      <span className="text-xs font-mono-tech text-emerald-400 uppercase tracking-wider block">
                        Case Study 0{idx + 1} • {study.location}
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
                        <span className="text-xs font-mono-tech text-emerald-400 mt-1 block">
                          {res.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Challenge & Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 p-5 rounded-xl bg-black/40 border border-white/[0.06]">
                      <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-amber-400">
                        Operational Challenge
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    <div className="space-y-2 p-5 rounded-xl bg-black/40 border border-white/[0.06]">
                      <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-emerald-400">
                        The Done-For-You Solution
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                    <p className="text-sm md:text-base text-gray-200 italic font-normal leading-relaxed">
                      "{study.testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-gray-400">
                      <span className="text-white font-bold">{study.testimonial.author}</span>
                      <span>—</span>
                      <span className="text-emerald-400">{study.testimonial.role}, {study.client}</span>
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
                Ready to Reclaim Your Staff Hours?
              </h2>
              <p className="text-sm md:text-base text-[#8A8F98] max-w-2xl mx-auto">
                Book a free 15-minute invoice audit with our Atlantic Canada team today.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={NavRoute.CONTACT}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group transition-all"
              >
                <span>Book Your Free 15-Minute Invoice Audit</span>
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
