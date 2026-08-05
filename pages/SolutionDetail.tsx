import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Clock, FileText, Layers, Database, ArrowLeft } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadDrawer from '../components/LeadDrawer';
import { NavRoute } from '../types';

interface SolutionData {
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  benefits: string[];
  useCase: {
    client: string;
    location: string;
    challenge: string;
    outcome: string;
    hoursSaved: string;
  };
  faq: { question: string; answer: string }[];
}

const solutionsMap: Record<string, SolutionData> = {
  'invoice-automation': {
    title: 'Accounting & Invoice Synchronization',
    subtitle: 'Eliminate manual invoice typing between email, CRM, and accounting software.',
    description: 'We build direct automated bridges connecting your sales, dispatch, or customer portals directly into QuickBooks Online, Xero, or Sage—so invoices generate automatically without double data entry.',
    icon: FileText,
    benefits: [
      'Automatic invoice creation from closed orders or dispatch logs',
      'Instant customer payment status sync back to your operational database',
      'Zero double-entry typos across billing codes and line items',
      'Automatic email receipt forwarding to accounting inbox'
    ],
    useCase: {
      client: 'Atlantic Wholesale & Supply',
      location: 'Halifax, Nova Scotia',
      challenge: 'Staff spent 14 hours per week copying PDF invoice details into QuickBooks Online manually.',
      outcome: 'Invoices now post to QuickBooks automatically upon order confirmation, eliminating 100% of double-entry tasks.',
      hoursSaved: '14 staff hours saved per week'
    },
    faq: [
      {
        question: 'Do we need to switch from our existing QuickBooks or Sage account?',
        answer: 'No. We work directly with your existing software and subscription. No new software to buy.'
      },
      {
        question: 'How long does implementation take?',
        answer: 'Most accounting integrations are built, tested in sandbox, and live within 5 to 10 business days with zero downtime.'
      }
    ]
  },
  'order-inventory-sync': {
    title: 'Order & Inventory Bridges',
    subtitle: 'Keep warehouse counts and online order logs perfectly in sync 24/7.',
    description: 'Stop overselling or manually updating inventory spreadsheets. We connect your e-commerce platform, POS, and warehouse management system so stock updates automatically with every sale.',
    icon: Layers,
    benefits: [
      'Real-time inventory deduction across all sales channels',
      'Automated purchase order alerts when stock dips below thresholds',
      'Centralized order logging across regional branch locations',
      'Eliminate manual stock-taking spreadsheets'
    ],
    useCase: {
      client: 'Maritime Equipment & Industrial',
      location: 'Moncton, New Brunswick',
      challenge: 'Counter staff were constantly cross-referencing warehouse whiteboards with inventory spreadsheets.',
      outcome: 'Automated order-to-inventory bridge synchronized stock levels live across 3 regional branches.',
      hoursSaved: '12 staff hours saved per week'
    },
    faq: [
      {
        question: 'Will this work with older custom database systems?',
        answer: 'Yes, we build custom API or database connectors for legacy systems as well as cloud-based software.'
      }
    ]
  },
  'dispatch-route-logging': {
    title: 'Dispatch & Route Logging Automation',
    subtitle: 'Connect field service job completions directly to customer billing and payroll.',
    description: 'When drivers or technicians complete jobs in the field, we ensure work logs, timestamps, and parts used flow instantly into your billing and job-costing software.',
    icon: Clock,
    benefits: [
      'Instant field-to-office job ticket delivery',
      'Automated hours and mileage logging for technician payroll',
      'Faster invoice turnaround on completed service calls',
      'No missing paperwork or delayed billing cycles'
    ],
    useCase: {
      client: 'Bay Logistics & Service Fleet',
      location: 'Saint John, New Brunswick',
      challenge: 'Technicians submitted paper work orders at the end of each week, delaying customer billing by 7 days.',
      outcome: 'Job completions now trigger immediate draft invoices upon mobile sign-off by customer.',
      hoursSaved: '15 staff hours saved per week'
    },
    faq: [
      {
        question: 'Can technicians use their existing mobile phones or tablets?',
        answer: 'Yes. We connect with mobile apps your team already uses or set up simple mobile forms.'
      }
    ]
  },
  'custom-report-automation': {
    title: 'Custom Executive Report Automation',
    subtitle: 'Consolidate operational spreadsheets into clean, daily executive dashboards.',
    description: 'Stop waiting until month-end to understand your operational numbers. We automatically aggregate data from sales, payroll, inventory, and accounting into one daily summary.',
    icon: Database,
    benefits: [
      'Automated daily email digests summarizing key operational metrics',
      'Real-time KPI tracking across all regional branches',
      'No manual copy-pasting between separate Excel sheets',
      'Accurate cash flow and pipeline forecasting'
    ],
    useCase: {
      client: 'Island Food Processing & Supply',
      location: 'Charlottetown, Prince Edward Island',
      challenge: 'General manager spent 3 hours every Monday compiling operational numbers from 4 departments.',
      outcome: 'Automated morning report now delivers consolidated KPIs straight to inbox at 7:00 AM daily.',
      hoursSaved: '10 staff hours saved per week'
    },
    faq: [
      {
        question: 'Can we receive the report directly via email or text?',
        answer: 'Yes, reports can be delivered as PDF attachments, Slack/Teams notifications, or live web dashboards.'
      }
    ]
  }
};

const SolutionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const solutionKey = slug || 'invoice-automation';
  const solution = solutionsMap[solutionKey] || solutionsMap['invoice-automation'];
  const IconComponent = solution.icon;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': solution.faq.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': solution.title,
    'description': solution.description,
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'Oakivo Solutions',
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': 'Atlantic Canada',
        'addressCountry': 'CA'
      }
    },
    'areaServed': ['New Brunswick', 'Nova Scotia', 'Prince Edward Island', 'Newfoundland and Labrador']
  };

  return (
    <>
      <SEO 
        title={`${solution.title} | Oakivo Solutions Atlantic Canada`}
        description={solution.subtitle}
        canonical={`/solutions/${solutionKey}`}
        schema={[serviceSchema, faqSchema]}
      />

      <section className="bg-[#070A0F] text-white pt-36 pb-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <Link to={NavRoute.SERVICES} className="inline-flex items-center gap-2 text-emerald-400 mb-8 hover:underline font-mono-tech font-bold uppercase tracking-wider text-xs">
            <ArrowLeft size={16} /> All Solutions & Process
          </Link>

          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full mb-6">
            <IconComponent size={16} className="text-emerald-400" />
            <span className="text-[11px] font-mono-tech text-emerald-400 font-bold uppercase tracking-widest">
              Done-For-You Workflow Integration
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-linear-heading mb-6">
            {solution.title}
          </h1>

          <p className="text-base md:text-xl text-[#8A8F98] leading-relaxed font-normal mb-8">
            {solution.subtitle}
          </p>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} /> Book Your Free 15-Minute Operational Audit
          </button>
        </div>
      </section>

      <Section className="bg-[#0B0F17] text-white py-20 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-16">
          
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">How It Works</h2>
            <p className="text-base text-gray-300 leading-relaxed font-light">{solution.description}</p>
          </div>

          {/* Key Benefits */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Key Features & Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solution.benefits.map((benefit, idx) => (
                <div key={idx} className="linear-card rounded-2xl p-5 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-gray-200 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Case Example */}
          <div className="linear-card rounded-3xl p-8 border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono-tech uppercase text-emerald-400 font-bold tracking-widest">
                Regional Case Study
              </span>
              <span className="text-xs font-mono-tech text-gray-400">{solution.useCase.location}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{solution.useCase.client}</h3>
            <div className="space-y-2 text-xs md:text-sm text-gray-300">
              <p><strong className="text-white">Challenge:</strong> {solution.useCase.challenge}</p>
              <p><strong className="text-white">Solution Outcome:</strong> {solution.useCase.outcome}</p>
            </div>
            <div className="pt-4 border-t border-white/10 text-emerald-400 font-mono-tech font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} /> {solution.useCase.hoursSaved}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {solution.faq.map((item, i) => (
                <div key={i} className="linear-card rounded-2xl p-6 border border-white/10 space-y-2">
                  <h3 className="text-base font-bold text-white">{item.question}</h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final Callout */}
          <div className="linear-card rounded-3xl p-8 md:p-12 border border-white/10 text-center space-y-6">
            <span className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-widest block">
              Start Free
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to eliminate manual data entry in your operations?
            </h2>
            <p className="text-xs md:text-sm text-gray-400 font-light max-w-xl mx-auto">
              Book a free 15-minute operational audit. We'll show you exactly how to connect your tools without buying expensive new software.
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} /> Book Your Free 15-Minute Operational Audit
            </button>
          </div>

        </div>
      </Section>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default SolutionDetail;
