import React from 'react';
import NextImage, { StaticImageData } from 'next/image';

interface ImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  className = '',
  priority = false
}) => {
  const isStatic = typeof src === 'object' && src !== null;
  
  if (isStatic) {
    return (
      <NextImage 
        src={src} 
        alt={alt} 
        className={`object-cover ${className}`}
        priority={priority}
      />
    );
  }

  // Fallback para strings (urls externas o paths absolutos) usando img tag nativa si no está configurado el dominio en next.config
  // o usando NextImage con width/height fill
  return (
    <img 
      src={src as string} 
      alt={alt} 
      className={`object-cover ${className}`}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};
