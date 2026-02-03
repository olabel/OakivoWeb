import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
  light?: boolean;
}

/**
 * Oakivo - Official Brand Mark
 * Recreated exactly from the provided brand image using optimized SVG paths.
 */
const Logo: React.FC<LogoProps> = ({ className = "h-10", withText = true, light = false }) => {
  const brandTeal = "#123530"; 
  const primaryColor = light ? "#FFFFFF" : brandTeal;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* High-Fidelity Stylized Tree Emblem */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto flex-shrink-0"
        role="img"
        aria-label="Oakivo Tree Emblem"
      >
        {/* Background Circle */}
        <circle cx="50" cy="50" r="50" fill={light ? "rgba(255,255,255,0.15)" : brandTeal} />
        
        {/* White Tree Silhouette */}
        <g>
          {/* Tree Trunk & Branch */}
          <path 
            d="M44.5 86.5L53.5 50.5 M42.5 53.5L50.5 61.5" 
            stroke="white" 
            strokeWidth="7" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Tree Crown (Organic Cluster Shape) */}
          <path 
            d="M34 68C26 68 20 62 20 54C20 46 26 40 33 39C34 31 41 25 50 25C59 25 66 31 67 39C74 40 80 46 80 54C80 62 74 68 66 68H34Z" 
            fill="white" 
          />
        </g>
      </svg>

      {withText && (
        <div className="flex items-baseline leading-none">
          <span 
            className="text-2xl md:text-3xl font-bold font-sans tracking-tight" 
            style={{ 
              color: primaryColor,
              letterSpacing: '-0.04em'
            }}
          >
            Oakivo<span className="text-oakivo-secondary">.</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;