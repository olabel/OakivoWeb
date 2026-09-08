
import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string; // Made required for SEO
  fallbackClassName?: string;
  fetchPriority?: "high" | "low" | "auto";
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  fallbackClassName = "",
  fetchPriority = "auto",
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-slate-900 border border-slate-800 overflow-hidden ${className} ${fallbackClassName}`} aria-hidden="true">
        <div className="text-slate-600 flex flex-col items-center gap-2">
          <ImageOff size={24} />
          <span className="text-xs font-mono">Image Unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        fetchPriority={fetchPriority}
        decoding="async"
        loading={fetchPriority === 'high' ? 'eager' : 'lazy'}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse" aria-hidden="true" />
      )}
    </div>
  );
};

export default OptimizedImage;
