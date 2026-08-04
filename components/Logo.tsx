import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showText = true,
  size = 'md' 
}) => {
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

  return (
    <div className={`flex items-center gap-3 cursor-pointer group select-none ${className}`}>
      {/* Precision Geometric Shield Emblem */}
      <div className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-br from-[#5E6AD2] via-[#8257E5] to-[#00F0FF] p-[1px] shadow-[0_0_20px_rgba(94,106,210,0.25)] group-hover:shadow-[0_0_30px_rgba(94,106,210,0.45)] transition-all duration-300`}>
        <div className="w-full h-full bg-[#08090A] rounded-[11px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#5E6AD2]/20 via-transparent to-[#00F0FF]/20 opacity-60 group-hover:opacity-100 transition-opacity" />
          
          {/* Million-Dollar Oakivo Isometric "O" Shield Symbol */}
          <svg 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-105"
          >
            <defs>
              <linearGradient id="oakivoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#5E6AD2" />
              </linearGradient>
              <linearGradient id="oakivoGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#8257E5" />
              </linearGradient>
            </defs>

            {/* Hexagonal Shield Outline Facets */}
            <path 
              d="M16 3L27 9.35V22.65L16 29L5 22.65V9.35L16 3Z" 
              stroke="url(#oakivoGrad1)" 
              strokeWidth="2" 
              strokeLinejoin="round" 
              className="opacity-90"
            />
            {/* Inner Interlocking Core "O" Node */}
            <path 
              d="M16 8L22 11.5V18.5L16 22L10 18.5V11.5L16 8Z" 
              fill="url(#oakivoGrad2)" 
              fillOpacity="0.25"
              stroke="url(#oakivoGrad2)" 
              strokeWidth="1.5" 
              strokeLinejoin="round" 
            />
            {/* Center Zero-Trust Diamond Core */}
            <circle cx="16" cy="15" r="2" fill="#00F0FF" />
          </svg>
        </div>
      </div>

      {/* Brand Wordmark */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className={`font-sans ${textSizes[size]} font-extrabold tracking-[-0.03em] text-white leading-none`}>
              OAKIVO
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#5E6AD2] to-[#00F0FF] animate-pulse" />
          </div>
          <span className={`${subTextSizes[size]} font-mono-tech tracking-[0.25em] text-[#8A8F98] uppercase font-semibold mt-1`}>
            SOLUTIONS
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
