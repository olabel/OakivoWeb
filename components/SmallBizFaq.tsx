import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SmallBizFaq: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: isFr
        ? "L'IA risque-t-elle de commettre des erreurs embarrassantes ou d'envoyer des courriels bizarres à mes clients ?"
        : "Will AI make embarrassing mistakes or send weird messages to my customers?",
      a: isFr
        ? "Non, absolument pas. C'est précisément pour cela que nous appliquons la Règle d'Or Oakivo : « L'IA prépare, l'humain valide ». L'IA n'a jamais l'autorisation d'envoyer un courriel, d'émettre un devis ou de modifier une écriture comptable de façon autonome. Elle analyse le document ou la demande, rédige une proposition impeccable en 40 secondes, et vous présente un bouton « Approuver » sur votre téléphone. Vous gardez 100% du contrôle."
        : "No, never. This is why we strictly enforce our Golden Rule: 'AI Prepares, Humans Approve'. Autonomous AI is never given permission to hit send on client communications, commit financial transactions, or alter inventory without human oversight. The AI does the heavy lifting in seconds, and you or your staff simply tap 'Approve'. You retain 100% control."
    },
    {
      q: isFr
        ? "Devons-nous changer nos logiciels actuels comme QuickBooks, Jobber ou Gmail ?"
        : "Do we need to replace our current software like QuickBooks, Jobber, or Gmail?",
      a: isFr
        ? "Non. Nous ne vous demandons jamais de tout jeter pour réapprendre un nouvel outil complexe. Nous créons des ponts invisibles et discrets directement entre vos outils existants : QuickBooks, Xero, Jobber, Google Workspace, Outlook ou votre téléphonie mobile. Rien ne change dans vos habitudes, tout va simplement 10 fois plus vite."
        : "No. You do not need to discard your existing tech stack or learn complicated enterprise software. We build quiet, seamless pipes that integrate directly with your current tools—QuickBooks, Xero, Jobber, Google Calendar, Outlook, and your business phone. Your daily workflow stays familiar, just 10x faster."
    },
    {
      q: isFr
        ? "Combien de temps cela prendra-t-il à mon équipe pour apprendre à l'utiliser ?"
        : "How much time will this take away from my team to learn?",
      a: isFr
        ? "Moins de 30 minutes au total. Nous concevons nos interfaces pour des entrepreneurs et des techniciens occupés sur le terrain, pas pour des ingénieurs informatiques. Si vous savez lire un SMS et cliquer sur un bouton de validation sur votre smartphone, vous êtes immédiatement opérationnel."
        : "Under 30 minutes in total. We engineer our workflows for busy trade contractors, clinic staff, and owners on the move—not tech enthusiasts. If your team can read a text message and tap an 'Approve' button on their smartphone, they are fully trained on day one."
    },
    {
      q: isFr
        ? "À quelle vitesse allons-nous constater un retour sur investissement concret ?"
        : "How quickly will we see a concrete return on investment?",
      a: isFr
        ? "Dès les 14 premiers jours suivant la mise en production. Grâce au moteur de résurrection automatique des devis sans réponse et à la réponse aux prospects en 90 secondes, la grande majorité de nos clients récupèrent entre 1 et 3 contrats supplémentaires dès le premier mois d'activité."
        : "Within the first 14 days of go-live. By immediately capturing after-hours leads in under 90 seconds and automatically reactivating dormant estimates, the vast majority of our clients secure 1 to 3 additional high-ticket jobs in their very first month."
    },
    {
      q: isFr
        ? "Quelle est la garantie si le système ne fonctionne pas pour notre entreprise ?"
        : "What is your guarantee if this doesn't work for our business?",
      a: isFr
        ? "Nous offrons la Garantie Zéro Risque 30 Jours : si votre système d'IA ne vous fait pas gagner au moins 10 heures par semaine ou ne vous rapporte pas de nouveau contrat au cours des 30 premiers jours, nous continuons à travailler gratuitement jusqu'à ce que vous obteniez ces résultats, sans frais supplémentaires."
        : "We stand behind our work with the Oakivo 30-Day Zero-Risk Guarantee: if your custom AI micro-system doesn't save at least 10 hours a week or win new business in the first 30 days, we work completely free until it does. You carry zero financial downside."
    },
    {
      q: isFr
        ? "Pourquoi faire appel à Oakivo plutôt qu'à une agence marketing classique ou une embauche interne ?"
        : "Why hire Oakivo instead of a traditional agency or an internal tech hire?",
      a: isFr
        ? "Les agences marketing facturent des abonnements mensuels sans s'intéresser à vos opérations réelles, tandis qu'un développeur interne coûte cher et demande du temps de recrutement. Chez Oakivo, vous travaillez directement avec des associés fondateurs et ingénieurs seniors, sur des livrables clairs, à tarif fixe, sans mauvaise surprise."
        : "Traditional marketing agencies charge monthly retainers without touching your backend operational leaks, while hiring an in-house developer costs $90k+ plus benefits. With Oakivo, you get direct senior engineering partners, fixed-scope delivery, and guaranteed outcomes without endless retainer lock-ins."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#000000] border-t border-[#1e2d27]/70 relative text-[#f7faf9]">
      <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="nova-eyebrow text-[#23c694] mb-3">
            {isFr ? 'QUESTIONS FRÉQUENTES' : 'FREQUENTLY ASKED QUESTIONS'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-light text-white tracking-[-0.035em] mb-4">
            {isFr 
              ? 'Réponses claires pour les dirigeants d’entreprise.'
              : 'Direct answers for practical business leaders.'
            }
          </h2>
          <p className="text-[#a8b0ad] text-sm sm:text-base leading-relaxed font-light">
            {isFr
              ? 'Pas de jargon technique. Des réponses transparentes sur le fonctionnement, les garanties et la rentabilité.'
              : 'Zero technical buzzwords. Honest answers about implementation, security, and bottom-line economics.'
            }
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-[#070a09] border border-[#1e2d27] hover:border-[#23c694]/40 transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-display font-light text-white tracking-tight">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-[#000000] text-[#7c8581] border border-[#1e2d27] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#23c694] border-[#23c694]/40' : ''}`}>
                    <ChevronDown size={17} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#a8b0ad] font-light leading-relaxed border-t border-[#1e2d27]/60">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SmallBizFaq;
