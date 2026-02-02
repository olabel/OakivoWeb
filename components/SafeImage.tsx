import React, { useState } from 'react';
import Logo from './Logo';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
}

const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  fallbackClassName = "",
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="eager"
        decoding="async"
        {...props}
      />
    </div>
  );
};

export default SafeImage;