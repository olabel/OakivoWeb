
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  fetchPriority?: "high" | "low" | "auto";
}

const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  fallbackClassName = "",
  fetchPriority = "auto",
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (src && typeof src === 'string') {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setHasError(true);
    }
  }, [src]);

  if (hasError || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-oakivo-surface border border-oakivo-border overflow-hidden ${className} ${fallbackClassName}`} aria-hidden="true">
        <div className="opacity-10 scale-50 grayscale">
          {/* Fix: removed unsupported 'withText' prop */}
          <Logo className="h-16" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-oakivo-surface ${className}`}>
      <img
        src={src}
        alt={alt || "Oakivo Industrial Visualization"}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        fetchPriority={fetchPriority}
        decoding="async"
        loading={fetchPriority === 'high' ? 'eager' : 'lazy'}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-oakivo-primary/5 animate-pulse" aria-hidden="true" />
      )}
    </div>
  );
};

export default SafeImage;
