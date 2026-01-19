import React from 'react';

interface LogoProps {
  className?: string;
  dark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", dark = false }) => {
  const strokeColor = "currentColor";
  
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Oakivo Logo">
      <title>Oakivo Solutions Inc.</title>
      {/* Outer Hexagon Container */}
      <path 
        d="M60 10L103.301 35V85L60 110L16.6987 85V35L60 10Z" 
        stroke={strokeColor} 
        strokeWidth="7" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={dark ? "text-oakivo-primary" : "text-white"}
      />
      
      {/* Dynamic structural elements */}
      <path 
        d="M60 25V60" 
        stroke={strokeColor} 
        strokeWidth="6" 
        strokeLinecap="round"
        className={dark ? "text-oakivo-primary opacity-20" : "text-white opacity-20"} 
      />
      <path 
        d="M60 60L90.3109 77.5" 
        stroke={strokeColor} 
        strokeWidth="6" 
        strokeLinecap="round"
        className={dark ? "text-oakivo-primary opacity-20" : "text-white opacity-20"}
      />
      <path 
        d="M60 60L29.6891 77.5" 
        stroke={strokeColor} 
        strokeWidth="6" 
        strokeLinecap="round"
        className={dark ? "text-oakivo-primary opacity-20" : "text-white opacity-20"}
      />

      {/* High-Impact Core Dot */}
      <circle cx="60" cy="60" r="10" className="fill-oakivo-secondary drop-shadow-md" />
      
      {/* Node connectors */}
      <circle cx="60" cy="25" r="4" className="fill-oakivo-secondary" />
      <circle cx="90.3109" cy="77.5" r="4" className="fill-oakivo-secondary" />
      <circle cx="29.6891" cy="77.5" r="4" className="fill-oakivo-secondary" />
    </svg>
  );
};

export default Logo;