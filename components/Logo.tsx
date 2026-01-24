import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
  light?: boolean;
}

/**
 * Oakivo - Official Brand Mark
 * Icon: Solid #123530 circle with white negative space tree (High-Fidelity Reference).
 * Type: Professional "Quicksand" font with the signature secondary color dot.
 */
const Logo: React.FC<LogoProps> = ({ className = "h-10", withText = true, light = false }) => {
  const brandTeal = "#123530"; 
  const accentColor = "#2ECC71"; // Oakivo Secondary Green
  const primaryColor = light ? "#FFFFFF" : brandTeal;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* High-Fidelity Vector Icon precisely matching the reference image */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto flex-shrink-0"
        role="img"
        aria-label="Oakivo Logo Emblem"
      >
        <circle cx="50" cy="50" r="50" fill={brandTeal} />
        <g fill="white">
          {/* Cloud-shaped canopy geometry matching the original reference */}
          <circle cx="50" cy="38" r="16" />
          <circle cx="36" cy="46" r="14" />
          <circle cx="64" cy="46" r="14" />
          <circle cx="41" cy="60" r="11" />
          <circle cx="59" cy="60" r="11" />
          <rect x="36" y="46" width="28" height="14" />
          
          {/* Straight vertical trunk */}
          <rect x="47" y="55" width="6" height="32" rx="1" />
          
          {/* Single thick branch pointing up-right at 45-degrees */}
          <path 
            d="M51 72 L66 50 L71 54 L55 75 Z" 
          />
        </g>
      </svg>

      {withText && (
        <div className="flex items-baseline leading-none">
          {/* "Quicksand" font: Funky yet professional rounded style */}
          <span 
            className="text-2xl md:text-3xl font-bold font-funky tracking-tight" 
            style={{ 
              color: primaryColor,
              letterSpacing: '-0.01em'
            }}
          >
            Oakivo<span style={{ color: light ? 'white' : accentColor }}>.</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;