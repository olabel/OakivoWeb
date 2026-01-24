import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
  light?: boolean;
}

/**
 * Oakivo - "Liquid Crisp" Brand Mark
 * Icon: High-precision fluid geometry.
 * Tree: Reimagined with sharp, organic "droplet" lobes for a modern, crisp feel.
 * Type: Quicksand 700 with the signature accent dot.
 */
const Logo: React.FC<LogoProps> = ({ className = "h-10", withText = true, light = false }) => {
  const brandTeal = "#123530"; 
  const accentColor = "#2ECC71"; // Oakivo Secondary Green
  const primaryColor = light ? "#FFFFFF" : brandTeal;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Liquid Crisp Vector Icon */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto flex-shrink-0 drop-shadow-sm"
        role="img"
        aria-label="Oakivo Liquid Emblem"
      >
        <circle cx="50" cy="50" r="50" fill={brandTeal} />
        
        {/* Crisp Liquid Canopy */}
        <g fill="white">
          {/* Central fluid lobe */}
          <path d="M50 20 C62 20 68 32 68 42 C68 52 58 58 50 58 C42 58 32 52 32 42 C32 32 38 20 50 20 Z" />
          
          {/* Left sharp liquid lobe */}
          <path d="M36 40 C36 40 22 44 22 56 C22 68 34 72 42 66 C42 66 38 52 36 40 Z" />
          
          {/* Right sharp liquid lobe */}
          <path d="M64 40 C64 40 78 44 78 56 C78 68 66 72 58 66 C58 66 62 52 64 40 Z" />
          
          {/* Vertical Tapered Trunk */}
          <path d="M47 55 L53 55 L51 88 L49 88 Z" rx="0.5" />
          
          {/* Signature Fluid Branch (Crisp Edge) */}
          <path d="M51 68 Q58 68 70 48 L73 51 Q62 74 51 74 Z" />
        </g>
        
        {/* Subtle Highlight Detail for "Liquid" feel */}
        <path d="M42 32 Q50 26 58 32" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      </svg>

      {withText && (
        <div className="flex items-baseline leading-none">
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