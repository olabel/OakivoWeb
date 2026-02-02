import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
  light?: boolean;
}

/**
 * Oakivo - Official Brand Mark
 * Prioritizes the high-fidelity logo.png asset from /public/
 * Fallback to standard SVG emblem if asset fails.
 */
const Logo: React.FC<LogoProps> = ({ className = "h-10", withText = true, light = false }) => {
  const brandTeal = "#123530"; 
  const accentColor = "#2ECC71"; 
  const primaryColor = light ? "#FFFFFF" : brandTeal;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Primary Logo Image Component */}
      <img 
        src="/logo.png" 
        alt="Oakivo Official Logo"
        className="h-full w-auto flex-shrink-0 object-contain"
        onError={(e) => {
          // Fallback logic handled by parent if needed, 
          // but SVG is kept here as an inline fallback
          e.currentTarget.style.display = 'none';
          const next = e.currentTarget.nextElementSibling as HTMLElement;
          if (next) next.style.display = 'block';
        }}
      />
      
      {/* High-Performance SVG Fallback (Hidden by default, shown if image fails) */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto flex-shrink-0"
        style={{ display: 'none' }}
        role="img"
        aria-label="Oakivo Emblem Fallback"
      >
        <circle cx="50" cy="50" r="50" fill={brandTeal} />
        <g fill="white">
          <circle cx="50" cy="36" r="15" />
          <circle cx="36" cy="43" r="13" />
          <circle cx="64" cy="43" r="13" />
          <circle cx="41" cy="56" r="11" />
          <circle cx="59" cy="56" r="11" />
          <rect x="47.5" y="52" width="5" height="36" rx="1" />
          <path d="M50 70 L72 46 L78 51 L56 75 Z" />
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
            Oakivo<span style={{ color: light ? 'white' : accentColor }}>.</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
