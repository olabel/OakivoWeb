import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface FAQItem {
  questionEn: string;
  questionFr: string;
  answerEn: string;
  answerFr: string;
}

const faqs: FAQItem[] = [
  {
    questionEn: "What is the typical timeline for a DevSecOps security implementation?",
    questionFr: "Quel est le délai habituel pour une implémentation DevSecOps et sécurité ?",
    answerEn: "Most initial compliance and security posture implementations take between 4 to 8 weeks. This includes an initial architecture audit, gap analysis, deploying Zero-Trust principles, and configuring CI/CD pipeline guardrails. For continuous SOC 2 or ISO 27001 readiness, we recommend a 3 to 6-month structured roadmap.",
    answerFr: "La plupart des déploiements initiaux de conformité et de posture de sécurité prennent entre 4 et 8 semaines. Cela inclut l'audit d'architecture initial, l'analyse d'écarts, le déploiement des principes Zéro Confiance et la configuration des garde-fous CI/CD. Pour une préparation continue SOC 2 ou ISO 27001, nous recommandons une feuille de route structurée de 3 à 6 mois."
  },
  {
    questionEn: "How do you estimate compliance and infrastructure costs?",
    questionFr: "Comment estimez-vous les coûts de conformité et d'infrastructure ?",
    answerEn: "Costs are determined by the scale of your current infrastructure, the regulatory frameworks required (such as SOC 2, PIPEDA, or ISO 27001), and the complexity of your pipelines. We offer a transparent, phased pricing model starting with a flat-rate baseline audit, followed by modular implementations tailored to your budget and growth trajectory.",
    answerFr: "Les coûts sont déterminés par l'envergure de votre infrastructure actuelle, les cadres réglementaires requis (tels que SOC 2, PIPEDA/LPRPDE ou ISO 27001) et la complexité de vos pipelines. Nous proposons un modèle tarifaire transparent et échelonné, débutant par un audit initial à forfait, suivi d'implémentations modulaires adaptées à votre budget et à votre croissance."
  },
  {
    questionEn: "Will implementing these security guardrails slow down our developers?",
    questionFr: "La mise en place de ces garde-fous va-t-elle ralentir nos développeurs ?",
    answerEn: "No. In fact, our DevSecOps philosophy is 'Security at the Speed of Engineering'. By shifting security left and automating vulnerability scanning within your CI/CD pipelines, developers receive instant feedback in their pull requests, eliminating late-stage deployment bottlenecks.",
    answerFr: "Non. Notre philosophie DevSecOps est « La sécurité à la vitesse de l'ingénierie ». En intégrant la sécurité en amont (shift-left) et en automatisant la détection des vulnérabilités dans vos pipelines CI/CD, les développeurs reçoivent une rétroaction immédiate dans leurs requêtes d'extraction, éliminant ainsi les blocages de déploiement."
  },
  {
    questionEn: "Do you provide ongoing support after the initial implementation?",
    questionFr: "Fournissez-vous un soutien continu après l'implémentation initiale ?",
    answerEn: "Yes. We offer fully managed Site Reliability Engineering (SRE) and continuous compliance monitoring as a retainer service. This ensures that as your team ships new features, your security posture remains hardened and audit-ready.",
    answerFr: "Oui. Nous offrons des services d'Ingénierie de Fiabilité de Site (SRE) entièrement gérés et une surveillance continue de la conformité sous forme de mandat mensuel. Cela garantit qu'au fur et à mesure que votre équipe livre de nouvelles fonctionnalités, votre posture de sécurité demeure durcie et prête pour les audits."
  }
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 border-t border-slate-900 bg-[#070A0F] relative">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase mb-3">
            {isFr ? 'QUESTIONS FRÉQUEMMENT POSÉES' : 'FREQUENTLY ASKED QUESTIONS'}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-5 text-slate-100">
            {isFr ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {isFr 
              ? 'Réponses claires sur les délais, les coûts de conformité et l\'accélération de vos équipes de développement.'
              : 'Clear answers on timelines, compliance costs, and how our process automation scales with your engineering team.'
            }
          </p>
        </div>
        
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const question = isFr ? faq.questionFr : faq.questionEn;
            const answer = isFr ? faq.answerFr : faq.answerEn;
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className="border border-slate-800/80 bg-slate-900/40 rounded-xl overflow-hidden transition-colors hover:border-slate-700/80"
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer group"
                >
                  <span className={`text-base md:text-lg font-medium pr-6 transition-colors ${isOpen ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'}`}>
                    {question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-cyan-950/60 border-cyan-500/30' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-slate-300 font-light leading-relaxed text-sm md:text-base border-t border-slate-800/40 pt-4">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
