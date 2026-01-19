import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bg?: 'white' | 'light' | 'dark';
}

const Section: React.FC<SectionProps> = ({ id, className = '', children, bg = 'white' }) => {
  const bgColors = {
    white: 'bg-white',
    light: 'bg-oakivo-bg',
    dark: 'bg-oakivo-primary text-white',
  };

  return (
    <section id={id} className={`py-16 md:py-24 ${bgColors[bg]} ${className}`}>
      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-7xl">
        {children}
      </div>
    </section>
  );
};

export default Section;