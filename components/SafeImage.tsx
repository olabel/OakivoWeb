import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  fetchpriority?: "high" | "low" | "auto";
}

const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  fallbackClassName = "",
  fetchpriority = "auto",
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pre-fetch check
  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setHasError(true);
    }
  }, [src]);

  if (hasError || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-oakivo-surface border border-oakivo-border overflow-hidden ${className} ${fallbackClassName}`}>
        <div className="opacity-10 scale-50 grayscale">
          <Logo withText={false} className="h-16" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-oakivo-surface ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        fetchpriority={fetchpriority}
        decoding="async"
        loading={fetchpriority === 'high' ? 'eager' : 'lazy'}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-oakivo-primary/5 animate-pulse" />
      )}
    </div>
  );
};

export default SafeImage;