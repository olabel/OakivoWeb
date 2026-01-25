import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
  light?: boolean;
}

/**
 * Oakivo - Official Brand Mark (Refined Precision)
 * Emblem: Solid Teal #123530 circle, negative space white tree.
 * Geometry: Five-lobed canopy, straight trunk, 45-degree branch on right.
 */
const Logo: React.FC<LogoProps> = ({ className = "h-10", withText = true, light = false }) => {
  const brandTeal = "#123530"; 
  const accentColor = "#2ECC71"; // Oakivo Secondary Green
  const primaryColor = light ? "#FFFFFF" : brandTeal;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Exact Vector Replica of the Uploaded Emblem */}
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
          {/* Canopy: Five distinctive lobes arranged in an oak-like cloud shape */}
          <circle cx="50" cy="36" r="17" />
          <circle cx="34" cy="45" r="14" />
          <circle cx="66" cy="45" r="14" />
          <circle cx="41" cy="57" r="12" />
          <circle cx="59" cy="57" r="12" />
          
          {/* Trunk: Straight, solid vertical support */}
          <rect x="47" y="52" width="6" height="36" rx="1" />
          
          {/* The signature 45-degree upward branch on the right */}
          <path d="M51 68 L70 45 L76 50 L57 73 Z" />
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