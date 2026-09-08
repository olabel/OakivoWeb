import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "What is the typical timeline for a DevSecOps security implementation?",
    answer: "Most initial compliance and security posture implementations take between 4 to 8 weeks. This includes an initial architecture audit, gap analysis, deploying Zero-Trust principles, and configuring CI/CD pipeline guardrails. For continuous SOC 2 or ISO 27001 readiness, we recommend a 3 to 6-month structured roadmap."
  },
  {
    question: "How do you estimate compliance and infrastructure costs?",
    answer: "Costs are determined by the scale of your current infrastructure, the regulatory frameworks required (such as SOC 2, PIPEDA, or ISO 27001), and the complexity of your pipelines. We offer a transparent, phased pricing model starting with a flat-rate baseline audit, followed by modular implementations tailored to your budget and growth trajectory."
  },
  {
    question: "Will implementing these security guardrails slow down our developers?",
    answer: "No. In fact, our DevSecOps philosophy is 'Security at the Speed of Engineering'. By shifting security left and automating vulnerability scanning within your CI/CD pipelines, developers receive instant feedback in their pull requests, eliminating late-stage deployment bottlenecks."
  },
  {
    question: "Do you provide ongoing support after the initial implementation?",
    answer: "Yes. We offer fully managed Site Reliability Engineering (SRE) and continuous compliance monitoring as a retainer service. This ensures that as your team ships new features, your security posture remains hardened and audit-ready."
  }
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 border-t border-slate-800 bg-[#060a12] relative">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-slate-100">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 font-light text-lg max-w-2xl mx-auto">
            Clear answers on timelines, compliance costs, and how our process automation scales with your engineering team.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-slate-800/60 bg-slate-900/40 rounded-2xl overflow-hidden transition-colors hover:border-slate-700/60"
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-slate-200 pr-8">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDown size={18} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-slate-400 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
