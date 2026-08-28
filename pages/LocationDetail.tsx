import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, MapPin, CheckCircle2, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadDrawer from '../components/LeadDrawer';
import { NavRoute } from '../types';

interface LocationData {
  name: string;
  regionCode: string;
  keyHubs: string[];
  heroTitle: string;
  heroSubtitle: string;
  regionalContext: string;
  commonWorkflows: string[];
  localProof: {
    client: string;
    city: string;
    result: string;
  };
}

const locationsMap: Record<string, LocationData> = {
  'new-brunswick': {
    name: 'New Brunswick',
    regionCode: 'CA-NB',
    keyHubs: ['Moncton', 'Saint John', 'Fredericton', 'Dieppe', 'Miramichi'],
    heroTitle: 'Done-For-You Workflow Automation in New Brunswick',
    heroSubtitle: 'Connecting accounting, dispatch, and inventory tools for New Brunswick businesses so staff stops losing hours to manual data entry.',
    regionalContext: 'From distribution centres in Moncton to field services in Saint John and professional teams in Fredericton, New Brunswick SMBs waste full-time salaries copying invoice numbers and job details between software tools. We build invisible bridges between your existing tools.',
    commonWorkflows: [
      'Moncton Distribution: Shopify & QuickBooks inventory synchronization',
      'Saint John Field Dispatch: Mobile work order logs directly to billing',
      'Fredericton Services: Automatic client onboarding & contract logging'
    ],
    localProof: {
      client: 'Heavy Equipment & Parts Supplier',
      city: 'Moncton, NB',
      result: 'Reclaimed 14 staff hours per week by connecting counter sales to accounting.'
    }
  },
  'nova-scotia': {
    name: 'Nova Scotia',
    regionCode: 'CA-NS',
    keyHubs: ['Halifax', 'Dartmouth', 'Sydney', 'Truro', 'New Glasgow'],
    heroTitle: 'Done-For-You Workflow Automation in Nova Scotia',
    heroSubtitle: 'Helping Nova Scotia businesses eliminate manual copy-pasting between accounting, inventory, and operational software.',
    regionalContext: 'Nova Scotia businesses in Halifax, Dartmouth, and Cape Breton are growing rapidly - but growth often stalls when admin paperwork explodes. We integrate the software tools you already pay for, freeing up staff without requiring new software purchases.',
    commonWorkflows: [
      'Halifax Wholesale: Automated order processing from email into accounting',
      'Dartmouth Trade Services: Driver route logs connected directly to customer invoicing',
      'Sydney Maritime Supply: Real-time warehouse inventory reconciliation'
    ],
    localProof: {
      client: 'Atlantic Marine & Industrial Supply',
      city: 'Halifax, NS',
      result: 'Eliminated 15 hours of weekly manual invoice entry across 2 warehouses.'
    }
  },
  'prince-edward-island': {
    name: 'Prince Edward Island',
    regionCode: 'CA-PE',
    keyHubs: ['Charlottetown', 'Summerside', 'Cornwall', 'Stratford'],
    heroTitle: 'Done-For-You Workflow Automation in Prince Edward Island',
    heroSubtitle: 'Connecting spreadsheets, accounting, and scheduling software for PEI food processors, suppliers, and service businesses.',
    regionalContext: 'PEI businesses face seasonal demands where administrative efficiency is crucial. We help island businesses connect their existing software tools to automate order tracking, invoicing, and reporting.',
    commonWorkflows: [
      'Charlottetown Logistics: Daily inventory summaries delivered directly to GM inbox',
      'Summerside Food Processing: Batch quality tracking integrated with accounting',
      'Island Trade Services: Mobile field ticket sign-offs pushed live to customer billing'
    ],
    localProof: {
      client: 'Island Food Processing Cooperative',
      city: 'Charlottetown, PEI',
      result: 'Automated daily report consolidation, saving 10 hours of management time per week.'
    }
  },
  'newfoundland-labrador': {
    name: 'Newfoundland & Labrador',
    regionCode: 'CA-NL',
    keyHubs: ["St. John's", 'Corner Brook', 'Grand Falls-Windsor', 'Gander', 'Labrador City'],
    heroTitle: "Done-For-You Workflow Automation in Newfoundland & Labrador",
    heroSubtitle: "Connecting operations, dispatch, and financial software for Newfoundland and Labrador businesses.",
    regionalContext: "Operating across vast distances requires tight communication between field teams, warehouses, and head offices in St. John's and Corner Brook. We connect your existing software endpoints so work logs and invoices flow without manual delays.",
    commonWorkflows: [
      "St. John's Fleet Operations: Automated equipment hour tracking to job costing",
      "Corner Brook Supply: Synchronizing purchase orders with vendor invoices",
      "Labrador Industrial: Remote site time tracking pushed to payroll"
    ],
    localProof: {
      client: 'NL Logistics & Field Services',
      city: "St. John's, NL",
      result: 'Cut billing turnaround time from 7 days to 2 hours after job completion.'
    }
  }
};

const LocationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const locKey = slug || 'new-brunswick';
  const location = locationsMap[locKey] || locationsMap['new-brunswick'];

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `Oakivo Solutions - ${location.name}`,
    'description': location.heroSubtitle,
    'address': {
      '@type': 'PostalAddress',
      'addressRegion': location.name,
      'addressCountry': 'CA'
    },
    'areaServed': location.keyHubs.map(hub => ({
      '@type': 'City',
      'name': `${hub}, ${location.name}`
    }))
  };

  return (
    <>
      <SEO 
        title={`Invoice Automation in ${location.name} | Oakivo`}
        description={location.heroSubtitle}
        canonical={`/locations/${locKey}`}
        schema={localBusinessSchema}
      />

      <section className="bg-slate-950 text-white pt-36 pb-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <Link to={NavRoute.HOME} className="inline-flex items-center gap-2 text-cyan-400 mb-8 hover:underline font-mono font-bold uppercase tracking-wider text-xs">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full mb-6">
            <MapPin size={16} className="text-cyan-400" />
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
              Regional Automation • {location.name}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-6">
            {location.heroTitle}
          </h1>

          <p className="text-base md:text-xl text-[#8A8F98] leading-relaxed font-normal mb-8">
            {location.heroSubtitle}
          </p>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} /> Schedule Your Operational Audit
          </button>
        </div>
      </section>

      <Section className="bg-slate-900 text-white py-20 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-16">
          
          {/* Key Hubs */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-3xl p-8 border border-white/10 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin size={18} className="text-cyan-400" /> Serving Key Business Communities in {location.name}
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {location.keyHubs.map((hub, i) => (
                <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-emerald-300">
                  {hub}
                </span>
              ))}
            </div>
          </div>

          {/* Regional Context */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Local Operational Context</h2>
            <p className="text-base text-gray-300 leading-relaxed font-light">{location.regionalContext}</p>
          </div>

          {/* Typical Regional Integrations */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Common Automation Solutions in {location.name}</h2>
            <div className="space-y-3">
              {location.commonWorkflows.map((flow, i) => (
                <div key={i} className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl p-5 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-gray-200 font-medium">{flow}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Local Outcome */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-3xl p-8 border border-white/10 space-y-4">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-widest block">
              Regional Client Spotlight
            </span>
            <h3 className="text-xl font-bold text-white">{location.localProof.client} ({location.localProof.city})</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light">{location.localProof.result}</p>
          </div>

          {/* Final Callout */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-3xl p-8 md:p-12 border border-white/10 text-center space-y-6">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">
              Operational Audit
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Stop losing staff payroll hours to manual data entry in {location.name}.
            </h2>
            <p className="text-xs md:text-sm text-gray-400 font-light max-w-xl mx-auto">
              Schedule a 15-minute operational audit with an Atlantic Canada automation specialist.
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} /> Schedule Your Operational Audit
            </button>
          </div>

        </div>
      </Section>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default LocationDetail;
