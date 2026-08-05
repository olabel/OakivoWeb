import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light' | 'mono';
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showText = true,
  size = 'md',
  variant = 'dark',
  light
}) => {
  const activeVariant = light ? 'light' : variant;
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const subTextSizes = {
    sm: 'text-[7px]',
    md: 'text-[8px]',
    lg: 'text-[9px]'
  };

  // Concept 1: The Interlocking Timber Joint (Joinery & Seamless Systems Connection)
  return (
    <div className={`flex items-center gap-3 cursor-pointer group select-none ${className}`}>
      {/* Structural Emblem Container */}
      <div className={`relative ${iconSizes[size]} rounded-xl bg-[#0F172A] p-1.5 border border-white/10 shadow-md group-hover:border-amber-500/50 transition-all duration-300 flex items-center justify-center shrink-0`}>
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        >
          {/* Solid Interlocking Block A (Warm Copper/Amber) */}
          <path 
            d="M6 6C6 4.89543 6.89543 4 8 4H20V10H12V20H6V6Z" 
            fill={variant === 'mono' ? '#FFFFFF' : '#D97706'} 
          />
          {/* Solid Interlocking Block B (Slate Earth) */}
          <path 
            d="M26 26C26 27.1046 25.1046 28 24 28H12V22H20V12H26V26Z" 
            fill={variant === 'mono' ? '#FFFFFF' : '#475569'} 
          />
          {/* Keyway Connection Core (Emerald Precision Marker) */}
          <rect x="12" y="10" width="8" height="10" fill={variant === 'mono' ? '#FFFFFF' : '#10B981'} rx="1" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-sans ${textSizes[size]} font-extrabold tracking-tight text-white leading-none`}>
              OAKIVO
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <span className={`${subTextSizes[size]} font-mono-tech tracking-[0.25em] text-gray-400 uppercase font-semibold mt-1`}>
            SOLUTIONS
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

