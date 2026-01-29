import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
  light?: boolean;
}

/**
 * Oakivo - Official Brand Mark (Precision Calibration)
 * Emblem: Solid Teal #123530 circle, white negative space tree.
 * Geometry: Five-lobed canopy, vertical trunk, 45-degree upward branch on right.
 */
const Logo: React.FC<LogoProps> = ({ className = "h-10", withText = true, light = false }) => {
  const brandTeal = "#123530"; 
  const accentColor = "#2ECC71"; 
  const primaryColor = light ? "#FFFFFF" : brandTeal;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto flex-shrink-0"
        role="img"
        aria-label="Oakivo Official Emblem"
      >
        <circle cx="50" cy="50" r="50" fill={brandTeal} />
        <g fill="white">
          {/* Canopy: Five balanced lobes */}
          <circle cx="50" cy="36" r="15" />
          <circle cx="36" cy="43" r="13" />
          <circle cx="64" cy="43" r="13" />
          <circle cx="41" cy="56" r="11" />
          <circle cx="59" cy="56" r="11" />
          
          {/* Trunk: Straight vertical support */}
          <rect x="47.5" y="52" width="5" height="36" rx="1" />
          
          {/* The signature 45-degree upward branch on the right */}
          <path d="M50 70 L72 46 L78 51 L56 75 Z" />
        </g>
      </svg>

      {withText && (
        <div className="flex items-baseline leading-none">
          <span 
            className="text-2xl md:text-3xl font-bold font-funky tracking-tight" 
            style={{ 
              color: primaryColor,
              letterSpacing: '-0.04em'
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