import React from 'react';
import Section from '../components/Section';
import { Factory, ShoppingBag, Briefcase, Truck, Landmark, Zap } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage, translations } from '../context/LanguageContext';

const Verticals: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Get cards from translation object based on current language
  const cards = translations[language].verticals.cards;

  const icons = [Factory, ShoppingBag, Briefcase, Truck, Landmark, Zap];

  return (
    <>
      {/* Hero */}
      <section className="bg-black text-white pt-40 pb-20">
         <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
               <span className="text-oakivo-secondary font-bold tracking-widest uppercase">{t('nav.verticals')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif-display font-bold max-w-4xl leading-tight mb-8">
              {t('verticals.hero_title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl font-light leading-relaxed">
              {t('verticals.hero_subtitle')}
            </p>
         </div>
      </section>

      {/* Grid */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {cards.map((card: any, idx: number) => {
              const Icon = icons[idx];
              return (
                <div key={idx} className="group p-8 border border-gray-200 hover:border-oakivo-secondary/50 hover:shadow-2xl transition-all duration-300 rounded-xl bg-white">
                   <div className="w-16 h-16 rounded-full bg-oakivo-surface flex items-center justify-center text-oakivo-primary mb-8 group-hover:bg-oakivo-secondary group-hover:text-black transition-colors duration-300">
                      <Icon size={28} />
                   </div>
                   <h3 className="text-2xl font-bold font-serif-display mb-4 group-hover:text-oakivo-blue transition-colors">{card.title}</h3>
                   <p className="text-gray-600 leading-relaxed">
                     {card.desc}
                   </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section bg="light" className="text-center">
          <h2 className="text-4xl font-serif-display font-bold mb-6">{t('services.cta_title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
            {t('services.cta_text')}
          </p>
          <Link to={NavRoute.CONTACT}>
            <Button variant="primary" size="lg">{t('services.cta_btn')}</Button>
          </Link>
      </Section>
    </>
  );
};

export default Verticals;