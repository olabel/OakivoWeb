import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface BreadcrumbSection {
  id: string;
  labelKey: string;
}

interface BreadcrumbProps {
  sections: BreadcrumbSection[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = sections[0]?.id || '';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust threshold to detect when section comes into view
          if (rect.top <= window.innerHeight * 0.4) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  if (!sections || sections.length === 0) return null;

  const activeIndex = sections.findIndex(s => s.id === activeSection);
  const visibleSections = sections.slice(0, activeIndex + 1);

  return (
    <div className="sticky top-[72px] z-40 w-full bg-[#070A0F]/80 backdrop-blur-md border-b border-white/[0.05] py-2 px-6 transition-all hidden md:block">
      <nav className="max-w-7xl mx-auto flex items-center space-x-2 text-xs font-mono">
        <span className="font-semibold text-slate-300">Oakivo</span>
        {visibleSections.map((section, idx) => {
          const isLast = idx === visibleSections.length - 1;
          return (
            <React.Fragment key={section.id}>
              <ChevronRight size={14} className="text-slate-600" />
              <a 
                href={`#${section.id}`} 
                className={`transition-colors ${
                  isLast 
                    ? 'text-cyan-400 font-semibold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t(section.labelKey)}
              </a>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;
