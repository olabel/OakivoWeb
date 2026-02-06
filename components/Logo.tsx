import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
  light?: boolean;
}

/**
 * Oakivo - Official Brand Mark
 * Replicated exactly from the provided image asset.
 * Features the signature Dark Teal circle and stylized white oak tree.
 */
const Logo: React.FC<LogoProps> = ({ className = "h-10", withText = true, light = false }) => {
  const brandTeal = "#1A444C"; 
  const color = light ? "#FFFFFF" : brandTeal;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Exact Brand Mark Replication */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto flex-shrink-0"
        role="img"
        aria-label="Oakivo Logo"
      >
        {/* Dark Teal Circle Background */}
        <circle cx="50" cy="50" r="50" fill={light ? "rgba(255,255,255,0.15)" : brandTeal} />
        
        {/* White Stylized Tree - Precise Silhouette */}
        <g transform="translate(24, 25) scale(0.52)">
          {/* Main Trunk & Branch */}
          <path 
            d="M48 92L58 42" 
            stroke="white" 
            strokeWidth="9" 
            strokeLinecap="round"
          />
          <path 
            d="M52 64L41 53" 
            stroke="white" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
          {/* Fluffy Cloud Canopy */}
          <circle cx="34" cy="48" r="18" fill="white" />
          <circle cx="66" cy="48" r="18" fill="white" />
          <circle cx="50" cy="32" r="22" fill="white" />
          <circle cx="36" cy="24" r="16" fill="white" />
          <circle cx="64" cy="24" r="16" fill="white" />
        </g>
      </svg>

      {withText && (
        <span 
          className="text-3xl md:text-4xl font-extrabold tracking-tighter" 
          style={{ color, fontFamily: 'Inter, sans-serif' }}
        >
          Oakivo
        </span>
      )}
    </div>
  );
};

export default Logo;