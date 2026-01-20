import React from 'react';

interface LogoProps {
  className?: string;
  dark?: boolean;
}

/**
 * Oakivo Solutions Inc. Official Logo Component
 * format: Precision Geometric Vector SVG
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
         Mathematically aligned branch structure for maximum brand stability.
      */}
      <g 
        stroke="white" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Main Trunk - Tapered for architectural elegance */}
        <path d="M50 34 V78" />
        
        {/* Branch Architecture - Precision angled for stable geometry */}
        <path d="M50 48 L38 60" />
        <path d="M50 58 L62 72" />
        <path d="M50 68 L32 86" />
        <path d="M50 72 L68 90" />
        
        {/* 
           Official 5-Lobe Scalloped Canopy 
           A high-fidelity organic path with exact curvature for the Oakivo brand mark.
        */}
        <path 
          d="M50 18
             C41 18, 35 22, 33 29
             C26 27, 19 31, 19 40
             C13 40, 11 50, 16 58
             C11 67, 17 77, 27 79
             C34 83, 44 85, 50 85
             C56 85, 66 83, 73 79
             C83 77, 89 67, 84 58
             C89 50, 87 40, 81 40
             C81 31, 74 27, 67 29
             C65 22, 59 18, 50 18 Z" 
          fill="none" 
          strokeWidth="4.2"
        />
      </g>
    </svg>
  );
};

export default Logo;