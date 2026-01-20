import React from 'react';

interface LogoProps {
  className?: string;
  dark?: boolean;
}

/**
 * Oakivo Solutions Inc. Official Logo Component
 * format: Precision Vector SVG
 * identity: Protected Brand Asset
 */
const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", dark = false }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      role="img"
      aria-label="Oakivo Solutions Inc. Logo"
    >
      <title>Oakivo Solutions Inc.</title>
      
      {/* Brand Primary: #0A3D3A (Dark Forest Green) Circle */}
      <circle cx="50" cy="50" r="48" fill="#0A3D3A" />
      
      {/* 
         Oak Tree Structure 
         Refined branch angles and trunk weight for a more balanced "growth" aesthetic.
      */}
      <g 
        stroke="white" 
        strokeWidth="3.6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Main Trunk - Tapered architectural feel */}
        <path d="M50 32 V78" />
        
        {/* Primary Branches - Precision angled for stable geometry */}
        <path d="M50 48 L37 60" />
        <path d="M50 58 L63 71" />
        <path d="M50 68 L32 86" />
        <path d="M50 72 L68 90" />
        
        {/* 
           Official Scalloped Canopy 
           A high-fidelity organic path mirroring the 5-point cluster of the Oakivo brand.
        */}
        <path 
          d="M50 22
             C42 22, 36 26, 34 32
             C27 30, 21 34, 21 42
             C15 42, 13 52, 18 59
             C14 66, 19 75, 29 77
             C36 81, 44 83, 50 83
             C56 83, 64 81, 71 77
             C81 75, 86 66, 82 59
             C87 52, 85 42, 79 42
             C79 34, 73 30, 66 32
             C64 26, 58 22, 50 22 Z" 
          fill="none" 
          strokeWidth="4.5"
        />
      </g>
    </svg>
  );
};

export default Logo;